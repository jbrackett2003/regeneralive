#!/usr/bin/env python3
"""Probe remaining unresolved Thorne slugs via PDP guesses."""
import json, subprocess, time, sys, os

GUESSES = {
    "thorne-appecurb": ["craving-and-stress-support", "appecurb"],
    "thorne-bone-protect": ["bone-support", "bone-protect"],
    "thorne-calcium-d-glucarate": ["calcium-d-glucarate"],
    "thorne-olive-leaf": ["olive-leaf-extract", "olive-leaf"],
    "thorne-cats-claw": ["cat-s-claw", "cats-claw", "uncaria-tomentosa"],
    "thorne-dhea-25": ["dhea-25", "dhea"],
    "thorne-hair-skin-nails": ["hair-skin-nails-support", "hair-skin-nails", "skin-health-bundle"],
    "thorne-holy-basil": ["holy-basil-extract", "ocimum-sanctum"],
    "thorne-pregnenolone": ["pregnenolone-50-mg", "pregnenolone"],
    "thorne-beauty-powder": ["beauty-powder", "collagen-plus"],
    "thorne-neuromag": ["neuromag", "magnesium-l-threonate"],
    "thorne-biological-age-test": ["biological-age-test", "thorne-biological-age"],
    "thorne-gut-health-test": ["gut-health-test"],
    "thorne-sleep-test": ["sleep-test"],
    "thorne-stress-test": ["stress-test"],
    "thorne-vitamin-d-test": ["vitamin-d-test"],
}

EVAL_JS = "(function(){const imgs=Array.from(document.querySelectorAll('img')).map(i=>i.src).filter(s=>s.includes('media/product')&&s.endsWith('.png'));return JSON.stringify({title:document.title,first:imgs[0]||'',final:location.href});})()"

OUT = "/tmp/thorne_probed_v3.json"
results = {}
if os.path.exists(OUT):
    try: results = json.load(open(OUT))
    except: pass

def run(args, t):
    try: r = subprocess.run(args, capture_output=True, text=True, timeout=t); return r.stdout.strip()
    except: return None

for db_slug, guesses in GUESSES.items():
    if db_slug in results: print(f"[skip] {db_slug}", file=sys.stderr, flush=True); continue
    matched = False
    for g in guesses:
        url = f"https://www.thorne.com/products/dp/{g}"
        print(f"  {db_slug} -> {g}", file=sys.stderr, flush=True)
        if run(["agent-browser", "open", url], 20) is None: continue
        time.sleep(3)
        out = run(["agent-browser", "eval", EVAL_JS], 15)
        if out is None: continue
        try:
            inner = json.loads(out)
            data = json.loads(inner) if isinstance(inner, str) else inner
        except: continue
        title = data.get("title","")
        first = data.get("first","")
        if title and "Uh oh" not in title and "media/product" in first:
            results[db_slug] = {"thorne_slug": g, "title": title, "url": first}
            json.dump(results, open(OUT,"w"), indent=2)
            print(f"    ✓ {title}", file=sys.stderr, flush=True)
            matched = True
            break
        else:
            print(f"    miss (title={title!r})", file=sys.stderr, flush=True)
    if not matched: print(f"  ✗ {db_slug}", file=sys.stderr, flush=True)

print(f"\nDone: {len(results)}/{len(GUESSES)}", file=sys.stderr, flush=True)