#!/usr/bin/env python3
"""Match DB Thorne slugs to harvested Thorne canonical image URLs (v2 — refined)."""
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

# DB slug -> Thorne URL slug. Verified via search/web.
# When multiple DB slugs map to same Thorne SKU, they're literal duplicates (handled separately).
manual = {
    # sf755 group (Iron-bisglycinate placeholder) — 26 products
    "thorne-5-htp": "5-hydroxytryptophan",
    "thorne-appecurb": "craving-and-stress-support",
    "thorne-betaine-hcl-pepsin": "betaine-hcl-pepsin",
    "thorne-bone-protect": "bone-support",
    "thorne-boswellia-phytosome": "boswellia-phytosome",
    "thorne-calcium-d-glucarate": "calcium-d-glucarate",
    "thorne-memoractiv": "memoractiv",
    "thorne-rhodiola": "rhodiola",
    "thorne-omega-plus": "omega-plus",
    "thorne-olive-leaf": "olive-leaf-extract",
    "thorne-nad-synergy": "niacel-400",
    "thorne-basic-prenatal": "basic-prenatal",
    "thorne-bio-quench": "bio-gest-reg-60-s-1",
    "thorne-cats-claw": None,  # not on listing — needs PDP probe
    "thorne-dhea-25": None,
    "thorne-hair-skin-nails": None,
    "thorne-holy-basil": None,
    "thorne-krill-oil": None,
    "thorne-pancreatic-enzymes": None,
    "thorne-polyresveratrol-sr": "polyresveratrol-sr-reg",
    "thorne-pregnenolone": None,
    "thorne-ps-100": None,
    "thorne-r-lipoic-acid": None,
    "thorne-sacro-b": "sacro-b-trade",
    "thorne-taurine": None,
    "thorne-ubiquinol-150": None,
    # m204p group (powder placeholder) — 13 products
    "thorne-amino-complex-tropical": None,  # only berry/lemon on listing
    "thorne-beauty-powder": None,  # rebrand?
    "thorne-collagen-plus": "collagen-plus",
    "thorne-enteromend": "enteromend",
    "thorne-magnesium-bisglycinate-powder": "magnesium-bisglycinate",
    "thorne-magnesium-citramate-powder": "magnesium-citramate",
    "thorne-medibolic": "medibolic",
    "thorne-mediclear-sgs": "mediclear-sgs-trade",
    "thorne-plant-protein-greens": None,  # closest is plant-protein-vanilla/chocolate
    "thorne-pre-workout-elite": "advanced-pre-workout-rainbow-sherbet-flavor",
    "thorne-radiant-skin-pack": "radiant-skin-complex",
    "thorne-recovery-pro": "recoverypro-sp114",
    "thorne-whey-protein-plus": None,
    # sf788 group (8 products)
    "thorne-beta-performance": None,
    "thorne-calcium-magnesium-citrate": "calcium-magnesium-malate",
    "thorne-melaton-3": "melaton-3-trade",
    "thorne-neuromag": None,
    "thorne-prenatal-postnatal-dha": None,
    "thorne-vitamin-a": None,
    "thorne-vitamin-e-tocotrienols": None,
    "thorne-vitamin-k2": "vitamin-k2-liquid",
    # sf818 group (test kits) — 6 products
    "thorne-biological-age-test": None,
    "thorne-florasport-20b": "florasport-20b",
    "thorne-gut-health-test": None,
    "thorne-sleep-test": None,
    "thorne-stress-test": None,
    "thorne-vitamin-d-test": None,
    # 2-pair groups
    "thorne-cysteplus-reg": "cysteplus-reg",
    "thorne-nac": "nac-180",
    "thorne-l-glutamine-capsules": "l-glutamine",
    "thorne-l-glutamine": "l-glutamine-powder",
    "thorne-magnesium-citramate": "magnesium-citramate",
    "thorne-magnesium-glycinate": "magnesium-glycinate",
    "thorne-women-s-daily-probiotic": "women-s-daily-probiotic",
    "thorne-womens-daily-probiotic": "women-s-daily-probiotic",
    "thorne-d-5-000-vitamin-d-capsule": "d-5-000-vitamin-d-capsule",
    "thorne-vitamin-d-5000": "d-5-000-vitamin-d-capsule",
}

results = []
needs_probe = []
for slug in sorted(duplicate_slugs):
    candidate = manual.get(slug, "_NOT_LISTED_")
    if candidate is None or candidate == "_NOT_LISTED_":
        needs_probe.append(slug)
    elif candidate in master:
        results.append({"slug": slug, "thorne_slug": candidate, "url": master[candidate]})
    else:
        # candidate provided but not in master
        needs_probe.append(slug)

print(f"MATCHED to listing: {len(results)}")
for r in results:
    print(f"  {r['slug']:50s} -> {r['thorne_slug']:40s}")

print(f"\nNEEDS PDP PROBE ({len(needs_probe)}):")
for s in needs_probe:
    print(f"  {s}")

with open("/tmp/thorne_matched.json", "w") as f:
    json.dump(results, f, indent=2)

with open("/tmp/thorne_probe.json", "w") as f:
    json.dump(needs_probe, f, indent=2)