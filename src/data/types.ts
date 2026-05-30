export type Goal =
  | "sleep"
  | "gut"
  | "longevity"
  | "performance"
  | "skin"
  | "immunity"
  | "energy"
  | "focus";

export type Certification =
  | "USDA Organic"
  | "Regenerative Certified"
  | "Glyphosate-Free"
  | "Third-Party Tested"
  | "Grass-Fed"
  | "Pasture-Raised"
  | "Wild-Caught"
  | "Non-GMO"
  | "B-Corp"
  | "Fair Trade"
  | "Biodynamic";

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  emoji?: string;
  order: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  description: string; // markdown
  price: number;
  currency: string;
  imageUrl: string;
  galleryUrls?: string[];
  categorySlug: string;
  affiliateUrl: string;
  merchant: string;
  certifications: Certification[];
  goals: Goal[];
  rating: number; // 0-5
  isEditorPick: boolean;
  isFeatured: boolean;
  pros: string[];
  cons: string[];
  ingredients?: string;
  servingSize?: string;
  /** Optional deal/promo data — when active, surfaces a badge on cards */
  dealLabel?: string | null;
  dealStartsAt?: string | null;
  dealEndsAt?: string | null;
  /** Optional original price (used when on a deal to show savings) */
  originalPrice?: number | null;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  dek: string;
  body: string; // markdown
  coverImage: string;
  author: string;
  authorRole: string;
  readTime: number;
  tags: string[];
  publishedAt: string; // ISO
  isFeatured: boolean;
  relatedProductSlugs?: string[];
}