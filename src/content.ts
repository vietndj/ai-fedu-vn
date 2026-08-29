import { createContext, useContext, createElement } from "react";
import { siteConfig } from "./site.config";
import type { ReactNode } from "react";

export interface BlocksMeta {
  order: string[];
  hidden: string[];
  media: Record<string, any[]>;
  custom: Record<string, { title: string; body: string }>;
}

export interface SkillCard {
  n: string;
  title: string;
  desc: string;
  warn?: string;
  gif?: string;
  youtubeId?: string;
  aspectRatio?: string;
}
export interface Stage { n: string; title: string; sub?: string; desc?: string; gif?: string; time?: string; highlights?: string[] }
export interface ValueLine { label: string; price: string }

export interface PageContent {
  _v?: number;
  price: string;
  value: string;

  heroBadge: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroAccentLine: string;
  heroSub: string;
  heroCta: string;
  heroSubPrice?: string;
  heroVideoYoutubeId?: string;
  heroPoem?: string[];
  philosophyAssets?: { icon: string; tag: string; desc: string; isHighlight?: boolean; n?: string; title?: string; input?: string; output?: string; kpi?: string }[];

  // ── Bridge ──
  bridgeHeading?: string;
  bridgeLabel?: string;
  bridgeSteps?: { n: string; title: string; lead?: string; items?: string[]; desc?: string }[];
  bridgeCompareHeading?: string;
  bridgeCompareSubtitle?: string;
  bridgeCompareOldTitle?: string;
  bridgeCompareOldItems?: string[];
  bridgeCompareNewTitle?: string;
  bridgeCompareNewItems?: string[];
  bridgeCompareList?: {
    id: number;
    tag: string;
    oldAction: string;
    oldPain: string;
    userPrompt: string;
    aiResult: string;
    timeBadge: string;
  }[];

  // ── Showcase ──
  showcaseLabel?: string;
  showcaseHeading?: string;
  showcaseSub?: string;
  showcaseVideos?: { id: string; title: string; module?: string; thumb?: string }[];

  painLabel: string;
  painHeading: string;
  painQuote: string;
  painSub: string;
  pains: string[];
  painConclusion?: string;

  // ── Attention ──
  attentionLabel: string;
  attentionHeading: string;
  attentionPara: string;
  attentionComparisonTitle?: string;
  attentionItems: { icon: string; title: string; desc: string }[];

  // ── Rule ──
  ruleLabel: string;
  ruleHeading: string;
  rulePara?: string;
  ruleItems?: { fail: string; why: string }[];
  ruleCards?: { n: string; title: string; desc: string }[];
  ruleConclusion?: string;

  cycleLabel: string;
  cycleHeading: string;
  cyclePara?: string;
  cycleItems?: { fail: string; why: string }[];
  cycleSteps?: { n: string; title: string; desc: string }[];
  
  discoveryLabel?: string;
  discoveryHeading?: string;
  discoverySub?: string;
  discoveryItems?: { title: string; desc: string; gif?: string; placeholderLabel?: string }[];

  solutionLabel: string;
  solutionHeading: string;
  solutionSub: string;
  solutionItems: string[];

  skillsLabel: string;
  skillsHeading: string;
  skillCards: SkillCard[];

  midCtaHeading: string;
  midCtaSub: string;
  midCtaBtn: string;

  baLabel: string;
  baHeading: string;
  baSub: string;
  baBeforeMedia?: string;
  baAfterMedia?: string;
  beforeLabel: string;
  afterLabel: string;
  beforeItems: string[];
  afterItems: string[];

  roadmapLabel: string;
  roadmapHeading: string;
  roadmapPreviewHeading?: string;
  roadmapPreviewDesc?: string;
  roadmapIframeUrl?: string;
  roadmapChaptersHeading?: string;
  stages: Stage[];
  roadmapChaptersGif?: string;

