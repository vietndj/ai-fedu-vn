import React, { memo } from "react";
import { useTheme } from "../theme";

export const StudioBackground = memo(function StudioBackground() {
  const t = useTheme();

  return (
    <div
      className="cl-studio-bg"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* ── LỚP 1: ÁNH SÁNG MÔI TRƯỜNG STUDIO (KEY & RIM LIGHT) ── */}
      <div
        className="cl-studio-glow cl-studio-glow--key"
        style={{
          position: "absolute",
          top: "-10%",
          left: "10%",
          width: "clamp(480px, 60vw, 950px)",
          height: "clamp(480px, 60vw, 950px)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${t.accent}2e 0%, ${t.accent}0a 45%, transparent 70%)`,
          filter: "blur(95px)",
          transform: "translate3d(0, 0, 0)",
          willChange: "transform, opacity",
          animation: "studio-pulse 12s ease-in-out infinite alternate",
        }}
      />

      <div
        className="cl-studio-glow cl-studio-glow--rim"
        style={{
          position: "absolute",
          top: "40%",
          right: "-12%",
          width: "clamp(420px, 50vw, 800px)",
          height: "clamp(420px, 50vw, 800px)",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(245, 158, 11, 0.16) 0%, ${t.accent}0d 40%, transparent 70%)`,
          filter: "blur(115px)",
          transform: "translate3d(0, 0, 0)",
          willChange: "transform, opacity",
          animation: "studio-pulse-reverse 15s ease-in-out infinite alternate",
        }}
      />

      {/* ── LỚP 2: LƯỚI TỌA ĐỘ KỸ THUẬT & TIMECODE 24FPS (MASKED GRID) ── */}
      <div
        className="cl-studio-grid"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 85% 70% at 50% 30%, black 30%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 70% at 50% 30%, black 30%, transparent 95%)",
          opacity: 0.9,
        }}
      />

      {/* ── LỚP 3: HẠT FILM GRAIN 35MM ĐIỆN ẢNH (KHỬ BANDING) ── */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.045,
          pointerEvents: "none",
          mixBlendMode: "overlay",
        }}
      >
        <filter id="studio-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#studio-grain)" />
      </svg>
    </div>
  );
});

export default StudioBackground;
