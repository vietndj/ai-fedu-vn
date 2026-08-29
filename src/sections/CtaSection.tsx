import React, { useState } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, Countdown, MediaSection } from "../components/ui";
import { validateForm } from "../utils/validation";

function IconGuarantee({ accent: c }: { accent: string }) {
  return (
    <svg width={44} height={44} viewBox="0 0 40 40" fill="none" style={{ animation: "ic-float 3.2s ease-in-out infinite", overflow: "visible" }}>
      <path d="M20 4 L34 10 L34 22 C34 30 20 38 20 38 C20 38 6 30 6 22 L6 10 Z"
        fill={`${c}14`} stroke={c} strokeWidth="1.8" strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 8px ${c}44)` }}/>
      <polyline points="13,21 17,26 27,15" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RegForm() {
  const t = useTheme();
  const c = useContent();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate name, email, phone & profanity
    const validation = validateForm(form.name, form.email, form.phone);
    if (!validation.isValid) {
      setErrorMsg(validation.error || "Vui lòng nhập thông tin hợp lệ.");
      return;
    }

    setLoading(true);
    
    // Save to localStorage for Checkout page to use
    const currentUrl = window.location.href;
    const customerData = { name: form.name.trim(), email: form.email.trim().toLowerCase(), phone: form.phone.trim(), url: currentUrl };
    localStorage.setItem("video_customer", JSON.stringify(customerData));

    // Bắn sự kiện Facebook Pixel
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }

    try {
      const res = await fetch("/api/lead/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData),
      });
      const data = await res.json() as { rowIndex?: number; error?: string };
      if (data.error) {
        setErrorMsg(data.error);
        setLoading(false);
        return;
      }
      if (data.rowIndex) localStorage.setItem("video_row", data.rowIndex.toString());
    } catch { 
      /* Nếu lỗi mạng thì cứ bỏ qua để khách vẫn qua trang thanh toán được */ 
    }
    
    // Chuyển hướng sang trang thanh toán sau khi gửi thành công
    window.location.href = "/checkout";
  };

  return (
    <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {[
        { name: "name", label: "Họ và tên *", type: "text", placeholder: "Nguyễn Văn A", required: true },
        { name: "email", label: "Email (để nhận khóa học) *", type: "email", placeholder: "nguyenvana@gmail.com", required: true },
        { name: "phone", label: "Số điện thoại *", type: "tel", placeholder: "0912 345 678", required: true },
      ].map((f) => (
        <div key={f.name}>
          <label htmlFor={`reg-${f.name}`} style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--cl-text-body, #334155)", marginBottom: 8 }}>{f.label}</label>
          <input
            id={`reg-${f.name}`}
            name={f.name}
            type={f.type}
            placeholder={f.placeholder}
            required={f.required}
            value={form[f.name as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
            style={{
              width: "100%", background: "#ffffff",
              border: `1.5px solid #cbd5e1`, borderRadius: t.btnRadius,
              padding: "14px 18px", color: "var(--cl-text-base, #09090b)", fontSize: 15,
              outline: "none", boxSizing: "border-box",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--cl-accent)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#cbd5e1"; }}
          />
        </div>
      ))}

      {errorMsg && (
        <div style={{ background: "#7f1d1d33", border: "1px solid #ef4444", borderRadius: t.btnRadius, padding: "12px 16px", color: "#fca5a5", fontSize: 14, lineHeight: 1.5, textAlign: "center" }}>
          {errorMsg}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading ? "#0a5560" : "var(--cl-accent)",
          color: "var(--cl-accent-text)",
          border: "none",
          borderRadius: t.btnRadius,
          padding: `${t.btnPaddingY}px ${t.btnPaddingX}px`,
          fontSize: 16,
          fontWeight: 500,
          cursor: loading ? "not-allowed" : "pointer",
          letterSpacing: "0.03em",
          boxShadow: loading ? "none" : t.accentGlow ? `0 0 32px -2px ${t.accent}66` : "none",
          marginTop: 8,
          opacity: loading ? 0.7 : 1,
          transition: "all 0.2s",
        }}
      >
        {loading ? "⏳ ĐANG XỬ LÝ..." : "ĐĂNG KÝ VÀ THANH TOÁN"}
      </button>
      <p style={{ textAlign: "center", fontSize: 13, color: "#666", fontStyle: "italic", marginTop: 4 }}>
        Thông tin của bạn được bảo mật tuyệt đối
      </p>
    </form>
  );
}

