import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, AppYTEmbed, Sub } from "../components/ui";

export function BeforeAfterSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={860}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Label>{c.baLabel}</Label>
          <SH typed>{c.baHeading}</SH>
          {c.baSub && <Sub>{c.baSub}</Sub>}
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
          {c.baBeforeMedia && (
            <div style={{ maxWidth: 420, width: "100%", margin: "32px auto", borderRadius: 32, overflow: "hidden", border: `2px solid ${t.accent}44`, boxShadow: `0 0 30px -10px ${t.accent}44` }}>
              <AppYTEmbed url={c.baBeforeMedia} />
            </div>
          )}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32,
            width: "100%", maxWidth: 720, margin: "0 auto",
          }}>
            <div style={{
              background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255, 255, 255, 0.03)",
              borderRadius: t.cardRadius, padding: "24px 28px",
            }}>
              <div style={{
                fontFamily: t.fontMono, fontSize: 12, letterSpacing: "0.1em", color: "var(--cl-danger)",
                fontWeight: 500, textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>✕</span> {c.beforeLabel}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {c.beforeItems.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", textAlign: "left" }}>
                    <span style={{ color: "var(--cl-danger)" }}>—</span>
                    <span style={{ fontSize: 15, color: "#888", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: `${t.accent}04`, border: `1px solid ${t.accent}22`,
              borderRadius: t.cardRadius, padding: "24px 28px",
            }}>
              <div style={{
                fontFamily: t.fontMono, fontSize: 12, letterSpacing: "0.1em", color: "var(--cl-accent)",
                fontWeight: 500, textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>✓</span> {c.afterLabel}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {c.afterItems.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", textAlign: "left" }}>
                    <span style={{ color: "var(--cl-accent)" }}>✓</span>
                    <span style={{ fontSize: 15, color: "var(--cl-text-base, #111827)", lineHeight: 1.5, fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Sec>
  );
}
