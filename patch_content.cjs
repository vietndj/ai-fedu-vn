const fs = require('fs');

let content = fs.readFileSync('src/content.ts', 'utf-8');

// Add import
if (!content.includes('import { siteConfig }')) {
  content = content.replace(/import \{ createContext, useContext, createElement \} from "react";/, `import { createContext, useContext, createElement } from "react";\nimport { siteConfig } from "./site.config";`);
}

const defaultContentReplacement = `export const DEFAULT_CONTENT: PageContent = {
  _v: 7,
  price: siteConfig.product.price,
  value: siteConfig.product.originalPrice,

  // ── Hero ──
  heroBadge: "🔥 ƯU ĐÃI ĐẶC BIỆT DÀNH CHO BẠN",
  heroHeadline1: siteConfig.product.name,
  heroHeadline2: "Mô tả ngắn gọn giá trị sản phẩm mang lại",
  heroPoem: [
    "Lợi ích 1 của sản phẩm",
    "Lợi ích 2 của sản phẩm",
    "Lợi ích 3 của sản phẩm"
  ],
  heroAccentLine: "Slogan phụ hoặc cam kết chính",
  heroSub: "Đoạn giới thiệu ngắn về sản phẩm, giải thích tại sao khách hàng nên mua ngay hôm nay:",
  philosophyAssets: [
    {
      n: "01",
      icon: "📝",
      tag: "Tính năng 1",
      title: "Tiêu đề tính năng 1",
      input: "Đầu vào 1",
      output: "Đầu ra 1",
      kpi: "KPI 1",
      desc: "Mô tả chi tiết về tính năng 1 và lợi ích mang lại",
      isHighlight: false,
    },
    {
      n: "02",
      icon: "⚡",
      tag: "Tính năng 2",
      title: "Tiêu đề tính năng 2",
      input: "Đầu vào 2",
      output: "Đầu ra 2",
      kpi: "KPI 2",
      desc: "Mô tả chi tiết về tính năng 2 và lợi ích mang lại",
      isHighlight: false,
    },
    {
      n: "03",
      icon: "💳",
      tag: "Tính năng 3",
      title: "Tiêu đề tính năng 3",
      input: "Đầu vào 3",
      output: "Đầu ra 3",
      kpi: "KPI 3",
      desc: "Mô tả chi tiết về tính năng 3 và lợi ích mang lại",
      isHighlight: false,
    }
  ],
  heroCta: "MUA NGAY HÔM NAY →",
  heroVideoYoutubeId: "",
  heroSubPrice: "Cam kết hoàn tiền hoặc hỗ trợ",

  // ── Bridge Section ──
  bridgeHeading: "Sự khác biệt là gì?",
  bridgeLabel: "TẠI SAO CHỌN SẢN PHẨM NÀY",
  bridgeSteps: [
    {
      n: "01",
      title: "Lý do 1",
      lead: "Mô tả ngắn lý do 1",
      items: ["Chi tiết 1", "Chi tiết 2"]
    },
    {
      n: "02",
      title: "Lý do 2",
      lead: "Mô tả ngắn lý do 2",
      items: ["Chi tiết 1", "Chi tiết 2"]
    },
    {
      n: "03",
      title: "Lý do 3",
      lead: "Mô tả ngắn lý do 3",
      items: ["Chi tiết 1", "Chi tiết 2"]
    }
  ],
  bridgeCompareHeading: "Sự khác biệt thực tế",
  bridgeCompareSubtitle: "Thay vì làm cách cũ, hãy dùng sản phẩm này.",
  bridgeCompareOldTitle: "CÁCH CŨ (MỆT MỎI)",
  bridgeCompareOldItems: ["Vấn đề 1", "Vấn đề 2", "Vấn đề 3"],
  bridgeCompareNewTitle: "CÁCH MỚI (THÀNH THƠI)",
  bridgeCompareNewItems: ["Giải pháp 1", "Giải pháp 2", "Giải pháp 3"],
  bridgeCompareList: [
    {
      id: 0,
      tag: "01 • KHÍA CẠNH 1",
      oldAction: "Làm theo cách cũ",
      oldPain: "Rất vất vả và tốn thời gian",
      userPrompt: "Dùng giải pháp mới",
      aiResult: "Nhanh chóng và hiệu quả",
      timeBadge: "Tiết kiệm thời gian"
    }
  ],

  // ── Pain ──
  painLabel: "VẤN ĐỀ CỦA BẠN",
  painHeading: "Bạn đang gặp phải những khó khăn này?",
  painQuote: "'Tôi rất muốn thay đổi nhưng chưa biết bắt đầu từ đâu...'",
  painSub: "Nếu bạn đang có những vấn đề dưới đây, sản phẩm này dành cho bạn.",
  pains: ["❌ Khó khăn 1", "❌ Khó khăn 2", "❌ Khó khăn 3", "❌ Khó khăn 4"],
  painConclusion: "",

  // ── Attention ──
  attentionLabel: "BẠN ĐANG CHỌN CÁCH NÀO?",
  attentionHeading: "Có nhiều cách giải quyết, nhưng chỉ 1 cách tối ưu.",
  attentionPara: "Bạn có thể tự mò mẫm hoặc dùng giải pháp đã được chứng minh hiệu quả.",
  attentionComparisonTitle: "Thời Đại Của Sự Tiện Lợi",
  attentionItems: [
    { icon: "❌", title: "Sai lầm 1", desc: "Mô tả sai lầm 1" },
    { icon: "❌", title: "Sai lầm 2", desc: "Mô tả sai lầm 2" },
    { icon: "❌", title: "Sai lầm 3", desc: "Mô tả sai lầm 3" },
    { icon: "❌", title: "Giải pháp", desc: "Lý do chọn sản phẩm" }
  ],

  // ── Rule ──
  ruleLabel: "3 SỰ THẬT CẦN BIẾT",
  ruleHeading: "Tại sao giải pháp cũ không hiệu quả?",
  ruleCards: [
    { n: "01", title: "Sự thật 1", desc: "Mô tả sự thật 1" },
    { n: "02", title: "Sự thật 2", desc: "Mô tả sự thật 2" },
    { n: "03", title: "Sự thật 3", desc: "Mô tả sự thật 3" }
  ],

  // ── Cycle ──
  cycleLabel: "QUY TRÌNH MỚI",
  cycleHeading: "3 bước đơn giản:",
  cycleSteps: [
    { n: "01", title: "Bước 1", desc: "Mô tả bước 1" },
    { n: "02", title: "Bước 2", desc: "Mô tả bước 2" },
    { n: "03", title: "Bước 3", desc: "Mô tả bước 3" }
  ],
  
  discoveryLabel: "BỘ CÔNG CỤ",
  discoveryHeading: "Khám phá bộ công cụ của chúng tôi:",

  // ── Solution ──
  solutionLabel: "GIẢI PHÁP TỐI ƯU",
  solutionHeading: "Chúng tôi đã làm sẵn mọi thứ cho bạn:",
  solutionSub: "Bạn chỉ việc áp dụng và thấy kết quả:",
  solutionItems: [
    "❌ Vấn đề cũ ➞ ✅ Giải pháp mới 1",
    "❌ Vấn đề cũ ➞ ✅ Giải pháp mới 2",
    "❌ Vấn đề cũ ➞ ✅ Giải pháp mới 3"
  ],

  // ── Skills ──
  skillsLabel: "KỸ NĂNG BẠN SẼ CÓ",
  skillsHeading: "Làm chủ các công cụ này:",
  skillCards: [
    { n: "01", title: "Kỹ năng 1", desc: "Mô tả kỹ năng 1", gif: "" },
    { n: "02", title: "Kỹ năng 2", desc: "Mô tả kỹ năng 2", gif: "" },
    { n: "03", title: "Kỹ năng 3", desc: "Mô tả kỹ năng 3", gif: "" }
  ],

  // ── Mid CTA ──
  midCtaHeading: "Sẵn sàng thay đổi?",
  midCtaSub: "Bắt đầu ngay hôm nay để nhận ưu đãi.",
  midCtaBtn: "ĐĂNG KÝ NGAY HÔM NAY",

  // ── Before & After ──
  baLabel: "KẾT QUẢ THỰC TẾ",
  baHeading: "Sự khác biệt TRƯỚC và SAU:",
  baSub: "",
  beforeLabel: "TRƯỚC",
  afterLabel: "SAU",
  beforeItems: ["Vấn đề 1", "Vấn đề 2", "Vấn đề 3"],
  afterItems: ["Kết quả 1", "Kết quả 2", "Kết quả 3"],

  // ── Roadmap ──
  roadmapLabel: "LỘ TRÌNH RÕ RÀNG",
  roadmapHeading: "Toàn bộ quy trình gói gọn trong 3 chặng:",
  roadmapPreviewHeading: "Xem trực tiếp cách hệ thống vận hành",
  roadmapPreviewDesc: "Minh bạch và rõ ràng từ đầu đến cuối.",
  roadmapIframeUrl: "",
  roadmapChaptersHeading: "3 chặng để đạt kết quả:",
  stages: [
    { 
      n: "Chặng 1", 
      time: "THỜI GIAN",
      title: "Tiêu đề chặng 1", 
      desc: "Mô tả chặng 1", 
      sub: "Mục tiêu chặng 1",
      highlights: ["Điểm nhấn 1", "Điểm nhấn 2"]
    },
    { 
      n: "Chặng 2", 
      time: "THỜI GIAN",
      title: "Tiêu đề chặng 2", 
      desc: "Mô tả chặng 2", 
      sub: "Mục tiêu chặng 2",
      highlights: ["Điểm nhấn 1", "Điểm nhấn 2"]
    },
    { 
      n: "Chặng 3", 
      time: "THỜI GIAN",
      title: "Tiêu đề chặng 3", 
      desc: "Mô tả chặng 3", 
      sub: "Mục tiêu chặng 3",
      highlights: ["Điểm nhấn 1", "Điểm nhấn 2"]
    }
  ],

  // ── Instructor ──
  instructorLabel: "NGƯỜI HƯỚNG DẪN",
  instructorHeading: "Về chúng tôi",
  instructorSub: "Kinh nghiệm thực chiến",
  instructorInitials: "NV",
  instructorName: siteConfig.seller.name,
  instructorTitle: "Chuyên gia / Founder",
  instructorBadge: "💬 Hỗ Trợ Trực Tiếp",
  instructorBio: ["Giới thiệu ngắn về kinh nghiệm và chuyên môn của người hướng dẫn."],
  instructorHighlights: [
    { icon: "🎯", title: "Kinh nghiệm 1", desc: "Mô tả kinh nghiệm" },
    { icon: "⚡", title: "Kinh nghiệm 2", desc: "Mô tả kinh nghiệm" },
    { icon: "🤝", title: "Kinh nghiệm 3", desc: "Mô tả kinh nghiệm" }
  ],

  // ── Fullscreen Statement Quote ──
  quoteText: "Trích dẫn truyền cảm hứng...",
  quoteAuthor: siteConfig.seller.name,
  quoteRole: "Chuyên gia / Founder",

  // ── Bonus ──
  bonusLabel: "QUÀ TẶNG ĐẶC BIỆT",
  bonusHeading: "Nhận trọn bộ quà tặng đi kèm",
  bonusSub: "Chỉ dành cho khách hàng đăng ký hôm nay:",
  bonusItems: [
    {
      id: "01",
      title: "Quà tặng 1",
      desc: "Mô tả quà tặng 1 chi tiết"
    },
    {
      id: "02",
      title: "Quà tặng 2",
      desc: "Mô tả quà tặng 2 chi tiết"
    }
  ],

  // ── Final CTA ──
  urgencyBar: "⚠ ƯU ĐÃI SẼ KẾT THÚC SỚM",
  ctaLabel: "// ĐĂNG KÝ NGAY",
  ctaHeading: "Bắt đầu hành trình của bạn.",
  ctaSub: "Tham gia cùng hàng ngàn khách hàng hài lòng khác.",
  countdownLabel: "⏳ Ưu đãi kết thúc sau:",
  valueStackTitle: "TỔNG GIÁ TRỊ BẠN NHẬN ĐƯỢC:",
  valueStack: [
    { label: "💎 Giá trị 1", price: "X VNĐ" },
    { label: "💎 Giá trị 2", price: "Y VNĐ" }
  ],
  guarantee: "👑 Cam kết chất lượng và hoàn tiền nếu không hài lòng.",

  // ── Footer ──
  footerBrand: siteConfig.branding.footerBrand,
  footerDot: ".",
  footerTagline: "\\"Slogan ngắn gọn ở footer.\\"",
  footerLinks: [],
  footerCopyright: siteConfig.branding.copyright,

  blocksMeta: {
    order: ["hero", "pain", "attention", "rule", "cycle", "discovery", "solution", "skills", "midCta", "before-after", "roadmap", "instructor", "bonus", "cta", "footer"],
    hidden: [],
    media: {},
    custom: {},
  },
};`;

content = content.replace(/export const DEFAULT_CONTENT: PageContent = \{[\s\S]*?\};\n/g, defaultContentReplacement + '\n');
fs.writeFileSync('src/content.ts', content);
console.log("Patched content.ts");
