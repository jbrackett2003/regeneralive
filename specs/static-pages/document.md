# Feature: Static Pages (About / Disclosure / Contact)

## /about
- Brand origin, manifesto, editorial standards section ("How we choose products"), team area placeholder.
- Editorial layout, mixed images and text.

## /disclosure (FTC affiliate disclosure)
- Plain language explanation of affiliate relationships, "16 CFR Part 255" reference, statement that we never recommend products we wouldn't use ourselves.
- Link from header banner and footer.

## /contact
- Simple form: name, email, subject (Partnership / Press / General), message.
- Posts to `/api/contact` (just stores in `Inquiry` table for v1, no email sending).

## Data Model

```
Inquiry {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String
  createdAt DateTime @default(now())
}
```

## Acceptance Criteria
- All three pages render.
- /disclosure link appears in header banner and footer.
- Contact form submits and persists.

## Status
- planned