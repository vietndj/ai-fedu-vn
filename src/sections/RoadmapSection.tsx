import React, { useState, useEffect, useRef } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { Label, Sec } from "../components/ui";

export function RoadmapSection() {
  const c = useContent();
  const t = useTheme();
  const [activeStage, setActiveStage] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Observer to track which card is currently visible on the right stream as user scrolls
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-stage-index"));
            if (!isNaN(index)) {
              setActiveStage(index);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -45% 0px",
        threshold: 0.15,
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [c.stages]);

  const handleNavClick = (idx: number) => {
    setActiveStage(idx);
    const targetEl = cardRefs.current[idx];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Sec maxWidth={1040} id="roadmap">
      <div className="cl-attio-scroll-layout">
        {/* ── CỘT TRÁI (Sticky Sidebar: Đứng yên khi cuộn) ── */}
        <aside className="cl-attio-sticky-sidebar">
          <div className="cl-attio-sidebar-header">
            <Label>{c.roadmapLabel || "// LỘ TRÌNH THỰC HIỆN"}</Label>
            <h2 className="cl-attio-sidebar-title" style={{ color: t.textBase || "#f8fafc" }}>
              {c.roadmapHeading || "Quy trình thực hiện rõ ràng từng bước:"}
            </h2>
            <p className="cl-attio-sidebar-desc" style={{ color: t.textMuted || "#94a3b8" }}>
              {c.roadmapChaptersHeading || "Các chặng đồng hành từ khi đăng ký đến khi hoàn tất trọn vẹn dịch vụ."}
            </p>
          </div>

          <nav className="cl-attio-sidebar-nav" aria-label="Lộ trình thực hiện">
            {c.stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleNavClick(idx)}
                  className={`cl-attio-nav-btn ${isActive ? "is-active" : ""}`}
                >
                  <div className="cl-attio-nav-meta">
                    <span className="cl-attio-nav-tag">{stage.n || `Bước 0${idx + 1}`}</span>
                    {stage.time && <span className="cl-attio-nav-time">{stage.time}</span>}
                  </div>
                  <div className="cl-attio-nav-title">{stage.title}</div>
                  {stage.desc && <div className="cl-attio-nav-sub">{stage.desc.substring(0, 70)}...</div>}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ── CỘT PHẢI (Content Stream: Card xếp dọc trôi lên tự nhiên khi cuộn) ── */}
        <div className="cl-attio-content-stream">
          {c.stages.map((stage, idx) => {
            const isActive = activeStage === idx;
            const timeLabel = stage.time || `GIAI ĐOẠN 0${idx + 1}`;
            return (
              <div
                key={idx}
                id={`stage-card-${idx}`}
                data-stage-index={idx}
                ref={(el) => { cardRefs.current[idx] = el; }}
                className={`cl-attio-stage-card ${isActive ? "is-active" : ""}`}
                style={{
                  background: t.card,
                  border: `1px solid ${isActive ? t.accent : t.line}`,
                  borderRadius: t.cardRadius || 16,
                  padding: "32px 28px",
                  boxShadow: isActive ? `0 12px 32px -8px ${t.accent}25` : "none",
                  transition: "all 0.3s ease"
                }}
              >
                {/* Header thông tin chặng */}
                <div className="cl-attio-card-header" style={{ marginBottom: 16 }}>
                  <span className="cl-attio-badge" style={{
                    background: `${t.accent}18`,
                    border: `1px solid ${t.accent}44`,
                    color: t.accent,
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700
                  }}>
                    <span>⚡</span> {stage.n} — {timeLabel}
                  </span>
                  {stage.sub && <span className="cl-attio-sub" style={{ color: t.textMuted || "#94a3b8", fontSize: 13 }}>{stage.sub}</span>}
                </div>

                <h3 className="cl-attio-title" style={{ fontSize: "clamp(20px, 2.8vw, 26px)", color: t.textBase || "#f8fafc", margin: "0 0 12px 0", fontWeight: 700 }}>
                  {stage.title}
                </h3>
                <p className="cl-attio-desc" style={{ fontSize: 15.5, lineHeight: 1.7, color: t.textBody || "#cbd5e1", margin: "0 0 20px 0" }}>
                  {stage.desc}
                </p>

                {/* Danh sách điểm thực chiến */}
                {stage.highlights && stage.highlights.length > 0 && (
                  <div className="cl-attio-highlights" style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                    {stage.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="cl-attio-hl-item" style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14.5, color: t.textBody || "#cbd5e1" }}>
                        <span className="cl-attio-hl-icon" style={{ color: t.accent, fontWeight: 700 }}>✓</span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Khung Thông Tin Chi Tiết / Step Flow */}
                <div style={{
                  background: t.card2,
                  border: `1px solid ${t.line}`,
                  borderRadius: 12,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: `${t.accent}20`,
                      color: t.accent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 14
                    }}>
                      0{idx + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: t.textBase || "#f8fafc" }}>
                        {stage.title}
                      </div>
                      <div style={{ fontSize: 12, color: t.textMuted || "#94a3b8" }}>
                        {stage.time || "Đã chuẩn hóa quy trình"}
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#10b981",
                    background: "rgba(16, 185, 129, 0.12)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    padding: "3px 10px",
                    borderRadius: 20
                  }}>
                    CHUYÊN NGHIỆP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Sec>
  );
}
