import { siteConfig } from './site.config';
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "./theme";
import { useContent } from "./content";
import LiveSocialProof from "./LiveSocialProof";
import ZaloChatWidget from "./ZaloChatWidget";
import { IconCheck } from "./components/ui";

function useIsMobile(breakpoint = 680) {
  const [mobile, setMobile] = useState(() => window.innerWidth < breakpoint);
  const update = useCallback(() => setMobile(window.innerWidth < breakpoint), [breakpoint]);
  useEffect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);
  return mobile;
}

const GREEN = "#10b981"; // Emerald green for success states

export const LANTAN_FAQS = [
  {
    q: "1. \"Tôi không giỏi nói chuyện, coaching có giúp được không?\"",
    a: "Chắc chắn rồi. Coaching tập trung vào việc khơi gợi và lắng nghe. Chuyên gia sẽ hướng dẫn bạn cách diễn đạt tự nhiên nhất, dùng giao tiếp không bạo lực để đối phương hiểu mà bạn không cần phải là một người 'giỏi ăn nói'."
  },
  {
    q: "2. \"Vợ/chồng tôi không muốn tham gia thì sao?\"",
    a: "Chỉ cần một người sẵn sàng thay đổi cũng đủ để phá vỡ vòng xoáy bế tắc. Khi bạn thay đổi cách phản ứng và giao tiếp, đối phương cũng sẽ tự động điều chỉnh theo một cách tích cực."
  },
  {
    q: "3. \"8 tuần có đủ để thay đổi không?\"",
    a: "Nghiên cứu khoa học tâm lý chỉ ra rằng cần trung bình 66 ngày để hình thành một thói quen mới. 8 tuần là khoảng thời gian lý tưởng để thiết lập nền tảng, 2 buổi follow-up tặng kèm sau đó sẽ giúp bạn duy trì kết quả bền vững."
  },
  {
    q: "4. \"Coaching khác gì tư vấn tâm lý?\"",
    a: "Tư vấn tâm lý thường tập trung vào phân tích quá khứ và chẩn đoán. Coaching hướng tới giải pháp (Solution-focused), giúp bạn nhận diện vấn đề hiện tại và xây dựng các bước hành động cụ thể để đạt được kết quả."
  },
  {
    q: "5. \"Ngoài 1.990.000 này, có phát sinh chi phí gì thêm không?\"",
    a: "Không. Đây là chi phí trọn gói cho lộ trình 8 tuần cùng tất cả các quà tặng và công cụ kèm theo. Mọi thông tin tài chính luôn được chúng tôi minh bạch ngay từ đầu."
  }
];

