# Feature: Newsletter Signup

## Overview
Email capture for retention.

## Data Model

```
Subscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  source    String?  // "homepage-hero", "footer", "article-cta"
  createdAt DateTime @default(now())
}
```

## API
- `POST /api/newsletter` body: `{ email, source? }`.
- Validate email format. Insert (upsert on email). Return `{ ok: true }` or `{ ok: false, error }`.

## UI
- Reusable `<NewsletterForm source="..." />` Client Component.
- States: idle, submitting, success ("Welcome — check your inbox 🌱"), error.

## Acceptance Criteria
- Submitting a valid email returns success and creates DB row.
- Duplicate email returns success silently (idempotent).
- Invalid email returns error.

## Status
- planned