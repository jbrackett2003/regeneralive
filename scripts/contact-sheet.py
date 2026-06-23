#!/usr/bin/env python3
"""Build labeled contact sheet(s) of every public/products/* image so we can
visually scan for back-of-package shots."""
import os, math
from PIL import Image, ImageDraw, ImageFont

SRC = "/workspace/regeneralive/public/products"
OUT_DIR = "/workspace/regeneralive/scripts/contact"
os.makedirs(OUT_DIR, exist_ok=True)

CELL_W, CELL_H = 320, 360
THUMB = 300
COLS = 5
PAD = 10

files = sorted(os.listdir(SRC))
print(f"Files: {len(files)}")

try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 12)
except Exception:
    font = ImageFont.load_default()

PER_SHEET = 30
sheets = math.ceil(len(files) / PER_SHEET)
for s in range(sheets):
    chunk = files[s * PER_SHEET : (s + 1) * PER_SHEET]
    rows = math.ceil(len(chunk) / COLS)
    sheet = Image.new("RGB", (COLS * CELL_W + PAD, rows * CELL_H + PAD), "white")
    draw = ImageDraw.Draw(sheet)
    for i, fname in enumerate(chunk):
        try:
            img = Image.open(os.path.join(SRC, fname)).convert("RGB")
        except Exception as e:
            print("skip", fname, e)
            continue
        img.thumbnail((THUMB, THUMB))
        col = i % COLS
        row = i // COLS
        x = col * CELL_W + PAD + (THUMB - img.width) // 2
        y = row * CELL_H + PAD
        sheet.paste(img, (x, y))
        label = fname.rsplit(".", 1)[0]
        draw.text(
            (col * CELL_W + PAD + 5, row * CELL_H + PAD + THUMB + 5),
            label,
            fill="black",
            font=font,
        )
    out = os.path.join(OUT_DIR, f"sheet_{s + 1}.jpg")
    sheet.save(out, quality=85)
    print("wrote", out, sheet.size)