// ─── Countdown (15-minute timer stored in sessionStorage) ───
function Countdown({ label = "Ưu đãi kết thúc sau:", hideLabel = false }: { label?: string; hideLabel?: boolean }) {
  const theme = useTheme();
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const duration = 15 * 60 * 1000; // 15 minutes
    let startStr = sessionStorage.getItem("video_checkout_timer_start");
    let startTime = startStr ? parseInt(startStr, 10) : 0;

    // Reset if expired to loop the FOMO timer
    if (!startTime || Date.now() - startTime > duration) {
      startTime = Date.now();
      sessionStorage.setItem("video_checkout_timer_start", startTime.toString());
    }

    let id: any;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      const totalSec = Math.floor(remaining / 1000);

      setMinutes(Math.floor(totalSec / 60));
      setSeconds(totalSec % 60);

      if (remaining <= 0 && id) {
        clearInterval(id);
      }
    };

    tick();
    id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const Box = ({ v, l }: { v: string; l: string }) => (
    <div style={{ textAlign: "center" }}>
      <div style={{ background: theme.card2, border: `1px solid ${theme.line}`, borderRadius: 10, padding: "10px 16px", minWidth: 54 }}>
        <span style={{ fontSize: 26, fontWeight: 500, color: theme.accent, fontVariantNumeric: "tabular-nums" }}>{v}</span>
      </div>
      <span style={{ fontSize: 12, color: theme.textMuted ?? "#555", letterSpacing: "0.12em", fontWeight: 500 }}>{l}</span>
    </div>
  );

  return (
    <div>
      {!hideLabel && label && <p style={{ fontSize: 13, color: theme.textMuted ?? "#777", textAlign: "center", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>{label}</p>}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", alignItems: "center" }}>
        <Box v={pad(minutes)} l="PHÚT" />
        <span style={{ fontSize: 22, color: theme.accent, fontWeight: 500, paddingBottom: 14 }}>:</span>
        <Box v={pad(seconds)} l="GIÂY" />
      </div>
    </div>
  );
}

function Ck({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
      <span style={{ color: GREEN, fontWeight: 500, flexShrink: 0, fontSize: 16 }}>✓</span>
      <span style={{ fontSize: 15, lineHeight: 1.65, color: t.textBody ?? "#c0c0c0" }}>{children}</span>
    </div>
  );
}

function Card({ children, highlight = false, style: extraStyle = {} }: { children: React.ReactNode; highlight?: boolean; style?: React.CSSProperties }) {
  const t = useTheme();
  return (
    <div style={{
      background: highlight ? `linear-gradient(135deg, ${t.card}, ${t.card2})` : t.card,
      border: `1px solid ${highlight ? t.accent + "44" : t.line}`,
      borderRadius: t.cardRadius,
      padding: "24px 20px",
      ...extraStyle,
    }}>
      {children}
    </div>
  );
}

function Lbl({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return <div style={{ fontFamily: t.fontMono, fontSize: 13, fontWeight: 500, letterSpacing: "0.2em", color: t.accent, textTransform: "uppercase" as const, marginBottom: 10 }}>{children}</div>;
}

function H({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <h2 className="cl-sh" style={{ fontSize: "clamp(24px, 4vw, 36px)" }}>
      {children}
    </h2>
  );
}

function PaymentSuccessModal({ onClose }: { onClose: () => void }) {
  const t = useTheme();
  const c = useContent();
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.88)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
      animation: "fadeIn 0.3s ease",
    }}>
      <div style={{
        background: `linear-gradient(135deg, ${t.bg}, ${t.card2})`,
        border: `1px solid ${GREEN}`,
        borderRadius: t.cardRadius, padding: "48px 32px",
        maxWidth: 480, width: "100%", textAlign: "center",
        boxShadow: `0 0 80px ${GREEN}44, 0 24px 64px rgba(0,0,0,0.8)`,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: 16, margin: "0 auto 20px",
          background: `linear-gradient(135deg, ${t.accent}22, transparent)`,
          border: `1px solid ${t.accent}44`,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ transform: "scale(1.2)" }}>
            <IconCheck accent={t.accent} />
          </div>
        </div>
        <h2 className="cl-sh" style={{ fontSize: "clamp(24px, 4vw, 36px)" }}>
          Thanh toán thành công!
        </h2>
        <p style={{ fontSize: 15, color: t.textBody ?? "#aaa", lineHeight: 1.75, margin: "0 0 24px" }}>
          Chúng tôi đã nhận được chuyển khoản của bạn.
        </p>
        <div style={{ background: t.card, border: `1px solid ${t.line}`, borderRadius: t.cardRadius, padding: "20px 24px", marginBottom: 24 }}>
          <p style={{ fontSize: 15, color: t.textMuted ?? "#666", marginBottom: 8, fontWeight: 600 }}>📧 Tài liệu và liên kết truy cập:</p>
          <p style={{ fontSize: 16, fontWeight: 500, color: GREEN, margin: "0 0 4px" }}>Đã được gửi tới email của bạn</p>
          <p style={{ fontSize: 13, color: t.textMuted ?? "#555" }}>Vui lòng kiểm tra hộp thư (kể cả Spam) sau vài phút nhé!</p>
        </div>
        <div style={{ background: t.card2, borderRadius: Math.max(8, t.cardRadius - 4), padding: "14px 20px", marginBottom: 24 }}>
          {["🎬 Gói Bàn Giao 3 Trợ Lý AI Cho Video", "🎁 Trọn bộ 3 công cụ tự động hóa & web bán hàng", "♾ Hỗ trợ Zalo 1-1 & Sở hữu vĩnh viễn"].map((item) => (
            <div key={item} style={{ fontSize: 15, color: t.textBody ?? "#b0b0b0", padding: "4px 0", textAlign: "left" }}>{item}</div>
          ))}
        </div>
        <button onClick={() => window.location.href = "/"} style={{
          background: t.accent, color: t.accentText, border: "none",
          borderRadius: t.btnRadius, padding: "14px 36px",
          fontSize: 15, fontWeight: 500, cursor: "pointer",
          boxShadow: `0 0 24px ${t.accent}66`,
        }}>
          Đóng & Về trang chủ
        </button>
      </div>
    </div>
  );
}

