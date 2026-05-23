import { notFound } from "next/navigation";
import { getArticleById } from "@/lib/repos";
import { ArticleForm } from "../../../_components/article-form";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = getArticleById(id) as any;
  if (!article) notFound();

  return (
    <ArticleForm
      initial={{
        id: article.id,
        slug: article.slug,
        title: article.title,
        dek: article.dek,
        body: article.body,
        coverImage: article.coverImage,
        author: article.author,
        authorRole: article.authorRole,
        readTime: article.readTime,
        tags: article.tags || [],
        publishedAt: article.publishedAt,
        isFeatured: article.isFeatured,
        isHidden: article.isHidden,
        relatedProductSlugs: article.relatedProductSlugs || [],
      }}
    />
  );
}