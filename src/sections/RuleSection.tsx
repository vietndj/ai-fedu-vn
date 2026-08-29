import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, Sub } from "../components/ui";

export function RuleSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={860}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Label>{c.ruleLabel}</Label>
          <SH typed>{c.ruleHeading}</SH>
          <Sub>{c.rulePara}</Sub>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24
        }}>
          {c.ruleItems?.map((item, i) => (
            <div key={i} style={{
              background: "var(--cl-card)", border: `1px solid var(--cl-line)`,
              borderLeft: `3px solid var(--cl-accent)`,
              borderRadius: t.cardRadius, padding: "28px", display: "flex", flexDirection: "column", gap: 12
            }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--cl-accent)", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0, fontFamily: t.fontMono }}>
                💡 SỰ THẬT 0{i + 1}: {item.fail}
              </p>
              <div style={{ width: 24, height: 1, background: "var(--cl-line)", margin: "4px 0" }} />
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--cl-text-base, #e2e8f0)", margin: 0 }}>
                {item.why}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
      {c.ruleConclusion && (
        <FadeIn delay={180}>
          <div style={{ marginTop: 32, background: `${t.accent}12`, border: `1px solid ${t.accent}44`, borderRadius: t.cardRadius, padding: "20px 24px", textAlign: "center" }}>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--cl-text-base, #111827)", fontStyle: "italic", margin: 0, fontWeight: 500 }}>
              {c.ruleConclusion}
            </p>
          </div>
        </FadeIn>
      )}
    </Sec>
  );
}
