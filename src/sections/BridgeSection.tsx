import React, { useState, useEffect, useRef } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, useIsMobile, Sub } from "../components/ui";
import { TimelineDrawPath } from "../components/TimelineDrawPath";

// A sub-component for the typewriter effect in the chat simulation
function ChatMessage({ 
  text, 
  isStarted, 
  onComplete 
}: { 
  text: string; 
  isStarted: boolean; 
  onComplete?: () => void; 
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isStarted) return;
    setIsTyping(true);
    let i = 0;
    const chunk = 3; // 3 characters per tick for ultra-responsive streaming
    const interval = setInterval(() => {
      i = Math.min(i + chunk, text.length);
      setDisplayedText(text.substring(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    }, 12); // 12ms interval: super crisp & instant
    
    return () => clearInterval(interval);
  }, [isStarted, text]);

  if (!isStarted && displayedText === "") return null;

  return (
    <div style={{
      background: "#ecfdf5", // Emerald-50
      border: "1px solid #6ee7b7", // Emerald-300
      borderRadius: "14px 14px 14px 2px",
      padding: "11px 15px",
      color: "#064e3b", // Emerald-900: 10.5:1 AAA contrast on #ecfdf5
      fontSize: "clamp(13.5px, 1.4vw, 14.5px)",
      lineHeight: 1.6,
      maxWidth: "90%",
      position: "relative",
      boxShadow: "0 2px 8px rgba(16, 185, 129, 0.08)",
      fontWeight: 500
    }}>
      <span style={{ 
        display: "inline-block", 
        width: 7, height: 7, 
        background: "#059669", 
        borderRadius: "50%", 
        marginRight: 8,
        verticalAlign: "middle"
      }} />
      {displayedText}
      {isTyping && (
        <span style={{ 
          display: "inline-block", 
          color: "#059669", 
          fontWeight: 700, 
          marginLeft: 2, 
          animation: "cursorPulse 0.8s infinite" 
        }}>
          |
        </span>
      )}
    </div>
  );
}

