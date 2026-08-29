import type { VercelRequest, VercelResponse } from '@vercel/node';

function viTimestamp() {
  try {
    return new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
  } catch {
    return new Date().toISOString();
  }
}

const BAD_WORDS = [
  "dm", "dmm", "đm", "đmm", "vl", "vkl", "vcl", "dkm", "đkm", "cl", "clm", 
  "đéo", "deo", "buồi", "buoi", "lồn", "lon", "cặc", "cac", "phò", "cave", 
  "chó", "cho'", "troll", "fck", "fuck", "shit", "asshole", "bitch", "duma", 
  "đụ", "du me", "đụ má", "đụ mẹ", "địt", "dit", "con cặc", "cái lồn", "cc", 
  "bố mày", "dcm", "đcm", "dcmm", "đcmm", "điên", "ngu", "xàm", "lừa đảo", "lua dao"
];

const FAKE_PHONES = [
  "0123456789", "0987654321", "0000000000", "0111111111", "0222222222", 
  "0333333333", "0444444444", "0555555555", "0666666666", "0777777777", 
  "0888888888", "0999999999", "0909090909", "0919191919", "0989898989"
];

const BLOCKED_EMAIL_DOMAINS = [
  "tempmail.com", "10minutemail.com", "yopmail.com", "mailinator.com", 
  "guerrillamail.com", "trashmail.com", "dispostable.com", "getnada.com"
];

function validateInput(name: string, email: string, phone: string): string | null {
  const cleanName = (name || "").trim();
  const cleanEmail = (email || "").trim().toLowerCase();
  const cleanPhone = (phone || "").replace(/[\s\.\-\+]/g, "").trim();

  if (!cleanName || cleanName.length < 2) {
    return "Vui lòng nhập đầy đủ Họ và tên của bạn.";
  }
  if (/^(.)\1{3,}$/i.test(cleanName)) {
    return "Họ và tên không hợp lệ. Vui lòng nhập tên thật.";
  }
  const nameLower = cleanName.toLowerCase();
  const containsBadWord = BAD_WORDS.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, "i");
    return regex.test(nameLower) || nameLower === word;
  });
  if (containsBadWord) {
    return "Họ và tên chứa từ ngữ không phù hợp. Vui lòng nhập tên thật của bạn.";
  }

  let normalizedPhone = cleanPhone;
  if (normalizedPhone.startsWith("84")) normalizedPhone = "0" + normalizedPhone.slice(2);
  const vnPhoneRegex = /^(03|05|07|08|09)\d{8}$/;
  if (!vnPhoneRegex.test(normalizedPhone) || FAKE_PHONES.includes(normalizedPhone) || /^(.)\1{9}$/.test(normalizedPhone)) {
    return "Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 số di động của bạn.";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleanEmail)) {
    return "Email không đúng định dạng. Vui lòng kiểm tra lại địa chỉ email.";
  }
  const [_, emailDomain] = cleanEmail.split("@");
  if (BLOCKED_EMAIL_DOMAINS.includes(emailDomain)) {
    return "Vui lòng không sử dụng email tạm thời. Nhập email thật để nhận sản phẩm.";
  }

  return null;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(455).json({ error: 'Method not allowed' });
  }

  try {
    const { name = "", phone = "", email = "", url = "" } = req.body || {};

    // Validate inputs
    const errorMsg = validateInput(name, email, phone);
    if (errorMsg) {
      return res.status(400).json({ error: errorMsg });
    }
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";

    if (!GOOGLE_SCRIPT_URL) {
      console.warn("GOOGLE_SCRIPT_URL is not set. Cannot save to Google Sheets.");
      return res.status(200).json({ success: true, rowIndex: -1 });
    }

    const payload = {
      action: "append",
      values: [viTimestamp(), name, `'${phone}`, email, url, "chưa thanh toán"]
    };

    // We fetch Google Apps Script
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(`Google Script failed with status ${response.status}`);
      } else {
        const text = await response.text();
        console.log("Google Script response:", text.substring(0, 100));
      }
    } catch (scriptErr) {
      console.error("Failed to append to Google Sheet:", scriptErr);
    }

    return res.status(200).json({ success: true, rowIndex: -1 });
  } catch (err: any) {
    console.error("Error registering lead:", err);
    return res.status(500).json({ error: "Failed to register lead", details: err.message });
  }
}
