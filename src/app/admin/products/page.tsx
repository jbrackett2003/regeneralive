import Link from "next/link";
import { listProducts, listCategories, clicksLastNDays } from "@/lib/repos";
import { ProductRowActions } from "../_components/product-row-actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string; brand?: string }>;
}) {
  const sp = await searchParams;
  const allProducts = listProducts({ includeHidden: true });
  const categories = listCategories();
  const clicks30 = clicksLastNDays(30);
  const clickMap = new Map(clicks30.map((c) => [c.product_slug, c.clicks]));

  let products = allProducts;
  if (sp.q) {
    const q = sp.q.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
    );
  }
  if (sp.cat) products = products.filter((p) => p.categorySlug === sp.cat);
  if (sp.brand) products = products.filter((p) => p.brand === sp.brand);

  const brands = Array.from(new Set(allProducts.map((p) => p.brand))).sort();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-mono text-ink/60">Products</p>
          <h1 className="mt-2 font-serif text-4xl text-ink leading-none">
            All products <span className="text-ink/40">({allProducts.length})</span>
          </h1>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-ink px-5 py-2.5 text-sm text-bone hover:bg-moss-deep transition"
        >
          + Add product
        </Link>
      </div>

      {/* Filters */}
      <form className="flex flex-wrap gap-2 items-center bg-white border border-ink/10 rounded-xl p-4">
        <input
          name="q"
          defaultValue={sp.q || ""}
          placeholder="Search name, brand, slug..."
          className="flex-1 min-w-[200px] rounded-md border border-ink/15 px-3 py-2 text-sm outline-none focus:border-moss"
        />
        <select
          name="cat"
          defaultValue={sp.cat || ""}
          className="rounded-md border border-ink/15 px-3 py-2 text-sm bg-white"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          name="brand"
          defaultValue={sp.brand || ""}
          className="rounded-md border border-ink/15 px-3 py-2 text-sm bg-white"
        >
          <option value="">All brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-ink text-bone px-4 py-2 text-sm hover:bg-moss-deep"
        >
          Filter
        </button>
        {(sp.q || sp.cat || sp.brand) && (
          <Link
            href="/admin/products"
            className="text-xs text-ink/60 hover:text-ink"
          >
            Clear
          </Link>
        )}
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-ink/[0.03] text-ink/70">
            <tr>
              <th className="text-left font-medium px-4 py-3 w-16"></th>
              <th className="text-left font-medium px-4 py-3">Product</th>
              <th className="text-left font-medium px-4 py-3 hidden md:table-cell">Brand</th>
              <th className="text-left font-medium px-4 py-3 hidden lg:table-cell">Category</th>
              <th className="text-right font-medium px-4 py-3">Price</th>
              <th className="text-right font-medium px-4 py-3 hidden md:table-cell">Clicks 30d</th>
              <th className="text-center font-medium px-4 py-3 hidden lg:table-cell">Status</th>
              <th className="text-right font-medium px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {products.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-ink/50">
                  No products match those filters.
                </td>
              </tr>
            )}
            {products.map((p) => {
              const clicks = clickMap.get(p.slug) || 0;
              const isHidden = (p as any).isHidden;
              return (
                <tr key={p.id} className="hover:bg-ink/[0.02]">
                  <td className="px-4 py-3">
                    <img
                      src={p.imageUrl}
                      alt=""
                      className="h-12 w-12 rounded-md object-cover bg-ink/5"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="font-medium text-ink hover:underline"
                    >
                      {p.name}
                    </Link>
                    <div className="text-xs text-ink/50 font-mono">{p.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-ink/80 hidden md:table-cell">{p.brand}</td>
                  <td className="px-4 py-3 text-ink/80 hidden lg:table-cell">
                    {p.categorySlug}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">${p.price}</td>
                  <td className="px-4 py-3 text-right tabular-nums hidden md:table-cell">
                    {clicks > 0 ? <span className="text-moss-deep font-medium">{clicks}</span> : <span className="text-ink/30">—</span>}
                  </td>
                  <td className="px-4 py-3 text-center hidden lg:table-cell">
                    {isHidden ? (
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-ink/10 text-ink/60">
                        Hidden
                      </span>
                    ) : p.isEditorPick ? (
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-moss/15 text-moss-deep">
                        Editor Pick
                      </span>
                    ) : p.isFeatured ? (
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-sun/30 text-soil">
                        Featured
                      </span>
                    ) : (
                      <span className="text-ink/40 text-xs">Live</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ProductRowActions
                      id={p.id}
                      slug={p.slug}
                      isHidden={!!isHidden}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}