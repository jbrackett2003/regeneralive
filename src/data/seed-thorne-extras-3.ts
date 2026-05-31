import type { Product } from "./types";

/**
 * Third batch of Thorne products — focused on the four pillars users ask for most:
 *   sleep, gut, skin, athletic performance.
 *
 * Idempotent INSERT OR IGNORE seed; safe to add to and re-deploy without
 * clobbering admin edits.
 *
 * Affiliate URL: get.aspr.app/SH1QbP gives readers 10% off any Thorne SKU
 * (code surfaced via src/data/brand-discounts.ts).
 */
const THORNE_AFFILIATE = "https://get.aspr.app/SH1QbP";

export const thorneExtras3: Product[] = [
  {
    id: "p-thorne-melaton-3",
    slug: "thorne-melaton-3",
    name: "Melaton-3® (Melatonin 3mg)",
    brand: "Thorne",
    tagline: "To enhance sleep and help maintain normal circadian rhythms",
    description: `Melaton-3 supports restful sleep, helps balance circadian rhythms, and provides benefit for shift workers, those with jet lag, and individuals with an age-relate

We carry **Melaton-3® (Melatonin 3mg)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

We carry this in the sleep section because Thorne formulates it without the synthetic sleep cocktail you'll find in most pharmacy aisles — no Tylenol PM-style antihistamines, no proprietary blends. Just clean, dose-disclosed actives that play nicely with a wind-down routine.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 16.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf788__v9110f7300c816e742a92bc06f7b130c383c15a57.png",
    categorySlug: "mindful-living",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["sleep"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["Clean formulation — no antihistamines or proprietary blends", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "To enhance sleep and help maintain normal circadian rhythms",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-pharmagaba-250",
    slug: "thorne-pharmagaba-250",
    name: "PharmaGABA-250",
    brand: "Thorne",
    tagline: "Contains natural-source GABA, a brain chemical to promote a calm state of mind and restful sleep",
    description: `PharmaGABA features a natural source of the inhibitory neurotransmitter – GABA. GABA supports restful sleep, acts like a "brake" on stress, and prov

We carry **PharmaGABA-250** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

We carry this in the sleep section because Thorne formulates it without the synthetic sleep cocktail you'll find in most pharmacy aisles — no Tylenol PM-style antihistamines, no proprietary blends. Just clean, dose-disclosed actives that play nicely with a wind-down routine.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 59.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sp662__v58963453ffbd3541d014d51d759ff339fe9fdfe6.png",
    categorySlug: "mindful-living",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["sleep", "focus"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["Clean formulation — no antihistamines or proprietary blends", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "Contains natural-source GABA, a brain chemical to promote a calm state of mind and restful sleep",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-magnesium-bisglycinate-powder",
    slug: "thorne-magnesium-bisglycinate-powder",
    name: "Magnesium Bisglycinate Powder",
    brand: "Thorne",
    tagline: "Powdered formula that promotes restful sleep and muscle relaxation",
    description: `An ideal formula for active individuals wanting to unwind. Magnesium Bisglycinate is a lightly sweetened powder that is well-tolerated and well-absorbed.

We carry **Magnesium Bisglycinate Powder** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

We carry this in the sleep section because Thorne formulates it without the synthetic sleep cocktail you'll find in most pharmacy aisles — no Tylenol PM-style antihistamines, no proprietary blends. Just clean, dose-disclosed actives that play nicely with a wind-down routine.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 47.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/m204p__vd7fe885f7f186146b37b4f9a57dfd6c90af6efc3.png",
    categorySlug: "mindful-living",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["sleep"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["Clean formulation — no antihistamines or proprietary blends", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "Powdered formula that promotes restful sleep and muscle relaxation",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-rhodiola",
    slug: "thorne-rhodiola",
    name: "Rhodiola",
    brand: "Thorne",
    tagline: "A stress-relieving botanical to support neurotransmitters that enhance mood, sleep, and mental focus",
    description: `Rhodiola is a brain adaptogen that helps balance serotonin, norepinephrine, and dopamine without causing fatigue or drowsiness. It may also boos

We carry **Rhodiola** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

We carry this in the sleep section because Thorne formulates it without the synthetic sleep cocktail you'll find in most pharmacy aisles — no Tylenol PM-style antihistamines, no proprietary blends. Just clean, dose-disclosed actives that play nicely with a wind-down routine.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 24.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf755__v47d423009f07c9721af0b6b7092ed1afb30bd9b6.png",
    categorySlug: "mindful-living",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["sleep", "energy"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["Clean formulation — no antihistamines or proprietary blends", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "A stress-relieving botanical to support neurotransmitters that enhance mood, sleep, and mental focus",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-bacillus-coagulans",
    slug: "thorne-bacillus-coagulans",
    name: "Bacillus Coagulans (Daily Probiotic)",
    brand: "Thorne",
    tagline: "An everyday, all-ages probiotic that promotes GI function and bowel regularity",
    description: `A stable probiotic bacteria that survives stomach acid and retains its potency in the intestines, where it can support GI upset, such as occasional gas, bloating, con

We carry **Bacillus Coagulans (Daily Probiotic)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

Gut health is where Thorne's quality control really shows. Their probiotics are individually CFU-tested at expiration (not just at manufacture), and their digestive aids skip the cheap fillers that can re-irritate an already inflamed gut lining.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 33.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf758__v3e8fa1f9588d8a54e1b172f23b8701c8be439cec.png",
    categorySlug: "gut-immunity",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["gut"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["CFU-tested at expiration, not just at manufacture", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "An everyday, all-ages probiotic that promotes GI function and bowel regularity",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-gi-encap",
    slug: "thorne-gi-encap",
    name: "GI-Encap® (GI Relief)",
    brand: "Thorne",
    tagline: "Ease digestive discomfort with GI Relief",
    description: `A comforting blend of botanical extracts – aloe vera, slippery elm, marshmallow root, and licorice – to calm irritation and soothe the mucous membranes of the GI tract.* GI Relief Gut Health (5/5)

We carry **GI-Encap® (GI Relief)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

Gut health is where Thorne's quality control really shows. Their probiotics are individually CFU-tested at expiration (not just at manufacture), and their digestive aids skip the cheap fillers that can re-irritate an already inflamed gut lining.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 41.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf714__vb37616fd858ea3929ad67e31a10758eecf81055c.png",
    categorySlug: "gut-immunity",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["gut"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["CFU-tested at expiration, not just at manufacture", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "Ease digestive discomfort with GI Relief",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-l-glutamine-capsules",
    slug: "thorne-l-glutamine-capsules",
    name: "L-Glutamine Capsules",
    brand: "Thorne",
    tagline: "An amino acid that promotes post-exercise muscle cell repair and supports gastrointestinal and immune system health",
    description: `L-glutamine is an amino acid that supports a healthy intestinal lining and optimal immune function, in addition to as

We carry **L-Glutamine Capsules** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

Gut health is where Thorne's quality control really shows. Their probiotics are individually CFU-tested at expiration (not just at manufacture), and their digestive aids skip the cheap fillers that can re-irritate an already inflamed gut lining.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 26.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sa518__v2676db816bc07d34680981434281b27beae46edd.png",
    categorySlug: "gut-immunity",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["gut", "performance"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["CFU-tested at expiration, not just at manufacture", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "An amino acid that promotes post-exercise muscle cell repair and supports gastrointestinal and immune system health",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-florasport-20b",
    slug: "thorne-florasport-20b",
    name: "FloraSport 20B (Athletic Probiotic)",
    brand: "Thorne",
    tagline: "The four unique strains in FloraSport 20B provide 20 billion live organisms per capsule A stable, high-potency probiotic blend of clinically studied bacterial strains that support gut health, immune f",
    description: `The four unique strains in FloraSport 20B provide 20 billion live organisms per capsule A stable, high-potency probiotic blend of clinically studied bacterial strains that support gut health, immune f

We carry **FloraSport 20B (Athletic Probiotic)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

Gut health is where Thorne's quality control really shows. Their probiotics are individually CFU-tested at expiration (not just at manufacture), and their digestive aids skip the cheap fillers that can re-irritate an already inflamed gut lining.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 42.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf818__ve914d54c2e9c194f29393684b2a95f9afc00f90b.png",
    categorySlug: "gut-immunity",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["gut", "performance"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["CFU-tested at expiration, not just at manufacture", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "The four unique strains in FloraSport 20B provide 20 billion live organisms per capsule A stable, high-potency probiotic blend of clinically studied bacterial strains that support gut health, immune f",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-ascorbic-acid",
    slug: "thorne-ascorbic-acid",
    name: "Ascorbic Acid (Pure Vitamin C)",
    brand: "Thorne",
    tagline: "Provides antioxidant and immune support, while also promoting healthy, glowing skin",
    description: `Get support for healthy skin and optimal whole-body wellness with Vitamin C – a vitamin that promotes healthy immune function and collagen production.* Vitamin C

We carry **Ascorbic Acid (Pure Vitamin C)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

We slot this into our skin shelf because the inside-out approach genuinely works: skin barrier and collagen synthesis depend on a handful of nutrients that most modern diets under-deliver. Thorne's bioavailable forms absorb noticeably better than the cheaper oxide and ascorbate variants used by drugstore brands.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 19.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/c153__vcd4b78f8bfe7c73b04a3df966163bd5081d99eda.png",
    categorySlug: "skin-beauty",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["skin", "immunity"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["Bioavailable forms that out-absorb cheaper drugstore variants", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "Provides antioxidant and immune support, while also promoting healthy, glowing skin",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-niacinamide",
    slug: "thorne-niacinamide",
    name: "Niacinamide (Vitamin B3)",
    brand: "Thorne",
    tagline: "A form of vitamin B3 that provides cellular protection and supports joints, skin, and restful sleep",
    description: `Niacinamide, a non-flushing form of vitamin B3, supports joint and skin health and promotes restful sleep.* It has also been shown to protect bet

We carry **Niacinamide (Vitamin B3)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

We slot this into our skin shelf because the inside-out approach genuinely works: skin barrier and collagen synthesis depend on a handful of nutrients that most modern diets under-deliver. Thorne's bioavailable forms absorb noticeably better than the cheaper oxide and ascorbate variants used by drugstore brands.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 26.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/b131__v33863e8f617b1b7664d537904212b01c91935162.png",
    categorySlug: "skin-beauty",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["skin"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["Bioavailable forms that out-absorb cheaper drugstore variants", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "A form of vitamin B3 that provides cellular protection and supports joints, skin, and restful sleep",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-buffered-c-powder",
    slug: "thorne-buffered-c-powder",
    name: "Buffered C Powder",
    brand: "Thorne",
    tagline: "Vitamin C with buffering minerals, so it’s gentle on the stomach High Potency Vitamin C supplies a higher amount of vitamin C per serving than our capsules, with calcium, magnesium, and potassium mine",
    description: `Vitamin C with buffering minerals, so it’s gentle on the stomach High Potency Vitamin C supplies a higher amount of vitamin C per serving than our capsules, with calcium, magnesium, and potassium mine

We carry **Buffered C Powder** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

We slot this into our skin shelf because the inside-out approach genuinely works: skin barrier and collagen synthesis depend on a handful of nutrients that most modern diets under-deliver. Thorne's bioavailable forms absorb noticeably better than the cheaper oxide and ascorbate variants used by drugstore brands.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 29.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/c155__va9065a0f8b6870943d8baf04ddae8cb21f1bdf81.png",
    categorySlug: "skin-beauty",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["skin", "immunity"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["Bioavailable forms that out-absorb cheaper drugstore variants", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "Vitamin C with buffering minerals, so it’s gentle on the stomach High Potency Vitamin C supplies a higher amount of vitamin C per serving than our capsules, with calcium, magnesium, and potassium mine",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-zinc-bisglycinate-15",
    slug: "thorne-zinc-bisglycinate-15",
    name: "Zinc Bisglycinate 15mg",
    brand: "Thorne",
    tagline: "A well-absorbed form of zinc that supports general health, from immune function to reproductive health",
    description: `Zinc Bisglycinate helps to support optimal wellness, promotes healthy connective tissue and skin repair, and helps maintain eye and reproducti

We carry **Zinc Bisglycinate 15mg** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

We slot this into our skin shelf because the inside-out approach genuinely works: skin barrier and collagen synthesis depend on a handful of nutrients that most modern diets under-deliver. Thorne's bioavailable forms absorb noticeably better than the cheaper oxide and ascorbate variants used by drugstore brands.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 15.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/m290__vbb469846ef337edde82c959bff7b43e82947c66b.png",
    categorySlug: "skin-beauty",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["skin"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["Bioavailable forms that out-absorb cheaper drugstore variants", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "A well-absorbed form of zinc that supports general health, from immune function to reproductive health",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-creatine-90",
    slug: "thorne-creatine-90",
    name: "Creatine (90 servings, NSF for Sport)",
    brand: "Thorne",
    tagline: "High-quality creatine for lean muscle mass, endurance, cellular energy, and brain function",
    description: `Promote enhanced muscle performance and strength with creatine monohydrate. Great for more than just athletes – it also supports cellular ener

We carry **Creatine (90 servings, NSF for Sport)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

Thorne's performance line is NSF Certified for Sport — meaning every batch is screened for the 270+ banned substances pro athletes have to avoid. That level of testing is rare in the supplement world, and it's why the UFC, USA Cycling, and CrossFit Games all use Thorne as their official partner.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 84.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf904__v87fa43541d282e0b20d879217b57c150a5e2a6ad.png",
    categorySlug: "longevity-performance",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["performance"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["NSF Certified for Sport — banned-substance screened every batch", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "High-quality creatine for lean muscle mass, endurance, cellular energy, and brain function",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-creatine-30",
    slug: "thorne-creatine-30",
    name: "Creatine (30 servings)",
    brand: "Thorne",
    tagline: "High-quality creatine for lean muscle mass, endurance, cellular energy, and brain function",
    description: `Promote enhanced muscle performance and strength with creatine monohydrate. Great for more than just athletes – it also supports cellular ener

We carry **Creatine (30 servings)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

Thorne's performance line is NSF Certified for Sport — meaning every batch is screened for the 270+ banned substances pro athletes have to avoid. That level of testing is rare in the supplement world, and it's why the UFC, USA Cycling, and CrossFit Games all use Thorne as their official partner.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 36.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf903p__v828348ce760698e005a5a00517926567469207be.png",
    categorySlug: "longevity-performance",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["performance"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["NSF Certified for Sport — banned-substance screened every batch", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "High-quality creatine for lean muscle mass, endurance, cellular energy, and brain function",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-creatine-pineapple-orange",
    slug: "thorne-creatine-pineapple-orange",
    name: "Creatine (Pineapple Orange)",
    brand: "Thorne",
    tagline: "High-quality creatine for lean muscle mass, endurance, cellular energy, and brain function",
    description: `Promote enhanced muscle performance and strength with creatine monohydrate. Great for more than just athletes – it also supports cellular energy produ

We carry **Creatine (Pineapple Orange)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

Thorne's performance line is NSF Certified for Sport — meaning every batch is screened for the 270+ banned substances pro athletes have to avoid. That level of testing is rare in the supplement world, and it's why the UFC, USA Cycling, and CrossFit Games all use Thorne as their official partner.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 48.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf906__vdebab3684bf3a3daa50144a2e8b7d6591ca554be.png",
    categorySlug: "longevity-performance",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["performance"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["NSF Certified for Sport — banned-substance screened every batch", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "High-quality creatine for lean muscle mass, endurance, cellular energy, and brain function",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-creatine-bcaas",
    slug: "thorne-creatine-bcaas",
    name: "Creatine + BCAAs (Peach Mango)",
    brand: "Thorne",
    tagline: "A dual-action formula that enhances strength and sustains endurance for the most intense workouts",
    description: `Clinically studied creatine monohydrate combined with 3 essential branched-chain amino acids (BCAAs) helps sustain power output during exercise

We carry **Creatine + BCAAs (Peach Mango)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

Thorne's performance line is NSF Certified for Sport — meaning every batch is screened for the 270+ banned substances pro athletes have to avoid. That level of testing is rare in the supplement world, and it's why the UFC, USA Cycling, and CrossFit Games all use Thorne as their official partner.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 52.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf912__v93bd9a109593c267e39bd3006bb069472eee709e.png",
    categorySlug: "longevity-performance",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["performance"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["NSF Certified for Sport — banned-substance screened every batch", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "A dual-action formula that enhances strength and sustains endurance for the most intense workouts",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-beta-alanine-sr",
    slug: "thorne-beta-alanine-sr",
    name: "Beta-Alanine-SR",
    brand: "Thorne",
    tagline: "Train harder for longer with support for muscle output and endurance",
    description: `Beta Alanine-SR supports your training goals by benefiting muscle output and helping to reduce fatigue and soreness. Sustained-release technology provid

We carry **Beta-Alanine-SR** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

Thorne's performance line is NSF Certified for Sport — meaning every batch is screened for the 270+ banned substances pro athletes have to avoid. That level of testing is rare in the supplement world, and it's why the UFC, USA Cycling, and CrossFit Games all use Thorne as their official partner.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 46.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf907__v9cad7c94ce816d45d49ad75664156a0a1539e38d.png",
    categorySlug: "longevity-performance",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["performance"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["NSF Certified for Sport — banned-substance screened every batch", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "Train harder for longer with support for muscle output and endurance",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-catalyte-lemon-lime",
    slug: "thorne-catalyte-lemon-lime",
    name: "Catalyte® (Lemon Lime, NSF for Sport)",
    brand: "Thorne",
    tagline: "Restores electrolytes that promote performance, endurance, and recovery",
    description: `Catalyte is an electrolyte restoration complex that supports endurance and recovery.* The lemon-lime flavor is low in both calories and sugar. NSF Ce

We carry **Catalyte® (Lemon Lime, NSF for Sport)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

Thorne's performance line is NSF Certified for Sport — meaning every batch is screened for the 270+ banned substances pro athletes have to avoid. That level of testing is rare in the supplement world, and it's why the UFC, USA Cycling, and CrossFit Games all use Thorne as their official partner.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 34.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf101__va6f868ad0ef16a7f98cbcd775fe480cb815a8eac.png",
    categorySlug: "longevity-performance",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["performance"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["NSF Certified for Sport — banned-substance screened every batch", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "Restores electrolytes that promote performance, endurance, and recovery",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-electrolytes-mango-limeade",
    slug: "thorne-electrolytes-mango-limeade",
    name: "Daily Electrolytes (Mango Limeade)",
    brand: "Thorne",
    tagline: "Replenish electrolytes to optimize cellular rehydration and recovery",
    description: `On-the-go hydration, designed to restore fluid balance, enhance cellular energy, and maximize athletic performance.* NSF Certified for Sport® Daily Elec

We carry **Daily Electrolytes (Mango Limeade)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

Thorne's performance line is NSF Certified for Sport — meaning every batch is screened for the 270+ banned substances pro athletes have to avoid. That level of testing is rare in the supplement world, and it's why the UFC, USA Cycling, and CrossFit Games all use Thorne as their official partner.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 40.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf910p__v0e1d606f85cefd00527e02fe814c5c3cf1758c46.png",
    categorySlug: "longevity-performance",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["performance"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["NSF Certified for Sport — banned-substance screened every batch", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "Replenish electrolytes to optimize cellular rehydration and recovery",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-electrolytes-blood-orange",
    slug: "thorne-electrolytes-blood-orange",
    name: "Daily Electrolytes (Blood Orange)",
    brand: "Thorne",
    tagline: "Replenish electrolytes to optimize cellular rehydration and recovery",
    description: `On-the-go hydration, designed to restore fluid balance, enhance cellular energy, and maximize athletic performance.* NSF Certified for Sport® Daily Elec

We carry **Daily Electrolytes (Blood Orange)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

Thorne's performance line is NSF Certified for Sport — meaning every batch is screened for the 270+ banned substances pro athletes have to avoid. That level of testing is rare in the supplement world, and it's why the UFC, USA Cycling, and CrossFit Games all use Thorne as their official partner.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 40.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf909p__v5f7efb74adb0bb73cdf3f3df54f468e3a4e99e36.png",
    categorySlug: "longevity-performance",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["performance"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["NSF Certified for Sport — banned-substance screened every batch", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "Replenish electrolytes to optimize cellular rehydration and recovery",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-electrolytes-variety",
    slug: "thorne-electrolytes-variety",
    name: "Daily Electrolytes (30-stick Variety)",
    brand: "Thorne",
    tagline: "Replenish electrolytes to optimize cellular rehydration and recovery",
    description: `On-the-go hydration, designed to restore fluid balance, enhance cellular energy, and maximize athletic performance.* NSF Certified for Sport® Daily Electrolytes - V

We carry **Daily Electrolytes (30-stick Variety)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

Thorne's performance line is NSF Certified for Sport — meaning every batch is screened for the 270+ banned substances pro athletes have to avoid. That level of testing is rare in the supplement world, and it's why the UFC, USA Cycling, and CrossFit Games all use Thorne as their official partner.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 40.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sf911p__v59a9cae0f03398321a1ee93acdf66ebbce1e9c46.png",
    categorySlug: "longevity-performance",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["performance"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["NSF Certified for Sport — banned-substance screened every batch", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "Replenish electrolytes to optimize cellular rehydration and recovery",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-plant-protein-vanilla",
    slug: "thorne-plant-protein-vanilla",
    name: "Plant Protein (Vanilla)",
    brand: "Thorne",
    tagline: "Power up with plant protein from pea, brown rice, and chia in a vegan formula for lean muscle mass",
    description: `Thorne’s Plant Protein provides all 9 essential amino acids in a vegan formula for muscle maintenance and repair, to help you keep up with an

We carry **Plant Protein (Vanilla)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

Thorne's performance line is NSF Certified for Sport — meaning every batch is screened for the 270+ banned substances pro athletes have to avoid. That level of testing is rare in the supplement world, and it's why the UFC, USA Cycling, and CrossFit Games all use Thorne as their official partner.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 49.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sp120__vede47ec92d6f0ae07556adb963851f90c2736c22.png",
    categorySlug: "longevity-performance",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["performance"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["NSF Certified for Sport — banned-substance screened every batch", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "Power up with plant protein from pea, brown rice, and chia in a vegan formula for lean muscle mass",
    servingSize: "See product label for full directions",
  },
  {
    id: "p-thorne-plant-protein-chocolate",
    slug: "thorne-plant-protein-chocolate",
    name: "Plant Protein (Chocolate)",
    brand: "Thorne",
    tagline: "Power up with plant protein from pea, brown rice, and chia in a vegan formula for lean muscle mass",
    description: `Thorne’s Plant Protein provides all 9 essential amino acids in a vegan formula for muscle maintenance and repair, to help you keep up with an

We carry **Plant Protein (Chocolate)** because independent batch testing for purity and potency, nsf-certified manufacturing, and a research division that publishes actual clinical data — that's the bar we hold supplement brands to, and thorne is one of the few consumer-facing companies that clears it.

Thorne's performance line is NSF Certified for Sport — meaning every batch is screened for the 270+ banned substances pro athletes have to avoid. That level of testing is rare in the supplement world, and it's why the UFC, USA Cycling, and CrossFit Games all use Thorne as their official partner.

Use the link on this page to get **10% off** through our Thorne affiliate partnership. The code applies automatically when you click through — same Thorne, same shipping, just a small kickback to us at no cost to you.`,
    price: 49.0,
    currency: "USD",
    imageUrl: "https://d1vo8zfysxy97v.cloudfront.net/media/product/sp119__v428008a2a31bb91457a9a8eac9407ff042e92192.png",
    categorySlug: "longevity-performance",
    affiliateUrl: THORNE_AFFILIATE,
    merchant: "Thorne",
    certifications: ["Third-Party Tested", "Non-GMO"],
    goals: ["performance"],
    rating: 4.7,
    isEditorPick: false,
    isFeatured: false,
    pros: ["NSF Certified for Sport — banned-substance screened every batch", "Independently lab-tested for purity and potency", "NSF-certified manufacturing facility", "10% off through our affiliate link"],
    cons: ["Higher price point than mass-market brands", "Available direct from Thorne (not in big-box stores)"],
    ingredients: "Power up with plant protein from pea, brown rice, and chia in a vegan formula for lean muscle mass",
    servingSize: "See product label for full directions",
  },
];
