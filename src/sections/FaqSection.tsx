import React, { useState } from "react";
import { useTheme } from "../theme";
import { useContent } from "../content";
import { FadeIn, Label, SH, Sec, Sub } from "../components/ui";

export function FaqSection() {
  const t = useTheme();
  const c = useContent();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = (c as any).checkoutFaqs || (c as any).faqs || [
    {
      q: "Quy trình đăng ký và đặt lịch diễn ra như thế nào?",
      a: "Sau khi hoàn tất thanh toán giữ suất trên website, đội ngũ chuyên viên sẽ liên hệ với bạn trong vòng 24h để xác nhận thông tin và sắp xếp lịch hẹn phù hợp nhất."
    },
    {
      q: "Có phát sinh thêm chi phí nào khác không?",
      a: "Hoàn toàn không. Chi phí trọn gói đã bao gồm toàn bộ dịch vụ và các quà tặng kèm theo."
    },
    {
      q: "Nếu tôi có việc bận đột xuất có được đổi lịch hẹn không?",
      a: "Hoàn toàn được. Bạn chỉ cần thông báo trước ít nhất 12-24 giờ để được hỗ trợ dời lịch hẹn sang khung giờ thuận tiện hơn."
    }
  ];

  return (
    <Sec maxWidth={860} id="faq">
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Label>// CÂU HỎI THƯỜNG GẶP</Label>
          <SH typed>{(c as any).faqHeading || "Giải Đáp Thắc Mắc Thường Gặp"}</SH>
          <Sub>{(c as any).faqSub || "Những thông tin cần biết trước khi đăng ký dịch vụ:"}</Sub>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq: any, idx: number) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                style={{
                  background: "var(--cl-card, #ffffff)",
                  border: `1px solid ${isOpen ? "var(--cl-accent, #f59e0b)" : "var(--cl-line, rgba(0,0,0,0.08))"}`,
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: isOpen ? "0 8px 24px -6px rgba(245, 158, 11, 0.2)" : "0 1px 3px rgba(0, 0, 0, 0.02)",
                  transition: "all 0.25s ease"
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "18px 22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "none",
                    border: "none",
                    color: "var(--cl-text-base, #09090b)",
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: t.fontBody,
                    gap: 12
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>💬</span>
                    <span style={{ lineHeight: 1.45 }}>{faq.q}</span>
                  </div>
                  <span style={{ 
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", 
                    transition: "transform 0.25s ease",
                    color: t.accent,
                    fontSize: 18,
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    ↓
                  </span>
                </button>
                
                {isOpen && (
                  <div style={{ 
                    padding: "0 24px 20px 52px",
                    color: "var(--cl-text-body, #334155)",
                    lineHeight: 1.7,
                    fontSize: 15
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </FadeIn>
    </Sec>
  );
}
