import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/types";
import { Star } from "lucide-react";

interface Props {
  product: Product;
  variant?: "default" | "compact" | "feature";
}

export function ProductCard({ product, variant = "default" }: Props) {
  const isFeature = variant === "feature";
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col"
    >
      <div
        className={`relative overflow-hidden rounded-xl bg-bone-2 ${
          isFeature ? "aspect-[5/6]" : "aspect-[4/5]"
        }`}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* tags */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.isEditorPick && (
            <span className="label-mono rounded-full bg-clay px-2.5 py-1 text-[10px] text-bone">
              Editor's Pick
            </span>
          )}
          {product.certifications.includes("Regenerative Certified") && (
            <span className="label-mono rounded-full bg-moss px-2.5 py-1 text-[10px] text-bone">
              Regenerative
            </span>
          )}
        </div>
        {/* hover CTA */}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="rounded-full bg-ink/90 px-4 py-2 text-center text-xs font-medium text-bone backdrop-blur-sm">
            Read review →
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <p className="label-mono text-ink/50">{product.brand}</p>
        <h3 className="mt-1 font-serif text-xl leading-tight text-ink transition-colors group-hover:text-moss">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink/60">
          {product.tagline}
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-sun text-sun" strokeWidth={1} />
            <span className="text-xs font-medium text-ink/80">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-ink/40">·</span>
            <span className="text-xs text-ink/60">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <span className="label-mono text-ink/40">
            {product.merchant}
          </span>
        </div>
      </div>
    </Link>
  );
}