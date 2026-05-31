/**
 * Per-brand affiliate discount codes.
 *
 * Edit the `code` value once your affiliate dashboard issues your final code.
 * Setting `code: null` hides the chip but keeps the affiliate redirect working.
 *
 * The chip auto-renders on:
 *   - product cards (small badge)
 *   - product pages (large copy-to-clipboard chip)
 * for any product whose `brand` matches a key here.
 */
export interface BrandDiscount {
  /** The actual code shown to readers, e.g. "REGEN10". null = hide chip. */
  code: string | null;
  /** Short copy line, e.g. "10% off any Thorne SKU" */
  label: string;
  /** Long-form note shown in product page chip */
  note?: string;
}

export const BRAND_DISCOUNTS: Record<string, BrandDiscount> = {
  Thorne: {
    // TODO: replace with the exact code from your Aspire creator dashboard.
    // Once set, every Thorne product page + card will display it automatically.
    code: "REGEN10",
    label: "10% off any Thorne order",
    note: "Use code at checkout — applied automatically when you click through our affiliate link.",
  },
};

export function getBrandDiscount(brand: string): BrandDiscount | null {
  const d = BRAND_DISCOUNTS[brand];
  if (!d || !d.code) return null;
  return d;
}