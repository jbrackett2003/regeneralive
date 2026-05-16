# Feature: Brand System

## Overview
The brand system is the foundation: theme tokens, fonts, layout shell, navigation, footer, and reusable UI primitives. It defines the editorial-organic aesthetic.

## Goals
- Establish a distinctive non-AI-generic visual language.
- Provide a single source of design tokens used across all features.

## Scope / Non-goals
- In scope: theme CSS variables, font setup via next/font, header, footer, affiliate-disclosure banner, layout shell.
- Not in scope: per-page hero designs (covered in homepage spec).

## UX / Design Notes
- Header: minimal. Logo wordmark "regeneralive" left (Fraunces italic with mark), nav center (Shop, Journal, About), CTA right ("Subscribe" pill button).
- Sticky on scroll, with backdrop blur + thin bottom border that appears once scrolled.
- Affiliate disclosure: thin top strip, 32px tall, copy: *"Some links earn us a commission — we only recommend products we'd give to family. [Learn more →]"* — dismissible per-session.
- Footer: 4 columns (Shop, Journal, Company, Legal) + newsletter signup full-width row above + brand mark with manifesto line.
- Background: subtle paper-grain via SVG noise overlay at 4% opacity on `--bone`.

## Functional Requirements
- Use next/font with Fraunces + Inter Tight; preload, fallback fonts set.
- Theme tokens defined in `globals.css` as CSS custom properties + Tailwind theme extension.
- Disclosure banner state stored in `sessionStorage`.
- Layout shell wraps all routes via `app/layout.tsx`.

## Implementation Notes
- Global container max-width: `max-w-[1280px]` with `px-6 md:px-10`.
- Headings: Fraunces with `font-optical-sizing-auto`.
- Add custom Tailwind utilities for `text-balance`, `text-pretty`.

## Acceptance Criteria
- Site has consistent header & footer on every route.
- All colors come from CSS variables.
- Fraunces + Inter Tight load without FOUT.
- Disclosure banner appears, can be dismissed, stays dismissed for the session.

## Status
- planned