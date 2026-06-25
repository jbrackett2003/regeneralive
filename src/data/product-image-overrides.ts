/**
 * Product image overrides — slug -> stable local /products/<slug>.<ext> path.
 *
 * These replace generic stock photos with real brand product photography for
 * products where the seed file's original image_url was a generic Unsplash
 * URL (or a duplicate shared across multiple products). Files live under
 * `public/products/` and are bundled with the Docker image, so URLs never
 * expire and are served directly by Next.js.
 *
 * To add a new override: drop the file in `public/products/<slug>.<ext>`,
 * add the slug -> path mapping below, and bump `PRODUCT_IMAGES_VERSION`.
 *
 * The migration in `src/lib/db.ts` (migrateApplyProductImages) reads this
 * map and runs `UPDATE products SET image_url = ... WHERE slug = ...` on
 * production each time the version changes. Because the version is a
 * settings flag, redeploys with the same version are no-ops.
 */
export const PRODUCT_IMAGES_VERSION = "v4_2026_06_25_thorne_dedup";

/**
 * Slugs that should be hidden from the storefront. These are either:
 *   (a) literal duplicate slugs that point to the same product as another
 *       slug already in the catalog (e.g. "thorne-women-s-daily-probiotic"
 *       vs "thorne-womens-daily-probiotic"), or
 *   (b) products that have been discontinued by the brand and for which no
 *       legitimate front-facing packshot is available — better to hide
 *       than to show a wrong image.
 *
 * Applied via `migrateApplyProductImages` (sets is_hidden = 1).
 */
export const PRODUCT_HIDDEN_SLUGS: readonly string[] = [
  // Literal-duplicate slug pairs — keep one, hide the other
  "thorne-d-5-000-vitamin-d-capsule",      // dup of thorne-vitamin-d-5000
  "thorne-women-s-daily-probiotic",        // dup of thorne-womens-daily-probiotic
  "thorne-magnesium-citramate-powder",     // Thorne CitraMate has no powder variant
  "thorne-bio-quench",                     // rebranded into Advanced Digestive Enzymes (covered by thorne-pancreatic-enzymes)
  "thorne-beauty-powder",                  // rebranded into Collagen Plus (covered by thorne-collagen-plus)
  // Products discontinued by Thorne with no current packshot
  "thorne-bone-protect",
  "thorne-cats-claw",
  "thorne-dhea-25",
  "thorne-holy-basil",
  "thorne-pregnenolone",
  "thorne-memoractiv",
  "thorne-neuromag",
  "thorne-biological-age-test",
  "thorne-gut-health-test",
  "thorne-sleep-test",
  "thorne-stress-test",
  "thorne-vitamin-d-test",
];

