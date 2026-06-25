#!/usr/bin/env python3
"""Probe Thorne PDPs with multiple URL slug guesses; capture canonical product image."""
import json
import subprocess
import time
import sys

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

def probe(db_slug, guesses):
    for guess in guesses:
        url = f"https://www.thorne.com/products/dp/{guess}"
        subprocess.run(["agent-browser", "open", url], capture_output=True, timeout=30)
        time.sleep(4)
        result = subprocess.run(
            ["agent-browser", "eval",
             "(function(){const imgs=Array.from(document.querySelectorAll('img')).map(i=>i.src).filter(s=>s.includes('media/product')&&s.endsWith('.png'));return JSON.stringify({title:document.title,first:imgs[0]||'',final:location.href});})()"],
            capture_output=True, text=True, timeout=30
        )
        out = result.stdout.strip()
        # Output is wrapped in JSON-string (agent-browser prints JSON-encoded string of result)
        try:
            inner = json.loads(out)  # outer JSON string
            data = json.loads(inner)  # inner object
        except Exception:
            print(f"    parse fail for {guess}: {out[:200]}", file=sys.stderr)
            continue
        if data.get("title") and "Uh oh" not in data["title"] and "media/product" in data.get("first", ""):
            print(f"  ✓ {db_slug:50s} -> {guess:40s} -> {data['title']}", file=sys.stderr)
            return {"thorne_slug": guess, "title": data["title"], "url": data["first"], "final_url": data["final"]}
    print(f"  ✗ {db_slug:50s} — no match in {guesses}", file=sys.stderr)
    return None

results = {}
for slug, guesses in GUESSES.items():
    r = probe(slug, guesses)
    if r:
        results[slug] = r
    # save incrementally
    with open("/tmp/thorne_probed.json", "w") as f:
        json.dump(results, f, indent=2)

print(f"\nTotal probed: {len(results)} / {len(GUESSES)}", file=sys.stderr)