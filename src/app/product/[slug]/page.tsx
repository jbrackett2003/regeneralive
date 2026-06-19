import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getRelatedProducts,
  getAllProducts,
} from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { ProductCard } from "@/components/product/product-card";
import { Markdown } from "@/lib/markdown";
import { ArrowUpRight, Check, Star, Info, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/site/section";
import { DiscountChip } from "@/components/product/discount-chip";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Product not found" };
  return {
    title: `${p.name} by ${p.brand}`,
    description: p.tagline,
    openGraph: {
      images: [{ url: p.imageUrl }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.categorySlug);
  const related = getRelatedProducts(slug, 4);
  const gallery = [product.imageUrl, ...(product.galleryUrls || [])].slice(0, 4);

  // JSON-LD: Product + Review + BreadcrumbList for rich SEO results
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: gallery,
    description: product.tagline,
    brand: { "@type": "Brand", name: product.brand },
    sku: product.slug,
    category: category?.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toFixed(1),
      reviewCount: 1,
      bestRating: 5,
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: product.rating.toFixed(1),
        bestRating: 5,
      },
      author: {
        "@type": "Organization",
        name: "Regeneralive Editors",
      },
      publisher: {
        "@type": "Organization",
        name: "Regeneralive",
      },
      reviewBody: product.tagline,
    },
    offers: {
      "@type": "Offer",
      url: `https://regeneralive.com/product/${product.slug}`,
      priceCurrency: product.currency || "USD",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: product.merchant },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://regeneralive.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: "https://regeneralive.com/shop",
      },
      ...(category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: category.name,
              item: `https://regeneralive.com/category/${category.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: category ? 4 : 3,
        name: product.name,
        item: `https://regeneralive.com/product/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productJsonLd, breadcrumbJsonLd]),
        }}
      />
      {/* Breadcrumbs */}
      <div className="container-x pt-10">
        <nav className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-xs text-ink/50">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-ink">
            Shop
          </Link>
          {category && (
            <>
              <ChevronRight className="h-3 w-3" />
              <Link
                href={`/category/${category.slug}`}
                className="hover:text-ink"
              >
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      {/* Top section: gallery + buy box */}
      <section className="container-x pt-8 pb-20 md:pt-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bone-2">
                <Image
                  src={gallery[0]}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                  {product.isEditorPick && (
                    <span className="label-mono rounded-full bg-clay px-3 py-1.5 text-[11px] text-bone">
                      Editor's Pick
                    </span>
                  )}
                  {product.certifications.includes(
                    "Regenerative Certified"
                  ) && (
                    <span className="label-mono rounded-full bg-moss px-3 py-1.5 text-[11px] text-bone">
                      Regenerative Certified
                    </span>
                  )}
                </div>
              </div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {gallery.slice(1).map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-xl bg-bone-2"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="20vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Buy box */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="label-mono text-ink/50">{product.brand}</p>
              <h1 className="mt-2 font-serif text-4xl leading-tight text-ink md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-lg text-ink/70">{product.tagline}</p>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className={`h-4 w-4 ${
                        n <= Math.round(product.rating)
                          ? "fill-sun text-sun"
                          : "text-ink/20"
                      }`}
                      strokeWidth={1}
                    />
                  ))}
                </div>
                <span className="text-sm text-ink/60">
                  {product.rating.toFixed(1)} · Editorial review
                </span>
              </div>

              {/* certifications */}
              {product.certifications.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.certifications.map((c) => (
                    <span key={c} className="pill">
                      <Check className="h-3 w-3 text-moss" />
                      {c}
                    </span>
                  ))}
                </div>
              )}

              {/* price + CTA */}
              <div className="mt-8 rounded-2xl border border-ink/10 bg-bone-2/50 p-6">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-3xl text-ink">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="label-mono text-ink/50">
                    via {product.merchant}
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink/50">
                  Approximate price. Subject to merchant changes.
                </p>
                <a
                  href={`/go/${product.slug}?src=product-page`}
                  rel="noreferrer sponsored noopener nofollow"
                  target="_blank"
                  className="mt-5 flex items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-medium text-bone transition-all hover:bg-moss hover:shadow-lg hover:shadow-moss/20 active:scale-[0.98]"
                >
                  Get it on {product.merchant}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-snug text-ink/50">
                  <Info className="h-3 w-3 mt-0.5 shrink-0" />
                  <span>
                    Affiliate link — Regeneralive may earn a commission. We
                    only recommend products we'd give to family.
                  </span>
                </p>

                {/* Reader discount code (auto-shown for brands in BRAND_DISCOUNTS) */}
                <DiscountChip brand={product.brand} variant="page" />
              </div>

              {/* details table */}
              <dl className="mt-6 divide-y divide-ink/10 text-sm">
                {product.servingSize && (
                  <div className="flex justify-between py-3">
                    <dt className="text-ink/55">Serving size</dt>
                    <dd className="text-ink">{product.servingSize}</dd>
                  </div>
                )}
                <div className="flex justify-between py-3">
                  <dt className="text-ink/55">Goal</dt>
                  <dd className="text-ink capitalize">
                    {product.goals.length
                      ? product.goals.join(" · ")
                      : "Lifestyle"}
                  </dd>
                </div>
                {category && (
                  <div className="flex justify-between py-3">
                    <dt className="text-ink/55">Category</dt>
                    <dd>
                      <Link
                        href={`/category/${category.slug}`}
                        className="link-underline text-ink"
                      >
                        {category.name}
                      </Link>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Review body + pros/cons */}
      <section className="border-y border-ink/10 bg-bone-2/30 py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">The review</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
              Why we put this on the shelf.
            </h2>
            <div className="mt-8">
              <Markdown source={product.description} />
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-ink/10 bg-bone p-7">
              <p className="label-mono mb-4 text-moss">What we love</p>
              <ul className="space-y-3">
                {product.pros.map((pro, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink/80">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-moss" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
              {product.cons.length > 0 && (
                <>
                  <p className="label-mono mb-4 mt-7 text-clay">What to know</p>
                  <ul className="space-y-3">
                    {product.cons.map((con, i) => (
                      <li key={i} className="flex gap-3 text-sm text-ink/80">
                        <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-clay/40 grid place-items-center text-clay text-[10px]">
                          !
                        </span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            {product.ingredients && (
              <div className="mt-6 rounded-2xl border border-ink/10 bg-bone p-7">
                <p className="label-mono mb-3 text-ink/55">Ingredients</p>
                <p className="text-sm leading-relaxed text-ink/75">
                  {product.ingredients}
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-24">
          <div className="container-x">
            <SectionHeader
              eyebrow="Pair it with"
              title={
                <>
                  Other picks in{" "}
                  <span className="italic text-moss">
                    {category?.name || "this category"}
                  </span>
                </>
              }
              ctaHref={category ? `/category/${category.slug}` : "/shop"}
              ctaLabel="See category"
            />
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}