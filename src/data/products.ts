import type { Product } from "./types";

export const products: Product[] = [
  // ─────────────────────── REGENERATIVE PANTRY ───────────────────────
  {
    id: "p1",
    slug: "force-of-nature-regenerative-ground-bison",
    name: "Regenerative Ground Bison",
    brand: "Force of Nature",
    tagline:
      "Pasture-raised, regenerative bison from ranches restoring American grasslands.",
    description: `Force of Nature partners with ranchers practicing **adaptive multi-paddock grazing**, the gold standard of regenerative agriculture. Their bison are 100% grass-fed, never given hormones or antibiotics, and live their entire lives outdoors on land that's measurably sequestering carbon.

We've cooked through dozens of pounds. The flavor is cleaner and slightly sweeter than commodity beef, with a richer iron note. The 1lb pucks portion well, freeze well, and brown beautifully in cast iron without releasing the watery liquid you get from feedlot meat.

If you eat red meat, this is the move. You're voting with your fork for soil that's healing.`,
    price: 16.99,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
    ],
    categorySlug: "regenerative-pantry",
    affiliateUrl: "https://www.forceofnature.com/products/bison",
    merchant: "Force of Nature",
    certifications: ["Regenerative Certified", "Grass-Fed", "Pasture-Raised"],
    goals: ["performance", "longevity"],
    rating: 4.8,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "100% grass-fed and finished",
      "Verified regenerative — soil carbon measured",
      "Clean, mild flavor — easy to convince family with",
      "Direct ship, frozen, no middlemen",
    ],
    cons: [
      "Pricier than commodity ground beef",
      "Subscription saves money but requires planning",
    ],
    ingredients: "Bison.",
    servingSize: "4 oz (113g)",
  },
  {
    id: "p2",
    slug: "white-oak-pastures-heritage-pork",
    name: "Heritage Pork Sausage",
    brand: "White Oak Pastures",
    tagline:
      "From a 5-generation Georgia farm rebuilding a 156-year-old commodity-cotton field into living grassland.",
    description: `White Oak Pastures is the gold standard. They run a closed-loop, zero-waste ranch in Bluffton, Georgia where every animal lives, dies, and is processed on the same land. Their pork is raised on pasture and forest — the way pigs evolved to live.

This sausage is what sausage *was*. The fat renders sweet, the seasoning is restrained, and there's a richness that tells you the animal ate roots, acorns, and grass instead of soy.

Their Life Cycle Assessment showed their beef is **net carbon negative** — the same regenerative approach drives the pork program.`,
    price: 12.5,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "regenerative-pantry",
    affiliateUrl: "https://whiteoakpastures.com/collections/pork",
    merchant: "White Oak Pastures",
    certifications: ["Regenerative Certified", "Pasture-Raised", "Non-GMO"],
    goals: ["performance"],
    rating: 4.9,
    isEditorPick: true,
    isFeatured: false,
    pros: [
      "Holistically managed, zero-waste farm",
      "Animals raised entirely outdoors",
      "Family-owned, 5 generations",
      "Verified carbon-negative beef program",
    ],
    cons: ["Ships frozen — plan freezer space", "Limited cuts in stock"],
    ingredients: "Pork, sea salt, black pepper, sage, rosemary.",
    servingSize: "3 oz (85g)",
  },
  {
    id: "p3",
    slug: "fond-grass-fed-bone-broth",
    name: "Slow-Simmered Bone Broth",
    brand: "Fond",
    tagline:
      "Hand-crafted bone broth from a single Tennessee farm. 18-hour simmer. Real gel.",
    description: `Most "bone broth" in shelf-stable boxes is salty stock. Fond's broth is the real article — cooked low and slow for 18 hours from grass-fed marrow bones, then shipped frozen to lock in collagen.

The test: tip the jar in the fridge. If it doesn't move, it's the real thing. Fond's gels like jello.

We use it as the cooking liquid for rice, as a morning sipper, and as the base for any soup. The flavor is deeply savory without being salt-heavy — they let the bones do the work.`,
    price: 9.75,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "regenerative-pantry",
    affiliateUrl: "https://fondbonebroth.com/collections/all",
    merchant: "Fond",
    certifications: ["Grass-Fed", "Pasture-Raised", "Non-GMO"],
    goals: ["gut", "immunity"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: true,
    pros: [
      "Real collagen — gels solid in the fridge",
      "Tiny-batch, traceable to single farm",
      "Frozen, no preservatives",
    ],
    cons: ["Needs freezer space", "Premium pricing"],
    ingredients: "Grass-fed beef bones, filtered water, sea salt, apple cider vinegar.",
    servingSize: "1 cup (240ml)",
  },
  {
    id: "p4",
    slug: "frantoia-sicilian-olive-oil",
    name: "Single-Estate Sicilian Olive Oil",
    brand: "Frantoia",
    tagline:
      "Stone-milled, cold-pressed Biancolilla olives from an estate at the foot of Monte San Calogero.",
    description: `Most olive oil in American supermarkets fails to meet extra-virgin standards by the time it lands. Frantoia is different — single estate, harvest-dated, and shipped in dark green glass to protect the polyphenols.

The first pour smells like cut grass and green tomato leaf. On bread, it has the peppery throat-burn that signals high oleocanthal — the anti-inflammatory polyphenol Mediterranean diets are famous for.

This isn't cooking oil. This is finishing oil. Drizzle it over white beans, soft-boiled eggs, ripe tomatoes.`,
    price: 38,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "regenerative-pantry",
    affiliateUrl: "https://www.gustiamo.com/products/frantoia",
    merchant: "Gustiamo",
    certifications: ["USDA Organic", "Non-GMO"],
    goals: ["longevity", "skin"],
    rating: 4.9,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "Harvest date printed — always current crop",
      "High polyphenol content",
      "Shipped in protective dark glass",
    ],
    cons: ["Expensive for an everyday cooking oil — use as finisher"],
    ingredients: "100% extra-virgin olive oil (Biancolilla, Cerasuola, Nocellara).",
    servingSize: "1 tbsp (15ml)",
  },
  {
    id: "p5",
    slug: "jovial-einkorn-pasta",
    name: "Organic Einkorn Pasta",
    brand: "Jovial",
    tagline:
      "The world's oldest cultivated wheat — never hybridized, easier on most digestions.",
    description: `Einkorn is the wheat humans were eating 12,000 years ago. It has only 14 chromosomes (modern wheat has 42), a different gluten structure, and a higher protein and carotenoid content. People who feel bloated on pasta often don't on einkorn.

Jovial dries this pasta slowly at low temperatures — the old way — which preserves nutrition and gives the pasta a beautifully textured, sauce-grabbing surface.

The flavor is subtly sweet and nutty. Cook it 1 minute less than you think.`,
    price: 5.99,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "regenerative-pantry",
    affiliateUrl: "https://jovialfoods.com/collections/einkorn-pasta",
    merchant: "Jovial",
    certifications: ["USDA Organic", "Non-GMO"],
    goals: ["gut"],
    rating: 4.6,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "Ancient, non-hybridized grain",
      "Slow-dried at low temperatures",
      "Often tolerated by sensitive eaters",
    ],
    cons: ["Cooks faster than modern pasta — easy to overcook"],
    ingredients: "Organic einkorn wheat flour, water.",
    servingSize: "2 oz (56g) dry",
  },

  // ─────────────────────── SUPERFOODS & ADAPTOGENS ───────────────────────
  {
    id: "p6",
    slug: "four-sigmatic-think-mushroom-coffee",
    name: "Think Mushroom Coffee — Lion's Mane & Chaga",
    brand: "Four Sigmatic",
    tagline:
      "Organic arabica with a real dose of dual-extracted lion's mane and chaga.",
    description: `Four Sigmatic was the brand that legitimized functional mushrooms in coffee. Their Think blend uses **dual-extracted** (water + alcohol) lion's mane and chaga — the only way to get both the water-soluble immune compounds and the fat-soluble triterpenes.

The taste is just good coffee — light roast, smooth, no bitterness. The lion's mane shows up subtly: less mid-morning crash, sustained focus.

If you only buy one functional coffee, buy this one.`,
    price: 19,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "superfoods-adaptogens",
    affiliateUrl: "https://us.foursigmatic.com/products/think-ground-coffee",
    merchant: "Four Sigmatic",
    certifications: ["USDA Organic", "Fair Trade", "Non-GMO"],
    goals: ["focus", "energy", "immunity"],
    rating: 4.7,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "Dual-extracted mushrooms (most brands skip the alcohol step)",
      "Real organic arabica, not instant",
      "Tastes like coffee, not mushrooms",
    ],
    cons: ["Mushroom dose is moderate — not therapeutic"],
    ingredients: "Organic arabica coffee, organic lion's mane extract, organic chaga extract.",
    servingSize: "1 tbsp (~10g)",
  },
  {
    id: "p7",
    slug: "anima-mundi-ceremonial-cacao",
    name: "100% Ceremonial Cacao",
    brand: "Anima Mundi",
    tagline:
      "Stone-ground heirloom Criollo cacao from family farms in Guatemala.",
    description: `Most "cacao" sold in America is industrial cocoa with the fat (and most of the magic) removed. Anima Mundi sources whole heirloom Criollo beans, ferments them traditionally, and stone-grinds them into thick discs that you melt into hot water for a real ceremonial drink.

Theobromine, not caffeine, gives the lift — a slower, warmer, heart-opening kind of energy. People drink this before journaling, before yoga, before hard conversations.

The flavor is wild: floral, slightly fruity, deeply chocolate. Sweeten with honey and a pinch of sea salt.`,
    price: 32,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "superfoods-adaptogens",
    affiliateUrl: "https://animamundiherbals.com/products/cacao",
    merchant: "Anima Mundi",
    certifications: ["USDA Organic", "Fair Trade", "B-Corp"],
    goals: ["focus", "energy"],
    rating: 4.8,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "Heirloom Criollo (not industrial cocoa)",
      "Traceable to small farms",
      "True ceremonial-grade preparation",
    ],
    cons: [
      "Bitter on its own — needs sweetener",
      "Some people are sensitive to theobromine",
    ],
    ingredients: "100% pure stoneground heirloom cacao paste.",
    servingSize: "1 oz (28g)",
  },
  {
    id: "p8",
    slug: "organifi-green-juice",
    name: "Original Green Juice",
    brand: "Organifi",
    tagline:
      "Ashwagandha-spiked greens powder that doesn't taste like a lawn.",
    description: `If you've tried greens powders that taste like fresh-cut grass and a bad gym, Organifi will surprise you. Mint and lemon dominate — the chlorella and spirulina sit underneath.

The standout ingredient is **ashwagandha**: 600mg per serving, enough to actually feel the calm-but-alert effect over 2–3 weeks of use.

Not a meal replacement. A morning add-on for days you don't make it to a real salad.`,
    price: 69.95,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "superfoods-adaptogens",
    affiliateUrl: "https://www.organifi.com/products/green-juice",
    merchant: "Organifi",
    certifications: ["USDA Organic", "Glyphosate-Free", "Non-GMO"],
    goals: ["energy", "immunity", "focus"],
    rating: 4.5,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "Pleasant taste (the rare one)",
      "Real dose of ashwagandha",
      "Glyphosate residue tested",
    ],
    cons: ["Pricier than DIY", "Subscription pressure on site"],
    ingredients:
      "Organic spirulina, chlorella, moringa, ashwagandha, matcha, wheatgrass, beet, turmeric, mint, coconut water, lemon, monk fruit.",
    servingSize: "1 scoop (9g)",
  },

  // ─────────────────────── DAILY SUPPLEMENTS ───────────────────────
  {
    id: "p9",
    slug: "thorne-basic-nutrients-2-day",
    name: "Basic Nutrients 2/Day",
    brand: "Thorne",
    tagline: "The clinician-favorite multivitamin in its cleanest form.",
    description: `Thorne is the brand that gets quietly recommended by functional-medicine doctors, and Basic Nutrients 2/Day is the entry point. It's not a kitchen-sink multivitamin — it's a tightly-formulated foundation:

- Methylated B vitamins (5-MTHF folate, methylcobalamin B12)
- Real bioavailable forms of magnesium, zinc, selenium, chromium
- No iron (so men and post-menopausal women don't over-accumulate)
- No fillers, no artificial colors, NSF Certified for Sport

Two capsules a day. That's the whole pitch.`,
    price: 27,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "daily-supplements",
    affiliateUrl: "https://www.thorne.com/products/dp/basic-nutrients-2-day",
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["energy", "longevity", "immunity"],
    rating: 4.8,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "Methylated B vitamins (helps people with MTHFR variants)",
      "NSF Certified for Sport — banned-substance tested",
      "Iron-free formulation",
    ],
    cons: ["Capsules are large", "No iron — get separately if needed"],
    ingredients:
      "Vitamins A, C, D3, E, K1+K2, B-complex (methylated), calcium, magnesium, zinc, selenium, chromium, molybdenum, boron.",
    servingSize: "2 capsules",
  },
  {
    id: "p10",
    slug: "rosita-extra-virgin-cod-liver-oil",
    name: "Extra Virgin Cod Liver Oil",
    brand: "Rosita",
    tagline:
      "Raw, never heated. Cod-liver oil the way our grandparents took it.",
    description: `Most fish oils are molecularly distilled, deodorized, and rancid by the time they reach you. Rosita is one of the only brands making **raw** cod liver oil — the livers are cold-extracted and the oil never sees heat or solvents.

The result is a buttery, slightly fishy oil that comes with naturally-occurring vitamins A and D in their food-form ratio (the way nature made them, not synthetically added).

If you've taken fish oil capsules and wondered why the studies don't replicate, this is why. This is the real article.`,
    price: 65,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1624362772755-4d5843e67047?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "daily-supplements",
    affiliateUrl: "https://corganic.com/collections/rosita",
    merchant: "Corganic",
    certifications: ["Wild-Caught", "Third-Party Tested"],
    goals: ["longevity", "skin", "immunity"],
    rating: 4.9,
    isEditorPick: true,
    isFeatured: false,
    pros: [
      "Raw, never heated or chemically processed",
      "Naturally-occurring vitamins A & D",
      "Wild Norwegian Atlantic cod",
    ],
    cons: ["Fishy taste — chase with water", "Premium price"],
    ingredients: "Wild-caught Atlantic cod liver oil, organic rosemary extract.",
    servingSize: "1 tsp (5ml)",
  },
  {
    id: "p11",
    slug: "lmnt-electrolytes",
    name: "Recharge Electrolyte Drink Mix",
    brand: "LMNT",
    tagline:
      "Salt, the way your body actually uses it. No sugar, no junk.",
    description: `LMNT cracks one of the most misunderstood pillars of hydration: most people are **under-salted**, especially anyone on low-carb, intermittent fasting, training in the heat, or just sweating in a normal life.

Each stick has 1000mg sodium, 200mg potassium, 60mg magnesium. Zero sugar, zero food coloring, zero gums. The flavors taste like tart fruit + ocean — better than expected.

Ignore the pseudo-medical claims on the internet about "salt loading" — but if you train hard or fast, this is a tool you'll feel.`,
    price: 45,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1693996046865-19217d179161?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "daily-supplements",
    affiliateUrl: "https://drinklmnt.com/collections/all",
    merchant: "LMNT",
    certifications: ["Non-GMO", "Third-Party Tested"],
    goals: ["performance", "energy"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: true,
    pros: ["Real electrolyte ratios", "No sugar or fake colors", "Sample pack available"],
    cons: ["Salty — takes adjustment", "Not for low-sodium diets"],
    ingredients:
      "Sodium chloride, potassium chloride, magnesium malate, citric acid, natural flavors, stevia.",
    servingSize: "1 stick (~6g)",
  },

  // ─────────────────────── LONGEVITY & PERFORMANCE ───────────────────────
  {
    id: "p12",
    slug: "momentous-creatine",
    name: "Creatine Monohydrate",
    brand: "Momentous",
    tagline:
      "The most-studied supplement in human history, in its proven form.",
    description: `Creatine monohydrate is the rare supplement with hundreds of randomized trials behind it: more strength, more lean mass, better recovery, **and** evidence for cognitive benefit, especially under stress and sleep deprivation.

Don't fall for "creatine HCL" or "buffered" creatine — monohydrate is what worked in the studies and what works in your body.

Momentous uses Creapure®, the German-made monohydrate that's been third-party tested in studies. NSF Certified for Sport. 5g per scoop. Mixes clear in water.`,
    price: 39.95,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1704650312191-005ab02786f5?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "longevity-performance",
    affiliateUrl: "https://www.livemomentous.com/products/creatine",
    merchant: "Momentous",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["performance", "longevity", "focus"],
    rating: 4.9,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "Creapure® — the gold-standard creatine source",
      "NSF Certified for Sport",
      "Clinical 5g dose",
    ],
    cons: ["Slight bloat in week 1 for some", "Premium price for a commodity ingredient"],
    ingredients: "Creapure® creatine monohydrate.",
    servingSize: "1 scoop (5g)",
  },
  {
    id: "p13",
    slug: "tru-niagen-nicotinamide-riboside",
    name: "Tru Niagen® Nicotinamide Riboside",
    brand: "Tru Niagen",
    tagline:
      "The patented NAD+ precursor backed by the most clinical research.",
    description: `NAD+ is a coenzyme central to mitochondrial function and DNA repair. Levels drop with age. Tru Niagen's nicotinamide riboside (NR) is the form with the deepest research bench — multiple human RCTs showing it raises blood NAD+ levels significantly.

This is the form Elysium, ChromaDex, and several major longevity labs work with. It's not a magic bullet, but if you're stacking longevity inputs, NR is one of the best-evidenced.

Take with food. Stack with creatine, omega-3, and a real sleep practice.`,
    price: 49,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "longevity-performance",
    affiliateUrl: "https://www.truniagen.com/products/tru-niagen",
    merchant: "Tru Niagen",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["longevity", "energy"],
    rating: 4.6,
    isEditorPick: false,
    isFeatured: true,
    pros: [
      "Most-researched NAD+ precursor",
      "Patented Niagen® (ChromaDex) ingredient",
      "Stable, well-tolerated",
    ],
    cons: ["Effects are subtle, long-horizon", "Expensive over time"],
    ingredients: "Niagen® (nicotinamide riboside chloride) 300mg.",
    servingSize: "1 capsule",
  },
  {
    id: "p14",
    slug: "mind-lab-pro-nootropic",
    name: "Mind Lab Pro® Universal Nootropic",
    brand: "Mind Lab Pro",
    tagline: "11 evidence-backed nootropics. No caffeine. No proprietary blends.",
    description: `The nootropic shelf is mostly hype. Mind Lab Pro is the rare formula that lists every ingredient at a clinical dose and skips the proprietary blend trick.

Inside: Citicoline (250mg), Bacopa monnieri 24% bacosides, Lion's Mane fruit + mycelium, Phosphatidylserine, N-Acetyl-L-Tyrosine, L-Theanine, Rhodiola rosea, Maritime Pine Bark Extract, B6/B9/B12.

Effects build over 2–4 weeks. People report cleaner focus during deep work, less afternoon fog, and better verbal recall. No jitter, no crash.`,
    price: 69,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "longevity-performance",
    affiliateUrl: "https://www.mindlabpro.com/",
    merchant: "Mind Lab Pro",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["focus", "longevity"],
    rating: 4.5,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "Fully transparent dosing — no prop blends",
      "Caffeine-free",
      "Stack of 11 evidence-backed nootropics",
    ],
    cons: ["Effects are subtle", "Expensive monthly cost"],
    ingredients:
      "Citicoline, bacopa, lion's mane, phosphatidylserine, NALT, L-theanine, rhodiola, maritime pine bark, B6, B9, B12.",
    servingSize: "2 capsules",
  },

  // ─────────────────────── GUT & IMMUNITY ───────────────────────
  {
    id: "p15",
    slug: "seed-ds-01-daily-synbiotic",
    name: "DS-01® Daily Synbiotic",
    brand: "Seed",
    tagline:
      "24 strains, 53.6 billion AFU, in a viability-protected capsule that actually reaches your gut.",
    description: `Most probiotics die in stomach acid before they get anywhere useful. Seed's DS-01 uses a **two-capsule** delivery system — the strain capsule sits inside a prebiotic outer capsule that protects it through the stomach.

24 clinically and scientifically-studied strains, dosed at AFU (active fluorescent units, more accurate than CFU). Strains like *L. plantarum* SD-LP1 and *B. lactis* HN019 are individually evidence-backed.

Take in the morning, on an empty stomach, with water. Give it 4 weeks.`,
    price: 49.99,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "gut-immunity",
    affiliateUrl: "https://seed.com/daily-synbiotic",
    merchant: "Seed",
    certifications: ["Third-Party Tested", "Non-GMO", "B-Corp"],
    goals: ["gut", "immunity", "skin"],
    rating: 4.7,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "Patented capsule-in-capsule delivery",
      "AFU dosing — survives transit",
      "Clinically-studied individual strains",
    ],
    cons: ["Requires monthly subscription", "Not cheap"],
    ingredients:
      "24 probiotic strains across Lactobacillus, Bifidobacterium, others. Pomegranate prebiotic compound.",
    servingSize: "2 capsules",
  },
  {
    id: "p16",
    slug: "armra-colostrum",
    name: "Colostrum™ Premium Powder",
    brand: "ARMRA",
    tagline:
      "Bovine colostrum — the immune-rich first milk. Concentrated for daily use.",
    description: `Colostrum is the first milk a mammal produces — packed with immunoglobulins, lactoferrin, and growth factors that build the newborn's immune system. ARMRA concentrates colostrum from grass-fed dairy cows, removing fat and lactose so what's left is the bioactive payload.

Subjective effects: more resilient gut on travel, faster recovery from illness, healthier hair and skin. The published research on lactoferrin in particular is increasingly compelling.

Mix into water or coffee. Slightly malty taste.`,
    price: 110,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "gut-immunity",
    affiliateUrl: "https://tryarmra.com/products/colostrum",
    merchant: "ARMRA",
    certifications: ["Grass-Fed", "Third-Party Tested"],
    goals: ["gut", "immunity", "skin"],
    rating: 4.6,
    isEditorPick: false,
    isFeatured: true,
    pros: [
      "From grass-fed US dairy cooperatives",
      "Removes fat & lactose — concentrated bioactives",
      "High lactoferrin content",
    ],
    cons: ["Expensive", "Dairy-derived (not for vegans)"],
    ingredients: "100% bovine colostrum (concentrated).",
    servingSize: "1 stick (1g)",
  },

  // ─────────────────────── SKIN & BEAUTY ───────────────────────
  {
    id: "p17",
    slug: "vintners-daughter-active-botanical-serum",
    name: "Active Botanical Serum",
    brand: "Vintner's Daughter",
    tagline:
      "22 active botanicals. Three-week phyto-radiance infusion. The cult facial oil.",
    description: `It's $195 for an ounce. It's also the facial oil that has accumulated more genuine word-of-mouth credibility than any other product in clean beauty. Founder April Gargiulo developed the formula by adapting Old World winemaking technique — a 21-day "phyto-radiance infusion" that extracts active compounds from 22 organic botanicals into organic seed oils.

Three drops on damp skin, morning or night. Skin feels supple, looks denser, takes makeup beautifully. The scent is herbal and grounding — calendula, lavender, rosemary.

A little goes a long way. The bottle lasts months.`,
    price: 195,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "skin-beauty",
    affiliateUrl: "https://vintnersdaughter.com/products/active-botanical-serum",
    merchant: "Vintner's Daughter",
    certifications: ["USDA Organic", "Non-GMO", "B-Corp"],
    goals: ["skin"],
    rating: 4.8,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "22 botanicals at active concentrations",
      "Hand-made small batches",
      "Lasts 3–6 months despite cost",
    ],
    cons: ["The price is real", "Strong herbal scent — not for everyone"],
    ingredients:
      "Organic Phyto Radiance Infusion (22 botanicals in grape seed, hazelnut, sweet almond, sesame, jojoba, olive, rosehip, apricot kernel, hemp seed oils).",
    servingSize: "3 drops",
  },
  {
    id: "p18",
    slug: "osea-undaria-algae-body-oil",
    name: "Undaria Algae Body Oil",
    brand: "OSEA",
    tagline:
      "Hand-harvested Patagonian seaweed in a body oil that genuinely firms skin.",
    description: `OSEA's signature body oil uses *Undaria pinnatifida* — a brown seaweed wild-harvested by hand in Patagonia — infused into seed oils for an unusually nourishing post-shower oil.

Skin texture changes after 4–6 weeks. Less crepey, more dewy. The cypress and lavender essential oil scent is grounding without being heavy.

Apply to damp skin straight out of the shower for max absorption.`,
    price: 56,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1713768704571-6aeb0d0e5105?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "skin-beauty",
    affiliateUrl: "https://oseamalibu.com/products/undaria-algae-body-oil",
    merchant: "OSEA",
    certifications: ["B-Corp", "Non-GMO"],
    goals: ["skin"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "Hand-harvested Patagonian seaweed",
      "Vegan, plant-based",
      "Real visible firming over 4–6 weeks",
    ],
    cons: ["Strong cypress scent — sample first if scent-sensitive"],
    ingredients:
      "Sunflower seed oil, sweet almond oil, açaí, undaria pinnatifida (algae), essential oils.",
    servingSize: "Generous palm-full",
  },

  // ─────────────────────── HOME & KITCHEN ───────────────────────
  {
    id: "p19",
    slug: "stargazer-cast-iron-skillet",
    name: "12-inch Cast Iron Skillet",
    brand: "Stargazer",
    tagline:
      "Made in the USA. Machined-smooth surface. The cast iron you'll keep for life.",
    description: `Most cast iron is sand-cast and rough. Stargazer machines the cooking surface to a glassy smoothness — the result is a cast iron pan that releases food like a non-stick from day one.

A balanced helper handle, a long ergonomic primary handle, and a flared lip that pours cleanly. Pre-seasoned with grapeseed oil. Made in Pennsylvania.

Buy this, take care of it, hand it down. There's nothing else to say.`,
    price: 145,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "home-kitchen",
    affiliateUrl: "https://stargazercastiron.com/collections/cast-iron-skillets",
    merchant: "Stargazer",
    certifications: [],
    goals: [],
    rating: 4.9,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "Machined-smooth cooking surface",
      "Made in USA — small Pennsylvania foundry",
      "Lifetime piece",
    ],
    cons: ["Heavy (7+ lbs)", "Pricier than commodity cast iron"],
    ingredients: "Cast iron, grapeseed oil seasoning.",
    servingSize: "—",
  },
  {
    id: "p20",
    slug: "aquatru-reverse-osmosis-water-filter",
    name: "Countertop Reverse Osmosis System",
    brand: "AquaTru",
    tagline:
      "Real reverse osmosis. No plumbing. Removes 80+ contaminants including PFAS.",
    description: `Most countertop pitchers reduce chlorine taste and not much else. AquaTru is a true 4-stage reverse osmosis system that removes lead, chromium-6, PFAS ("forever chemicals"), fluoride, microplastics, pharmaceuticals, and pesticide residues — independently tested per NSF/ANSI 42, 53, 58, 401, and P473.

It's about the size of a coffee maker. Plug it in, fill the tank, fill your glass. No plumbing.

If you only buy one wellness product this year, make it the water you put in your body 8+ times a day.`,
    price: 449,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "home-kitchen",
    affiliateUrl: "https://aquatruwater.com/products/aquatru-classic",
    merchant: "AquaTru",
    certifications: ["Third-Party Tested"],
    goals: ["longevity", "immunity"],
    rating: 4.8,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "Removes PFAS, lead, fluoride, microplastics",
      "No plumbing — countertop install",
      "NSF certified for major contaminant categories",
    ],
    cons: ["Counter footprint", "Filter replacements add up over years"],
    ingredients: "—",
    servingSize: "—",
  },
  {
    id: "p21",
    slug: "made-in-stainless-clad-saucepan",
    name: "5-Ply Stainless Clad Saucepan",
    brand: "Made In",
    tagline:
      "Five-layer stainless made in Italy and France. The professional kitchen standard.",
    description: `Made In partners with multi-generational European cookware factories to make 5-ply stainless that out-performs All-Clad at a lower price. The 2-quart saucepan is the workhorse — sauces, grains, blanching, melting butter, reducing stock.

Even heating, perfect pour lip, comfortable handle, oven-safe to 800°F. Made in Italy.

If your last pan was a coated non-stick that you've now learned to be wary of, this is the upgrade.`,
    price: 99,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1612293905904-d45b1e5d0960?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "home-kitchen",
    affiliateUrl: "https://madeincookware.com/products/saucepan",
    merchant: "Made In",
    certifications: [],
    goals: [],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "5-ply construction — even heat",
      "Made in Italy",
      "No coatings — last for decades",
    ],
    cons: ["Stainless requires technique to avoid sticking"],
    ingredients: "Stainless steel (5-ply with aluminum core).",
    servingSize: "—",
  },

  // ─────────────────────── MINDFUL LIVING ───────────────────────
  {
    id: "p22",
    slug: "beam-dream-powder",
    name: "Dream Powder Hot Cocoa",
    brand: "Beam",
    tagline:
      "Reishi, magnesium, L-theanine, melatonin — in a hot cocoa that actually tastes like cocoa.",
    description: `Beam's Dream stack is one of the smartest sleep formulations on the market: real reishi extract (not just powder), magnesium glycinate (the chelated form), L-theanine, and a low dose of melatonin (0.3mg — physiological, not the megadose most brands push).

Mix into hot water or warm milk 30 minutes before bed. The cocoa flavor is genuinely good — no artificial sweetness.

Sleep onset comes faster. Mornings feel less foggy than with high-dose melatonin.`,
    price: 65,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "mindful-living",
    affiliateUrl: "https://shopbeam.com/products/dream",
    merchant: "Beam",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["sleep"],
    rating: 4.6,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "Low-dose melatonin (0.3mg, physiological)",
      "Reishi + magnesium glycinate stack",
      "Tastes like a real hot chocolate",
    ],
    cons: ["Sweetened with stevia + monk fruit (love-it-or-hate-it)"],
    ingredients:
      "Reishi extract, magnesium glycinate, L-theanine, apigenin, melatonin, organic cacao, monk fruit, stevia.",
    servingSize: "1 scoop (~8g)",
  },
  {
    id: "p23",
    slug: "hatch-restore-2",
    name: "Restore 2 Sunrise Alarm",
    brand: "Hatch",
    tagline:
      "Wakes you with light, not sound. Personalizable wind-down rituals.",
    description: `Hatch's Restore 2 is a sunrise alarm clock that gradually brightens 30 minutes before your wake time, mimicking dawn. It's also a sound machine, a reading light, and a wind-down ritual coach with breathwork programs.

The phone-out-of-the-bedroom move is one of the most under-rated sleep habits. Restore 2 makes it possible without losing your alarm.

The light is warm, not blue. The dimmer goes low enough to not disturb a partner.`,
    price: 199.99,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "mindful-living",
    affiliateUrl: "https://www.hatch.co/restore",
    merchant: "Hatch",
    certifications: [],
    goals: ["sleep"],
    rating: 4.5,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "Sunrise wake — gentler than alarm sound",
      "Replaces phone in bedroom",
      "Sound machine + reading light all-in-one",
    ],
    cons: [
      "Some premium sounds are paywalled",
      "App required for full functionality",
    ],
    ingredients: "—",
    servingSize: "—",
  },
  {
    id: "p24",
    slug: "moon-juice-magnesi-om",
    name: "Magnesi-Om Berry",
    brand: "Moon Juice",
    tagline:
      "Three forms of magnesium + L-theanine. The magnesium drink to actually stick with.",
    description: `Magnesium is the most-recommended-and-least-actually-taken-consistently mineral on the wellness shelf. Moon Juice's Magnesi-Om combines three forms — gluconate, citrate, and acetyl-taurate — at 310mg total per serving, plus L-theanine for calm-but-alert focus.

The pink berry flavor mixes clear in water and tastes like a treat. We use it as an evening wind-down drink.

Pairs well with Beam Dream for sleep, or stands alone as a daytime magnesium support.`,
    price: 42,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "mindful-living",
    affiliateUrl: "https://moonjuice.com/products/magnesi-om",
    merchant: "Moon Juice",
    certifications: ["Non-GMO", "Third-Party Tested"],
    goals: ["sleep", "focus"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: true,
    pros: [
      "Three bioavailable forms of magnesium",
      "Genuinely good berry flavor",
      "L-theanine for calm focus",
    ],
    cons: ["Premium price for magnesium"],
    ingredients:
      "Magnesium gluconate, citrate, acetyl-taurate (310mg total). L-theanine. Natural berry flavor.",
    servingSize: "1 tsp (~3g)",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}

export function getEditorPicks(limit = 4) {
  return products.filter((p) => p.isEditorPick).slice(0, limit);
}

export function getFeatured(limit = 8) {
  return products.filter((p) => p.isFeatured).slice(0, limit);
}

export function getRelatedProducts(slug: string, limit = 4) {
  const p = getProductBySlug(slug);
  if (!p) return [];
  return products
    .filter((x) => x.categorySlug === p.categorySlug && x.slug !== slug)
    .slice(0, limit);
}