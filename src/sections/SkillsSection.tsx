import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, AppYTEmbed, useIsMobile } from "../components/ui";

export function SkillsSection() {
  const c = useContent();
  const t = useTheme();
  const isMobile = useIsMobile();

  return (
    <Sec id="skills" maxWidth={860}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Label>{c.skillsLabel || "// CÔNG NGHỆ & KỸ THUẬT ÁP DỤNG"}</Label>
          <SH typed>{c.skillsHeading}</SH>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {c.skillCards.map((card, i) => {
            const hasMedia = Boolean(card.gif || card.youtubeId);
            return (
              <div
                key={i}
                style={{
                  background: t.card,
                  border: `1px solid ${t.line}`,
                  borderLeft: `4px solid ${t.accent}`,
                  borderRadius: t.cardRadius || 16,
                  padding: isMobile ? "24px 20px" : "32px 36px",
                  display: "grid",
                  gridTemplateColumns: isMobile || !hasMedia ? "1fr" : "1.2fr 0.8fr",
                  gap: 24,
                  alignItems: "center",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{
                      fontFamily: t.fontMono,
                      fontSize: 13,
                      fontWeight: 800,
                      color: t.accent,
                      background: `${t.accent}18`,
                      border: `1px solid ${t.accent}33`,
                      padding: "3px 8px",
                      borderRadius: 6
                    }}>
                      {card.n || `0${i + 1}`}
                    </span>
                    <h4 style={{
                      fontFamily: t.fontDisplay,
                      fontSize: "clamp(18px, 2.5vw, 22px)",
                      lineHeight: 1.3,
                      fontWeight: 700,
                      color: t.textBase || "#f8fafc",
                      margin: 0
                    }}>
                      {card.title}
                    </h4>
                  </div>
                  <p style={{
                    fontSize: "clamp(14.5px, 1.8vw, 16px)",
                    lineHeight: 1.75,
                    color: t.textBody || "#cbd5e1",
                    margin: 0
                  }}>
                    {card.desc}
                  </p>
                </div>
                
                {hasMedia && (
                  <div style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    border: `1px solid ${t.line}`,
                    background: t.card2,
                    aspectRatio: card.aspectRatio || "16 / 9"
                  }}>
                    {card.gif && (
                      <img src={card.gif} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    )}
                    {card.youtubeId && (
                      <div style={{ width: "100%", height: "100%", position: "relative" }}>
                        <AppYTEmbed url={`https://youtube.com/shorts/${card.youtubeId}`} />
                      </div>
                    )}
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
