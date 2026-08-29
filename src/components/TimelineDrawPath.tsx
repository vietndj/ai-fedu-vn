import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../theme";

export function TimelineDrawPath() {
  const t = useTheme();
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawPathRef = useRef<SVGPathElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const parent = wrapRef.current?.parentElement;
    if (!parent) return;
    const measure = () => setHeight(parent.offsetHeight);
    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    measure();
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const path = drawPathRef.current;
    const container = wrapRef.current?.parentElement;
    if (!path || !container || height === 0) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    path.style.opacity = "1";
    let ticking = false;
    const update = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const vh = window.innerHeight;
          const elapsed = vh - rect.top;
          const range = vh + rect.height * 0.85;
          const progress = Math.max(0, Math.min(1, elapsed / range));
          path.style.strokeDashoffset = String(len * (1 - progress));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [height]);

  const cx = 40, amp = 18;
  const buildPath = (h: number) => [
    `M ${cx} 0`,
    `C ${cx + amp} ${h * 0.12}, ${cx + amp} ${h * 0.38}, ${cx} ${h * 0.5}`,
    `C ${cx - amp} ${h * 0.62}, ${cx - amp} ${h * 0.88}, ${cx} ${h}`,
  ].join(" ");

  return (
    <div ref={wrapRef} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
      {height > 0 && (
        <svg
          style={{ position: "absolute", left: "50%", top: 0, width: 80, height, transform: "translateX(-50%)", overflow: "visible" }}
          viewBox={`0 0 80 ${height}`}
        >
          <defs>
            <filter id="tl-glow" x="-100%" y="-5%" width="300%" height="110%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path d={buildPath(height)} fill="none" stroke="var(--cl-accent)" strokeWidth="1" opacity={0.1} strokeLinecap="round" />
          <path ref={drawPathRef} d={buildPath(height)} fill="none" stroke="var(--cl-accent)" strokeWidth="2.5" strokeLinecap="round" style={{ opacity: 0 }} filter="url(#tl-glow)" />
        </svg>
      )}
    </div>
  );
}
