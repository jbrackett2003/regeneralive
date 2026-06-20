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
export const PRODUCT_IMAGES_VERSION = "v2_2026_06_20";

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
  "us-wellness-meats-sugar-steak": "/products/us-wellness-meats-sugar-steak.jpg",
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
  "anson-mills-grits": "/products/anson-mills-grits.jpg",
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
  "anima-mundi-ceremonial-cacao": "/products/anima-mundi-ceremonial-cacao.jpg",

  // ── Featured-product photography (Thorne, filtration, broth, etc.) ──
  "thorne-basic-nutrients-2-day": "/products/thorne-basic-nutrients-2-day.png",
  "thorne-vitamin-d-5000": "/products/thorne-vitamin-d-5000.jpg",
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
  "thorne-basic-prenatal": "/products/thorne-basic-prenatal.jpg",
  "thorne-calcium-magnesium-citrate":
    "/products/thorne-calcium-magnesium-citrate.jpg",
  "thorne-prenatal-postnatal-dha":
    "/products/thorne-prenatal-postnatal-dha.jpg",
  "coconut-cult-yogurt": "/products/coconut-cult-yogurt.jpg",
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
  "belcampo-grass-fed-ribeye": "/products/belcampo-grass-fed-ribeye.webp",
  "fishwife-tinned-trout": "/products/fishwife-tinned-trout.png",
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
};