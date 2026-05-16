# Feature: Categories & Shop Browse

## Overview
Browse pages: `/shop` (all) and `/category/[slug]` (filtered).

## Data Model

```
Category {
  id          String @id @default(cuid())
  slug        String @unique
  name        String
  tagline     String
  description String
  imageUrl    String
  order       Int    @default(0)
  products    Product[]
}
```

## Pages
- `/shop` — header with title "The Shop", small intro paragraph, sidebar/top-bar filters: Category, Certification, Goal, Price range. Grid of products (4-up desktop, 2-up mobile).
- `/category/[slug]` — same grid pattern but pre-filtered with a category hero image + tagline.

## Filters
- Implemented as URL search params: `?category=...&cert=...&goal=...&min=&max=`.
- Server reads params, queries DB.
- Filter UI is a Client Component that updates URL.

## Acceptance Criteria
- Filtering updates the URL and re-fetches.
- Empty state ("No products match — try clearing filters.") shows when 0 results.
- Pagination or "Load more" if >24 results (use simple cursor in v1).

## Status
- planned