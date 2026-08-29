import React, { useState, useEffect } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, ScrollTypewriter, CtaButton, AppYTEmbed, MediaSection } from "../components/ui";

export function HeroSection() {
  const c = useContent();
  const t = useTheme();
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setHeroReady(true), 80); return () => clearTimeout(timer); }, []);

  return (
    <>
      <section style={{ 
        position: "relative", textAlign: "center", padding: "clamp(32px, 5vh, 56px) 20px clamp(40px, 8vh, 72px)", 
        maxWidth: 960, margin: "0 auto",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
      }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${t.accent}08 1px, transparent 1px), linear-gradient(90deg, ${t.accent}08 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }} />
        <div style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s ease, transform 0.7s ease", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* 1 Clean Capsule Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(245, 158, 11, 0.08)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            borderRadius: 100, padding: "8px 20px", marginBottom: 20,
            boxShadow: "0 2px 12px rgba(245, 158, 11, 0.08)",
          }}>
            <span style={{ fontSize: 13, color: "var(--cl-accent)" }}>👑</span>
            <span style={{
              fontFamily: t.fontMono, fontSize: 13, fontWeight: 600,
              color: "var(--cl-accent)", letterSpacing: "0.06em", textTransform: "uppercase",
            }}>
              {c.heroBadge || "TÍCH HỢP AI 2026 — DÀNH CHO CREATOR & CHỦ KINH DOANH"}
            </span>
          </div>

          <h1 className="cl-sh cl-hero__h1" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, margin: "0 0 24px" }}>
            {c.heroHeadline1 && (
              <span className="cl-hero__eyebrow-span" style={{ display: "block", fontSize: "clamp(22px, 3.8vw, 40px)", color: "var(--cl-accent)", fontFamily: t.fontAccent, fontStyle: "italic", fontWeight: 300, margin: 0, letterSpacing: "-0.01em" }}>
                {c.heroHeadline1}
              </span>
            )}
            <span style={{
              fontSize: "clamp(24px, 4vw, 46px)", lineHeight: 1.25,
              fontWeight: 500, letterSpacing: "-0.018em",
              color: "var(--cl-text-base)", fontFamily: t.fontDisplay,
              maxWidth: "28ch", textWrap: "balance", textAlign: "center",
            }}>
              {c.heroHeadline2 || "Để AI Làm 80% — Bạn Chỉ Cần Xuất Hiện & Sáng Tạo."}
            </span>
          </h1>

          {(c as any).heroPoem && (c as any).heroPoem.length > 0 && (
            <div style={{
              margin: "0 auto 24px",
              maxWidth: 480,
              background: "rgba(255, 255, 255, 0.01)",
              border: `1px dashed ${t.accent}33`,
              borderRadius: 16,
              padding: "16px clamp(16px, 4vw, 28px)",
              position: "relative",
              backdropFilter: "blur(8px)",
              boxShadow: `0 8px 32px -8px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)`,
            }}>
              <span style={{ position: "absolute", top: 4, left: 16, fontSize: 36, fontFamily: "Georgia, serif", color: `${t.accent}33`, lineHeight: 1, userSelect: "none" }}>“</span>
              <div style={{
                fontFamily: t.fontDisplay, fontSize: "clamp(16px, 2.2vw, 20px)", fontStyle: "italic",
                fontWeight: 600, color: "var(--cl-accent)", lineHeight: 1.6, textAlign: "center",
                display: "flex", flexDirection: "column", gap: 5, position: "relative", zIndex: 2,
              }}>
                {(c as any).heroPoem.map((line: string, i: number) => (
                  <span key={i}>{line}</span>
                ))}
              </div>
              <span style={{ position: "absolute", bottom: -16, right: 16, fontSize: 36, fontFamily: "Georgia, serif", color: `${t.accent}33`, lineHeight: 1, userSelect: "none" }}>”</span>
            </div>
          )}

          <div className="cl-hero__cta-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <a
              href="#roadmap"
              onClick={(e) => { e.preventDefault(); document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" }); }}
              className="cl-btn cl-btn--solid"
              style={{ fontSize: 15, padding: "14px 34px" }}
            >
              {c.heroCta}
            </a>
            <p className="cl-hero__sub-price" style={{ marginTop: 8, fontSize: 13.5 }}>
              {c.heroSubPrice}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
