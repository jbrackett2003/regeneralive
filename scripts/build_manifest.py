#!/usr/bin/env python3
"""Build the consolidated download manifest combining listing matches + probed matches."""
import json
import sqlite3
import re

DB = "/workspace/regeneralive/data-store/regeneralive.db"

# Load harvested data
master = json.load(open("/tmp/thorne_master.json"))
probed = json.load(open("/tmp/thorne_probed.json"))

# DB slug -> Thorne URL slug mapping (final, consolidated)
MAPPING = {
    # sf755 group (26 — placeholder)
    "thorne-5-htp": "5-hydroxytryptophan",
    "thorne-appecurb": "craving-and-stress-support",
    "thorne-betaine-hcl-pepsin": "betaine-hcl-pepsin-225-s",
    "thorne-bone-protect": "bone-support",  # may not match — fallback
    "thorne-boswellia-phytosome": "boswellia-phytosome",
    "thorne-calcium-d-glucarate": "calcium-d-glucarate",  # not in master?
    "thorne-memoractiv": "memoractiv-trade",
    "thorne-rhodiola": "rhodiola",
    "thorne-omega-plus": "omega-superb-ndash-lemon-berry",  # rebrand
    "thorne-olive-leaf": "olive-leaf-extract",
    "thorne-nad-synergy": "niacel-400",
    "thorne-basic-prenatal": "basic-prenatal",
    "thorne-bio-quench": "bio-gest-reg-60-s-1",
    "thorne-cats-claw": None,  # discontinued
    "thorne-dhea-25": None,  # not on listing
    "thorne-hair-skin-nails": None,  # discontinued
    "thorne-holy-basil": None,
    "thorne-krill-oil": "super-epa-pro-60-s-1",  # closest available
    "thorne-pancreatic-enzymes": "dipan-9-reg-60-s-2",
    "thorne-polyresveratrol-sr": "polyresveratrol-sr-reg",
    "thorne-pregnenolone": None,
    "thorne-ps-100": None,  # phosphatidyl-choline different
    "thorne-r-lipoic-acid": "r-lipoic-acid",  # via probe
    "thorne-sacro-b": "sacro-b-trade",
    "thorne-taurine": "taurine",
    "thorne-ubiquinol-150": "q-best-100",  # CoQ10 in CoQ10 family
    # m204p group (13)
    "thorne-amino-complex-tropical": None,  # only berry/lemon — leave for image_search
    "thorne-beauty-powder": None,
    "thorne-collagen-plus": "collagen-plus",
    "thorne-enteromend": "enteromend",
    "thorne-magnesium-bisglycinate-powder": "magnesium-bisglycinate-m204p",
    "thorne-magnesium-citramate-powder": "magnesium-citramate",
    "thorne-medibolic": "metabolic-health",
    "thorne-mediclear-sgs": "mediclear-sgs-trade",
    "thorne-plant-protein-greens": None,
    "thorne-pre-workout-elite": "advanced-pre-workout-rainbow-sherbet-flavor",
    "thorne-radiant-skin-pack": "radiant-skin-complex",
    "thorne-recovery-pro": "recoverypro-sp114",
    "thorne-whey-protein-plus": None,
    # sf788 group (8)
    "thorne-beta-performance": "beta-alanine-sr",
    "thorne-calcium-magnesium-citrate": "calcium-magnesium-malate",
    "thorne-melaton-3": "melaton-3-trade",
    "thorne-neuromag": None,  # MagThreonate brand, may not exist
    "thorne-prenatal-postnatal-dha": "prenatal-dha",
    "thorne-vitamin-a": "vitamin-a-25-000-iu",  # not on listing — use probed
    "thorne-vitamin-e-tocotrienols": "ultimate-e-reg",
    "thorne-vitamin-k2": "vitamin-k2-liquid",
    # sf818 group (test kits — Thorne tests use a different URL pattern, skip)
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

# Direct probed (already in /tmp/thorne_probed.json, may have URLs we don't have in master)
manifest = []
unresolved = []
for db_slug, thorne_slug in MAPPING.items():
    if thorne_slug is None:
        unresolved.append(db_slug)
        continue
    url = master.get(thorne_slug)
    if url is None:
        # try probed
        for k, v in probed.items():
            if v["thorne_slug"] == thorne_slug:
                url = v["url"]
                break
    if url is None:
        # try probed by db_slug
        if db_slug in probed:
            url = probed[db_slug]["url"]
    if url:
        manifest.append({"slug": db_slug, "url": url, "thorne_slug": thorne_slug})
    else:
        unresolved.append(db_slug)

# Override with probed data where it differs
for db_slug, info in probed.items():
    found = False
    for entry in manifest:
        if entry["slug"] == db_slug:
            # use probed URL (more reliable since direct from PDP)
            entry["url"] = info["url"]
            entry["thorne_slug"] = info["thorne_slug"]
            found = True
            break
    if not found and db_slug not in [e["slug"] for e in manifest]:
        manifest.append({"slug": db_slug, "url": info["url"], "thorne_slug": info["thorne_slug"]})

print(f"Manifest entries: {len(manifest)}")
for m in manifest:
    print(f"  {m['slug']:50s} -> {m['thorne_slug']:40s}")
print(f"\nUnresolved ({len(unresolved)}):")
for s in unresolved:
    print(f"  {s}")

with open("/workspace/regeneralive/scripts/thorne-batch/manifest_v2.json", "w") as f:
    json.dump(manifest, f, indent=2)

with open("/tmp/thorne_unresolved.json", "w") as f:
    json.dump(unresolved, f, indent=2)