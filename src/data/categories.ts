import { listCategories, getCategoryBySlug as repoGet } from "@/lib/repos";

export function getAllCategories() {
  return listCategories();
}

export const categories = listCategories();

export const getCategoryBySlug = repoGet;
