import { listCategories, listProducts } from "@/lib/repos";
import { CategoryEditor } from "../_components/category-editor";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = listCategories();
  const products = listProducts({ includeHidden: true });
  const counts: Record<string, number> = {};
  for (const p of products) {
    counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
  }
  return (
    <div className="space-y-8">
      <div>
        <p className="label-mono text-ink/60">Categories</p>
        <h1 className="mt-2 font-serif text-4xl text-ink leading-none">
          Categories
        </h1>
        <p className="mt-3 text-sm text-ink/60 max-w-xl">
          Categories organize your products. Click any field to edit it. Reordering and adding new categories will come in a future update — for now, contact your developer for those changes.
        </p>
      </div>
      <CategoryEditor categories={categories} productCounts={counts} />
    </div>
  );
}