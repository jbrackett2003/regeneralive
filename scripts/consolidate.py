#!/usr/bin/env python3
"""Consolidate all probed Thorne PDP results into one final manifest."""
import json
from pathlib import Path

# Load all sources
probed_v1 = json.load(open("/tmp/thorne_probed.json"))            # 13 entries (db_slug keys)
probed_v3 = json.load(open("/tmp/thorne_probed_v3.json"))         # 5 entries (db_slug keys)
canonical_pdp = json.load(open("/tmp/thorne_pdp_canonical.json")) # 8 entries (thorne_slug keys, has db_slugs)
remaining = json.load(open("/tmp/thorne_remaining.json"))         # 29 entries (db_slug keys)

# Build db_slug -> url map
final = {}

for src in (probed_v1, probed_v3, remaining):
    for db_slug, info in src.items():
        if "media/product" in info.get("url", ""):
            final[db_slug] = {
                "thorne_slug": info["thorne_slug"],
                "title": info["title"],
                "url": info["url"],
            }

for thorne_slug, info in canonical_pdp.items():
    for db_slug in info.get("db_slugs", []):
        if db_slug not in final:
            final[db_slug] = {
                "thorne_slug": thorne_slug,
                "title": info["title"],
                "url": info["url"],
            }

print(f"Total verified Thorne PDP mappings: {len(final)}")
for db_slug in sorted(final):
    info = final[db_slug]
    print(f"  {db_slug:50s} -> {info['thorne_slug']:40s} ({info['title'][:40]})")

# Write final manifest for download
manifest = [{"slug": k, "url": v["url"]} for k, v in sorted(final.items())]
out_path = Path("/workspace/regeneralive/scripts/thorne-batch/manifest_final.json")
out_path.parent.mkdir(parents=True, exist_ok=True)
out_path.write_text(json.dumps(manifest, indent=2))
print(f"\nWrote {out_path} ({len(manifest)} entries)")

# also save the full info for reference
Path("/tmp/thorne_final_full.json").write_text(json.dumps(final, indent=2))