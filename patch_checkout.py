import re

with open('src/Checkout.tsx', 'r') as f:
    content = f.read()

# Fix function H
content = re.sub(
    r'<h2 className="cl-sh">',
    r'<h2 className="cl-sh" style={{ fontSize: "clamp(24px, 4vw, 36px)" }}>',
    content
)

# Fix items in PaymentSuccessModal and ConfirmBanner
old_list = r'\["🎬 Masterclass AI Creator System", `🎁 \$\{c\.valueStack\.length > 1 \? c\.valueStack\[1\]\.label : "Quà Tặng Độc Quyền"\}`, "♾ Sở hữu vĩnh viễn"\]'
new_list = r'["🎬 Gói Bàn Giao 3 Trợ Lý AI Cho Video", "🎁 Trọn bộ 3 công cụ tự động hóa & web bán hàng", "♾ Hỗ trợ Zalo 1-1 & Sở hữu vĩnh viễn"]'

content = re.sub(old_list, new_list, content)

with open('src/Checkout.tsx', 'w') as f:
    f.write(content)

