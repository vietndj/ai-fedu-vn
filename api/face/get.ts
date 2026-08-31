import type { VercelRequest, VercelResponse } from "@vercel/node";

const R2_PUBLIC_BASE = "https://pub-447bd44dfdac4938912655c855b8631c.r2.dev";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Thiếu ID bản sao khuôn mặt (face_id)" });
  }

  try {
    const manifestUrl = `${R2_PUBLIC_BASE}/faces/${id}/manifest.json`;
    const response = await fetch(manifestUrl);

    if (!response.ok) {
      return res.status(404).json({ error: `Không tìm thấy bản sao #${id}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Lỗi khi tải dữ liệu bản sao" });
  }
}
