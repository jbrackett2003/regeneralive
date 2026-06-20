#!/usr/bin/env python3
"""Bulk-download product images from a JSON manifest and update the SQLite DB.

Usage:
    python3 scripts/bulk-download-images.py manifest.json

Manifest format (JSON):
    [
      {"slug": "frantoia-sicilian-olive-oil", "url": "https://..."},
      ...
    ]

Saves each image to public/products/<slug>.<ext> and runs:
    UPDATE products SET image_url = '/products/<slug>.<ext>' WHERE slug = ?
"""
import sys, os, json, urllib.request, sqlite3, mimetypes, time

if len(sys.argv) < 2:
    print("Usage: bulk-download-images.py manifest.json")
    sys.exit(1)

manifest_path = sys.argv[1]
with open(manifest_path) as f:
    manifest = json.load(f)

os.makedirs("public/products", exist_ok=True)

conn = sqlite3.connect("data-store/regeneralive.db")
cur = conn.cursor()

ok = 0
fail = 0
updates = []

for entry in manifest:
    slug = entry["slug"]
    url = entry["url"]
    ext = ".jpg"
    base = url.split("?")[0].lower()
    for e in (".png", ".webp", ".jpeg", ".gif"):
        if base.endswith(e):
            ext = e
            break
    dest = f"public/products/{slug}{ext}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=45) as resp:
            data = resp.read()
        if len(data) < 1000:
            raise ValueError(f"Image too small ({len(data)} bytes)")
        with open(dest, "wb") as f:
            f.write(data)
        local_path = f"/products/{slug}{ext}"
        cur.execute("UPDATE products SET image_url = ? WHERE slug = ?", (local_path, slug))
        rows = cur.rowcount
        size_kb = len(data) // 1024
        if rows == 0:
            print(f"WARN  {slug:50s} downloaded ({size_kb}KB) but slug not found in DB")
        else:
            print(f"OK    {slug:50s} -> {local_path} ({size_kb}KB)")
            updates.append((slug, local_path))
        ok += 1
    except Exception as e:
        print(f"FAIL  {slug:50s} {e}")
        fail += 1
    time.sleep(0.05)

conn.commit()
conn.close()

print()
print(f"Summary: {ok} downloaded, {fail} failed")
print(f"Manifest entries: {len(manifest)}")

# Write a sidecar JSON of successful (slug, local_path) pairs for migration generation
sidecar = manifest_path.replace(".json", "_results.json")
with open(sidecar, "w") as f:
    json.dump(updates, f, indent=2)
print(f"Wrote results to {sidecar}")