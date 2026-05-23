import { listArticles, getArticleBySlug as repoGet, getFeaturedArticles as repoFeatured } from "@/lib/repos";

export function getAllArticles() {
  return listArticles();
}

export const articles = listArticles();

export const getArticleBySlug = repoGet;
export const getFeaturedArticles = repoFeatured;

export function getLatestArticles(limit = 3) {
  return listArticles().slice(0, limit);
}
