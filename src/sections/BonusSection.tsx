import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, Sub, BONUS_ICONS } from "../components/ui";

export function BonusSection() {
  const c = useContent();
  const t = useTheme();

  return (
    <Sec maxWidth={940} id="bonus">
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Label>{c.bonusLabel}</Label>
          <SH typed>{c.bonusHeading}</SH>
          <Sub>{c.bonusSub}</Sub>
        </div>
      </FadeIn>
      
      <FadeIn delay={100}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {c.bonusItems.map((item: any, i: number) => {
            const Icon = BONUS_ICONS[i % BONUS_ICONS.length];
            const hasSideGif = !!item.gifDemo;

            return (
              <div
                key={i}
                className="cl-bonus-card"
                style={{
                  padding: "clamp(22px, 4vw, 32px)",
                  display: "grid",
                  gridTemplateColumns: hasSideGif ? "repeat(auto-fit, minmax(min(100%, 260px), 1fr))" : "1fr",
                  gap: 24,
                  alignItems: "center"
                }}
              >
                {/* Left Column: Icon + Header + Description */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: "rgba(245, 158, 11, 0.08)",
                    border: "1px solid rgba(245, 158, 11, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon accent={t.accent} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                      <span style={{
                        fontFamily: t.fontMono,
                        fontSize: 12,
                        color: t.accent,
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase"
                      }}>
                        QUÀ TẶNG THỰC CHIẾN 0{i + 1}
                      </span>
                    </div>
                    <h4 style={{
                      fontFamily: t.fontBody,
                      fontSize: 20,
                      fontWeight: 700,
                      color: "var(--cl-text-base, #0f172a)",
                      margin: "0 0 10px 0",
                      lineHeight: 1.35
                    }}>
                      {item.title}
                    </h4>
                    <div
                      style={{
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: "var(--cl-text-body, #475569)",
                        margin: 0
                      }}
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
                    
                    {item.audioDemo && (
                      <div style={{ marginTop: 18, padding: "14px 16px", background: "var(--cl-card2, #f8fafc)", borderRadius: 14, border: `1px solid var(--cl-line, #e2e8f0)` }}>
                        <div style={{ fontSize: 13, color: "var(--cl-accent, #f59e0b)", marginBottom: 8, fontWeight: 700, letterSpacing: "0.03em" }}>🎧 NGHE THỬ ÂM THANH BẢN QUYỀN MẪU:</div>
                        <audio controls src={item.audioDemo} style={{ width: "100%", height: 38, outline: "none", borderRadius: 8 }} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Optional Right Column: GIF Demo */}
                {hasSideGif && (
                  <div style={{
                    background: "#000",
                    border: `1px solid ${t.accent}44`,
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
                  }}>
                    <img
                      src={item.gifDemo}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: 220,
                        objectFit: "cover",
                        display: "block"
                      }}
                    />
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
