#!/usr/bin/env python3
"""Match DB Thorne slugs to harvested Thorne canonical image URLs.
Strategy: take 'thorne-' prefix off DB slug, fuzzy-match against thorne.com slugs."""
import json
import sqlite3
from difflib import get_close_matches
import re

DB = "/workspace/regeneralive/data-store/regeneralive.db"
MASTER = "/tmp/thorne_master.json"

with open(MASTER) as f:
    master = json.load(f)

conn = sqlite3.connect(DB)
rows = conn.execute(
    "SELECT slug, name, image_url FROM products WHERE slug LIKE 'thorne-%' AND is_hidden=0"
).fetchall()

# Identify duplicate-affected slugs (sharing same SKU with multiple products)
sku_re = re.compile(r"media/product/([^_]+)")
sku_groups = {}
for slug, name, url in rows:
    m = sku_re.search(url)
    if m:
        sku_groups.setdefault(m.group(1), []).append(slug)
duplicate_slugs = set()
for sku, slugs in sku_groups.items():
    if len(slugs) > 1:
        duplicate_slugs.update(slugs)

print(f"Duplicate-affected DB slugs: {len(duplicate_slugs)}")
print(f"Master Thorne slugs: {len(master)}")

# Build candidate normalizations
def norm(s):
    s = s.lower()
    # common transformations
    s = s.replace("'", "").replace("&", "and")
    s = re.sub(r"-{2,}", "-", s)
    return s

master_norm = {norm(k): k for k in master}
master_keys = list(master_norm.keys())

manual = {
    # DB slug -> Thorne URL slug (verified by hand)
    "thorne-5-htp": "5-hydroxytryptophan",
    "thorne-appecurb": "craving-and-stress-support",
    "thorne-betaine-hcl-pepsin": "betaine-hcl-pepsin",
    "thorne-bone-protect": "bone-support",  # rebrand
    "thorne-boswellia-phytosome": "boswellia-phytosome",
    "thorne-calcium-d-glucarate": "calcium-d-glucarate",
    "thorne-memoractiv": "memoractiv",
    "thorne-rhodiola": "rhodiola",
    "thorne-omega-plus": "omega-plus",
    "thorne-olive-leaf": "olive-leaf-extract",
    "thorne-nad-synergy": "niacel-400",  # NAD Synergy / NiaCel
    "thorne-basic-prenatal": "basic-prenatal",
    "thorne-bio-quench": "bio-gest",  # likely Bio-Gest
    "thorne-cats-claw": "cats-claw",
    "thorne-dhea-25": "dhea-25",
    "thorne-hair-skin-nails": "hair-skin-nails",
    "thorne-holy-basil": "holy-basil",
    "thorne-krill-oil": "krill-oil",
    "thorne-pancreatic-enzymes": "advanced-digestive-enzymes",  # rebrand likely
    "thorne-polyresveratrol-sr": "polyresveratrol-sr",
    "thorne-pregnenolone": "pregnenolone",
    "thorne-ps-100": "phosphatidylserine",
    "thorne-r-lipoic-acid": "alpha-lipoic-acid",
    "thorne-sacro-b": "sacro-b",
    "thorne-taurine": "taurine",
    "thorne-ubiquinol-150": "ubiquinol-q10-100mg",
    "thorne-amino-complex-tropical": "amino-complex-tropical",
    "thorne-beauty-powder": "collagen-plus",
    "thorne-collagen-plus": "collagen-plus",
    "thorne-enteromend": "enteromend",
    "thorne-magnesium-bisglycinate-powder": "magnesium-bisglycinate",
    "thorne-magnesium-citramate-powder": "magnesium-citramate",
    "thorne-medibolic": "medibolic",
    "thorne-mediclear-sgs": "mediclear-sgs",
    "thorne-plant-protein-greens": "plant-protein-greens",
    "thorne-pre-workout-elite": "pre-workout-elite",
    "thorne-radiant-skin-pack": "radiant-skin-pack",
    "thorne-recovery-pro": "recoverypro",
    "thorne-whey-protein-plus": "whey-protein-plus",
    "thorne-beta-performance": "beta-performance",
    "thorne-calcium-magnesium-citrate": "calcium-magnesium-malate",
    "thorne-melaton-3": "melaton-3",
    "thorne-neuromag": "neuromag",
    "thorne-prenatal-postnatal-dha": "prenatal-postnatal-dha",
    "thorne-vitamin-a": "vitamin-a-25-000-iu",
    "thorne-vitamin-e-tocotrienols": "ultimate-e",
    "thorne-vitamin-k2": "vitamin-k2-liquid",
    "thorne-biological-age-test": "thorne-biological-age",
    "thorne-florasport-20b": "florasport-20b",
    "thorne-gut-health-test": "gut-health-test",
    "thorne-sleep-test": "sleep-test",
    "thorne-stress-test": "stress-test",
    "thorne-vitamin-d-test": "vitamin-d-test",
    "thorne-cysteplus-reg": "cysteplus-reg",
    "thorne-nac": "nac",
    "thorne-l-glutamine-capsules": "l-glutamine",
    "thorne-l-glutamine": "l-glutamine-powder",
    "thorne-magnesium-citramate": "magnesium-citramate",
    "thorne-magnesium-glycinate": "magnesium-glycinate",
    "thorne-women-s-daily-probiotic": "womens-daily-probiotic",
    "thorne-womens-daily-probiotic": "womens-daily-probiotic",
    "thorne-d-5-000-vitamin-d-capsule": "d-5-000-vitamin-d-capsule",
    "thorne-vitamin-d-5000": "d-5-000-vitamin-d-capsule",
}

results = []
unmatched = []
for slug in sorted(duplicate_slugs):
    candidate = manual.get(slug)
    if candidate is None:
        # Auto fallback: strip "thorne-" prefix and try
        bare = slug[len("thorne-"):]
        if bare in master:
            candidate = bare
        else:
            close = get_close_matches(bare, master_keys, n=1, cutoff=0.6)
            if close:
                candidate = master_norm[close[0]]
    if candidate and candidate in master:
        results.append({"slug": slug, "thorne_slug": candidate, "url": master[candidate]})
    else:
        unmatched.append((slug, candidate))

print(f"\nMATCHED: {len(results)}")
for r in results:
    print(f"  {r['slug']:50s} -> {r['thorne_slug']:40s}")
print(f"\nUNMATCHED: {len(unmatched)}")
for slug, attempted in unmatched:
    print(f"  {slug:50s} attempted={attempted}")

with open("/tmp/thorne_matched.json", "w") as f:
    json.dump(results, f, indent=2)
print(f"\nWrote /tmp/thorne_matched.json")