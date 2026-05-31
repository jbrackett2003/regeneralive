import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { categories as seedCategories } from "@/data/seed-categories";
import { products as seedProducts } from "@/data/seed-products";
import { articles as seedArticles } from "@/data/seed-articles";
import { thorneExtras } from "@/data/seed-thorne-extras";
import { thorneExtras2 } from "@/data/seed-thorne-extras-2";
import { thorneExtras3 } from "@/data/seed-thorne-extras-3";
import { regenFoods } from "@/data/seed-regen-foods";
import { seoArticles } from "@/data/seed-articles-2";

const DATA_DIR =
  process.env.DATA_DIR || path.join(process.cwd(), "data-store");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, "regeneralive.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;
  _db = new Database(DB_PATH);
  _db.pragma("journal_mode = WAL");
  _db.pragma("foreign_keys = ON");
  initSchema(_db);
  return _db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      tagline TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT NOT NULL,
      emoji TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      tagline TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      currency TEXT NOT NULL DEFAULT 'USD',
      image_url TEXT NOT NULL,
      gallery_urls TEXT,
      category_slug TEXT NOT NULL,
      affiliate_url TEXT NOT NULL,
      merchant TEXT NOT NULL,
      certifications TEXT NOT NULL DEFAULT '[]',
      goals TEXT NOT NULL DEFAULT '[]',
      rating REAL NOT NULL DEFAULT 0,
      is_editor_pick INTEGER NOT NULL DEFAULT 0,
      is_featured INTEGER NOT NULL DEFAULT 0,
      is_hidden INTEGER NOT NULL DEFAULT 0,
      pros TEXT NOT NULL DEFAULT '[]',
      cons TEXT NOT NULL DEFAULT '[]',
      ingredients TEXT,
      serving_size TEXT,
      deal_label TEXT,
      deal_starts_at TEXT,
      deal_ends_at TEXT,
      original_price REAL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_slug);
    CREATE INDEX IF NOT EXISTS idx_products_hidden ON products(is_hidden);

    CREATE TABLE IF NOT EXISTS articles (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      dek TEXT NOT NULL,
      body TEXT NOT NULL,
      cover_image TEXT NOT NULL,
      author TEXT NOT NULL,
      author_role TEXT NOT NULL,
      read_time INTEGER NOT NULL DEFAULT 5,
      tags TEXT NOT NULL DEFAULT '[]',
      published_at TEXT NOT NULL,
      is_featured INTEGER NOT NULL DEFAULT 0,
      is_hidden INTEGER NOT NULL DEFAULT 0,
      related_product_slugs TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS clicks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_slug TEXT NOT NULL,
      source TEXT,
      referer TEXT,
      user_agent TEXT,
      ip TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_clicks_slug ON clicks(product_slug);
    CREATE INDEX IF NOT EXISTS idx_clicks_date ON clicks(created_at);

    CREATE TABLE IF NOT EXISTS newsletter_signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      read_at TEXT
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS promotions (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      message TEXT NOT NULL,
      cta_text TEXT,
      cta_url TEXT,
      starts_at TEXT,
      ends_at TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed from TypeScript data on first run (idempotent — only seeds if empty)
  const productCount = db.prepare("SELECT COUNT(*) as c FROM products").get() as { c: number };
  if (productCount.c === 0) {
    seedFromTsData(db);
  }

  // Migrations for existing DBs that may be missing newer columns.
  // ALTER TABLE ADD COLUMN is no-op if the column already exists in newer
  // SQLite, but older versions raise — so we wrap in try/catch.
  try {
    db.exec(`ALTER TABLE products ADD COLUMN original_price REAL`);
  } catch {
    /* column already exists */
  }

  // Idempotent extras seed — runs every boot, but uses INSERT OR IGNORE so
  // existing slugs are NOT overwritten. New products defined in code get
  // added on next deploy without disturbing user-edited content.
  seedExtras(db);

  // One-time deal seeder — applies sample deals to a hand-picked set of
  // products IF dealLabel is currently null AND we haven't run this before.
  // Admin-cleared deals stay cleared.
  seedDealsOnce(db);

  // Idempotent additive article seed — INSERT OR IGNORE so admin-edited
  // articles aren't clobbered, but new articles defined in code surface
  // automatically on next deploy.
  seedExtraArticles(db);

  // Seed initial admin password hash if no setting exists yet.
  // (Bcrypt hash is one-way — safe to include in source.
  // User can change password via /admin/settings.)
  const pwRow = db
    .prepare("SELECT value FROM settings WHERE key = ?")
    .get("admin_password_hash") as { value: string } | undefined;
  if (!pwRow) {
    const initialHash =
      process.env.ADMIN_PASSWORD_HASH ||
      "$2b$10$CRAyNsg8G8rBjIBWCF6KlO5rAZfOjecKByVi8rtfZB436KWNVwX4i";
    db.prepare(
      "INSERT INTO settings (key, value) VALUES (?, ?)"
    ).run("admin_password_hash", initialHash);
  }
}

function seedFromTsData(db: Database.Database) {
  const categories = seedCategories;
  const products = seedProducts;
  const articles = seedArticles;

  const insertCat = db.prepare(`
    INSERT INTO categories (id, slug, name, tagline, description, image_url, emoji, sort_order)
    VALUES (@id, @slug, @name, @tagline, @description, @imageUrl, @emoji, @order)
  `);
  const insertProd = db.prepare(`
    INSERT INTO products (
      id, slug, name, brand, tagline, description, price, currency,
      image_url, gallery_urls, category_slug, affiliate_url, merchant,
      certifications, goals, rating, is_editor_pick, is_featured,
      pros, cons, ingredients, serving_size
    ) VALUES (
      @id, @slug, @name, @brand, @tagline, @description, @price, @currency,
      @imageUrl, @galleryUrls, @categorySlug, @affiliateUrl, @merchant,
      @certifications, @goals, @rating, @isEditorPick, @isFeatured,
      @pros, @cons, @ingredients, @servingSize
    )
  `);
  const insertArt = db.prepare(`
    INSERT INTO articles (
      id, slug, title, dek, body, cover_image, author, author_role,
      read_time, tags, published_at, is_featured, related_product_slugs
    ) VALUES (
      @id, @slug, @title, @dek, @body, @coverImage, @author, @authorRole,
      @readTime, @tags, @publishedAt, @isFeatured, @relatedProductSlugs
    )
  `);

  const tx = db.transaction(() => {
    for (const c of categories) {
      insertCat.run({
        ...c,
        emoji: c.emoji || null,
      });
    }
    for (const p of products) {
      insertProd.run({
        ...p,
        galleryUrls: JSON.stringify(p.galleryUrls || []),
        certifications: JSON.stringify(p.certifications || []),
        goals: JSON.stringify(p.goals || []),
        pros: JSON.stringify(p.pros || []),
        cons: JSON.stringify(p.cons || []),
        ingredients: p.ingredients || null,
        servingSize: p.servingSize || null,
        isEditorPick: p.isEditorPick ? 1 : 0,
        isFeatured: p.isFeatured ? 1 : 0,
      });
    }
    for (const a of articles) {
      insertArt.run({
        ...a,
        tags: JSON.stringify(a.tags || []),
        relatedProductSlugs: JSON.stringify(a.relatedProductSlugs || []),
        isFeatured: a.isFeatured ? 1 : 0,
      });
    }
  });

  tx();
  console.log(
    `[db] Seeded ${categories.length} categories, ${products.length} products, ${articles.length} articles`
  );
}

/**
 * Idempotent additive seed — only inserts products whose slug doesn't already
 * exist. Safe to run on every boot; existing edits are preserved.
 */
function seedExtras(db: Database.Database) {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO products (
      id, slug, name, brand, tagline, description, price, currency,
      image_url, gallery_urls, category_slug, affiliate_url, merchant,
      certifications, goals, rating, is_editor_pick, is_featured,
      pros, cons, ingredients, serving_size
    ) VALUES (
      @id, @slug, @name, @brand, @tagline, @description, @price, @currency,
      @imageUrl, @galleryUrls, @categorySlug, @affiliateUrl, @merchant,
      @certifications, @goals, @rating, @isEditorPick, @isFeatured,
      @pros, @cons, @ingredients, @servingSize
    )
  `);

  // All products that get the additive idempotent seed treatment
  const allExtras = [
    ...thorneExtras,
    ...thorneExtras2,
    ...thorneExtras3,
    ...regenFoods,
  ];

  let added = 0;
  const tx = db.transaction(() => {
    for (const p of allExtras) {
      const result = insert.run({
        ...p,
        galleryUrls: JSON.stringify(p.galleryUrls || []),
        certifications: JSON.stringify(p.certifications || []),
        goals: JSON.stringify(p.goals || []),
        pros: JSON.stringify(p.pros || []),
        cons: JSON.stringify(p.cons || []),
        ingredients: p.ingredients || null,
        servingSize: p.servingSize || null,
        isEditorPick: p.isEditorPick ? 1 : 0,
        isFeatured: p.isFeatured ? 1 : 0,
      });
      if (result.changes > 0) added++;
    }
  });
  tx();
  if (added > 0) {
    console.log(
      `[db] Added ${added} product(s) via idempotent seed (Thorne + regenerative foods)`
    );
  }
}

/**
 * Apply a curated set of sample deals to seed the "Live Deals" homepage
 * section. Runs once (gated by a settings flag), and only writes deal fields
 * to products that currently have no deal — so admin-cleared deals are not
 * resurrected on every boot.
 *
 * The deals are realistic for an affiliate site: Thorne's universal 10% off
 * via the affiliate link, plus a few seasonal discount campaigns on
 * regenerative foods that the user can replace with real deal data later.
 */
function seedDealsOnce(db: Database.Database) {
  const VERSION = "deals_seeded_v2";
  const flag = db
    .prepare("SELECT value FROM settings WHERE key = ?")
    .get(VERSION) as { value: string } | undefined;
  if (flag) return;

  const now = new Date();
  const startsAt = new Date(now.getTime() - 24 * 3600 * 1000).toISOString();
  const endsAt = new Date(
    now.getTime() + 60 * 24 * 3600 * 1000
  ).toISOString();

  // Seasonal deal end (60 days from boot — gives the section "freshness")
  const deals: Array<{
    slug: string;
    label: string;
    originalPrice?: number; // if set, shows strikethrough + savings %
  }> = [
    // Thorne — universal 10% via affiliate, framed as a deal
    { slug: "thorne-creatine", label: "10% Off · Affiliate", originalPrice: 49 },
    {
      slug: "thorne-magnesium-bisglycinate",
      label: "10% Off · Affiliate",
      originalPrice: 58,
    },
    {
      slug: "thorne-vitamin-d-k2-liquid",
      label: "10% Off · Affiliate",
      originalPrice: 38,
    },
    {
      slug: "thorne-q-best-100",
      label: "10% Off · Affiliate",
      originalPrice: 59,
    },
    {
      slug: "thorne-whey-protein-isolate-vanilla",
      label: "10% Off · Affiliate",
      originalPrice: 72,
    },
    {
      slug: "thorne-daily-greens-plus",
      label: "10% Off · Affiliate",
      originalPrice: 80,
    },
    // Regenerative foods — sample campaigns
    {
      slug: "force-of-nature-ancestral-blend",
      label: "Save $4 on First Box",
      originalPrice: 18.99,
    },
    {
      slug: "butcherbox-grass-fed-beef-box",
      label: "$30 Off New Members",
      originalPrice: 199,
    },
    {
      slug: "vital-farms-pasture-raised-eggs",
      label: "Spring Reader Deal",
    },
    {
      slug: "kettle-fire-bone-broth",
      label: "Bundle & Save",
      originalPrice: 11.99,
    },
    {
      slug: "graza-drizzle-extra-virgin-olive-oil",
      label: "Free Shipping",
    },
    {
      slug: "alter-eco-deepest-dark-chocolate",
      label: "20% Off Bars 12-Pack",
      originalPrice: 6.49,
    },
  ];

  const stmt = db.prepare(`
    UPDATE products
    SET deal_label = @label,
        deal_starts_at = @starts_at,
        deal_ends_at = @ends_at,
        original_price = @original_price,
        updated_at = CURRENT_TIMESTAMP
    WHERE slug = @slug
      AND (deal_label IS NULL OR deal_label = '')
  `);

  let applied = 0;
  const tx = db.transaction(() => {
    for (const d of deals) {
      const r = stmt.run({
        slug: d.slug,
        label: d.label,
        starts_at: startsAt,
        ends_at: endsAt,
        original_price: d.originalPrice ?? null,
      });
      if (r.changes > 0) applied++;
    }
    db.prepare(
      "INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)"
    ).run(VERSION, "true");
  });
  tx();
  if (applied > 0) {
    console.log(`[db] Applied ${applied} sample deal(s) to products`);
  }
}

/**
 * Idempotent additive article seed — INSERT OR IGNORE so admin-edited
 * articles aren't clobbered, but new articles defined in code surface
 * automatically on next deploy.
 */
function seedExtraArticles(db: Database.Database) {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO articles (
      id, slug, title, dek, body, cover_image, author, author_role,
      read_time, tags, published_at, is_featured, related_product_slugs
    ) VALUES (
      @id, @slug, @title, @dek, @body, @coverImage, @author, @authorRole,
      @readTime, @tags, @publishedAt, @isFeatured, @relatedProductSlugs
    )
  `);

  let added = 0;
  const tx = db.transaction(() => {
    for (const a of seoArticles) {
      const r = insert.run({
        ...a,
        tags: JSON.stringify(a.tags || []),
        relatedProductSlugs: JSON.stringify(a.relatedProductSlugs || []),
        isFeatured: a.isFeatured ? 1 : 0,
      });
      if (r.changes > 0) added++;
    }
  });
  tx();
  if (added > 0) {
    console.log(`[db] Added ${added} SEO article(s) via idempotent seed`);
  }
}