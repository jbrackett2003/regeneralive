import type { Product, Goal, Certification } from "./types";

/**
 * Vivtrue seed list — Section 4: Home Wellness Appliances, Cookware,
 * Water, Air, Sauna, and Healthy-Home Products. Adds ~20 NEW brands
 * across the new `healthy-home` category and `home-kitchen` for cookware.
 *
 * Skipping AquaTru, Made In, Our Place, IQAir, Berkey (Boroux is the
 * non-Berkey alternative), and Vitamix — already on the site.
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
  category: "healthy-home" | "home-kitchen";
  goals: Goal[];
  affiliateUrl: string;
  imageUrl: string;
  certs: Certification[];
  pros: string[];
  cons?: string[];
};

const COMMON_CONS = [
  "Premium pricing for premium build quality",
  "Replacement filters / parts add ongoing cost",
];

const rows: Row[] = [
  // ─────────── Clearly Filtered ───────────
  {
    slug: "clearly-filtered-water-pitcher",
    name: "Filtered Water Pitcher",
    brand: "Clearly Filtered",
    tagline: "Affinity-filter pitcher tested to remove 365+ contaminants",
    description: `Most pitcher filters (Brita, PUR) target chlorine and a handful of metals. Clearly Filtered's Affinity filtration is independently tested by NSF/ANSI labs to remove 365+ contaminants — fluoride, lead, PFAS, glyphosate, pharmaceuticals, microplastics, and chromium-6. The pitcher option for renters who can't install under-sink RO.`,
    price: 90,
    category: "healthy-home",
    goals: ["longevity"],
    affiliateUrl: "https://www.clearlyfiltered.com",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Removes 365+ contaminants tested",
      "Filters fluoride + PFAS + glyphosate",
      "No installation needed",
      "BPA-free pitcher",
    ],
  },
  {
    slug: "clearly-filtered-under-sink-3-stage",
    name: "3-Stage Under-Sink Filtration System",
    brand: "Clearly Filtered",
    tagline: "Three-stage drinking water filter — installs under any sink",
    description: `For people who want better-than-pitcher filtration without a full RO system. Three-stage filtration (sediment + carbon block + Affinity media) installs in 15 minutes under any sink with a dedicated faucet. Removes 232+ contaminants, lasts up to 10,000 gallons.`,
    price: 449,
    category: "healthy-home",
    goals: ["longevity"],
    affiliateUrl: "https://www.clearlyfiltered.com",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Removes 232+ contaminants",
      "10,000-gallon filter life",
      "15-minute install",
      "Dedicated drinking faucet",
    ],
  },

  // ─────────── Boroux (Berkey alternative) ───────────
  {
    slug: "boroux-original-gravity-filter",
    name: "Boroux Original Gravity Water Filter",
    brand: "Boroux",
    tagline: "Stainless gravity-fed filter — the post-Berkey countertop standard",
    description: `Boroux is the spiritual successor to Berkey — same gravity-fed format, same long-lasting Black Berkey-style elements (now branded Boroux Black), but with a redesigned American-made stainless body. Filters 95% of fluoride and 99.999% of pathogens with no electricity. The off-grid water option.`,
    price: 359,
    category: "healthy-home",
    goals: ["longevity"],
    affiliateUrl: "https://boroux.com",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "No electricity required",
      "Filters fluoride + pathogens",
      "American-made stainless body",
      "Off-grid water solution",
    ],
  },

  // ─────────── Waterdrop ───────────
  {
    slug: "waterdrop-g3-reverse-osmosis",
    name: "G3P800 Reverse Osmosis System",
    brand: "Waterdrop",
    tagline: "Tankless reverse-osmosis with UV sterilization and 800 GPD",
    description: `Tankless RO (no holding tank breeding biofilm) with high-output 800 gallons-per-day and a built-in UV sterilizer. Removes 99% of contaminants including fluoride, lead, PFAS, and pharmaceuticals. Best-in-class water-to-waste ratio (3:1, vs. 5:1 for traditional RO).`,
    price: 749,
    category: "healthy-home",
    goals: ["longevity"],
    affiliateUrl: "https://www.waterdropfilter.com",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Tankless (no biofilm)",
      "Built-in UV sterilizer",
      "800 GPD output",
      "3:1 water-to-waste ratio",
    ],
  },

  // ─────────── AirDoctor ───────────
  {
    slug: "airdoctor-3000-air-purifier",
    name: "AirDoctor 3000 Air Purifier",
    brand: "AirDoctor",
    tagline: "UltraHEPA + carbon-VOC + ionizer — captures particles 100x smaller than HEPA",
    description: `AirDoctor's UltraHEPA filter captures 99.99% of particles down to 0.003 microns — 100x smaller than what standard HEPA captures. The 3-stage design adds a dual-action carbon/VOC filter and an ionizer for gases, smoke, and chemicals. Covers up to 630 sq ft on auto.`,
    price: 629,
    category: "healthy-home",
    goals: ["longevity", "immunity"],
    affiliateUrl: "https://www.airdoctorpro.com",
    imageUrl: "https://images.unsplash.com/photo-1521405617584-1d9ca2c5b67c?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "UltraHEPA: 0.003 micron capture",
      "Carbon-VOC for gases & smoke",
      "Auto mode with air-quality sensor",
      "630 sq ft coverage",
    ],
  },

  // ─────────── Molekule ───────────
  {
    slug: "molekule-air-pro-rx",
    name: "Molekule Air Pro RX",
    brand: "Molekule",
    tagline: "PECO-HEPA medical-grade air purifier",
    description: `Molekule's PECO (photo-electrochemical oxidation) technology destroys VOCs, viruses, and bacteria at the molecular level — instead of just trapping them in a filter (where they can re-release). The Air Pro RX is FDA-cleared as a medical device.`,
    price: 1199,
    category: "healthy-home",
    goals: ["longevity", "immunity"],
    affiliateUrl: "https://molekule.com",
    imageUrl: "https://images.unsplash.com/photo-1521405617584-1d9ca2c5b67c?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "PECO destroys (not just traps) VOCs",
      "FDA-cleared medical device",
      "Pre-filter + HEPA + PECO stages",
      "1000 sq ft coverage",
    ],
  },

  // ─────────── Austin Air ───────────
  {
    slug: "austin-air-healthmate-plus",
    name: "HealthMate Plus Air Purifier",
    brand: "Austin Air",
    tagline: "HEPA + 15 lbs of carbon-zeolite for chemical & smoke sensitivity",
    description: `Austin Air is the gold standard for chemical-sensitive, MCS, and post-fire/smoke households. The HealthMate Plus packs 15 lbs of activated carbon and zeolite — far more than any consumer air purifier — plus medical-grade HEPA. Built in Buffalo, 5-year warranty, swap filters every 5 years.`,
    price: 855,
    category: "healthy-home",
    goals: ["longevity", "immunity"],
    affiliateUrl: "https://www.austinair.com",
    imageUrl: "https://images.unsplash.com/photo-1521405617584-1d9ca2c5b67c?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "15 lbs carbon-zeolite (industry-leading)",
      "Medical-grade HEPA",
      "5-year filter life",
      "American-made, 5-year warranty",
    ],
  },

  // ─────────── Jaspr ───────────
  {
    slug: "jaspr-pro-air-purifier",
    name: "Jaspr Pro Air Purifier",
    brand: "Jaspr",
    tagline: "Ultra-quiet, premium-design HEPA + carbon air purifier",
    description: `Jaspr is the design-forward air purifier that biohackers and architects keep recommending. True HEPA (99.97% at 0.3 micron), heavy carbon for VOCs, ultra-quiet ECM motor (you can run it on high in a bedroom), and a real auto mode. Made for 1000+ sq ft.`,
    price: 999,
    category: "healthy-home",
    goals: ["longevity", "immunity"],
    affiliateUrl: "https://jaspr.co",
    imageUrl: "https://images.unsplash.com/photo-1521405617584-1d9ca2c5b67c?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "True HEPA + heavy carbon",
      "Ultra-quiet ECM motor",
      "1000+ sq ft coverage",
      "Premium design",
    ],
  },

  // ─────────── Hathaspace ───────────
  {
    slug: "hathaspace-smart-air-purifier",
    name: "HSP002 Smart True HEPA Air Purifier",
    brand: "Hathaspace",
    tagline: "Affordable 5-stage smart HEPA — the budget biohacker pick",
    description: `Hathaspace's HSP002 packs 5 stages of filtration (cold catalyst + carbon + nano-cold catalyst + HEPA + germicidal UV) in a smart purifier under $300. Covers 700 sq ft, app-controlled, with real-time air quality sensor. The best entry-level option.`,
    price: 299,
    category: "healthy-home",
    goals: ["longevity"],
    affiliateUrl: "https://hathaspace.com",
    imageUrl: "https://images.unsplash.com/photo-1521405617584-1d9ca2c5b67c?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "5-stage filtration",
      "Best price-to-performance",
      "App + air-quality sensor",
      "700 sq ft coverage",
    ],
  },

  // ─────────── Sunlighten ───────────
  {
    slug: "sunlighten-mpulse-aspire",
    name: "mPulse Aspire 3-in-1 Infrared Sauna",
    brand: "Sunlighten",
    tagline: "Premium 3-in-1 infrared sauna — near, mid, and far IR independently controlled",
    description: `Sunlighten is the premium infrared sauna brand — the only one that offers true 3-in-1 (near, mid, far IR) with independently controlled emitters, so you can target detox, recovery, or skin sessions. SoloCarbon® heaters tested to lowest EMF on the market. Used by professional teams and sauna researchers.`,
    price: 6395,
    category: "healthy-home",
    goals: ["longevity", "performance"],
    affiliateUrl: "https://sunlighten.com",
    imageUrl: "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "True 3-in-1 (near + mid + far IR)",
      "Lowest EMF in category",
      "Independently controlled emitters",
      "Used by pro sports teams",
    ],
  },

  // ─────────── Clearlight (Jacuzzi) ───────────
  {
    slug: "clearlight-sanctuary-1-sauna",
    name: "Sanctuary 1 Full Spectrum Infrared Sauna",
    brand: "Clearlight Infrared",
    tagline: "Full-spectrum sauna with medical-grade chromotherapy and low EMF",
    description: `Clearlight (now Jacuzzi) is the other premium infrared cabin in the U.S., the favorite of Dr. Mark Hyman and other functional MDs. Full-spectrum (near + mid + far) with medical-grade chromotherapy, low-EMF construction, and lifetime warranty.`,
    price: 5995,
    category: "healthy-home",
    goals: ["longevity"],
    affiliateUrl: "https://clearlightsaunas.com",
    imageUrl: "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Full-spectrum (NIR + MIR + FIR)",
      "Lifetime warranty",
      "Low-EMF construction",
      "Medical-grade chromotherapy",
    ],
  },

  // ─────────── SaunaSpace ───────────
  {
    slug: "saunaspace-faraday-cabin",
    name: "Faraday Near-Infrared Sauna Cabin",
    brand: "SaunaSpace",
    tagline: "Incandescent NIR sauna with EMF-shielding Faraday construction",
    description: `Different philosophy: SaunaSpace uses incandescent near-infrared bulbs (closer to natural sunlight than the FIR ceramic emitters in most saunas) inside a Faraday-cage cabin that blocks ambient EMF during sessions. The biohacker / EHS community favorite.`,
    price: 4499,
    category: "healthy-home",
    goals: ["longevity"],
    affiliateUrl: "https://sauna.space",
    imageUrl: "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Incandescent NIR (sunlight spectrum)",
      "Faraday cage EMF shielding",
      "Hand-built in Missouri",
      "Modular tent option available",
    ],
  },

  // ─────────── Joovv ───────────
  {
    slug: "joovv-solo-3-0-red-light",
    name: "Joovv Solo 3.0 Red Light Therapy Panel",
    brand: "Joovv",
    tagline: "Medical-grade red & near-infrared light panel — full-body therapy",
    description: `Joovv is the most-recognized red light therapy brand in the wellness space. The Solo 3.0 delivers clinical-grade irradiance at both 660nm (red) and 850nm (NIR) wavelengths, FDA-cleared as a Class II medical device. Full-body coverage when standing 6 inches away.`,
    price: 1199,
    category: "healthy-home",
    goals: ["longevity", "skin"],
    affiliateUrl: "https://joovv.com",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "FDA-cleared Class II medical device",
      "660nm + 850nm wavelengths",
      "Modular — add panels for full body",
      "Industry-leading irradiance",
    ],
  },

  // ─────────── Plunge ───────────
  {
    slug: "plunge-all-in-cold-tub",
    name: "Plunge All-In One Cold Plunge Tub",
    brand: "Plunge",
    tagline: "Self-chilling cold-plunge tub — 39°F at the press of a button",
    description: `Plunge built the cold tub category. Their All-In model includes a powerful chiller (down to 39°F), filtration, and ozone sanitation in a single unit — no manual ice-bag refilling. Plug it in, fill it once, and have a fresh cold plunge ready every morning. Indoor or outdoor use.`,
    price: 4990,
    category: "healthy-home",
    goals: ["performance", "longevity"],
    affiliateUrl: "https://plunge.com",
    imageUrl: "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Self-chilling to 39°F",
      "Ozone + filter sanitation",
      "No ice-bag refilling",
      "Indoor or outdoor",
    ],
  },

  // ─────────── Therasage ───────────
  {
    slug: "therasage-thera360-plus",
    name: "Thera360 Plus Personal Sauna",
    brand: "Therasage",
    tagline: "Portable full-spectrum infrared sauna with EMF shielding",
    description: `Therasage's Thera360 Plus is a personal-size infrared sauna that sets up in minutes — full spectrum IR, EMF-shielded panels, and tourmaline + amethyst layers for an additional far-IR boost. The closest thing to a real cabin sauna in a portable format.`,
    price: 1499,
    category: "healthy-home",
    goals: ["longevity"],
    affiliateUrl: "https://www.therasage.com",
    imageUrl: "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Full-spectrum portable IR",
      "EMF-shielded panels",
      "Tourmaline + amethyst far-IR boost",
      "Sets up in minutes",
    ],
  },

  // ─────────── Caraway ───────────
  {
    slug: "caraway-cookware-set",
    name: "Cookware Set (10-Piece)",
    brand: "Caraway",
    tagline: "PFAS-free ceramic-coated cookware in 7 colorways",
    description: `Caraway popularized non-toxic ceramic-coated cookware with their pastel colorways and clean ingredient deck. The 10-piece set is fully PFAS, PFOA, lead, and cadmium-free, dishwasher-safe, and ships with a magnetic lid holder and canvas pan organizer. Set lasts ~3 years before coating wears.`,
    price: 545,
    category: "home-kitchen",
    goals: ["longevity"],
    affiliateUrl: "https://www.carawayhome.com",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "PFAS, PFOA, lead, cadmium-free",
      "Lid + pan organizers included",
      "Dishwasher-safe",
      "7 designer colorways",
    ],
    cons: [
      "Ceramic coating wears in ~3 years (vs. lifetime stainless)",
    ],
  },

  // ─────────── GreenPan ───────────
  {
    slug: "greenpan-valencia-pro-skillet",
    name: "Valencia Pro 12\" Skillet",
    brand: "GreenPan",
    tagline: "Hard-anodized PFAS-free ceramic non-stick — chef-grade build",
    description: `GreenPan invented ceramic non-stick. The Valencia Pro is their chef-tier line — hard-anodized aluminum body, Magneto induction base, Thermolon Volt ceramic coating that holds up better at high heat than the average ceramic. Oven-safe to 600°F.`,
    price: 99,
    category: "home-kitchen",
    goals: ["longevity"],
    affiliateUrl: "https://www.greenpan.us",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Thermolon ceramic — high-heat stable",
      "Hard-anodized for durability",
      "Oven-safe to 600°F",
      "Induction-compatible",
    ],
  },

  // ─────────── Xtrema ───────────
  {
    slug: "xtrema-ceramic-skillet",
    name: "Pure Ceramic Versa Skillet (10\")",
    brand: "Xtrema",
    tagline: "100% pure ceramic — no metal, no coating, the cleanest cookware standard",
    description: `Xtrema is the only major brand making 100% ceramic cookware — no aluminum or steel core, no coating that could wear off. Just a single-piece ceramic-and-natural-mineral body. Goes from stovetop to oven to broiler to freezer. Heavy and slow to heat, but unrivaled chemical inertness.`,
    price: 169,
    category: "home-kitchen",
    goals: ["longevity"],
    affiliateUrl: "https://www.xtrema.com",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "100% ceramic — no metals or coatings",
      "Stovetop to oven to broiler safe",
      "Inert — leaches nothing",
      "10-year warranty",
    ],
    cons: [
      "Heavy, slow to heat (ceramic thermal mass)",
    ],
  },

  // ─────────── 360 Cookware ───────────
  {
    slug: "360-cookware-stainless-saucepan",
    name: "Stainless Steel Saucepan (3 Quart)",
    brand: "360 Cookware",
    tagline: "American-made surgical-grade stainless cookware — vapor cooking",
    description: `360 Cookware is built in West Bend, Wisconsin from T-304 surgical-grade stainless steel with a unique vapor-seal lid that lets you cook vegetables in their own moisture (no added water, no nutrient loss). Lifetime warranty. Premium alternative to All-Clad.`,
    price: 199,
    category: "home-kitchen",
    goals: ["longevity"],
    affiliateUrl: "https://www.360cookware.com",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "American-made (Wisconsin)",
      "Surgical-grade T-304 stainless",
      "Vapor-seal cooking",
      "Lifetime warranty",
    ],
  },

  // ─────────── Branch Basics ───────────
  {
    slug: "branch-basics-concentrate-starter",
    name: "Concentrate Starter Kit",
    brand: "Branch Basics",
    tagline: "One non-toxic concentrate replaces every cleaner in your house",
    description: `Branch Basics' single plant-based concentrate dilutes into all-purpose, bathroom, glass, laundry, foaming hand soap, and fruit-and-veg wash. Free from synthetic fragrance, dyes, parabens, phosphates, and over 2000 questionable cleaning chemicals. The starter kit includes 5 reusable bottles + the concentrate.`,
    price: 69,
    category: "healthy-home",
    goals: ["longevity"],
    affiliateUrl: "https://branchbasics.com",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested", "Non-GMO"],
    pros: [
      "Replaces 6+ separate cleaners",
      "EWG Verified clean",
      "Plant + mineral based",
      "5 reusable bottles included",
    ],
  },

  // ─────────── Avocado Green Mattress ───────────
  {
    slug: "avocado-green-mattress",
    name: "Avocado Green Organic Mattress",
    brand: "Avocado Green Mattress",
    tagline: "GOTS-certified organic latex, wool, and cotton mattress — handcrafted in California",
    description: `The most-certified clean mattress available — GOTS organic, GOLS organic latex, GREENGUARD Gold, MADE SAFE, Climate Neutral Certified. Hand-tufted in California with natural Joybird latex (no synthetic memory foam off-gassing), organic wool fire barrier, and organic cotton cover. 25-year warranty.`,
    price: 1899,
    category: "healthy-home",
    goals: ["sleep", "longevity"],
    affiliateUrl: "https://www.avocadogreenmattress.com",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    certs: ["USDA Organic", "Non-GMO", "B-Corp"],
    pros: [
      "GOTS, GOLS, GREENGUARD Gold certified",
      "Natural latex (no memory foam)",
      "Handcrafted in California",
      "25-year warranty",
    ],
  },
];

export const vivtrueHome: Product[] = rows.map((r, idx) => ({
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
  isEditorPick: idx < 3,
  isFeatured: idx < 2,
  pros: r.pros,
  cons: r.cons ?? COMMON_CONS,
  ingredients: r.tagline,
  servingSize: "Hardware product — see manufacturer specifications",
}));