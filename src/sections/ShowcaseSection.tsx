import React, { useState } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn } from "../components/ui";

export function ShowcaseSection() {
  const t = useTheme();
  const c = useContent();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  if (!c.showcaseVideos || c.showcaseVideos.length === 0) return null;

  return (
    <section id="showcase" className="cl-sec cl-sec--full" style={{ paddingBottom: 60 }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          {c.showcaseLabel && <div className="cl-label">{c.showcaseLabel}</div>}
          <h2 className="cl-sh" style={{ maxWidth: 860, margin: "0 auto 20px" }}>{c.showcaseHeading}</h2>
          {c.showcaseSub && (
            <p style={{ fontSize: "clamp(15px, 3.8vw, 18px)", color: "var(--cl-text-muted, #888)", maxWidth: 740, margin: "0 auto", lineHeight: 1.75 }}>
              {c.showcaseSub}
            </p>
          )}
        </div>
      </FadeIn>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 24,
        position: "relative",
        zIndex: 2
      }}>
        {c.showcaseVideos.map((vid: any, i: number) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div 
              className="cl-glow-card" 
              style={{ padding: "20px 24px", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
              onClick={() => setActiveVideo(vid.id)}
            >
              <div style={{ marginBottom: 16 }}>
                <span style={{ 
                  fontFamily: t.fontMono, 
                  fontSize: 12, 
                  color: "var(--cl-accent)", 
                  fontWeight: 700,
                  letterSpacing: "0.12em"
                }}>{vid.module}</span>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--cl-text-base)", marginTop: 8, lineHeight: 1.4 }}>
                  {vid.title}
                </h3>
              </div>

              {/* Video Thumbnail Area (16:9) */}
              <div style={{ 
                position: "relative", 
                width: "100%", 
                paddingTop: "56.25%", /* 16:9 */
                background: "#000",
                borderRadius: 12,
                overflow: "hidden",
                marginTop: "auto",
                border: "1px solid rgba(255,255,255,0.05)"
              }}>
                {vid.thumb && (
                  <img 
                    src={vid.thumb} 
                    alt={vid.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.5,
                      transition: "opacity 0.3s ease"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = "0.75"}
                    onMouseOut={(e) => e.currentTarget.style.opacity = "0.5"}
                  />
                )}
                
                {/* Play Button Overlay */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none"
                }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.3)",
                    transition: "transform 0.2s ease"
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: 4 }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Video Modal Lightbox */}
      {activeVideo && (
        <div 
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            animation: "fadeIn 0.2s ease"
          }}
          onClick={() => setActiveVideo(null)}
        >
          <div 
            style={{ 
              position: "relative", 
              width: "100%", 
              maxWidth: 960, 
              background: "#000",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
            }}
            onClick={(e) => e.stopPropagation()} /* Prevent click inside from closing modal */
          >
            {/* Aspect Ratio Wrapper 16:9 */}
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              {activeVideo.startsWith("demo_") ? (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#666" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }}>
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                  <span>Video Placeholder. Update content.ts with real Youtube ID</span>
                </div>
              ) : (
                <iframe 
                  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                ></iframe>
              )}
            </div>
            
            <button 
              onClick={() => setActiveVideo(null)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.5)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                lineHeight: 1
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
