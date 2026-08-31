#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Tạo Thẻ Kích Hoạt Kỹ Năng AI (AI Skills Activation Card) đẹp mắt, chuẩn tỉ lệ.
"""

import os
import qrcode
from PIL import Image, ImageDraw, ImageFont

def create_card():
    width, height = 1200, 675  # 16:9 ratio
    card = Image.new("RGBA", (width, height), (7, 9, 14, 255))
    draw = ImageDraw.Draw(card)

    # 1. Background gradient / subtle grid
    for y in range(height):
        alpha = int(10 + (y / height) * 20)
        draw.line([(0, y), (width, y)], fill=(15, 20, 31, alpha))

    # Glow accents in corners
    # Top-right blue glow
    for r in range(300, 0, -10):
        alpha = int((300 - r) / 300 * 35)
        draw.ellipse([(width - 200 - r, -100 - r), (width - 200 + r, -100 + r)], fill=(37, 99, 235, alpha))
    # Bottom-left emerald glow
    for r in range(250, 0, -10):
        alpha = int((250 - r) / 250 * 25)
        draw.ellipse([(-50 - r, height - 50 - r), (-50 + r, height - 50 + r)], fill=(16, 185, 129, alpha))

    # Outer border with rounded rect
    margin = 30
    draw.rounded_rectangle(
        [(margin, margin), (width - margin, height - margin)],
        radius=24,
        outline=(59, 130, 246, 70),
        width=2
    )

    # Inner container
    draw.rounded_rectangle(
        [(margin + 15, margin + 15), (width - margin - 15, height - margin - 15)],
        radius=18,
        fill=(13, 18, 28, 220),
        outline=(255, 255, 255, 15),
        width=1
    )

    # 2. Generate QR Code
    qr = qrcode.QRCode(
        version=2,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=2,
    )
    # The QR payload that bootstrap / agent recognises
    qr.add_data("AI-SUITE:https://github.com/vietndj/AI-Skill")
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="#ffffff", back_color="#0d121c").convert("RGBA")
    qr_size = 360
    qr_img = qr_img.resize((qr_size, qr_size), Image.Resampling.LANCZOS)

    # QR background container on left
    qr_x = 90
    qr_y = (height - qr_size) // 2
    draw.rounded_rectangle(
        [(qr_x - 15, qr_y - 15), (qr_x + qr_size + 15, qr_y + qr_size + 15)],
        radius=16,
        fill=(10, 14, 22, 255),
        outline=(59, 130, 246, 120),
        width=2
    )
    card.paste(qr_img, (qr_x, qr_y), qr_img)

    # 3. Text Info on Right Side
    text_x = qr_x + qr_size + 70

    # Fonts
    font_path_bold = "/Users/vietmac/.gemini/config/skills/analyze-video-02/assets/fonts/SVN-IntegralCF-Bold.ttf"
    font_path_regular = "/Users/vietmac/.gemini/config/skills/analyze-video-02/assets/fonts/SVN-Poppins-Regular.ttf"
    font_path_semibold = "/Users/vietmac/.gemini/config/skills/analyze-video-02/assets/fonts/SVN-Poppins-SemiBold.ttf"

    font_badge = ImageFont.truetype(font_path_semibold, 16) if os.path.exists(font_path_semibold) else ImageFont.load_default()
    font_title = ImageFont.truetype(font_path_bold, 36) if os.path.exists(font_path_bold) else ImageFont.load_default()
    font_sub = ImageFont.truetype(font_path_semibold, 20) if os.path.exists(font_path_semibold) else ImageFont.load_default()
    font_desc = ImageFont.truetype(font_path_regular, 16) if os.path.exists(font_path_regular) else ImageFont.load_default()
    font_foot = ImageFont.truetype(font_path_semibold, 14) if os.path.exists(font_path_semibold) else ImageFont.load_default()

    # Badge: KÍCH HOẠT 1-SHOT
    draw.rounded_rectangle([(text_x, 100), (text_x + 230, 132)], radius=8, fill=(16, 185, 129, 35), outline=(16, 185, 129, 90), width=1)
    draw.text((text_x + 16, 107), "THẺ KÍCH HOẠT KỸ NĂNG", fill=(52, 211, 153, 255), font=font_badge)

    # Title
    draw.text((text_x, 155), "AI SKILLS SUITE", fill=(255, 255, 255, 255), font=font_title)

    # Subtitle
    draw.text((text_x, 215), "Bộ 3 Kỹ Năng Tự Động Hóa Thực Thi", fill=(147, 197, 253, 255), font=font_sub)

    # 3 Checkpoints
    draw.text((text_x, 270), "01.  Bóc kịch bản clip hay & Phân tích Đạo diễn", fill=(203, 213, 225, 255), font=font_desc)
    draw.text((text_x, 305), "02.  Tạo ảnh AI mặc định theo khuôn mặt cá nhân", fill=(203, 213, 225, 255), font=font_desc)
    draw.text((text_x, 340), "03.  Dựng website bán hàng tự động thu tiền 24/7", fill=(203, 213, 225, 255), font=font_desc)

    # Instruction Callout
    draw.rounded_rectangle([(text_x, 395), (text_x + 480, 480)], radius=12, fill=(20, 28, 44, 255), outline=(59, 130, 246, 80), width=1)
    draw.text((text_x + 20, 412), "HƯỚNG DẪN CÀI ĐẶT:", fill=(96, 165, 250, 255), font=font_foot)
    draw.text((text_x + 20, 440), "Kéo thả ảnh thẻ này vào ô chat của Agent AI để tự cài đặt", fill=(241, 245, 249, 255), font=font_desc)

    # Footer note
    draw.text((text_x, 520), "Tự động cập nhật ngầm • Cài 1 lần dùng trọn đời", fill=(100, 116, 139, 255), font=font_foot)

    # Output paths
    os.makedirs("/Users/vietmac/Documents/CODE/ai-fedu-vn/public", exist_ok=True)
    out_path1 = "/Users/vietmac/Documents/CODE/ai-fedu-vn/public/the-kich-hoat-ai.png"
    out_path2 = "/Users/vietmac/Documents/CODE/vietndj.github.io/the-kich-hoat-ai.png"

    card.save(out_path1, "PNG")
    card.save(out_path2, "PNG")
    print(f"✅ Đã tạo ảnh Thẻ Kích Hoạt tại:\n  - {out_path1}\n  - {out_path2}")

if __name__ == "__main__":
    create_card()
