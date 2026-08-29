# Video Landing Page Design System Rules

**Toàn bộ codebase bắt buộc phải sử dụng các class CSS toàn cục (như `.cl-sh`, `.cl-sec`) thay vì viết inline styles.**

## 1. Không Gian Khối (Layout Max-Width)
- **Single-Column**: Khóa cứng `maxWidth: 860px`.
- **Grid / Card**: Khóa cứng `maxWidth: 1020px`. (Dùng class `.cl-sec--full`).
- **Padding giữa các khối**: Luôn duy trì `padding-top: 120px` (được cấu hình trong `.cl-sec`).

## 2. Hệ Phông Chữ (Typography Stack)
- **Heading (Tiêu đề chính)**: `Noe Display` (`fontDisplay`). Độ đậm khóa ở mức `500 (Medium)`, tuyệt đối không dùng 700/800/900.
- **Body (Văn bản dài, mô tả)**: `Aeonik` / `Inter` (`fontBody`). Độ đậm `400 (Regular)`.
- **Accent / Meta (Nhãn tag, Label, Mã giảm giá, Header cột)**: `JetBrains Mono` (`fontMono`). Bắt buộc IN HOA và `letter-spacing: 0.15em` đến `0.18em`.

## 3. Tiêu đề & Cân bằng dọc (Vertical Rhythm)
- **Line-Height (Chiều cao dòng)**: Khóa ở mức `1.15` cho tiêu đề Noe Display.
- **Letter-Spacing (Khoảng cách chữ)**: Khóa ở mức `-0.018em` cho tiêu đề Noe Display.
- **Class bắt buộc**: Tất cả tiêu đề H1/H2 phải dùng class `.cl-sh`.

## 4. Văn Bản Dài (Body Text)
- **Màu sắc**: Không dùng Trắng Tinh (`#ffffff`). Luôn dùng Xám Sáng (`#b0b0b0` / `var(--cl-text-body)`).
- **Kích thước & Dòng**: `fontSize` dùng `clamp(16px, 1.8vw, 19px)`. `line-height` từ `1.75` đến `1.85`.

## 5. Hình Khối Bo Góc (Radius & Border)
- **Thẻ Card**: Bo góc `16px` (`var(--cl-radius)`).
- **Nút CTA**: Bo góc `12px`, padding dày `22px 56px`.
- **Đường viền vi mạch**: Sử dụng màu chủ đạo (`var(--cl-accent)` pha với opacity 20-30%) để tạo Glow thay vì viền xám đục.

## 6. Bản Chất Sản Phẩm & Quy Chuẩn Nội Dung (Kim Chỉ Nam Bắt Buộc)

### 6.1. Định vị & Nền tảng cốt lõi
- **Sản phẩm:** Gói chia sẻ kinh nghiệm + bàn giao 3 công cụ làm sẵn giúp người làm video rảnh tay, giá ưu đãi 499k của Thầy Nguyễn Đức Việt.
- **Nền tảng lõi: GOOGLE GEMINI QUEN THUỘC**
  - Toàn bộ hệ thống vận hành trực tiếp trên nền tảng **Google Gemini** bằng chính tài khoản Google của bạn.
  - **Không dùng phần mềm lạ làm nặng máy, không phụ thuộc công cụ trôi nổi ngoài thị trường.**
  - Sự khác biệt: Thay vì lên chat hỏi đáp vu vơ vài câu văn dài dòng vô dụng, chương trình chỉ cách dùng **lõi Gemini để làm thợ thực thi**: Bạn chỉ việc nhắn lệnh bằng tiếng Việt đời thường, Gemini tự động làm thay toàn bộ việc tay chân từ A đến Z.

### 6.2. Ba Công Cụ Cụ Thể Được Bàn Giao (Làm sẵn 80% — Cắm là chạy)
1. **01. Công cụ bóc kịch bản clip hay:**
   - Thấy clip nào trên mạng đang viral hay, dán link vào là AI tự bóc sạch lời nói và góc quay thành kịch bản 2 cột để quay theo trong 5 phút. Khỏi cắn bút nghĩ câu mở đầu.
2. **02. Trợ lý Dựng video tự động (Auto Edit cho video):**
   - **Chế độ ăn ngay:** Ném video tự quay vào → AI tự nghe tiếng Việt để gọt sạch đoạn ngập ngừng, tự làm phụ đề chuyển động bắt mắt và xuất thẳng ra video hoàn chỉnh để bạn đăng ngay.
   - **Chế độ tùy biến theo gu:** Bạn thoải mái chọn kiểu hiệu ứng chữ và phong cách cảnh trám minh họa → AI tự động lưu lại làm mẫu chuẩn, các video sau cứ thế tự động áp dụng đồng bộ mà không cần phải chỉnh lại từ đầu.
3. **03. Trang web bán hàng tự động:**
   - Trang web có sẵn mã QR ngân hàng. Khách quét mã chuyển khoản là tiền về tài khoản, web tự gửi bài học cho khách lúc 2h sáng mà không cần trực chat.
   - **Tự tạo thì mới tự sửa được:** Khi muốn bán sản phẩm khác, chỉ cần nhắn tin ra lệnh là AI tự đổi câu chữ, đổi hình ảnh trên web trong 10 phút, không cần biết code hay thuê thợ.

### 6.3. Sổ đen từ ngữ cấm (Blacklist — Tuyệt đối không dùng)
- ❌ **Cấm từ đao to búa lớn / sặc mùi AI:** *Tài sản, Tài sản số, Trùm cuối, Hệ sinh thái, Sáng lập, Tuyên ngôn, Vũ khí hủy diệt, Remotion, SePay, Bứt phá, Chuyển hóa, Nâng tầm vị thế, Tối ưu hóa toàn diện...*
- 👉 **Luôn dùng ngôn từ đời thường, mộc mạc, thực chiến (hành động mắt thấy - tai nghe).**

