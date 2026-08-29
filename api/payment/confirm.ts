import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(455).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      name = "", 
      phone = "", 
      email = "", 
      url = "", 
      productName = "Gói Khám, Lấy Cao Răng Siêu Âm & Đánh Bóng Men Răng Chuẩn Nha Khoa",
      transactionId = "", 
      rowIndex 
    } = req.body || {};

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";
    const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || "";
    const COURSE_AMOUNT = process.env.COURSE_AMOUNT || "299000";
    const formattedAmount = new Intl.NumberFormat("vi-VN").format(parseInt(COURSE_AMOUNT, 10) || 0);

    const originHost = (req.headers['x-forwarded-host'] || req.headers.host || '').toString();
    const cleanUrl = url || (originHost ? `https://${originHost}` : "https://tay-trang-rang-nha-khoa-299k.vercel.app");

    let updateData: any = {};
    if (!GOOGLE_SCRIPT_URL) {
      console.warn("GOOGLE_SCRIPT_URL is not set. Skipping sheet status update.");
    } else {
      try {
        const payload = {
          action: "update_status",
          phone: phone,
          status: "Đã thanh toán"
        };

        const updateRes = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const contentType = updateRes.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          updateData = await updateRes.json();
        } else {
          const text = await updateRes.text();
          console.warn(`Google Script confirm status returned text: ${text.substring(0, 100)}, status: ${updateRes.status}`);
        }
      } catch (scriptErr) {
        console.error("Failed to update Google Sheet:", scriptErr);
      }
    }

    // Use updated email/name from sheet or frontend fallback
    const customerEmail = updateData.email || email;
    const customerName = updateData.name || name;

    const isManual = transactionId.startsWith("MANUAL_");

    // Trigger Make.com webhook if email exists AND it's a REAL transaction (not MANUAL)
    if (customerEmail && !isManual && MAKE_WEBHOOK_URL) {
      console.log(`Triggering Make.com webhook for automation for ${customerEmail}...`);
      try {
        const makeRes = await fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: customerName,
            email: customerEmail,
            phone: phone,
            course: productName,
            transactionId
          })
        });
        if (!makeRes.ok) {
           console.error(`Make webhook failed with status: ${makeRes.status}`);
        }
      } catch (makeErr) {
         console.error("Failed to call Make webhook:", makeErr);
      }
    }

    // --- TELEGRAM NOTIFICATION ---
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8964853536:AAHuRNm_hY-YQtveBD1HlmthN4I5xpVzM8U";
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "2050406425";

    // Escape ký tự đặc biệt HTML cho Telegram API
    const escHtml = (s: string) => (s || '').toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      let tgMessage = "";
      if (isManual) {
        tgMessage = `⚠️ <b>Khách bấm nút nhưng CHƯA CK (hoặc SePay đang đối soát)</b>\n📦 <b>Sản phẩm:</b> ${escHtml(productName)}\n💰 <b>Số tiền:</b> ${formattedAmount} VNĐ\n🌐 <b>Trang đặt:</b> ${escHtml(cleanUrl)}\n👤 <b>Tên:</b> ${escHtml(customerName)}\n📞 <b>SĐT:</b> ${escHtml(phone)}\n✉️ <b>Email:</b> ${escHtml(customerEmail)}`;
      } else {
        tgMessage = `🎉 <b>ĐÃ NHẬN TIỀN THÀNH CÔNG (SePay Confirm)</b>\n📦 <b>Sản phẩm:</b> ${escHtml(productName)}\n💰 <b>Số tiền:</b> ${formattedAmount} VNĐ\n🌐 <b>Trang đặt:</b> ${escHtml(cleanUrl)}\n👤 <b>Tên:</b> ${escHtml(customerName)}\n📞 <b>SĐT:</b> ${escHtml(phone)}\n✉️ <b>Email:</b> ${escHtml(customerEmail)}\n🔖 <b>Mã GD:</b> ${escHtml(transactionId)}`;
      }

      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: tgMessage,
            parse_mode: "HTML"
          })
        });
        if (!tgRes.ok) {
          const text = await tgRes.text();
          console.error("Telegram API Error:", text);
        }
      } catch (tgErr) {
        console.error("Failed to send Telegram message:", tgErr);
      }
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Error confirming payment:", err);
    return res.status(500).json({ error: "Failed to confirm payment", details: err.message });
  }
}
