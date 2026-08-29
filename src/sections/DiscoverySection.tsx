import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, CtaButton, Sub, useIsMobile } from "../components/ui";

export function DiscoverySection() {
  const c = useContent();
  const t = useTheme();
  const isMobile = useIsMobile();
  return (
    <Sec maxWidth={860} id="discovery">
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Label>{c.discoveryLabel || "// CHI TIẾT DỊCH VỤ"}</Label>
          <SH typed>{c.discoveryHeading || "Quy trình thực hiện chuẩn khoa học"}</SH>
          <Sub>{c.discoverySub || "Từng bước được thực hiện tỉ mỉ và an toàn:"}</Sub>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {(c.discoveryItems || []).map((item, i) => (
            <div key={i} style={{
              background: "var(--cl-card, #ffffff)", border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
              borderRadius: "var(--cl-radius, 16px)", padding: isMobile ? "20px" : "24px 28px",
              display: "flex", alignItems: "flex-start", gap: 20,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)"
            }}>
              <div style={{
                fontFamily: t.fontMono, fontSize: 14, fontWeight: 700, color: "var(--cl-accent, #f59e0b)",
                background: "rgba(245, 158, 11, 0.12)", border: "1px solid rgba(245, 158, 11, 0.25)",
                padding: "6px 12px", borderRadius: 8, flexShrink: 0
              }}>
                0{i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontFamily: t.fontDisplay, fontSize: "clamp(17px, 2.2vw, 20px)", fontWeight: 700, color: "var(--cl-text-base, #09090b)", margin: "0 0 8px 0" }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--cl-text-body, #334155)", margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Sec>
  );
}

export function SolutionSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={860} id="solution">
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Label>{c.solutionLabel || "// KẾT QUẢ ĐẠT ĐƯỢC"}</Label>
          <SH typed>{c.solutionHeading || "Hiệu quả rõ rệt sau chương trình"}</SH>
          <Sub>{c.solutionSub || "Cảm nhận sự khác biệt vượt trội:"}</Sub>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{
          background: "var(--cl-card, #ffffff)", border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
          borderRadius: "var(--cl-radius, 20px)", padding: "clamp(24px, 5vw, 40px)", display: "flex", flexDirection: "column", gap: 20,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)"
        }}>
          {c.solutionItems.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <span style={{ color: "var(--cl-accent, #f59e0b)", fontSize: 22, lineHeight: 1, flexShrink: 0 }}>✓</span>
              <p style={{ fontSize: 16.5, color: "var(--cl-text-base, #09090b)", lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{item}</p>
            </div>
          ))}
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <CtaButton label={c.heroCta || "ĐĂNG KÝ NGAY →"} />
          </div>
        </div>
      </FadeIn>
    </Sec>
  );
}
