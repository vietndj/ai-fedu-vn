import { createContext, useContext, createElement } from "react";
import type { ReactNode } from "react";

export interface Theme {
  id: string;
  name: string;
  emoji: string;
  tagline: string;

  // Core colors
  bg: string;
  card: string;
  card2: string;
  accent: string;
  accentText: string;
  line: string;
  danger: string;

  // Typography weights & transform
  heroWeight: 500 | 600 | 700 | 900;
  h2Weight: 500 | 600 | 700 | 900;
  heroTransform: "uppercase" | "none";
  heroLetterSpacing: string;

  // Font sizes
  heroFontSize: string;
  h2FontSize: string;
  bodyFontSize: string;
  bodyLineHeight: number;

  // Font families
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
  fontAccent: string;

  // Type Scale system
  typeScaleBase: number;
  typeScaleRatio: number;

  // Button tokens
  btnRadius: number;
  btnBorderWidth: number;
  btnPaddingX: number;
  btnPaddingY: number;
  btnVariant: "solid" | "outline" | "ghost";

  // Effects
  accentGlow: boolean;
  cardRadius: number;

  // Text colors — auto-computed from bg luminance
  textBase?: string;
  textBody?: string;
  textMuted?: string;

  // Blockquote style overrides
  blockquoteFontFamily?: string;
  blockquoteFontSize?: string;
  blockquoteFontStyle?: string;
  blockquoteFontWeight?: number;
}

// ─── Active theme ────────────────────────────────────────────────
// Chỉnh màu sắc, font, spacing tại đây.
// Khi nhân bản sang sản phẩm mới, yêu cầu AI sửa object này.
export const ACTIVE_THEME: Theme = {
  id: "editorial-obsidian-gold",
  name: "Editorial Obsidian & Champagne Gold",
  emoji: "👑",
  tagline: "Luxury Minimalist Obsidian & Champagne Gold Masterclass",
  bg: "#09090b",
  card: "#121316",
  card2: "#18191f",
  accent: "#f59e0b",
  accentText: "#000000",
  line: "rgba(245, 158, 11, 0.15)",
  danger: "#ef4444",
  heroWeight: 500,
  h2Weight: 500,
  blockquoteFontFamily: "'SVN-Acta', 'Acta Display', 'Acta', Georgia, serif",
  blockquoteFontWeight: 400,
  heroTransform: "none",
  heroLetterSpacing: "-0.018em",
  heroFontSize: "clamp(36px, 5.5vw, 68px)",
  h2FontSize: "clamp(24px, 3.5vw, 46px)",
  bodyFontSize: "clamp(16px, 1.8vw, 19px)",
  bodyLineHeight: 1.8,
  accentGlow: true,
  cardRadius: 16,
  fontDisplay: "'Aeonik', 'Inter', system-ui, sans-serif",
  fontBody: "'Aeonik', 'Inter', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  fontAccent: "'Aeonik', 'Inter', system-ui, sans-serif",
  typeScaleBase: 16,
  typeScaleRatio: 1.25,
  btnRadius: 12,
  btnBorderWidth: 0,
  btnPaddingX: 56,
  btnPaddingY: 22,
  btnVariant: "solid",
};

// ─── Derive readable text colors from bg luminance ───────────────
function hexToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}
function relativeLuminance(hex: string): number {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return 0.2126 * hexToLinear(r) + 0.7152 * hexToLinear(g) + 0.0722 * hexToLinear(b);
}
function deriveTextColors(base: Theme): Theme {
  const isLight = relativeLuminance(base.bg) > 0.35;
  return {
    ...base,
    textBase: isLight ? "#111111" : "#f0f0f0",
    textBody: isLight ? "#374151" : "#b0b0b0",
    textMuted: isLight ? "#6b7280" : "#888888",
  };
}

// ─── React context ───────────────────────────────────────────────
const RESOLVED_THEME = deriveTextColors(ACTIVE_THEME);
const ThemeCtx = createContext<Theme>(RESOLVED_THEME);

export function useTheme(): Theme {
  return useContext(ThemeCtx);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return createElement(ThemeCtx.Provider, { value: RESOLVED_THEME }, children);
}
