import { getDb } from "./db";
import type { Product, Article, Category } from "@/data/types";

// ---------- Row mapping helpers ----------

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  image_url: string;
  gallery_urls: string;
  category_slug: string;
  affiliate_url: string;
  merchant: string;
  certifications: string;
  goals: string;
  rating: number;
  is_editor_pick: number;
  is_featured: number;
  is_hidden: number;
  pros: string;
  cons: string;
  ingredients: string | null;
  serving_size: string | null;
  deal_label: string | null;
  deal_starts_at: string | null;
  deal_ends_at: string | null;
  original_price: number | null;
};

type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  body: string;
  cover_image: string;
  author: string;
  author_role: string;
  read_time: number;
  tags: string;
  published_at: string;
  is_featured: number;
  is_hidden: number;
  related_product_slugs: string;
};

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  emoji: string | null;
  sort_order: number;
};

function mapProduct(r: ProductRow): Product & {
  isHidden?: boolean;
  dealLabel?: string | null;
  dealStartsAt?: string | null;
  dealEndsAt?: string | null;
} {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    brand: r.brand,
    tagline: r.tagline,
    description: r.description,
    price: r.price,
    currency: r.currency,
    imageUrl: r.image_url,
    galleryUrls: JSON.parse(r.gallery_urls || "[]"),
    categorySlug: r.category_slug,
    affiliateUrl: r.affiliate_url,
    merchant: r.merchant,
    certifications: JSON.parse(r.certifications || "[]"),
    goals: JSON.parse(r.goals || "[]"),
    rating: r.rating,
    isEditorPick: !!r.is_editor_pick,
    isFeatured: !!r.is_featured,
    pros: JSON.parse(r.pros || "[]"),
    cons: JSON.parse(r.cons || "[]"),
    ingredients: r.ingredients || undefined,
    servingSize: r.serving_size || undefined,
    isHidden: !!r.is_hidden,
    dealLabel: r.deal_label,
    dealStartsAt: r.deal_starts_at,
    dealEndsAt: r.deal_ends_at,
    originalPrice: r.original_price,
  };
}

function mapArticle(r: ArticleRow): Article {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    dek: r.dek,
    body: r.body,
    coverImage: r.cover_image,
    author: r.author,
    authorRole: r.author_role,
    readTime: r.read_time,
    tags: JSON.parse(r.tags || "[]"),
    publishedAt: r.published_at,
    isFeatured: !!r.is_featured,
    relatedProductSlugs: JSON.parse(r.related_product_slugs || "[]"),
  };
}

function mapCategory(r: CategoryRow): Category {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    tagline: r.tagline,
    description: r.description,
    imageUrl: r.image_url,
    emoji: r.emoji || undefined,
    order: r.sort_order,
  };
}

// ---------- Products ----------

export function listProducts(opts: { includeHidden?: boolean } = {}) {
  const db = getDb();
  const where = opts.includeHidden ? "" : "WHERE is_hidden = 0";
  const rows = db
    .prepare(`SELECT * FROM products ${where} ORDER BY rowid ASC`)
    .all() as ProductRow[];
  return rows.map(mapProduct);
}

export function getProductBySlug(slug: string) {
  const db = getDb();
  const r = db.prepare(`SELECT * FROM products WHERE slug = ?`).get(slug) as
    | ProductRow
    | undefined;
  return r ? mapProduct(r) : undefined;
}

export function getProductById(id: string) {
  const db = getDb();
  const r = db.prepare(`SELECT * FROM products WHERE id = ?`).get(id) as
    | ProductRow
    | undefined;
  return r ? mapProduct(r) : undefined;
}

export function getProductsByCategory(slug: string) {
  return listProducts().filter((p) => p.categorySlug === slug);
}

export function getEditorPicks(limit = 4) {
  return listProducts()
    .filter((p) => p.isEditorPick)
    .slice(0, limit);
}

export function getFeatured(limit = 8) {
  return listProducts()
    .filter((p) => p.isFeatured)
    .slice(0, limit);
}

/**
 * Products with an active deal label, where current time is within
 * dealStartsAt..dealEndsAt (either bound is optional).
 */
