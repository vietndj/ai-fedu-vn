import { useEffect, useState } from "react";

const PROOFS = [
  "Anh Hoàng Nam (Hà Nội) vừa kích hoạt Antigravity Pro thành công ⚡",
  "Chị Thu Thảo (HCM) vừa cài đặt Visual Twin Face DNA chính chủ 👤",
  "Anh Quang Dũng (Đà Nẵng) vừa tạo web bán hàng 1-Shot VietQR 💳",
  "Anh Tuấn Anh (Hải Phòng) vừa kết nối Telegram Remote 2 chiều 🤖",
  "Chị Minh Phương (Cần Thơ) vừa nạp bộ 10 Skills tự động hóa 🚀",
  "Anh Đức Trọng (Bình Dương) vừa tạo 5 poster chuyên gia chuẩn 4K 🎨",
  "Chị Lan Hương (Vũng Tàu) vừa thanh toán thành công 10.000đ qua TPBank 📩",
  "Anh Bảo Long (Nha Trang) vừa bóc tách kịch bản viral 15 micro-beats 🎬",
  "Chị Kim Oanh (HCM) vừa đẩy 10 video lên Drive tự động 📂",
  "Anh Việt Thắng (Hà Nội) vừa lên lịch tự đăng Fanpage tự động ⏱️"
];

const TIME_LABELS = [
  "vừa xong",
  "vài giây trước",
  "1 phút trước",
  "2 phút trước",
  "3 phút trước"
];

export default function LiveSocialProof() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLabel, setTimeLabel] = useState("vừa xong");
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    let active = true;
    let nextTimeout: any;

    const showNext = () => {
      if (!active) return;
      
      setCurrentIdx(Math.floor(Math.random() * PROOFS.length));
      setTimeLabel(TIME_LABELS[Math.floor(Math.random() * TIME_LABELS.length)]);
      setVisible(true);

      nextTimeout = setTimeout(() => {
        setVisible(false);
        const nextDelay = Math.floor(Math.random() * 25000) + 15000;
        nextTimeout = setTimeout(showNext, nextDelay);
      }, 4000);
    };

    const initialTimeout = setTimeout(showNext, 4000);

    return () => {
      active = false;
      clearTimeout(initialTimeout);
      clearTimeout(nextTimeout);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "rgba(13, 17, 26, 0.95)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(16, 185, 129, 0.3)",
        borderRadius: 16,
        padding: "12px 16px",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px -3px rgba(16, 185, 129, 0.15)",
        color: "#f8fafc",
        maxWidth: 380,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        animation: "fadeInUp 0.4s ease-out"
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "rgba(16, 185, 129, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0
        }}
      >
        ⚡
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 1.3,
            color: "#f1f5f9"
          }}
        >
          {PROOFS[currentIdx]}
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: 11,
            color: "#10b981",
            display: "flex",
            alignItems: "center",
            gap: 4
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#10b981",
              display: "inline-block"
            }}
          />
          {timeLabel}
        </p>
      </div>

      <button
        onClick={() => setDismissed(true)}
        style={{
          background: "none",
          border: "none",
          color: "#64748b",
          fontSize: 18,
          cursor: "pointer",
          padding: "0 4px",
          lineHeight: 1
        }}
      >
        ×
      </button>
    </div>
  );
}
