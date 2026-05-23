"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  emoji?: string;
  order: number;
};

export function CategoryEditor({
  categories,
  productCounts,
}: {
  categories: Category[];
  productCounts: Record<string, number>;
}) {
  return (
    <div className="space-y-4">
      {categories.map((c) => (
        <CategoryRow
          key={c.id}
          initial={c}
          productCount={productCounts[c.slug] || 0}
        />
      ))}
    </div>
  );
}

function CategoryRow({
  initial,
  productCount,
}: {
  initial: Category;
  productCount: number;
}) {
  const router = useRouter();
  const [v, setV] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const isDirty =
    v.name !== initial.name ||
    v.tagline !== initial.tagline ||
    v.description !== initial.description ||
    v.imageUrl !== initial.imageUrl ||
    (v.emoji || "") !== (initial.emoji || "");

  async function save() {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`/api/admin/categories/${v.id}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: v.name,
          tagline: v.tagline,
          description: v.description,
          imageUrl: v.imageUrl,
          emoji: v.emoji,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || "Save failed");
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        router.refresh();
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{v.emoji || "📦"}</span>
          <div>
            <p className="font-serif text-xl text-ink">{v.name}</p>
            <p className="text-xs text-ink/50 font-mono">/category/{v.slug} · {productCount} products</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="text-sm text-moss-deep">✓ Saved</span>}
          {err && <span className="text-sm text-red-700">{err}</span>}
          <button
            onClick={save}
            disabled={busy || !isDirty}
            className="rounded-full bg-ink text-bone px-4 py-1.5 text-xs hover:bg-moss-deep disabled:opacity-40"
          >
            {busy ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Name">
          <input value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} className="input" />
        </Field>
        <Field label="Emoji">
          <input value={v.emoji || ""} onChange={(e) => setV({ ...v, emoji: e.target.value })} className="input" placeholder="🌱" />
        </Field>
        <Field label="Tagline" full>
          <input value={v.tagline} onChange={(e) => setV({ ...v, tagline: e.target.value })} className="input" />
        </Field>
        <Field label="Description" full>
          <textarea value={v.description} onChange={(e) => setV({ ...v, description: e.target.value })} rows={2} className="input" />
        </Field>
        <Field label="Hero image URL" full>
          <input value={v.imageUrl} onChange={(e) => setV({ ...v, imageUrl: e.target.value })} className="input font-mono text-xs" />
        </Field>
      </div>
      <style jsx global>{`
        .input { width: 100%; background: white; border: 1px solid rgba(0,0,0,0.15); border-radius: 0.5rem; padding: 0.5rem 0.75rem; font-size: 0.85rem; outline: none; }
        .input:focus { border-color: rgb(82 109 80); }
      `}</style>
    </div>
  );
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="label-mono text-ink/70 text-[10px] block mb-1">{label}</label>
      {children}
    </div>
  );
}