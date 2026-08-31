import type { VercelRequest, VercelResponse } from "@vercel/node";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

const R2_BUCKET = "vietndjmedia";
const R2_PUBLIC_BASE = "https://pub-447bd44dfdac4938912655c855b8631c.r2.dev";

const s3Client = new S3Client({
  region: "auto",
  endpoint: "https://2dae0527b790faa880c1cfb57247640a.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "ef3e4fbcd874fb204ed9c291608f9d75",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "2426f986845501c6d30416a312a69e4be6cc478dc6a861c3aa7dad5dce9a436a",
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, style, password, photos } = req.body || {};

    if (!name || !photos || !Array.isArray(photos) || photos.length === 0) {
      return res.status(400).json({ error: "Vui lòng cung cấp đầy đủ Tên và ít nhất 1 ảnh mỏ neo!" });
    }

    // Sinh Face ID ngẫu nhiên 6 ký tự
    const faceId = "FACE_" + crypto.randomBytes(3).toString("hex").toUpperCase();
    const createdAt = new Date().toISOString();

    // Hash mật khẩu nếu có
    const passwordHash = password ? crypto.createHash("sha256").update(password.trim()).digest("hex") : "";

    const uploadedPhotos: string[] = [];

    // Upload từng ảnh lên Cloudflare R2
    for (let i = 0; i < photos.length; i++) {
      const rawData = photos[i];
      let buffer: Buffer;
      let contentType = "image/jpeg";

      if (rawData.startsWith("data:")) {
        const matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          contentType = matches[1];
          buffer = Buffer.from(matches[2], "base64");
        } else {
          buffer = Buffer.from(rawData.split(",")[1] || rawData, "base64");
        }
      } else {
        buffer = Buffer.from(rawData, "base64");
      }

      const photoKey = `faces/${faceId}/photo_00${i + 1}.jpg`;
      await s3Client.send(new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: photoKey,
        Body: buffer,
        ContentType: contentType,
      }));

      uploadedPhotos.push(`${R2_PUBLIC_BASE}/${photoKey}`);
    }

    // Ghi file manifest.json lên Cloudflare R2
    const manifest = {
      face_id: faceId,
      subject_name: name,
      style_profile: style || "executive",
      created_at: createdAt,
      password_hash: passwordHash,
      is_locked: Boolean(passwordHash),
      photos: uploadedPhotos,
    };

    const manifestKey = `faces/${faceId}/manifest.json`;
    await s3Client.send(new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: manifestKey,
      Body: JSON.stringify(manifest, null, 2),
      ContentType: "application/json",
    }));

    const qrUrl = `https://ai.fedu.vn/face?id=${faceId}`;
    const qrPayload = `FEDU-FACE:${faceId}`;

    return res.status(200).json({
      success: true,
      face_id: faceId,
      qr_url: qrUrl,
      qr_payload: qrPayload,
      manifest_url: `${R2_PUBLIC_BASE}/${manifestKey}`,
      photos: uploadedPhotos,
      message: "Đã lưu trữ thành công Bản Sao Khuôn Mặt trên Cloudflare R2!",
    });
  } catch (error: any) {
    console.error("Lỗi khi lưu trữ Face Clone:", error);
    return res.status(500).json({ error: error.message || "Lỗi máy chủ khi lưu trữ bản sao." });
  }
}
