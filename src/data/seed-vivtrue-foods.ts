import type { Product, Goal, Certification } from "./types";

/**
 * Vivtrue seed list — Section 2: Regenerative & Clean Food Companies.
 * Adds ~13 NEW brands not already on the site (Force of Nature, White Oak,
 * Paleovalley, Thrive Market, ButcherBox, Patagonia Provisions, Simpli,
 * Wild Pastures, Vital Choice, Dr. Bronner's, Alter Eco, Alec's Ice Cream
 * are already covered).
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
  category: "regenerative-pantry" | "superfoods-adaptogens" | "gut-immunity" | "home-kitchen";
  goals: Goal[];
  affiliateUrl: string;
  imageUrl: string;
  certs: Certification[];
  pros: string[];
  cons?: string[];
};

const COMMON_CONS = [
  "Premium pricing for regenerative sourcing",
  "Limited shipping to certain regions",
];

const rows: Row[] = [
  // ─────────── REP Provisions ───────────
  {
    slug: "rep-provisions-regenerative-beef-box",
    name: "Regenerative Beef Sampler Box",
    brand: "REP Provisions",
    tagline: "Soil-first regenerative beef from a farmer-cooperative",
    description: `REP (Regenerative Environmental Practices) Provisions is one of the clearest mission-fit DTC regenerative beef brands. Every farm in the network is verified for soil-rebuilding rotational grazing, no synthetic fertilizers, no antibiotics, 100% grass-fed and grass-finished. The sampler is your gateway to a regenerative cattle ranch.`,
    price: 169,
    category: "regenerative-pantry",
    goals: ["performance", "longevity"],
    affiliateUrl: "https://repprovisions.com",
    imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1400&q=80",
    certs: ["Regenerative Certified", "Grass-Fed", "Pasture-Raised"],
    pros: [
      "Soil-first regenerative practices",
      "Grass-fed AND grass-finished",
      "No antibiotics, no hormones",
      "Farmer-cooperative model",
    ],
  },

  // ─────────── Heirloom Coffee Roasters ───────────
  {
    slug: "heirloom-coffee-roc-coffee",
    name: "Regenerative Organic Certified Coffee",
    brand: "Heirloom Coffee Roasters",
    tagline: "ROC-certified coffee from indigenous-led farms in Latin America",
    description: `Heirloom is one of the few U.S. roasters with Regenerative Organic Certified™ beans across their main lineup. Direct-trade relationships with smallholder farms in Honduras, Guatemala, and Peru — many of them indigenous-led. Smoother, more chocolate-forward than typical specialty coffee, with full traceability to the farm.`,
    price: 22,
    category: "regenerative-pantry",
    goals: ["energy", "focus"],
    affiliateUrl: "https://heirloomcoffeeroasters.com",
    imageUrl: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=1400&q=80",
    certs: ["Regenerative Certified", "USDA Organic", "Fair Trade"],
    pros: [
      "Regenerative Organic Certified™",
      "Indigenous-led farm sourcing",
      "Direct-trade pricing",
      "Single-origin transparency",
    ],
  },

  // ─────────── Wild Idea Buffalo ───────────
  {
    slug: "wild-idea-buffalo-ribeye-steak",
    name: "Buffalo Ribeye Steak",
    brand: "Wild Idea Buffalo",
    tagline: "Field-harvested grass-fed buffalo from native prairie restoration",
    description: `Wild Idea is the buffalo brand most aligned with the original American prairie ecosystem. Their bison live their entire lives on native shortgrass prairie in South Dakota — no feedlot, no grain, no transport stress. Animals are field-harvested with a single shot to eliminate the cortisol spike of a slaughterhouse. The meat is leaner than beef, higher in iron and B12, and tastes faintly sweet.`,
    price: 64,
    category: "regenerative-pantry",
    goals: ["performance", "longevity"],
    affiliateUrl: "https://wildideabuffalo.com",
    imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1400&q=80",
    certs: ["Regenerative Certified", "Grass-Fed", "Pasture-Raised"],
    pros: [
      "100% native-prairie raised",
      "Field-harvested (no slaughterhouse)",
      "Leaner than beef, higher iron",
      "Restores native ecosystem",
    ],
  },

  // ─────────── Wild Planet Foods ───────────
  {
    slug: "wild-planet-skipjack-tuna",
    name: "Wild Skipjack Tuna in Olive Oil",
    brand: "Wild Planet Foods",
    tagline: "Pole-and-line caught skipjack — the lowest-mercury tuna option",
    description: `Wild Planet pioneered single-cooking tinned tuna in the U.S. — the fish goes straight from the boat into the can with its own juices, preserving the omega-3s, B12, and selenium that get lost in the typical pre-cook process. Pole-and-line caught skipjack means no bycatch and the smallest, fastest-maturing tuna species (lower mercury than albacore by 75%).`,
    price: 5,
    category: "regenerative-pantry",
    goals: ["longevity", "performance"],
    affiliateUrl: "https://wildplanetfoods.com",
    imageUrl: "https://images.unsplash.com/photo-1559717865-a99cac1c95d8?auto=format&fit=crop&w=1400&q=80",
    certs: ["Wild-Caught", "Non-GMO"],
    pros: [
      "Pole-and-line caught (no bycatch)",
      "Single-cooked (preserves nutrients)",
      "75% lower mercury than albacore",
      "Affordable pantry staple",
    ],
  },

  // ─────────── Navitas Organics ───────────
  {
    slug: "navitas-organic-cacao-powder",
    name: "Organic Raw Cacao Powder",
    brand: "Navitas Organics",
    tagline: "Cold-processed Peruvian cacao — the world's densest source of plant antioxidants",
    description: `Cold-processed at low temperatures to preserve the polyphenols (especially flavanols) that give cacao its mood, focus, and cardiovascular benefits. Sourced from smallholder farms in Peru's Marañón Canyon. Non-alkalized — alkalizing destroys ~60% of the antioxidants.`,
    price: 14,
    category: "superfoods-adaptogens",
    goals: ["energy", "focus"],
    affiliateUrl: "https://navitasorganics.com",
    imageUrl: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1400&q=80",
    certs: ["USDA Organic", "Fair Trade", "Non-GMO"],
    pros: [
      "Cold-processed (preserves flavanols)",
      "Non-alkalized = full antioxidants",
      "Fair-trade Peruvian source",
      "USDA Organic",
    ],
  },
  {
    slug: "navitas-maca-powder",
    name: "Organic Maca Powder",
    brand: "Navitas Organics",
    tagline: "Gelatinized Peruvian maca for hormone balance and stamina",
    description: `Maca is a Peruvian root in the brassica family traditionally used for energy, hormone balance, and libido. Gelatinization is a steam process that breaks down maca's tough starches for easier digestion (raw maca is hard on most stomachs). Sustainably grown in the Andean highlands.`,
    price: 18,
    category: "superfoods-adaptogens",
    goals: ["energy", "performance"],
    affiliateUrl: "https://navitasorganics.com",
    imageUrl: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?auto=format&fit=crop&w=1400&q=80",
    certs: ["USDA Organic", "Non-GMO"],
    pros: [
      "Gelatinized for digestibility",
      "Andean smallholder source",
      "USDA Organic",
      "Hormone & energy adaptogen",
    ],
  },

  // ─────────── Azure Standard ───────────
  {
    slug: "azure-standard-bulk-organic-grocery",
    name: "Bulk Organic & Regenerative Grocery Subscription",
    brand: "Azure Standard",
    tagline: "Family-owned bulk co-op for organic and regenerative pantry staples",
    description: `Azure Standard is a 50-year-old family-owned co-op that bulk-distributes organic grains, beans, oils, dairy, frozen meat, and household goods to drop points across the country. Pricing is wholesale — about 30-40% below health-food retail — and you can opt in at the level of a single bag of flour or a full bulk pallet.`,
    price: 0,
    category: "regenerative-pantry",
    goals: ["longevity"],
    affiliateUrl: "https://www.azurestandard.com",
    imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1400&q=80",
    certs: ["USDA Organic", "Non-GMO"],
    pros: [
      "30-40% below health-food retail",
      "Bulk options for prep & storage",
      "Drop-point pickup model",
      "Family-owned co-op since 1971",
    ],
  },

  // ─────────── Grass Roots Farmers' Cooperative ───────────
  {
    slug: "grass-roots-pasture-raised-bundle",
    name: "Pasture-Raised Meat Bundle",
    brand: "Grass Roots Farmers' Cooperative",
    tagline: "Beef, chicken, and pork from a 20-farm cooperative in the Ozarks",
    description: `A genuine farmer-owned cooperative spanning 20+ family farms across the Ozarks. Cattle are 100% grass-fed; pigs and chickens range on pasture. Every animal is traceable back to a specific farm — and the cooperative's profits are shared among the farmers, not extracted by middlemen.`,
    price: 195,
    category: "regenerative-pantry",
    goals: ["performance", "longevity"],
    affiliateUrl: "https://grassrootscoop.com",
    imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1400&q=80",
    certs: ["Grass-Fed", "Pasture-Raised", "Non-GMO"],
    pros: [
      "20-farm farmer cooperative",
      "Profits shared with farmers",
      "Traceable to specific farm",
      "Beef + pork + chicken in one box",
    ],
  },

  // ─────────── Seven Sons Farms ───────────
  {
    slug: "seven-sons-grass-fed-ground-beef",
    name: "100% Grass-Fed Ground Beef (5 lb)",
    brand: "Seven Sons Farms",
    tagline: "Family-farm grass-fed beef from regenerative Indiana pastures",
    description: `Seven Sons is a multi-generational Indiana family farm rotating cattle through pastures using management-intensive grazing — a key regenerative practice. The ground beef is 85/15, USDA inspected, and individually vacuum-sealed in 1 lb packs for easy freezer storage.`,
    price: 56,
    category: "regenerative-pantry",
    goals: ["performance"],
    affiliateUrl: "https://sevensons.net",
    imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1400&q=80",
    certs: ["Grass-Fed", "Pasture-Raised"],
    pros: [
      "Family-owned regen farm",
      "Management-intensive grazing",
      "Vacuum-sealed 1 lb packs",
      "Direct-from-farm shipping",
    ],
  },

  // ─────────── Primal Pastures ───────────
  {
    slug: "primal-pastures-pasture-raised-chicken",
    name: "Pasture-Raised Whole Chicken",
    brand: "Primal Pastures",
    tagline: "Soy-free, corn-free Southern California pasture-raised poultry",
    description: `Primal Pastures was one of the first regenerative-poultry brands in California and remains the gold standard for soy-free, corn-free pastured chicken. The birds rotate through fresh pasture daily on mobile coops; they're truly pasture-raised, not "free-range."`,
    price: 38,
    category: "regenerative-pantry",
    goals: ["performance"],
    affiliateUrl: "https://primalpastures.com",
    imageUrl: "https://images.unsplash.com/photo-1604908554049-04eef03e2c47?auto=format&fit=crop&w=1400&q=80",
    certs: ["Pasture-Raised", "Non-GMO"],
    pros: [
      "Soy-free, corn-free feed",
      "True pasture rotation (mobile coops)",
      "Family-owned California farm",
      "Antibiotic & hormone free",
    ],
  },

  // ─────────── Good Ranchers ───────────
  {
    slug: "good-ranchers-american-meat-box",
    name: "American Meat Box",
    brand: "Good Ranchers",
    tagline: "USA-raised beef, chicken, and seafood subscription",
    description: `Good Ranchers sources only USA-raised meat (no Brazilian or Australian imports labeled "Product of USA" through a loophole). Beef is grass-fed/grain-finished by default with 100% grass-fed available; chicken is pasture-raised; seafood is wild-caught Alaskan. Locks in price for one year on subscription.`,
    price: 159,
    category: "regenerative-pantry",
    goals: ["performance"],
    affiliateUrl: "https://goodranchers.com",
    imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1400&q=80",
    certs: ["Grass-Fed", "Wild-Caught"],
    pros: [
      "100% USA-raised verified",
      "Locks in 12-month subscription pricing",
      "Beef, chicken, & seafood",
      "No imported meat",
    ],
  },

  // ─────────── Three Stone Hearth ───────────
  {
    slug: "three-stone-hearth-bone-broth",
    name: "Slow-Simmered Bone Broth (32 oz)",
    brand: "Three Stone Hearth",
    tagline: "Traditional-foods kitchen bone broth — frozen, gelatin-rich",
    description: `Three Stone Hearth is a Berkeley-based traditional-foods kitchen that has been simmering bone broth for two decades by Weston A. Price methodology — pasture-raised bones, slow 24+ hour simmer, frozen at peak gelatin. The standard most other bone broths fail to clear.`,
    price: 18,
    category: "gut-immunity",
    goals: ["gut"],
    affiliateUrl: "https://threestonehearth.com",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=80",
    certs: ["Grass-Fed", "Pasture-Raised", "USDA Organic"],
    pros: [
      "24+ hour slow simmer",
      "Frozen — gelatin preserved",
      "Pasture-raised bones",
      "Weston A. Price methodology",
    ],
    cons: ["Limited shipping range (Bay Area + select states)"],
  },

  // ─────────── Biodynamic Coffee ───────────
  {
    slug: "biodynamic-coffee-medium-roast",
    name: "Biodynamic Medium Roast",
    brand: "Biodynamic Coffee",
    tagline: "Demeter biodynamic-certified coffee — beyond organic",
    description: `Biodynamic farming is the most rigorous standard in agriculture — closed-loop, no external inputs, treating the farm as a single living organism. This coffee is Demeter biodynamic certified (the international gold standard) and roasted in small batches. Smoother, deeper, less acidic than most organics.`,
    price: 24,
    category: "regenerative-pantry",
    goals: ["energy", "focus"],
    affiliateUrl: "https://biodynamiccoffee.com",
    imageUrl: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=1400&q=80",
    certs: ["Biodynamic", "USDA Organic"],
    pros: [
      "Demeter biodynamic certified",
      "Closed-loop farming",
      "Small-batch roasted",
      "Lower acid, smoother flavor",
    ],
  },
];

export const vivtrueFoods: Product[] = rows.map((r, idx) => ({
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
  rating: 4.7,
  isEditorPick: idx < 2,
  isFeatured: false,
  pros: r.pros,
  cons: r.cons ?? COMMON_CONS,
  ingredients: r.tagline,
  servingSize: "See product packaging for serving information",
}));