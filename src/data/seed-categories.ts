import type { Category } from "./types";

export const categories: Category[] = [
  {
    id: "c1",
    slug: "regenerative-pantry",
    name: "Regenerative Pantry",
    tagline: "Food that heals the soil it grew in.",
    description:
      "Pasture-raised meats, regeneratively grown grains, single-origin olive oils, and raw honey from farms that put more back than they take.",
    imageUrl:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80",
    emoji: "🌾",
    order: 1,
  },
  {
    id: "c2",
    slug: "superfoods-adaptogens",
    name: "Superfoods & Adaptogens",
    tagline: "Ancient plants. Tested for the modern body.",
    description:
      "Ceremonial cacao, functional mushrooms, sea moss, spirulina — sourced from the people and places that have grown them for centuries.",
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80",
    emoji: "🍄",
    order: 2,
  },
  {
    id: "c3",
    slug: "daily-supplements",
    name: "Daily Supplements",
    tagline: "The non-negotiable basics, done right.",
    description:
      "Multivitamins, omega-3, magnesium, electrolytes — independently lab-tested, no fillers, no synthetic isolates.",
    imageUrl:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1600&q=80",
    emoji: "💊",
    order: 3,
  },
  {
    id: "c4",
    slug: "longevity-performance",
    name: "Longevity & Performance",
    tagline: "Live longer. Live stronger.",
    description:
      "NMN, creatine, peptides, nootropics — backed by clinical research, vetted for purity and dose.",
    imageUrl:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1600&q=80",
    emoji: "⚡",
    order: 4,
  },
  {
    id: "c5",
    slug: "gut-immunity",
    name: "Gut & Immunity",
    tagline: "Where health begins.",
    description:
      "Strain-specific probiotics, soluble fiber, colostrum, ferments. The microbiome is the operating system — feed it well.",
    imageUrl:
      "https://images.unsplash.com/photo-1559054663-e8d23213f55c?auto=format&fit=crop&w=1600&q=80",
    emoji: "🦠",
    order: 5,
  },
  {
    id: "c6",
    slug: "skin-beauty",
    name: "Skin & Beauty",
    tagline: "Clean rituals. Living results.",
    description:
      "Cold-pressed serums, mineral sunscreen, grass-fed collagen. Skin is a window into how we eat and how we live.",
    imageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80",
    emoji: "🌿",
    order: 6,
  },
  {
    id: "c7",
    slug: "home-kitchen",
    name: "Home & Kitchen",
    tagline: "Tools that don't leach into your food.",
    description:
      "Non-toxic cookware, multi-stage water filters, HEPA air purifiers. The slow accumulation of small choices.",
    imageUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80",
    emoji: "🫙",
    order: 7,
  },
  {
    id: "c8",
    slug: "mindful-living",
    name: "Mindful Living",
    tagline: "Sleep deeper. Breathe slower. Rest fully.",
    description:
      "Sleep aids, breathwork tools, paper journals, blue-light glasses. The other half of regeneration is rest.",
    imageUrl:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1600&q=80",
    emoji: "🌙",
    order: 8,
  },
  {
    id: "c9",
    slug: "wearables-tech",
    name: "Wearables & Recovery Tech",
    tagline: "The body, instrumented.",
    description:
      "Sleep rings, HRV bands, glucose monitors, red-light masks, vagus-nerve devices, percussion guns — the tools that turn how you feel into something you can measure and improve.",
    imageUrl:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=1600&q=80",
    emoji: "⌚",
    order: 9,
  },
  {
    id: "c10",
    slug: "healthy-home",
    name: "Healthy Home",
    tagline: "Cleaner air, water, sleep, and surfaces.",
    description:
      "Reverse-osmosis water, true-HEPA + carbon air, infrared sauna, organic mattresses, non-toxic cleaning. The exposures you can actually control.",
    imageUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80",
    emoji: "🏡",
    order: 10,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}