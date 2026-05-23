import Link from "next/link";
import { listArticles } from "@/lib/repos";
import { ArticleRowActions } from "../_components/article-row-actions";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const articles = listArticles({ includeHidden: true });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-mono text-ink/60">Articles</p>
          <h1 className="mt-2 font-serif text-4xl text-ink leading-none">
            Journal <span className="text-ink/40">({articles.length})</span>
          </h1>
        </div>
        <Link
          href="/admin/articles/new"
          className="rounded-full bg-ink px-5 py-2.5 text-sm text-bone hover:bg-moss-deep transition"
        >
          + New article
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-ink/[0.03] text-ink/70">
            <tr>
              <th className="text-left font-medium px-4 py-3">Title</th>
              <th className="text-left font-medium px-4 py-3 hidden md:table-cell">Author</th>
              <th className="text-left font-medium px-4 py-3 hidden lg:table-cell">Published</th>
              <th className="text-center font-medium px-4 py-3">Status</th>
              <th className="text-right font-medium px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-ink/50">
                  No articles yet. <Link href="/admin/articles/new" className="underline">Write the first one</Link>.
                </td>
              </tr>
            )}
            {articles.map((a: any) => (
              <tr key={a.id} className="hover:bg-ink/[0.02]">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/articles/${a.id}/edit`}
                    className="font-medium text-ink hover:underline"
                  >
                    {a.title}
                  </Link>
                  <div className="text-xs text-ink/50 font-mono">{a.slug}</div>
                </td>
                <td className="px-4 py-3 text-ink/80 hidden md:table-cell">{a.author}</td>
                <td className="px-4 py-3 text-ink/60 hidden lg:table-cell text-xs">
                  {new Date(a.publishedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center">
                  {a.isHidden ? (
                    <span className="inline-block px-2 py-0.5 rounded text-xs bg-ink/10 text-ink/60">Hidden</span>
                  ) : a.isFeatured ? (
                    <span className="inline-block px-2 py-0.5 rounded text-xs bg-moss/15 text-moss-deep">Featured</span>
                  ) : (
                    <span className="text-ink/40 text-xs">Live</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <ArticleRowActions id={a.id} slug={a.slug} isHidden={!!a.isHidden} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}