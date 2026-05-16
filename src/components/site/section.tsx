import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel,
  align = "left",
  className = "",
}: Props) {
  return (
    <div
      className={`flex flex-col gap-6 ${
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      } ${className}`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="display-3 font-serif text-ink">{title}</h2>
        {description && (
          <p className="mt-4 text-base text-ink/65 md:text-lg">{description}</p>
        )}
      </div>
      {ctaHref && ctaLabel && (
        <Link
          href={ctaHref}
          className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-ink"
        >
          {ctaLabel}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}