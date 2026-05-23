import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllCategories, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
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
                Category {String(cat.order).padStart(2, "0")} · {cat.emoji}
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
          <div className="lg:col-span-4">
            <p className="eyebrow">About this category</p>
            <h2 className="mt-3 font-serif text-3xl text-ink">
              How we curate {cat.name.toLowerCase()}.
            </h2>
            <p className="mt-5 text-ink/70 leading-relaxed">
              {cat.description}
            </p>
          </div>
          <div className="lg:col-span-8">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-ink/15 px-6 py-20 text-center">
                <p className="font-serif text-2xl text-ink">
                  Stay tuned — picks coming soon.
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
    </>
  );
}