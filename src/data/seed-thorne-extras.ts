import type { Product } from "./types";

/**
 * Additional Thorne products. These get auto-inserted on every server boot
 * via INSERT OR IGNORE — products with an existing slug are left alone, so
 * the user can edit them in the admin without changes being clobbered.
 *
 * Affiliate URL: get.aspr.app/SH1QbP gives readers 10% off any Thorne SKU.
 */
const THORNE_AFFILIATE = "https://get.aspr.app/SH1QbP";

export const thorneExtras: Product[] = [
  {
    id: "p-thorne-curcumin",
    slug: "thorne-curcumin-phytosome",
    name: "Curcumin Phytosome (Meriva)",
    brand: "Thorne",
    tagline:
      "29× better absorbed than ordinary curcumin. The most clinically studied form on the market.",
    description: `Standard curcumin barely makes it past the gut — Meriva® bonds it to phospholipids, so the active compound actually reaches your bloodstream. Thorne uses the patented Meriva form that's been validated in over 30 human clinical trials.

We take this every day for joint comfort and exercise recovery. It's a quiet workhorse — the kind of supplement you don't notice until you stop taking it.

**Why we like it:** real evidence base, clean fillers, third-party tested. Pairs well with omega-3s for an anti-inflammatory daily stack.`,
    price: 36,
    currency: "USD",
    imageUrl:
      "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf813__v8469f8c0cfe0113831dd1946b17b980eed934dde.png",
    categorySlug: "daily-supplements",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["longevity", "performance"],
    rating: 4.8,
    isEditorPick: false,
    isFeatured: true,
    pros: [
      "Patented Meriva® form — 29× absorption vs. standard curcumin",
      "Backed by 30+ human clinical trials",
      "Soy-free, gluten-free, dairy-free",
      "10% off through our affiliate link",
    ],
    cons: ["Capsules are large", "Not a fast-acting fix — takes 4-6 weeks"],
    ingredients:
      "Meriva® Curcumin Phytosome (Curcuma longa extract bonded to phosphatidylcholine)",
    servingSize: "2 capsules daily with food",
  },
  {
    id: "p-thorne-berberine",
    slug: "thorne-berberine-500",
    name: "Berberine 500",
    brand: "Thorne",
    tagline:
      "Botanical support for healthy blood sugar, cholesterol, and gut microbial balance.",
    description: `Berberine is one of the most studied botanicals in modern integrative medicine — multiple meta-analyses show effects on glucose and lipid markers comparable to first-line pharmaceuticals.

Thorne's version uses the standardized form, lab-verified for purity. We reach for it when the diet has been imperfect (read: holidays, travel) and want to nudge things back into balance.

**Take with meals.** This one shines when paired with a real diet — it's not a substitute for whole-food eating, it's an amplifier.`,
    price: 44,
    currency: "USD",
    imageUrl:
      "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf800__vd424273289116ed602cb97bcef5ca314e2b9ff03.png",
    categorySlug: "daily-supplements",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["gut", "longevity"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: true,
    pros: [
      "Strong evidence base for metabolic markers",
      "Supports GI microbial balance",
      "Standardized 500mg dose per cap",
      "10% off through our affiliate link",
    ],
    cons: ["Can cause GI upset for first week", "Best taken split with meals"],
    ingredients: "Berberine HCl 500mg",
    servingSize: "1 capsule 1-3 times daily with meals",
  },
  {
    id: "p-thorne-quercetin",
    slug: "thorne-quercetin-phytosome",
    name: "Quercetin Phytosome",
    brand: "Thorne",
    tagline:
      "Bioavailable quercetin for a healthy immune and respiratory response.",
    description: `Quercetin is the flavonoid in onions, capers, and apple skins that gives them their immune-modulating effects — but it's notoriously poorly absorbed. Thorne complexes it with sunflower phospholipids (Quercefit®) for **20× greater absorption**.

We take this seasonally — early fall through spring — as part of an immune-support stack. Pairs naturally with vitamin C and zinc.

The formula uses a sunflower-derived phytosome (no soy), which matters if you're avoiding common allergens.`,
    price: 46,
    currency: "USD",
    imageUrl:
      "https://d1vo8zfysxy97v.cloudfront.net/media/product/sb335__vd77c54bfb354a3ce615190f9507e94f05c78786c.png",
    categorySlug: "daily-supplements",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["immunity"],
    rating: 4.8,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "Quercefit® phytosome — 20× absorption",
      "Soy-free (sunflower-derived)",
      "Pairs well with vitamin C and zinc",
      "10% off through our affiliate link",
    ],
    cons: ["Pricier than basic quercetin", "Take with food for tolerance"],
    ingredients: "Quercetin Phytosome (Quercefit®) 250mg",
    servingSize: "2 capsules daily with food",
  },
  {
    id: "p-thorne-coq10",
    slug: "thorne-q-best-100",
    name: "Q-Best 100 (CoQ10)",
    brand: "Thorne",
    tagline:
      "Highly absorbed CoQ10 for cellular energy, heart health, and active aging.",
    description: `CoQ10 is the spark plug of mitochondrial energy production. Production drops with age and is depleted by statin medications. Thorne's Q-Best uses a high-absorption ubiquinone formulation in a non-GMO sunflower oil base.

If you're over 40, take a statin, or just feel like your engine is a half-step slow — this is the supplement to add. Effects are subtle and cumulative — give it 6 weeks before judging.

We're partial to ubiquinone (vs. ubiquinol) because the body converts it cleanly and shelf-stability is better.`,
    price: 53,
    currency: "USD",
    imageUrl:
      "https://d1vo8zfysxy97v.cloudfront.net/media/product/sp624__v0e9c43db03041def65f6aef69118044fc2cc0839.png",
    categorySlug: "longevity-performance",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["longevity", "performance", "energy"],
    rating: 4.9,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "100mg ubiquinone per softgel — clinical dose",
      "Especially valuable if on statins",
      "Sunflower-oil base (no soy)",
      "10% off through our affiliate link",
    ],
    cons: ["Best taken with fat-containing meal", "Effects are cumulative"],
    ingredients:
      "Coenzyme Q10 (as Ubiquinone) 100mg, sunflower oil, gelatin capsule",
    servingSize: "1 gelcap daily with food",
  },
  {
    id: "p-thorne-whey",
    slug: "thorne-whey-protein-isolate-vanilla",
    name: "Whey Protein Isolate — Vanilla",
    brand: "Thorne",
    tagline:
      "21g of grass-fed whey isolate per scoop. NSF Certified for Sport. Clean ingredients, no junk.",
    description: `If you take protein powder, this is the one. Thorne sources from grass-fed dairy, uses cold-filtration to preserve protein structure, and sweetens lightly with stevia — no sucralose, no acesulfame K, no artificial flavors.

The vanilla flavor is restrained — closer to vanilla bean than candy. Mixes cleanly in water, blends beautifully in smoothies.

**NSF Certified for Sport** means every batch is tested for banned substances — the same standard pro athletes require.`,
    price: 65,
    currency: "USD",
    imageUrl:
      "https://d1vo8zfysxy97v.cloudfront.net/media/product/sp111__v496b30d9bd6d9b49984937cf925408c168a0561f.png",
    categorySlug: "longevity-performance",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO", "Grass-Fed"],
    goals: ["performance", "longevity"],
    rating: 4.8,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "21g protein per scoop, low carbs/fat",
      "Grass-fed whey isolate",
      "NSF Certified for Sport",
      "Real vanilla, stevia-sweetened",
      "10% off through our affiliate link",
    ],
    cons: [
      "Pricier per serving than commodity whey",
      "Subtle flavor — add fruit if you want sweetness",
    ],
    ingredients:
      "Whey Protein Isolate, natural vanilla flavor, sunflower lecithin, stevia leaf extract, monk fruit extract",
    servingSize: "1 scoop (~30g) in 8oz water or milk",
  },
  {
    id: "p-thorne-daily-greens",
    slug: "thorne-daily-greens-plus",
    name: "Daily Greens Plus",
    brand: "Thorne",
    tagline:
      "A real greens powder. 26 organic plants, 8 adaptogens, 1 billion CFU probiotic. No fairy dust.",
    description: `Most "greens powders" are 90% maltodextrin and proprietary blend. Thorne went the opposite direction — fully transparent ingredient panel, organic-first sourcing, and clinically meaningful doses.

The base is alkalizing greens (kale, spinach, broccoli sprouts), layered with adaptogens (ashwagandha, rhodiola, eleuthero) and a 1B CFU probiotic for daily support.

Tastes like green tea with a hint of mint — earthy but drinkable. Mixes well in cold water or a smoothie. **One scoop replaces three different bottles** in our morning routine.`,
    price: 72,
    currency: "USD",
    imageUrl:
      "https://d1vo8zfysxy97v.cloudfront.net/media/product/sp687__v0aae5d8aea24e0722dd0ced42fd3ba59fb598e00.png",
    categorySlug: "superfoods-adaptogens",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO", "USDA Organic"],
    goals: ["energy", "gut", "longevity"],
    rating: 4.7,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "26 organic plant ingredients, fully disclosed",
      "Real adaptogen doses (not pixie-dust amounts)",
      "1 billion CFU probiotic per scoop",
      "Great taste for a greens powder",
      "10% off through our affiliate link",
    ],
    cons: ["Premium price point", "30 servings per tub"],
    ingredients:
      "Organic greens blend, adaptogen blend (ashwagandha, rhodiola, eleuthero), probiotic blend (Bacillus coagulans), prebiotic fiber, natural mint and matcha flavor",
    servingSize: "1 scoop (~10g) in 8oz cold water",
  },
  {
    id: "p-thorne-resveracel",
    slug: "thorne-resveracel",
    name: "ResveraCel",
    brand: "Thorne",
    tagline:
      "Niagen® NR + resveratrol + quercetin. The longevity stack in one capsule.",
    description: `ResveraCel combines three of the most-studied longevity compounds: **nicotinamide riboside (Niagen®)** to boost NAD+, **trans-resveratrol** to activate sirtuins, and **quercetin** to amplify resveratrol absorption.

This is what David Sinclair-types take, but in a single, third-party-tested formula instead of three separate bottles.

We rotate this in cycles — 8 weeks on, 4 weeks off — but research suggests continuous daily use is also fine. Pairs well with creatine and omega-3s for a no-frills longevity stack.`,
    price: 60,
    currency: "USD",
    imageUrl:
      "https://d1vo8zfysxy97v.cloudfront.net/media/product/sb302__v2028050a26fc15349594618ab9b1b1ccb5c19a43.png",
    categorySlug: "longevity-performance",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["longevity", "energy"],
    rating: 4.7,
    isEditorPick: true,
    isFeatured: true,
    pros: [
      "Patented Niagen® NR — most-studied NAD+ precursor",
      "Trans-resveratrol + quercetin synergy",
      "Three longevity compounds in one cap",
      "10% off through our affiliate link",
    ],
    cons: ["Premium price (longevity tax)", "Effects are subtle, long-term"],
    ingredients:
      "Niagen® Nicotinamide Riboside 100mg, trans-Resveratrol 150mg, Quercetin Phytosome 25mg, Betaine Anhydrous",
    servingSize: "1 capsule daily",
  },
  {
    id: "p-thorne-glutathione",
    slug: "thorne-glutathione-sr",
    name: "Glutathione-SR",
    brand: "Thorne",
    tagline:
      "Sustained-release glutathione for cellular detox and antioxidant defense.",
    description: `Glutathione is the body's master antioxidant. Most oral glutathione gets shredded in the digestive tract — Thorne's sustained-release formula uses a polymer matrix to deliver it intact, where the body can actually use it.

We take this seasonally during higher-stress periods — heavy travel, environmental exposure, or intense training blocks. It's also our first move when something is off energetically and we can't pin it down.

**Pairs with N-Acetylcysteine (NAC)** — together they create a powerful detox stack.`,
    price: 54,
    currency: "USD",
    imageUrl:
      "https://d1vo8zfysxy97v.cloudfront.net/media/product/sa540__vcd228bab4f3d0f5e343dc0a69b806f8fd90f3260.png",
    categorySlug: "daily-supplements",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["longevity", "energy"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "Sustained-release polymer matrix — actually absorbed",
      "Master antioxidant for cellular detox",
      "Stacks well with NAC",
      "10% off through our affiliate link",
    ],
    cons: ["Smell is mildly sulfurous (it's normal)", "Not for daily forever"],
    ingredients: "Glutathione (reduced) 175mg in sustained-release matrix",
    servingSize: "1 tablet 1-2 times daily, away from food",
  },
  {
    id: "p-thorne-niacel",
    slug: "thorne-niacel-400",
    name: "Niacel 400 (Nicotinamide Riboside)",
    brand: "Thorne",
    tagline:
      "Patented Niagen® NR — 400mg. Boost cellular NAD+ for energy and healthy aging.",
    description: `NAD+ is the molecule that runs cellular energy production. Levels drop steadily with age — by 50, you have roughly half what you had at 20. Nicotinamide riboside is the most-studied precursor for restoring NAD+.

Thorne uses **Niagen®** — the only NR backed by 25+ clinical trials and FDA NDI/GRAS status. 400mg per capsule is a clinical dose.

We treat this as the foundational longevity supplement. Pairs well with ResveraCel for a more comprehensive sirtuin/NAD+ stack.`,
    price: 74,
    currency: "USD",
    imageUrl:
      "https://d1vo8zfysxy97v.cloudfront.net/media/product/sp654__va5a0653d7b868a8ef96b8912e5dc924178efd56f.png",
    categorySlug: "longevity-performance",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["longevity", "energy"],
    rating: 4.8,
    isEditorPick: false,
    isFeatured: true,
    pros: [
      "Patented Niagen® NR — most-validated NAD+ precursor",
      "400mg clinical dose per cap",
      "FDA-recognized GRAS status",
      "10% off through our affiliate link",
    ],
    cons: ["Premium price", "Effects are subtle, accumulative"],
    ingredients: "Nicotinamide Riboside Chloride (Niagen®) 400mg",
    servingSize: "1 capsule daily",
  },
  {
    id: "p-thorne-stress-b",
    slug: "thorne-stress-b-complex",
    name: "Stress B-Complex",
    brand: "Thorne",
    tagline:
      "All eight active-form B vitamins, dosed for stress, energy, and mood support.",
    description: `B vitamins are the cellular spark plugs for energy production and neurotransmitter synthesis. Under sustained stress, the body burns through them faster than diet can replenish.

Thorne uses the **active, methylated forms** — 5-MTHF for folate, methylcobalamin for B12, P5P for B6 — meaning your body doesn't have to do the conversion itself. This matters if you have an MTHFR variant (which ~40% of people do).

Take in the morning with food. Will turn your urine bright yellow — totally normal, that's the riboflavin.`,
    price: 26,
    currency: "USD",
    imageUrl:
      "https://d1vo8zfysxy97v.cloudfront.net/media/product/b107__v5dabbd1393b8a7ff4f391f3839b63fa757822234.png",
    categorySlug: "daily-supplements",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["energy", "focus"],
    rating: 4.8,
    isEditorPick: false,
    isFeatured: true,
    pros: [
      "Active/methylated forms (works for MTHFR)",
      "All 8 B's in clinical doses",
      "Great value — 60 caps",
      "10% off through our affiliate link",
    ],
    cons: ["Bright yellow urine (riboflavin)", "Take in AM — energizing"],
    ingredients:
      "Vitamins B1, B2, B3 (niacin), B5, B6 (P5P), B7 (biotin), B9 (5-MTHF), B12 (methylcobalamin), choline, inositol",
    servingSize: "1 capsule daily with breakfast",
  },
  {
    id: "p-thorne-methylcobalamin",
    slug: "thorne-methylcobalamin-b12",
    name: "Methylcobalamin (B12)",
    brand: "Thorne",
    tagline:
      "The active, methylated form of B12 — for energy, mood, and nerve health.",
    description: `Cyanocobalamin (the cheap form of B12 in most multivitamins) requires the body to convert it before it can be used — a step many people, especially older adults and those with MTHFR variants, do poorly.

Thorne uses **methylcobalamin** — the form your body actually uses, no conversion required. 1mg per capsule is a clinical dose.

Essential if you're vegan, vegetarian, over 50, on metformin, or take acid-reducing meds — all of which dramatically lower B12.`,
    price: 24,
    currency: "USD",
    imageUrl:
      "https://d1vo8zfysxy97v.cloudfront.net/media/product/b125__vdc2295bdfd7f57713849ab8693465dc3ee2e45a0.png",
    categorySlug: "daily-supplements",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["energy", "focus"],
    rating: 4.8,
    isEditorPick: false,
    isFeatured: false,
    pros: [
      "Active methylcobalamin (no conversion needed)",
      "1mg per capsule — clinical dose",
      "Critical for vegans/vegetarians/50+",
      "10% off through our affiliate link",
    ],
    cons: ["Take in AM — can be energizing"],
    ingredients: "Methylcobalamin (Vitamin B12) 1mg",
    servingSize: "1 capsule daily",
  },
];

// IMPORTANT: this array is consumed by `seedExtras()` in src/lib/db.ts using
// INSERT OR IGNORE — products with an existing slug are NOT overwritten,
// so admins can edit them safely without losing changes on next deploy.