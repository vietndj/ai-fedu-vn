# BẢN TÓM TẮT DỰ ÁN: VIDEO.FEDU.VN

## 1. 📌 Tổng Quan Dự Án (Project Overview)
* **Domain / Sản phẩm:** `video.fedu.vn` (Tên package/repo: `@workspace/video-landing`).
* **Mục đích:** Landing Page giới thiệu và bán **Khóa học trực tuyến về Tư duy Quay & Edit Video bằng Điện thoại** (Tên khóa học: *Video The Creator / Kỹ nghệ Giấu Vết Cắt*).
* **Tác giả / Giảng viên:** **Nguyễn Đức Việt (NĐV)** 
  * Kỹ sư Công nghệ Phần mềm (Đại học Bách Khoa Hà Nội).
  * 15 năm kinh nghiệm Giảng viên Mỹ thuật Đa phương tiện tại FPT Arena.
* **Mô hình kinh doanh:** Bán sản phẩm số (Digital Course) học Online xem lại trọn đời.
* **Giá bán:** 
  * Giá ưu đãi: **299.000 VNĐ**
  * Giá niêm yết / Tổng giá trị: **3.250.000 VNĐ** (Khóa học 2.000.000đ + Bộ quà tặng 1.250.000đ).

---

## 2. 🎯 Định vị Nội dung & Nỗi đau Khách hàng (Sales & Content Strategy)
* **Đối tượng mục tiêu:** Người làm nội dung, xây kênh bán hàng/thương hiệu cá nhân bằng điện thoại, muốn video trông chuyên nghiệp nhưng không thích dùng kỹ xảo/app sến sẩm.
* **Vấn đề khách hàng gặp phải (Pain Points):**
  1. Cắt cảnh giật cục, vết cắt bị thô và sượng.
  2. Lạm dụng chuyển cảnh (transition) 3D của CapCut làm mất tự nhiên.
  3. Góc máy buồn ngủ, ánh sáng phẳng lì làm video bị "rẻ tiền".
* **Giải pháp & Nguyên lý cốt lõi dạy trong khóa học:**
  1. **Cut-on-Action (Điểm nối tàng hình):** Nối cảnh dựa theo chuyển động thật (vung tay, lướt đồ vật) để giấu vết cắt.
  2. **Ánh sáng tôn khối 3D:** Setup 2 đèn (Key & Back light) tạo chiều sâu 3D cho phòng nhỏ.
  3. **Điều hướng cỡ cảnh:** Luân chuyển linh hoạt giữa Toàn - Trung - Cận để thay đổi điểm nhìn mỗi 3 giây.
  4. **B-roll minh họa:** Lồng cảnh phụ để che lỗi vấp nói và tăng độ thuyết phục.
* **Bộ quà tặng đi kèm (Bonus Stack):**
  1. Kho 50+ SFX âm thanh điện ảnh.
  2. Thư viện Nhạc nền MasterClass sản xuất bằng AI (Sạch bản quyền 100%).
  3. Sơ đồ đánh sáng 3 điểm cho phòng hẹp.
  4. Bộ Prompt AI hỗ trợ phân tích kịch bản & phân phân cảnh (Shot-list).
  5. Cập nhật miễn phí các quy trình edit video bằng AI.

---

## 3. 🛠️ Kiến trúc Kỹ thuật (Technical Stack)
* **Frontend:**
  * **Framework:** React 19 (`react` 19.1.0, `react-dom` 19.1.0), TypeScript, Vite 7 (`vite` 7.3.2).
  * **Styling:** Vanilla CSS modular (`landing.css`, `fonts.css`, `index.css`), thiết kế Responsive, Glassmorphic UI & hiệu ứng chuyển động mượt mà.
  * **Các Section chính:** Hero, Pain (Nỗi đau), Attention, Rule 7-11-4, Cycle (Vòng lặp thử sai), Discovery (Công thức thị giác), Skills (4 nguyên lý), Mid CTA, Before-After, Roadmap (Lộ trình), Instructor (Giảng viên), Bonus (Quà tặng), Checkout Modal, Live Social Proof (Thông báo đăng ký thời gian thực).
* **Backend & API:**
  * **Architecture:** Serverless Functions chạy trên Vercel (`@vercel/node`).
  * **Các API endpoint chính trong thư mục `/api`:**
    * `/api/lead/register.ts`: Xử lý đăng ký thông tin lead.
    * `/api/payment/check.ts`: Kiểm tra trạng thái thanh toán từ ngân hàng.
    * `/api/payment/confirm.ts`: Xác nhận thanh toán thành công & kích hoạt tự động hóa.

---

## 4. 🔄 Luồng Dữ Liệu & Tự Động Hóa (Data Flow & Automation Workflow)

1. **Bước 1: Đăng ký (Lead Capture & Validation)**
   * Khách điền Họ tên, Số điện thoại, Email tại Modal Checkout.
   * Frontend gửi request tới API `/api/lead/register.ts`.
   * **Validation Backend:** Lọc từ ngữ vi phạm (bad words), chặn SĐT giả/rác, chặn Email tạm thời (tempmail).
   * **Lưu trữ:** API gửi thông tin qua Google Apps Script Webhook để ghi nhận thông tin vào **Google Sheets** với trạng thái `"chưa thanh toán"`.

2. **Bước 2: Thanh toán Tự động (Auto-Payment Matching)**
   * Trang hiển thị Mã QR VietQR (Ngân hàng MBBank) chứa số tiền 299.000đ và cú pháp chứa SĐT của khách.
   * Client mở kết nối polling liên tục tới API `/api/payment/check.ts`.
   * Backend gọi **SePay API** (`https://my.sepay.vn/userapi/transactions/list`) để kiểm tra danh sách biến động số dư tài khoản ngân hàng thực tế.
   * Khi phát hiện giao dịch khớp: `Số tiền = 299.000đ` + `Nội dung chuyển khoản chứa SĐT của khách` + `Thời gian giao dịch hợp lệ`.

3. **Bước 3: Xác nhận & Cấp quyền tự động (Fulfillment & CRM Automation)**
   * Khi khớp thanh toán thành công, Frontend gọi tiếp API `/api/payment/confirm.ts`.
   * Backend gửi request sang Google Apps Script để cập nhật trạng thái dòng tương ứng trên **Google Sheets** thành `"Đã thanh toán"`.
   * Đồng thời, Backend bắn Webhook sang **Make.com** (`hook.us2.make.com/...`).
   * **Make.com** xử lý tự động gửi email xác nhận và kích hoạt cấp quyền/mời học viên vào cộng đồng khóa học trên nền tảng **Skool** (Skool Course Platform).

---

## 5. 🔌 Các Tích hợp Bên thứ ba (Third-Party Integrations)
* **Vercel:** Hosting & Serverless Functions execution.
* **Google Sheets (via Google Apps Script):** Làm Database nhẹ quản lý danh sách Lead/Đơn hàng.
* **SePay:** Cổng trung gian quét biến động số dư ngân hàng qua QR Code VietQR để auto-confirm.
* **Make.com (Integromat):** Luồng iPaaS tự động hóa bàn giao khóa học.
* **Skool:** Nền tảng LMS / Cộng đồng học tập dành cho học viên.
