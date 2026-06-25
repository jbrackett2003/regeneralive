#!/usr/bin/env python3
"""Contact sheet of all Thorne products that just got new images."""
import os, math, json
from PIL import Image, ImageDraw, ImageFont

SRC = "/workspace/regeneralive/public/products"
OUT_DIR = "/workspace/regeneralive/scripts/contact"
os.makedirs(OUT_DIR, exist_ok=True)

manifest = json.load(open("/workspace/regeneralive/scripts/thorne-batch/manifest_final.json"))
slugs = sorted([m["slug"] for m in manifest])
files = []
for s in slugs:
    for ext in ("png", "jpg", "jpeg", "webp"):
        p = os.path.join(SRC, f"{s}.{ext}")
        if os.path.exists(p):
            files.append((s, p))
            break

print(f"Files: {len(files)}")
CELL_W, CELL_H = 280, 320
THUMB = 250
COLS = 6
PAD = 12

try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 11)
except Exception:
    font = ImageFont.load_default()

rows = math.ceil(len(files) / COLS)
sheet = Image.new("RGB", (COLS * CELL_W + PAD, rows * CELL_H + PAD), "white")
draw = ImageDraw.Draw(sheet)
for i, (slug, path) in enumerate(files):
    try:
        img = Image.open(path).convert("RGB")
    except Exception as e:
        print("skip", path, e)
        continue
    img.thumbnail((THUMB, THUMB))
    col = i % COLS
    row = i // COLS
    x = col * CELL_W + PAD + (THUMB - img.width) // 2
    y = row * CELL_H + PAD
    sheet.paste(img, (x, y))
    label = slug.replace("thorne-", "")
    draw.text((col * CELL_W + PAD, y + THUMB + 8), label, fill="black", font=font)

out = os.path.join(OUT_DIR, "thorne_v4.jpg")
sheet.save(out, quality=85)
print(f"Saved {out} ({sheet.size})")