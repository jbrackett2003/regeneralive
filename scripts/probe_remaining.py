#!/usr/bin/env python3
"""Probe remaining unmatched PDPs with Chrome restart between each."""
import json, subprocess, time, sys, os

# (db_slug, [thorne_slug guesses])
TARGETS = [
    ("thorne-memoractiv", ["memoractiv-trade", "memoractiv"]),
    ("thorne-rhodiola", ["rhodiola"]),
    ("thorne-omega-plus", ["omega-superb-ndash-lemon-berry", "omega-3-plus", "omega-plus"]),
    ("thorne-nad-synergy", ["niacel-400", "nad-synergy"]),
    ("thorne-basic-prenatal", ["basic-prenatal"]),
    ("thorne-bio-quench", ["bio-gest-reg-60-s-1", "bio-gest"]),
    ("thorne-sacro-b", ["sacro-b-trade", "sacro-b"]),
    ("thorne-collagen-plus", ["collagen-plus"]),
    ("thorne-enteromend", ["enteromend"]),
    ("thorne-magnesium-bisglycinate-powder", ["magnesium-bisglycinate-m204p", "magnesium-bisglycinate-powder"]),
    ("thorne-magnesium-citramate", ["magnesium-citramate"]),
    ("thorne-magnesium-citramate-powder", ["magnesium-citramate"]),
    ("thorne-mediclear-sgs", ["mediclear-sgs-trade", "mediclear-sgs-vanilla"]),
    ("thorne-pre-workout-elite", ["advanced-pre-workout-rainbow-sherbet-flavor"]),
    ("thorne-radiant-skin-pack", ["radiant-skin-complex"]),
    ("thorne-recovery-pro", ["recoverypro-sp114"]),
    ("thorne-calcium-magnesium-citrate", ["calcium-magnesium-malate"]),
    ("thorne-melaton-3", ["melaton-3-trade"]),
    ("thorne-vitamin-e-tocotrienols", ["ultimate-e-reg"]),
    ("thorne-vitamin-k2", ["vitamin-k2-liquid"]),
    ("thorne-florasport-20b", ["florasport-20b"]),
    ("thorne-cysteplus-reg", ["cysteplus-reg"]),
    ("thorne-nac", ["nac-180"]),
    ("thorne-l-glutamine", ["l-glutamine-powder"]),
    ("thorne-l-glutamine-capsules", ["l-glutamine"]),
    ("thorne-magnesium-glycinate", ["magnesium-glycinate"]),
    ("thorne-women-s-daily-probiotic", ["women-s-daily-probiotic"]),
    ("thorne-womens-daily-probiotic", ["women-s-daily-probiotic"]),
    ("thorne-d-5-000-vitamin-d-capsule", ["d-5-000-vitamin-d-capsule"]),
    ("thorne-vitamin-d-5000", ["d-5-000-vitamin-d-capsule"]),
]

EVAL_JS = "(function(){const imgs=Array.from(document.querySelectorAll('img')).map(i=>i.src).filter(s=>s.includes('media/product')&&s.endsWith('.png'));return JSON.stringify({title:document.title,first:imgs[0]||''});})()"

OUT = "/tmp/thorne_remaining.json"
results = {}
if os.path.exists(OUT):
    try: results = json.load(open(OUT))
    except: pass

def run(args, t):
    try: r = subprocess.run(args, capture_output=True, text=True, timeout=t); return r.stdout.strip()
    except: return None

def restart_browser():
    subprocess.run(["pkill", "-9", "-f", "agent-browser"], capture_output=True)
    subprocess.run(["pkill", "-9", "-f", "chrome"], capture_output=True)
    time.sleep(2)

for i, (db_slug, guesses) in enumerate(TARGETS):
    if db_slug in results:
        print(f"[skip] {db_slug}", file=sys.stderr, flush=True)
        continue
    if i > 0 and i % 5 == 0:
        print("  [restart browser]", file=sys.stderr, flush=True)
        restart_browser()
    matched = False
    for guess in guesses:
        url = f"https://www.thorne.com/products/dp/{guess}"
        print(f"  {db_slug} -> {guess}", file=sys.stderr, flush=True)
        if run(["agent-browser", "open", url], 18) is None:
            print("    open TIMEOUT", file=sys.stderr, flush=True)
            restart_browser()
            continue
        time.sleep(3)
        out = run(["agent-browser", "eval", EVAL_JS], 12)
        if out is None:
            print("    eval TIMEOUT", file=sys.stderr, flush=True)
            restart_browser()
            continue
        try:
            inner = json.loads(out)
            data = json.loads(inner) if isinstance(inner, str) else inner
        except:
            continue
        title = data.get("title", "")
        first = data.get("first", "")
        if title and "Uh oh" not in title and "media/product" in first:
            results[db_slug] = {"thorne_slug": guess, "title": title, "url": first}
            json.dump(results, open(OUT, "w"), indent=2)
            print(f"    ✓ {title[:50]} -> {first.split('/')[-1][:30]}", file=sys.stderr, flush=True)
            matched = True
            break
        else:
            print(f"    miss (title={title[:50]!r})", file=sys.stderr, flush=True)
    if not matched:
        print(f"  ✗ {db_slug}", file=sys.stderr, flush=True)

print(f"\nDone: {len(results)} / {len(TARGETS)}", file=sys.stderr, flush=True)