  instructorLabel: string;
  instructorHeading: string;
  instructorSub?: string;
  instructorInitials: string;
  instructorName: string;
  instructorTitle: string;
  instructorBio: string[];
  instructorInsight?: string;
  instructorPhoto?: string;
  instructorBadge?: string;
  instructorHighlights?: { icon: string; title: string; desc: string }[];

  quoteText?: string;
  quoteAuthor?: string;
  quoteRole?: string;

  urgencyBar: string;
  ctaLabel: string;
  ctaHeading: string;
  ctaSub: string;
  countdownLabel: string;
  valueStackTitle: string;
  valueStack: ValueLine[];
  guarantee: string;

  footerBrand: string;
  footerDot: string;
  footerTagline: string;
  footerLinks: string[];
  bonusLabel: string;
  bonusHeading: string;
  bonusSub: string;
  bonusItems: {
    id: string;
    tag?: string;
    speedBadge?: string;
    title: string;
    desc: string;
    summary?: string;
    highlights?: { icon: string; label: string; text: string }[];
    mockupType?: "script" | "editor" | "webqr" | "support";
    audioDemo?: string;
    youtubeDemo?: string;
    gifDemo?: string;
  }[];
  footerCopyright: string;

  blocksMeta: BlocksMeta;
}

export const DEFAULT_CONTENT: PageContent = {
  _v: 7,
  price: "10.000",
  value: "2.990.000",

  heroBadge: "⚡ VŨ KHÍ COMPUTER USE • BƯỚC NHẢY VỌT TỪ CHATBOT SANG NHÂN SỰ SỐ",
  heroHeadline1: "ĐỪNG LÀM CU-LI CHO CHATGPT NỮA.",
  heroHeadline2: "Sở Hữu Hệ Điều Hành Doanh Nghiệp 1 Người Với Antigravity Pro.",
  heroPoem: [
    "Khóa Face DNA mang 100% khuôn mặt và giọng văn chính chủ",
    "Tạo Web bán hàng 30s có mã VietQR nổ tiền về tài khoản",
    "Điều khiển máy tính từ xa qua Telegram • Tự động hóa ổ cứng & Drive"
  ],
  heroAccentLine: "ChatGPT chỉ biết nói lý thuyết. Antigravity có tay chân để làm xong 100% từ A đến Z.",
  heroSub: "Dành riêng cho những người đang dùng ChatGPT hàng ngày nhưng kiệt sức vì phải tự copy-paste, tự làm web, tự ghép ảnh. Nâng cấp toàn diện thành Kiến Trúc Sư điều hành cỗ máy tự động hóa trên chính máy tính của bạn.",
  
  philosophyAssets: [
    {
      n: "01",
      icon: "👤",
      tag: "Trụ Cột 1",
      title: "Visual Twin & Voice DNA",
      desc: "Nạp 3 ảnh đời thường ➔ Mọi ảnh AI sinh ra đều đúng 100% mặt bạn. Viết bài chuẩn giọng riêng không mùi AI.",
    },
    {
      n: "02",
      icon: "💳",
      tag: "Trụ Cột 2",
      title: "Cỗ Máy Bán Hàng 1-Shot",
      desc: "1 câu chat ➔ Web bán hàng online sống ngay trong 30s. Khách quét mã VietQR là tiền nổ về tài khoản.",
    },
    {
      n: "03",
      icon: "🤖",
      tag: "Trụ Cột 3",
      title: "Computer Use & Telegram Remote",
      desc: "Toàn quyền thao tác ổ cứng, tự nén 1080p, đẩy Drive và điều khiển máy tính từ xa qua Telegram Bot.",
    }
  ],
  heroCta: "SỞ HỮU GÓI ANTIGRAVITY PRO (10.000đ) →",
  heroVideoYoutubeId: "",
  heroSubPrice: "Mức giá trải nghiệm độc quyền: 10.000 VNĐ (Giá gốc: 2.990.000 VNĐ)",

  bridgeHeading: "Sự Khác Biệt Giữa Chatbot 1.0 & Agentic AI 2.0",
  bridgeLabel: "TẠI SAO BẠN CẦN NÂNG CẤP NGAY",
  bridgeSteps: [
    {
      n: "01",
      title: "Từ Tư Vấn Lên Thực Thi",
      lead: "Không còn phải làm công nhân lắp ráp",
      items: [
        "ChatGPT đưa ra văn bản thô ➔ Bạn phải tự làm web, tự đăng bài, tự ghép ảnh.",
        "Antigravity nhận lệnh ➔ Tự mở file, tự chạy code, tự đẩy lên internet và bàn giao kết quả."
      ]
    }
  ],

  painLabel: "BẪY LAO ĐỘNG PHỤ TRỢ CỦA CHATGPT",
  painHeading: "Bạn có đang thấy mình bị kẹt trong những bế tắc này?",
  painQuote: "'Tôi dùng ChatGPT mỗi ngày, nhưng 90% công việc chân tay tôi vẫn phải tự gánh một mình...'",
  painSub: "4 rào cản khiến người dùng AI hàng ngày mãi không tạo ra đòn bẩy doanh số:",
  pains: [
    "❌ Bị giam cầm trong khung chat: AI viết xong bạn phải tự copy paste qua 5 ứng dụng khác nhau",
    "❌ Ảnh AI vô hồn: Sinh ảnh luôn ra người mẫu Tây/Tàu xa lạ, không dùng làm thương hiệu cá nhân được",
    "❌ Văn mẫu sáo rỗng: Bài viết mở đầu bằng 'Trong kỷ nguyên số...', đọc là biết ngay văn AI",
    "❌ Code lý thuyết: Bảo làm web bán hàng thì nó cho code text thô, không biết deploy hay tích hợp VietQR"
  ],

  attentionLabel: "3 TRỤ CỘT CỦA CỖ MÁY DOANH NGHIỆP 1 NGƯỜI",
  attentionHeading: "Hệ Sinh Thái Khép Kín: Từ Nhận Diện ➔ Bán Hàng ➔ Vận Hành",
  attentionPara: "Không phải các tính năng rời rạc, mà là 3 bánh răng khớp lệnh hoàn hảo biến máy tính thành Agency 3 nhân sự làm việc cho bạn 24/7.",
  attentionItems: [
    { icon: "🎨", title: "Trụ Cột 1: Studio Nhận Diện Độc Bản", desc: "Khóa Face DNA 100% mặt bạn + Bộ lọc kịch bản 3 tầng bóc trần văn mẫu sáo rỗng." },
    { icon: "💰", title: "Trụ Cột 2: Cỗ Máy Bán Hàng 1-Shot", desc: "Tự viết copy, tự code web Dark Obsidian, tự sinh mã VietQR theo đúng STK ngân hàng của bạn." },
    { icon: "⚡", title: "Trụ Cột 3: Nhân Sự Vận Hành Toàn Quyền", desc: "Thao tác file trực tiếp, tự nén video 1080p, tự đẩy Drive và điều khiển 2 chiều qua Telegram." },
    { icon: "🚀", title: "Zero-Friction Experience", desc: "Mọi tác vụ đều được kích hoạt bằng 1 câu chat tự nhiên, không cần nhớ cú pháp code." }
  ],

  ruleLabel: "3 SAI LẦM KHIẾN BẠN MÃI LÀM CU-LI CHO AI",
  ruleHeading: "Tại sao học thêm 100 prompt ChatGPT vẫn không giúp bạn rảnh tay?",
  ruleCards: [
    { n: "01", title: "Ảo Tưởng Prompt Dài", desc: "Viết prompt dài 3 trang giấy chỉ để nhận về một câu trả lời văn bản, trong khi bạn vẫn phải tự tay làm việc." },
    { n: "02", title: "Dùng AI Không Có Tay Chân", desc: "Chatbot trên web không thể chạm vào ổ cứng, không thể đẩy Drive hay gửi báo cáo về điện thoại." },
    { n: "03", title: "Thiếu Hệ Thống Chuyển Đổi", desc: "Có nội dung nhưng không có công cụ tạo trang bán hàng và quét mã VietQR tự động thu tiền." }
  ],

  cycleLabel: "LỘ TRÌNH THĂNG CẤP GAME (GAMIFICATION)",
  cycleHeading: "3 Cấp Độ Mở Khóa Năng Lực Trả Thưởng Tức Thì:",
  cycleSteps: [
    { n: "Level 1", title: "Căn Cước AI & Drive (3 Phút)", desc: "Nạp 3 ảnh mỏ neo ➔ Nhận ngay bản sao số Visual Twin + Kết nối Drive upload 1 chạm." },
    { n: "Level 2", title: "Kịch Bản Viral & Đăng Bài (10 Phút)", desc: "Bóc sự thật 3 tầng + Bóc văn mẫu AI + Lên lịch tự động đăng Fanpage chuẩn giờ vàng." },
    { n: "Level 3", title: "Cỗ Máy Bán Hàng & Telegram Remote", desc: "Dựng web bán hàng VietQR trong 30 giây + Biến điện thoại thành Remote điều khiển cả hệ thống." }
  ],
  
  discoveryLabel: "BỘ KỸ NĂNG THỰC CHIẾN",
  discoveryHeading: "Trọn bộ Skills đóng gói sẵn trong gói Antigravity Pro:",
  discoveryItems: [
    { title: "ai-face-clone", desc: "Tự sinh ảnh avatar, poster, mockup chuẩn 100% khuôn mặt và trang phục của bạn." },
    { title: "miss-ban-hang", desc: "Tự viết copy, tạo landing page chuẩn AIDA và gắn VietQR ngân hàng chính chủ." },
    { title: "telegram-dispatcher", desc: "Nhận lệnh và bắn báo cáo kết quả hoàn tất về điện thoại qua Bot Telegram." },
    { title: "google-drive-sync", desc: "Tự động quét file trong ổ cứng, tải lên Google Drive và lấy link công khai." }
  ],

  solutionLabel: "KẾT QUẢ ĐỔI ĐỜI",
  solutionHeading: "Sau khi cài đặt xong, bạn sẽ sở hữu những gì?",
  solutionSub: "Một cỗ máy làm việc thực sự thay thế cả một phòng ban:",
  solutionItems: [
    "✅ Sở hữu Bản sao số AI (Visual Twin) mang khuôn mặt chính chủ của bạn trong mọi bối cảnh",
    "✅ Tự tạo Landing Page bán hàng gắn VietQR tài khoản ngân hàng của bạn chỉ sau 30 giây",
    "✅ Viết bài và kịch bản video mang đúng giọng văn của bạn, không còn 1 dòng văn mẫu AI",
    "✅ Điều khiển máy tính từ xa qua Telegram Bot khi đang ngồi cà phê ngoài đường",
    "✅ Giải phóng 90% thời gian thao tác vụn vặt: Tự nén video 1080p, tự đẩy Drive, tự đăng Page"
  ],

  skillsLabel: "VŨ KHÍ THỰC THI",
  skillsHeading: "4 Năng Lực Cốt Lõi Của Nhân Sự Số Antigravity:",
  skillCards: [
    { n: "01", title: "Visual Twin Engine", desc: "Khóa Face DNA tỉ lệ hàm, mắt, nụ cười. Tự soi ảnh kiểm tra độ giống >95% trước khi xuất bản." },
    { n: "02", title: "1-Shot Cashflow Machine", desc: "Biến ý tưởng thành tiền trong 30 giây. Web sống trên internet, khách quét QR là tiền về tài khoản." },
    { n: "03", title: "Computer Use Mastery", desc: "Toàn quyền đọc ghi file, chạy Terminal ngầm và tự bắt lỗi sửa code (Closed Feedback Loop)." },
    { n: "04", title: "Remote Autonomous Daemon", desc: "Daemon 2 chiều kết nối Telegram Bot. Nhắn 1 câu trên điện thoại là máy tính ở nhà tự động chạy." }
  ],

  midCtaHeading: "Đừng để mình mãi là công nhân lắp ráp cho Chatbot.",
  midCtaSub: "Nâng cấp lên Hệ Điều Hành Doanh Nghiệp 1 Người với mức phí ưu đãi 10.000 VNĐ.",
  midCtaBtn: "MUA NGAY GÓI ANTIGRAVITY PRO (10.000đ)",

  baLabel: "SỰ KHÁC BIỆT TRIỆT ĐỂ",
  baHeading: "Trước & Sau Khi Trang Bị Antigravity Pro:",
  baSub: "",
  beforeLabel: "CHATGPT THƯỜNG",
  afterLabel: "ANTIGRAVITY PRO",
  beforeItems: [
    "Phải tự copy text qua Word/Canva",
    "Ảnh sinh ra mặt Tây/Tàu ngẫu nhiên",
    "Tốn tiền triệu thuê làm web bán hàng",
    "Ngồi ôm máy tính cả ngày làm thủ công"
  ],
  afterItems: [
    "AI tự làm xong từ A đến Z",
    "Ảnh đúng 100% mặt và phong cách của bạn",
    "Tự tạo web VietQR trong 30 giây miễn phí",
    "Đi cà phê nhắn Telegram điều khiển hệ thống"
  ],

  roadmapLabel: "CÁCH THỨC BẮT ĐẦU",
  roadmapHeading: "3 Bước Kích Hoạt Cực Kỳ Đơn Giản:",
  stages: [
    { 
      n: "Bước 1", 
      time: "Ngay bây giờ",
      title: "Thanh Toán & Kích Hoạt", 
      desc: "Quét mã VietQR chuyển khoản 10.000đ để nhận ngay bộ mã nguồn và cấu hình trọn gói."
    },
    { 
      n: "Bước 2", 
      time: "1 Cú Click",
      title: "Cài Đặt 1-Shot Vào Máy", 
      desc: "Chạy 1 câu lệnh tự động nạp toàn bộ Skills, Face DNA và tokens vào Antigravity."
    },
    { 
      n: "Bước 3", 
      time: "Trọn Đời",
      title: "Vận Hành Doanh Nghiệp 1 Người", 
      desc: "Ra lệnh tự nhiên và tận hưởng cỗ máy tự động hóa làm việc cho bạn 24/7."
    }
  ],

  instructorLabel: "CHUYÊN GIA ĐỒNG HÀNH",
  instructorHeading: "Về người phát triển hệ thống",
  instructorSub: "Kiến Trúc Sư Trí Tuệ Hệ Thống & Tự Động Hóa",
  instructorInitials: "NV",
  instructorName: "Nguyễn Đức Việt",
  instructorTitle: "Kiến Trúc Sư AI & Sáng Lập FEDU",
  instructorBadge: "SYSTEM ARCHITECT",
  instructorBio: [
    "Hơn 15 năm kinh nghiệm trong lĩnh vực lập trình hệ thống, đào tạo công nghệ và tự động hóa doanh nghiệp.",
    "Tác giả hệ sinh thái cỗ máy nội dung & bán hàng tự động 1-Shot trên nền tảng Antigravity.",
    "Trực tiếp chuyển giao và đóng gói năng lực Agentic AI cho hàng nghìn học viên và chủ doanh nghiệp số."
  ],
  instructorHighlights: [
    { icon: "⚡", title: "1-Shot Architect", desc: "Tiên phong Computer Use" },
    { icon: "🎓", title: "FEDU.VN", desc: "Nền tảng đào tạo thực chiến" },
    { icon: "🚀", title: "Zero-Friction", desc: "Tối giản rào cản kỹ thuật" }
  ],

  quoteText: "Trong kỷ nguyên Agentic AI, kẻ chiến thắng không phải là người gõ prompt giỏi nhất, mà là người biết trao cho AI 'tay chân' để tự động hóa toàn bộ cỗ máy tạo ra dòng tiền.",
  quoteAuthor: "Nguyễn Đức Việt",
  quoteRole: "AI System Architect",

  bonusLabel: "BỘ QUÀ TẶNG KÈM THEO",
  bonusHeading: "Nhận trọn bộ vũ khí độc quyền kèm theo gói:",
  bonusSub: "Dành riêng cho khách hàng đăng ký trải nghiệm hôm nay:",
  bonusItems: [
    {
      id: "01",
      title: "Bộ Template Landing Page Dark Obsidian",
      desc: "Kho giao diện bán hàng cao cấp chuẩn tâm lý học hành vi, tích hợp sẵn VietQR động."
    },
    {
      id: "02",
      title: "Daemon Điều Khiển Telegram 2 Chiều",
      desc: "Mã nguồn bot NOVA-CORE kết nối máy tính với điện thoại của bạn an toàn 100%."
    },
    {
      id: "03",
      title: "Bộ 10 Skills Tự Động Hóa Đóng Gói Sẵn",
      desc: "Nạp 1 lệnh có ngay toàn bộ kỹ năng lọc văn mẫu, bóc phân cảnh, nén 1080p và đẩy Drive."
    }
  ],

  urgencyBar: "⚡ CƠ HỘI TRẢI NGHIỆM ĐỘC QUYỀN VỚI GIÁ 10.000 VNĐ",
  ctaLabel: "// HỆ ĐIỀU HÀNH DOANH NGHIỆP 1 NGƯỜI",
  ctaHeading: "Nâng cấp lên Kỷ nguyên Agentic AI ngay hôm nay.",
  ctaSub: "Chỉ với 10.000đ để sở hữu toàn bộ cỗ máy tự động hóa thực chiến trên máy tính của bạn.",
  countdownLabel: "⏳ Thời gian áp dụng mức giá thử nghiệm:",
  valueStackTitle: "TỔNG GIÁ TRỊ BẠN SẼ NHẬN ĐƯỢC:",
  valueStack: [
    { label: "Gói Antigravity Pro (Full 3 Trụ Cột)", price: "1.990.000đ" },
    { label: "Module Visual Twin (Face DNA Engine)", price: "990.000đ" },
    { label: "Cỗ Máy Miss Bán Hàng 1-Shot + VietQR", price: "990.000đ" },
    { label: "Daemon Telegram Remote 2 Chiều", price: "500.000đ" },
    { label: "Tổng giá trị thực tế", price: "4.470.000đ" }
  ],
  guarantee: "👑 Cài đặt 1-Click. Hoàn tiền 100% nếu hệ thống không hoạt động đúng như mô tả.",

  footerBrand: "AI FEDU",
  footerDot: ".",
  footerTagline: "\"Hệ Điều Hành Doanh Nghiệp 1 Người.\"",
  footerLinks: [],
  footerCopyright: siteConfig.branding.copyright,

  blocksMeta: {
    order: ["hero", "pain", "attention", "rule", "cycle", "discovery", "solution", "skills", "midCta", "before-after", "roadmap", "instructor", "bonus", "cta", "footer"],
    hidden: [],
    media: {},
    custom: {},
  },
};

export const ContentCtx = createContext<PageContent>(DEFAULT_CONTENT);

export function useContent(): PageContent {
  return useContext(ContentCtx);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  return createElement(ContentCtx.Provider, { value: DEFAULT_CONTENT }, children);
}
