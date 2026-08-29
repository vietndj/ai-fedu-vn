// List of Vietnamese profanity, vulgar words, and troll patterns
const BAD_WORDS = [
  "dm", "dmm", "đm", "đmm", "vl", "vkl", "vcl", "dkm", "đkm", "cl", "clm", 
  "đéo", "deo", "buồi", "buoi", "lồn", "lon", "cặc", "cac", "phò", "cave", 
  "chó", "cho'", "troll", "fck", "fuck", "shit", "asshole", "bitch", "duma", 
  "đụ", "du me", "đụ má", "đụ mẹ", "địt", "dit", "con cặc", "cái lồn", "cc", 
  "bố mày", "dcm", "đcm", "dcmm", "đcmm", "điên", "ngu", "xàm", "lừa đảo", "lua dao"
];

// Blocked fake phone numbers
const FAKE_PHONES = [
  "0123456789", "0987654321", "0000000000", "0111111111", "0222222222", 
  "0333333333", "0444444444", "0555555555", "0666666666", "0777777777", 
  "0888888888", "0999999999", "0909090909", "0919191919", "0989898989",
  "012345678", "098765432"
];

// Blocked disposable / fake email domains & prefixes
const BLOCKED_EMAIL_PREFIXES = ["test", "admin", "abc", "asdf", "123", "xxx", "aaaa", "temp", "fake"];
const BLOCKED_EMAIL_DOMAINS = [
  "tempmail.com", "10minutemail.com", "yopmail.com", "mailinator.com", 
  "guerrillamail.com", "trashmail.com", "dispostable.com", "getnada.com"
];

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateForm(name: string, email: string, phone: string): ValidationResult {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPhone = phone.replace(/[\s\.\-\+]/g, "").trim();

  // 1. Validate Name
  if (!cleanName || cleanName.length < 2) {
    return { isValid: false, error: "Vui lòng nhập đầy đủ Họ và tên của bạn." };
  }

  // Check repetition of same character (e.g. "aaaaaa", "xxxx")
  if (/^(.)\1{3,}$/i.test(cleanName)) {
    return { isValid: false, error: "Họ và tên không hợp lệ. Vui lòng nhập tên thật của bạn." };
  }

  // Check profanity in name
  const nameLower = cleanName.toLowerCase();
  const containsBadWord = BAD_WORDS.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, "i");
    return regex.test(nameLower) || nameLower.includes(` ${word} `) || nameLower === word;
  });

  if (containsBadWord) {
    return { isValid: false, error: "Họ và tên chứa từ ngữ không phù hợp. Vui lòng nhập tên thật của bạn." };
  }

  // 2. Validate Vietnamese Phone Number
  // Format: 10 digits starting with 03, 05, 07, 08, 09 or +84 / 84
  let normalizedPhone = cleanPhone;
  if (normalizedPhone.startsWith("84")) {
    normalizedPhone = "0" + normalizedPhone.slice(2);
  }

  const vnPhoneRegex = /^(03|05|07|08|09)\d{8}$/;
  if (!vnPhoneRegex.test(normalizedPhone)) {
    return { isValid: false, error: "Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 số di động của bạn (ví dụ: 0912 345 678)." };
  }

  if (FAKE_PHONES.includes(normalizedPhone) || /^(.)\1{9}$/.test(normalizedPhone)) {
    return { isValid: false, error: "Vui lòng nhập số điện thoại thật để hệ thống gửi thông tin kích hoạt." };
  }

  // 3. Validate Email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleanEmail)) {
    return { isValid: false, error: "Email không đúng định dạng. Vui lòng kiểm tra lại địa chỉ email." };
  }

  const [emailUser, emailDomain] = cleanEmail.split("@");

  if (BLOCKED_EMAIL_DOMAINS.includes(emailDomain)) {
    return { isValid: false, error: "Vui lòng không sử dụng email tạm thời. Nhập email thật để nhận khóa học." };
  }

  if (BLOCKED_EMAIL_PREFIXES.includes(emailUser) || emailUser.length < 3 || /^(.)\1{3,}$/.test(emailUser)) {
    return { isValid: false, error: "Email có vẻ không chính xác. Vui lòng nhập email thật (ví dụ: Gmail, Outlook...)." };
  }

  return { isValid: true };
}
