# Feature: Product Catalog & Detail

## Overview
Product cards and product detail pages. This is where most affiliate clicks happen.

## Data Model

```
Product {
  id            String   @id @default(cuid())
  slug          String   @unique
  name          String
  brand         String
  tagline       String   // 1-line value prop
  description   String   // long-form, markdown
  price         Decimal  // approximate, in USD
  currency      String   @default("USD")
  imageUrl      String   // primary
  galleryUrls   String[] // optional
  categoryId    String
  category      Category @relation(fields: [categoryId], references: [id])
  affiliateUrl  String   // raw merchant URL with affiliate tag
  merchant      String   // e.g. "Amazon", "Thrive Market", "Brand Direct"
  certifications String[] // ["USDA Organic", "Regenerative Certified", "Glyphosate-Free"]
  goals         String[] // ["sleep","gut","longevity","performance","skin","immunity"]
  rating        Float?   // editorial 0-5
  isEditorPick  Boolean  @default(false)
  isFeatured    Boolean  @default(false)
  pros          String[]
  cons          String[]
  ingredients   String?
  servingSize   String?
  createdAt     DateTime @default(now())
}
```

## Product Card (component)
- Rounded image (4/5 ratio), tag chips (e.g. "Editor's Pick", "Regenerative Certified") top-left.
- Brand · Name (Fraunces).
- Tagline (Inter Tight, muted).
- Price (display only — note "approx.") + small "View on {Merchant} →" mini-CTA.
- Whole card click → product detail (NOT direct outbound — we want them to read the review first).

## Product Detail Page (`/product/[slug]`)
- Two-column desktop:
  - Left: gallery (sticky on scroll). Primary image + 3 thumbnails.
  - Right: brand small-caps, large name, tagline, certification chips, price, big "Get it on {Merchant} →" CTA (links to `/go/[slug]` redirector). Below: rating, key info table (serving size, ingredients link, dietary tags).
- Below: long-form review (rendered markdown), "What we love" / "What to know" pros/cons block, ingredients block, related products (same category).
- Sticky bottom mobile bar: "Get it on {Merchant} →" CTA.

## Functional Requirements
- Outbound CTA always routes via `/go/[slug]` (logs click, then 302).
- Use `rel="sponsored noopener nofollow"` and `target="_blank"`.
- Show inline FTC disclosure near CTA: "*Affiliate link — we may earn a commission.*"

## Acceptance Criteria
- Clicking primary CTA navigates to merchant URL via redirector and a row is logged in `Click` table.
- Product page renders all fields gracefully when optional fields are null.
- Related products show 4 items from the same category, excluding current.

## Status
- planned