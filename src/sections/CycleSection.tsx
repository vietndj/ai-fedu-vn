import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, Sub } from "../components/ui";

export function CycleSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={860}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Label>{c.cycleLabel}</Label>
          <SH>{c.cycleHeading}</SH>
          <Sub>{c.cyclePara}</Sub>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, maxWidth: 860, margin: "0 auto"
        }}>
          {(c.cycleSteps || []).map((item, idx) => (
            <div key={idx} style={{
              background: `linear-gradient(135deg, ${t.accent}0a, transparent)`,
              border: `1px solid ${t.accent}33`,
              borderRadius: t.cardRadius,
              padding: "clamp(20px, 4vw, 32px)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: 12
            }}>
              <div style={{
                position: "absolute",
                top: "-50%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                height: "200%",
                background: `radial-gradient(ellipse at top, ${t.accent}15, transparent 70%)`,
                pointerEvents: "none",
              }} />
              
              <div style={{ fontFamily: t.fontMono, fontSize: 12, fontWeight: 600, color: "var(--cl-accent)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                // BƯỚC 0{idx + 1}
              </div>

              <h3 style={{ 
                fontFamily: t.fontBody, 
                fontSize: "clamp(18px, 3.5vw, 22px)", 
                fontWeight: 700, 
                color: "var(--cl-text-base, #111827)", 
                margin: "4px 0 8px",
                letterSpacing: "-0.015em"
              }}>
                {item.title}
              </h3>
              
              <p style={{ 
                fontSize: "clamp(14px, 3.2vw, 16px)", 
                lineHeight: 1.75, 
                color: "var(--cl-text-body, #374151)", 
                margin: 0,
                fontWeight: 400 
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Sec>
  );
}
