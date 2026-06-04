import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getAllCategories, getCategoryBySlug } from "@/data/categories";
import {
  getAllProducts,
  getProductsByCategory,
} from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategoryBySlug(slug);
  if (!c) return { title: "Category not found" };
  return { title: c.name, description: c.description };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const items = getProductsByCategory(slug);
  const allProducts = getAllProducts();
  const allCategories = getAllCategories();

  // Counts per category for the "Other categories" rail
  const counts = new Map<string, number>();
  for (const p of allProducts) {
    counts.set(p.categorySlug, (counts.get(p.categorySlug) || 0) + 1);
  }

  // Top brands within this category (mini-rail at top)
  const brandCounts = new Map<string, number>();
  for (const p of items) {
    brandCounts.set(p.brand, (brandCounts.get(p.brand) || 0) + 1);
  }
  const topBrands = [...brandCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // Other categories rail
  const otherCategories = allCategories.filter((c) => c.slug !== slug);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="container-x pt-12">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="relative aspect-[16/7] w-full">
              <Image
                src={cat.imageUrl}
                alt={cat.name}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
              <p className="label-mono mb-3 text-bone/70">
                Category {String(cat.order).padStart(2, "0")} · {cat.emoji} ·{" "}
                {items.length} {items.length === 1 ? "product" : "products"}
              </p>
              <h1 className="font-serif display-2 max-w-3xl text-bone">
                {cat.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg italic text-bone/85">
                {cat.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <p className="eyebrow">About this category</p>
            <h2 className="mt-3 font-serif text-3xl text-ink">
              How we curate {cat.name.toLowerCase()}.
            </h2>
            <p className="mt-5 text-ink/70 leading-relaxed">
              {cat.description}
            </p>

            {topBrands.length > 0 && (
              <div className="mt-10">
                <p className="label-mono mb-3 text-ink/55">Brands in this aisle</p>
                <div className="flex flex-wrap gap-1.5">
                  {topBrands.map(([brand, count]) => (
                    <Link
                      key={brand}
                      href={`/shop?brand=${encodeURIComponent(brand)}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/75 transition-colors hover:border-moss hover:text-moss"
                    >
                      {brand}
                      <span className="text-ink/40">·</span>
                      <span className="text-ink/45">{count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 rounded-2xl border border-ink/10 bg-bone-2/40 p-5">
              <p className="label-mono text-ink/55">Why we curate this way</p>
              <p className="mt-2 text-sm text-ink/75 leading-relaxed">
                Every product in this category passes the same four-question
                test we apply to the whole site — formulation, sourcing,
                family-test, and honest pricing.
              </p>
              <Link
                href="/about"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-moss link-underline"
              >
                Read our standards →
              </Link>
            </div>
          </aside>

          <div className="lg:col-span-8">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-ink/15 px-6 py-20 text-center">
                <p className="font-serif text-2xl text-ink">
                  Stay tuned — picks coming soon.
                </p>
                <p className="mt-2 text-ink/60">
                  Browse another category or read our journal in the meantime.
                </p>
              </div>
            ) : (
              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Other categories rail */}
      <section className="border-t border-ink/10 bg-bone-2/30">
        <div className="container-x py-20">
          <p className="eyebrow">Keep browsing</p>
          <h2 className="mt-4 font-serif text-3xl text-ink md:text-4xl">
            Other aisles you might like.
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {otherCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="group relative overflow-hidden rounded-2xl ring-1 ring-ink/10 transition-all hover:ring-moss/40 hover:-translate-y-0.5"
              >
                <div className="relative aspect-[5/4] w-full">
                  <Image
                    src={c.imageUrl}
                    alt={c.name}
                    fill
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <p className="label-mono text-bone/65 text-[10px]">
                    {c.emoji} · {counts.get(c.slug) || 0} products
                  </p>
                  <h3 className="mt-1 font-serif text-lg text-bone">
                    {c.name}
                  </h3>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs text-bone/80 opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}