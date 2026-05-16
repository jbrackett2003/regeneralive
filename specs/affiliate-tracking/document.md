# Feature: Affiliate Click Tracker & Redirector

## Overview
All outbound affiliate clicks pass through `/go/[slug]` so we can:
1. Log the click for analytics.
2. Append affiliate tracking IDs server-side.
3. Hide the raw merchant URL from the link rel.

## Data Model

```
Click {
  id         String   @id @default(cuid())
  productId  String
  product    Product  @relation(fields: [productId], references: [id])
  source     String?  // e.g., "homepage", "product-page", "category-grid"
  referer    String?
  userAgent  String?
  country    String?
  createdAt  DateTime @default(now())
  @@index([productId])
  @@index([createdAt])
}
```

## Redirector Behavior
- Route: `app/go/[slug]/route.ts`.
- Lookup product by slug. If not found, redirect to `/shop`.
- Insert Click row with metadata from headers.
- Build outbound URL (use `product.affiliateUrl` as-is — affiliate tag is already embedded by content team).
- 302 redirect.
- Wrap insert in try/catch — never block the redirect on a logging failure.

## Front-end Behavior
- Outbound CTAs render `<a href="/go/[slug]?src=product-page" rel="sponsored noopener nofollow" target="_blank">`.

## Acceptance Criteria
- Clicking a product CTA records a Click row.
- User lands on the merchant URL.
- Failure of the DB insert never breaks the redirect.

## Status
- planned