export function getActiveDeals(limit?: number) {
  const now = Date.now();
  const all = listProducts()
    .filter((p) => {
      if (!p.dealLabel) return false;
      if (p.dealStartsAt && new Date(p.dealStartsAt).getTime() > now) return false;
      if (p.dealEndsAt && new Date(p.dealEndsAt).getTime() < now) return false;
      return true;
    })
    // Editor's picks first, then highest savings %, then rating
    .sort((a, b) => {
      const aPick = a.isEditorPick ? 1 : 0;
      const bPick = b.isEditorPick ? 1 : 0;
      if (aPick !== bPick) return bPick - aPick;
      const aSav =
        a.originalPrice && a.originalPrice > a.price
          ? (a.originalPrice - a.price) / a.originalPrice
          : 0;
      const bSav =
        b.originalPrice && b.originalPrice > b.price
          ? (b.originalPrice - b.price) / b.originalPrice
          : 0;
      if (aSav !== bSav) return bSav - aSav;
      return b.rating - a.rating;
    });
  return typeof limit === "number" ? all.slice(0, limit) : all;
}

export function getRelatedProducts(slug: string, limit = 4) {
  const p = getProductBySlug(slug);
  if (!p) return [];
  return listProducts()
    .filter((x) => x.categorySlug === p.categorySlug && x.slug !== slug)
    .slice(0, limit);
}

export type ProductInput = {
  id?: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  price: number;
  currency?: string;
  imageUrl: string;
  galleryUrls?: string[];
  categorySlug: string;
  affiliateUrl: string;
  merchant: string;
  certifications?: string[];
  goals?: string[];
  rating?: number;
  isEditorPick?: boolean;
  isFeatured?: boolean;
  isHidden?: boolean;
  pros?: string[];
  cons?: string[];
  ingredients?: string | null;
  servingSize?: string | null;
  dealLabel?: string | null;
  dealStartsAt?: string | null;
  dealEndsAt?: string | null;
  originalPrice?: number | null;
};

export function createProduct(input: ProductInput) {
  const db = getDb();
  const id = input.id || `p${Date.now()}`;
  db.prepare(
    `INSERT INTO products (
      id, slug, name, brand, tagline, description, price, currency,
      image_url, gallery_urls, category_slug, affiliate_url, merchant,
      certifications, goals, rating, is_editor_pick, is_featured, is_hidden,
      pros, cons, ingredients, serving_size,
      deal_label, deal_starts_at, deal_ends_at, original_price
    ) VALUES (
      @id, @slug, @name, @brand, @tagline, @description, @price, @currency,
      @image_url, @gallery_urls, @category_slug, @affiliate_url, @merchant,
      @certifications, @goals, @rating, @is_editor_pick, @is_featured, @is_hidden,
      @pros, @cons, @ingredients, @serving_size,
      @deal_label, @deal_starts_at, @deal_ends_at, @original_price
    )`
  ).run({
    id,
    slug: input.slug,
    name: input.name,
    brand: input.brand,
    tagline: input.tagline,
    description: input.description,
    price: input.price,
    currency: input.currency || "USD",
    image_url: input.imageUrl,
    gallery_urls: JSON.stringify(input.galleryUrls || []),
    category_slug: input.categorySlug,
    affiliate_url: input.affiliateUrl,
    merchant: input.merchant,
    certifications: JSON.stringify(input.certifications || []),
    goals: JSON.stringify(input.goals || []),
    rating: input.rating ?? 4.5,
    is_editor_pick: input.isEditorPick ? 1 : 0,
    is_featured: input.isFeatured ? 1 : 0,
    is_hidden: input.isHidden ? 1 : 0,
    pros: JSON.stringify(input.pros || []),
    cons: JSON.stringify(input.cons || []),
    ingredients: input.ingredients ?? null,
    serving_size: input.servingSize ?? null,
    deal_label: input.dealLabel ?? null,
    deal_starts_at: input.dealStartsAt ?? null,
    deal_ends_at: input.dealEndsAt ?? null,
    original_price: input.originalPrice ?? null,
  });
  return id;
}

