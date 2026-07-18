import { ProductCard } from "@/components/product/product-card";
import { ShopFilters } from "@/components/product/shop-filters";
import { getAllCategories } from "@/data/categories";
import { getAllProducts } from "@/data/products";
import { Search, X } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "The Shop · Curated regenerative goods",
  description:
    "Every product on Regeneralive — regenerative foods, supplements, wellness goods, all editorially reviewed.",
};

interface SearchParams {
  category?: string;
  cert?: string;
  goal?: string;
  q?: string;
  sort?: string;
  brand?: string;
  deals?: string;
}

function isDealActive(p: {
  dealLabel?: string | null;
  dealStartsAt?: string | null;
  dealEndsAt?: string | null;
}) {
  if (!p.dealLabel) return false;
  const now = Date.now();
  if (p.dealStartsAt && new Date(p.dealStartsAt).getTime() > now) return false;
  if (p.dealEndsAt && new Date(p.dealEndsAt).getTime() < now) return false;
  return true;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const products = getAllProducts();
  const categories = getAllCategories();
  const searchQuery = sp.q?.trim() || "";

  let filtered = [...products];
  if (sp.category)
    filtered = filtered.filter((p) => p.categorySlug === sp.category);
  if (sp.brand) {
    const brand = sp.brand.toLowerCase();
    filtered = filtered.filter((p) => p.brand.toLowerCase() === brand);
  }
  if (sp.deals === "1" || sp.deals === "true") {
    filtered = filtered.filter((p) => isDealActive(p));
  }
  if (sp.cert)
    filtered = filtered.filter((p) =>
      p.certifications.includes(sp.cert as never),
    );
  if (sp.goal)
    filtered = filtered.filter((p) => p.goals.includes(sp.goal as never));
  if (searchQuery) {
    const q = searchQuery.toLocaleLowerCase();
    filtered = filtered.filter((p) => {
      const searchableText = [
        p.name,
        p.brand,
        p.tagline,
        p.description,
        p.ingredients,
        ...p.certifications,
        ...p.goals,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();
      return searchableText.includes(q);
    });
  }

  if (sp.sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sp.sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  else if (sp.sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
  // default: editor picks first
  else filtered.sort((a, b) => Number(b.isEditorPick) - Number(a.isEditorPick));

  return (
    <>
      {/* Header */}
      <section className="container-x pt-16 pb-12 md:pt-24">
        <p className="eyebrow">
          {sp.brand
            ? "The shelf"
            : sp.deals === "1" || sp.deals === "true"
              ? "Live deals"
              : "The shop"}
        </p>
        <h1 className="mt-4 font-serif display-2 text-ink">
          {sp.brand ? (
            <>
              Everything from{" "}
              <span className="italic text-moss">{sp.brand}</span>.
            </>
          ) : sp.deals === "1" || sp.deals === "true" ? (
            <>
              Active discounts{" "}
              <span className="italic text-clay">right now.</span>
            </>
          ) : (
            <>
              Every product,{" "}
              <span className="italic text-moss">independently chosen.</span>
            </>
          )}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink/65">
          {sp.brand
            ? `Every ${sp.brand} product on Regeneralive — each one independently reviewed against the same four-question test.`
            : sp.deals === "1" || sp.deals === "true"
              ? "Reader-only deals across our entire shelf — affiliate codes, seasonal campaigns, and bundle pricing. When a deal ends, it leaves this page automatically."
              : `${products.length} curated products across ${categories.length} categories. Filter by certification, goal, or category. Every product passes the same four-question test before it lands here.`}
        </p>

        <form
          action="/shop"
          method="get"
          className="mt-8 flex max-w-2xl items-center rounded-full border border-ink/15 bg-white/60 p-1.5 shadow-[0_12px_40px_rgba(28,26,20,0.06)] transition focus-within:border-moss focus-within:ring-4 focus-within:ring-moss/10"
        >
          <Search
            className="ml-4 h-5 w-5 shrink-0 text-moss"
            aria-hidden="true"
          />
          <label htmlFor="shop-product-search" className="sr-only">
            Search products
          </label>
          <input
            id="shop-product-search"
            name="q"
            type="search"
            defaultValue={searchQuery}
            placeholder="Search products, brands, or ingredients…"
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-ink outline-none placeholder:text-ink/40"
          />
          <button
            type="submit"
            className="btn-primary shrink-0 !px-5 !py-3 sm:!px-7"
          >
            Search
          </button>
        </form>
      </section>

      <section className="container-x pb-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Filters */}
          <aside className="lg:col-span-3">
            <ShopFilters
              categories={categories.map((c) => ({
                slug: c.slug,
                name: c.name,
              }))}
            />
          </aside>

          {/* Grid */}
          <div className="lg:col-span-9">
            <div className="mb-8 flex items-baseline justify-between border-b border-ink/10 pb-4">
              <p className="text-sm text-ink/60">
                <span className="font-medium text-ink">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "product" : "products"}
                {searchQuery && (
                  <span>
                    {" "}
                    for{" "}
                    <span className="font-medium text-ink">
                      “{searchQuery}”
                    </span>
                  </span>
                )}
              </p>
              {searchQuery && (
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-clay hover:underline"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" /> Clear search
                </Link>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-ink/15 px-6 py-20 text-center">
                <p className="font-serif text-2xl text-ink">
                  {searchQuery
                    ? `No products found for “${searchQuery}.”`
                    : "No products match those filters."}
                </p>
                <p className="mt-2 text-ink/60">
                  Try a different product, brand, or ingredient—or clear your
                  filters.
                </p>
                <Link href="/shop" className="btn-secondary mt-6 inline-flex">
                  View all products
                </Link>
              </div>
            ) : (
              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
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
