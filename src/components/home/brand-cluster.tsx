import Link from "next/link";

/**
 * "Brands We Stand Behind" — typographic cluster of brands carried on the site.
 *
 * Each brand is rendered as text in a serif/italic style (no logo PNGs, no
 * copyright surface area) and links to a filtered shop page so readers can
 * jump to a brand's full lineup. The visual rhythm comes from mixed fonts,
 * sizes, and italics — closer to a magazine masthead than a logo wall.
 */

interface Brand {
  name: string;
  /** Display variant — picks a typographic style */
  style: "serif" | "italic" | "mono" | "display";
}

const BRANDS: Brand[] = [
  { name: "Thorne", style: "display" },
  { name: "Force of Nature", style: "italic" },
  { name: "White Oak Pastures", style: "serif" },
  { name: "ButcherBox", style: "mono" },
  { name: "Vital Farms", style: "serif" },
  { name: "Vital Choice", style: "italic" },
  { name: "Kerrygold", style: "display" },
  { name: "Kettle & Fire", style: "serif" },
  { name: "Graza", style: "mono" },
  { name: "Brightland", style: "italic" },
  { name: "Alter Eco", style: "serif" },
  { name: "Crown Maple", style: "display" },
  { name: "Maple Hill", style: "italic" },
  { name: "Bobbie", style: "mono" },
  { name: "Paleovalley", style: "serif" },
  { name: "Bragg", style: "display" },
];

const STYLE_CLASS: Record<Brand["style"], string> = {
  serif: "font-serif text-2xl md:text-3xl tracking-tight",
  italic: "font-serif italic text-2xl md:text-3xl tracking-tight",
  mono: "label-mono text-base md:text-lg tracking-[0.18em]",
  display: "font-serif text-3xl md:text-4xl tracking-tight",
};

export function BrandCluster() {
  return (
    <section className="relative overflow-hidden border-y border-ink/10 bg-bone py-24">
      {/* faint noise + edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-bone via-bone/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-bone via-bone/80 to-transparent" />

      <div className="container-x relative">
        <div className="text-center">
          <p className="eyebrow inline-flex items-center gap-2 text-moss">
            <span className="h-px w-8 bg-moss/40" />
            Brands we stand behind
            <span className="h-px w-8 bg-moss/40" />
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl font-serif text-3xl leading-tight text-ink md:text-4xl">
            The kind of names you'd find on the labels at{" "}
            <span className="italic text-moss">our own kitchen counter.</span>
          </h2>
        </div>

        {/* Two-row staggered cluster */}
        <div className="mt-16 space-y-8 md:mt-20 md:space-y-12">
          <BrandRow
            brands={BRANDS.slice(0, 8)}
            justify="around"
            offset={false}
          />
          <BrandRow
            brands={BRANDS.slice(8)}
            justify="around"
            offset={true}
          />
        </div>

        <p className="mt-16 text-center text-xs uppercase tracking-[0.22em] text-ink/45">
          + 30 more curated brands ·{" "}
          <Link href="/shop" className="text-ink hover:text-moss link-underline">
            see the full shelf
          </Link>
        </p>
      </div>
    </section>
  );
}

function BrandRow({
  brands,
  justify,
  offset,
}: {
  brands: Brand[];
  justify: "between" | "around";
  offset: boolean;
}) {
  const justifyClass =
    justify === "between" ? "justify-between" : "justify-around";

  return (
    <div
      className={`flex flex-wrap items-center gap-x-10 gap-y-6 md:flex-nowrap md:gap-x-14 ${justifyClass} ${
        offset ? "md:px-12" : ""
      }`}
    >
      {brands.map((b) => (
        <Link
          key={b.name}
          href={`/shop?brand=${encodeURIComponent(b.name)}`}
          className={`group relative whitespace-nowrap text-ink/70 transition-all duration-500 hover:text-ink ${STYLE_CLASS[b.style]}`}
        >
          <span className="relative">
            {b.name}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-moss transition-all duration-500 group-hover:w-full" />
          </span>
        </Link>
      ))}
    </div>
  );
}