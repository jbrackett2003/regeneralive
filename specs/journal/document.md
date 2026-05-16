# Feature: Journal (Blog/Articles)

## Overview
SEO-driving editorial content: deep-dive reviews, guides, ingredient explainers, farmer profiles.

## Data Model

```
Article {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  dek         String   // subhead
  body        String   // markdown
  coverImage  String
  author      String
  authorRole  String
  readTime    Int      // minutes
  tags        String[]
  publishedAt DateTime
  isFeatured  Boolean  @default(false)
}
```

## Pages
- `/journal` — magazine-style index. Featured article large at top. Then 2-col grid of recent posts. Tag filters.
- `/journal/[slug]` — long-form reading layout: large hero image, title, dek, byline, read time. Body in narrow 65ch column. Pull-quotes styled. Inline product callouts that link to product detail or affiliate redirector.

## Acceptance Criteria
- Markdown body renders with headings, paragraphs, lists, blockquotes, images.
- Article page links to 3 related products at the bottom (matched by tag).

## Status
- planned