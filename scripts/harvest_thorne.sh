#!/usr/bin/env bash
# Harvest all (thorne-slug, image_url) pairs from thorne.com/products listing
set -e
OUT=/tmp/thorne_harvest.jsonl
> "$OUT"

for PAGE in $(seq 1 25); do
  echo "Page $PAGE..." >&2
  agent-browser open "https://www.thorne.com/products?page=$PAGE" >/dev/null 2>&1
  sleep 5
  RESULT=$(agent-browser eval "JSON.stringify(Array.from(document.querySelectorAll('a')).filter(a=>a.href.includes('/products/dp/')).map(a=>{const img=a.querySelector('img')||a.parentElement?.querySelector('img')||a.closest('article,div')?.querySelector('img');return {href:a.href, img:img?.src||''}}).filter(x=>x.img.includes('media/product')))" 2>&1 | tail -1)
  CLEAN=$(echo "$RESULT" | python3 -c 'import json,sys; print(json.loads(sys.stdin.read()))')
  COUNT=$(echo "$CLEAN" | python3 -c 'import json,sys; print(len(json.loads(sys.stdin.read())))')
  echo "  got $COUNT items" >&2
  echo "$CLEAN" >> "$OUT"
  if [ "$COUNT" -eq "0" ]; then
    echo "Empty page, stopping." >&2
    break
  fi
done

python3 -c "
import json, sys
seen = {}
with open('$OUT') as f:
    for line in f:
        line = line.strip()
        if not line: continue
        for item in json.loads(line):
            slug = item['href'].rsplit('/dp/', 1)[1]
            seen[slug] = item['img']
print('TOTAL UNIQUE SLUGS:', len(seen), file=sys.stderr)
with open('/tmp/thorne_master.json', 'w') as out:
    json.dump(seen, out, indent=2)
"
echo "Done. Master at /tmp/thorne_master.json" >&2