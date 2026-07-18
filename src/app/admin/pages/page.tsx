import Link from "next/link";
import { listMarkdownPages } from "@/lib/repos";

export const dynamic = "force-dynamic";

export default async function AdminPagesIndex() {
  const pages = listMarkdownPages();
  return (
    <div className="space-y-8">
      <div>
        <p className="label-mono text-ink/60">Pages</p>
        <h1 className="mt-2 font-serif text-4xl text-ink leading-none">
          Long-form pages <span className="text-ink/40">({pages.length})</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-ink/70 leading-relaxed">
          Full markdown pages — About, Methodology, Our Standards, Disclosure,
          etc. Short text snippets (headlines, taglines) live in{" "}
          <a href="/admin/content" className="text-moss-deep underline">
            Text snippets
          </a>
          .
        </p>
      </div>

      {pages.length === 0 && (
        <div className="rounded-2xl border border-ink/10 bg-white p-12 text-center">
          <p className="text-ink/70">No long-form pages yet.</p>
          <p className="mt-2 text-sm text-ink/50">
            Pages register themselves on first public render.
          </p>
        </div>
      )}

      <div className="grid gap-3">
        {pages.map((p) => (
          <Link
            key={p.slug}
            href={`/admin/pages/${encodeURIComponent(p.slug)}/edit`}
            className="rounded-xl border border-ink/10 bg-white p-4 hover:border-moss hover:bg-moss/5 transition"
          >
            <div className="flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <p className="font-serif text-xl text-ink">{p.title}</p>
                <p className="text-xs text-ink/40 font-mono truncate">
                  /{p.slug}
                </p>
              </div>
              <p className="text-xs text-ink/50 whitespace-nowrap">
                {p.body.length.toLocaleString()} chars
              </p>
            </div>
            {p.metaDescription && (
              <p className="mt-2 text-sm text-ink/60 line-clamp-2">
                {p.metaDescription}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}