export function updateProduct(id: string, input: Partial<ProductInput>) {
  const db = getDb();
  const cur = getProductById(id);
  if (!cur) throw new Error("Product not found");
  const merged = { ...cur, ...input };
  db.prepare(
    `UPDATE products SET
      slug = @slug, name = @name, brand = @brand, tagline = @tagline,
      description = @description, price = @price, currency = @currency,
      image_url = @image_url, gallery_urls = @gallery_urls,
      category_slug = @category_slug, affiliate_url = @affiliate_url,
      merchant = @merchant, certifications = @certifications, goals = @goals,
      rating = @rating, is_editor_pick = @is_editor_pick, is_featured = @is_featured,
      is_hidden = @is_hidden, pros = @pros, cons = @cons,
      ingredients = @ingredients, serving_size = @serving_size,
      deal_label = @deal_label, deal_starts_at = @deal_starts_at, deal_ends_at = @deal_ends_at,
      original_price = @original_price,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = @id`
  ).run({
    id,
    slug: merged.slug,
    name: merged.name,
    brand: merged.brand,
    tagline: merged.tagline,
    description: merged.description,
    price: merged.price,
    currency: merged.currency || "USD",
    image_url: merged.imageUrl,
    gallery_urls: JSON.stringify(merged.galleryUrls || []),
    category_slug: merged.categorySlug,
    affiliate_url: merged.affiliateUrl,
    merchant: merged.merchant,
    certifications: JSON.stringify(merged.certifications || []),
    goals: JSON.stringify(merged.goals || []),
    rating: merged.rating ?? 4.5,
    is_editor_pick: merged.isEditorPick ? 1 : 0,
    is_featured: merged.isFeatured ? 1 : 0,
    is_hidden: merged.isHidden ? 1 : 0,
    pros: JSON.stringify(merged.pros || []),
    cons: JSON.stringify(merged.cons || []),
    ingredients: merged.ingredients ?? null,
    serving_size: merged.servingSize ?? null,
    deal_label: merged.dealLabel ?? null,
    deal_starts_at: merged.dealStartsAt ?? null,
    deal_ends_at: merged.dealEndsAt ?? null,
    original_price: merged.originalPrice ?? null,
  });
}

export function deleteProduct(id: string) {
  const db = getDb();
  db.prepare(`DELETE FROM products WHERE id = ?`).run(id);
}

// ---------- Articles ----------

export function listArticles(opts: { includeHidden?: boolean } = {}) {
  const db = getDb();
  const where = opts.includeHidden ? "" : "WHERE is_hidden = 0";
  const rows = db
    .prepare(
      `SELECT * FROM articles ${where} ORDER BY published_at DESC`
    )
    .all() as ArticleRow[];
  return rows.map(mapArticle);
}

export function getArticleBySlug(slug: string) {
  const db = getDb();
  const r = db.prepare(`SELECT * FROM articles WHERE slug = ?`).get(slug) as
    | ArticleRow
    | undefined;
  return r ? mapArticle(r) : undefined;
}

export function getArticleById(id: string) {
  const db = getDb();
  const r = db.prepare(`SELECT * FROM articles WHERE id = ?`).get(id) as
    | ArticleRow
    | undefined;
  return r ? mapArticle(r) : undefined;
}

export function getFeaturedArticles(limit = 3) {
  return listArticles()
    .filter((a) => a.isFeatured)
    .slice(0, limit);
}

export type ArticleInput = {
  id?: string;
  slug: string;
  title: string;
  dek: string;
  body: string;
  coverImage: string;
  author: string;
  authorRole: string;
  readTime: number;
  tags?: string[];
  publishedAt: string;
  isFeatured?: boolean;
  isHidden?: boolean;
  relatedProductSlugs?: string[];
};

export function createArticle(input: ArticleInput) {
  const db = getDb();
  const id = input.id || `a${Date.now()}`;
  db.prepare(
    `INSERT INTO articles (
      id, slug, title, dek, body, cover_image, author, author_role,
      read_time, tags, published_at, is_featured, is_hidden, related_product_slugs
    ) VALUES (
      @id, @slug, @title, @dek, @body, @cover_image, @author, @author_role,
      @read_time, @tags, @published_at, @is_featured, @is_hidden, @related
    )`
  ).run({
    id,
    slug: input.slug,
    title: input.title,
    dek: input.dek,
    body: input.body,
    cover_image: input.coverImage,
    author: input.author,
    author_role: input.authorRole,
    read_time: input.readTime,
    tags: JSON.stringify(input.tags || []),
    published_at: input.publishedAt,
    is_featured: input.isFeatured ? 1 : 0,
    is_hidden: input.isHidden ? 1 : 0,
    related: JSON.stringify(input.relatedProductSlugs || []),
  });
  return id;
}

