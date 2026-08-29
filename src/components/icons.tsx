import React from "react";

const ICON_CSS = `
@keyframes ic-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes ic-pulse{0%,100%{opacity:.5;transform:scale(.88)}50%{opacity:1;transform:scale(1)}}
@keyframes ic-scan{0%,100%{transform:translateY(-9px)}50%{transform:translateY(9px)}}
`;
let _icCssInjected = false;
function injectIconKf() {
  if (_icCssInjected || typeof document === "undefined") return;
  _icCssInjected = true;
  const s = document.createElement("style");
  s.textContent = ICON_CSS;
  document.head.appendChild(s);
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

export function IconBook({ accent: c }: { accent: string }) {
  return (
    <IcBox>
      <line x1="20" y1="8" x2="20" y2="34" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 10 C14 10 8 12 8 15 L8 34 C8 31 14 29 20 29 Z" fill={`${c}18`} stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M20 10 C26 10 32 12 32 15 L32 34 C32 31 26 29 20 29 Z" fill={`${c}0d`} stroke={`${c}99`} strokeWidth="1.8" strokeLinejoin="round"/>
      <line x1="11" y1="17" x2="18" y2="16.5" stroke={`${c}88`} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="11" y1="20.5" x2="18" y2="20" stroke={`${c}66`} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="11" y1="24" x2="17" y2="23.5" stroke={`${c}44`} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="8" r="2" fill={c} style={{ filter: `drop-shadow(0 0 4px ${c})` }}/>
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

export function IconGuarantee({ accent: c }: { accent: string }) {
  return (
    <IcBox size={44}>
      <path d="M20 4 L34 10 L34 22 C34 30 20 38 20 38 C20 38 6 30 6 22 L6 10 Z"
        fill={`${c}14`} stroke={c} strokeWidth="1.8" strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 8px ${c}44)` }}/>
      <polyline points="13,21 17,26 27,15" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
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
