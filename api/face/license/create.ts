import type { VercelRequest, VercelResponse } from "@vercel/node";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const R2_BUCKET = "vietndjmedia";

const s3Client = new S3Client({
  region: "auto",
  endpoint: "https://2dae0527b790faa880c1cfb57247640a.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "ef3e4fbcd874fb204ed9c291608f9d75",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "2426f986845501c6d30416a312a69e4be6cc478dc6a861c3aa7dad5dce9a436a",
  },
});

function generateLicenseCode(): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let code = "AI-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { count = 1, note = "CTV/Ban-Be", admin_key, custom_code } = req.body || req.query || {};

    // Kiểm tra mật khẩu admin nếu có
    if (admin_key && admin_key !== "2026" && admin_key !== "FEDU2026") {
      return res.status(401).json({ error: "Mật khẩu Admin không đúng!" });
    }

    const createdAt = new Date().toISOString();

    // 1. Tải danh sách index hiện tại nếu có
    let licensesIndex: any[] = [];
    try {
      const getResp = await s3Client.send(new GetObjectCommand({
        Bucket: R2_BUCKET,
        Key: "licenses/index.json",
      }));
      const bodyStr = await getResp.Body?.transformToString();
      if (bodyStr) licensesIndex = JSON.parse(bodyStr);
    } catch (e) {
      licensesIndex = [];
    }

    // 2. Nếu người dùng tự đặt mật khẩu riêng dùng 1 lần (Custom Passcode)
    if (custom_code && String(custom_code).trim()) {
      const cleanCustom = String(custom_code).trim().toUpperCase();
      if (cleanCustom.length < 3) {
        return res.status(400).json({ error: "Mật khẩu tùy chọn phải có ít nhất 3 ký tự!" });
      }
      if (licensesIndex.some((l: any) => l.code === cleanCustom)) {
        return res.status(400).json({ error: `Mật khẩu '${cleanCustom}' đã tồn tại! Vui lòng chọn mật khẩu khác.` });
      }

      const licenseData = {
        code: cleanCustom,
        status: "unused",
        created_at: createdAt,
        note: String(note),
        used_by_face_id: null,
        activated_at: null,
      };

      await s3Client.send(new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: `licenses/${cleanCustom}.json`,
        Body: JSON.stringify(licenseData, null, 2),
        ContentType: "application/json",
      }));

      licensesIndex.unshift(licenseData);
      await s3Client.send(new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: "licenses/index.json",
        Body: JSON.stringify(licensesIndex, null, 2),
        ContentType: "application/json",
      }));

      return res.status(200).json({
        success: true,
        created: [licenseData],
        total: licensesIndex.length,
      });
    }

    // 3. Tự động sinh mã ngẫu nhiên
    const numCodes = Math.min(Math.max(Number(count) || 1, 1), 20);
    const createdCodes: any[] = [];

    for (let i = 0; i < numCodes; i++) {
      let code = generateLicenseCode();
      while (licensesIndex.some((l: any) => l.code === code)) {
        code = generateLicenseCode();
      }

      const licenseData = {
        code,
        status: "unused",
        created_at: createdAt,
        note: String(note),
        used_by_face_id: null,
        activated_at: null,
      };

      await s3Client.send(new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: `licenses/${code}.json`,
        Body: JSON.stringify(licenseData, null, 2),
        ContentType: "application/json",
      }));

      licensesIndex.unshift(licenseData);
      createdCodes.push(licenseData);
    }

    // Cập nhật lại index tổng
    await s3Client.send(new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: "licenses/index.json",
      Body: JSON.stringify(licensesIndex, null, 2),
      ContentType: "application/json",
    }));

    return res.status(200).json({
      success: true,
      created: createdCodes,
      total: licensesIndex.length,
    });
  } catch (error: any) {
    console.error("Lỗi tạo mã kích hoạt:", error);
    return res.status(500).json({ error: error.message || "Lỗi máy chủ khi tạo mã." });
  }
}
