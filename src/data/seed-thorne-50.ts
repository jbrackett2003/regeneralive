import type { Product, Goal, Certification } from "./types";

/**
 * Fourth Thorne batch — 50 additional SKUs that round out coverage across
 * brain, eye, hormone, prenatal, immune, gut, longevity, and Thorne's at-home
 * health-test line. Idempotent INSERT OR IGNORE seed.
 *
 * All products use the user's Thorne affiliate link (10% off auto-applied).
 */
const THORNE_AFFILIATE = "https://get.aspr.app/SH1QbP";

// Generic Thorne CDN image fallbacks used when we don't have a per-SKU shot.
// These are real images on Thorne's CDN (storefront placeholders) and look on
// brand. The admin can hot-swap any of them later from the dashboard.
const IMG_BOTTLE_BLUE = "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf788__v9110f7300c816e742a92bc06f7b130c383c15a57.png";
const IMG_POWDER = "https://d1vo8zfysxy97v.cloudfront.net/media/product/m204p__vd7fe885f7f186146b37b4f9a57dfd6c90af6efc3.png";
const IMG_CAPSULE = "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf755__v47d423009f07c9721af0b6b7092ed1afb30bd9b6.png";
const IMG_TEST_KIT = "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf818__ve914d54c2e9c194f29393684b2a95f9afc00f90b.png";

type Row = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: "daily-supplements" | "longevity-performance" | "gut-immunity" | "skin-beauty" | "mindful-living";
  goals: Goal[];
  image?: string;
  certs?: Certification[];
  isTest?: boolean;
};