export function updateArticle(id: string, input: Partial<ArticleInput>) {
  const cur = getArticleById(id);
  if (!cur) throw new Error("Article not found");
  const merged = { ...cur, ...input };
  const db = getDb();
  db.prepare(
    `UPDATE articles SET
      slug = @slug, title = @title, dek = @dek, body = @body,
      cover_image = @cover_image, author = @author, author_role = @author_role,
      read_time = @read_time, tags = @tags, published_at = @published_at,
      is_featured = @is_featured, is_hidden = @is_hidden,
      related_product_slugs = @related, updated_at = CURRENT_TIMESTAMP
    WHERE id = @id`
  ).run({
    id,
    slug: merged.slug,
    title: merged.title,
    dek: merged.dek,
    body: merged.body,
    cover_image: merged.coverImage,
    author: merged.author,
    author_role: merged.authorRole,
    read_time: merged.readTime,
    tags: JSON.stringify(merged.tags || []),
    published_at: merged.publishedAt,
    is_featured: merged.isFeatured ? 1 : 0,
    is_hidden: merged.isHidden ? 1 : 0,
    related: JSON.stringify(merged.relatedProductSlugs || []),
  });
}

export function deleteArticle(id: string) {
  const db = getDb();
  db.prepare(`DELETE FROM articles WHERE id = ?`).run(id);
}

// ---------- Categories ----------

export function listCategories(): Category[] {
  const db = getDb();
  const rows = db
    .prepare(`SELECT * FROM categories ORDER BY sort_order ASC`)
    .all() as CategoryRow[];
  return rows.map(mapCategory);
}

export function getCategoryBySlug(slug: string) {
  const db = getDb();
  const r = db.prepare(`SELECT * FROM categories WHERE slug = ?`).get(slug) as
    | CategoryRow
    | undefined;
  return r ? mapCategory(r) : undefined;
}

export function updateCategory(id: string, patch: Partial<Category>) {
  const db = getDb();
  const cur = db.prepare(`SELECT * FROM categories WHERE id = ?`).get(id) as
    | CategoryRow
    | undefined;
  if (!cur) throw new Error("Category not found");
  db.prepare(
    `UPDATE categories SET
      slug = @slug, name = @name, tagline = @tagline, description = @description,
      image_url = @image_url, emoji = @emoji, sort_order = @sort_order
    WHERE id = @id`
  ).run({
    id,
    slug: patch.slug ?? cur.slug,
    name: patch.name ?? cur.name,
    tagline: patch.tagline ?? cur.tagline,
    description: patch.description ?? cur.description,
    image_url: patch.imageUrl ?? cur.image_url,
    emoji: patch.emoji ?? cur.emoji,
    sort_order: patch.order ?? cur.sort_order,
  });
}

// ---------- Clicks ----------

export function logClick(input: {
  productSlug: string;
  source?: string;
  referer?: string;
  userAgent?: string;
  ip?: string;
}) {
  const db = getDb();
  db.prepare(
    `INSERT INTO clicks (product_slug, source, referer, user_agent, ip)
     VALUES (?, ?, ?, ?, ?)`
  ).run(
    input.productSlug,
    input.source || null,
    input.referer || null,
    input.userAgent || null,
    input.ip || null
  );
}

export function clicksLastNDays(n: number) {
  const db = getDb();
  return db
    .prepare(
      `SELECT product_slug, COUNT(*) as clicks
       FROM clicks
       WHERE created_at >= datetime('now', '-' || ? || ' days')
       GROUP BY product_slug
       ORDER BY clicks DESC`
    )
    .all(n) as { product_slug: string; clicks: number }[];
}

export function totalClicks(n: number) {
  const db = getDb();
  const r = db
    .prepare(
      `SELECT COUNT(*) as c FROM clicks WHERE created_at >= datetime('now', '-' || ? || ' days')`
    )
    .get(n) as { c: number };
  return r.c;
}

// ---------- Newsletter / Contact ----------

export function addNewsletterSignup(email: string) {
  const db = getDb();
  try {
    db.prepare(`INSERT INTO newsletter_signups (email) VALUES (?)`).run(email);
    return true;
  } catch {
    return false; // duplicate email
  }
}

