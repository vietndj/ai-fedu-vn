import React, { useState, useEffect, useRef } from "react";
import { siteConfig } from "./site.config";
import { useContent } from "./content";
import { useTheme } from "./theme";
import { ThemeSyncer, Div, CtaButton } from "./components/ui";
import { StudioBackground } from "./components/StudioBackground";
import { HeroSection } from "./sections/HeroSection";
import { DemoPhilosophySection } from "./sections/DemoPhilosophySection";
import { BridgeSection } from "./sections/BridgeSection";
import { PainSection } from "./sections/PainSection";
import { AttentionSection } from "./sections/AttentionSection";
import { RuleSection } from "./sections/RuleSection";
import { CycleSection } from "./sections/CycleSection";
import { DiscoverySection, SolutionSection } from "./sections/DiscoverySection";
import { ShowcaseSection } from "./sections/ShowcaseSection";
import { SkillsSection } from "./sections/SkillsSection";
import { MidCtaSection } from "./sections/MidCtaSection";
import { BeforeAfterSection } from "./sections/BeforeAfterSection";
import { RoadmapSection } from "./sections/RoadmapSection";
import { InstructorSection } from "./sections/InstructorSection";
import { QuoteSection } from "./sections/QuoteSection";
import { BonusSection } from "./sections/BonusSection";
import { FaqSection } from "./sections/FaqSection";
import { CtaSection } from "./sections/CtaSection";
import LiveSocialProof from "./LiveSocialProof";
import ParticleCanvas from "./components/ParticleCanvas";
import { useHeroScrollTransition, useRoadmapToQuoteTransition } from "./utils/useHeroScrollSnap";
import "./landing.css";

