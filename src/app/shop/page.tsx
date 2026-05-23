import { getAllProducts } from "@/data/products";
import { getAllCategories } from "@/data/categories";
import { ProductCard } from "@/components/product/product-card";
import { ShopFilters } from "@/components/product/shop-filters";

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
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const products = getAllProducts();
  const categories = getAllCategories();

  let filtered = [...products];
  if (sp.category)
    filtered = filtered.filter((p) => p.categorySlug === sp.category);
  if (sp.cert)
    filtered = filtered.filter((p) =>
      p.certifications.includes(sp.cert as never)
    );
  if (sp.goal) filtered = filtered.filter((p) => p.goals.includes(sp.goal as never));
  if (sp.q) {
    const q = sp.q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q)
    );
  }

  if (sp.sort === "price-asc")
    filtered.sort((a, b) => a.price - b.price);
  else if (sp.sort === "price-desc")
    filtered.sort((a, b) => b.price - a.price);
  else if (sp.sort === "rating")
    filtered.sort((a, b) => b.rating - a.rating);
  else
    // default: editor picks first
    filtered.sort((a, b) => Number(b.isEditorPick) - Number(a.isEditorPick));

  return (
    <>
      {/* Header */}
      <section className="container-x pt-16 pb-12 md:pt-24">
        <p className="eyebrow">The shop</p>
        <h1 className="mt-4 font-serif display-2 text-ink">
          Every product, <span className="italic text-moss">independently chosen.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink/65">
          24 curated products across 8 categories. Filter by certification,
          goal, or category. Every product passes the same four-question test
          before it lands here.
        </p>
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
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-ink/15 px-6 py-20 text-center">
                <p className="font-serif text-2xl text-ink">
                  No products match those filters.
                </p>
                <p className="mt-2 text-ink/60">
                  Try clearing one or two filters to see more.
                </p>
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