export function CtaSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <section id="dang-ky" style={{ maxWidth: 760, margin: "84px auto 0", padding: "0 20px" }}>
      <FadeIn>
        <div style={{ background: `linear-gradient(135deg, var(--cl-card), var(--cl-card2))`, border: `1px solid var(--cl-accent)`, borderRadius: "clamp(16px, 4vw, 28px)", overflow: "hidden" }}>
          <div style={{ background: "var(--cl-accent)", padding: "14px 24px", textAlign: "center" }}>
            <p style={{ fontSize: 14, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--cl-accent-text)" }}>
              {c.urgencyBar.replace("{PRICE}", c.price)}
            </p>
          </div>
          <div style={{ padding: "clamp(24px, 6vw, 48px) clamp(16px, 5vw, 40px)" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <Label>{c.ctaLabel}</Label>
              <SH typed>{c.ctaHeading}</SH>
              <p style={{ fontSize: 16, color: "var(--cl-text-body, #334155)", marginBottom: 32, lineHeight: 1.75 }}>{c.ctaSub}</p>
              <div style={{ marginBottom: 36 }}>
                <p style={{ fontSize: 13, color: "var(--cl-text-muted, #64748b)", marginBottom: 16, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--cl-font-mono)" }}>{c.countdownLabel}</p>
                <Countdown />
              </div>
            </div>

            <div style={{ background: "var(--cl-card, #ffffff)", border: `1px solid var(--cl-line, #e2e8f0)`, borderRadius: t.cardRadius, padding: "26px 24px", marginBottom: 32 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--cl-text-base, #09090b)", marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--cl-font-mono)" }}>{c.valueStackTitle}</p>

              {c.valueStack.map(({ label, price }, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 12, alignItems: "baseline" }}>
                  <span style={{ fontSize: 14, color: "var(--cl-text-body, #334155)", lineHeight: 1.5 }}>{label}</span>
                  <span style={{ fontSize: 14, color: "var(--cl-text-muted, #64748b)", fontFamily: "var(--cl-font-mono)", flexShrink: 0 }}>{price}</span>
                </div>
              ))}

              <div style={{ borderTop: `1px solid var(--cl-line, #e2e8f0)`, marginTop: 14, paddingTop: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--cl-font-mono)" }}>🎁 KÈM THEO — CHỈ TRONG ĐỢT NÀY:</p>
                {(c as any).bonusItems?.map((item: any, i: number) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10, alignItems: "baseline" }}>
                    <span style={{ fontSize: 13, color: "var(--cl-text-body, #334155)", lineHeight: 1.5, display: "flex", gap: 6 }}>
                      <span style={{ color: "var(--cl-accent, #f59e0b)", flexShrink: 0 }}>✓</span>
                      {item.title}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--cl-text-muted, #64748b)", fontFamily: "var(--cl-font-mono)", flexShrink: 0, textDecoration: "line-through" }}>250.000đ</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: `1px solid var(--cl-line, #e2e8f0)`, marginTop: 14, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 14, color: "#64748b", textDecoration: "line-through", fontFamily: "var(--cl-font-mono)" }}>Tổng giá trị thực tế: {c.value} VNĐ</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: "#b45309", fontFamily: "var(--cl-font-mono)" }}>Hôm nay: {c.price} VNĐ</span>
              </div>
            </div>

            <RegForm />

            <div style={{ marginTop: 32, paddingTop: 28, borderTop: `1px solid var(--cl-line, #e2e8f0)`, textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <IconGuarantee accent={t.accent} />
              </div>
              <p style={{ fontSize: 15, color: "var(--cl-text-body, #334155)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto", fontStyle: "italic", textWrap: "balance" }}>
                {c.guarantee}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
