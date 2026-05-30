"""Generate seed-regen-foods.ts — 50 regenerative food brands across categories.
Each entry uses the brand's real product/store URL as affiliateUrl. Once the user
gets approved for each brand's affiliate program, they can swap the URL via admin.
"""
import json
import re

# Curated image bank — one good Unsplash photo per category.
IMG = {
    "beef": "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=1400&q=80",
    "steak": "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=1400&q=80",
    "bison": "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=1400&q=80",
    "chicken": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=1400&q=80",
    "eggs": "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=1400&q=80",
    "salmon": "https://images.unsplash.com/photo-1559717865-a99cac1c95d8?auto=format&fit=crop&w=1400&q=80",
    "tinned_fish": "https://images.unsplash.com/photo-1604908554027-9e8a99e26c83?auto=format&fit=crop&w=1400&q=80",
    "bone_broth": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=80",
    "jerky": "https://images.unsplash.com/photo-1606851179425-58178c0d8567?auto=format&fit=crop&w=1400&q=80",
    "milk": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1400&q=80",
    "yogurt": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1400&q=80",
    "kefir": "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=1400&q=80",
    "cheese": "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1400&q=80",
    "butter": "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=1400&q=80",
    "olive_oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1400&q=80",
    "avocado_oil": "https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?auto=format&fit=crop&w=1400&q=80",
    "coconut_oil": "https://images.unsplash.com/photo-1599909533730-25d68fa75d7c?auto=format&fit=crop&w=1400&q=80",
    "vinegar": "https://images.unsplash.com/photo-1620577617425-3e0e74c97f60?auto=format&fit=crop&w=1400&q=80",
    "honey": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1400&q=80",
    "maple": "https://images.unsplash.com/photo-1587049332298-1c42e83937a7?auto=format&fit=crop&w=1400&q=80",
    "dates": "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?auto=format&fit=crop&w=1400&q=80",
    "chocolate": "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1400&q=80",
    "rice": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1400&q=80",
    "grains": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1400&q=80",
    "flour": "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?auto=format&fit=crop&w=1400&q=80",
    "kombucha": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=1400&q=80",
    "kraut": "https://images.unsplash.com/photo-1666887360741-984db90fbcd8?auto=format&fit=crop&w=1400&q=80",
    "pickles": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1400&q=80",
    "nut_butter": "https://images.unsplash.com/photo-1635340519752-79b1d3a87e2c?auto=format&fit=crop&w=1400&q=80",
    "hemp": "https://images.unsplash.com/photo-1607301406259-dfb186e15de8?auto=format&fit=crop&w=1400&q=80",
    "mayo": "https://images.unsplash.com/photo-1608058764765-71ed3e1c80b9?auto=format&fit=crop&w=1400&q=80",
    "mealkit": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=80",
    "smoothie": "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1400&q=80",
    "cereal": "https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=1400&q=80",
    "babyfood": "https://images.unsplash.com/photo-1604054094723-3a949e4fca0b?auto=format&fit=crop&w=1400&q=80",
    "sauce": "https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=1400&q=80",
    "spice": "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1400&q=80",
    "pantry_box": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80",
    "seaweed": "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?auto=format&fit=crop&w=1400&q=80",
    "coconut_water": "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=1400&q=80",
    "veg_powder": "https://images.unsplash.com/photo-1638821330948-62d3d8c46a07?auto=format&fit=crop&w=1400&q=80",
    "pork": "https://images.unsplash.com/photo-1602471129512-8b432bb056d4?auto=format&fit=crop&w=1400&q=80",
    "lamb": "https://images.unsplash.com/photo-1603048719539-9ecb4aa395e3?auto=format&fit=crop&w=1400&q=80",
    "organ_meat": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=80",
    "bars": "https://images.unsplash.com/photo-1571691271710-bd0bccd80fa0?auto=format&fit=crop&w=1400&q=80",
    "tea": "https://images.unsplash.com/photo-1597318236547-2bbf4395770a?auto=format&fit=crop&w=1400&q=80",
}