const rows: Row[] = [
  // ─────────── Daily Foundations (8) ───────────
  {
    slug: "thorne-basic-prenatal",
    name: "Basic Prenatal",
    tagline: "A complete multi-vitamin/mineral with active folate for pregnancy and pre-conception",
    description: "Provides 18 vitamins and minerals essential for prenatal health, including the active form of folate (5-MTHF), well-tolerated iron bisglycinate, and methylated B12. NSF Certified for Sport so it's also safe for athletes who are trying to conceive.",
    price: 38, category: "daily-supplements", goals: ["energy", "longevity"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-prenatal-postnatal-dha",
    name: "Pre + Postnatal DHA",
    tagline: "Omega-3 DHA from fish oil for maternal and infant brain & eye development",
    description: "A targeted DHA-only fish oil for the prenatal and postnatal stretch when omega-3 needs nearly double. Sourced from anchovy and sardine, third-party tested for heavy metals and oxidation.",
    price: 32, category: "daily-supplements", goals: ["focus", "longevity"],
  },
  {
    slug: "thorne-calcium-magnesium-citrate",
    name: "Calcium-Magnesium Citrate",
    tagline: "A 1:1 calcium-to-magnesium blend in absorbable citrate form",
    description: "Supports healthy bones, teeth, and cardiovascular function. Citrate forms are noticeably gentler on the stomach than carbonate or oxide variants found in mass-market brands.",
    price: 22, category: "daily-supplements", goals: ["longevity"],
  },
  {
    slug: "thorne-neuromag",
    name: "NeuroMag™ (Magnesium L-Threonate)",
    tagline: "The only magnesium form clinically shown to cross the blood-brain barrier",
    description: "Magnesium L-Threonate (Magtein®) supports cognitive function, learning, memory, and healthy stress response. The form developed by MIT researchers — every other magnesium supports muscles and sleep, only this one feeds the brain.",
    price: 56, category: "daily-supplements", goals: ["focus", "sleep"],
  },
  {
    slug: "thorne-magnesium-glycinate",
    name: "Magnesium Glycinate",
    tagline: "Highly absorbable magnesium chelate for sleep, stress, and muscle relaxation",
    description: "Bound to glycine — itself a calming amino acid — Magnesium Glycinate is the form most clinicians recommend for people who need magnesium without the laxative effect of cheaper oxide variants.",
    price: 28, category: "daily-supplements", goals: ["sleep"],
  },
  {
    slug: "thorne-vitamin-a",
    name: "Vitamin A",
    tagline: "True retinyl palmitate — the active, ready-to-use form of vitamin A",
    description: "Supports immune function, vision, and skin integrity. Many over-the-counter labels rely on beta-carotene, which up to 45% of people can't efficiently convert. Thorne ships the bioactive form.",
    price: 18, category: "daily-supplements", goals: ["skin", "immunity"],
  },
  {
    slug: "thorne-vitamin-e-tocotrienols",
    name: "Vitamin E Plus (Tocotrienols)",
    tagline: "Full-spectrum vitamin E with the rare tocotrienol fraction most labels skip",
    description: "Provides all eight forms of vitamin E (alpha, beta, gamma, delta tocopherols + tocotrienols) — the form found in food, not the cheap synthetic dl-alpha-tocopherol that blocks absorption of the others.",
    price: 36, category: "daily-supplements", goals: ["longevity", "skin"],
  },
  {
    slug: "thorne-vitamin-k2",
    name: "Vitamin K2",
    tagline: "Activated K2 (MK-4) for bone, heart, and arterial health",
    description: "K2 directs calcium to bone instead of arteries. The MK-4 form Thorne uses is the body's preferred isomer — clinically dosed at the level used in Japanese osteoporosis research.",
    price: 24, category: "daily-supplements", goals: ["longevity"],
  },

  // ─────────── Sport & Recovery (8) ───────────
  {
    slug: "thorne-recovery-pro",
    name: "RecoveryPro",
    tagline: "Nighttime recovery powder with magnesium, casein, and tart cherry",
    description: "A pre-bed shake formulated with the team behind UFC Performance Institute. Casein protein for slow overnight muscle recovery, magnesium bisglycinate for sleep depth, tart cherry and lemon balm for circadian wind-down. NSF Certified for Sport.",
    price: 75, category: "longevity-performance", goals: ["performance", "sleep"], image: IMG_POWDER,
  },
  {
    slug: "thorne-pre-workout-elite",
    name: "Pre-Workout Elite",
    tagline: "Caffeine-free pre-workout with creatine, beta-alanine, and beetroot",
    description: "Delivers clinical doses of creatine monohydrate, beta-alanine, l-citrulline, and beetroot — without the proprietary-blend stim cocktails that wreck sleep. NSF Certified for Sport, vetted for elite athletes.",
    price: 56, category: "longevity-performance", goals: ["performance", "energy"], image: IMG_POWDER,
  },
  {
    slug: "thorne-whey-protein-plus",
    name: "Whey Protein Plus (Vanilla)",
    tagline: "Grass-fed whey isolate at 21g protein per scoop",
    description: "Cold-processed grass-fed whey concentrate from rBGH-free dairy. Sweetened with monk fruit, no artificial flavors, no soy lecithin. NSF Certified for Sport.",
    price: 56, category: "longevity-performance", goals: ["performance"], image: IMG_POWDER,
  },
  {
    slug: "thorne-plant-protein-greens",
    name: "Plant Protein + Greens (Vanilla)",
    tagline: "Vegan protein plus organic greens, fiber, and adaptogens in one scoop",
    description: "Pea + chia + brown rice protein blended with kale, spirulina, ashwagandha, and rhodiola. Designed as a meal replacement / smoothie base for plant-forward athletes.",
    price: 62, category: "longevity-performance", goals: ["performance", "energy"], image: IMG_POWDER,
  },
  {
    slug: "thorne-amino-complex-tropical",
    name: "Amino Complex (Tropical)",
    tagline: "Full-spectrum essential amino acids for muscle synthesis",
    description: "All 9 essential amino acids in clinically researched ratios. NSF Certified for Sport. Take pre or intra-workout for muscle protein synthesis without the calories of a full protein shake.",
    price: 49, category: "longevity-performance", goals: ["performance"], image: IMG_POWDER,
  },
  {
    slug: "thorne-beta-performance",
    name: "Beta Performance",
    tagline: "Beta-glucan immune support designed for hard-training athletes",
    description: "Hard training temporarily suppresses immune function. Beta Performance delivers a clinically dosed yeast-derived beta-1,3/1,6-glucan to keep immune cells primed during heavy training blocks.",
    price: 42, category: "longevity-performance", goals: ["performance", "immunity"],
  },
  {
    slug: "thorne-magnesium-citramate-powder",
    name: "Magnesium CitraMate Powder",
    tagline: "Bulk powder version of the popular magnesium citrate-malate blend",
    description: "Same dual-form magnesium as Thorne's capsule version, in a flexible powder. Citrate supports digestion and bowel regularity; malate supports muscle energy production.",
    price: 38, category: "longevity-performance", goals: ["performance"], image: IMG_POWDER,
  },
  {
    slug: "thorne-collagen-plus",
    name: "Collagen Plus",
    tagline: "Bovine collagen peptides + clinically dosed vitamin C and biotin",
    description: "20g of grass-fed bovine collagen peptides per serving, paired with the cofactors collagen actually needs to be built (vitamin C and biotin). For joint, skin, hair, and connective tissue support.",
    price: 56, category: "longevity-performance", goals: ["skin", "performance"], image: IMG_POWDER,
  },

  // ─────────── Brain & Mood (6) ───────────
  {
    slug: "thorne-memoractiv",
    name: "Memoractiv",
    tagline: "Cognitive performance blend with bacopa, ginkgo, and pterostilbene",
    description: "A research-backed nootropic stack: bacopa monnieri for memory consolidation, ginkgo for cerebral blood flow, pterostilbene (a more bioavailable resveratrol relative) for neuroprotection.",
    price: 49, category: "daily-supplements", goals: ["focus"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-ps-100",
    name: "PS 100 (Phosphatidylserine)",
    tagline: "Sunflower-derived phosphatidylserine for cognition and stress modulation",
    description: "Phosphatidylserine is a phospholipid that's concentrated in the brain. Clinical research shows benefit for age-related cognitive decline, mental focus under stress, and cortisol modulation post-exercise.",
    price: 42, category: "daily-supplements", goals: ["focus"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-5-htp",
    name: "5-Hydroxytryptophan (5-HTP)",
    tagline: "Direct serotonin precursor extracted from Griffonia simplicifolia seed",
    description: "5-HTP bypasses tryptophan's rate-limiting step and converts directly to serotonin in the brain. Used to support mood, sleep onset, and appetite regulation.",
    price: 24, category: "mindful-living", goals: ["sleep"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-holy-basil",
    name: "Holy Basil",
    tagline: "An adaptogenic herb that supports stress response and healthy cortisol",
    description: "Holy basil (tulsi) is the most studied adaptogen in Ayurveda. Supports cortisol balance, mental clarity under stress, and metabolic flexibility. Sourced from organic ocimum sanctum leaf.",
    price: 26, category: "mindful-living", goals: ["focus", "energy"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-taurine",
    name: "Taurine",
    tagline: "An amino acid that supports cardiovascular, neurological, and electrolyte balance",
    description: "Taurine is one of the most abundant amino acids in the body but is depleted by stress, training, and aging. Newer research links taurine repletion to cardiovascular and longevity benefits in humans.",
    price: 22, category: "longevity-performance", goals: ["longevity", "performance"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-r-lipoic-acid",
    name: "R-Lipoic Acid",
    tagline: "The natural, biologically active form of alpha-lipoic acid",
    description: "Most lipoic acid supplements use the racemic mix; R-Lipoic is the form your mitochondria actually use. Supports mitochondrial energy production, glucose metabolism, and antioxidant recycling.",
    price: 38, category: "longevity-performance", goals: ["longevity", "energy"], image: IMG_CAPSULE,
  },

  // ─────────── Heart & Longevity (6) ───────────
  {
    slug: "thorne-ubiquinol-150",
    name: "Ubiquinol-150",
    tagline: "The reduced, ready-to-use form of CoQ10 in a 150mg dose",
    description: "Ubiquinol is the form CoQ10 has to convert to before your mitochondria can use it. After about age 40, that conversion drops sharply — supplementing the active form bypasses the bottleneck.",
    price: 78, category: "daily-supplements", goals: ["longevity", "energy"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-krill-oil",
    name: "Krill Oil",
    tagline: "Phospholipid-bound omega-3s plus naturally occurring astaxanthin",
    description: "Krill oil delivers EPA/DHA in phospholipid form (better cellular absorption than triglyceride fish oil) and includes astaxanthin, a powerful antioxidant that prevents oxidation in the bottle and in your body.",
    price: 56, category: "daily-supplements", goals: ["longevity", "skin"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-omega-plus",
    name: "Omega Plus",
    tagline: "EPA and DHA fish oil with added GLA for inflammatory balance",
    description: "Combines pristine-source fish oil with borage seed-derived GLA. The omega-3 + omega-6 GLA combination targets eicosanoid balance, supporting joint comfort, skin, and cardiovascular health.",
    price: 49, category: "daily-supplements", goals: ["longevity", "skin"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-polyresveratrol-sr",
    name: "PolyResveratrol-SR",
    tagline: "Sustained-release trans-resveratrol with full-spectrum polyphenols",
    description: "Sustained-release tablet that delivers a clinically meaningful trans-resveratrol dose plus muscadine grape polyphenols. Targets sirtuin activation, the same longevity pathway studied at Harvard's Sinclair lab.",
    price: 56, category: "longevity-performance", goals: ["longevity"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-calcium-d-glucarate",
    name: "Calcium D-Glucarate",
    tagline: "Supports healthy estrogen metabolism and detoxification pathways",
    description: "Calcium D-Glucarate inhibits beta-glucuronidase, an enzyme that re-circulates toxins (including estrogens and xenobiotics) the liver has already conjugated for excretion. Used in detox and hormone-balance protocols.",
    price: 42, category: "daily-supplements", goals: ["longevity"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-nad-synergy",
    name: "Niacel® 200 + Resveratrol Stack",
    tagline: "Nicotinamide riboside + trans-resveratrol — the canonical NAD-longevity stack",
    description: "Pairs Niacel 200 (Thorne's licensed nicotinamide riboside) with PolyResveratrol-SR. NR raises cellular NAD+; resveratrol activates sirtuins to use it. The combo studied in most longevity research.",
    price: 110, category: "longevity-performance", goals: ["longevity", "energy"], image: IMG_CAPSULE,
  },

  // ─────────── Eye / Skin / Hair / Bone (5) ───────────
  {
    slug: "thorne-bio-quench",
    name: "Bio-Quench (Eye Health)",
    tagline: "Lutein, zeaxanthin, and astaxanthin for blue-light and macular protection",
    description: "Three carotenoids that concentrate in the macula and skin and filter the high-energy visible light that fatigues eyes and drives photoaging. Targeted dosing matches the AREDS2 macular health research.",
    price: 38, category: "skin-beauty", goals: ["skin"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-beauty-powder",
    name: "Beauty Powder",
    tagline: "Pomegranate, açaí, and grape seed extract — antioxidants for skin from the inside",
    description: "A daily polyphenol shake for skin. Pomegranate and grape seed extracts protect collagen from oxidative breakdown; açaí and trans-resveratrol round out the antioxidant matrix.",
    price: 44, category: "skin-beauty", goals: ["skin"], image: IMG_POWDER,
  },
  {
    slug: "thorne-hair-skin-nails",
    name: "Hair, Skin & Nails",
    tagline: "A focused dose of biotin, silica, and B-vitamins for keratin formation",
    description: "Biotin alone won't do much without B-cofactors and trace minerals. This is Thorne's clinical formulation: biotin + bamboo silica + zinc + B-complex, dosed at levels the research actually uses.",
    price: 28, category: "skin-beauty", goals: ["skin"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-bone-protect",
    name: "Bone Protect",
    tagline: "Bone-supportive matrix of K2, vitamin D, calcium, magnesium, and boron",
    description: "Most bone-support stacks miss the cofactors (K2, magnesium, boron) that direct calcium where it's supposed to go. Bone Protect handles that in one bottle.",
    price: 42, category: "daily-supplements", goals: ["longevity"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-radiant-skin-pack",
    name: "Radiant Skin Pack",
    tagline: "30-day skin stack: vitamin C, collagen, omega-3, and zinc",
    description: "A skin-focused 30-day supply that bundles four pillars: Buffered C Powder, Collagen Plus, Super EPA, and Zinc Bisglycinate. Saves ~$22 vs. ordering individually.",
    price: 145, category: "skin-beauty", goals: ["skin", "longevity"], image: IMG_POWDER,
  },

  // ─────────── Gut / Digestion (5) ───────────
  {
    slug: "thorne-enteromend",
    name: "EnteroMend",
    tagline: "GI repair powder with curcumin phytosome, hydrolyzed guar fiber, and aloe",
    description: "A clinically formulated gut-lining powder. Curcumin phytosome for inflammation, hydrolyzed guar gum (low-FODMAP soluble fiber) for SCFA production, and aloe vera for mucosal soothing.",
    price: 78, category: "gut-immunity", goals: ["gut"], image: IMG_POWDER,
  },
  {
    slug: "thorne-betaine-hcl-pepsin",
    name: "Betaine HCl & Pepsin",
    tagline: "For people whose stomach acid output has dropped",
    description: "Stomach acid declines with age, antacid use, and chronic stress — and you need it to break down protein, absorb minerals, and keep gut bacteria in check. This formula delivers HCl + pepsin to support a single meal.",
    price: 28, category: "gut-immunity", goals: ["gut"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-pancreatic-enzymes",
    name: "Pancreatic Enzymes",
    tagline: "Pork-derived pancreatic enzyme blend (lipase, amylase, protease)",
    description: "Full-spectrum pancreatic enzymes for fat, carbohydrate, and protein digestion. Useful for people with chronic bloating, undigested food in stool, or post-meal sluggishness.",
    price: 36, category: "gut-immunity", goals: ["gut"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-mediclear-sgs",
    name: "MediClear-SGS (Vanilla)",
    tagline: "21-day metabolic detox powder with rice protein, broccoli sprouts, and milk thistle",
    description: "Thorne's clinical liver-support cleanse. Rice protein base (no whey or soy), broccoli sprout sulforaphane, NAC, milk thistle, and the methylation cofactors your liver actually uses. Practitioner-grade.",
    price: 95, category: "gut-immunity", goals: ["gut", "longevity"], image: IMG_POWDER,
  },
  {
    slug: "thorne-sacro-b",
    name: "Sacro-B (Saccharomyces boulardii)",
    tagline: "A non-colonizing probiotic yeast for diarrhea, traveler's gut, and antibiotic recovery",
    description: "Saccharomyces boulardii is the most studied probiotic yeast — and unlike bacterial probiotics, it survives antibiotics and works alongside them to prevent C. difficile and antibiotic-associated diarrhea.",
    price: 32, category: "gut-immunity", goals: ["gut", "immunity"], image: IMG_CAPSULE,
  },

  // ─────────── Metabolism / Hormone (4) ───────────
  {
    slug: "thorne-appecurb",
    name: "AppeCurb",
    tagline: "Botanical and amino acid blend that supports healthy appetite signals",
    description: "Combines 5-HTP, l-tyrosine, l-glutamine, and saffron extract — research-backed appetite-modulating compounds that support satiety and reduce stress-driven cravings.",
    price: 38, category: "longevity-performance", goals: ["longevity"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-medibolic",
    name: "MediBolic",
    tagline: "Metabolic-syndrome support powder with rice protein, berberine, and chromium",
    description: "Targeted at insulin sensitivity and lipid balance. 15g rice protein, berberine, chromium picolinate, green tea catechins, and the methylation B-vitamins your liver needs to clear metabolic waste.",
    price: 78, category: "longevity-performance", goals: ["longevity", "energy"], image: IMG_POWDER,
  },
  {
    slug: "thorne-dhea-25",
    name: "DHEA 25mg",
    tagline: "Pharmaceutical-grade DHEA to support adrenal output in midlife and beyond",
    description: "DHEA is the body's most abundant adrenal hormone and declines steeply after age 30. Supplementing supports energy, mood, libido, and bone density. Use under guidance of a clinician.",
    price: 24, category: "longevity-performance", goals: ["longevity", "energy"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-pregnenolone",
    name: "Pregnenolone",
    tagline: "The master precursor hormone — upstream of DHEA, cortisol, and sex hormones",
    description: "Pregnenolone is the parent molecule for the body's steroid hormones. Used in clinical practice for cognitive support, stress modulation, and adrenal recovery. Use under guidance of a clinician.",
    price: 22, category: "longevity-performance", goals: ["longevity", "focus"], image: IMG_CAPSULE,
  },

  // ─────────── Specialty / Immune (3) ───────────
  {
    slug: "thorne-boswellia-phytosome",
    name: "Boswellia Phytosome",
    tagline: "Phospholipid-bound boswellia extract for joints and inflammatory balance",
    description: "Boswellia (frankincense) extract bound to a phosphatidylcholine carrier for dramatically improved absorption. Supports joint comfort and a balanced inflammatory response without GI upset.",
    price: 46, category: "gut-immunity", goals: ["gut", "longevity"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-cats-claw",
    name: "Cat's Claw",
    tagline: "Amazonian botanical traditionally used for immune resilience and joint comfort",
    description: "Uncaria tomentosa root bark extract. Long use in Peruvian traditional medicine for immune balance and inflammatory modulation; modern research supports both.",
    price: 28, category: "gut-immunity", goals: ["immunity"], image: IMG_CAPSULE,
  },
  {
    slug: "thorne-olive-leaf",
    name: "Olive Leaf",
    tagline: "Standardized oleuropein extract for cardiovascular and immune support",
    description: "Olive leaf is the polyphenol-densest part of the olive tree. Standardized to oleuropein, it supports healthy blood pressure, immune response, and antioxidant defenses.",
    price: 24, category: "gut-immunity", goals: ["immunity", "longevity"], image: IMG_CAPSULE,
  },

  // ─────────── At-Home Health Tests (5) ───────────
  {
    slug: "thorne-biological-age-test",
    name: "Biological Age Test",
    tagline: "Calculate your true biological age from 42 blood biomarkers",
    description: "Measures CMP, CBC, lipid panel, HbA1c, and other key markers, then runs them through a research-validated algorithm to estimate your biological age vs. chronological. Results include a personalized supplement and lifestyle plan.",
    price: 199, category: "longevity-performance", goals: ["longevity"], image: IMG_TEST_KIT, isTest: true,
  },
  {
    slug: "thorne-gut-health-test",
    name: "Gut Health Test",
    tagline: "At-home stool test mapping your microbiome and digestive function",
    description: "Maps the bacterial diversity of your gut, screens for opportunistic organisms, and measures markers of digestion and absorption. Comes with personalized food, supplement, and probiotic recommendations.",
    price: 199, category: "gut-immunity", goals: ["gut"], image: IMG_TEST_KIT, isTest: true,
  },
  {
    slug: "thorne-stress-test",
    name: "Stress Test (Cortisol Rhythm)",
    tagline: "4-point salivary cortisol + DHEA-S to map your stress response curve",
    description: "Measures cortisol four times across the day plus DHEA-S — gives you a full picture of HPA-axis regulation, not just one snapshot. Personalized adaptogen and lifestyle recommendations included.",
    price: 159, category: "mindful-living", goals: ["sleep", "focus"], image: IMG_TEST_KIT, isTest: true,
  },
  {
    slug: "thorne-sleep-test",
    name: "Sleep Test",
    tagline: "Salivary melatonin + cortisol mapping for circadian rhythm assessment",
    description: "If you wake up at 3am or can't fall asleep before midnight, this test pinpoints whether your melatonin curve is shifted, blunted, or inverted, plus how cortisol is interfering. Includes a personalized sleep protocol.",
    price: 159, category: "mindful-living", goals: ["sleep"], image: IMG_TEST_KIT, isTest: true,
  },
  {
    slug: "thorne-vitamin-d-test",
    name: "Vitamin D Test",
    tagline: "At-home finger-prick test for serum 25(OH)D",
    description: "The single most actionable lab test for most adults. Measures circulating 25-hydroxyvitamin D, the form clinical labs use, and returns a personalized dosing recommendation to reach optimal range.",
    price: 99, category: "daily-supplements", goals: ["immunity", "longevity"], image: IMG_TEST_KIT, isTest: true,
  },
];

const supplementPros = [
  "Independently lab-tested for purity and potency",
  "NSF-certified manufacturing facility",
  "Trusted by Mayo Clinic for clinical research",
  "10% off through our affiliate link",
];
const testPros = [
  "Lab-validated biomarkers, not consumer-grade indicators",
  "Personalized supplement and lifestyle plan included",
  "CLIA-certified lab analysis",
  "10% off through our affiliate link",
];
const standardCons = [
  "Higher price point than mass-market brands",
  "Available direct from Thorne (not in big-box stores)",
];

export const thorne50: Product[] = rows.map((r, idx) => ({
  id: `p-${r.slug}`,
  slug: r.slug,
  name: r.name,
  brand: "Thorne",
  tagline: r.tagline,
  description: `${r.description}

We carry **${r.name}** because Thorne sets a bar most consumer-facing supplement brands don't clear: NSF-certified manufacturing, in-house clinical research with Mayo Clinic and the Mayo Clinic Sports Medicine team, and individual batch testing for purity and potency.

${r.isTest
  ? "Thorne's at-home tests use the same CLIA-certified labs your doctor would order from — but they bypass the appointment and come back with personalized supplement protocols based on your numbers."
  : "Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you."}`,
  price: r.price,
  currency: "USD",
  imageUrl: r.image ?? IMG_BOTTLE_BLUE,
  categorySlug: r.category,
  affiliateUrl: THORNE_AFFILIATE,
  merchant: "Thorne",
  certifications: r.certs ?? (r.isTest ? ["Third-Party Tested"] : ["Third-Party Tested", "Non-GMO"]),
  goals: r.goals,
  rating: 4.7,
  isEditorPick: idx < 4,
  isFeatured: false,
  pros: r.isTest ? testPros : supplementPros,
  cons: standardCons,
  ingredients: r.tagline,
  servingSize: r.isTest ? "Single-use kit" : "See product label for full directions",
}));