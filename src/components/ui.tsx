import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "../theme";
import { useContent } from "../content";

export const MONO = "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace";

export function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(() => window.innerWidth < breakpoint);
  const update = useCallback(() => setMobile(window.innerWidth < breakpoint), [breakpoint]);
  useEffect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);
  return mobile;
}

export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("is-visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  
  return (
    <div ref={ref} className="fade-in-section" style={{ "--delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

export function ScrollTypewriter({ text, speed = 10, delay = 0, highlightText }: { text: string; speed?: number; delay?: number; highlightText?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const t = useTheme();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasStarted) setHasStarted(true);
      });
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const chars = Array.from(text);
    let index = 0;
    setDisplayText("");
    setIsDone(false);
    const dt = setTimeout(() => {
      const iv = setInterval(() => {
        if (index < chars.length) {
          const ch = chars[index];
          setDisplayText(prev => prev + ch);
          index++;
        } else {
          clearInterval(iv);
          setIsDone(true);
        }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(dt);
  }, [hasStarted, text, speed, delay]);

  const chars = Array.from(text);
  const currentLength = displayText.length;

  const highlightStart = highlightText ? text.indexOf(highlightText) : -1;
  const highlightEnd = highlightStart !== -1 && highlightText ? highlightStart + highlightText.length : -1;

  return (
    <span ref={ref} style={{ position: "relative", display: "inline", whiteSpace: "pre-line" }}>
      {hasStarted ? (
        <>
          {hasStarted && !isDone && currentLength === 0 && (
            <span className="tw-cursor" style={{ background: t.accent }} />
          )}
          {chars.map((char, idx) => {
            const isTyped = idx < currentLength;
            const showCursorHere = hasStarted && !isDone && idx === currentLength - 1;
            const isHighlighted = highlightStart !== -1 && idx >= highlightStart && idx < highlightEnd;
            return (
              <span key={idx} style={{ position: "relative", display: "inline" }}>
                <span style={{
                  color: isTyped ? (isHighlighted ? "var(--cl-accent)" : "inherit") : "transparent",
                  fontFamily: isHighlighted ? "var(--cl-font-accent)" : "inherit",
                  fontStyle: isHighlighted ? "italic" : "inherit",
                  fontWeight: isHighlighted ? 300 : "inherit",
                  userSelect: isTyped ? "auto" : "none",
                  pointerEvents: isTyped ? "auto" : "none",
                }}>
                  {char}
                </span>
                {showCursorHere && (
                  <span className="tw-cursor" style={{ background: "var(--cl-accent)" }} />
                )}
              </span>
            );
          })}
        </>
      ) : (
        <span style={{ opacity: 0 }}>{text}</span>
      )}
    </span>
  );
}

export function NL({ str }: { str: string }) {
  return (
    <>
      {str.split("\n").map((p, i) => (
        <span key={i}>{i > 0 && <br />}{p}</span>
      ))}
    </>
  );
}

export function Countdown() {
  const t = useTheme();
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });
  useEffect(() => {
    const dayStart = Math.floor(Date.now() / 86400000) * 86400000;
    const tick = () => {
      const elapsed = Math.floor((Date.now() - dayStart) / 1000) % 86400;
      const remaining = 86400 - elapsed;
      setTime({ h: Math.floor(remaining / 3600), m: Math.floor((remaining % 3600) / 60), s: remaining % 60 });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
      {[{ v: pad(time.h), l: "GIỜ" }, { v: pad(time.m), l: "PHÚT" }, { v: pad(time.s), l: "GIÂY" }].map(({ v, l }, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ background: "#161a1b", border: `1px solid ${t.accent}33`, borderRadius: 10, padding: "10px 18px", minWidth: 64, textAlign: "center", boxShadow: `0 0 22px -8px ${t.accent}` }}>
            <span style={{ fontSize: 32, fontWeight: 500, fontFamily: MONO, fontVariantNumeric: "tabular-nums", color: "var(--cl-accent)" }}>{v}</span>
          </div>
          <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "#666", fontFamily: MONO }}>{l}</span>
        </div>
      )).reduce((acc, el, i) => i < 2 ? [...acc, el, <span key={`sep${i}`} style={{ fontSize: 28, fontWeight: 500, color: "var(--cl-accent)", marginTop: -18 }}>:</span>] : [...acc, el], [] as React.ReactNode[])}
    </div>
  );
}

