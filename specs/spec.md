# Regeneralive — Master Spec

## Project Overview

**Regeneralive** (regeneralive.com) is an affiliate marketing website focused on **regenerative organic foods, premium supplements, and wellness products**. The brand stands at the intersection of *regeneration* and *being alive*—a curated guide for people who want to eat, supplement, and live in ways that heal their bodies *and* the soil.

The site does not sell products directly. Every product card links out to the merchant via an affiliate-tracked URL. The site earns commission on qualified purchases.

## Brand & Voice

- **Tone**: warm, expert, grounded, slightly editorial. Think *Outside × Goop × Civil Eats* — not a generic Amazon affiliate blog.
- **Aesthetic direction**: earthy, alive, premium. Hand-picked photography (real food, soil, farms, sun). A serif display font paired with a clean geometric sans. Generous whitespace. Subtle film-grain or paper texture in backgrounds. Warm earth palette with a vibrant living-green accent.
- **Color palette (proposed)**:
  - `--bone` `#F5F1E8` (background warm off-white)
  - `--ink` `#1C1A14` (near-black primary text)
  - `--clay` `#C2553A` (rust accent)
  - `--moss` `#3F5B3A` (deep regenerative green)
  - `--lichen` `#A8B97F` (lichen green secondary)
  - `--sun` `#E8B23A` (golden sun)
  - `--soil` `#5C4330` (earth brown)
- **Typography**:
  - Display: **Fraunces** (variable serif, optical size, slightly quirky — feels editorial & alive)
  - Body: **Inter Tight** or **Geist** (clean readable sans)
  - Mono accent: **JetBrains Mono** for small labels / data

## Goals

1. Convert visitors into clicks on affiliate-linked products.
2. Build long-term trust via genuinely useful content (guides, deep-dive reviews, ingredient explainers).
3. Capture newsletter signups for retention & repeat affiliate revenue.
4. Be FTC-compliant: disclose affiliate relationships clearly on every page.
5. Be SEO-friendly: clean URLs, structured data, fast load.

## Tech Stack

- **Framework**: Next.js 14+ (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui (heavily customized — *not* generic shadcn aesthetic)
- **Database**: NeonDB (managed Postgres) via Prisma
- **Animations**: Framer Motion for hero/scroll reveals
- **Icons**: Lucide React
- **Fonts**: next/font with Fraunces + Inter Tight
- **Deployment**: Vercel-ready

## Architecture Rules

- All affiliate links route through `/go/[slug]` redirector that logs the click then 302s to the merchant URL with affiliate tracking parameters appended.
- Every product card and outbound link uses `rel="sponsored noopener nofollow"`.
- Affiliate disclosure visible above-the-fold on any page that contains affiliate links (small banner) and full disclosure page at `/disclosure`.
- Database read for products, categories, articles. No direct merchant API calls at runtime.
- Image strategy: use `next/image` with curated Unsplash & merchant images.
- All content is server-rendered for SEO. Use Server Components by default; Client Components only for interactive bits.

## Site Map

- `/` — Home
- `/shop` — All products (filterable by category, certification, price)
- `/category/[slug]` — Category landing (e.g., `/category/regenerative-pantry`)
- `/product/[slug]` — Individual product detail w/ review, ingredients, affiliate CTA
- `/journal` — Blog/articles index
- `/journal/[slug]` — Article detail
- `/about` — Brand story, editorial standards, how we choose products
- `/disclosure` — Full affiliate disclosure (FTC compliant)
- `/contact` — Contact form / partnership inquiries
- `/go/[slug]` — Affiliate redirector (server-only, logs click)
- `/api/newsletter` — POST: subscribe email
- `/api/click` — POST: log click event (used by redirector)

## Categories (initial)

1. **Regenerative Pantry** — pasture-raised meat, regenerative grains, olive oils, honey, dairy
2. **Superfoods & Adaptogens** — cacao, mushrooms, sea moss, spirulina
3. **Daily Supplements** — multivitamins, omega-3, magnesium, electrolytes
4. **Longevity & Performance** — NMN, creatine, peptides, nootropics
5. **Gut & Immunity** — probiotics, fiber, colostrum, fermented goods
6. **Skin & Beauty** — clean serums, sunscreen, collagen
7. **Home & Kitchen** — non-toxic cookware, water filters, air purifiers
8. **Mindful Living** — sleep aids, breathwork tools, journals

## Feature List

| Feature | Spec | Status |
|---|---|---|
| Brand system (theme, fonts, layout shell) | [specs/brand-system/document.md](brand-system/document.md) | planned |
| Homepage | [specs/homepage/document.md](homepage/document.md) | planned |
| Product catalog & detail | [specs/product-catalog/document.md](product-catalog/document.md) | planned |
| Product search | [specs/product-search/document.md](product-search/document.md) | done |
| Categories & shop browse | [specs/categories/document.md](categories/document.md) | planned |
| Affiliate click tracker & redirector | [specs/affiliate-tracking/document.md](affiliate-tracking/document.md) | planned |
| Journal (blog/articles) | [specs/journal/document.md](journal/document.md) | planned |
| Newsletter signup | [specs/newsletter/document.md](newsletter/document.md) | planned |
| About / Disclosure / Contact pages | [specs/static-pages/document.md](static-pages/document.md) | planned |

## Out of Scope (v1)

- User accounts / saved favorites (could be added v2)
- Direct e-commerce / cart
- Real-time merchant price scraping
- User reviews / comments
- Multi-language

## Compliance

- FTC affiliate disclosure on every product page and visible site-wide banner.
- Cookie notice (simple, dismissible) — no tracking pixels in v1, but newsletter signups need consent.
- Privacy policy linked in footer.