"use client";

import { useState } from "react";
import { Check, Copy, Tag } from "lucide-react";
import { getBrandDiscount } from "@/data/brand-discounts";

interface Props {
  brand: string;
  /** "card" = small inline badge | "page" = large copy-to-clipboard block */
  variant?: "card" | "page";
}

export function DiscountChip({ brand, variant = "page" }: Props) {
  const discount = getBrandDiscount(brand);
  const [copied, setCopied] = useState(false);

  if (!discount) return null;

  const onCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!discount.code) return;
    try {
      await navigator.clipboard.writeText(discount.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  if (variant === "card") {
    // Compact badge for product cards — non-interactive (the whole card is a link)
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-moss/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-moss">
        <Tag className="h-2.5 w-2.5" />
        Code {discount.code} · 10% off
      </span>
    );
  }

  // Page variant — large, prominent, copy-to-clipboard
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-moss/30 bg-moss/[0.06]">
      <div className="flex items-stretch">
        <div className="flex flex-1 flex-col justify-center px-5 py-4">
          <p className="label-mono flex items-center gap-1.5 text-moss">
            <Tag className="h-3 w-3" />
            Reader discount
          </p>
          <p className="mt-1.5 text-sm font-medium text-ink">
            {discount.label}
          </p>
          {discount.note && (
            <p className="mt-1 text-xs leading-snug text-ink/55">
              {discount.note}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="group relative flex w-32 shrink-0 flex-col items-center justify-center gap-1 border-l border-dashed border-moss/30 bg-bone/60 px-4 py-4 transition-colors hover:bg-moss hover:text-bone"
          aria-label={`Copy code ${discount.code}`}
        >
          <span className="label-mono text-[10px] text-ink/45 group-hover:text-bone/70">
            {copied ? "Copied" : "Tap to copy"}
          </span>
          <span className="font-mono text-base font-semibold tracking-[0.18em] text-ink group-hover:text-bone">
            {discount.code}
          </span>
          <span className="absolute right-2 top-2 text-ink/30 group-hover:text-bone/80">
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}