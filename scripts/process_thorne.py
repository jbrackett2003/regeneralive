import json
import re

# Existing slugs to avoid duplicates
existing_slugs = {
    "thorne-creatine", "thorne-omega-3-w-coq10", "thorne-magnesium-bisglycinate",
    "thorne-vitamin-d-k2", "thorne-multi-vitamin-elite", "thorne-collagen-plus",
    "thorne-zinc-picolinate", "thorne-melatonin-3mg",
    "thorne-curcumin-phytosome", "thorne-berberine-500", "thorne-quercetin-phytosome",
    "thorne-q-best-100", "thorne-whey-protein-isolate-vanilla", "thorne-daily-greens-plus",
    "thorne-resveracel", "thorne-glutathione-sr", "thorne-niacel-400",
    "thorne-stress-b-complex", "thorne-methylcobalamin",
    "thorne-creatine-100g", "thorne-magnesium-glycinate", "thorne-vitamin-d3-k2",
    "thorne-basic-prenatal", "thorne-zinc-picolinate-30mg",
}

all_products = []
seen_hrefs = set()
seen_img = set()
for page in range(1, 6):
    try:
        with open(f'/tmp/thorne-page{page}.json') as f:
            raw = f.read()
        data = json.loads(json.loads(raw))
    except Exception as e:
        print(f'page {page} fail: {e}')
        continue
    for d in data:
        if d['href'] in seen_hrefs:
            continue
        if d['img'] in seen_img:
            continue
        seen_hrefs.add(d['href'])
        seen_img.add(d['img'])
        slug = d['href'].rstrip('/').split('/')[-1]
        text = d['text']
        m = re.search(r'\$(\d+(?:\.\d+)?)', text)
        price = float(m.group(1)) if m else 0
        after_price = re.sub(r'^[^$]*\$\d+(\.\d+)?\s*', '', text)
        tagline = re.split(r'\*', after_price, maxsplit=1)[0].strip()
        tagline = tagline[:200]
        rest = re.split(r'\*', after_price, maxsplit=1)
        description_extra = rest[1].strip() if len(rest) > 1 else ''
        all_products.append({
            'slug': slug,
            'href': d['href'],
            'img': d['img'],
            'price': price,
            'tagline': tagline,
            'description_extra': description_extra,
            'raw_text': text,
        })

new_products = []
for p in all_products:
    expected_slug = f"thorne-{p['slug']}"
    if expected_slug in existing_slugs:
        continue
    if p['price'] == 0:
        continue
    new_products.append(p)

print(f'Total scraped: {len(all_products)}, new (not already in DB): {len(new_products)}')
with open('/tmp/thorne-all.json', 'w') as f:
    json.dump(new_products, f, indent=2)

for p in new_products[:80]:
    print(f"  {p['slug']:55s} ${p['price']:6.0f}  {p['tagline'][:70]}")