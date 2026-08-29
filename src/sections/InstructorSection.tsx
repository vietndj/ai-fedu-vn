import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, Sub } from "../components/ui";

export function InstructorSection() {
  const c = useContent();
  const t = useTheme();

  const highlights = c.instructorHighlights || [
    {
      icon: "🏆",
      title: "Chuyên môn vững vàng:",
      desc: "Được đào tạo bài bản và có nhiều năm kinh nghiệm thực chiến."
    },
    {
      icon: "⭐",
      title: "Tận tâm & Trách nhiệm:",
      desc: "Luôn đồng hành và theo sát khách hàng trong suốt quá trình."
    },
    {
      icon: "🤝",
      title: "Cam kết chất lượng:",
      desc: "Quy trình rõ ràng, minh bạch và đặt sự hài lòng lên hàng đầu."
    }
  ];

  return (
    <Sec maxWidth={940} id="instructor">
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Label>{c.instructorLabel || "// ĐỘI NGŨ CHUYÊN GIA"}</Label>
          <SH typed>{c.instructorHeading || "Người Trực Tiếp Đồng Hành Cùng Bạn"}</SH>
          {c.instructorSub && (
            <Sub style={{ maxWidth: 660, margin: "0 auto 12px" }}>
              {c.instructorSub}
            </Sub>
          )}
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="cl-glow-card" style={{
          padding: "clamp(24px, 5vw, 40px)",
          display: "flex",
          gap: "clamp(24px, 4vw, 40px)",
          alignItems: "flex-start",
          flexWrap: "wrap",
          background: "var(--cl-card, #ffffff)",
          border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
          borderRadius: "var(--cl-radius, 20px)"
        }}>
          {/* Avatar / Profile Column */}
          <div style={{ flexShrink: 0, textAlign: "center", width: 220, margin: "0 auto" }}>
            <div style={{
              borderRadius: 24,
              overflow: "hidden",
              border: `2px solid ${t.accent}55`,
              boxShadow: `0 0 30px -6px ${t.accent}33`,
              marginBottom: 14,
              background: "var(--cl-card2, #f8fafc)"
            }}>
              <img
                src={c.instructorPhoto || "/instructor.jpg"}
                loading="lazy"
                alt={c.instructorName}
                style={{ width: "100%", display: "block" }}
              />
            </div>
            <div style={{ fontFamily: t.fontDisplay, fontSize: 21, fontWeight: 700, color: "var(--cl-text-base, #09090b)", marginBottom: 4 }}>
              {c.instructorName}
            </div>
            <div style={{ fontSize: 13, color: t.accent, fontWeight: 600, marginBottom: 12, lineHeight: 1.4 }}>
              {c.instructorTitle}
            </div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              borderRadius: 30,
              padding: "5px 14px",
              fontSize: 12.5,
              color: "#10b981",
              fontWeight: 600,
            }}>
              {c.instructorBadge || "✨ Tận Tâm Phục Vụ"}
            </div>
          </div>

          {/* Details & Highlights Column */}
          <div style={{ flex: 1, minWidth: 290, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Bio List */}
            {c.instructorBio && c.instructorBio.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {c.instructorBio.map((bioText, bIdx) => (
                  <p key={bIdx} style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "var(--cl-text-body, #334155)",
                    margin: 0,
                  }}>
                    {bioText}
                  </p>
                ))}
              </div>
            )}

            {/* Key Highlight Action Blocks */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
              {highlights.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "rgba(245, 158, 11, 0.06)",
                    border: "1px solid rgba(245, 158, 11, 0.18)",
                  }}
                >
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: "rgba(245, 158, 11, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    flexShrink: 0,
                    marginTop: 1,
                  }}>
                    {item.icon || "✓"}
                  </div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.55 }}>
                    <strong style={{ color: "var(--cl-text-base, #09090b)", fontWeight: 700 }}>{item.title} </strong>
                    <span style={{ color: "var(--cl-text-body, #334155)" }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </Sec>
  );
}