function StickyRegisterBar() {
  const t = useTheme();
  const c = useContent();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const formEl = document.getElementById("dang-ky");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const firstInput = formEl.querySelector("input");
        if (firstInput) firstInput.focus();
      }, 500);
    }
  };

  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 99999,
      maxWidth: "calc(100% - 32px)",
      width: 560,
      background: "rgba(18, 19, 22, 0.92)",
      border: "1px solid var(--cl-line)",
      borderRadius: 100,
      padding: "10px 14px 10px 22px",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxShadow: "0 16px 40px -10px rgba(0, 0, 0, 0.6), 0 0 24px rgba(245, 158, 11, 0.12)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      animation: "fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--cl-text-base)", lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          👑 {siteConfig.product.name.substring(0, 36)}... — {c.price}đ
        </div>
        <div style={{ fontSize: 12, color: "#10b981", fontWeight: 600, display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
          <span>🔥</span> Chỉ còn vài suất ưu đãi trong hôm nay
        </div>
      </div>
      <div
        onClick={handleRegisterClick}
        style={{
          cursor: "pointer",
          background: "var(--cl-accent)",
          color: "var(--cl-accent-text)",
          padding: "11px 22px",
          borderRadius: 100,
          fontWeight: 800,
          fontSize: 13,
          textDecoration: "none",
          boxShadow: "0 4px 16px rgba(245, 158, 11, 0.35)",
          whiteSpace: "nowrap",
          flexShrink: 0,
          transition: "transform 0.2s ease, opacity 0.2s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
      >
        ĐẶT LỊCH NGAY {c.price}K →
      </div>
    </div>
  );
}

export default function App() {
  const t = useTheme();
  const c = useContent();
  const isHidden = (id: string) => c.blocksMeta?.hidden?.includes(id) ?? false;

  const heroContentRef = useRef<HTMLDivElement>(null);
  const contentLayerRef = useRef<HTMLDivElement>(null);
  const demoCardRef = useRef<HTMLDivElement>(null);

  const roadmapContentRef = useRef<HTMLDivElement>(null);
  const quoteLayerRef = useRef<HTMLDivElement>(null);

  useHeroScrollTransition(heroContentRef, contentLayerRef, demoCardRef);
  useRoadmapToQuoteTransition(roadmapContentRef, quoteLayerRef);

  return (
    <div style={{ position: "relative", background: "var(--cl-bg)", color: "var(--cl-text-base)", fontFamily: t.fontBody, minHeight: "100vh" }}>
      <ThemeSyncer />
      <StudioBackground />

      {/* 1. HERO - FIXED BACKGROUND LAYER */}
      {!isHidden("hero") && (
        <div 
          className="cl-theme--dark cl-hero-fixed-layer"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100vh",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            pointerEvents: "auto",
          }}
        >
          <div 
            ref={heroContentRef} 
            style={{ 
              width: "100%", 
              willChange: "transform, opacity, filter",
              transformOrigin: "center 42%",
            }}
          >
            <HeroSection />
          </div>
        </div>
      )}

      {/* Spacer to push Content Layer so its top 140px peeks at the bottom of 100vh */}
      <div aria-hidden style={{ height: "calc(100vh - 140px)", pointerEvents: "none" }} />

      {/* 2. THE EDUCATION - LIGHT (Layer 2: Stacked Card Layer that physically overlaps Hero) */}
      <div 
        id="content-layer" 
        ref={contentLayerRef}
        className="cl-theme--light cl-stacked-layer--light"
        onClick={() => {
          if (window.scrollY < 60) {
            contentLayerRef.current?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        style={{
          position: "relative",
          zIndex: 10,
          background: "var(--cl-bg)",
          borderRadius: "40px 40px 0 0",
          borderTop: "1.5px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 -30px 80px -10px rgba(0, 0, 0, 0.6), 0 -4px 20px rgba(0, 0, 0, 0.15)",
          paddingTop: "60px",
          paddingBottom: "140px",
          willChange: "box-shadow",
        }}
      >
        {!isHidden("hero") && <><DemoPhilosophySection demoCardRef={demoCardRef} /><Div /></>}
        {!isHidden("hero") && <><BridgeSection /><Div /></>}
        {!isHidden("pain") && <><PainSection /><Div /></>}
        {!isHidden("attention") && <><AttentionSection /><Div /></>}
        {!isHidden("rule") && <><RuleSection /><Div /></>}
        {!isHidden("cycle") && <><CycleSection /><Div /></>}
        {!isHidden("solution") && <><SolutionSection /><Div /></>}
        
        {!isHidden("discovery") && <><DiscoverySection /><Div /></>}
                {!isHidden("showcase") && <><ShowcaseSection /><Div /></>}
        {!isHidden("skills") && <><SkillsSection /><Div /></>}

        {!isHidden("midCta") && <><MidCtaSection /><Div /></>}
        {!isHidden("before-after") && <><BeforeAfterSection /><Div /></>}

        {/* Khối 3 Chặng (Roadmap) - Lớp dưới sẽ mờ đi và thu nhỏ khi cuộn tiếp */}
        {!isHidden("roadmap") && (
          <div 
            ref={roadmapContentRef}
            style={{
              willChange: "transform, opacity, filter",
              transformOrigin: "center 45%",
            }}
          >
            <RoadmapSection />
          </div>
        )}
      </div>

      {/* 3. KHỐI TRÍCH DẪN & GIẢNG VIÊN (Layer 3: Stacked Card Layer trượt chồng lên Khối 3 Chặng) */}
      <div 
        id="quote-layer" 
        ref={quoteLayerRef}
        className="cl-theme--light cl-stacked-layer--light"
        style={{
          position: "relative",
          zIndex: 20,
          background: "var(--cl-bg)",
          borderRadius: "40px 40px 0 0",
          borderTop: "1.5px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 -30px 80px -10px rgba(0, 0, 0, 0.6), 0 -4px 20px rgba(0, 0, 0, 0.15)",
          paddingTop: "60px",
          marginTop: "-60px", // Subtle overlap offset
          willChange: "box-shadow",
        }}
      >
        {!isHidden("quote") && <><QuoteSection /><Div /></>}
        {!isHidden("instructor") && <><InstructorSection /><Div /></>}
        {!isHidden("bonus") && <><BonusSection /><Div /></>}
        {!isHidden("faq") && <><FaqSection /><Div /></>}
        {!isHidden("cta") && <><CtaSection /><Div /></>}

        {!isHidden("footer") && (
          <footer className="cl-footer" style={{ borderTop: `1px solid var(--cl-line, #e2e8f0)`, fontFamily: t.fontBody, marginTop: 40, paddingBottom: 60, textAlign: "center" }}>
            <div className="cl-footer__brand" style={{ fontFamily: t.fontDisplay, fontSize: "clamp(28px, 6vw, 42px)", letterSpacing: "-0.02em", color: "var(--cl-text-base, #09090b)" }}>
              {c.footerBrand}<span style={{ color: "var(--cl-accent, #f59e0b)" }}>{c.footerDot}</span>
            </div>
            <p className="cl-footer__tagline" style={{ whiteSpace: "pre-line", fontSize: "16px", lineHeight: 1.8, fontStyle: "italic", marginTop: 16, color: "var(--cl-text-body, #475569)" }}>
              {c.footerTagline}
            </p>
            <div className="cl-footer__links" style={{ marginTop: 24, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="https://www.facebook.com/nguyenducviet.video"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 18px",
                  borderRadius: 30,
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#334155",
                  textDecoration: "none",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "var(--cl-accent)";
                  e.currentTarget.style.color = "#09090b";
                  e.currentTarget.style.background = "#e2e8f0";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.color = "#334155";
                  e.currentTarget.style.background = "#f1f5f9";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook Fanpage</span>
              </a>

              <a
                href="https://www.facebook.com/nddviet"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 18px",
                  borderRadius: 30,
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#334155",
                  textDecoration: "none",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "var(--cl-accent)";
                  e.currentTarget.style.color = "#09090b";
                  e.currentTarget.style.background = "#e2e8f0";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.color = "#334155";
                  e.currentTarget.style.background = "#f1f5f9";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook Cá Nhân</span>
              </a>
            </div>
            <p className="cl-footer__copy" style={{ color: "var(--cl-text-muted, #94a3b8)", marginTop: 20 }}>
              {c.footerCopyright}
              <span style={{ opacity: 0.4, fontSize: "0.85em", marginLeft: 8 }}>(zalo : 0934.688.632)</span>
            </p>
          </footer>
        )}
      </div>

      <StickyRegisterBar />
      <LiveSocialProof />
    </div>
  );
}
