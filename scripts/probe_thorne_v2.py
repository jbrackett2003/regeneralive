#!/usr/bin/env python3
"""Probe Thorne PDPs — flush stderr after each, hard-limit timeouts."""
import json
import subprocess
import time
import sys
import os

GUESSES = {
    "thorne-amino-complex-tropical": ["amino-complex-tropical", "amino-complex-berry"],
    "thorne-beauty-powder": ["beauty-powder", "collagen-plus-strawberry"],
    "thorne-beta-performance": ["beta-performance", "beta-alanine-sr"],
    "thorne-biological-age-test": ["biological-age-test", "biological-age", "thorne-biological-age"],
    "thorne-cats-claw": ["cat-s-claw", "cats-claw"],
    "thorne-dhea-25": ["dhea-25-mg", "dhea-25"],
    "thorne-gut-health-test": ["gut-health-test", "gut-health"],
    "thorne-hair-skin-nails": ["hair-skin-nails-support", "hair-skin-nails"],
    "thorne-holy-basil": ["holy-basil-extract", "holy-basil"],
    "thorne-krill-oil": ["super-epa-pro", "krill-oil-plus", "krill-oil"],
    "thorne-medibolic": ["medibolic"],
    "thorne-neuromag": ["magnesium-l-threonate", "neuromag"],
    "thorne-pancreatic-enzymes": ["advanced-digestive-enzymes", "dipan-9", "b-p-p", "pancreatic-enzymes"],
    "thorne-plant-protein-greens": ["plant-protein-vanilla", "plant-protein-greens"],
    "thorne-pregnenolone": ["pregnenolone-50-mg", "pregnenolone"],
    "thorne-prenatal-postnatal-dha": ["prenatal-dha", "super-epa-pro", "omega-superb", "prenatal-postnatal-dha"],
    "thorne-ps-100": ["phosphatidyl-serine", "ps-100", "phosphatidylserine"],
    "thorne-r-lipoic-acid": ["r-lipoic-acid", "alpha-lipoic-acid"],
    "thorne-sleep-test": ["sleep-test"],
    "thorne-stress-test": ["stress-test"],
    "thorne-taurine": ["taurine"],
    "thorne-ubiquinol-150": ["q-best-100", "ubiquinol", "ubiquinol-q10-100mg"],
    "thorne-vitamin-a": ["vitamin-a-25-000-iu", "vitamin-a"],
    "thorne-vitamin-d-test": ["vitamin-d-test"],
    "thorne-vitamin-e-tocotrienols": ["ultimate-e", "tocotrienols", "vitamin-e-tocotrienols"],
    "thorne-whey-protein-plus": ["whey-protein-isolate-vanilla", "whey-protein-plus"],
}

EVAL_JS = "(function(){const imgs=Array.from(document.querySelectorAll('img')).map(i=>i.src).filter(s=>s.includes('media/product')&&s.endsWith('.png'));return JSON.stringify({title:document.title,first:imgs[0]||'',final:location.href});})()"

OUT_PATH = "/tmp/thorne_probed.json"
results = {}
if os.path.exists(OUT_PATH):
    try:
        results = json.load(open(OUT_PATH))
    except Exception:
        results = {}

def run(args, timeout):
    try:
        r = subprocess.run(args, capture_output=True, text=True, timeout=timeout)
        return r.stdout.strip(), r.stderr.strip()
    except subprocess.TimeoutExpired:
        return None, "TIMEOUT"

for db_slug, guesses in GUESSES.items():
    if db_slug in results:
        print(f"[skip] {db_slug} already done", file=sys.stderr, flush=True)
        continue
    matched = False
    for guess in guesses:
        url = f"https://www.thorne.com/products/dp/{guess}"
        print(f"  trying {db_slug} -> {guess} ...", file=sys.stderr, flush=True)
        out, err = run(["agent-browser", "open", url], timeout=20)
        if out is None:
            print(f"    open TIMEOUT for {guess}", file=sys.stderr, flush=True)
            continue
        time.sleep(3)
        out, err = run(["agent-browser", "eval", EVAL_JS], timeout=15)
        if out is None:
            print(f"    eval TIMEOUT for {guess}", file=sys.stderr, flush=True)
            continue
        # parse
        data = None
        try:
            inner = json.loads(out)
            if isinstance(inner, str):
                data = json.loads(inner)
            else:
                data = inner
        except Exception as e:
            print(f"    parse fail: {e} | out={out[:200]}", file=sys.stderr, flush=True)
            continue
        title = data.get("title", "")
        first = data.get("first", "")
        if title and "Uh oh" not in title and "media/product" in first:
            results[db_slug] = {"thorne_slug": guess, "title": title, "url": first, "final_url": data.get("final","")}
            with open(OUT_PATH, "w") as f:
                json.dump(results, f, indent=2)
            print(f"    ✓ -> {title}", file=sys.stderr, flush=True)
            matched = True
            break
        else:
            print(f"    miss (title={title!r})", file=sys.stderr, flush=True)
    if not matched:
        print(f"  ✗ {db_slug} — no match", file=sys.stderr, flush=True)

print(f"\nFinal probed: {len(results)} / {len(GUESSES)}", file=sys.stderr, flush=True)