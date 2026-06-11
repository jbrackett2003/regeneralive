import type { Product, Goal, Certification } from "./types";

/**
 * Vivtrue seed list — Section 1: Pure / Premium Supplement Brands.
 * Adds ~17 NEW supplement brands not already on the site (Thorne, Momentous,
 * Seed, Paleovalley, Ancient Nutrition, Organifi, Armra, Mind Lab Pro are
 * already covered elsewhere, so they are intentionally skipped here).
 *
 * Idempotent INSERT OR IGNORE — safe to re-run.
 */

type Row = {
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  price: number;
  category:
    | "daily-supplements"
    | "longevity-performance"
    | "gut-immunity"
    | "skin-beauty"
    | "mindful-living"
    | "superfoods-adaptogens";
  goals: Goal[];
  affiliateUrl: string;
  imageUrl: string;
  certs: Certification[];
  pros: string[];
  cons?: string[];
};

const COMMON_CONS = [
  "Premium pricing for premium quality",
  "Direct-to-consumer (limited big-box retail)",
];

const rows: Row[] = [
  // ─────────── Pure Encapsulations — hypoallergenic practitioner-grade ───────────
  {
    slug: "pure-encapsulations-magnesium-glycinate",
    name: "Magnesium (Glycinate)",
    brand: "Pure Encapsulations",
    tagline: "Hypoallergenic magnesium glycinate for sleep, stress, and muscle relaxation",
    description: `Pure Encapsulations is the practitioner-grade brand most functional-medicine clinicians dispense — hypoallergenic capsules with no wheat, gluten, soy, dairy, or artificial colors. Their Magnesium Glycinate is bound to the calming amino acid glycine for the cleanest absorption profile and zero laxative effect.`,
    price: 22,
    category: "daily-supplements",
    goals: ["sleep"],
    affiliateUrl: "https://www.pureencapsulations.com",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "Hypoallergenic — no wheat, gluten, soy, dairy",
      "Glycinate form — gentle on stomach",
      "Practitioner-grade quality control",
      "Third-party tested for purity",
    ],
  },
  {
    slug: "pure-encapsulations-b-complex-plus",
    name: "B-Complex Plus",
    brand: "Pure Encapsulations",
    tagline: "Methylated B-vitamin complex with active folate and B12",
    description: `A complete B-vitamin formula with the bioactive forms — methylfolate (5-MTHF), methylcobalamin (B12), and pyridoxal 5'-phosphate (P-5-P). Critical for the ~40% of the population with MTHFR variants who can't efficiently convert synthetic folic acid.`,
    price: 32,
    category: "daily-supplements",
    goals: ["energy", "focus"],
    affiliateUrl: "https://www.pureencapsulations.com",
    imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "All bioactive forms (methylated)",
      "MTHFR-friendly",
      "Hypoallergenic capsules",
      "Practitioner-recommended",
    ],
  },

  // ─────────── Ritual — traceability-focused ───────────
  {
    slug: "ritual-essential-for-women-18plus",
    name: "Essential for Women 18+",
    brand: "Ritual",
    tagline: "Traceable multivitamin with key nutrients women actually need",
    description: `Ritual rebuilt the multivitamin from scratch — only the 9 nutrients women in their 20s and 30s are most likely to be deficient in (folate, B12, omega-3 DHA, vitamin D3, iron, magnesium, vitamin K2, vitamin E, boron). Every ingredient is traceable to its origin and visible on their site. Delayed-release capsule with a real mint flavor.`,
    price: 33,
    category: "daily-supplements",
    goals: ["energy", "longevity"],
    affiliateUrl: "https://ritual.com",
    imageUrl: "https://images.unsplash.com/photo-1626516691900-19d28f8a82e0?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "Full ingredient traceability",
      "Bioactive folate (5-MTHF) & methylcobalamin B12",
      "Delayed-release capsule for absorption",
      "Subscription with cancel-anytime",
    ],
  },
  {
    slug: "ritual-essential-prenatal",
    name: "Essential Prenatal",
    brand: "Ritual",
    tagline: "Clean prenatal multivitamin with choline and methylated folate",
    description: `One of the few prenatals to include adequate choline (a nutrient nearly all pregnant women under-consume), plus methylated folate, vegan omega-3 DHA from algae, and well-tolerated iron. Vegan, sugar-free, gluten-free.`,
    price: 39,
    category: "daily-supplements",
    goals: ["energy", "longevity"],
    affiliateUrl: "https://ritual.com",
    imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "Includes choline (most prenatals don't)",
      "Methylfolate, not folic acid",
      "Vegan algae DHA",
      "Mint capsule — easier to take",
    ],
  },

  // ─────────── Life Extension — longevity catalog ───────────
  {
    slug: "life-extension-two-per-day",
    name: "Two-Per-Day Multivitamin",
    brand: "Life Extension",
    tagline: "High-potency multi with 25× the B12 of a standard multivitamin",
    description: `Life Extension's Two-Per-Day is consistently rated the top multivitamin by independent labs (LabDoor, ConsumerLab) for potency and absorption. Uses bioactive forms — methylcobalamin B12, 5-MTHF folate, P-5-P B6 — at clinically meaningful doses, not just label-meeting RDAs.`,
    price: 18,
    category: "daily-supplements",
    goals: ["energy", "longevity"],
    affiliateUrl: "https://www.lifeextension.com",
    imageUrl: "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "Ranked #1 multivitamin by ConsumerLab",
      "All bioactive vitamin forms",
      "Clinically meaningful doses",
      "Excellent value per serving",
    ],
  },
  {
    slug: "life-extension-nad-cell-regenerator",
    name: "NAD+ Cell Regenerator (300mg NMN)",
    brand: "Life Extension",
    tagline: "Nicotinamide riboside precursor for cellular NAD+ support",
    description: `Boosts cellular NAD+ — the coenzyme that drives mitochondrial energy production and DNA repair, and which declines steeply with age. Life Extension's formula uses Niagen® NR, the patented form used in most published clinical trials.`,
    price: 42,
    category: "longevity-performance",
    goals: ["longevity", "energy"],
    affiliateUrl: "https://www.lifeextension.com",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "Patented Niagen® NR",
      "Clinical-trial dose",
      "Sirtuin & mitochondrial pathway",
      "Vegan capsules",
    ],
  },

  // ─────────── Nordic Naturals — omega-3 leader ───────────
  {
    slug: "nordic-naturals-ultimate-omega",
    name: "Ultimate Omega 2X (1280 mg)",
    brand: "Nordic Naturals",
    tagline: "High-concentration EPA + DHA from wild-caught Norwegian fish",
    description: `Nordic Naturals is the most-researched fish oil brand on the market — and Ultimate Omega 2X delivers double the omega-3 concentration of their original. 1280mg combined EPA + DHA per serving in re-esterified triglyceride form (the form your cells actually use). Lemon flavor masks the fishiness completely.`,
    price: 50,
    category: "daily-supplements",
    goals: ["longevity", "focus"],
    affiliateUrl: "https://www.nordicnaturals.com",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO", "Wild-Caught"],
    pros: [
      "1280mg EPA+DHA per serving",
      "Re-esterified triglyceride form",
      "Wild-caught anchovy & sardine",
      "No fishy aftertaste",
    ],
  },
  {
    slug: "nordic-naturals-prenatal-dha",
    name: "Prenatal DHA",
    brand: "Nordic Naturals",
    tagline: "Pure DHA fish oil for maternal and fetal brain development",
    description: `The DHA brand most OBs and midwives recommend by name. Strawberry-flavored softgels, third-party tested for heavy metals to a stricter standard than the FDA requires. 480mg DHA per serving — the level used in the major prenatal omega-3 trials.`,
    price: 28,
    category: "daily-supplements",
    goals: ["focus", "longevity"],
    affiliateUrl: "https://www.nordicnaturals.com",
    imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Wild-Caught", "Non-GMO"],
    pros: [
      "Clinical-trial DHA dose",
      "Strawberry-flavored, no fish burp",
      "Third-party heavy-metals tested",
      "Wild-caught Norwegian fish",
    ],
  },

  // ─────────── Garden of Life — clean mainstream ───────────
  {
    slug: "garden-of-life-raw-organic-protein",
    name: "Raw Organic Protein (Vanilla)",
    brand: "Garden of Life",
    tagline: "22g of plant protein from 13 sprouted grains, seeds, and legumes",
    description: `A vegan protein powder that's clean enough to keep on rotation: USDA Organic, Non-GMO Verified, and Informed-Sport tested. The sprouted multi-source blend (pea, brown rice, amaranth, quinoa, lentil, chia, sunflower) covers the full essential amino acid profile and digests far better than a single-source pea isolate.`,
    price: 38,
    category: "longevity-performance",
    goals: ["performance", "energy"],
    affiliateUrl: "https://www.gardenoflife.com",
    imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=1400&q=80",
    certs: ["USDA Organic", "Non-GMO", "Third-Party Tested"],
    pros: [
      "USDA Organic & Non-GMO Verified",
      "13 sprouted plant proteins",
      "Informed-Sport tested",
      "Complete amino acid profile",
    ],
  },
  {
    slug: "garden-of-life-dr-formulated-probiotics",
    name: "Dr. Formulated Once Daily Probiotics (50 Billion)",
    brand: "Garden of Life",
    tagline: "16-strain shelf-stable probiotic — 50 billion CFU per capsule",
    description: `Formulated by Dr. David Perlmutter, this is one of the few mass-market probiotics with both clinically meaningful CFU count and strain diversity. Shelf-stable (no refrigeration needed) thanks to delayed-release acid-resistant capsules.`,
    price: 42,
    category: "gut-immunity",
    goals: ["gut", "immunity"],
    affiliateUrl: "https://www.gardenoflife.com",
    imageUrl: "https://images.unsplash.com/photo-1559054663-e8d23213f55c?auto=format&fit=crop&w=1400&q=80",
    certs: ["Non-GMO", "Third-Party Tested"],
    pros: [
      "50 billion CFU, 16 strains",
      "Shelf-stable",
      "Acid-resistant delayed release",
      "Once daily",
    ],
  },

  // ─────────── Klean Athlete — NSF for Sport ───────────
  {
    slug: "klean-athlete-klean-multivitamin",
    name: "Klean Multivitamin",
    brand: "Klean Athlete",
    tagline: "NSF Certified for Sport multivitamin built for elite athletes",
    description: `Every batch of every Klean Athlete product is NSF Certified for Sport — meaning it has been screened for over 270 banned substances and tested for ingredient identity, potency, and contaminants. The multivitamin uses bioactive nutrient forms athletes need at higher levels (B-complex, vitamin D, magnesium, zinc).`,
    price: 35,
    category: "longevity-performance",
    goals: ["performance", "energy"],
    affiliateUrl: "https://www.kleanathlete.com",
    imageUrl: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "NSF Certified for Sport (every batch)",
      "Banned-substance screened",
      "Bioactive vitamin forms",
      "Trusted by pro & Olympic athletes",
    ],
  },
  {
    slug: "klean-athlete-electrolytes",
    name: "Klean Electrolytes",
    brand: "Klean Athlete",
    tagline: "Capsule electrolyte blend without sugar or stimulants",
    description: `For athletes who train fasted or in heat. Capsule-based electrolytes (sodium, potassium, magnesium, calcium) without the sugar or fillers in mass-market drink mixes. NSF Certified for Sport.`,
    price: 24,
    category: "longevity-performance",
    goals: ["performance"],
    affiliateUrl: "https://www.kleanathlete.com",
    imageUrl: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "NSF Certified for Sport",
      "No sugar, no stimulants",
      "Capsule format (no taste issues)",
      "Built for endurance training",
    ],
  },

  // ─────────── Designs for Health — practitioner ───────────
  {
    slug: "designs-for-health-paleocleanse-plus",
    name: "PaleoCleanse Plus (21-Day Detox)",
    brand: "Designs for Health",
    tagline: "Functional-medicine liver-support detox protein powder",
    description: `Designs for Health is one of the most-respected practitioner brands in functional medicine. PaleoCleanse Plus is a 21-day metabolic-detox protein powder built around pea protein, milk thistle, NAC, glutathione cofactors, and the methylation B-vitamins your liver needs to clear endogenous and environmental toxins.`,
    price: 92,
    category: "gut-immunity",
    goals: ["gut", "longevity"],
    affiliateUrl: "https://www.designsforhealth.com",
    imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "Practitioner-grade detox formula",
      "Targets liver Phase I & II",
      "Pea protein base (no whey/soy)",
      "Methylation cofactors included",
    ],
  },

  // ─────────── Metagenics — clinical practitioner ───────────
  {
    slug: "metagenics-ultraflora-balance",
    name: "UltraFlora Balance",
    brand: "Metagenics",
    tagline: "Two-strain probiotic — clinically validated Lactobacillus + Bifidobacterium",
    description: `Most consumer probiotics throw 10+ strains in a capsule with no clinical evidence for the specific blend. Metagenics' UltraFlora Balance uses just two strains (HN001 + HN019) — but each one has been studied in dozens of human clinical trials. Practitioner-grade.`,
    price: 52,
    category: "gut-immunity",
    goals: ["gut", "immunity"],
    affiliateUrl: "https://www.metagenics.com",
    imageUrl: "https://images.unsplash.com/photo-1559054663-e8d23213f55c?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "Clinically validated strains (HN001 / HN019)",
      "Practitioner-grade",
      "Refrigeration optional",
      "Hypoallergenic",
    ],
  },

  // ─────────── Seeking Health — methylation niche ───────────
  {
    slug: "seeking-health-active-b12-folate",
    name: "Active B12 with L-5-MTHF",
    brand: "Seeking Health",
    tagline: "Lozenge with methylcobalamin B12 + active folate for MTHFR variants",
    description: `Founded by Dr. Ben Lynch (author of Dirty Genes), Seeking Health specializes in methylation-friendly supplements for people with MTHFR or COMT variants. This lozenge delivers methylcobalamin B12 + 5-MTHF folate sublingually — bypassing gut conversion entirely.`,
    price: 22,
    category: "daily-supplements",
    goals: ["energy", "focus"],
    affiliateUrl: "https://www.seekinghealth.com",
    imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "Sublingual lozenge (bypass gut)",
      "Both methylated forms",
      "MTHFR/COMT-friendly",
      "Trusted by Dr. Ben Lynch",
    ],
  },
  {
    slug: "seeking-health-histamine-block",
    name: "Histamine Block",
    brand: "Seeking Health",
    tagline: "DAO enzyme support for histamine-intolerant eaters",
    description: `For people who flush from wine, fermented foods, or aged cheese — often a sign of low diamine oxidase (DAO) activity. Histamine Block delivers DAO enzyme to break down food histamines before they enter circulation. Take 15 minutes before a high-histamine meal.`,
    price: 38,
    category: "gut-immunity",
    goals: ["gut", "immunity"],
    affiliateUrl: "https://www.seekinghealth.com",
    imageUrl: "https://images.unsplash.com/photo-1559054663-e8d23213f55c?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "DAO enzyme — direct mechanism",
      "Take pre-meal as needed",
      "Niche but effective",
      "Used in clinical practice",
    ],
  },

  // ─────────── Needed — premium prenatal ───────────
  {
    slug: "needed-prenatal-multi",
    name: "Prenatal Multi",
    brand: "Needed",
    tagline: "Practitioner-developed prenatal — all 24 essential nutrients at optimal doses",
    description: `Needed audits the prenatal market and finds most products under-dose at least half the nutrients an expecting mother actually needs. Their Prenatal Multi delivers ALL 24 essential prenatal nutrients (including methylated folate, choline, and bioactive iron) at clinically meaningful doses, in 8 capsules a day broken across morning and evening.`,
    price: 64,
    category: "daily-supplements",
    goals: ["energy", "longevity"],
    affiliateUrl: "https://thisisneeded.com",
    imageUrl: "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "All 24 prenatal nutrients at full doses",
      "Methylated B-vitamins",
      "Includes choline (most prenatals don't)",
      "Practitioner-developed",
    ],
  },
  {
    slug: "needed-pre-postnatal-protein",
    name: "Pre/Postnatal Collagen Protein",
    brand: "Needed",
    tagline: "Grass-fed collagen + 18g whole-food protein for pregnancy and recovery",
    description: `Most collagen powders are bovine type I & III only and very low protein per scoop. Needed's blend delivers 18g of complete protein (grass-fed bovine collagen + organic egg white) — the level OBGYN's recommend for pregnancy and postpartum recovery.`,
    price: 56,
    category: "longevity-performance",
    goals: ["performance", "skin"],
    affiliateUrl: "https://thisisneeded.com",
    imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Grass-Fed", "Non-GMO"],
    pros: [
      "18g protein per serving",
      "Grass-fed collagen + organic egg white",
      "Practitioner-grade",
      "Pregnancy-safe protein dose",
    ],
  },

  // ─────────── AG1 — premium greens ───────────
  {
    slug: "ag1-daily-greens",
    name: "AG1 Daily Greens (Athletic Greens)",
    brand: "AG1",
    tagline: "75-ingredient daily greens, vitamin, and adaptogen blend",
    description: `AG1 is the most-recognized greens powder on the market — 75 ingredients spanning vitamins, minerals, adaptogens, prebiotics, probiotics, digestive enzymes, and antioxidants in one daily scoop. NSF Certified for Sport. The convenience tax is real (~$3-4/serving), but you'd need to take 7-8 separate supplements to match the spectrum.`,
    price: 99,
    category: "daily-supplements",
    goals: ["energy", "gut"],
    affiliateUrl: "https://drinkag1.com",
    imageUrl: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "NSF Certified for Sport",
      "75 ingredients in one scoop",
      "Replaces multiple supplements",
      "Tropical taste, not 'green'",
    ],
  },

  // ─────────── Timeline Nutrition — Mitopure ───────────
  {
    slug: "timeline-mitopure-urolithin-a",
    name: "Mitopure (Urolithin A) Powder",
    brand: "Timeline Nutrition",
    tagline: "Direct-delivery Urolithin A for mitochondrial renewal",
    description: `Urolithin A is a postbiotic produced when gut bacteria metabolize ellagic acid from pomegranates — except that 60% of people don't have the right gut bacteria to produce it. Mitopure delivers Urolithin A directly. Published in Nature Aging and JAMA: 500mg/day improved muscle endurance and mitochondrial function in middle-aged adults.`,
    price: 90,
    category: "longevity-performance",
    goals: ["longevity", "performance"],
    affiliateUrl: "https://www.timeline.com",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "Direct-delivery Urolithin A (most can't produce it)",
      "Published in Nature Aging & JAMA",
      "Mitophagy / mitochondrial renewal",
      "500mg clinical dose",
    ],
  },

  // ─────────── Qualia / Neurohacker ───────────
  {
    slug: "qualia-mind-nootropic",
    name: "Qualia Mind",
    brand: "Qualia",
    tagline: "28-ingredient nootropic for focus, mental clarity, and cognitive endurance",
    description: `Neurohacker Collective's flagship cognitive formula — 28 ingredients across nootropics, neuro-vitamins, adaptogens, and choline donors (alpha-GPC, citicoline, bacopa, rhodiola, lion's mane, theanine, and more). Designed for sustained focus without crash.`,
    price: 139,
    category: "daily-supplements",
    goals: ["focus", "energy"],
    affiliateUrl: "https://neurohacker.com",
    imageUrl: "https://images.unsplash.com/photo-1606613616007-a2eaffe6cc7c?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "28 ingredients, full nootropic stack",
      "Alpha-GPC + citicoline (rare combo)",
      "Subscription discount available",
      "100-day money-back guarantee",
    ],
  },
  {
    slug: "qualia-senolytic",
    name: "Qualia Senolytic",
    brand: "Qualia",
    tagline: "Two-day-per-month senescent cell-clearing protocol",
    description: `Senolytics target "zombie" cells that no longer divide but secrete inflammatory signals — a major hallmark of aging. Qualia's protocol uses fisetin, quercetin, curcumin, and luteolin in pulsed dosing (2 days a month) per the published research from Mayo Clinic.`,
    price: 119,
    category: "longevity-performance",
    goals: ["longevity"],
    affiliateUrl: "https://neurohacker.com",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "Pulsed senolytic protocol (2 days/month)",
      "Mayo Clinic research-aligned",
      "Six-month supply per package",
      "Plant-derived senolytics",
    ],
  },

  // ─────────── MaryRuth Organics ───────────
  {
    slug: "maryruth-liquid-multivitamin",
    name: "Adult Liquid Multivitamin",
    brand: "MaryRuth Organics",
    tagline: "Vegan liquid multi for people who can't swallow capsules",
    description: `Liquid multis solve the #1 supplement compliance problem — capsules. MaryRuth's flagship is USDA Organic, vegan, and gentle enough for sensitive stomachs. Raspberry flavor, 1 tablespoon daily.`,
    price: 38,
    category: "daily-supplements",
    goals: ["energy", "longevity"],
    affiliateUrl: "https://www.maryruthorganics.com",
    imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1400&q=80",
    certs: ["USDA Organic", "Non-GMO", "Third-Party Tested"],
    pros: [
      "Liquid format (no capsules)",
      "USDA Organic & Vegan",
      "Family-owned brand",
      "Sensitive-stomach friendly",
    ],
  },

  // ─────────── NOW Foods — value brand ───────────
  {
    slug: "now-foods-magnesium-citrate-powder",
    name: "Magnesium Citrate Powder",
    brand: "NOW Foods",
    tagline: "Pure pharmaceutical-grade magnesium citrate at value pricing",
    description: `NOW is the rare value-priced brand that actually third-party tests every batch. Their Magnesium Citrate Powder is single-ingredient, GMP-certified, and costs about 1/3 of practitioner brands. Perfect for high-dose protocols (constipation, athletic, or just budget-conscious).`,
    price: 16,
    category: "daily-supplements",
    goals: ["sleep"],
    affiliateUrl: "https://www.nowfoods.com",
    imageUrl: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "GMP-certified manufacturing",
      "Best price-per-gram in category",
      "Third-party tested",
      "Single ingredient (no fillers)",
    ],
  },

  // ─────────── MegaFood — whole-food vitamins ───────────
  {
    slug: "megafood-blood-builder-iron",
    name: "Blood Builder Iron",
    brand: "MegaFood",
    tagline: "Whole-food iron supplement that doesn't cause constipation",
    description: `Most iron supplements are ferrous sulfate — well-absorbed but notoriously rough on the gut. MegaFood's Blood Builder uses real food sources (beet root + organic orange) cultured with iron-binding amino acids. Same hemoglobin response in clinical trials, far fewer side effects.`,
    price: 28,
    category: "daily-supplements",
    goals: ["energy"],
    affiliateUrl: "https://www.megafood.com",
    imageUrl: "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?auto=format&fit=crop&w=1400&q=80",
    certs: ["USDA Organic", "Non-GMO", "Third-Party Tested"],
    pros: [
      "No constipation or stomach upset",
      "Whole-food iron source",
      "USDA Organic",
      "Glyphosate residue tested",
    ],
  },

  // ─────────── HUM Nutrition — beauty-from-within ───────────
  {
    slug: "hum-nutrition-daily-cleanse",
    name: "Daily Cleanse",
    brand: "HUM Nutrition",
    tagline: "Skin-clarifying detox blend with chlorella, dandelion, and SOD",
    description: `HUM is the leader in beauty-from-within DTC supplements. Daily Cleanse pairs liver-supportive herbs (milk thistle, dandelion) with antioxidants and trace minerals to help skin clear from the inside. Quiz-driven personalization — you answer 12 questions and they recommend a stack.`,
    price: 26,
    category: "skin-beauty",
    goals: ["skin"],
    affiliateUrl: "https://www.humnutrition.com",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=80",
    certs: ["Non-GMO", "Third-Party Tested"],
    pros: [
      "Liver-skin axis formula",
      "Quiz-based personalization",
      "Clean ingredient deck",
      "Subscribe & save available",
    ],
  },

  // ─────────── Fullscript — practitioner marketplace ───────────
  {
    slug: "fullscript-practitioner-dispensary",
    name: "Fullscript Practitioner Dispensary Access",
    brand: "Fullscript",
    tagline: "Curated practitioner-grade supplement marketplace at typical 15-25% off MSRP",
    description: `Fullscript isn't a supplement — it's the dispensary platform that connects you to your practitioner's recommended protocols at member pricing. If you work with a functional medicine doctor, integrative MD, or registered dietitian, your provider can build you a custom plan from 20,000+ practitioner-grade SKUs (Thorne, Pure Encapsulations, Designs for Health, Metagenics, and more) — usually 15-25% below retail.`,
    price: 0,
    category: "daily-supplements",
    goals: ["longevity"],
    affiliateUrl: "https://fullscript.com",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Access to 20,000+ practitioner SKUs",
      "Typically 15-25% below retail",
      "Custom protocol from your provider",
      "Storage & cold-chain certified",
    ],
  },
];

export const vivtrueSupplements: Product[] = rows.map((r, idx) => ({
  id: `p-${r.slug}`,
  slug: r.slug,
  name: r.name,
  brand: r.brand,
  tagline: r.tagline,
  description: r.description,
  price: r.price,
  currency: "USD",
  imageUrl: r.imageUrl,
  categorySlug: r.category,
  affiliateUrl: r.affiliateUrl,
  merchant: r.brand,
  certifications: r.certs,
  goals: r.goals,
  rating: 4.6,
  isEditorPick: idx < 3,
  isFeatured: false,
  pros: r.pros,
  cons: r.cons ?? COMMON_CONS,
  ingredients: r.tagline,
  servingSize: "See product packaging for serving information",
}));