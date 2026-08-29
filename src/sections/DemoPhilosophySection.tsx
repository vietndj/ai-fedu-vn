import React, { type RefObject } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, ScrollTypewriter, MediaSection, Sub, useIsMobile } from "../components/ui";

export function DemoPhilosophySection({ demoCardRef }: { demoCardRef?: RefObject<HTMLDivElement | null> }) {
  const c = useContent();
  const t = useTheme();
  const isMobile = useIsMobile();

  return (
    <>
      <section style={{ position: "relative", textAlign: "center", padding: "0 20px 0", maxWidth: 960, margin: "0 auto" }}>
        {/* Video Demo Real */}
        {(c as any).heroVideoYoutubeId && (
          <div 
            ref={demoCardRef}
            style={{
              maxWidth: 420, width: "100%", margin: "0 auto 72px",
              background: "#08080a", border: "clamp(4px, 2vw, 10px) solid #141416", borderRadius: "clamp(24px, 6vw, 48px)",
              padding: 0, boxShadow: `0 32px 60px -16px rgba(0,0,0,0.3), 0 0 40px -10px ${t.accent}22`,
              position: "relative", overflow: "hidden",
              zIndex: 10,
              willChange: "transform, opacity",
              transformOrigin: "center top",
            }}
          >
            <div style={{
              position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
              width: 90, height: 20, background: "#000", borderRadius: 10, zIndex: 10, border: "1.5px solid #222228",
            }} />
            <div style={{ position: "relative", paddingBottom: "177.78%", height: 0, overflow: "hidden", borderRadius: 38, background: "#000" }}>
              <iframe
                src={`https://www.youtube.com/embed/${(c as any).heroVideoYoutubeId}?rel=0&modestbranding=1&showinfo=0`}
                title="Video giới thiệu"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </section>
      
      <MediaSection blockId="hero" />

      {/* 1B: Triết lý & Trụ Cột Nền Tảng */}
      <section style={{ 
        position: "relative", padding: "clamp(48px, 10vw, 100px) clamp(16px, 4vw, 24px)", maxWidth: 880, margin: "0 auto", 
        textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${t.accent}04 1px, transparent 1px), linear-gradient(90deg, ${t.accent}04 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)",
        }} />
        <FadeIn>
          <div className="cl-label">
            <span style={{ opacity: 0.4 }}>// </span>{c.heroBadge || "GIẢI PHÁP ĐỘT PHÁ"}
          </div>
          <h2 className="cl-sh" style={{ fontFamily: t.fontDisplay }}>
            <ScrollTypewriter text={c.heroAccentLine || c.heroHeadline1} speed={7} />
          </h2>
          <Sub>{c.heroSub}</Sub>

          {/* 3 Mini Capsule Cards (Render 100% động từ c.philosophyAssets) */}
          {c.philosophyAssets && c.philosophyAssets.length > 0 && (
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : `repeat(${Math.min(c.philosophyAssets.length, 3)}, 1fr)`,
              gap: 16,
              width: "100%",
              maxWidth: 860,
              margin: "24px auto 0",
              textAlign: "left"
            }}>
              {c.philosophyAssets.map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    background: t.card,
                    border: `1px solid ${t.line}`,
                    borderRadius: 14,
                    padding: isMobile ? "18px 16px" : "20px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    boxShadow: "0 4px 16px -4px rgba(0, 0, 0, 0.03)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.borderColor = t.accent;
                    e.currentTarget.style.boxShadow = `0 10px 24px -6px ${t.accent}33`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.borderColor = t.line;
                    e.currentTarget.style.boxShadow = "0 4px 16px -4px rgba(0, 0, 0, 0.03)";
                  }}
                >
                  {/* Card Header: Badge + Icon + Title */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      fontFamily: t.fontMono,
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: t.accent,
                      background: `${t.accent}15`,
                      border: `1px solid ${t.accent}33`,
                      padding: "2px 7px",
                      borderRadius: 6,
                      flexShrink: 0
                    }}>
                      {card.n || `0${idx + 1}`}
                    </span>
                    <span style={{ fontSize: 16 }}>{card.icon || "✨"}</span>
                    <h3 style={{
                      margin: 0,
                      fontSize: "clamp(15px, 1.6vw, 16.5px)",
                      fontWeight: 700,
                      color: t.textBase || "#f8fafc",
                      lineHeight: 1.35
                    }}>
                      {card.title || card.tag}
                    </h3>
                  </div>

                  {/* Card Description */}
                  <p style={{
                    margin: 0,
                    fontSize: "clamp(13px, 1.3vw, 13.8px)",
                    lineHeight: 1.65,
                    color: t.textBody || "#cbd5e1"
                  }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </FadeIn>
      </section>
    </>
  );
}
