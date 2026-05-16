# Feature: Homepage

## Overview
The homepage is the editorial front door. It pitches the brand, surfaces top picks, drives users to categories and the journal, and captures newsletter signups.

## Goals
- Communicate the brand promise in <3 seconds.
- Drive clicks to product detail pages and outbound affiliate links.
- Promote latest journal articles for SEO/trust.
- Capture newsletter signups.

## Sections (top to bottom)
1. **Hero** — full-bleed editorial. Big serif headline ("*Eat like the soil is alive.*"), subhead, two CTAs (*Shop the regenerative pantry*, *Read the journal*). Background: layered earth-tone gradient + abstract organic SVG shape + a hero image collage.
2. **Trust bar** — small inline marks: "USDA Organic · Regenerative Certified · Glyphosate-Free · Third-Party Tested" — strip with thin dividers.
3. **Editor's Picks** — 4 product cards, large imagery, tagged "Editor's Pick". Click → product detail.
4. **Shop by Category** — 8 category tiles in an asymmetric grid, each with a hero image + title + 1-line description.
5. **The Manifesto** — split section: left = a stylized quote / manifesto text, right = a vertical image. Sets philosophical tone.
6. **From the Journal** — 3 latest articles in a magazine-style layout (1 large left, 2 stacked right).
7. **Top picks by goal** — horizontal scroll/grid: "Sleep better", "Move stronger", "Heal your gut", "Live longer" — clickable goal-based filters that link to `/shop?goal=...`.
8. **Newsletter CTA** — full-width section, organic-shape background, email input.
9. **Footer** — handled by layout shell.

## Functional Requirements
- Server-rendered with data from DB (top picks, latest journal posts, categories).
- Hero image uses next/image priority.
- All product/journal cards link to detail pages.
- Newsletter form posts to `/api/newsletter`.

## Animations
- Hero headline: stagger-fade in on load (Framer Motion).
- On-scroll reveal for sections (subtle, 8px translate-up + opacity).
- Product card hover: image scale 1.03, slight tilt of price tag.

## Acceptance Criteria
- Page renders in <1.5s on local dev.
- All CTAs link to working pages.
- Mobile: single-column with proportional adjustments.
- Newsletter signup returns success/error state.

## Status
- planned