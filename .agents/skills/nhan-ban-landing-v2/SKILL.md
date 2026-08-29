---
name: nhan-ban-landing-v2
description: >-
  Kích hoạt khi người dùng yêu cầu tạo web bán hàng, landing page bán hàng, trang bán sản phẩm,
  hoặc nhân bản web bán hàng. Từ khóa: "tạo web bán hàng", "landing page", "nhân bản landing",
  "tạo trang bán", "bán hàng online", "web thanh toán tự động".
  Skill này tích hợp Mega Prompt Miss Bán Hàng để phỏng vấn 4 bước, tự sinh nội dung marketing,
  và tự deploy lên Vercel.
---

### Skill Content (6 Phases):

**PHASE 1: PHỎNG VẤN THU THẬP THÔNG TIN KINH DOANH (Miss Bán Hàng 4 Bước)**

The AI must conduct a 4-step interview based on the Miss Bán Hàng mega prompt framework:

- **Bước 1**: Sản phẩm, định dạng & giá bán
  - AI tự suy luận loại SP (Vật lý / Dịch vụ-Đào tạo / Sản phẩm số)
  - Nếu người dùng chưa nói giá → hỏi bổ sung
  - Nếu đã có đủ → chuyển thẳng sang Bước 2

- **Bước 2**: Khách hàng & Nỗi đau (ICP & Pain Point)
  - Hỏi: Người mua cụ thể là ai? (tuổi, nghề, hoàn cảnh)
  - Hỏi: Khó khăn/bất tiện lớn nhất mà SP giải quyết?
  - Kèm gợi ý A/B/C dựa trên ngành

- **Bước 3**: Kết quả đổi đời & Kẽ hở đối thủ
  - Hỏi: Khách đạt kết quả gì sau bao lâu?
  - Hỏi: Điểm yếu của đối thủ/giải pháp cũ?

- **Bước 4**: Lý do tin tưởng & Upsell
  - Hỏi: Câu chuyện/bằng chứng tạo uy tín?
  - Hỏi: Có SP upsell giá cao hơn sau này không?

Quy tắc phỏng vấn:
- Xưng "mình - bạn", thẳng thắn, thực tế
- Tương tác tuyến tính: chỉ hỏi 1 bước, DỪNG CHỜ, rồi mới tiếp
- Giáo dục trước (giải thích tại sao), hỏi sau
- Luôn kèm gợi ý phao cứu sinh

**PHASE 2: THU THẬP THÔNG TIN KỸ THUẬT**

Sau khi hoàn thành 4 bước phỏng vấn, dùng tool `ask_question` hỏi TOÀN BỘ thông tin kỹ thuật 1 lần:

Câu hỏi 1: "Thông tin tài khoản ngân hàng nhận thanh toán?"
- Tên ngân hàng (VD: TPBank, MB Bank, Techcombank...)
- Số tài khoản
- Tên chủ tài khoản (IN HOA)

Câu hỏi 2: "Bạn đã có SePay API Key chưa?"
- Option 1: Có rồi (nhập key)
- Option 2: Chưa có (hướng dẫn đăng ký tại https://my.sepay.vn)

Câu hỏi 3: "Thông tin Telegram Bot (nhận thông báo đơn hàng)?"
- Option 1: Dùng mặc định NOVA-CORE (Token: 8964853536:AAHuRNm_hY-YQtveBD1HlmthN4I5xpVzM8U, Chat ID: 2050406425)
- Option 2: Nhập Bot Token & Chat ID riêng

**PHASE 3: SINH NỘI DUNG MARKETING TỰ ĐỘNG**

Dùng dữ liệu từ 4 bước phỏng vấn, AI phải tự sinh TOÀN BỘ nội dung cho file `src/content.ts`.

Tham khảo file `references/content-schema.md` để biết chính xác ~70+ trường cần viết.
Tham khảo file `references/mega-prompt-banhang.md` để biết framework sinh nội dung.

Nội dung phải:
- Viết bằng tiếng Việt, giọng bán hàng chuyên nghiệp
- Đánh trúng nỗi đau từ Bước 2
- Nêu kết quả đổi đời từ Bước 3
- Xây dựng uy tín từ Bước 4
- Đồng bộ giá bán xuyên suốt (Hero, Mid CTA, Final CTA, Value Stack)

Cũng cần sinh 15 dòng LiveSocialProof phù hợp ngành.

**PHASE 4: GHI CONFIG & POPULATE TEMPLATE**

Đường dẫn template gốc: `/Users/vietmac/Documents/CODE/mau-ban-hang-v2`

1. Copy template sang thư mục mới (tên theo sản phẩm)
2. Ghi `src/site.config.ts` với thông tin thanh toán từ Phase 2
3. Ghi `src/content.ts` với nội dung marketing từ Phase 3
4. Cập nhật `src/LiveSocialProof.tsx` với 15 dòng popup mới
5. Ghi `.env` với API keys
6. Chạy `npm install && npm run build` để verify build clean

**PHASE 5: DEPLOY LÊN VERCEL**

1. Kiểm tra Vercel CLI: `npx vercel whoami`
2. Deploy: `npx vercel --prod --yes`
3. Cấu hình env vars trên Vercel (ghi rõ các biến cần set)
4. Hướng dẫn cấu hình SePay webhook:
   - Đăng nhập https://my.sepay.vn → Cài đặt → Webhook
   - URL: `https://[domain-vercel]/api/payment/webhook`
   - Method: POST

**PHASE 6: TRẢ KẾT QUẢ & HƯỚNG DẪN**

Trả về:
```
🎉 Landing Page bán hàng đã sẵn sàng!

🔗 Website: [URL]
📦 Sản phẩm: [Tên]
💰 Giá bán: [Giá]
💳 Thanh toán: VietQR tự động ([Tên ngân hàng])
📱 Thông báo: Telegram [Bot name]

⚙️ Cần làm thêm:
1. Cấu hình SePay Webhook trỏ về [URL]/api/payment/webhook
2. Test thanh toán thử
```