export function CtaButton({ label }: { label: string }) {
  const t = useTheme();
  const isOutline = t.btnVariant === "outline";
  const isGhost   = t.btnVariant === "ghost";
  return (
    <a
      href="#dang-ky"
      onClick={(e) => { e.preventDefault(); document.getElementById("dang-ky")?.scrollIntoView({ behavior: "smooth" }); }}
      className={`cl-btn ${isOutline ? "cl-btn--outline" : isGhost ? "cl-btn--ghost" : "cl-btn--solid"}`}
    >
      {label}
    </a>
  );
}

export function Scarcity() {
  const c = useContent();
  return (
    <p className="cl-scarcity">
      🔥 Ưu đãi đặc quyền — chỉ còn {c.price} VNĐ
    </p>
  );
}

export function Sec({ children, style = {}, maxWidth = 820, id }: { children: React.ReactNode; style?: React.CSSProperties; maxWidth?: number; id?: string }) {
  const cls = maxWidth >= 940 ? "cl-sec cl-sec--wide" : maxWidth <= 760 ? "cl-sec cl-sec--narrow" : "cl-sec";
  return (
    <section id={id} className={cls} style={maxWidth !== 820 && maxWidth !== 940 && maxWidth !== 760 ? { maxWidth, ...style } : style}>
      {children}
    </section>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="cl-label">
      <span style={{ opacity: 0.4 }}>// </span>{children}
    </div>
  );
}

export function SH({ children, center = true, typed = false }: { children: React.ReactNode; center?: boolean; typed?: boolean }) {
  const textStr = typeof children === "string" ? children : null;
  return (
    <h2 className={center ? "cl-sh" : "cl-sh cl-sh--left"}>
      {typed && textStr ? <ScrollTypewriter text={textStr} speed={12} /> : children}
    </h2>
  );
}

export function Sub({ children, center = true, style = {} }: { children: React.ReactNode; center?: boolean; style?: React.CSSProperties }) {
  if (!children) return null;
  return (
    <p className={center ? "cl-sub" : "cl-sub cl-sub--left"} style={style}>
      {children}
    </p>
  );
}

export function Check({ children, icon = "›", color: colorProp }: { children: React.ReactNode; icon?: string; color?: string }) {
  return (
    <div className="cl-check">
      <span className="cl-check__icon" style={{ color: colorProp || "var(--cl-accent)" }}>{icon}</span>
      <span className="cl-check__text">{children}</span>
    </div>
  );
}

export function Div() {
  return <div className="cl-divider" />;
}

export function ThemeSyncer() {
  const t = useTheme();
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--cl-bg",           t.bg);
    r.style.setProperty("--cl-card",         t.card);
    r.style.setProperty("--cl-card2",        t.card2);
    r.style.setProperty("--cl-accent",       t.accent);
    r.style.setProperty("--cl-accent-text",  t.accentText);
    r.style.setProperty("--cl-line",         t.line);
    r.style.setProperty("--cl-danger",       t.danger);
    r.style.setProperty("--cl-text-base",    t.textBase  ?? "#f0f0f0");
    r.style.setProperty("--cl-text-body",    t.textBody  ?? "#b0b0b0");
    r.style.setProperty("--cl-text-muted",   t.textMuted ?? "#666666");
    r.style.setProperty("--cl-radius",       `${t.cardRadius}px`);
    r.style.setProperty("--cl-radius-sm",    `${Math.max(6, t.cardRadius - 6)}px`);
    r.style.setProperty("--cl-font-display", t.fontDisplay);
    r.style.setProperty("--cl-font-body",    t.fontBody);
    r.style.setProperty("--cl-font-mono",    t.fontMono);
    r.style.setProperty("--cl-font-accent",  t.fontAccent);
  }, [t]);
  return null;
}

