// Public products API — reads from SQLite via repos.
// Raw seed data lives in seed-products.ts (used only on first DB init).
import {
  listProducts,
  getProductBySlug as repoGet,
  getProductsByCategory as repoByCat,
  getEditorPicks as repoEditor,
  getFeatured as repoFeatured,
  getRelatedProducts as repoRelated,
} from "@/lib/repos";

// Backwards-compatible: callers used `products` array directly.
// We expose it as a getter that pulls fresh from SQLite each access.
// Most existing usage is `products.map`, `products.filter`, `products.length`
// in server components — each render gets fresh data.
export function getAllProducts() {
  return listProducts();
}

// Export as a value that auto-refreshes by spreading on import.
// Server components read this once per render — fresh data every time.
export const products = listProducts();

export const getProductBySlug = repoGet;
export const getProductsByCategory = repoByCat;
export const getEditorPicks = repoEditor;
export const getFeatured = repoFeatured;
export const getRelatedProducts = repoRelated;
