#!/usr/bin/env bash
# For each unmatched DB slug, try multiple Thorne PDP URL slug guesses
# and capture the first product image found.
set -e
OUT=/tmp/thorne_probed.json
echo "{}" > "$OUT"

probe_one() {
  local db_slug="$1"
  shift
  for guess in "$@"; do
    local url="https://www.thorne.com/products/dp/$guess"
    agent-browser open "$url" >/dev/null 2>&1
    sleep 4
    local result=$(agent-browser eval "(function(){const imgs=Array.from(document.querySelectorAll('img')).map(i=>i.src).filter(s=>s.includes('media/product')&&s.endsWith('.png'));return JSON.stringify({title:document.title,first:imgs[0]||'',final:location.href});})()" 2>&1 | tail -1)
    local clean=$(echo "$result" | python3 -c 'import json,sys; print(json.loads(sys.stdin.read()))')
    local title=$(echo "$clean" | python3 -c 'import json,sys; print(json.loads(sys.stdin.read())["title"])')
    local first=$(echo "$clean" | python3 -c 'import json,sys; print(json.loads(sys.stdin.read())["first"])')
    if [[ "$title" != "" && "$title" != *"Uh oh"* && "$first" == *"media/product"* ]]; then
      echo "  ✓ $db_slug -> $guess -> $first" >&2
      python3 -c "
import json
d = json.load(open('$OUT'))
d['$db_slug'] = {'thorne_slug': '$guess', 'title': '''$title''', 'url': '$first'}
json.dump(d, open('$OUT','w'), indent=2)
"
      return 0
    fi
  done
  echo "  ✗ $db_slug — none of guesses matched: $*" >&2
  return 1
}

# Slug guesses (multiple patterns per product)
probe_one "thorne-amino-complex-tropical" "amino-complex-tropical" "amino-complex-berry"
probe_one "thorne-beauty-powder" "beauty-powder" "collagen-plus-strawberry"
probe_one "thorne-beta-performance" "beta-performance" "beta-alanine-sr"
probe_one "thorne-biological-age-test" "biological-age-test" "biological-age" "thorne-biological-age"
probe_one "thorne-cats-claw" "cat-s-claw" "cats-claw"
probe_one "thorne-dhea-25" "dhea-25-mg" "dhea-25"
probe_one "thorne-gut-health-test" "gut-health-test" "gut-health"
probe_one "thorne-hair-skin-nails" "hair-skin-nails-support" "hair-skin-nails"
probe_one "thorne-holy-basil" "holy-basil-extract" "holy-basil"
probe_one "thorne-krill-oil" "super-epa-pro" "krill-oil-plus" "krill-oil"
probe_one "thorne-medibolic" "medibolic"
probe_one "thorne-neuromag" "magnesium-l-threonate" "neuromag"
probe_one "thorne-pancreatic-enzymes" "advanced-digestive-enzymes" "dipan-9" "b-p-p" "pancreatic-enzymes"
probe_one "thorne-plant-protein-greens" "plant-protein-vanilla" "plant-protein-greens"
probe_one "thorne-pregnenolone" "pregnenolone-50-mg" "pregnenolone"
probe_one "thorne-prenatal-postnatal-dha" "prenatal-dha" "super-epa-pro" "omega-superb" "prenatal-postnatal-dha"
probe_one "thorne-ps-100" "phosphatidyl-serine" "ps-100" "phosphatidylserine"
probe_one "thorne-r-lipoic-acid" "r-lipoic-acid" "alpha-lipoic-acid"
probe_one "thorne-sleep-test" "sleep-test"
probe_one "thorne-stress-test" "stress-test"
probe_one "thorne-taurine" "taurine"
probe_one "thorne-ubiquinol-150" "q-best-100" "ubiquinol" "ubiquinol-q10-100mg"
probe_one "thorne-vitamin-a" "vitamin-a-25-000-iu" "vitamin-a"
probe_one "thorne-vitamin-d-test" "vitamin-d-test"
probe_one "thorne-vitamin-e-tocotrienols" "ultimate-e" "tocotrienols" "vitamin-e-tocotrienols"
probe_one "thorne-whey-protein-plus" "whey-protein-isolate-vanilla" "whey-protein-plus"

echo "Done. $OUT" >&2