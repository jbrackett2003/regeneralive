#!/usr/bin/env python3
"""Probe each (db_slug, thorne_url_slug) pair from manifest_v2 via PDP visit.
Get the canonical first hero image URL — much more reliable than listing page."""
import json, subprocess, time, sys, os

MANIFEST_IN = "/workspace/regeneralive/scripts/thorne-batch/manifest_v2.json"
OUT = "/tmp/thorne_pdp_canonical.json"

manifest = json.load(open(MANIFEST_IN))

# Group by thorne_slug to avoid duplicate fetches (many DB slugs share a thorne_slug)
unique_slugs = {}  # thorne_slug -> [db_slugs]
for e in manifest:
    unique_slugs.setdefault(e["thorne_slug"], []).append(e["slug"])

EVAL_JS = "(function(){const imgs=Array.from(document.querySelectorAll('img')).map(i=>i.src).filter(s=>s.includes('media/product')&&s.endsWith('.png'));return JSON.stringify({title:document.title,first:imgs[0]||'',count:imgs.length});})()"

results = {}
if os.path.exists(OUT):
    try: results = json.load(open(OUT))
    except: pass

def run(args, t):
    try: r = subprocess.run(args, capture_output=True, text=True, timeout=t); return r.stdout.strip()
    except: return None

for thorne_slug, db_slugs in unique_slugs.items():
    if thorne_slug in results:
        print(f"[skip] {thorne_slug}", file=sys.stderr, flush=True)
        continue
    url = f"https://www.thorne.com/products/dp/{thorne_slug}"
    print(f"  Probing {thorne_slug} (db: {db_slugs}) ...", file=sys.stderr, flush=True)
    if run(["agent-browser", "open", url], 15) is None:
        print("    open TIMEOUT", file=sys.stderr, flush=True)
        continue
    time.sleep(3)
    out = run(["agent-browser", "eval", EVAL_JS], 12)
    if out is None:
        print("    eval TIMEOUT", file=sys.stderr, flush=True)
        continue
    try:
        inner = json.loads(out)
        data = json.loads(inner) if isinstance(inner, str) else inner
    except:
        continue
    title = data.get("title", "")
    first = data.get("first", "")
    if title and "Uh oh" not in title and "media/product" in first:
        results[thorne_slug] = {"title": title, "url": first, "db_slugs": db_slugs}
        json.dump(results, open(OUT, "w"), indent=2)
        print(f"    ✓ {title} -> {first.split('/')[-1][:30]}", file=sys.stderr, flush=True)
    else:
        print(f"    ✗ title={title!r}", file=sys.stderr, flush=True)

print(f"\nDone: {len(results)} / {len(unique_slugs)}", file=sys.stderr, flush=True)