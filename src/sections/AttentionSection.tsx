import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, Sub } from "../components/ui";

export function AttentionSection() {
  const c = useContent();
  const t = useTheme();

  // 3 choices for comparison
  const defaultChoices = [
    {
      badge: "Lựa chọn 1",
      title: "Tự mày mò / Phương pháp cũ",
      cost: "Mất nhiều thời gian & Dễ thất bại",
      desc: "Tự thử nghiệm các phương pháp không có chuyên môn, vừa tốn kém vừa rủi ro không đạt hiệu quả.",
      isBest: false,
      tag: "❌ Mất Thời Gian"
    },
    {
      badge: "Lựa chọn 2",
      title: "Dịch vụ giá rẻ không rõ nguồn gốc",
      cost: "Tiềm ẩn nhiều rủi ro",
      desc: "Sử dụng dịch vụ kém chất lượng, không có cam kết và không có chuyên gia theo sát.",
      isBest: false,
      tag: "⚠️ Tốn Chi Phí"
    },
    {
      badge: "Lựa chọn 3 — KHUYÊN DÙNG",
      title: c.heroHeadline2 || "Giải Pháp Chuẩn Chuyên Khoa",
      cost: `Chỉ ${c.price} VNĐ (Tiết kiệm ${c.value ? `từ ${c.value}đ` : 'tối đa'})`,
      desc: c.heroSub || "Được thực hiện bởi chuyên gia, quy trình chuẩn y khoa, an toàn và cam kết hiệu quả tối đa.",
      isBest: true,
      tag: "🏆 Tối Ưu Nhất"
    }
  ];

  const choices = (c as any).attentionChoices || defaultChoices;

  return (
    <Sec maxWidth={960} id="attention">
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Label>{c.attentionLabel || "// LỰA CHỌN CỦA BẠN"}</Label>
          <SH typed>{c.attentionHeading || "Bạn Sẽ Lựa Chọn Hướng Đi Nào?"}</SH>
          <Sub>{c.attentionPara || "Đứng trước vấn đề hiện tại, bạn luôn có 3 con đường để cân nhắc:"}</Sub>
        </div>
      </FadeIn>

      {/* ── 3 Choices Comparison Cards ── */}
      <FadeIn delay={100}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {choices.map((item: any, idx: number) => {
            const isBest = item.isBest ?? (idx === choices.length - 1);
            return (
              <div
                key={idx}
                style={{
                  background: isBest ? "rgba(245, 158, 11, 0.08)" : "var(--cl-card, #ffffff)",
                  border: isBest ? `2px solid var(--cl-accent, #f59e0b)` : `1px solid var(--cl-line, rgba(0, 0, 0, 0.08))`,
                  borderRadius: "var(--cl-radius, 20px)",
                  padding: "32px 24px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: isBest ? `0 20px 50px -15px rgba(245, 158, 11, 0.3)` : "0 1px 3px rgba(0, 0, 0, 0.02)",
                  transform: isBest ? "scale(1.02)" : "none",
                  transition: "all 0.3s ease"
                }}
              >
                {isBest && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    background: "var(--cl-accent, #f59e0b)", color: "var(--cl-accent-text, #000)", padding: "4px 16px", borderRadius: 20,
                    fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap"
                  }}>
                    GIẢI PHÁP TỐI ƯU NHẤT
                  </div>
                )}
                <div style={{ fontSize: 12, fontWeight: 700, color: isBest ? "var(--cl-accent, #f59e0b)" : "var(--cl-text-muted, #64748b)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  {item.badge || `Lựa chọn 0${idx + 1}`}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--cl-text-base, #09090b)", marginBottom: 12, lineHeight: 1.3 }}>
                  {item.title}
                </h3>
                {item.cost && (
                  <div style={{
                    fontSize: 14, fontWeight: 700, color: "var(--cl-accent, #f59e0b)",
                    background: "rgba(245, 158, 11, 0.12)",
                    padding: "8px 14px", borderRadius: 10, marginBottom: 16, display: "inline-block", alignSelf: "flex-start"
                  }}>
                    {item.cost}
                  </div>
                )}
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--cl-text-body, #334155)", margin: 0, flexGrow: 1 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </Sec>
  );
}
