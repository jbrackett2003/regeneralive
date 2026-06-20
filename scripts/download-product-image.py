#!/usr/bin/env python3
"""Download a product image from a URL to public/products/<slug>.<ext> and update the DB.
Usage: python3 scripts/download-product-image.py <slug> <url>
"""
import sys, os, urllib.request, sqlite3, mimetypes, pathlib

if len(sys.argv) < 3:
    print("Usage: download-product-image.py <slug> <url>")
    sys.exit(1)

slug = sys.argv[1]
url = sys.argv[2]

os.makedirs("public/products", exist_ok=True)

# Determine extension from url
ext = ".jpg"
if ".png" in url.split("?")[0].lower(): ext = ".png"
elif ".webp" in url.split("?")[0].lower(): ext = ".webp"
elif ".jpeg" in url.split("?")[0].lower(): ext = ".jpeg"

dest = f"public/products/{slug}{ext}"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=30) as resp:
    data = resp.read()
    with open(dest, "wb") as f:
        f.write(data)
size_kb = len(data) // 1024

# Update DB
local_path = f"/products/{slug}{ext}"
conn = sqlite3.connect("data-store/regeneralive.db")
cur = conn.cursor()
cur.execute("UPDATE products SET image_url = ? WHERE slug = ?", (local_path, slug))
rows = cur.rowcount
conn.commit()
conn.close()
print(f"OK  {slug:50s} -> {dest} ({size_kb}KB) rows={rows}")