export function listNewsletterSignups() {
  const db = getDb();
  return db
    .prepare(`SELECT * FROM newsletter_signups ORDER BY created_at DESC`)
    .all() as { id: number; email: string; created_at: string }[];
}

export function addContactMessage(input: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const db = getDb();
  db.prepare(
    `INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)`
  ).run(input.name, input.email, input.subject || null, input.message);
}

export function listContactMessages() {
  const db = getDb();
  return db
    .prepare(`SELECT * FROM contact_messages ORDER BY created_at DESC`)
    .all() as {
    id: number;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    created_at: string;
    read_at: string | null;
  }[];
}

export function markContactMessageRead(id: number) {
  const db = getDb();
  db.prepare(
    `UPDATE contact_messages SET read_at = CURRENT_TIMESTAMP WHERE id = ?`
  ).run(id);
}

// ---------- Settings (key/value store) ----------

export function getSetting(key: string): string | null {
  const db = getDb();
  const r = db.prepare(`SELECT value FROM settings WHERE key = ?`).get(key) as
    | { value: string }
    | undefined;
  return r?.value || null;
}

export function setSetting(key: string, value: string) {
  const db = getDb();
  db.prepare(
    `INSERT INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`
  ).run(key, value);
}

// ---------- Promotions ----------

export type Promotion = {
  id: string;
  label: string;
  message: string;
  ctaText: string | null;
  ctaUrl: string | null;
  startsAt: string | null;
  endsAt: string | null;
  isActive: boolean;
  createdAt: string;
};

function mapPromo(r: any): Promotion {
  return {
    id: r.id,
    label: r.label,
    message: r.message,
    ctaText: r.cta_text,
    ctaUrl: r.cta_url,
    startsAt: r.starts_at,
    endsAt: r.ends_at,
    isActive: !!r.is_active,
    createdAt: r.created_at,
  };
}

export function listPromotions(): Promotion[] {
  const db = getDb();
  return (db
    .prepare(`SELECT * FROM promotions ORDER BY created_at DESC`)
    .all() as any[]).map(mapPromo);
}

export function getActivePromotion(): Promotion | null {
  const promos = listPromotions();
  const now = new Date().toISOString();
  return (
    promos.find((p) => {
      if (!p.isActive) return false;
      if (p.startsAt && p.startsAt > now) return false;
      if (p.endsAt && p.endsAt < now) return false;
      return true;
    }) || null
  );
}

export function createPromotion(input: {
  label: string;
  message: string;
  ctaText?: string | null;
  ctaUrl?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
  isActive?: boolean;
}) {
  const db = getDb();
  const id = `promo${Date.now()}`;
  db.prepare(
    `INSERT INTO promotions (id, label, message, cta_text, cta_url, starts_at, ends_at, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    input.label,
    input.message,
    input.ctaText || null,
    input.ctaUrl || null,
    input.startsAt || null,
    input.endsAt || null,
    input.isActive ? 1 : 0
  );
  return id;
}

export function updatePromotion(
  id: string,
  patch: Partial<{
    label: string;
    message: string;
    ctaText: string | null;
    ctaUrl: string | null;
    startsAt: string | null;
    endsAt: string | null;
    isActive: boolean;
  }>
) {
  const db = getDb();
  const cur = (db.prepare(`SELECT * FROM promotions WHERE id = ?`).get(id) as any);
  if (!cur) throw new Error("Promotion not found");
  db.prepare(
    `UPDATE promotions SET
      label = ?, message = ?, cta_text = ?, cta_url = ?,
      starts_at = ?, ends_at = ?, is_active = ?
     WHERE id = ?`
  ).run(
    patch.label ?? cur.label,
    patch.message ?? cur.message,
    patch.ctaText !== undefined ? patch.ctaText : cur.cta_text,
    patch.ctaUrl !== undefined ? patch.ctaUrl : cur.cta_url,
    patch.startsAt !== undefined ? patch.startsAt : cur.starts_at,
    patch.endsAt !== undefined ? patch.endsAt : cur.ends_at,
    patch.isActive !== undefined ? (patch.isActive ? 1 : 0) : cur.is_active,
    id
  );
}

export function deletePromotion(id: string) {
  const db = getDb();
  db.prepare(`DELETE FROM promotions WHERE id = ?`).run(id);
}