export function AppYTEmbed({ url, caption }: { url: string; caption?: string }) {
  const ytId = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/|live\/))([a-zA-Z0-9_-]{11})/
  )?.[1];
  const isShorts = url.includes("/shorts/");
  
  if (!ytId) return null;
  return (
    <>
      <div style={{ position: "relative", width: "100%", paddingBottom: isShorts ? "177.78%" : "56.25%", height: 0, background: "#000" }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0`}
          title="YouTube video"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
        />
      </div>
      {caption && <p style={{ fontSize: 13, color: "var(--cl-text-muted)", textAlign: "center", padding: "10px 20px", fontStyle: "italic", fontFamily: MONO }}>{caption}</p>}
    </>
  );
}

export function MediaSection({ blockId }: { blockId: string }) {
  const c = useContent();
  const t = useTheme();
  const media = c.blocksMeta?.media ?? {};
  const items = media[blockId] ?? [];
  if (!items.length) return null;
  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px 20px 0" }}>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: 20, borderRadius: t.cardRadius, overflow: "hidden", border: `1px solid var(--cl-line)` }}>
          {item.type === "image" && (
            <>
              <img src={item.url} loading="lazy" alt={item.caption || ""}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                style={{ width: item.fit === "half" ? "50%" : "100%", display: "block", maxHeight: 520, objectFit: "cover" }} />
              {item.caption && <p style={{ fontSize: 13, color: "var(--cl-text-muted)", textAlign: "center", padding: "10px 20px", fontStyle: "italic", fontFamily: MONO }}>{item.caption}</p>}
            </>
          )}
          {item.type === "youtube" && <AppYTEmbed url={item.url} caption={item.caption} />}
        </div>
      ))}
    </div>
  );
}

// ─── Unified SVG Icon System ─────────────────────────────────────
const ICON_CSS = `
@keyframes ic-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes ic-pulse{0%,100%{opacity:.5;transform:scale(.88)}50%{opacity:1;transform:scale(1)}}
@keyframes ic-scan{0%,100%{transform:translateY(-9px)}50%{transform:translateY(9px)}}
`;
let _icCssInjected = false;
export function injectIconKf() {
  if (_icCssInjected || typeof document === "undefined") return; _icCssInjected = true;
  const s = document.createElement("style"); s.textContent = ICON_CSS; document.head.appendChild(s);
}

export function IcBox({ size = 40, float: fl = true, pulse = false, children }: {
  size?: number; float?: boolean; pulse?: boolean; children: React.ReactNode;
}) {
  injectIconKf();
  const anim = pulse
    ? "ic-pulse 2.6s ease-in-out infinite"
    : fl ? "ic-float 3.2s ease-in-out infinite"
    : "none";
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: anim, display: "block", overflow: "visible" }}>
      {children}
    </svg>
  );
}

export function IconMap({ accent: c }: { accent: string }) {
  return (
    <IcBox float={false} pulse>
      <path d="M8 32 Q12 20 20 18 Q28 16 32 8" stroke={`${c}55`} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3"/>
      <circle cx="8" cy="32" r="3" fill={`${c}33`} stroke={c} strokeWidth="1.8"/>
      <circle cx="20" cy="18" r="3" fill={`${c}55`} stroke={c} strokeWidth="1.8"/>
      <circle cx="32" cy="8" r="4.5" fill={`${c}22`} stroke={c} strokeWidth="1.8" style={{ filter: `drop-shadow(0 0 6px ${c}88)` }}/>
      <circle cx="32" cy="8" r="2" fill={c}/>
    </IcBox>
  );
}

export function IconClipboard({ accent: c }: { accent: string }) {
  return (
    <IcBox>
      <rect x="15" y="5" width="10" height="6" rx="2" fill={`${c}66`} stroke={c} strokeWidth="1.8"/>
      <rect x="8" y="9" width="24" height="28" rx="3" fill={`${c}0d`} stroke={c} strokeWidth="1.8"/>
      <line x1="13" y1="18" x2="27" y2="18" stroke={`${c}99`} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="13" y1="23" x2="24" y2="23" stroke={`${c}66`} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="13" y1="28" x2="26" y2="28" stroke={`${c}44`} strokeWidth="1.8" strokeLinecap="round"/>
    </IcBox>
  );
}

export function IconCheck({ accent: c }: { accent: string }) {
  return (
    <IcBox float={false} pulse>
      <circle cx="20" cy="20" r="13" fill={`${c}12`} stroke={c} strokeWidth="1.8" style={{ filter: `drop-shadow(0 0 8px ${c}55)` }}/>
      <polyline points="13,20 18,26 28,14" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </IcBox>
  );
}

export function IconSpeech({ accent: c }: { accent: string }) {
  return (
    <IcBox>
      <rect x="5" y="5" width="28" height="22" rx="5" fill={`${c}10`} stroke={c} strokeWidth="1.8"/>
      <path d="M10 27 L7 35 L18 29" fill={`${c}22`} stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      {[12, 20, 28].map(x => <circle key={x} cx={x} cy="16" r="2" fill={`${c}99`}/>)}
    </IcBox>
  );
}

export function IconPhone({ accent: c }: { accent: string }) {
  return (
    <IcBox>
      <rect x="11" y="3" width="18" height="34" rx="4" fill={`${c}0d`} stroke={c} strokeWidth="1.8"/>
      <rect x="14" y="8" width="12" height="20" rx="2" fill={`${c}18`}/>
      <line x1="15" y1="18" x2="25" y2="18" stroke={c} strokeWidth="1.5" strokeLinecap="round"
        style={{ animation: "ic-scan 2s ease-in-out infinite", transformOrigin: "20px 18px" }}/>
      <circle cx="20" cy="33" r="2" stroke={`${c}88`} strokeWidth="1.5"/>
      <rect x="17" y="5.5" width="6" height="2" rx="1" fill={`${c}55`}/>
    </IcBox>
  );
}

export function IconVideo({ accent: c }: { accent: string }) {
  return (
    <IcBox>
      <rect x="4" y="7" width="32" height="22" rx="3" stroke={c} strokeWidth="1.8" fill={`${c}10`}/>
      <line x1="20" y1="29" x2="20" y2="35" stroke={`${c}88`} strokeWidth="2" strokeLinecap="round"/>
      <line x1="14" y1="35" x2="26" y2="35" stroke={`${c}88`} strokeWidth="2" strokeLinecap="round"/>
      <polygon points="16,13 16,25 28,19" fill={c} style={{ filter: `drop-shadow(0 0 5px ${c})` }}/>
      <circle cx="32" cy="10" r="1.5" fill={`${c}66`}/>
    </IcBox>
  );
}

export const BONUS_ICONS = [IconMap, IconClipboard, IconCheck, IconSpeech, IconVideo];

export function SkillIcon({ idx, accent: c }: { idx: number; accent: string }) {
  injectIconKf();
  const sz = 56;
  if (idx === 0) return (
    <svg width={sz} height={sz} viewBox="0 0 40 40" fill="none" style={{ display: "block", overflow: "visible" }}>
      <line x1="20" y1="5" x2="20" y2="35" stroke={`${c}33`} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="5" y1="20" x2="35" y2="20" stroke={`${c}33`} strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="10" y="10" width="20" height="20" rx="2" fill="none" stroke={`${c}33`} strokeWidth="1.2" strokeDasharray="3 3"/>
      <line x1="5" y1="20" x2="35" y2="20" stroke={c} strokeWidth="2" strokeLinecap="round"
        style={{ animation: "ic-scan 2.2s ease-in-out infinite", transformOrigin: "20px 20px" }}/>
      <circle cx="20" cy="20" r="3" fill={c} style={{ filter: `drop-shadow(0 0 6px ${c})` }}/>
    </svg>
  );
  if (idx === 1) return (
    <svg width={sz} height={sz} viewBox="0 0 40 40" fill="none" style={{ display: "block" }}>
      <line x1="8" y1="6" x2="8" y2="34" stroke={`${c}44`} strokeWidth="1.5" strokeLinecap="round"/>
      {[{ w: 22, d: "0s" }, { w: 14, d: "0.3s" }, { w: 26, d: "0.6s" }, { w: 18, d: "0.9s" }].map((b, i) => (
        <rect key={i} x="10" y={9 + i * 7} width={b.w} height="3.5" rx="2" fill={c} opacity="0.82"
          style={{ animation: "ic-pulse 2.2s ease-in-out infinite", animationDelay: b.d }}/>
      ))}
    </svg>
  );
  if (idx === 2) return (
    <svg width={sz} height={sz} viewBox="0 0 40 40" fill="none" style={{ display: "block", overflow: "visible" }}>
      <circle cx="20" cy="20" r="16" fill="none" stroke={`${c}18`} strokeWidth="1.5"/>
      <circle cx="20" cy="20" r="11" fill="none" stroke={`${c}33`} strokeWidth="1.8"
        style={{ animation: "ic-pulse 2.6s ease-in-out infinite" }}/>
      <circle cx="20" cy="20" r="6" fill={`${c}22`} stroke={c} strokeWidth="2"
        style={{ filter: `drop-shadow(0 0 6px ${c})` }}/>
      <circle cx="20" cy="20" r="2.5" fill={c}/>
    </svg>
  );
  return (
    <svg width={sz} height={sz} viewBox="0 0 40 40" fill="none" style={{ display: "block", overflow: "visible" }}>
      <line x1="8" y1="8" x2="32" y2="32" stroke={`${c}18`} strokeWidth="1" strokeDasharray="2 4"/>
      <line x1="32" y1="8" x2="8" y2="32" stroke={`${c}14`} strokeWidth="1" strokeDasharray="2 4"/>
      {[8,20,32].flatMap(x => [8,20,32].map(y => ({ x, y }))).map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r={i === 4 ? 4 : 2.2}
          fill={i === 4 ? c : `${c}55`}
          style={i === 4
            ? { filter: `drop-shadow(0 0 5px ${c})`, animation: "ic-pulse 2.4s ease-in-out infinite" }
            : undefined
          }/>
      ))}
    </svg>
  );
}
