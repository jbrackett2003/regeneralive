# Feature: Product Search

## Overview

Give visitors a prominent, accessible way to find products by name, brand, or product description from the shop page and global site header. Search state is represented by the `/shop?q=...` URL so results are server-rendered, shareable, and work without client-side JavaScript.

## Goals

- Make product search easy to discover from every page.
- Return useful matches across product names, brands, taglines, descriptions, certifications, and goals.
- Preserve the existing shop filtering and sorting experience.
- Provide clear result counts and a useful empty state.

## Scope / non-goals

### Scope
- Global header search control on desktop and mobile.
- Prominent search form on the shop page.
- Case-insensitive, whitespace-normalized matching against the local catalog.
- URL-driven results at `/shop?q=<term>`.
- Clear-search and no-results affordances.

### Non-goals
- Fuzzy matching, typo correction, autocomplete, or search analytics.
- External search services or a new database index.
- Searching journal articles or static pages.

## User flows / UX / design notes

1. A visitor opens search from the header, enters a product or brand, and submits.
2. The site navigates to `/shop?q=...`, displays the active query, result count, and matching cards.
3. A visitor can refine results with existing filters or clear all filters.
4. On the shop page, a large search field appears above the catalog controls.
5. If there are no matches, the visitor sees the query and can clear it to return to all products.

Search controls use semantic GET forms, visible labels or accessible names, keyboard submission, strong focus styles, and a comfortable touch target.

## Functional requirements

- Submitting non-empty text navigates to `/shop?q=<encoded query>`.
- Blank submissions navigate to `/shop`.
- Search is case-insensitive and trims leading/trailing whitespace.
- Search checks product name, brand, tagline, description, certifications, and goals.
- Existing category, brand, deal, certification, goal, and sort filters continue to compose with search.
- The displayed result count updates to the filtered count.
- The empty state includes the submitted query and a link to clear search/filters.
- Header search closes after route navigation and is keyboard accessible.

## Data model / schema

No schema changes. Search reads the existing product catalog fields in memory.

## API contracts

No new API. The shop route accepts:

- `GET /shop?q=<string>` — returns the server-rendered filtered catalog.
- Other existing query parameters may be combined with `q`.

## Edge cases / failure modes

- Empty or whitespace-only query: treat as no search.
- Mixed case: match case-insensitively.
- Special URL characters: native GET form encoding must preserve the term safely.
- No results: show a non-error empty state and clear action.
- Long query: field remains usable and layout does not overflow.

## Acceptance criteria

- A search for a known product name returns that product.
- A search for a known brand returns products from that brand.
- Search can be opened and submitted from the desktop and mobile header.
- Search can be submitted from the shop page with mouse or keyboard.
- The query remains visible after navigation.
- A nonsense query produces a useful zero-results state.
- Clearing search returns to the full catalog.

## Test plan / test cases

1. Search a known product name from the shop form; verify URL, input value, count, and card.
2. Search a known brand; verify multiple relevant cards where available.
3. Search with mixed case and surrounding spaces; verify normalization.
4. Search a nonsense string; verify zero-results copy and clear action.
5. Combine search with one existing filter; verify both constraints apply.
6. Open and submit header search with keyboard.
7. Verify desktop and mobile layouts and visible focus states.
8. Check browser console and network logs for errors.

## Implementation notes

- Follow the existing App Router `searchParams` pattern in `src/app/shop/page.tsx`.
- Use native GET forms for progressive enhancement and shareable URL state.
- Reuse the earth-tone visual system and Lucide search icon already available in the project.
- Next.js documents URL search params as the appropriate state mechanism for search and pagination in App Router applications.

## Status / open questions

Status: done.

Open questions: none; product-only search is the requested default.