export function BridgeSection() {
  const c = useContent();
  const t = useTheme();
  const isMobile = useIsMobile();

  const oldItems = c.bridgeCompareOldItems || [
    "Xin ý tưởng → Nhận bài văn dài dòng sáo rỗng, đọc xong không biết bấm máy quay cái gì.",
    "Tự dựng video → Mất 3–4 tiếng cặm cụi gọt từng đoạn nói vấp, gù lưng sửa từng chữ phụ đề toét cả mắt.",
    "Bán hàng → Cả ngày dán mắt vào điện thoại chat tay gửi số tài khoản, canh check biến động số dư."
  ];

  const newItems = c.bridgeCompareNewItems || [
    "Gửi link clip hay → Trợ lý tự bóc sạch từng câu thoại và góc máy thành kịch bản 2 cột để quay ngay.",
    "Ném video thô vào → AI tự gọt sạch ngập ngừng, phụ đề nhảy theo lời nói, xuất video hoàn chỉnh trong 10 phút.",
    "Gắn mẫu web → Khách quét mã QR tự động nhận bài lúc nửa đêm, tiền về thẳng tài khoản ngân hàng."
  ];

  // Scroll detection trigger
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);
  
  // Track which chat row is currently unlocked / typing (0, 1, 2)
  const [activeChatIndex, setActiveChatIndex] = useState(-1);

  // Trigger when scrolled into viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledIntoView(true);
          setActiveChatIndex(0); // Start typing first message
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // When a chat row finishes, trigger the next row immediately with smooth transition
  const handleChatComplete = (index: number) => {
    if (index < newItems.length - 1) {
      setTimeout(() => {
        setActiveChatIndex(prev => Math.max(prev, index + 1));
      }, 120);
    }
  };

  return (
    <Sec maxWidth={860}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <Label>{c.bridgeLabel}</Label>
          <SH typed>{c.bridgeHeading}</SH>
        </div>
      </FadeIn>

      <FadeIn delay={80}>
        <div className="cl-timeline" style={{ marginBottom: 80 }}>
          <TimelineDrawPath />
          {c.bridgeSteps?.map((m: any, i: number) => (
            <div key={i} className="cl-timeline-item">
              <div className="cl-timeline-dot" style={{ background: "var(--cl-accent)", color: "var(--cl-accent-text)" }}>{String(i + 1)}</div>
              <div className="cl-timeline-card">
                <div className="cl-timeline-card__tags">
                  <span className="cl-stage__n" style={{ color: "var(--cl-accent)", background: `${t.accent}18` }}>{m.n}</span>
                </div>
                <h3 className="cl-timeline-card__title" style={{ marginTop: 8 }}>{m.title}</h3>
                {m.lead && <div className="cl-timeline-card__lead">{m.lead}</div>}
                {m.items && m.items.length > 0 ? (
                  <div className="cl-timeline-card__items">
                    {m.items.map((item: string, idx: number) => {
                      const colonIndex = item.indexOf(":");
                      if (colonIndex !== -1) {
                        const label = item.slice(0, colonIndex);
                        const text = item.slice(colonIndex + 1);
                        return (
                          <div key={idx} className="cl-timeline-card__item">
                            <span className="cl-timeline-card__item-label">{label}:</span>
                            <span className="cl-timeline-card__item-text">{text}</span>
                          </div>
                        );
                      }
                      return (
                        <div key={idx} className="cl-timeline-card__item">
                          <span className="cl-timeline-card__item-text">{item}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  m.desc && <p className="cl-timeline-card__desc">{m.desc}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Comparison Section with Scroll-Triggered ChatGPT Typewriter and AAA High Contrast Text */}
      <div ref={sectionRef}>
        <FadeIn delay={140}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h3 style={{
              fontSize: "clamp(22px, 4.5vw, 30px)",
              fontFamily: t.fontDisplay,
              fontWeight: 600,
              color: "#09090b",
              letterSpacing: "-0.018em",
              lineHeight: 1.25,
              margin: "0 0 16px"
            }}>
              {c.bridgeCompareHeading || "Sự khác biệt thực tế khi dùng AI làm thợ thực thi"}
            </h3>
            <Sub>
              {c.bridgeCompareSubtitle || "Thay vì lên chat hỏi đáp vu vơ vài câu vô dụng, bạn chỉ việc ra lệnh bằng tiếng Việt — AI tự động làm thay 80% việc tay chân."}
            </Sub>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: isMobile ? 20 : 24,
            alignItems: "stretch"
          }}>
            {/* CỘT TRÁI - DÙNG AI KIỂU HỎI ĐÁP (MỆT MỎI) */}
            <div style={{
              background: "#f8fafc", // Slate-50
              border: "1px solid #e2e8f0", // Slate-200
              borderRadius: t.cardRadius,
              padding: isMobile ? "20px 16px" : "24px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)"
            }}>
              <div style={{ 
                display: "inline-flex", alignItems: "center", gap: 8, 
                background: "#fee2e2", // Red-100
                border: "1px solid #fca5a5", // Red-300
                padding: "6px 14px", 
                borderRadius: 30, width: "fit-content", marginBottom: 20
              }}>
                <span style={{ fontSize: 15 }}>😫</span>
                <span style={{ 
                  fontSize: 12, 
                  fontFamily: t.fontMono, 
                  fontWeight: 700, 
                  color: "#991b1b", // Red-800: 8.5:1 AAA contrast
                  textTransform: "uppercase", 
                  letterSpacing: "0.06em" 
                }}>
                  {c.bridgeCompareOldTitle || "DÙNG AI KIỂU HỎI ĐÁP (MỆT MỎI)"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {oldItems.map((item: string, i: number) => {
                  const parts = item.split("→");
                  const action = parts[0]?.trim() || "";
                  const result = parts.slice(1).join("→").trim();

                  return (
                    <div 
                      key={i} 
                      style={{ 
                        display: "flex", 
                        alignItems: "flex-start", 
                        gap: 12,
                        background: "#ffffff",
                        border: "1px solid #f1f5f9",
                        borderRadius: 12,
                        padding: "12px 14px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
                      }}
                    >
                      <div style={{ 
                        width: 22, height: 22, flexShrink: 0, borderRadius: "50%", 
                        background: "#fee2e2", 
                        border: "1px solid #fecaca", 
                        display: "flex", alignItems: "center", justifyContent: "center", 
                        color: "#dc2626", 
                        fontSize: 11,
                        fontWeight: 700,
                        marginTop: 2
                      }}>
                        ✕
                      </div>
                      <div style={{ margin: 0, fontSize: "clamp(13.5px, 1.4vw, 14.5px)", lineHeight: 1.6 }}>
                        <strong style={{ color: "#0f172a", fontWeight: 600 }}>{action}</strong>
                        {result && (
                          <>
                            <span style={{ color: "#ef4444", fontWeight: 700, margin: "0 5px" }}>➔</span>
                            <span style={{ color: "#334155" }}>{result}</span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CỘT PHẢI - DÙNG 3 TRỢ LÝ AI (THÀNH THƠI) - CHAT TYPEWRITER TỰ ĐỘNG KHI CUỘN */}
            <div style={{
              background: "#ffffff",
              border: "1.5px solid var(--cl-accent, #f59e0b)",
              borderRadius: t.cardRadius,
              padding: isMobile ? "20px 16px" : "24px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              boxShadow: "0 10px 30px -10px rgba(245, 158, 11, 0.2), 0 4px 14px rgba(0, 0, 0, 0.04)"
            }}>
              <div style={{ 
                display: "inline-flex", alignItems: "center", gap: 8, 
                background: "rgba(245, 158, 11, 0.12)", 
                border: "1px solid rgba(245, 158, 11, 0.35)", 
                padding: "6px 14px", 
                borderRadius: 30, width: "fit-content", marginBottom: 20 
              }}>
                <span style={{ fontSize: 15 }}>✨</span>
                <span style={{ 
                  fontSize: 12, 
                  fontFamily: t.fontMono, 
                  fontWeight: 700, 
                  color: "#92400e", // Amber-800: 8.1:1 AAA contrast
                  textTransform: "uppercase", 
                  letterSpacing: "0.06em" 
                }}>
                  {c.bridgeCompareNewTitle || "DÙNG 3 TRỢ LÝ AI (THÀNH THƠI)"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {newItems.map((item: string, i: number) => {
                  const parts = item.split("→");
                  const action = parts[0]?.trim() || "";
                  const result = parts.slice(1).join("→").trim();
                  const isStarted = hasScrolledIntoView && activeChatIndex >= i;
                  
                  return (
                    <div 
                      key={i} 
                      style={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: 8,
                        opacity: isStarted ? 1 : 0.25,
                        transition: "opacity 0.4s ease"
                      }}
                    >
                      {/* User Command Bubble (Căn phải) */}
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div style={{
                          background: "#f1f5f9", // Slate-100
                          border: "1px solid #cbd5e1", // Slate-300
                          borderRadius: "14px 14px 2px 14px",
                          padding: "8px 14px",
                          color: "#0f172a", // Slate-900: 15.2:1 AAA contrast
                          fontSize: "clamp(13px, 1.3vw, 14px)",
                          fontWeight: 600,
                          maxWidth: "85%",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
                        }}>
                          💬 {action}
                        </div>
                      </div>
                      
                      {/* AI Response (Căn trái, Typewriter gõ từng chữ khi cuộn tới) */}
                      <div style={{ display: "flex" }}>
                        <ChatMessage 
                          text={result} 
                          isStarted={isStarted}
                          onComplete={() => handleChatComplete(i)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        @keyframes cursorPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </Sec>
  );
}


