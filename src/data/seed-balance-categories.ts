import type { Product } from "./types";

/**
 * Balancing seed: fills out the under-populated categories so every
 * aisle has enough depth to feel like a real shop instead of a
 * "coming soon" placeholder.
 *
 * Targets: home-kitchen (was 3), skin-beauty (was 11), superfoods-adaptogens
 * (was 7), mindful-living (richer non-Thorne picks).
 *
 * Idempotent INSERT OR IGNORE — safe to re-run.
 */

export const balanceCategories: Product[] = [
  // ─────────────────────────── HOME & KITCHEN ───────────────────────────
  {
    id: "p-bk-our-place-always-pan",
    slug: "our-place-always-pan",
    name: "Always Pan 2.0",
    brand: "Our Place",
    tagline:
      "Eight pans in one — toxin-free non-stick that replaces an entire cabinet.",
    description: `Our Place's Always Pan replaces a fry pan, sauté pan, steamer, skillet, saucier, saucepan, non-stick pan, spatula, and spoon rest. The 2.0 version uses their **Thermakind™** ceramic-based non-stick — no PFOA, no PFAS, no PTFE, no lead, no cadmium.

We've used the original for two years and the new ceramic coating handles eggs better than the first generation, deglazes cleanly, and oven-safe to 450°F. Thoughtful design: the lid doubles as a steamer basket; the wood spoon nests in the side; the modular handle works for left- and right-handers.

A solid one-pan kitchen for renters, beginners, or anyone trying to detox a Teflon-heavy cabinet.`,
    price: 155,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "home-kitchen",
    affiliateUrl: "https://fromourplace.com/products/the-always-pan",
    merchant: "Our Place",
    certifications: ["Non-GMO"],
    goals: [],
    rating: 4.6,
    isEditorPick: false,
    isFeatured: true,
    pros: [
      "Truly PFAS-, PFOA-, PTFE-, lead-, and cadmium-free",
      "Replaces 8 pieces of cookware",
      "Oven-safe to 450°F · genuinely good non-stick",
    ],
    cons: [
      "Ceramic coatings still wear faster than stainless or cast iron",
      "Pricier than commodity ceramic non-stick",
    ],
    ingredients: "Aluminum core, Thermakind™ ceramic non-stick coating.",
    servingSize: "—",
  },
  {
    id: "p-bk-berkey-water-filter",
    slug: "big-berkey-gravity-filter",
    name: "Big Berkey Gravity Water Filter",
    brand: "Berkey",
    tagline:
      "Gravity-fed countertop filter that pulls 99.9%+ of contaminants without electricity or plumbing.",
    description: `The Big Berkey is the off-grid water filter. Stainless body, two Black Berkey elements, and gravity does the rest — independently tested to remove fluoride, lead, chlorine, chloramine, glyphosate, pharmaceutical residues, viruses (yes, viruses), and most heavy metals.

We keep one on the counter as our daily filter and a backup for power outages. The Black Berkey elements last 6,000 gallons each — that's roughly 11 years of typical household use before replacement.

Slower than a reverse-osmosis system, but no plumbing, no power, and it earns its place in any pantry.`,
    price: 387,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "home-kitchen",
    affiliateUrl: "https://www.berkeyfilters.com/products/big-berkey",
    merchant: "Berkey",
    certifications: ["Third-Party Tested"],
    goals: ["longevity", "immunity"],
    rating: 4.8,
    isEditorPick: false,
    isFeatured: true,
    pros: [
      "Tested against 200+ contaminants including fluoride and PFAS",
      "Works without electricity or plumbing",
      "Filter elements last ~11 years of typical use",
    ],
    cons: ["Larger countertop footprint", "Slower flow than a tap or RO system"],
    ingredients: "304 stainless steel housing, Black Berkey elements.",
    servingSize: "—",
  },
  {
    id: "p-bk-vitamix-a3500",
    slug: "vitamix-a3500-blender",
    name: "Vitamix Ascent A3500 Blender",
    brand: "Vitamix",
    tagline:
      "The blender every restaurant uses. A 10-year piece that earns its price.",
    description: `If you're going to live on smoothies, soups, sauces, and homemade nut milks, buy the right blender once. The A3500 is Vitamix's flagship: 1,500-watt motor, hardened stainless blades, five preset programs, and a 10-year full warranty.

We blend frozen wild blueberries, raw cashews, ginger root, leafy greens, and ice cubes daily — it has not slowed down once in five years. Self-clean takes 60 seconds.

Worth every dollar for anyone trying to cook at home more, or escape a blender-of-the-year cycle.`,
    price: 649,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "home-kitchen",
    affiliateUrl: "https://www.vitamix.com/us/en_us/shop/a3500",
    merchant: "Vitamix",
    certifications: [],
    goals: [],
    rating: 4.9,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "10-year full warranty",
      "Powerful enough for nut butters, soups, frozen smoothies",
      "Holds value — secondhand market still pays half-retail",
    ],
    cons: ["Tall — won't fit under low cabinets", "Loud at full speed"],
    ingredients: "—",
    servingSize: "—",
  },
  {
    id: "p-bk-john-boos-cutting-board",
    slug: "john-boos-maple-cutting-board",
    name: "End-Grain Maple Cutting Board",
    brand: "John Boos",
    tagline:
      "American hardwood, end-grain construction. The board chefs cut on for 20 years.",
    description: `End-grain maple is the gold standard for cutting boards: blade edges slip *between* the wood fibers rather than slicing across them, which keeps your knives sharper longer and the board looking new for decades.

John Boos has been making these in Effingham, Illinois since 1887. We treat ours with their bee oil + cream every few months and the patina just gets better.

A real cutting board is one of those small upgrades that quietly raises the quality of every meal you cook.`,
    price: 145,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "home-kitchen",
    affiliateUrl: "https://www.johnboos.com/cutting-boards",
    merchant: "John Boos",
    certifications: [],
    goals: [],
    rating: 4.8,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "End-grain construction extends knife life",
      "Made in USA from sustainable maple",
      "Easy to refinish — lasts a generation",
    ],
    cons: ["Heavy", "Hand wash and oil regularly"],
    ingredients: "Hard rock maple, food-safe bee oil & cream.",
    servingSize: "—",
  },
  {
    id: "p-bk-weston-glass-jars",
    slug: "weston-mason-jar-set",
    name: "Wide-Mouth Mason Jars (12-pack)",
    brand: "Ball",
    tagline:
      "The most useful 30-dollar purchase in the kitchen. Bulk pantry, leftovers, ferments, infusions, salads.",
    description: `Glass storage is the slow-burn upgrade most kitchens are missing. Plastic containers leach phthalates over time, especially when re-heated. Mason jars don't.

We use ours for: bulk pantry items (oats, beans, salt, flour), leftover soups, fermenting kraut, infusing apple-cider vinegar, taking lunch to go, and turning gallons of bone broth into stackable freezer-safe portions.

Stick a chalkboard label on each lid. Forget Tupperware ever existed.`,
    price: 30,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "home-kitchen",
    affiliateUrl: "https://www.freshpreserving.com",
    merchant: "Ball",
    certifications: [],
    goals: [],
    rating: 4.9,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "Plastic-free food storage",
      "Freezer- and microwave-safe (without lids)",
      "Cheap and replaceable",
    ],
    cons: ["Heavier than plastic", "Lids will rust over years of use"],
    ingredients: "Soda-lime glass, two-piece metal lids.",
    servingSize: "—",
  },
  {
    id: "p-bk-iqair-healthpro-plus",
    slug: "iqair-healthpro-plus-air-purifier",
    name: "HealthPro Plus HEPA Air Purifier",
    brand: "IQAir",
    tagline:
      "Hospital-grade HyperHEPA captures down to 0.003 microns — 100x finer than standard HEPA.",
    description: `Indoor air quality is one of the highest-leverage health interventions most people overlook. The HealthPro Plus uses HyperHEPA filtration tested down to 0.003 microns — small enough to capture viruses, ultrafine wildfire smoke, mold spores, VOCs, and allergens that standard HEPA misses.

Made in Switzerland, used in hospitals and research labs. The fan speeds are quiet enough to leave on 24/7 in a bedroom; we keep one in the room of any new baby in the family.

Filters last 2–4 years before replacement, depending on use.`,
    price: 949,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "home-kitchen",
    affiliateUrl: "https://www.iqair.com/us/air-purifiers/healthpro-plus",
    merchant: "IQAir",
    certifications: ["Third-Party Tested"],
    goals: ["longevity", "immunity"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "HyperHEPA — 100x finer than standard HEPA",
      "Tested for viruses, wildfire smoke, ultrafines",
      "Made in Switzerland · 10-year typical lifespan",
    ],
    cons: ["Investment-tier price", "Filters cost ~$200 every 2–4 years"],
    ingredients: "—",
    servingSize: "—",
  },

  // ─────────────────────────── SUPERFOODS & ADAPTOGENS ───────────────────────────
  {
    id: "p-sf-foursigmatic-lions-mane-elixir",
    slug: "four-sigmatic-lions-mane-elixir",
    name: "Lion's Mane Mushroom Elixir",
    brand: "Four Sigmatic",
    tagline:
      "Single-origin, dual-extracted lion's mane in a sachet. The cleanest nootropic on the shelf.",
    description: `Most mushroom supplements are mycelium grown on grain — cheap, but lacking the beta-glucans that drive the actual cognitive effects. Four Sigmatic uses **fruiting body extracts** (not mycelium) and dual-extracts in both hot water and alcohol so you get the full spectrum of bioactives.

Mix one sachet into hot water for a clean, slightly nutty cup that pairs well with morning coffee. We notice cleaner focus during writing-heavy days within ~45 minutes.

Organic, dual-extracted, third-party tested for heavy metals. The bar.`,
    price: 28,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "superfoods-adaptogens",
    affiliateUrl: "https://us.foursigmatic.com/products/lions-mane-elixir",
    merchant: "Four Sigmatic",
    certifications: ["USDA Organic", "Third-Party Tested", "Non-GMO"],
    goals: ["focus", "longevity"],
    rating: 4.6,
    isEditorPick: false,
    isFeatured: true,
    pros: [
      "Fruiting body — not mycelium-on-grain",
      "Dual extraction (water + alcohol)",
      "Tested for heavy metals every batch",
    ],
    cons: ["Sachet packaging not the most sustainable", "Effects build over weeks, not minutes"],
    ingredients:
      "Organic Lion's Mane mushroom dual extract, organic peppermint, mint extract, organic stevia.",
    servingSize: "1 sachet",
  },
  {
    id: "p-sf-host-defense-stamets-7",
    slug: "host-defense-stamets-7",
    name: "Stamets 7® Daily Mushroom Stack",
    brand: "Host Defense",
    tagline:
      "Paul Stamets' personal stack — 7 mushroom species for full-spectrum immune and cognitive support.",
    description: `Paul Stamets is the most respected mycologist on the planet, and this is the formula he takes himself. Seven species — Royal Sun Blazei, Cordyceps, Reishi, Maitake, Lion's Mane, Chaga, and Mesima — all grown on certified-organic brown rice in his Washington lab.

Used together, the stack covers the major mushroom mechanisms: immune modulation (Reishi, Maitake), cognitive (Lion's Mane), endurance (Cordyceps), antioxidant (Chaga), and the lesser-known Mesima for liver support.

We take 2 capsules in the morning, year-round.`,
    price: 47,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "superfoods-adaptogens",
    affiliateUrl: "https://hostdefense.com/products/stamets-7-extract",
    merchant: "Host Defense",
    certifications: ["USDA Organic", "Non-GMO"],
    goals: ["immunity", "longevity", "focus"],
    rating: 4.7,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "7 mushroom species — full-spectrum coverage",
      "USDA Organic, Non-GMO Project verified",
      "Founder is a credible mycologist with peer-reviewed research",
    ],
    cons: ["Pricier than single-species formulas", "Capsules — no flavor variants"],
    ingredients:
      "Organic mycelium and fruiting body extracts of 7 mushroom species, dried at low temperature on certified organic brown rice.",
    servingSize: "2 capsules",
  },
  {
    id: "p-sf-ka-pai-spirulina",
    slug: "kapai-spirulina-tablets",
    name: "Pure New Zealand Spirulina (Tablets)",
    brand: "Kāpai",
    tagline:
      "Single-origin spirulina from a closed-system farm in Marlborough, NZ. The cleanest supply chain we've found.",
    description: `Most spirulina is grown in open-pond Chinese facilities and contaminated with heavy metals at levels we don't love. Kāpai is grown in a closed-loop, glass-house facility in New Zealand — fed alpine spring water, harvested by hand, dried at low temperature.

The result is a clean, single-origin powder you can take in tablet form without the pond-water aftertaste.

Independent batch testing for lead, cadmium, mercury, arsenic, and microcystins. Posted publicly.`,
    price: 36,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "superfoods-adaptogens",
    affiliateUrl: "https://kapaipuku.com",
    merchant: "Kāpai",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["energy", "immunity"],
    rating: 4.5,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "Closed-system grown — no open pond contamination",
      "Heavy metal panel published every batch",
      "Single-origin from one NZ farm",
    ],
    cons: ["More expensive than commodity spirulina", "Tablets — not a powder"],
    ingredients: "100% Arthrospira platensis (spirulina), grown in NZ.",
    servingSize: "6 tablets",
  },
  {
    id: "p-sf-organifi-red-juice",
    slug: "organifi-red-juice",
    name: "Red Juice (Pomegranate · Beet · Berry)",
    brand: "Organifi",
    tagline:
      "11 organic superfoods for endurance and circulation. Beet-based, no added sugar, no stevia.",
    description: `Where Organifi Green Juice is the morning ritual, the Red Juice is the pre-workout. Organic beetroot, pomegranate, raspberry, blueberry, strawberry, cranberry, cordyceps, and reishi — supporting nitric-oxide production, vascular health, and ATP recovery.

We've used it for the last year before long runs and saw a measurable improvement on heart-rate-variability mornings after.

Stevia-free (a request many readers have made). Naturally sweet from beet and berries.`,
    price: 70,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "superfoods-adaptogens",
    affiliateUrl: "https://www.organifi.com/products/red-juice",
    merchant: "Organifi",
    certifications: ["USDA Organic", "Non-GMO"],
    goals: ["performance", "energy", "longevity"],
    rating: 4.5,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "Stevia-free · no added sugar",
      "Real beet root, not just beet flavor",
      "Includes cordyceps + reishi for endurance",
    ],
    cons: ["Pricey per serving", "Earthy beet taste isn't for everyone"],
    ingredients:
      "Organic pomegranate, raspberry, blueberry, strawberry, cranberry, beet root, acai, cordyceps, reishi, rhodiola.",
    servingSize: "1 scoop",
  },
  {
    id: "p-sf-cymbiotika-glutathione",
    slug: "cymbiotika-liposomal-glutathione",
    name: "Liposomal Glutathione",
    brand: "Cymbiotika",
    tagline:
      "Master antioxidant in a liposomal delivery — actually absorbed, not flushed.",
    description: `Glutathione is the body's master antioxidant — but oral glutathione is famously hard to absorb. Cymbiotika encapsulates it in **phosphatidylcholine liposomes**, which protect the molecule through digestion so it actually reaches the bloodstream.

Independently tested for purity, no stevia, no artificial sweeteners. Citrus-vanilla flavor that doesn't taste like a supplement.

We take a pump under the tongue most mornings — visibly clearer skin and less inflammation in the first month.`,
    price: 65,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "superfoods-adaptogens",
    affiliateUrl: "https://cymbiotika.com/products/liposomal-glutathione",
    merchant: "Cymbiotika",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["longevity", "skin", "immunity"],
    rating: 4.6,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "Liposomal — actually absorbed",
      "Stevia-free, no artificial sweeteners",
      "Pleasant citrus-vanilla flavor",
    ],
    cons: ["Premium price point", "Requires refrigeration after opening"],
    ingredients:
      "Setria® L-glutathione, phosphatidylcholine, organic vegetable glycerin, deionized water, natural flavors, citric acid.",
    servingSize: "1 pump (~5 mL)",
  },
  {
    id: "p-sf-pukka-three-tulsi",
    slug: "pukka-three-tulsi-tea",
    name: "Three Tulsi Adaptogenic Tea",
    brand: "Pukka",
    tagline:
      "Three varieties of holy basil in one cup. The most underrated adaptogen for stress.",
    description: `Tulsi (holy basil) is one of the most studied adaptogens in Ayurveda — calming, anti-inflammatory, and supportive of healthy cortisol response. Pukka uses three varieties in this blend: Rama, Krishna, and Vana.

Organic, fair-for-life certified, packaged in compostable bags. We brew a cup mid-afternoon when the day's stress is peaking.

A genuine alternative to a 4 PM coffee.`,
    price: 8,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "superfoods-adaptogens",
    affiliateUrl: "https://www.pukkaherbs.com/usa/en/products/three-tulsi",
    merchant: "Pukka",
    certifications: ["USDA Organic", "Fair Trade", "Non-GMO"],
    goals: ["sleep", "focus"],
    rating: 4.5,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "Three varieties of tulsi — full adaptogen spectrum",
      "Compostable tea bags · fair-trade sourcing",
      "Actually calming without making you sleepy",
    ],
    cons: ["Mild flavor — not a strong taste profile"],
    ingredients:
      "Organic rama tulsi, organic krishna tulsi, organic vana tulsi.",
    servingSize: "1 tea bag",
  },

  // ─────────────────────────── SKIN & BEAUTY ───────────────────────────
  {
    id: "p-sk-marie-veronique-c-e-caffeic-serum",
    slug: "marie-veronique-c-e-caffeic-serum",
    name: "C+E+Ferulic Serum",
    brand: "Marie Veronique",
    tagline:
      "A clean, third-party-tested vitamin C+E+ferulic serum. The Skinceuticals formula without the silicones.",
    description: `Vitamin C + E + ferulic acid is the most peer-reviewed antioxidant trio in dermatology. Marie Veronique formulates it without dimethicone, without synthetic fragrances, and at the studied 15% L-ascorbic acid concentration.

Made in small batches in San Francisco. The packaging is pharmacy-grade airless to keep the C from oxidizing — a real problem with most cheaper formulas that brown within weeks.

The morning serum we keep buying after testing dozens.`,
    price: 110,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "skin-beauty",
    affiliateUrl: "https://marieveronique.com/products/c-e-caffeic-serum",
    merchant: "Marie Veronique",
    certifications: ["Third-Party Tested"],
    goals: ["skin"],
    rating: 4.7,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "15% L-ascorbic acid + E + ferulic — the studied trio",
      "Airless pump packaging keeps C from oxidizing",
      "No silicones, no synthetic fragrance",
    ],
    cons: ["Tingles on first application", "Premium price"],
    ingredients:
      "L-ascorbic acid 15%, tocopherol, ferulic acid, distilled water, propylene glycol (vegetable-derived), natural preservatives.",
    servingSize: "3–4 drops AM",
  },
  {
    id: "p-sk-primally-pure-hyaluronic-acid",
    slug: "primally-pure-hyaluronic-acid",
    name: "Hyaluronic Acid Serum",
    brand: "Primally Pure",
    tagline:
      "Three molecular weights of plant-derived HA. Genuine hydration without the silicones.",
    description: `Most hyaluronic acid serums are 90% water and silicone with a token amount of HA. Primally Pure uses three molecular weights — high, medium, and low — so the molecule actually penetrates rather than sitting on the surface.

Ferment-derived HA (vegan), bottled in glass, made in California. We layer it after toner and before facial oil.

Skin feels plumper within a week, and the bottle lasts about three months.`,
    price: 48,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "skin-beauty",
    affiliateUrl: "https://primallypure.com/products/hyaluronic-acid-serum",
    merchant: "Primally Pure",
    certifications: ["Non-GMO"],
    goals: ["skin"],
    rating: 4.6,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "Three molecular weights — actually penetrates",
      "Glass packaging · no silicones",
      "Vegan ferment-derived HA",
    ],
    cons: ["Glass dropper requires care", "Pricier than synthetic-HA serums"],
    ingredients:
      "Aloe vera, sodium hyaluronate (3 mw), glycerin, panthenol, vitamin B5, citric acid.",
    servingSize: "3 drops",
  },
  {
    id: "p-sk-osea-undaria-body-oil-large",
    slug: "osea-undaria-body-oil-large",
    name: "Undaria Algae Body Oil (XL)",
    brand: "OSEA",
    tagline:
      "Wild-harvested Patagonian seaweed in oil — the best body oil we've ever used.",
    description: `OSEA wild-harvests Undaria pinnatifida from clean waters off Patagonia and infuses it into a base of jojoba, passionflower, and acai. The result is a body oil that absorbs without residue and leaves skin visibly firmer over weeks.

Truly clean (EWG verified, MADE SAFE certified, vegan, climate-neutral). The XL size lasts ~6 months with daily use.

Apply to damp skin straight out of the shower. The richest, most legitimate body oil on the clean-beauty shelf.`,
    price: 108,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "skin-beauty",
    affiliateUrl: "https://oseamalibu.com/products/undaria-algae-body-oil",
    merchant: "OSEA",
    certifications: ["Non-GMO"],
    goals: ["skin"],
    rating: 4.8,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "Wild-harvested seaweed — real bioactives",
      "MADE SAFE + EWG Verified · climate neutral",
      "Lasts 6 months in XL size",
    ],
    cons: ["Premium price", "Light algae scent isn't for everyone"],
    ingredients:
      "Jojoba seed oil, undaria pinnatifida extract, passionflower seed oil, acai oil, açai oil, lavender oil, geranium oil.",
    servingSize: "1–2 pumps",
  },
  {
    id: "p-sk-true-botanicals-cellular-repair",
    slug: "true-botanicals-cellular-repair-serum",
    name: "Cellular Repair Serum",
    brand: "True Botanicals",
    tagline:
      "MADE SAFE certified. Tested against luxury brands and beat them on independent panels.",
    description: `True Botanicals is one of the few clean brands that has run **clinical trials** against industry leaders — and beat them on hydration, firmness, and wrinkle reduction. Cellular Repair is their nightly serum: chia seed oil, kahai oil (high in retinol-A), and astaxanthin from algae.

MADE SAFE certified means screened against 6,500+ harmful ingredients. We use it nightly and skin feels softer by week two.

Gold standard for clean evening skincare.`,
    price: 110,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "skin-beauty",
    affiliateUrl:
      "https://truebotanicals.com/products/cellular-repair-serum",
    merchant: "True Botanicals",
    certifications: ["Non-GMO", "B-Corp"],
    goals: ["skin"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: true,
    pros: [
      "MADE SAFE certified · screened against 6,500+ ingredients",
      "Beat Estée Lauder Advanced Night Repair in clinical trial",
      "Plant-derived retinol-alternative (kahai oil)",
    ],
    cons: ["High price", "Floral scent (essential-oil-based)"],
    ingredients:
      "Chia seed oil, kahai oil, astaxanthin, jojoba oil, sea buckthorn, rosehip, evening primrose.",
    servingSize: "3–5 drops PM",
  },
  {
    id: "p-sk-aedan-magnesium-deodorant",
    slug: "aedan-magnesium-deodorant",
    name: "Magnesium Deodorant",
    brand: "Each & Every",
    tagline:
      "Aluminum-free deodorant that actually works. Magnesium-based, plant-derived, cruelty-free.",
    description: `Aluminum-free deodorant has historically been a tradeoff between "natural" and "actually working." Each & Every solved it with **magnesium hydroxide** as the active — a mineral that neutralizes odor without blocking sweat glands.

Coconut oil base, no baking soda (which irritates many readers), six fragrance options + a fragrance-free. Made in California.

We've worn it through hot summer hikes. It works.`,
    price: 16,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "skin-beauty",
    affiliateUrl: "https://eachandevery.com",
    merchant: "Each & Every",
    certifications: ["Non-GMO"],
    goals: ["skin"],
    rating: 4.5,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "Magnesium-based — works without aluminum",
      "Baking-soda-free (no underarm irritation)",
      "Available fragrance-free",
    ],
    cons: ["Doesn't stop sweat — only odor", "Slightly oily texture"],
    ingredients:
      "Coconut oil, shea butter, magnesium hydroxide, vitamin E, organic essential oils.",
    servingSize: "—",
  },
  {
    id: "p-sk-supergoop-unseen-sunscreen",
    slug: "supergoop-unseen-sunscreen",
    name: "Unseen Sunscreen SPF 40",
    brand: "Supergoop!",
    tagline:
      "Invisible, weightless SPF 40 — the daily-driver sunscreen we keep replacing.",
    description: `Daily SPF is the highest-leverage skincare habit in the world for both anti-aging and skin-cancer risk. Unseen is our pick because it's actually invisible (no white cast on any skin tone), feels like a primer instead of a sunscreen, and uses Supergoop's clean filter blend.

Reef-friendly, no oxybenzone or octinoxate, vitamin-C and red-algae enriched. Wear under makeup, alone, or as a primer.

The single product we apply every morning of the year, regardless of weather.`,
    price: 40,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "skin-beauty",
    affiliateUrl:
      "https://supergoop.com/products/unseen-sunscreen-spf-40-pa",
    merchant: "Supergoop!",
    certifications: [],
    goals: ["skin", "longevity"],
    rating: 4.6,
    isEditorPick: false,
    isFeatured: true,
    pros: [
      "No white cast on any skin tone",
      "Doubles as a makeup primer",
      "Oxybenzone-free, reef-friendly filter blend",
    ],
    cons: ["Chemical filters (not mineral)", "30 mL bottle disappears fast"],
    ingredients:
      "Avobenzone, homosalate, octinoxate alternatives, dimethicone, frankincense, red algae extract.",
    servingSize: "—",
  },

  // ─────────────────────────── MINDFUL LIVING (richer) ───────────────────────────
  {
    id: "p-ml-loftie-clock",
    slug: "loftie-alarm-clock",
    name: "Loftie Sunrise Alarm Clock",
    brand: "Loftie",
    tagline:
      "A two-phase wake-up clock built to replace your phone. Sunrise simulation, white noise, sleep meditations.",
    description: `Loftie is what happens when designers actually think about how a bedroom should work. Sunrise simulation light starts 30 minutes before alarm, white noise plays through the night, and the alarm itself is a gentle two-phase wake (a soft tone, then 9 minutes later a fuller alarm) — so you wake up groggy-free, not jolted.

No screen, no notifications, no doomscroll. Wi-Fi connects only for content updates, then sleeps.

The single best swap to get your phone off your nightstand.`,
    price: 165,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "mindful-living",
    affiliateUrl: "https://byloftie.com/products/loftie-clock",
    merchant: "Loftie",
    certifications: [],
    goals: ["sleep", "focus"],
    rating: 4.6,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "Sunrise simulation + white noise built-in",
      "Two-phase wake — gentler than a single alarm",
      "Replaces a phone on the nightstand",
    ],
    cons: ["No FM radio", "Premium price for a clock"],
    ingredients: "—",
    servingSize: "—",
  },
  {
    id: "p-ml-eight-sleep-pod",
    slug: "eight-sleep-pod-cover",
    name: "Pod 4 Mattress Cover",
    brand: "Eight Sleep",
    tagline:
      "A water-cooled mattress cover that drops your bed to 55°F. The single biggest sleep-quality intervention we've tested.",
    description: `Body temperature drops at night to trigger deep sleep — but most mattresses trap heat and prevent that drop. The Pod uses water-cooled channels to actively cool your bed (down to 55°F) and warm it in the morning to wake you up gently.

Built-in sensors track HRV, sleep stages, and respiratory rate. The autopilot mode adjusts temperature through the night based on your actual data.

We saw a measurable jump in deep sleep within the first week.`,
    price: 2495,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "mindful-living",
    affiliateUrl: "https://www.eightsleep.com/product/pod-cover/",
    merchant: "Eight Sleep",
    certifications: [],
    goals: ["sleep", "longevity", "performance"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: true,
    pros: [
      "Active cooling to 55°F — actually drops body temp",
      "Tracks HRV, sleep stages, respiratory rate",
      "Each side controls independently",
    ],
    cons: ["Investment-tier price", "Subscription required for full features"],
    ingredients: "—",
    servingSize: "—",
  },
  {
    id: "p-ml-truedark-blue-blockers",
    slug: "truedark-twilight-blue-blockers",
    name: "Twilight Blue-Light Blockers",
    brand: "TrueDark",
    tagline:
      "Red-tinted glasses that block 100% of blue and green light after sunset.",
    description: `Most "blue-blocker" glasses block 30–60% of blue light at best, which is barely enough to matter. TrueDark Twilights are the real thing — red-tinted lenses that block 100% of blue and most green light, the wavelengths that suppress melatonin.

Worn for 2+ hours before bed. Within a week of use, sleep latency drops noticeably and morning grogginess fades.

Made in the US, shatter-resistant lenses, available in fitover (over prescription glasses).`,
    price: 79,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "mindful-living",
    affiliateUrl: "https://truedark.com/collections/twilight",
    merchant: "TrueDark",
    certifications: [],
    goals: ["sleep"],
    rating: 4.5,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "100% blue light + most green light blocked",
      "Fitover option for prescription wearers",
      "Lab-tested transmission spectra published",
    ],
    cons: ["Red tint takes adjustment", "Look noticeably tinted"],
    ingredients: "—",
    servingSize: "—",
  },
];