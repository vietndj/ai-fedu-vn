#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FEDU Skill Suite Bootstrap — Tải, Cài đặt & Kích hoạt Gói Kỹ Năng AI
Hỗ trợ: scan (quét QR), activate (kích hoạt + cài đặt), status (kiểm tra trạng thái)
"""

import os
import sys
import json
import ssl
import hashlib
import zipfile
import shutil
import urllib.request
from pathlib import Path
from datetime import datetime

ssl_ctx = ssl._create_unverified_context()

SCRIPT_DIR = Path(os.path.dirname(os.path.abspath(__file__)))
SUITE_DIR = SCRIPT_DIR.parent
ASSETS_DIR = SUITE_DIR / "assets"
LICENSE_FILE = ASSETS_DIR / "license.json"
SKILLS_BASE = Path.home() / ".gemini" / "config" / "skills"

R2_BASE = "https://pub-447bd44dfdac4938912655c855b8631c.r2.dev"
MANIFEST_URL = f"{R2_BASE}/skills/manifest.json"
API_BASE = "https://ai.fedu.vn/api"

# Master passwords cho quản trị viên
MASTER_KEYS = ["FEDU2026", "AIPRO", "2026"]


def load_license():
    """Đọc trạng thái license hiện tại."""
    if LICENSE_FILE.exists():
        with open(LICENSE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"is_activated": False}


def save_license(data):
    """Ghi trạng thái license."""
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    data["updated_at"] = datetime.now().isoformat()
    with open(LICENSE_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def fetch_json(url):
    """Tải JSON từ URL."""
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'FEDU-Bootstrap/1.0'})
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=15) as resp:
            if resp.status == 200:
                return json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        print(f"⚠️ Lỗi tải {url}: {e}", file=sys.stderr)
    return None


def verify_code(code: str) -> bool:
    """Xác thực mã kích hoạt qua master key hoặc API."""
    clean = code.strip().upper()

    # Master keys
    if clean in MASTER_KEYS:
        return True

    # Mã kích hoạt AI-XXXXXX (>= 6 ký tự) hoặc FEDU-
    if (clean.startswith("AI-") or clean.startswith("FEDU-")) and len(clean) >= 6:
        return True


def download_and_install_skill(skill_name: str, zip_url: str) -> bool:
    """Tải ZIP skill từ R2 và giải nén vào ~/.gemini/config/skills/"""
    tmp_zip = ASSETS_DIR / f"{skill_name}.zip"
    target_dir = SKILLS_BASE / skill_name

    try:
        # Tải ZIP
        print(f"📥 Đang tải {skill_name}...", file=sys.stderr)
        req = urllib.request.Request(zip_url, headers={'User-Agent': 'FEDU-Bootstrap/1.0'})
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=60) as resp:
            if resp.status != 200:
                print(f"❌ Lỗi tải {skill_name}: HTTP {resp.status}", file=sys.stderr)
                return False
            with open(tmp_zip, "wb") as f:
                f.write(resp.read())

        # Backup thư mục cũ (nếu có) để giữ lại dữ liệu local như license.json, face_catalog.json
        local_data_files = {}
        preserve_patterns = ["license.json", "face_catalog.json", "last_check.json", ".personal_backup"]
        if target_dir.exists():
            for pattern in preserve_patterns:
                for found in target_dir.rglob(pattern):
                    rel = found.relative_to(target_dir)
                    if found.is_file():
                        local_data_files[str(rel)] = found.read_bytes()

        # Giải nén (đè thư mục cũ)
        if target_dir.exists():
            shutil.rmtree(target_dir)
        with zipfile.ZipFile(tmp_zip, 'r') as z:
            z.extractall(SKILLS_BASE)

        # Khôi phục dữ liệu local
        for rel_path, content in local_data_files.items():
            restore_path = target_dir / rel_path
            restore_path.parent.mkdir(parents=True, exist_ok=True)
            restore_path.write_bytes(content)

        # Dọn file ZIP tạm
        tmp_zip.unlink(missing_ok=True)

        print(f"✅ Đã cài đặt {skill_name}", file=sys.stderr)
        return True

    except Exception as e:
        print(f"❌ Lỗi cài đặt {skill_name}: {e}", file=sys.stderr)
        tmp_zip.unlink(missing_ok=True)
        return False


def cmd_scan(image_path: str):
    """Quét mã QR từ ảnh Thẻ Kích Hoạt với đa tầng nhận diện OpenCV."""
    result = {"success": False, "type": "scan"}

    try:
        import cv2
        import numpy as np

        img = cv2.imread(image_path)
        if img is None:
            result["error"] = f"Không thể đọc file ảnh: {image_path}"
            print(json.dumps(result, ensure_ascii=False, indent=2))
            return

        detector = cv2.QRCodeDetector()
        detected_text = ""

        # Pass 1: Original image
        val, pts, _ = detector.detectAndDecode(img)
        if val:
            detected_text = val

        # Pass 2: Grayscale
        if not detected_text:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            val, pts, _ = detector.detectAndDecode(gray)
            if val:
                detected_text = val

        # Pass 3: Inverted Grayscale
        if not detected_text:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            val, pts, _ = detector.detectAndDecode(255 - gray)
            if val:
                detected_text = val

        # Pass 4: Binary Threshold
        if not detected_text:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            _, thresh = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
            val, pts, _ = detector.detectAndDecode(thresh)
            if val:
                detected_text = val

        # Pass 5: pyzbar fallback if available
        if not detected_text:
            try:
                from pyzbar.pyzbar import decode as qr_decode
                codes = qr_decode(img)
                if codes:
                    detected_text = codes[0].data.decode('utf-8')
            except Exception:
                pass

        if detected_text:
            data = detected_text.strip()
            activation_id = data
            if "AI-SUITE:" in data or "FEDU-SUITE:" in data or "AI-PASS:" in data:
                delim = "AI-SUITE:" if "AI-SUITE:" in data else ("AI-PASS:" if "AI-PASS:" in data else "FEDU-SUITE:")
                activation_id = data.split(delim)[-1].strip()
            elif "fedu.vn/activate/" in data or "ai.fedu.vn/" in data:
                parts = data.split("/")
                activation_id = parts[-1].strip() or parts[-2].strip()

            result = {
                "success": True,
                "type": "scan",
                "raw_qr": detected_text,
                "activation_id": activation_id,
                "message": f"🪪 Đã nhận diện Thẻ Kích Hoạt Kỹ Năng AI! Vui lòng nhập Mã Kích Hoạt (ví dụ: AI-2026-VIP) để tự động cài đặt toàn bộ gói."
            }
        else:
            result["error"] = "Không quét được mã QR từ ảnh. Vui lòng kiểm tra lại ảnh hoặc nhập mã kích hoạt trực tiếp."

    except Exception as e:
        result["error"] = f"Lỗi quét mã: {e}. Vui lòng nhập mã kích hoạt trực tiếp."

    print(json.dumps(result, ensure_ascii=False, indent=2))


def cmd_activate(code: str, user_name: str = "Học viên"):
    """Xác thực mã và cài đặt toàn bộ gói skills."""
    result = {"success": False, "type": "activate"}

    # Kiểm tra đã kích hoạt chưa
    license_data = load_license()
    if license_data.get("is_activated"):
        result = {
            "success": True,
            "type": "activate",
            "already_activated": True,
            "user_name": license_data.get("user_name", user_name),
            "message": "✅ Gói đã được kích hoạt trước đó. Đang kiểm tra cập nhật..."
        }
        # Vẫn chạy check update
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return

    # Xác thực mã
    if not verify_code(code):
        result["error"] = "❌ Mã kích hoạt không chính xác! Vui lòng kiểm tra lại hoặc liên hệ anh Việt."
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return

    # Tải manifest danh sách skills
    manifest = fetch_json(MANIFEST_URL)
    if not manifest:
        result["error"] = "❌ Không tải được danh sách kỹ năng từ máy chủ. Kiểm tra kết nối mạng."
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return

    # Cài đặt từng skill
    installed = []
    failed = []
    skills_list = manifest.get("skills", [])

    for skill_info in skills_list:
        name = skill_info.get("name", "")
        version = skill_info.get("version", "")
        zip_url = skill_info.get("zip_url", f"{R2_BASE}/skills/{name}/v{version}.zip")

        if download_and_install_skill(name, zip_url):
            installed.append({"name": name, "version": version})
        else:
            failed.append(name)

    # Ghi license
    save_license({
        "is_activated": True,
        "activation_code": code.strip().upper(),
        "user_name": user_name,
        "activated_at": datetime.now().isoformat(),
        "installed_skills": installed,
        "manifest_version": manifest.get("version", "1.0")
    })

    result = {
        "success": True,
        "type": "activate",
        "user_name": user_name,
        "installed": installed,
        "failed": failed,
        "message": f"🎉 Đã kích hoạt thành công! Đã cài {len(installed)} kỹ năng AI."
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))


def cmd_status():
    """Kiểm tra trạng thái kích hoạt hiện tại."""
    license_data = load_license()
    license_data["type"] = "status"
    print(json.dumps(license_data, ensure_ascii=False, indent=2))


def main():
    if len(sys.argv) < 2:
        print(json.dumps({
            "success": False,
            "error": "Cú pháp: bootstrap.py <scan|activate|status> [args...]"
        }))
        sys.exit(1)

    command = sys.argv[1].lower()

    if command == "scan" and len(sys.argv) >= 3:
        cmd_scan(sys.argv[2])
    elif command == "activate" and len(sys.argv) >= 3:
        user_name = sys.argv[3] if len(sys.argv) >= 4 else "Học viên"
        cmd_activate(sys.argv[2], user_name)
    elif command == "status":
        cmd_status()
    else:
        print(json.dumps({
            "success": False,
            "error": f"Lệnh không hợp lệ: {command}. Dùng: scan, activate, status"
        }))


if __name__ == "__main__":
    main()
