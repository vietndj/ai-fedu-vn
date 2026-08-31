import type { VercelRequest, VercelResponse } from "@vercel/node";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const R2_BUCKET = "vietndjmedia";

const s3Client = new S3Client({
  region: "auto",
  endpoint: "https://2dae0527b790faa880c1cfb57247640a.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "ef3e4fbcd874fb204ed9c291608f9d75",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "2426f986845501c6d30416a312a69e4be6cc478dc6a861c3aa7dad5dce9a436a",
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { admin_key } = req.query;
    if (admin_key && admin_key !== "2026" && admin_key !== "FEDU2026") {
      return res.status(401).json({ error: "Mật khẩu Admin không đúng!" });
    }

    try {
      const getResp = await s3Client.send(new GetObjectCommand({
        Bucket: R2_BUCKET,
        Key: "licenses/index.json",
      }));
      const bodyStr = await getResp.Body?.transformToString();
      const licenses = bodyStr ? JSON.parse(bodyStr) : [];
      return res.status(200).json({ success: true, licenses });
    } catch (err) {
      return res.status(200).json({ success: true, licenses: [] });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Lỗi khi tải danh sách mã" });
  }
}