function ConfirmBanner({ onReset }: { onReset: () => void }) {
  const t = useTheme();
  const c = useContent();
  return (
    <div style={{ textAlign: "center", padding: "40px 20px", background: t.card2, border: `1px solid ${GREEN}44`, borderRadius: t.cardRadius }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16, margin: "0 auto 16px",
          background: `linear-gradient(135deg, ${t.accent}22, transparent)`,
          border: `1px solid ${t.accent}44`,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <IconCheck accent={t.accent} />
        </div>
      <h2 className="cl-sh" style={{ fontSize: "clamp(24px, 4vw, 36px)" }}>
        Cảm ơn bạn đã chuyển khoản!
      </h2>
      <p style={{ fontSize: 15, color: t.textBody ?? "#aaa", lineHeight: 1.75, maxWidth: 460, margin: "0 auto 24px" }}>
        Chúng tôi đang xác minh giao dịch. Bạn sẽ nhận được tài liệu qua email <strong style={{ color: "var(--cl-text-base, #111827)" }}>trong vòng 30 phút</strong> (giờ hành chính).
      </p>
      <div style={{ display: "inline-flex", flexDirection: "column", gap: 10, background: t.card, border: `1px solid ${t.line}`, borderRadius: Math.max(8, t.cardRadius - 4), padding: "20px 24px", marginBottom: 20, textAlign: "left" }}>
        {["🎬 Gói Bàn Giao 3 Trợ Lý AI Cho Video", "🎁 Trọn bộ 3 công cụ tự động hóa & web bán hàng", "♾ Hỗ trợ Zalo 1-1 & Sở hữu vĩnh viễn"].map((item) => (
          <span key={item} style={{ fontSize: 15, color: t.textBody ?? "#c0c0c0" }}>{item}</span>
        ))}
      </div>
      <p style={{ fontSize: 15, color: t.textMuted ?? "#555", lineHeight: 1.6 }}>Chưa nhận email sau 30 phút? Liên hệ <a href="mailto:vietndj@gmail.com" style={{ color: t.accent }}>vietndj@gmail.com</a> &nbsp;|&nbsp; Zalo: <a href="https://zalo.me/0934688632" style={{ color: t.accent }}>0934.688.632</a></p>
      <button onClick={onReset} style={{ marginTop: 20, background: "transparent", border: `1px solid ${t.line}`, borderRadius: t.btnRadius, padding: "10px 24px", color: t.textMuted ?? "#555", fontSize: 13, cursor: "pointer" }}>
        Quay lại trang thanh toán
      </button>
    </div>
  );
}

type BankInfo = { name: string; account: string; holder: string; amount: string; content: string };

function PaymentPanel({ bank, qrUrl, onConfirm, onVideoClick }: { bank: BankInfo; qrUrl: string; onConfirm: () => void; onVideoClick: () => void }) {
  const c = useContent();
  const t = useTheme();
  const priceVal = parseInt(c.price.replace(/\./g, ""), 10);
  const originalVal = parseInt(c.value.replace(/\./g, ""), 10);
  const savingVal = originalVal - priceVal;
  const formattedSaving = new Intl.NumberFormat("vi-VN").format(savingVal);
  const prefix = (c as any).transferPrefix || siteConfig.product.transferPrefix;

  return (
    <Card highlight style={{ padding: "24px 20px" }}>


      <Lbl>Thanh toán ngay</Lbl>

      {/* ✨ [POSITION 2 BADGE] Phiên bản Cập nhật Tháng 7/2026 */}
      <div style={{
        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.14), rgba(16, 185, 129, 0.04))",
        border: "1px solid rgba(16, 185, 129, 0.4)",
        borderRadius: 12,
        padding: "10px 14px",
        marginBottom: 16,
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(16, 185, 129, 0.15)"
      }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#10b981", letterSpacing: "0.03em", textTransform: "uppercase" }}>
          ✨ PHIÊN BẢN CHÍNH THỨC CẬP NHẬT THÁNG 7/2026
        </div>
        <div style={{ fontSize: 12, color: "var(--cl-text-body, #374151)", marginTop: 3 }}>
          Bảo chứng chính chủ &amp; Hỗ trợ trực tiếp từ NGUYỄN ĐỨC VIỆT
        </div>
      </div>

      {/* Pricing block */}
      <div style={{ textAlign: "center", marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid ${t.line}` }}>
        <div style={{ fontSize: 15, color: t.textMuted ?? "#555", textDecoration: "line-through" }}>{c.value} VNĐ</div>
        <div style={{ fontSize: 36, fontWeight: 500, color: t.textBase ?? "#fff" }}>{c.price} <span style={{ fontSize: 16 }}>VNĐ</span></div>
        <div style={{ fontSize: 15, color: t.accent, fontWeight: 500 }}>Tiết kiệm {formattedSaving} VNĐ</div>
      </div>

      {/* 🎁 [Khối Quà Tặng FOMO] (Trên cùng) */}
      <div style={{
        background: "rgba(249, 115, 22, 0.08)", 
        border: "1px solid rgba(249, 115, 22, 0.35)",
        borderRadius: 14,
        padding: "18px 16px",
        marginBottom: 20,
        textAlign: "left"
      }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12, textAlign: "center" }}>
          🎁 QUÀ TẶNG BẢO ĐẢM NHẬN NGAY
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
          {c.bonusItems.slice(0, 2).map((bonus, idx) => (
            <div key={idx} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ color: "#f97316", fontSize: 15, lineHeight: 1.2 }}>✓</span>
              <p style={{ fontSize: 13, color: "var(--cl-text-base, #111827)", margin: 0, lineHeight: 1.4, fontWeight: 600 }}>
                {bonus.title}
              </p>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px dashed rgba(249, 115, 22, 0.2)", paddingTop: 10, textAlign: "center" }}>
          <p style={{ fontSize: 12.5, color: "var(--cl-text-body, #374151)", margin: "0 0 8px", fontWeight: 500 }}>
            Quà tặng sẽ tự động hủy sau:
          </p>
          <Countdown hideLabel />
        </div>
      </div>
      {/* 🎁 [Khối Hỗ trợ trực tiếp từ giảng viên] */}
      <div style={{
        background: "rgba(249, 115, 22, 0.08)",
        border: "1px solid #f97316",
        borderRadius: 14,
        padding: "18px 16px",
        marginBottom: 20,
        textAlign: "left",
        boxShadow: "0 0 30px rgba(249, 115, 22, 0.2)"
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10, textAlign: "center" }}>
          🎁 HỖ TRỢ TRỰC TIẾP TỪ GIẢNG VIÊN
        </div>
        <p style={{ fontSize: 13, color: "var(--cl-text-base, #111827)", margin: "0 0 8px", lineHeight: 1.5, fontWeight: 500 }}>
          Sau khi đăng ký, bạn cứ kết nối Zalo trực tiếp với mình. Kẹt chỗ nào trong quá trình thực hành hay triển khai công cụ, mình hỗ trợ gỡ rối ngay chỗ đó.
        </p>
        <p style={{ fontSize: 12, color: "#f97316", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>
          (Thông tin Zalo cá nhân của mình được gửi kèm trong email kích hoạt ngay sau khi thanh toán!)
        </p>
      </div>
      {/* 📱 [Khối Mã QR & Thanh Toán] (Ở giữa, to nhất) */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: t.accent, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          📱 QUÉT MÃ ĐỂ VÀO LỚP NGAY
        </p>
        <div style={{ 
          width: "100%",
          maxWidth: 340,
          margin: "0 auto",
          background: "#fff", 
          borderRadius: 16, 
          boxShadow: `0 0 40px ${t.accent}22`,
          border: `1px solid ${t.line}`,
          overflow: "hidden"
        }}>
          <img
            src={qrUrl}
            alt="QR chuyển khoản Khóa học"
            style={{ 
              display: "block", 
              width: "114%", 
              maxWidth: "none", 
              marginLeft: "-7%", 
              marginTop: "-4%", 
              marginBottom: "-2%", 
              objectFit: "contain" 
            }}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.style.display = "none";
              const parent = img.parentElement;
              if (parent) {
                parent.innerHTML = `<div style="width:100%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;background:#141417;border-radius:8px;font-size:12px;color:#fff;text-align:center;padding:16px;">QR lỗi</div>`;
              }
            }}
          />
        </div>
        <p style={{ fontSize: 15, color: t.textMuted ?? "#555", marginTop: 10 }}>Tương thích: Momo, VCB, Techcombank, MB Bank, BIDV, v.v.</p>
      </div>



      {/* NEW INSTRUCTIONS */}
      <div style={{ marginBottom: 18, background: t.card2, borderRadius: 12, padding: "14px 16px", border: `1px solid ${t.line}` }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: t.textMuted ?? "#777", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Hướng dẫn siêu tốc</p>
        <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
          <span style={{ background: t.accent, color: t.accentText, fontSize: 12, fontWeight: 500, borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>1</span>
          <span style={{ fontSize: 15, color: t.textBody ?? "#b0b0b0" }}>Mở App Ngân hàng quét mã QR bên trên.</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ background: t.accent, color: t.accentText, fontSize: 12, fontWeight: 500, borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>2</span>
          <span style={{ fontSize: 15, color: t.textBody ?? "#b0b0b0" }}>
            Nhập nội dung: <strong style={{ color: "var(--cl-text-base, #111827)" }}>{prefix} + [Số điện thoại của bạn]</strong>
          </span>
        </div>
      </div>

      {/* BACKUP_OLD_DESIGN_START
      <div style={{ background: t.card2, border: `1px solid ${t.line}`, borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: t.textMuted ?? "#777", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Thông tin chuyển khoản</p>
        {[
          ["Ngân hàng", bank.name],
          ["Chủ tài khoản", bank.holder],
          ["Số tài khoản", bank.account],
          ["Số tiền", `${bank.amount} VNĐ`],
          ["Nội dung CK", bank.content],
        ].map(([label, value]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, gap: 8 }}>
            <span style={{ fontSize: 15, color: t.textMuted ?? "#555", flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: 15, color: t.textBase ?? "#fff", fontWeight: 600, textAlign: "right" }}>{value}</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 18 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: t.textMuted ?? "#777", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Hướng dẫn từng bước</p>
        {[
          "Mở app ngân hàng → Chuyển khoản → Quét QR hoặc nhập số TK",
          `Nhập số tiền: ${bank.amount} VNĐ`,
          "Nội dung: VIDEO [SĐT của bạn]",
          "Xác nhận và hoàn tất chuyển khoản",
          'Nhấn nút "Tôi đã chuyển khoản" bên dưới',
        ].map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
            <span style={{ background: t.accent, color: t.accentText, fontSize: 11, fontWeight: 500, borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
            <span style={{ fontSize: 15, color: t.textBody ?? "#b0b0b0", lineHeight: 1.55 }}>{step}</span>
          </div>
        ))}
      </div>
      BACKUP_OLD_DESIGN_END */}

      <button
        onClick={onConfirm}
        style={{
          width: "100%", background: t.accent, color: t.accentText, border: "none",
          borderRadius: t.btnRadius, padding: "16px 16px",
          fontSize: 15, fontWeight: 500, cursor: "pointer",
          letterSpacing: "0.04em", textTransform: "uppercase",
          boxShadow: `0 0 32px 4px ${t.accent}44`,
        }}
      >
        ✅ TÔI ĐÃ CHUYỂN KHOẢN
      </button>

      {/* BACKUP_OLD_GUARANTEE_START
      <div style={{ 
        marginTop: 14, 
        padding: "10px 12px", 
        background: `${GREEN}11`, 
        border: `1px dashed ${GREEN}44`, 
        borderRadius: 10,
        display: "flex",
        alignItems: "flex-start",
        gap: 8
      }}>
        <span style={{ color: GREEN, fontSize: 16, lineHeight: 1 }}>🛡️</span>
        <p style={{ fontSize: 12.5, color: t.textBody ?? "#ccc", margin: 0, lineHeight: 1.45, textAlign: "left" }}>
          <strong>Cam kết đồng hành:</strong> Bất kể bạn gặp khó khăn nào về góc máy, ánh sáng, thiết bị hay kịch bản, nhận ngay lịch gọi Zoom 1-1 để mình trực tiếp gỡ rối.
        </p>
      </div>
      BACKUP_OLD_GUARANTEE_END */}

      <p style={{ fontSize: 15, color: t.textMuted ?? "#555", textAlign: "center", marginTop: 16, marginBottom: 20, lineHeight: 1.6 }}>
        Link truy cập khóa học gửi qua email trong vài phút sau khi xác nhận.
      </p>

      {/* 💬 Zalo Support Safety Net */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <p style={{ fontSize: 14, color: t.textBody ?? "#ccc", marginBottom: 12, fontWeight: 600, textWrap: "balance" as any }}>
          🎧 Gặp sự cố khi quét mã hoặc chưa nhận được link?
        </p>
        <a
          href="https://zalo.me/0934688632"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: "rgba(0, 104, 255, 0.1)",
            border: "1px solid rgba(0, 104, 255, 0.4)",
            color: "#0068ff",
            padding: "12px 16px",
            borderRadius: 12,
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 14,
            whiteSpace: "normal",
            textAlign: "center",
            lineHeight: 1.4,
            transition: "all 0.2s ease",
            cursor: "pointer",
            animation: "zalo-glow 1.5s infinite"
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = "rgba(0, 104, 255, 0.15)"; }}
          onMouseOut={(e) => { e.currentTarget.style.background = "rgba(0, 104, 255, 0.1)"; }}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" style={{ width: 20, height: 20, flexShrink: 0 }} />
          <span>Thanh toán xong ko thấy gì, nhắn mình 0934688632</span>
        </a>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 18, paddingTop: 14, borderTop: `1px solid ${t.line}`, flexWrap: "nowrap", overflowX: "auto" }}>
        {[["🔒", "Bảo mật"], ["↩", "Hoàn tiền 24h"], ["⚡", "Nhận ngay"]].map(([icon, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: t.textMuted ?? "#555", whiteSpace: "nowrap" }}>
            <span>{icon}</span><span>{label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function UrgencyNote() {
  const c = useContent();
  const t = useTheme();
  return (
    <div style={{ background: t.card2, border: `1px solid ${t.accent}33`, borderRadius: Math.max(8, t.cardRadius - 4), padding: "16px 18px" }}>
      <p style={{ fontSize: 13, fontWeight: 500, color: t.accent, marginBottom: 6 }}>⚠ Lưu ý quan trọng</p>
      <p style={{ fontSize: 15, color: t.textBody ?? "#888", lineHeight: 1.65, margin: 0 }}>
        Ưu đãi {c.price} VNĐ chỉ dành riêng cho 50 người đầu tiên. Sau khi đợt kết thúc, giá sẽ trở về <strong style={{ color: t.textBase ?? "#fff" }}>{c.value} VNĐ</strong> và không áp dụng thêm ưu đãi.
      </p>
    </div>
  );
}

function GuaranteeBox() {
  const t = useTheme();
  const c = useContent();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Box 1: Money Back */}
      <div style={{ background: t.card2, border: `1px solid ${GREEN}33`, borderRadius: Math.max(8, t.cardRadius - 4), padding: "16px 18px" }}>
        <p style={{ fontSize: 15, fontWeight: 500, color: GREEN, marginBottom: 8 }}>💰 Cam kết chất lượng dịch vụ</p>
        <p style={{ fontSize: 14.5, color: t.textBody ?? "#cbd5e1", lineHeight: 1.65, margin: 0 }}>
          {c.guarantee || "Chúng tôi cam kết hoàn tiền 100% nếu bạn không hài lòng về chất lượng phục vụ và quy trình thực hiện."}
        </p>
      </div>
      {/* Box 2: Support */}
      <div style={{ background: t.card2, border: `1px solid ${t.accent}33`, borderRadius: Math.max(8, t.cardRadius - 4), padding: "16px 18px" }}>
        <p style={{ fontSize: 15, fontWeight: 500, color: t.accent, marginBottom: 8 }}>🛡️ Đồng hành & Hỗ trợ tận tâm 1-1</p>
        <p style={{ fontSize: 14.5, color: t.textBody ?? "#cbd5e1", lineHeight: 1.65, margin: 0 }}>
          Đội ngũ chuyên viên và tư vấn viên luôn sẵn sàng giải đáp mọi thắc mắc của bạn qua Hotline/Zalo: {siteConfig.seller.phone}.
        </p>
      </div>
    </div>
  );
}

function CheckoutContent() {
  const t = useTheme();
  const c = useContent();
  const priceVal = parseInt(c.price.replace(/\./g, ""), 10);
  const originalVal = parseInt(c.value.replace(/\./g, ""), 10);
  const savingVal = originalVal - priceVal;
  const formattedSaving = new Intl.NumberFormat("vi-VN").format(savingVal);
  const [confirmed, setConfirmed] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const isMobile = useIsMobile();

  // ── GUARD: Chặn cứng khách chưa điền form ──
  const rawCustomer = localStorage.getItem("video_customer");
  const customer = rawCustomer ? JSON.parse(rawCustomer) as { name?: string; phone?: string; email?: string } : null;

  useEffect(() => {
    if (!customer || !customer.name || !customer.email || !customer.phone) {
      window.location.href = "/";
    }
  }, []);

  // Nếu chưa có data, render loading rồi redirect
  if (!customer || !customer.name || !customer.email || !customer.phone) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: t.bg, color: t.textMuted ?? "#888", fontFamily: t.fontBody }}>
        <p>Đang chuyển hướng về trang đăng ký...</p>
      </div>
    );
  }

  const phone = customer.phone;
  const prefix = (c as any).transferPrefix || siteConfig.product.transferPrefix;
  const transferContent = `${prefix} ${phone}`;

  const BANK: BankInfo = { name: siteConfig.payment.bankName, account: siteConfig.payment.accountNumber, holder: siteConfig.payment.accountName, amount: c.price, content: transferContent };
  const QR_URL = `https://img.vietqr.io/image/${siteConfig.payment.bankCode}-${BANK.account}-compact2.png?amount=${c.price.replace(/\./g, '')}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(BANK.holder)}`;

  // Bắn sự kiện InitiateCheckout khi truy cập trang thanh toán
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: priceVal || parseInt(siteConfig.product.price.replace(/\./g, ''), 10),
        currency: 'VND',
        content_name: siteConfig.product.name
      });
    }
  }, [priceVal]);

  const handleManualConfirm = async () => {
    const raw = localStorage.getItem("video_customer");
    const cust = raw ? JSON.parse(raw) as { name?: string; phone?: string; email?: string; url?: string } : {};
    
    // 1. Chặn khách chưa điền Form
    if (!cust.phone || !cust.name || !cust.email) {
      alert("Vui lòng điền thông tin đăng ký trước khi xác nhận chuyển khoản để hệ thống có thông tin gửi tài liệu!");
      window.location.href = "/";
      return;
    }

    // 2. Chặn Spam click liên tục (Cooldown 3 phút)
    const lastConfirm = sessionStorage.getItem("video_manual_confirm_time");
    if (lastConfirm && Date.now() - parseInt(lastConfirm) < 3 * 60 * 1000) {
      alert("Hệ thống đang xử lý yêu cầu trước đó của bạn. Vui lòng chờ 3 phút để hệ thống đối soát giao dịch.");
      setConfirmed(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    sessionStorage.setItem("video_manual_confirm_time", Date.now().toString());

    alert("Cảm ơn bạn! Chúng tôi đã ghi nhận yêu cầu và đang kiểm tra giao dịch. Vui lòng chờ hệ thống xác nhận trong vài phút.");
    setConfirmed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Bắn sự kiện Purchase Meta Pixel khi xác nhận thủ công
    try {
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq('track', 'Purchase', {
          value: priceVal || parseInt(siteConfig.product.price.replace(/\./g, ''), 10),
          currency: 'VND',
          content_name: siteConfig.product.name
        });
      }
    } catch (e) {
      console.error("Meta Pixel Error:", e);
    }

    try {
      const raw = localStorage.getItem("video_customer");
      const cust = raw ? JSON.parse(raw) as { name?: string; phone?: string; email?: string; url?: string } : {};
      const rowIndex = parseInt(localStorage.getItem("video_row") ?? "0", 10) || undefined;
      await fetch("/api/payment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cust.name ?? "",
          phone: cust.phone ?? "",
          email: cust.email ?? "",
          url: cust.url ?? "",
          transactionId: "MANUAL_" + Date.now(),
          rowIndex,
        }),
      });
    } catch { /* silent */ }
  };

  // Polling: detect payment automatically via SePay
  useEffect(() => {
    let since = localStorage.getItem("video_payment_since");
    if (!since) {
      since = Date.now().toString();
      localStorage.setItem("video_payment_since", since);
    }
    let active = true;

    const poll = async () => {
      if (!active || paymentSuccess) return;
      try {
        const res = await fetch(`/api/payment/check?since=${since}&phone=${phone}`);
        if (!res.ok) return;
        const data = await res.json() as { found: boolean; transaction?: { id: string } };
        if (data.found && active && !paymentSuccess) {
          setPaymentSuccess(true);
          setShowModal(true);
          localStorage.removeItem("video_payment_since");
          
          // Bắn sự kiện Purchase Meta Pixel khi tự động kiểm tra thấy thanh toán thành công
          if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq('track', 'Purchase', {
              value: priceVal || parseInt(siteConfig.product.price.replace(/\./g, ''), 10),
              currency: 'VND',
              content_name: siteConfig.product.name
            });
          }

          const raw = localStorage.getItem("video_customer");
          const customer = raw ? JSON.parse(raw) as { name?: string; phone?: string; email?: string; url?: string } : {};
          const rowIndex = parseInt(localStorage.getItem("video_row") ?? "0", 10) || undefined;
          await fetch("/api/payment/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: customer.name ?? "",
              phone: customer.phone ?? "",
              email: customer.email ?? "",
              url: customer.url ?? "",
              transactionId: data.transaction?.id ?? "",
              rowIndex,
            }),
          });
        }
      } catch { /* silent */ }
    };

    const id = setInterval(poll, 5000);
    poll();
    return () => { active = false; clearInterval(id); };
  }, [paymentSuccess, phone, priceVal]);

  return (
    <div style={{ background: t.bg, color: t.textBase ?? "#fff", fontFamily: t.fontBody, minHeight: "100vh" }}>
      {showModal && <PaymentSuccessModal onClose={() => setShowModal(false)} />}
      {showVideoModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99999,
          background: "rgba(0,0,0,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16,
        }}
        onClick={() => setShowVideoModal(false)}
        >
          <div style={{
            position: "relative",
            maxWidth: 800,
            width: "100%",
            aspectRatio: "16 / 9",
            background: "#000",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 0 50px rgba(0,0,0,0.8)",
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/CaDZiACYrV8?autoplay=1" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              style={{ border: "none" }}
            />
            <button 
              onClick={() => setShowVideoModal(false)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "rgba(0,0,0,0.6)",
                border: "none",
                color: "#fff",
                fontSize: 20,
                cursor: "pointer",
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <header style={{ borderBottom: `1px solid ${t.line}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 700, color: t.textBase ?? "#fff" }}>
          {siteConfig.branding.siteName || "CHECKOUT"}<span style={{ color: t.accent }}>.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🔒</span>
          <span style={{ fontSize: 15, color: t.textMuted ?? "#888" }}>Thanh toán bảo mật</span>
        </div>
      </header>

      {/* ── URGENCY BAR ── */}
      <div style={{ background: t.accent, padding: "10px 16px", textAlign: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", lineHeight: 1.4, color: t.accentText || "#000" }}>
          ⚡ ƯU ĐÃI ĐẶC BIỆT — HOÀN TẤT CHUYỂN KHOẢN NGAY ĐỂ GIỮ SUẤT GIÁ TỐT NHẤT
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 80px" }}>

        {/* ── DECISION CONFIRMATION ── */}
        <div style={{ textAlign: "center", padding: "40px 0 0" }}>
          <Lbl>Xác nhận quyết định</Lbl>
          <h1 className="cl-sh">
            Bạn đang hoàn tất đơn hàng<br />
            <em style={{ color: t.accent, fontStyle: "normal", fontWeight: 700 }}>
              {(c as any).checkoutTitle || siteConfig.product.name}
            </em>
          </h1>
          <p style={{ fontSize: 15, color: t.textMuted ?? "#888", maxWidth: 520, margin: "0 auto 12px", lineHeight: 1.6 }}>
            Chỉ còn một bước nữa — quét mã chuyển khoản để hoàn tất giữ suất ưu đãi và nhận dịch vụ ngay hôm nay.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: t.card2, border: `1px solid ${GREEN}33`, borderRadius: 50, padding: "8px 20px" }}>
            <span style={{ color: GREEN, fontSize: 14 }}>✓</span>
            <span style={{ fontSize: 15, color: t.textBody ?? "#aaa" }}>Bạn đã đăng ký thành công — chỉ cần hoàn tất thanh toán</span>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr min(360px, 100%)",
          gap: 20,
          marginTop: 36,
          alignItems: "start",
        }}>

          {/* MOBILE: QR panel first */}
          {isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {confirmed
                ? <ConfirmBanner onReset={() => setConfirmed(false)} />
                : <PaymentPanel bank={BANK} qrUrl={QR_URL} onConfirm={handleManualConfirm} onVideoClick={() => setShowVideoModal(true)} />
              }
              <UrgencyNote />
              <GuaranteeBox />
            </div>
          )}

          {/* LEFT column — order details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            
            {/* PRICING TABLE CARD */}
            <Card>
              <Lbl>Thông tin đơn hàng</Lbl>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: t.textBase ?? "#fff" }}>{siteConfig.product.name}</div>
                  <div style={{ fontSize: 14.5, color: t.textMuted ?? "#888", marginTop: 4 }}>Trọn gói ưu đãi + Toàn bộ quà tặng kèm theo</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, color: t.accent, fontWeight: 600 }}>Tiết kiệm {formattedSaving} VNĐ</div>
                  <div style={{ fontSize: 30, fontWeight: 700, color: t.textBase ?? "#fff" }}>{c.price}<span style={{ fontSize: 16 }}> VNĐ</span></div>
                </div>
              </div>
            </Card>

            {/* WHAT YOU GET */}
            <Card>
              <Lbl>Bạn nhận được gì ngay hôm nay</Lbl>
              <H>Quyền lợi trọn gói bao gồm</H>
              {((c as any).checkoutFeatures || c.solutionItems.slice(0, 4)).map((item: string, i: number) => <Ck key={i}>{item}</Ck>)}
            </Card>

            {/* BONUS STACK */}
            {c.bonusItems && c.bonusItems.length > 0 && (
              <Card>
                <Lbl>🎁 Quà Tặng Độc Quyền Kèm Theo</Lbl>
                <H><em>Bàn giao trọn gói không phát sinh chi phí</em></H>
                {c.bonusItems.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>
                      {i === 0 ? "🌟" : i === 1 ? "🎁" : i === 2 ? "📋" : "✨"}
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: t.textBase ?? "#fff" }}>0{i + 1}. {b.title}</div>
                      <div style={{ fontSize: 14, color: t.textMuted ?? "#888" }}>{b.desc}</div>
                    </div>
                  </div>
                ))}
              </Card>
            )}

            {/* TESTIMONIALS */}
            {(c as any).checkoutTestimonials && (c as any).checkoutTestimonials.length > 0 && (
              <Card>
                <Lbl>Khách hàng nói gì về dịch vụ</Lbl>
                {((c as any).checkoutTestimonials as any[]).map((testimonial: any, i: number) => (
                  <div key={i} style={{ borderTop: i === 0 ? "none" : `1px solid ${t.line}`, paddingTop: i === 0 ? 0 : 16, marginBottom: 16 }}>
                    <div style={{ color: "#FFB800", fontSize: 13, marginBottom: 6 }}>★★★★★</div>
                    <p style={{ fontSize: 14.5, color: t.textBody ?? "#b0b0b0", fontStyle: "italic", lineHeight: 1.65, marginBottom: 8 }}>"{testimonial.text}"</p>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: t.textBase ?? "#fff" }}>
                      👉 {testimonial.name} <span style={{ color: t.textMuted ?? "#888", fontWeight: 400 }}>— {testimonial.role}</span>
                    </div>
                  </div>
                ))}
              </Card>
            )}

            {/* GIẢI ĐÁP THẮC MẮC */}
            <Card>
              <Lbl>Giải đáp những thắc mắc trước khi thanh toán</Lbl>
              {((c as any).checkoutFaqs || LANTAN_FAQS).map((f: any, i: number) => (
                <div key={i} style={{ borderBottom: i < ((c as any).checkoutFaqs || LANTAN_FAQS).length - 1 ? `1px solid ${t.line}` : "none" }}>
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    style={{
                      width: "100%", background: "none", border: "none", color: t.textBase ?? "#fff", cursor: "pointer",
                      padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                      textAlign: "left", fontSize: 15, fontWeight: 600, lineHeight: 1.55,
                    }}
                  >
                    <span style={{ flex: 1 }}>{f.q}</span>
                    <span style={{ color: t.accent, fontSize: 18, flexShrink: 0, transition: "transform 0.2s", transform: faqOpen === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                  </button>
                  {faqOpen === i && (
                    <div style={{ fontSize: 14.5, color: t.textBody ?? "#888", lineHeight: 1.75, paddingBottom: 16 }}>
                      👉 {f.a}
                    </div>
                  )}
                </div>
              ))}
            </Card>
          </div>

          {/* RIGHT column — desktop only */}
          {!isMobile && (
            <div style={{ position: "sticky", top: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              {confirmed
                ? <ConfirmBanner onReset={() => setConfirmed(false)} />
                : <PaymentPanel bank={BANK} qrUrl={QR_URL} onConfirm={handleManualConfirm} onVideoClick={() => setShowVideoModal(true)} />
              }
              <UrgencyNote />
              <GuaranteeBox />
            </div>
          )}
        </div>

        {/* ── FINAL CTA BAR ── */}
        <div style={{ marginTop: 40, background: `linear-gradient(135deg, ${t.card}, ${t.card2})`, border: `1px solid ${t.accent}33`, borderRadius: t.cardRadius, padding: "32px 24px", textAlign: "center" }}>
          <Lbl>Bước cuối cùng</Lbl>
          <h2 className="cl-sh" style={{ fontSize: "clamp(24px, 4vw, 36px)" }}>
            Chuyển khoản ngay và bắt đầu<br /><span style={{ color: t.accent, fontWeight: 500 }}>lột xác hình ảnh chuyên gia hôm nay.</span>
          </h2>
          <p style={{ fontSize: 15, color: t.textBody ?? "#777", marginBottom: 24, lineHeight: 1.65 }}>
            Trong khi những người khác vẫn chật vật với công việc làm tay tốn thời gian và công sức — bạn sẽ thảnh thơi vì 80% công việc đã được tự động hóa nhờ Hệ Thống AI Creator.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              background: t.accent, color: t.accentText, border: "none", borderRadius: t.btnRadius,
              padding: "18px 40px", fontSize: 16, fontWeight: 500, cursor: "pointer",
              letterSpacing: "0.04em", textTransform: "uppercase",
              boxShadow: `0 0 40px 6px ${t.accent}66`,
            }}
          >
            ↑ QUAY LÊN ĐỂ THANH TOÁN
          </button>
          <p style={{ fontSize: 15, color: t.textMuted ?? "#555", marginTop: 16 }}>
            Đảm bảo hoàn tiền 100% trong 24 giờ · Truy cập vĩnh viễn
          </p>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ textAlign: "center", paddingTop: 48, borderTop: `1px solid ${t.line}`, marginTop: 40 }}>
          <div style={{ fontFamily: t.fontDisplay, fontSize: 20, fontWeight: 500, marginBottom: 12, color: t.textBase ?? "#fff" }}>
            AI CREATOR<span style={{ color: t.accent }}>.</span>
          </div>
          <p style={{ fontSize: 15, color: t.textMuted ?? "#444", lineHeight: 1.8 }}>
            © 2026 AI Creator System · fedu.vn · Mọi quyền được bảo lưu.<br />
            <a href="mailto:vietndj@gmail.com" style={{ color: t.textMuted ?? "#555" }}>vietndj@gmail.com</a> | Zalo: 0934.688.632
          </p>
        </div>
      </div>
      <LiveSocialProof />
      <ZaloChatWidget />
    </div>
  );
}

export default function Checkout() {
  return <CheckoutContent />;
}
