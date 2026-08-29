import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn } from "../components/ui";

export function QuoteSection() {
  const c = useContent();
  const t = useTheme();

  const quoteText = c.quoteText || "Sự tận tâm và chất lượng chuyên môn luôn là kim chỉ nam cho mọi dịch vụ của chúng tôi.";
  const quoteAuthor = c.quoteAuthor || c.instructorName || "Chuyên Gia";
  const quoteRole = c.quoteRole || c.instructorTitle || "Đại diện chuyên môn";

  return (
    <section
      className="cl-quote-fullscreen"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: t.bg,
        borderTop: `1px solid ${t.line}`,
        borderBottom: `1px solid ${t.line}`,
        padding: "clamp(60px, 10vh, 120px) clamp(20px, 5vw, 48px)",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <FadeIn>
        <div
          style={{
            maxWidth: 920,
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Main Quote */}
          <blockquote
            style={{
              fontFamily: t.blockquoteFontFamily || "'SVN-Acta', serif",
              fontSize: "clamp(26px, 4vw, 48px)",
              lineHeight: 1.35,
              fontWeight: 400,
              letterSpacing: "-0.015em",
              color: t.textBase || "#f8fafc",
              margin: 0,
              padding: 0,
              whiteSpace: "pre-line",
              textWrap: "balance",
            }}
          >
            “{quoteText}”
          </blockquote>

          {/* Author Meta */}
          <div
            style={{
              marginTop: "clamp(28px, 4vh, 44px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div
              style={{
                fontFamily: t.fontDisplay,
                fontSize: "clamp(16px, 1.8vw, 18px)",
                fontWeight: 700,
                color: t.accent,
                letterSpacing: "-0.01em",
              }}
            >
              {quoteAuthor}
            </div>
            <div
              style={{
                fontFamily: t.fontBody,
                fontSize: "clamp(13px, 1.5vw, 14.5px)",
                fontWeight: 400,
                color: t.textMuted || "#94a3b8",
                letterSpacing: "-0.01em",
              }}
            >
              {quoteRole}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