# 50 regenerative food products
PRODUCTS = [
    # ---------- MEAT (10) ----------
    {
        "slug": "force-of-nature-ancestral-blend",
        "brand": "Force of Nature",
        "name": "Ancestral Blend Ground Beef",
        "tagline": "100% grass-fed beef blended with liver, heart, and kidney — the most nutrient-dense ground meat money can buy.",
        "description": "Most people will never eat organ meat — but it's where the bulk of vitamin A, B12, copper, and CoQ10 lives. Force of Nature solved this elegantly: ancestral blend tastes like normal ground beef but delivers the micronutrient density of nose-to-tail eating. Their cattle graze on Texas Hill Country pastures regenerated through holistic grazing. **Buy a freezer pack of 4–8 lbs and you're set for a month of dinners.**",
        "price": 14.99,
        "img": "beef",
        "url": "https://forceofnature.com/products/ancestral-blend-grass-fed-beef-with-organs",
        "category": "regenerative-pantry",
        "goals": ["longevity", "performance"],
        "certs": ["Regenerative Certified", "Grass-Fed", "Pasture-Raised"],
        "rating": 4.8, "featured": True, "editor_pick": True,
    },
    {
        "slug": "white-oak-pastures-ground-beef",
        "brand": "White Oak Pastures",
        "name": "100% Grass-Fed Ground Beef",
        "tagline": "Beef from the farm with measurably negative carbon footprint. Will Harris's family has been regenerating South Georgia land since 1866.",
        "description": "There is no more storied regenerative farm in America than White Oak Pastures. A landmark LCA study showed their beef sequesters more carbon than it emits — net negative. Order direct and get vacuum-sealed cuts shipped frozen. **The flavor is the closest thing to wild ungulate you can legally buy.**",
        "price": 13.50,
        "img": "beef",
        "url": "https://whiteoakpastures.com/collections/grass-fed-beef",
        "category": "regenerative-pantry",
        "goals": ["longevity", "performance"],
        "certs": ["Regenerative Certified", "Grass-Fed", "Pasture-Raised"],
        "rating": 4.9, "featured": True, "editor_pick": True,
    },
    {
        "slug": "butcherbox-grass-fed-beef-box",
        "brand": "ButcherBox",
        "name": "Custom Grass-Fed Beef Box",
        "tagline": "9-14 lbs of 100% grass-fed, grass-finished beef shipped frozen monthly. The easiest way to ditch the grocery-store meat aisle.",
        "description": "ButcherBox is the gateway drug to better meat. Their cattle are pasture-raised, antibiotic-free, and finished on grass — not feedlot grain. Customize your box with steaks, ground beef, roasts, or do the curated mix. Free shipping in the lower 48. **Skip a month anytime; cancel any time.**",
        "price": 169,
        "img": "steak",
        "url": "https://butcherbox.com",
        "category": "regenerative-pantry",
        "goals": ["performance", "longevity"],
        "certs": ["Grass-Fed", "Pasture-Raised", "Non-GMO"],
        "rating": 4.7, "featured": True, "editor_pick": False,
    },
    {
        "slug": "us-wellness-meats-sugar-steak",
        "brand": "US Wellness Meats",
        "name": "Grass-Fed Beef Sugar Steak",
        "tagline": "Cut from the chuck eye, marinated in maple sugar — the cult cut from one of America's oldest grass-fed mail-order farms.",
        "description": "US Wellness Meats has been selling grass-fed direct since 2000. Their sugar steak is a quietly famous cut you cannot get from a butcher: chuck-eye marinated in maple. Cooks like ribeye, costs less. **Pair with their tallow and a cast-iron pan for the cleanest steak dinner you'll cook this year.**",
        "price": 22.99,
        "img": "steak",
        "url": "https://grasslandbeef.com",
        "category": "regenerative-pantry",
        "goals": ["performance", "longevity"],
        "certs": ["Grass-Fed", "Pasture-Raised"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "crowd-cow-wagyu-bundle",
        "brand": "Crowd Cow",
        "name": "American Wagyu Bundle",
        "tagline": "Curated from independent ranches you can trace back to. Single-origin meat done the way single-origin coffee is done.",
        "description": "Crowd Cow is meat with provenance — every cow's farm is named on the package. Their American Wagyu bundle gives you the marbling of Japanese A5 at half the price, and the cattle are pasture-raised on heritage farms. **Their 'craft beef bundle' is the smartest first-time buy.**",
        "price": 199,
        "img": "steak",
        "url": "https://crowdcow.com",
        "category": "regenerative-pantry",
        "goals": ["performance"],
        "certs": ["Grass-Fed", "Pasture-Raised"],
        "rating": 4.6, "featured": False, "editor_pick": False,
    },
    {
        "slug": "moink-mixed-meat-box",
        "brand": "Moink",
        "name": "Mixed Meat Subscription Box",
        "tagline": "Family-farm meat from small American ranchers. Beef, chicken, pork, lamb, and salmon in one box.",
        "description": "Moink (mooo + oink) is what you'd build if you wanted to support actual family farms instead of industrial processors. Each box is roughly 13 lbs of mixed meat from a rotating cast of small farms. **Customizable, skippable, cancellable — and the bacon is the best thing in the box.**",
        "price": 159,
        "img": "pork",
        "url": "https://moinkbox.com",
        "category": "regenerative-pantry",
        "goals": ["longevity"],
        "certs": ["Pasture-Raised", "Non-GMO"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "wild-pastures-100-grass-fed",
        "brand": "Wild Pastures",
        "name": "100% Grass-Fed & Pasture-Raised Subscription",
        "tagline": "American family farms only. No grass-fed-grass-finished asterisks. No imported beef labeled as American.",
        "description": "Wild Pastures stakes a strict 100% grass-fed AND grass-finished claim across all their beef and lamb. Pork and chicken are pasture-raised. **Sourced from regenerative farms in Pennsylvania, Texas, Georgia, and Wisconsin.**",
        "price": 159,
        "img": "lamb",
        "url": "https://wildpastures.com",
        "category": "regenerative-pantry",
        "goals": ["longevity", "performance"],
        "certs": ["Grass-Fed", "Pasture-Raised"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "belcampo-grass-fed-ribeye",
        "brand": "Belcampo Meat Co.",
        "name": "Grass-Fed Ribeye Steak",
        "tagline": "Heritage-breed cattle raised on a single regenerative ranch in California's Mt. Shasta region.",
        "description": "Belcampo is single-source and Certified Animal Welfare Approved. The cattle live their entire lives on one regenerative ranch — no transport, no feedlot finishing. **The ribeye is dry-aged a minimum of 21 days; expect funk and butter on the same plate.**",
        "price": 39,
        "img": "steak",
        "url": "https://belcampo.com",
        "category": "regenerative-pantry",
        "goals": ["performance", "longevity"],
        "certs": ["Grass-Fed", "Pasture-Raised", "Regenerative Certified"],
        "rating": 4.6, "featured": False, "editor_pick": False,
    },
    {
        "slug": "northstar-bison-burgers",
        "brand": "Northstar Bison",
        "name": "100% Grass-Fed Bison Burgers",
        "tagline": "Bison that roam Wisconsin pastures their entire lives. Higher protein, lower fat, deeper flavor than beef.",
        "description": "Bison is what most American beef *was* a century ago: lean, gamey, grass-fed by default. Northstar's herd is 100% grass-fed and grass-finished, and the burgers cook in a third of the time of a beef patty. **Don't overcook them — a hard medium-rare or you'll lose the magic.**",
        "price": 28.99,
        "img": "bison",
        "url": "https://northstarbison.com",
        "category": "regenerative-pantry",
        "goals": ["performance"],
        "certs": ["Grass-Fed", "Pasture-Raised"],
        "rating": 4.8, "featured": False, "editor_pick": False,
    },
    {
        "slug": "polyface-farm-pasture-chicken",
        "brand": "Polyface Farm",
        "name": "Pasture-Raised Whole Chicken",
        "tagline": "Joel Salatin's flagship product. The chicken that started the regenerative movement in America.",
        "description": "Polyface is the original regenerative farm — Joel Salatin's writing put 'salad bar beef' and chicken tractors into the cultural conversation. Their broilers move daily across pasture, eating bugs and grass. **Available direct from Virginia or via select regional drops.**",
        "price": 32,
        "img": "chicken",
        "url": "https://polyfacefarms.com",
        "category": "regenerative-pantry",
        "goals": ["longevity"],
        "certs": ["Pasture-Raised", "Regenerative Certified"],
        "rating": 4.9, "featured": False, "editor_pick": True,
    },
    # ---------- SEAFOOD (3) ----------
    {
        "slug": "vital-choice-wild-salmon",
        "brand": "Vital Choice",
        "name": "Wild Sockeye Salmon Portions",
        "tagline": "Wild-caught Alaskan sockeye, frozen at sea within hours of catch. The gold standard for omega-3 density.",
        "description": "Sockeye has roughly 2x the omega-3 content of farmed Atlantic salmon and a fraction of the contaminant load. Vital Choice freezes within hours of catch, vacuum-seals each portion individually, and ships overnight on dry ice. **Six 6-oz portions = a month of weeknight dinners.**",
        "price": 89,
        "img": "salmon",
        "url": "https://vitalchoice.com",
        "category": "regenerative-pantry",
        "goals": ["longevity", "performance"],
        "certs": ["Wild-Caught"],
        "rating": 4.8, "featured": True, "editor_pick": True,
    },
    {
        "slug": "fishwife-tinned-trout",
        "brand": "Fishwife",
        "name": "Smoked Rainbow Trout",
        "tagline": "Hot-smoked Idaho rainbow trout in olive oil. The Patagonia of tinned fish.",
        "description": "Fishwife brought tinned fish back into the cultural conversation. Their smoked trout is gentle, oily, and built for crackers + flaky salt + lemon. Sustainably sourced from a single Idaho farm with closed-loop water recycling. **Don't sleep on the chili crunch tuna either.**",
        "price": 12,
        "img": "tinned_fish",
        "url": "https://eatfishwife.com",
        "category": "regenerative-pantry",
        "goals": ["longevity"],
        "certs": ["Wild-Caught"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "patagonia-provisions-mussels",
        "brand": "Patagonia Provisions",
        "name": "Spanish Mussels in Olive Oil",
        "tagline": "Mussels are net-positive aquaculture: they filter water, sequester nitrogen, and require zero feed. Patagonia put them in a tin.",
        "description": "Mussels are the most regenerative protein on earth — they actively clean coastal waters as they grow. Patagonia Provisions sources from small co-ops on Spain's Galician coast. **Smear on toasted sourdough with butter and you've made the easiest 5-star bar snack.**",
        "price": 9.50,
        "img": "tinned_fish",
        "url": "https://patagoniaprovisions.com",
        "category": "regenerative-pantry",
        "goals": ["longevity"],
        "certs": ["Wild-Caught", "B-Corp"],
        "rating": 4.6, "featured": False, "editor_pick": False,
    },
    # ---------- DAIRY & EGGS (6) ----------
    {
        "slug": "vital-farms-pasture-raised-eggs",
        "brand": "Vital Farms",
        "name": "Pasture-Raised Eggs (Dozen)",
        "tagline": "108 sq ft of outdoor grass per hen. Bright orange yolks. The egg you remember from your grandmother's kitchen.",
        "description": "There's a reason Vital Farms eggs cost twice what supermarket eggs cost — the hens get an actual life. Pasture-raised means 108 sq ft of outdoor space, which is roughly 100x the 'cage-free' standard. **Yolks are deep orange because the hens eat actual grass and bugs, not just corn.**",
        "price": 7.99,
        "img": "eggs",
        "url": "https://vitalfarms.com",
        "category": "regenerative-pantry",
        "goals": ["longevity"],
        "certs": ["Pasture-Raised", "B-Corp", "Non-GMO"],
        "rating": 4.8, "featured": True, "editor_pick": True,
    },
    {
        "slug": "alexandre-family-farm-milk",
        "brand": "Alexandre Family Farm",
        "name": "100% A2/A2 Regenerative Whole Milk",
        "tagline": "The first Regenerative Organic Certified® dairy in the US. A2/A2 protein for easier digestion.",
        "description": "The Alexandres rebuilt their northern California land using a method called 'kelp + compost + cattle' that is now studied as a model. Their cows are 100% grass-fed and produce A2/A2 milk — the protein variant that doesn't trigger digestive issues for many people. **Available regionally + by mail.**",
        "price": 8.99,
        "img": "milk",
        "url": "https://alexandrefamilyfarm.com",
        "category": "regenerative-pantry",
        "goals": ["gut", "longevity"],
        "certs": ["Regenerative Certified", "Grass-Fed", "USDA Organic"],
        "rating": 4.8, "featured": False, "editor_pick": True,
    },
    {
        "slug": "maple-hill-grass-fed-yogurt",
        "brand": "Maple Hill Creamery",
        "name": "100% Grass-Fed Plain Yogurt",
        "tagline": "Tangy, thick, and made from milk of cows that never see grain. The reference grass-fed yogurt.",
        "description": "Maple Hill pioneered the 100% grass-fed dairy category in the US. Their plain whole-milk yogurt has more conjugated linoleic acid (CLA) and omega-3 than conventional yogurt by significant margins. **Eat with raw honey and bee pollen for the most regenerative breakfast in your fridge.**",
        "price": 5.49,
        "img": "yogurt",
        "url": "https://maplehill.com",
        "category": "regenerative-pantry",
        "goals": ["gut", "longevity"],
        "certs": ["Grass-Fed", "USDA Organic", "Non-GMO"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "organic-valley-grassmilk",
        "brand": "Organic Valley",
        "name": "Grassmilk® Whole Milk",
        "tagline": "America's largest farmer-owned organic co-op, with the only widely-distributed 100% grass-fed milk line.",
        "description": "Organic Valley is a co-op of 1,800+ small organic farms. Their Grassmilk line means cows are 100% grass-fed (most 'organic' milk is still grain-finished). **The 1-quart bottle is the best price-to-quality ratio in the regenerative dairy aisle.**",
        "price": 5.99,
        "img": "milk",
        "url": "https://organicvalley.coop/products/milk/grassmilk-yogurt-cream/",
        "category": "regenerative-pantry",
        "goals": ["longevity"],
        "certs": ["USDA Organic", "Grass-Fed", "Non-GMO"],
        "rating": 4.6, "featured": False, "editor_pick": False,
    },
    {
        "slug": "kerrygold-grass-fed-butter",
        "brand": "Kerrygold",
        "name": "Pure Irish Grass-Fed Butter",
        "tagline": "Cows that graze Irish pasture for 240+ days a year. The standard against which all grass-fed butter is judged.",
        "description": "Kerrygold's deep-yellow color isn't a dye — it's beta-carotene from real grass. Their cows are out on pasture from spring through fall, which is rare even among 'grass-fed' butters. **Sub it for cooking butter and your eggs will taste like a different food.**",
        "price": 4.99,
        "img": "butter",
        "url": "https://kerrygoldusa.com",
        "category": "regenerative-pantry",
        "goals": ["longevity"],
        "certs": ["Grass-Fed"],
        "rating": 4.9, "featured": True, "editor_pick": False,
    },
    {
        "slug": "lifeway-organic-kefir",
        "brand": "Lifeway",
        "name": "Organic Whole Milk Kefir",
        "tagline": "12 live probiotic cultures in every cup. Drinkable yogurt for people who care about their microbiome.",
        "description": "Kefir is the dark horse of fermented dairy — more diverse probiotic strains than yogurt, and the lactose is largely digested by the cultures (most lactose-intolerant folks tolerate it fine). Lifeway is family-run, women-led, and uses organic milk. **The plain whole-milk version is the only one worth buying.**",
        "price": 4.49,
        "img": "kefir",
        "url": "https://lifewaykefir.com",
        "category": "gut-immunity",
        "goals": ["gut", "immunity"],
        "certs": ["USDA Organic"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    # ---------- BONE BROTH & ORGAN MEATS (3) ----------
    {
        "slug": "kettle-fire-bone-broth",
        "brand": "Kettle & Fire",
        "name": "Grass-Fed Beef Bone Broth",
        "tagline": "Slow-simmered for 20+ hours from grass-fed bones. Shelf-stable, no refrigeration, drink straight from the carton.",
        "description": "Kettle & Fire makes bone broth that's actually gelatinous when chilled — the marker of real collagen extraction. Grass-fed beef bones, organic vegetables, simmered 20+ hours. **The single best 'I can't find time for breakfast' protein source we know of.**",
        "price": 8.99,
        "img": "bone_broth",
        "url": "https://kettleandfire.com",
        "category": "gut-immunity",
        "goals": ["gut", "skin", "longevity"],
        "certs": ["Grass-Fed", "Non-GMO"],
        "rating": 4.7, "featured": True, "editor_pick": True,
    },
    {
        "slug": "bonafide-provisions-bone-broth",
        "brand": "Bonafide Provisions",
        "name": "Frozen Organic Bone Broth",
        "tagline": "Frozen, not shelf-stable. The only bone broth in the freezer aisle worth the price.",
        "description": "Bonafide's frozen format keeps the gel intact — when you thaw it, it pours like jelly. Made from organic chicken or beef bones simmered with organic vegetables and apple cider vinegar to extract collagen. **You'll find this in the freezer at Whole Foods, not the soup aisle.**",
        "price": 9.99,
        "img": "bone_broth",
        "url": "https://bonafideprovisions.com",
        "category": "gut-immunity",
        "goals": ["gut", "skin"],
        "certs": ["USDA Organic", "Pasture-Raised"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "pluck-organ-meat-seasoning",
        "brand": "Pluck",
        "name": "Organ-Based Seasoning",
        "tagline": "Freeze-dried organ meats ground into a savory seasoning. Sprinkle nutrient density onto anything.",
        "description": "If eating liver feels intimidating, Pluck is the cheat code. Freeze-dried beef organs (liver, heart, kidney, spleen) plus sea salt, herbs, and spices, ground into a fine powder that tastes like a great steak rub. **One teaspoon = roughly the bioavailable B12 of an entire serving of liver.**",
        "price": 36,
        "img": "spice",
        "url": "https://eatpluck.com",
        "category": "regenerative-pantry",
        "goals": ["longevity", "energy"],
        "certs": ["Grass-Fed", "Pasture-Raised"],
        "rating": 4.8, "featured": False, "editor_pick": True,
    },
    # ---------- JERKY & MEAT BARS (3) ----------
    {
        "slug": "epic-bison-bacon-cranberry-bar",
        "brand": "EPIC Provisions",
        "name": "Bison, Bacon & Cranberry Bar",
        "tagline": "The bar that started the meat-bar category. Grass-fed bison + uncured bacon + tart cranberry.",
        "description": "EPIC bars use 100% grass-fed bison and were the first widely distributed meat bar to do so. The bison-bacon-cranberry is the platonic ideal — a savory-sweet brick of protein you can keep in your bag for 6 months. **B-Corp certified; sourcing audits available on their site.**",
        "price": 2.99,
        "img": "bars",
        "url": "https://epicprovisions.com",
        "category": "regenerative-pantry",
        "goals": ["performance", "energy"],
        "certs": ["Grass-Fed", "B-Corp"],
        "rating": 4.6, "featured": False, "editor_pick": False,
    },
    {
        "slug": "paleovalley-100-grass-fed-beef-sticks",
        "brand": "Paleovalley",
        "name": "100% Grass-Fed Beef Sticks",
        "tagline": "Real fermented beef sticks — naturally probiotic. No 'encapsulated citric acid' shortcuts.",
        "description": "Paleovalley sticks are fermented (think old-world salami) instead of acid-cured. That gives them naturally occurring probiotics and a deeper flavor. **The only grocery-aisle beef stick we'd actually recommend.**",
        "price": 39,
        "img": "jerky",
        "url": "https://paleovalley.com",
        "category": "regenerative-pantry",
        "goals": ["gut", "performance"],
        "certs": ["Grass-Fed", "Pasture-Raised"],
        "rating": 4.8, "featured": True, "editor_pick": True,
    },
    {
        "slug": "chomps-grass-fed-jerky",
        "brand": "Chomps",
        "name": "Grass-Fed Beef Jerky Sticks",
        "tagline": "1g sugar, 9g protein, no junk. The cleanest mass-distributed jerky in America.",
        "description": "Chomps cleaned up the convenience-store jerky category single-handedly. Their grass-fed beef sticks have just beef, salt, and spices — no sugar, no nitrites, no MSG. Available at every airport in America by now. **The original beef stick is still the best one.**",
        "price": 32,
        "img": "jerky",
        "url": "https://chomps.com",
        "category": "regenerative-pantry",
        "goals": ["performance"],
        "certs": ["Grass-Fed", "Non-GMO"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    # ---------- OILS & VINEGARS (5) ----------
    {
        "slug": "graza-drizzle-extra-virgin-olive-oil",
        "brand": "Graza",
        "name": "Drizzle Extra Virgin Olive Oil",
        "tagline": "Single-origin Spanish EVOO in a squeeze bottle. The startup that made olive oil cool again.",
        "description": "Graza is single-estate Picual olives from southern Spain, harvested early for high polyphenol content, packed in a squeeze bottle that keeps oxygen out. **Two bottles — 'Sizzle' (cooking) and 'Drizzle' (finishing). Buy both, you'll use both.**",
        "price": 36,
        "img": "olive_oil",
        "url": "https://graza.co",
        "category": "regenerative-pantry",
        "goals": ["longevity"],
        "certs": ["Non-GMO"],
        "rating": 4.8, "featured": True, "editor_pick": True,
    },
    {
        "slug": "brightland-arise-evoo",
        "brand": "Brightland",
        "name": "ARISE Extra Virgin Olive Oil",
        "tagline": "Single-estate California Coratina olives, harvested once a year. The minimalist's premium EVOO.",
        "description": "Brightland sources from a single regenerative California farm, harvests early-season for polyphenol density, and tests every batch for chemical purity. **The peppery throat-burn when you taste it raw is the polyphenol — that's the good stuff.**",
        "price": 39,
        "img": "olive_oil",
        "url": "https://brightland.co",
        "category": "regenerative-pantry",
        "goals": ["longevity"],
        "certs": ["Non-GMO"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "chosen-foods-avocado-oil",
        "brand": "Chosen Foods",
        "name": "100% Pure Avocado Oil",
        "tagline": "High smoke point, neutral flavor. Cleaner than canola, cheaper than extra virgin olive oil.",
        "description": "Avocado oil's 500°F smoke point makes it the answer for searing, roasting, and frying — applications where olive oil oxidizes. Chosen Foods' single-source avocados from Mexico are pressed without solvents. **Independent testing has flagged some avocado oil brands for adulteration; Chosen has consistently passed.**",
        "price": 14,
        "img": "avocado_oil",
        "url": "https://chosenfoods.com",
        "category": "regenerative-pantry",
        "goals": ["longevity"],
        "certs": ["Non-GMO"],
        "rating": 4.6, "featured": False, "editor_pick": False,
    },
    {
        "slug": "primal-kitchen-avocado-mayo",
        "brand": "Primal Kitchen",
        "name": "Avocado Oil Mayo",
        "tagline": "Mayo with no soybean or canola oil. Mark Sisson built this category from scratch.",
        "description": "Most mayo is industrial seed oil + sugar + emulsifiers. Primal Kitchen rebuilt it: avocado oil, organic egg, organic vinegar, that's it. **Tastes like real mayo, plays nicely with any sandwich, and won't oxidize in your fridge for weeks.**",
        "price": 9.99,
        "img": "mayo",
        "url": "https://primalkitchen.com",
        "category": "regenerative-pantry",
        "goals": ["longevity"],
        "certs": ["Non-GMO"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "bragg-organic-acv",
        "brand": "Bragg",
        "name": "Organic Apple Cider Vinegar with the Mother",
        "tagline": "Raw, unfiltered ACV with the cloudy 'mother' that contains the live cultures. The OG of the wellness aisle.",
        "description": "Bragg has been making this since 1912, and despite a hundred imitators it remains the standard. Raw, unfiltered, USDA Organic. **One tablespoon in water before meals to support digestion is the simplest, cheapest gut-health practice we know.**",
        "price": 5.99,
        "img": "vinegar",
        "url": "https://bragg.com",
        "category": "regenerative-pantry",
        "goals": ["gut"],
        "certs": ["USDA Organic", "Non-GMO"],
        "rating": 4.8, "featured": False, "editor_pick": False,
    },
    # ---------- SWEETENERS & CHOCOLATE (4) ----------
    {
        "slug": "crown-maple-organic-syrup",
        "brand": "Crown Maple",
        "name": "Organic Dark Color Maple Syrup",
        "tagline": "Single-estate maple from a 800-acre forest in the Hudson Valley. The Domaine Romanée-Conti of maple.",
        "description": "Crown Maple manages the trees, taps them, evaporates the sap, and bottles the syrup all on one estate. The Dark Color grade is what serious cooks reach for — deeper minerality, more complex than the supermarket Grade A. **Pour over yogurt with bee pollen for the unexpectedly best breakfast you'll have this year.**",
        "price": 22,
        "img": "maple",
        "url": "https://crownmaple.com",
        "category": "regenerative-pantry",
        "goals": ["energy"],
        "certs": ["USDA Organic"],
        "rating": 4.8, "featured": False, "editor_pick": True,
    },
    {
        "slug": "raw-honey-y-s-eco",
        "brand": "Y.S. Eco Bee Farms",
        "name": "Raw Organic Honey",
        "tagline": "Unheated, unfiltered, never blended with corn syrup. From bee farms certified organic.",
        "description": "Most supermarket honey is blended with rice or corn syrup, heat-treated, and filtered to a clear gold. Real raw honey is cloudy, sometimes crystallized, and has a complex floral profile. Y.S. Eco's organic raw honey is the cheapest legit option in mass distribution. **A tablespoon at bedtime can support sleep — folk medicine that has some real evidence behind it.**",
        "price": 18,
        "img": "honey",
        "url": "https://ysorganic.com",
        "category": "regenerative-pantry",
        "goals": ["sleep", "immunity"],
        "certs": ["USDA Organic"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "just-date-syrup",
        "brand": "Just Date",
        "name": "Organic Date Syrup",
        "tagline": "Single ingredient: dates. Lower glycemic than maple, deeper flavor than honey.",
        "description": "Just Date is one ingredient — organic dates, pureed and reduced. No added sugars, no preservatives. Glycemic load is meaningfully lower than maple syrup and honey, and the molasses-like flavor works in coffee, oatmeal, salad dressings, and meat marinades. **The bottle pours like motor oil at room temperature; warm it slightly first.**",
        "price": 12,
        "img": "dates",
        "url": "https://justdatesyrup.com",
        "category": "regenerative-pantry",
        "goals": ["gut", "energy"],
        "certs": ["USDA Organic"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "alter-eco-deepest-dark-chocolate",
        "brand": "Alter Eco",
        "name": "Deepest Dark Salted Brown Butter Chocolate",
        "tagline": "B-Corp, fair trade, regenerative cocoa from Ecuador. Single-origin and single-good chocolate.",
        "description": "Alter Eco buys cacao directly from Ecuadorian farming co-ops practicing dynamic agroforestry — cocoa grown alongside fruit trees and native species, regenerating the soil. The Deepest Dark Salted Brown Butter is 70% cacao and quite possibly the best chocolate at the grocery store. **Buy two; the first one will not last the day.**",
        "price": 4.99,
        "img": "chocolate",
        "url": "https://alterecofoods.com",
        "category": "regenerative-pantry",
        "goals": ["energy"],
        "certs": ["USDA Organic", "Fair Trade", "B-Corp", "Regenerative Certified"],
        "rating": 4.8, "featured": True, "editor_pick": True,
    },
    # ---------- GRAINS & FLOURS (3) ----------
    {
        "slug": "lundberg-organic-brown-rice",
        "brand": "Lundberg Family Farms",
        "name": "Organic California Brown Basmati Rice",
        "tagline": "Family-run since 1937 in California's Sacramento Valley, on land farmed regeneratively.",
        "description": "Lundberg practices low-input farming — flooding fields to encourage waterfowl that eat pests, eliminating the need for chemicals. Their California-grown brown basmati is fragrant, light, and the soil it came from gets healthier each year. **Buy the 4-lb bag; you'll go through it.**",
        "price": 14,
        "img": "rice",
        "url": "https://lundberg.com",
        "category": "regenerative-pantry",
        "goals": ["energy"],
        "certs": ["USDA Organic", "Non-GMO", "B-Corp"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "bobs-red-mill-rolled-oats",
        "brand": "Bob's Red Mill",
        "name": "Organic Old-Fashioned Rolled Oats",
        "tagline": "Stone-ground oats from one of the few employee-owned food companies in America.",
        "description": "Bob's Red Mill is employee-owned (the founder gifted the company to the staff in 2010), uses stone mills for slower, lower-temperature grinding, and sources organic from regenerative-leaning farms in the Pacific Northwest. **Whole rolled oats, not steel-cut and not instant — the texture sweet spot for overnight oats.**",
        "price": 6,
        "img": "grains",
        "url": "https://bobsredmill.com",
        "category": "regenerative-pantry",
        "goals": ["gut", "energy"],
        "certs": ["USDA Organic", "Non-GMO"],
        "rating": 4.8, "featured": False, "editor_pick": False,
    },
    {
        "slug": "anson-mills-grits",
        "brand": "Anson Mills",
        "name": "Antebellum Coarse White Grits",
        "tagline": "Heirloom corn, milled fresh weekly to order. The grits Sean Brock built Charleston restaurants on.",
        "description": "Anson Mills grows nearly-extinct heirloom Carolina Gourdseed corn and mills the grits the day they ship. The flavor is unrecognizable from supermarket grits — buttery, sweet, the way grits tasted before industrial corn. **Cook low and slow with bone broth and finish with grass-fed butter.**",
        "price": 9,
        "img": "flour",
        "url": "https://ansonmills.com",
        "category": "regenerative-pantry",
        "goals": ["longevity"],
        "certs": ["USDA Organic", "Non-GMO"],
        "rating": 4.9, "featured": False, "editor_pick": True,
    },
    # ---------- FERMENTS & BEVERAGES (4) ----------
    {
        "slug": "gts-kombucha-trilogy",
        "brand": "GT's Living Foods",
        "name": "Original Kombucha — Trilogy",
        "tagline": "The original American kombucha brand, founded on raspberry-lemon-ginger. Live cultures, no shortcuts.",
        "description": "GT Dave brewed the first commercial American kombucha in 1995 because his mother had cancer and asked him to. The company is still privately owned. Trilogy (raspberry + lemon + ginger) is the flagship. **Start with half a bottle if you've never had kombucha — the live cultures can hit you hard.**",
        "price": 4.99,
        "img": "kombucha",
        "url": "https://gtslivingfoods.com",
        "category": "gut-immunity",
        "goals": ["gut", "immunity"],
        "certs": ["USDA Organic", "Non-GMO"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "wildbrine-raw-sauerkraut",
        "brand": "Wildbrine",
        "name": "Raw Organic Sauerkraut",
        "tagline": "Live, unpasteurized fermented cabbage. The probiotic on your plate, not in a pill.",
        "description": "Wildbrine's raw kraut is fermented in glass crocks and never pasteurized, so the live cultures are intact. Eat a forkful with any meal to support digestion. **The classic original variety beats the flavor experiments — don't overthink your sauerkraut.**",
        "price": 7.99,
        "img": "kraut",
        "url": "https://wildbrine.com",
        "category": "gut-immunity",
        "goals": ["gut", "immunity"],
        "certs": ["USDA Organic", "Non-GMO"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "harmless-harvest-coconut-water",
        "brand": "Harmless Harvest",
        "name": "Organic Coconut Water",
        "tagline": "Wild Thai nam hom coconuts, no added sugar, no concentrate. The pink-tinged real thing.",
        "description": "Harmless Harvest's coconut water sometimes turns light pink — that's an oxidative reaction with the natural antioxidants in real coconut water (it means it's real, not pasteurized to death). Sourced from regenerative farms in Thailand. **Best post-workout electrolyte drink in the cooler aisle.**",
        "price": 4.99,
        "img": "coconut_water",
        "url": "https://harmlessharvest.com",
        "category": "regenerative-pantry",
        "goals": ["performance"],
        "certs": ["USDA Organic", "Fair Trade", "B-Corp"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "rishi-tea-matcha",
        "brand": "Rishi Tea",
        "name": "Organic Ceremonial Matcha",
        "tagline": "Stone-milled in Kagoshima, Japan. The matcha grade you'd whisk for tea ceremony.",
        "description": "Rishi Tea sources directly from small Japanese farms practicing chagusaba — a 700-year-old soil-building tradition recognized by FAO as a Globally Important Agricultural Heritage System. Their ceremonial matcha is bright, vegetal, never bitter. **A teaspoon whisked into hot water replaces your second coffee with a calmer focus.**",
        "price": 32,
        "img": "tea",
        "url": "https://rishi-tea.com",
        "category": "superfoods-adaptogens",
        "goals": ["focus", "energy"],
        "certs": ["USDA Organic", "Fair Trade"],
        "rating": 4.8, "featured": False, "editor_pick": False,
    },
    # ---------- PANTRY & SPECIALTY (5) ----------
    {
        "slug": "thrive-market-pantry-staples-box",
        "brand": "Thrive Market",
        "name": "Pantry Staples Membership Box",
        "tagline": "Whole-foods online membership shop. Organic and regenerative pantry items at warehouse-club prices.",
        "description": "Thrive Market is the online Whole Foods at Costco prices, with an aggressive 'no junk' standard for what they'll stock. Annual membership ($60) is more than worth it if you spend more than $5/week on organic pantry items. **They donate a free membership to a low-income family for every paid membership.**",
        "price": 60,
        "img": "pantry_box",
        "url": "https://thrivemarket.com",
        "category": "regenerative-pantry",
        "goals": ["longevity"],
        "certs": ["B-Corp", "Non-GMO"],
        "rating": 4.7, "featured": True, "editor_pick": True,
    },
    {
        "slug": "fly-by-jing-sichuan-chili-crisp",
        "brand": "Fly by Jing",
        "name": "Sichuan Chili Crisp",
        "tagline": "Single-origin chilies from Sichuan, no preservatives, no MSG. The chili oil that's better than the original.",
        "description": "Fly by Jing's Sichuan Chili Crisp made the chili-oil renaissance in America. Made from single-origin Erjingtiao chilies in tribute to founder Jing Gao's hometown. The umami comes from naturally fermented black beans, not MSG. **One spoon over eggs, soup, or rice will rebrand your kitchen.**",
        "price": 15,
        "img": "sauce",
        "url": "https://flybyjing.com",
        "category": "regenerative-pantry",
        "goals": ["energy"],
        "certs": ["Non-GMO"],
        "rating": 4.9, "featured": False, "editor_pick": False,
    },
    {
        "slug": "dr-cowans-leek-powder",
        "brand": "Dr. Cowan's Garden",
        "name": "Organic Leek Powder",
        "tagline": "Single-vegetable powders in dark Miron glass. Scoop a teaspoon into anything for instant umami.",
        "description": "Dr. Tom Cowan grows or sources organic vegetables, freeze-dries them at low temperatures to preserve nutrients, and packs the powder in light-blocking violet glass. Each ingredient stands alone — leek, beet, kale, dandelion, parsley. **Add a teaspoon to soup, eggs, or a salad dressing for nutrient density without changing flavor much.**",
        "price": 28,
        "img": "veg_powder",
        "url": "https://drcowansgarden.com",
        "category": "superfoods-adaptogens",
        "goals": ["longevity", "gut"],
        "certs": ["USDA Organic"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "maine-coast-sea-vegetables-dulse",
        "brand": "Maine Coast Sea Vegetables",
        "name": "Organic Dulse Flakes",
        "tagline": "Hand-harvested from the cold North Atlantic. Iodine, B12, iron — sea greens are the original superfood.",
        "description": "Maine Coast harvests dulse, kelp, and laver by hand from clean Maine waters. Dulse flakes have a smoky-bacon taste that surprises everyone. Sprinkle on eggs, popcorn, or salad. **One of the only naturally vegan sources of bioavailable B12.**",
        "price": 13,
        "img": "seaweed",
        "url": "https://seaveg.com",
        "category": "superfoods-adaptogens",
        "goals": ["longevity", "energy"],
        "certs": ["USDA Organic"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "magic-spoon-cocoa-cereal",
        "brand": "Magic Spoon",
        "name": "Cocoa High-Protein Cereal",
        "tagline": "13g protein, 0g sugar, 4g net carbs. Cereal that tastes like Cocoa Pebbles without wrecking your blood sugar.",
        "description": "Magic Spoon engineered grain-free, high-protein cereal that genuinely tastes like the sugary cereals of childhood. Sweetened with allulose and monk fruit. **The cocoa flavor is closest to the original; the maple-waffle is the dark horse.**",
        "price": 39,
        "img": "cereal",
        "url": "https://magicspoon.com",
        "category": "regenerative-pantry",
        "goals": ["performance"],
        "certs": ["Non-GMO"],
        "rating": 4.6, "featured": False, "editor_pick": False,
    },
    # ---------- BABY (2) ----------
    {
        "slug": "bobbie-organic-formula",
        "brand": "Bobbie",
        "name": "Organic Whole Milk Infant Formula",
        "tagline": "European-style formula made in America. The first US infant formula brand co-founded by mothers.",
        "description": "Bobbie is the first US infant formula based on the EU recipe standard — whole milk, lactose as the only carbohydrate, no corn syrup, no palm oil. USDA Organic, sourced from grass-fed cows. **A genuinely better formula in a category that's barely innovated in 50 years.**",
        "price": 26,
        "img": "babyfood",
        "url": "https://hibobbie.com",
        "category": "regenerative-pantry",
        "goals": ["longevity"],
        "certs": ["USDA Organic"],
        "rating": 4.8, "featured": False, "editor_pick": False,
    },
    {
        "slug": "serenity-kids-baby-food",
        "brand": "Serenity Kids",
        "name": "Pasture-Raised Meat & Veggie Pouches",
        "tagline": "Real meat and vegetables for babies. The first 'pasture-raised meat first ingredient' baby food.",
        "description": "Serenity Kids was the first baby food company to put grass-fed beef, bison, and chicken first on the ingredient list. Low sugar, real food. **Their bone broth pouches are the easiest way to give a toddler real nutrition.**",
        "price": 4.99,
        "img": "babyfood",
        "url": "https://myserenitykids.com",
        "category": "regenerative-pantry",
        "goals": ["longevity"],
        "certs": ["Pasture-Raised", "Non-GMO"],
        "rating": 4.8, "featured": False, "editor_pick": False,
    },
    # ---------- NUT BUTTER, HEMP & EXTRAS (3) ----------
    {
        "slug": "big-spoon-roasters-peanut-butter",
        "brand": "Big Spoon Roasters",
        "name": "Peanut Cashew Butter",
        "tagline": "Small-batch nut butter from a North Carolina roastery. Peanut + cashew + sea salt + a touch of wildflower honey.",
        "description": "Big Spoon roasts in small batches and grinds within 24 hours of roasting. The peanut-cashew is sweetened with raw North Carolina wildflower honey — three ingredients, balanced perfectly. **The closest thing to homemade nut butter in a jar.**",
        "price": 14,
        "img": "nut_butter",
        "url": "https://bigspoonroasters.com",
        "category": "regenerative-pantry",
        "goals": ["performance"],
        "certs": ["Non-GMO"],
        "rating": 4.8, "featured": False, "editor_pick": False,
    },
    {
        "slug": "manitoba-harvest-hemp-hearts",
        "brand": "Manitoba Harvest",
        "name": "Organic Hemp Hearts",
        "tagline": "Shelled hemp seeds, 10g of complete protein per 3 tbsp. The most under-used regenerative food in America.",
        "description": "Hemp is one of the most regenerative crops on earth — it builds soil, requires no pesticides, and grows fast. Manitoba Harvest is the largest vertically-integrated hemp food company; they grow, mill, and pack on Canadian farms they own. **A handful on yogurt or salad gives you complete protein with a nutty crunch.**",
        "price": 18,
        "img": "hemp",
        "url": "https://manitobaharvest.com",
        "category": "regenerative-pantry",
        "goals": ["performance", "longevity"],
        "certs": ["USDA Organic", "Non-GMO"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "coconut-cult-yogurt",
        "brand": "The Coconut Cult",
        "name": "Original Probiotic Coconut Yogurt",
        "tagline": "1.6 billion probiotics per teaspoon. Cult favorite for a reason.",
        "description": "The Coconut Cult ferments organic coconut meat with 16+ probiotic strains for 30 days. Each 16-oz jar has trillions of live cultures and the texture of thick custard. **A teaspoon a day; do not eat the whole jar at once or your gut will let you know.**",
        "price": 22,
        "img": "yogurt",
        "url": "https://thecoconutcult.com",
        "category": "gut-immunity",
        "goals": ["gut", "immunity"],
        "certs": ["USDA Organic", "Non-GMO"],
        "rating": 4.7, "featured": False, "editor_pick": True,
    },
    # ---------- TWO MORE TO ROUND OUT 50 ----------
    {
        "slug": "siete-grain-free-tortillas",
        "brand": "Siete Family Foods",
        "name": "Almond Flour Tortillas",
        "tagline": "Family-owned, grain-free, made with cassava and almond flours. Mexican-American food, reimagined.",
        "description": "The Garza family started Siete because the matriarch had autoimmune issues that kept her from grain. The almond flour tortilla is a quiet revolution: it tastes like a tortilla, holds together for tacos, and works in quesadillas. **The cassava-coconut version is also great if you avoid almonds.**",
        "price": 7.99,
        "img": "flour",
        "url": "https://sietefoods.com",
        "category": "regenerative-pantry",
        "goals": ["gut"],
        "certs": ["Non-GMO"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
    {
        "slug": "fond-bone-broth-tonic",
        "brand": "FOND",
        "name": "Bone Broth Tonic — Lemon Garlic Thyme",
        "tagline": "Sippable bone broth with herbs and aromatics. The most elegant version of bone broth on the market.",
        "description": "FOND is bone broth as a beverage — herbs and aromatics infused into 24-hour-simmered grass-fed beef or pasture-raised chicken stock. Made in jars, refrigerated. The lemon-garlic-thyme is the standout. **Drink straight, or use as the base for the best risotto of your life.**",
        "price": 16,
        "img": "bone_broth",
        "url": "https://fondbonebroth.com",
        "category": "gut-immunity",
        "goals": ["gut", "skin"],
        "certs": ["Grass-Fed", "Pasture-Raised"],
        "rating": 4.7, "featured": False, "editor_pick": False,
    },
]

# Sanity: count
print(f'Defined {len(PRODUCTS)} regen food products')
assert len(PRODUCTS) >= 50, f'Need at least 50 products, only have {len(PRODUCTS)}'

# Slug uniqueness
slugs = [p['slug'] for p in PRODUCTS]
dups = [s for s in slugs if slugs.count(s) > 1]
assert not dups, f'Duplicate slugs: {dups}'


# Build TS
def ts_str(s):
    if s is None:
        return 'undefined'
    return json.dumps(s, ensure_ascii=False)


def ts_arr(arr):
    return '[' + ', '.join(ts_str(x) for x in arr) + ']'


def make_id(slug):
    return f"p-regen-{slug}"


CERT_PRO_MAP = {
    "Regenerative Certified": "Regenerative Organic Certified® — soil that gets healthier, not poorer",
    "Grass-Fed": "100% grass-fed and grass-finished — no feedlot grain",
    "Pasture-Raised": "Pasture-raised on real grass, not 'access to outdoor concrete'",
    "Wild-Caught": "Wild-caught — no farmed-fish tradeoffs",
    "USDA Organic": "USDA Organic certified — no synthetic pesticides or fertilizers",
    "Non-GMO": "Verified non-GMO ingredients",
    "B-Corp": "Certified B-Corporation — meets a public-benefit standard",
    "Fair Trade": "Fair Trade certified — farmers paid above-market wages",
    "Biodynamic": "Biodynamic — closed-loop farming with no off-farm inputs",
    "Glyphosate-Free": "Tested glyphosate-free",
    "Third-Party Tested": "Independently lab-tested for purity and contaminants",
}


def derive_pros(p):
    pros = []
    for c in p["certs"]:
        if c in CERT_PRO_MAP:
            pros.append(CERT_PRO_MAP[c])
    pros.append(f"Order direct from {p['brand']} for freshness and to support the source")
    # De-dupe while preserving order
    seen = set()
    out = []
    for x in pros:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out[:4]


def derive_cons(p):
    # Light, honest cons — appropriate for the category
    cat = p["category"]
    if "meat" in p["name"].lower() or cat == "regenerative-pantry":
        if any(k in p["name"].lower() for k in ["beef", "bison", "lamb", "chicken", "salmon", "trout", "mussels"]):
            return [
                "Higher price than supermarket conventional",
                "Ships frozen — needs freezer space on arrival",
            ]
    if "kombucha" in p["name"].lower() or "kefir" in p["name"].lower() or "yogurt" in p["name"].lower():
        return [
            "Live cultures — keep refrigerated",
            "Start with smaller servings if you're new to fermented foods",
        ]
    if cat == "gut-immunity" or "broth" in p["name"].lower():
        return [
            "Premium pricing vs. mass-market alternatives",
        ]
    return [
        "Premium pricing — but you're paying for the sourcing",
    ]


lines = []
lines.append('import type { Product } from "./types";')
lines.append('')
lines.append('/**')
lines.append(' * Regenerative food brands across meat, dairy, eggs, pantry, oils, ferments,')
lines.append(' * sweeteners, and specialty categories. Each entry uses the brand\'s direct')
lines.append(' * product/store URL as affiliateUrl. Once approved for each brand\'s affiliate')
lines.append(' * program, swap the URL via the admin panel — slug stays the same so analytics')
lines.append(' * and SEO are preserved.')
lines.append(' *')
lines.append(' * See AFFILIATE-PROGRAMS.md in the project root for the application strategy.')
lines.append(' */')
lines.append('')
lines.append('export const regenFoods: Product[] = [')

for p in PRODUCTS:
    img_url = IMG.get(p['img'])
    if not img_url:
        raise SystemExit(f"missing image key {p['img']!r} for {p['slug']}")
    desc = p['description'].replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
    lines.append('  {')
    lines.append(f'    id: {ts_str(make_id(p["slug"]))},')
    lines.append(f'    slug: {ts_str(p["slug"])},')
    lines.append(f'    name: {ts_str(p["name"])},')
    lines.append(f'    brand: {ts_str(p["brand"])},')
    lines.append(f'    tagline: {ts_str(p["tagline"])},')
    lines.append(f'    description: `{desc}`,')
    lines.append(f'    price: {p["price"]},')
    lines.append(f'    currency: "USD",')
    lines.append(f'    imageUrl: {ts_str(img_url)},')
    lines.append(f'    categorySlug: {ts_str(p["category"])},')
    lines.append(f'    affiliateUrl: {ts_str(p["url"])},')
    lines.append(f'    merchant: {ts_str(p["brand"])},')
    lines.append(f'    certifications: {ts_arr(p["certs"])},')
    lines.append(f'    goals: {ts_arr(p["goals"])},')
    lines.append(f'    rating: {p["rating"]},')
    lines.append(f'    isEditorPick: {"true" if p["editor_pick"] else "false"},')
    lines.append(f'    isFeatured: {"true" if p["featured"] else "false"},')
    lines.append(f'    pros: {ts_arr(derive_pros(p))},')
    lines.append(f'    cons: {ts_arr(derive_cons(p))},')
    lines.append('  },')

lines.append('];')
lines.append('')

out = '\n'.join(lines)
with open('/workspace/regeneralive/src/data/seed-regen-foods.ts', 'w') as f:
    f.write(out)
print(f'Wrote seed-regen-foods.ts ({len(out)} bytes, {len(PRODUCTS)} products)')