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

const MASTER_PASSWORDS = ["2026", "FEDU2026", "AIPRO", "VIETMAC"];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { code, face_id, action = "check" } = req.body || req.query || {};

    if (!code) {
      return res.status(400).json({ error: "Thiếu mã kích hoạt!" });
    }

    const cleanCode = String(code).trim().toUpperCase();

    // 1. Kiểm tra nếu là Master Password của Thầy Việt
    if (MASTER_PASSWORDS.includes(cleanCode)) {
      return res.status(200).json({
        valid: true,
        is_master: true,
        code: cleanCode,
        message: "Mã Master Password hợp lệ!",
      });
    }

    // 2. Tải thông tin mã từ Cloudflare R2
    let licenseData: any = null;
    try {
      const getResp = await s3Client.send(new GetObjectCommand({
        Bucket: R2_BUCKET,
        Key: `licenses/${cleanCode}.json`,
      }));
      const bodyStr = await getResp.Body?.transformToString();
      if (bodyStr) licenseData = JSON.parse(bodyStr);
    } catch (e) {
      licenseData = null;
    }

    if (!licenseData) {
      return res.status(404).json({
        valid: false,
        error: `Mã kích hoạt '${cleanCode}' không tồn tại hoặc không hợp lệ!`,
      });
    }

    // 3. Kiểm tra xem mã đã dùng chưa
    if (licenseData.status === "used") {
      return res.status(400).json({
        valid: false,
        used: true,
        activated_at: licenseData.activated_at,
        error: `Mã '${cleanCode}' đã được sử dụng trước đó (lúc ${licenseData.activated_at}). Mỗi mã chỉ dùng được 1 lần!`,
      });
    }

    // 4. Nếu action là "consume" (khi kích hoạt nạp thẻ vào Antigravity)
    if (action === "consume") {
      const now = new Date().toISOString();
      licenseData.status = "used";
      licenseData.used_by_face_id = face_id || "UNKNOWN";
      licenseData.activated_at = now;

      // Cập nhật file riêng
      await s3Client.send(new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: `licenses/${cleanCode}.json`,
        Body: JSON.stringify(licenseData, null, 2),
        ContentType: "application/json",
      }));

      // Cập nhật index tổng
      try {
        const getIdx = await s3Client.send(new GetObjectCommand({
          Bucket: R2_BUCKET,
          Key: "licenses/index.json",
        }));
        const idxStr = await getIdx.Body?.transformToString();
        if (idxStr) {
          const licensesIndex = JSON.parse(idxStr);
          const found = licensesIndex.find((l: any) => l.code === cleanCode);
          if (found) {
            found.status = "used";
            found.used_by_face_id = face_id;
            found.activated_at = now;
            await s3Client.send(new PutObjectCommand({
              Bucket: R2_BUCKET,
              Key: "licenses/index.json",
              Body: JSON.stringify(licensesIndex, null, 2),
              ContentType: "application/json",
            }));
          }
        }
      } catch (e) {
        console.warn("Lỗi update index licenses:", e);
      }

      return res.status(200).json({
        valid: true,
        consumed: true,
        code: cleanCode,
        message: `Đã kích hoạt thành công bản sao với mã ${cleanCode}!`,
      });
    }

    // Nếu chỉ check
    return res.status(200).json({
      valid: true,
      code: cleanCode,
      message: `Mã ${cleanCode} hợp lệ và sẵn sàng sử dụng!`,
    });
  } catch (error: any) {
    console.error("Lỗi xác thực mã:", error);
    return res.status(500).json({ error: error.message || "Lỗi máy chủ khi xác thực mã." });
  }
}
