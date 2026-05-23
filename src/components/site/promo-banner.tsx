import Link from "next/link";
import { getActivePromotion } from "@/lib/repos";

export function PromoBanner() {
  const promo = getActivePromotion();
  if (!promo) return null;

  return (
    <div className="relative z-[10] bg-ink text-bone">
      <div className="container-x py-2.5 flex items-center justify-center gap-4 text-sm flex-wrap">
        <span className="font-medium tracking-wide">{promo.message}</span>
        {promo.ctaText && promo.ctaUrl && (
          <Link
            href={promo.ctaUrl}
            target={promo.ctaUrl.startsWith("http") ? "_blank" : undefined}
            rel={promo.ctaUrl.startsWith("http") ? "sponsored noopener" : undefined}
            className="rounded-full bg-bone text-ink px-3 py-1 text-xs font-medium hover:bg-lichen transition"
          >
            {promo.ctaText} →
          </Link>
        )}
      </div>
    </div>
  );
}