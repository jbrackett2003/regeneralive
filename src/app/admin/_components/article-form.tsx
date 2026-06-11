"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export type ArticleFormValues = {
  id?: string;
  slug: string;
  title: string;
  dek: string;
  body: string;
  coverImage: string;
  author: string;
  authorRole: string;
  readTime: number;
  tags: string[];
  publishedAt: string;
  isFeatured: boolean;
  isHidden?: boolean;
  relatedProductSlugs?: string[];
};

export function ArticleForm({
  initial,
  isNew,
}: {
  initial: ArticleFormValues;
  isNew?: boolean;
}) {
  const router = useRouter();
  const [v, setV] = useState<ArticleFormValues>(initial);
  const [tagsText, setTagsText] = useState((initial.tags || []).join(", "));
  const [relatedText, setRelatedText] = useState((initial.relatedProductSlugs || []).join("\n"));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  function update<K extends keyof ArticleFormValues>(k: K, val: ArticleFormValues[K]) {
    setV((prev) => ({ ...prev, [k]: val }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setSavedMsg(null);

    const payload: ArticleFormValues = {
      ...v,
      tags: tagsText.split(",").map((s) => s.trim()).filter(Boolean),
      relatedProductSlugs: relatedText.split("\n").map((s) => s.trim()).filter(Boolean),
      // datetime-local sends "YYYY-MM-DDTHH:MM" — repos store as ISO
      publishedAt: v.publishedAt
        ? new Date(v.publishedAt).toISOString()
        : new Date().toISOString(),
    };

    try {
      const res = isNew
        ? await fetch("/api/admin/articles", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch(`/api/admin/articles/${v.id}`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ action: "update", input: payload }),
          });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || "Save failed");
      } else {
        setSavedMsg(isNew ? "Article created!" : "Saved");
        if (isNew && data.id) {
          router.push(`/admin/articles/${data.id}/edit`);
        } else {
          router.refresh();
        }
      }
    } catch (e: any) {
      setErr(e?.message || "Network error");
    } finally {
      setBusy(false);
      setTimeout(() => setSavedMsg(null), 3000);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="sticky top-[73px] z-20 -mx-6 px-6 py-3 bg-bone/95 backdrop-blur border-b border-ink/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/admin/articles" className="text-sm text-ink/60 hover:text-ink">
            ← All articles
          </Link>
          <h1 className="font-serif text-2xl">
            {isNew ? "New article" : v.title || "Edit article"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && <span className="text-sm text-moss-deep">✓ {savedMsg}</span>}
          {!isNew && v.slug && (
            <Link href={`/journal/${v.slug}`} target="_blank" className="text-sm text-ink/60 hover:text-ink">
              Preview ↗
            </Link>
          )}
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-ink px-5 py-2 text-sm text-bone hover:bg-moss-deep disabled:opacity-50"
          >
            {busy ? "Saving..." : isNew ? "Create article" : "Save changes"}
          </button>
        </div>
      </div>

      {err && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
          {err}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Headline">
            <Field label="Title" required>
              <input
                value={v.title}
                onChange={(e) => update("title", e.target.value)}
                required
                className="input text-lg"
              />
            </Field>
            <Field label="Slug (URL)" required hint="Lowercase, hyphens only.">
              <input
                value={v.slug}
                onChange={(e) => update("slug", slugify(e.target.value))}
                onBlur={(e) => { if (!e.target.value && v.title) update("slug", slugify(v.title)); }}
                required
                pattern="[a-z0-9\-]+"
                className="input font-mono text-sm"
              />
            </Field>
            <Field label="Deck (subtitle)" hint="One or two sentences shown under the title.">
              <textarea
                value={v.dek}
                onChange={(e) => update("dek", e.target.value)}
                rows={2}
                className="input"
              />
            </Field>
          </Card>

          <Card title="Body" hint="Markdown supported (## headings, **bold**, lists, etc.)">
            <textarea
              value={v.body}
              onChange={(e) => update("body", e.target.value)}
              rows={20}
              className="input font-mono text-sm leading-relaxed"
              placeholder="## Start writing your article..."
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Cover image">
            <input
              type="url"
              value={v.coverImage}
              onChange={(e) => update("coverImage", e.target.value)}
              className="input font-mono text-xs"
              placeholder="https://..."
            />
            {v.coverImage && (
              <img src={v.coverImage} alt="" className="rounded-lg w-full h-32 object-cover bg-ink/5" />
            )}
          </Card>

          <Card title="Visibility">
            <label className="flex items-center justify-between gap-3 py-1">
              <span className="text-sm">Hidden from site</span>
              <input type="checkbox" checked={!!v.isHidden} onChange={(e) => update("isHidden", e.target.checked)} className="h-5 w-5" />
            </label>
            <label className="flex items-center justify-between gap-3 py-1">
              <span className="text-sm">Featured</span>
              <input type="checkbox" checked={v.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} className="h-5 w-5" />
            </label>
            <Field label="Publish date">
              <input
                type="datetime-local"
                value={v.publishedAt ? v.publishedAt.slice(0, 16) : ""}
                onChange={(e) => update("publishedAt", e.target.value)}
                className="input"
              />
            </Field>
          </Card>

          <Card title="Author">
            <Field label="Name" required>
              <input value={v.author} onChange={(e) => update("author", e.target.value)} required className="input" />
            </Field>
            <Field label="Role">
              <input value={v.authorRole} onChange={(e) => update("authorRole", e.target.value)} className="input" placeholder="e.g. Editor" />
            </Field>
            <Field label="Read time (minutes)">
              <input type="number" min="1" value={v.readTime} onChange={(e) => update("readTime", Number.parseInt(e.target.value) || 5)} className="input" />
            </Field>
          </Card>

          <Card title="Tags & related" hint="Comma-separated tags. Related product slugs, one per line.">
            <Field label="Tags">
              <input
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                className="input"
                placeholder="guide, supplements, longevity"
              />
            </Field>
            <Field label="Related products (slugs)">
              <textarea
                value={relatedText}
                onChange={(e) => setRelatedText(e.target.value)}
                rows={3}
                className="input font-mono text-xs"
                placeholder="thorne-creatine&#10;seed-ds-01-daily-synbiotic"
              />
            </Field>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 0.5rem;
          padding: 0.6rem 0.85rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s;
        }
        .input:focus { border-color: rgb(82 109 80); }
        textarea.input { font-family: var(--font-inter-tight), sans-serif; line-height: 1.55; }
      `}</style>
    </form>
  );
}

function Card({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 space-y-4">
      <div>
        <h3 className="font-serif text-lg text-ink">{title}</h3>
        {hint && <p className="text-xs text-ink/50 mt-1">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label-mono text-ink/70 text-xs block mb-1.5">
        {label}
        {required && <span className="text-clay ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-ink/50 mt-1.5">{hint}</p>}
    </div>
  );
}

function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/['"]+/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}