export const PRODUCT_IMAGE_OVERRIDES: Record<string, string> = {
  // ── Regenerative pantry: meat brands (kill duplicate burger photos) ──
  "force-of-nature-regenerative-ground-bison":
    "/products/force-of-nature-regenerative-ground-bison.jpg",
  "white-oak-pastures-heritage-pork":
    "/products/white-oak-pastures-heritage-pork.jpg",
  "polyface-farm-pasture-chicken":
    "/products/polyface-farm-pasture-chicken.webp",
  "butcherbox-grass-fed-beef-box": "/products/butcherbox-grass-fed-beef-box.jpg",
  "crowd-cow-grass-fed-beef-sampler":
    "/products/crowd-cow-grass-fed-beef-sampler.jpg",
  "us-wellness-meats-sugar-steak": "/products/us-wellness-meats-sugar-steak.png",
  "wild-idea-buffalo-ribeye-steak":
    "/products/wild-idea-buffalo-ribeye-steak.jpg",
  "seven-sons-grass-fed-ground-beef":
    "/products/seven-sons-grass-fed-ground-beef.webp",
  "rep-provisions-regenerative-beef-box":
    "/products/rep-provisions-regenerative-beef-box.png",
  "good-ranchers-american-meat-box":
    "/products/good-ranchers-american-meat-box.webp",

  // ── Regenerative pantry: oils, broths, pasta, dairy, staples ──
  "fond-grass-fed-bone-broth": "/products/fond-grass-fed-bone-broth.jpg",
  "jovial-einkorn-pasta": "/products/jovial-einkorn-pasta.jpg",
  "frantoia-sicilian-olive-oil": "/products/frantoia-sicilian-olive-oil.jpg",
  "kerrygold-grass-fed-butter": "/products/kerrygold-grass-fed-butter.jpg",
  "anson-mills-grits": "/products/anson-mills-grits.webp",
  "fly-by-jing-sichuan-chili-crisp":
    "/products/fly-by-jing-sichuan-chili-crisp.jpg",
  "brightland-arise-evoo": "/products/brightland-arise-evoo.jpg",
  "graza-drizzle-extra-virgin-olive-oil":
    "/products/graza-drizzle-extra-virgin-olive-oil.jpg",

  // ── Supplements / longevity / kitchen / cacao ──
  "rosita-extra-virgin-cod-liver-oil":
    "/products/rosita-extra-virgin-cod-liver-oil.jpg",
  "momentous-creatine": "/products/momentous-creatine.png",
  "stargazer-cast-iron-skillet": "/products/stargazer-cast-iron-skillet.jpg",
  "vitamix-a3500-blender": "/products/vitamix-a3500-blender.jpg",
  "anima-mundi-ceremonial-cacao": "/products/anima-mundi-ceremonial-cacao.png",

  // ── Featured-product photography (Thorne, filtration, broth, etc.) ──
  "thorne-basic-nutrients-2-day": "/products/thorne-basic-nutrients-2-day.png",
  "thorne-vitamin-d-5000": "/products/thorne-vitamin-d-5000.png",
  "thorne-creatine": "/products/thorne-creatine.png",
  "thorne-resveracel": "/products/thorne-resveracel.png",
  "thorne-whey-protein-isolate-vanilla":
    "/products/thorne-whey-protein-isolate-vanilla.jpg",
  "kettle-fire-bone-broth": "/products/kettle-fire-bone-broth.jpg",
  "seed-ds-01-daily-synbiotic": "/products/seed-ds-01-daily-synbiotic.jpg",
  "clearly-filtered-under-sink-3-stage":
    "/products/clearly-filtered-under-sink-3-stage.jpg",
  "clearly-filtered-water-pitcher":
    "/products/clearly-filtered-water-pitcher.jpg",
  "aquatru-reverse-osmosis-water-filter":
    "/products/aquatru-reverse-osmosis-water-filter.jpg",
  "thorne-multi-vitamin-elite": "/products/thorne-multi-vitamin-elite.png",
  "thorne-q-best-100": "/products/thorne-q-best-100.png",
  "beam-dream-powder": "/products/beam-dream-powder.jpg",
  "loftie-alarm-clock": "/products/loftie-alarm-clock.jpg",
  "alter-eco-deepest-dark-chocolate":
    "/products/alter-eco-deepest-dark-chocolate.png",
  "force-of-nature-ancestral-blend":
    "/products/force-of-nature-ancestral-blend.jpg",
  "paleovalley-100-grass-fed-beef-sticks":
    "/products/paleovalley-100-grass-fed-beef-sticks.jpg",
  "thrive-market-pantry-staples-box":
    "/products/thrive-market-pantry-staples-box.jpg",
  "vital-choice-wild-salmon": "/products/vital-choice-wild-salmon.jpg",
  "vital-farms-pasture-raised-eggs":
    "/products/vital-farms-pasture-raised-eggs.jpg",

  // ── More featured products (skincare, wearables, prenatal, dairy, etc.) ──
  "white-oak-pastures-ground-beef":
    "/products/white-oak-pastures-ground-beef.jpg",
  "marie-veronique-c-e-caffeic-serum":
    "/products/marie-veronique-c-e-caffeic-serum.png",
  "osea-undaria-body-oil-large": "/products/osea-undaria-body-oil-large.jpg",
  "vintners-daughter-active-botanical-serum":
    "/products/vintners-daughter-active-botanical-serum.jpg",
  "four-sigmatic-think-mushroom-coffee":
    "/products/four-sigmatic-think-mushroom-coffee.jpg",
  "host-defense-stamets-7": "/products/host-defense-stamets-7.jpg",
  "thorne-daily-greens-plus": "/products/thorne-daily-greens-plus.jpg",
  "oura-ring-gen-4": "/products/oura-ring-gen-4.jpg",
  "whoop-strap-5-0": "/products/whoop-strap-5-0.jpg",
  "pure-encapsulations-b-complex-plus":
    "/products/pure-encapsulations-b-complex-plus.png",
  "pure-encapsulations-magnesium-glycinate":
    "/products/pure-encapsulations-magnesium-glycinate.jpg",
  "ritual-essential-for-women-18plus":
    "/products/ritual-essential-for-women-18plus.jpg",
  "thorne-basic-prenatal": "/products/thorne-basic-prenatal.png",
  "thorne-calcium-magnesium-citrate":
    "/products/thorne-calcium-magnesium-citrate.png",
  "thorne-prenatal-postnatal-dha":
    "/products/thorne-prenatal-postnatal-dha.png",
  "coconut-cult-yogurt": "/products/coconut-cult-yogurt.webp",
  "boroux-original-gravity-filter":
    "/products/boroux-original-gravity-filter.jpg",
  "alexandre-family-farm-milk": "/products/alexandre-family-farm-milk.jpg",
  "crown-maple-organic-syrup": "/products/crown-maple-organic-syrup.jpg",

  // ── Final featured-product round (electrolytes, watches, sleep, coffee) ──
  "lmnt-electrolytes": "/products/lmnt-electrolytes.jpg",
  "armra-colostrum": "/products/armra-colostrum.jpg",
  "our-place-always-pan": "/products/our-place-always-pan.jpg",
  "big-berkey-gravity-filter": "/products/big-berkey-gravity-filter.jpg",
  "tru-niagen-nicotinamide-riboside":
    "/products/tru-niagen-nicotinamide-riboside.jpg",
  "moon-juice-magnesi-om": "/products/moon-juice-magnesi-om.jpg",
  "eight-sleep-pod-cover": "/products/eight-sleep-pod-cover.png",
  "pluck-organ-meat-seasoning": "/products/pluck-organ-meat-seasoning.jpg",
  "heirloom-coffee-roc-coffee": "/products/heirloom-coffee-roc-coffee.jpg",
  "true-botanicals-cellular-repair-serum":
    "/products/true-botanicals-cellular-repair-serum.webp",
  "supergoop-unseen-sunscreen": "/products/supergoop-unseen-sunscreen.webp",
  "four-sigmatic-lions-mane-elixir":
    "/products/four-sigmatic-lions-mane-elixir.jpg",
  "apple-watch-ultra-2": "/products/apple-watch-ultra-2.jpg",
  "garmin-fenix-8": "/products/garmin-fenix-8.jpg",

  // ── Pantry de-dup (kill remaining duplicate Unsplash photos) ──
  "crowd-cow-wagyu-bundle": "/products/crowd-cow-wagyu-bundle.jpg",
  "belcampo-grass-fed-ribeye": "/products/belcampo-grass-fed-ribeye.jpg",
  "fishwife-tinned-trout": "/products/fishwife-tinned-trout.jpg",
  "patagonia-provisions-mussels":
    "/products/patagonia-provisions-mussels.jpg",
  "bobbie-organic-formula": "/products/bobbie-organic-formula.png",
  "serenity-kids-baby-food": "/products/serenity-kids-baby-food.png",
  "just-date-syrup": "/products/just-date-syrup.jpg",
  "siete-grain-free-tortillas": "/products/siete-grain-free-tortillas.jpg",
  "lundberg-wild-blend-rice": "/products/lundberg-wild-blend-rice.jpg",
  "lundberg-organic-basmati": "/products/lundberg-organic-basmati.png",
  "patagonia-provisions-tinned-sardines":
    "/products/patagonia-provisions-tinned-sardines.jpg",
  "fishwife-mackerel": "/products/fishwife-mackerel.png",
  "equator-french-press-roast": "/products/equator-french-press-roast.png",
  "cafe-altura-colombian-coffee":
    "/products/cafe-altura-colombian-coffee.jpg",

  // ── Thorne dedup batch (v4 2026-06-25): canonical Thorne CDN packshots ──
  // 51 products had been wrongly assigned shared placeholder URLs (sf755,
  // m204p, sf788, sf818, etc.). Each entry below replaces the placeholder
  // with the real front-facing packshot harvested directly from each
  // product's PDP on thorne.com. Files sit under public/products/.
  "thorne-5-htp": "/products/thorne-5-htp.png",
  "thorne-amino-complex-tropical":
    "/products/thorne-amino-complex-tropical.png",
  "thorne-appecurb": "/products/thorne-appecurb.png",
  "thorne-beauty-powder": "/products/thorne-beauty-powder.png",
  "thorne-beta-performance": "/products/thorne-beta-performance.png",
  "thorne-betaine-hcl-pepsin": "/products/thorne-betaine-hcl-pepsin.png",
  "thorne-bio-quench": "/products/thorne-bio-quench.png",
  "thorne-boswellia-phytosome": "/products/thorne-boswellia-phytosome.png",
  "thorne-calcium-d-glucarate": "/products/thorne-calcium-d-glucarate.png",
  "thorne-collagen-plus": "/products/thorne-collagen-plus.png",
  "thorne-cysteplus-reg": "/products/thorne-cysteplus-reg.png",
  "thorne-d-5-000-vitamin-d-capsule":
    "/products/thorne-d-5-000-vitamin-d-capsule.png",
  "thorne-enteromend": "/products/thorne-enteromend.png",
  "thorne-florasport-20b": "/products/thorne-florasport-20b.png",
  "thorne-hair-skin-nails": "/products/thorne-hair-skin-nails.png",
  "thorne-krill-oil": "/products/thorne-krill-oil.png",
  "thorne-l-glutamine": "/products/thorne-l-glutamine.png",
  "thorne-l-glutamine-capsules": "/products/thorne-l-glutamine-capsules.png",
  "thorne-magnesium-bisglycinate-powder":
    "/products/thorne-magnesium-bisglycinate-powder.png",
  "thorne-magnesium-citramate": "/products/thorne-magnesium-citramate.png",
  "thorne-magnesium-citramate-powder":
    "/products/thorne-magnesium-citramate-powder.png",
  "thorne-magnesium-glycinate": "/products/thorne-magnesium-glycinate.png",
  "thorne-medibolic": "/products/thorne-medibolic.png",
  "thorne-mediclear-sgs": "/products/thorne-mediclear-sgs.png",
  "thorne-melaton-3": "/products/thorne-melaton-3.png",
  "thorne-nac": "/products/thorne-nac.png",
  "thorne-nad-synergy": "/products/thorne-nad-synergy.png",
  "thorne-olive-leaf": "/products/thorne-olive-leaf.png",
  "thorne-omega-plus": "/products/thorne-omega-plus.png",
  "thorne-pancreatic-enzymes": "/products/thorne-pancreatic-enzymes.png",
  "thorne-plant-protein-greens": "/products/thorne-plant-protein-greens.png",
  "thorne-polyresveratrol-sr": "/products/thorne-polyresveratrol-sr.png",
  "thorne-pre-workout-elite": "/products/thorne-pre-workout-elite.png",
  "thorne-ps-100": "/products/thorne-ps-100.png",
  "thorne-r-lipoic-acid": "/products/thorne-r-lipoic-acid.png",
  "thorne-radiant-skin-pack": "/products/thorne-radiant-skin-pack.png",
  "thorne-recovery-pro": "/products/thorne-recovery-pro.png",
  "thorne-rhodiola": "/products/thorne-rhodiola.png",
  "thorne-sacro-b": "/products/thorne-sacro-b.png",
  "thorne-taurine": "/products/thorne-taurine.png",
  "thorne-ubiquinol-150": "/products/thorne-ubiquinol-150.png",
  "thorne-vitamin-a": "/products/thorne-vitamin-a.png",
  "thorne-vitamin-e-tocotrienols":
    "/products/thorne-vitamin-e-tocotrienols.png",
  "thorne-vitamin-k2": "/products/thorne-vitamin-k2.png",
  "thorne-whey-protein-plus": "/products/thorne-whey-protein-plus.png",
  "thorne-women-s-daily-probiotic":
    "/products/thorne-women-s-daily-probiotic.png",
  "thorne-womens-daily-probiotic":
    "/products/thorne-womens-daily-probiotic.png",
};