import { useEffect, useRef, type RefObject } from "react";

/**
 * Native smooth scroll helper
 */
export function smoothScrollTo(targetY: number, duration?: number): void {
  const el = document.getElementById("content-layer");
  if (targetY > 0 && el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }
}

/**
 * Attio-style Scroll-Driven Interaction & Auto-Snap Slide Up:
 * 1. Khi người dùng ở Hero và cuộn 1 nhịp nhẹ (wheel, touch swipe, down arrow):
 *    -> Tự động trượt mượt mà (scrollIntoView native) đưa toàn bộ Content Layer lên ngay lập tức.
 * 2. Trong lúc trượt:
 *    - Layer dưới (Hero): Mờ dần (1 -> 0), thu nhỏ nhẹ (1 -> 0.92), trôi thị sai (-36px), chiều sâu mờ (Blur 0 -> 8px).
 *    - Layer trên (Content Layer): Bo góc lớn, bóng đa tầng, khối Video Demo nở nhẹ (0.94 -> 1.0) và bừng sáng (0.5 -> 1.0).
 * 3. Hoàn toàn non-blocking ({ passive: true }), tận dụng bộ dựng phần cứng 120Hz của trình duyệt.
 */
export function useHeroScrollTransition(
  heroContentRef: RefObject<HTMLDivElement | null>,
  contentLayerRef: RefObject<HTMLDivElement | null>,
  demoCardRef?: RefObject<HTMLDivElement | null>
) {
  const isTransitioning = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  useEffect(() => {
    let ticking = false;

    // ── 1. Scroll-Driven GPU Visual Interpolation ──
    const handleVisualScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          const contentEl = contentLayerRef.current;
          const targetY = contentEl ? contentEl.offsetTop : Math.min(window.innerHeight * 0.6, 500);
          const range = Math.max(targetY, 300);
          const progress = Math.min(Math.max(scrollY / range, 0), 1);

          // Hero Section: scale down, fade out, parallax up (NO BLUR for crisp performance)
          if (heroContentRef.current) {
            const opacity = Math.max(0, 1 - progress * 1.25);
            const scale = 1 - progress * 0.08; // 1.0 -> 0.92
            const translateY = -progress * 36; // Parallax up

            heroContentRef.current.style.opacity = `${opacity}`;
            heroContentRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            heroContentRef.current.style.filter = "none";
            heroContentRef.current.style.pointerEvents = opacity < 0.1 ? "none" : "auto";
          }

          // Content Layer: Dynamic shadow intensity
          if (contentLayerRef.current) {
            const shadowIntensity = 0.2 + progress * 0.35;
            contentLayerRef.current.style.boxShadow = `0 -25px 60px -10px rgba(0, 0, 0, ${shadowIntensity}), 0 -2px 12px rgba(0, 0, 0, 0.08)`;
          }

          // Demo Card reveal
          if (demoCardRef?.current) {
            const cardProgress = Math.min(Math.max((scrollY - 40) / (range - 40), 0), 1);
            const cardScale = 0.94 + cardProgress * 0.06; // 0.94 -> 1.0
            const cardOpacity = 0.5 + cardProgress * 0.5; // 0.5 -> 1.0
            const cardTranslateY = (1 - cardProgress) * 25; // 25px -> 0px

            demoCardRef.current.style.transform = `scale(${cardScale}) translateY(${cardTranslateY}px)`;
            demoCardRef.current.style.opacity = `${cardOpacity}`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // ── 2. One-Scroll Gesture Trigger (Cuộn 1 nhịp là trượt lên luôn) ──
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) return;

      const currentY = window.scrollY || window.pageYOffset;
      const contentEl = contentLayerRef.current;
      if (!contentEl) return;
      const targetY = contentEl.offsetTop;

      // Đang ở Hero -> Lăn chuột xuống 1 nấc -> Tự động trượt lên luôn!
      if (currentY < targetY - 60 && e.deltaY > 1) {
        isTransitioning.current = true;
        contentEl.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          isTransitioning.current = false;
        }, 500);
      }
      // Đang ở đầu Content Layer -> Lăn chuột ngược lên 1 nấc -> Tự động trượt về Hero!
      else if (currentY >= targetY - 40 && currentY <= targetY + 20 && e.deltaY < -1) {
        isTransitioning.current = true;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          isTransitioning.current = false;
        }, 500);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning.current) return;

      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const deltaX = touchStartX.current - e.changedTouches[0].clientX;

      // Bỏ qua nếu vuốt ngang
      if (Math.abs(deltaX) > Math.abs(deltaY)) return;

      const currentY = window.scrollY || window.pageYOffset;
      const contentEl = contentLayerRef.current;
      if (!contentEl) return;
      const targetY = contentEl.offsetTop;

      // Vuốt lên ở Hero (muốn cuộn xuống) -> Trượt lên luôn!
      if (currentY < targetY - 60 && deltaY > 20) {
        isTransitioning.current = true;
        contentEl.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          isTransitioning.current = false;
        }, 500);
      }
      // Vuốt xuống ở đầu Content Layer (muốn quay lại Hero) -> Trượt về Hero!
      else if (currentY >= targetY - 40 && currentY <= targetY + 20 && deltaY < -20) {
        isTransitioning.current = true;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          isTransitioning.current = false;
        }, 500);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || (active as HTMLElement).isContentEditable)) {
        return;
      }

      if (isTransitioning.current) return;

      const currentY = window.scrollY || window.pageYOffset;
      const contentEl = contentLayerRef.current;
      if (!contentEl) return;
      const targetY = contentEl.offsetTop;

      if (currentY < targetY - 60) {
        if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
          e.preventDefault();
          isTransitioning.current = true;
          contentEl.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            isTransitioning.current = false;
          }, 500);
        }
      } else if (currentY >= targetY - 40 && currentY <= targetY + 20) {
        if (e.key === "ArrowUp" || e.key === "PageUp") {
          e.preventDefault();
          isTransitioning.current = true;
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => {
            isTransitioning.current = false;
          }, 500);
        }
      }
    };

    window.addEventListener("scroll", handleVisualScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    handleVisualScroll(); // Khởi tạo vị trí ban đầu

    return () => {
      window.removeEventListener("scroll", handleVisualScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [heroContentRef, contentLayerRef, demoCardRef]);
}

/**
 * Roadmap-to-Quote Stacked Layer Transition:
 * Khi cuộn từ Khối 3 Chặng (Roadmap) sang Khối Trích Dẫn (Quote):
 * 1. Cuộn 1 nhịp chuột (One-Scroll Gesture) -> Tự động trượt mượt mà kéo tấm thẻ Quote trượt chồng lên luôn!
 * 2. Khối 3 Chặng (Roadmap): Giữ độ sắc nét 100% (KHÔNG DÙNG BLUR), thu nhỏ nhẹ tự nhiên và trôi thị sai lên.
 * 3. Khối Trích Dẫn (Quote Layer): Trượt chồng lên (physically slides up and overlaps) khối 3 Chặng với bo góc 40px và bóng đa tầng.
 */
export function useRoadmapToQuoteTransition(
  roadmapContentRef: RefObject<HTMLDivElement | null>,
  quoteLayerRef: RefObject<HTMLDivElement | null>
) {
  const isTransitioning = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  useEffect(() => {
    let ticking = false;

    // ── 1. Scroll-Driven GPU Visual Interpolation (Crystal Clear - Zero Blur) ──
    const handleVisualScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!roadmapContentRef.current || !quoteLayerRef.current) {
            ticking = false;
            return;
          }

          const quoteEl = quoteLayerRef.current;
          const rect = quoteEl.getBoundingClientRect();
          const vh = window.innerHeight;

          // Khi quote layer đang trượt từ dưới lên chồng lên roadmap (rect.top <= vh)
          if (rect.top <= vh && rect.top >= -200) {
            const overlapProgress = Math.min(Math.max((vh - rect.top) / vh, 0), 1);
            
            const scale = 1 - overlapProgress * 0.06; // 1.0 -> 0.94 (nhẹ nhàng, không làm biến dạng chữ)
            const opacity = Math.max(0.1, 1 - overlapProgress * 1.1);
            const translateY = -overlapProgress * 30;

            roadmapContentRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            roadmapContentRef.current.style.opacity = `${opacity}`;
            roadmapContentRef.current.style.filter = "none"; // TUYỆT ĐỐI KHÔNG DÙNG BLUR (tránh mờ khó chịu)
            roadmapContentRef.current.style.pointerEvents = opacity < 0.2 ? "none" : "auto";

            const shadowIntensity = 0.4 + overlapProgress * 0.4;
            quoteEl.style.boxShadow = `0 -30px 80px -10px rgba(0, 0, 0, ${shadowIntensity}), 0 -4px 20px rgba(0, 0, 0, 0.2)`;
          } else if (rect.top > vh) {
            roadmapContentRef.current.style.transform = "scale(1) translateY(0px)";
            roadmapContentRef.current.style.opacity = "1";
            roadmapContentRef.current.style.filter = "none";
            roadmapContentRef.current.style.pointerEvents = "auto";
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // ── 2. One-Scroll Gesture Trigger (Chậm hơn 1 nhịp: Đọc xong Chặng 3 mới kích hoạt trượt chồng) ──
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) return;
      const quoteEl = quoteLayerRef.current;
      const roadmapEl = roadmapContentRef.current;
      if (!quoteEl || !roadmapEl) return;

      const rect = quoteEl.getBoundingClientRect();
      const vh = window.innerHeight;

      // Chỉ kích hoạt khi người dùng đã cuộn qua hết Chặng 3 (đỉnh Quote đã vào 65% màn hình) và chủ động lăn tiếp (deltaY > 5)
      const hasFinishedReadingChapt3 = rect.top <= vh * 0.65 && rect.top > 20;
      if (hasFinishedReadingChapt3 && e.deltaY > 5) {
        isTransitioning.current = true;
        quoteEl.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          isTransitioning.current = false;
        }, 550);
      }
      // Đang ở đầu Quote Layer -> Lăn ngược lên để quay lại Chặng 3
      else if (rect.top >= -60 && rect.top <= 40 && e.deltaY < -5) {
        isTransitioning.current = true;
        const targetPos = quoteEl.offsetTop - vh + 160;
        window.scrollTo({ top: Math.max(0, targetPos), behavior: "smooth" });
        setTimeout(() => {
          isTransitioning.current = false;
        }, 550);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning.current) return;
      const quoteEl = quoteLayerRef.current;
      if (!quoteEl) return;

      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const deltaX = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(deltaX) > Math.abs(deltaY)) return;

      const rect = quoteEl.getBoundingClientRect();
      const vh = window.innerHeight;

      // Đọc xong Chặng 3 rồi vuốt tiếp -> Trượt chồng lên
      const hasFinishedReadingChapt3 = rect.top <= vh * 0.65 && rect.top > 20;
      if (hasFinishedReadingChapt3 && deltaY > 30) {
        isTransitioning.current = true;
        quoteEl.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          isTransitioning.current = false;
        }, 550);
      }
      // Vuốt xuống ở đầu Quote -> Trượt về 3 Chặng
      else if (rect.top >= -60 && rect.top <= 40 && deltaY < -30) {
        isTransitioning.current = true;
        const targetPos = quoteEl.offsetTop - vh + 160;
        window.scrollTo({ top: Math.max(0, targetPos), behavior: "smooth" });
        setTimeout(() => {
          isTransitioning.current = false;
        }, 550);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || (active as HTMLElement).isContentEditable)) {
        return;
      }
      if (isTransitioning.current) return;
      const quoteEl = quoteLayerRef.current;
      if (!quoteEl) return;

      const rect = quoteEl.getBoundingClientRect();
      const vh = window.innerHeight;

      const hasFinishedReadingChapt3 = rect.top <= vh * 0.65 && rect.top > 20;
      if (hasFinishedReadingChapt3) {
        if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
          e.preventDefault();
          isTransitioning.current = true;
          quoteEl.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
            isTransitioning.current = false;
          }, 550);
        }
      } else if (rect.top >= -60 && rect.top <= 40) {
        if (e.key === "ArrowUp" || e.key === "PageUp") {
          e.preventDefault();
          isTransitioning.current = true;
          const targetPos = quoteEl.offsetTop - vh + 160;
          window.scrollTo({ top: Math.max(0, targetPos), behavior: "smooth" });
          setTimeout(() => {
            isTransitioning.current = false;
          }, 550);
        }
      }
    };

    window.addEventListener("scroll", handleVisualScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    handleVisualScroll();

    return () => {
      window.removeEventListener("scroll", handleVisualScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [roadmapContentRef, quoteLayerRef]);
}



