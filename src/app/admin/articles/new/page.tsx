import { ArticleForm } from "../../_components/article-form";

export const dynamic = "force-dynamic";

export default function NewArticlePage() {
  const now = new Date();
  // Format as YYYY-MM-DDTHH:MM for datetime-local input
  const localISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  return (
    <ArticleForm
      isNew
      initial={{
        slug: "",
        title: "",
        dek: "",
        body: "",
        coverImage: "",
        author: "Editor",
        authorRole: "Regeneralive",
        readTime: 5,
        tags: [],
        publishedAt: localISO,
        isFeatured: false,
        isHidden: false,
        relatedProductSlugs: [],
      }}
    />
  );
}