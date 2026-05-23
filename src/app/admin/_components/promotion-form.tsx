"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export type PromoFormValues = {
  id?: string;
  label: string;
  message: string;
  ctaText: string;
  ctaUrl: string;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
};

export function PromotionForm({
  initial,
  isNew,
}: {
  initial: PromoFormValues;
  isNew?: boolean;
}) {
  const router = useRouter();
  const [v, setV] = useState<PromoFormValues>(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  function update<K extends keyof PromoFormValues>(k: K, val: PromoFormValues[K]) {
    setV((prev) => ({ ...prev, [k]: val }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setSavedMsg(null);
    const payload = {
      label: v.label,
      message: v.message,
      ctaText: v.ctaText || null,
      ctaUrl: v.ctaUrl || null,
      startsAt: v.startsAt ? new Date(v.startsAt).toISOString() : null,
      endsAt: v.endsAt ? new Date(v.endsAt).toISOString() : null,
      isActive: v.isActive,
    };
    try {
      const res = isNew
        ? await fetch("/api/admin/promotions", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch(`/api/admin/promotions/${v.id}`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ action: "update", input: payload }),
          });
      const data = await res.json();
      if (!res.ok) setErr(data.error || "Save failed");
      else {
        setSavedMsg(isNew ? "Promotion created!" : "Saved");
        if (isNew && data.id) router.push(`/admin/promotions/${data.id}/edit`);
        else router.refresh();
      }
    } finally {
      setBusy(false);
      setTimeout(() => setSavedMsg(null), 3000);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between gap-3">
        <Link href="/admin/promotions" className="text-sm text-ink/60 hover:text-ink">
          ← All promotions
        </Link>
        <div className="flex items-center gap-3">
          {savedMsg && <span className="text-sm text-moss-deep">✓ {savedMsg}</span>}
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-ink px-5 py-2 text-sm text-bone hover:bg-moss-deep disabled:opacity-50"
          >
            {busy ? "Saving..." : isNew ? "Create promotion" : "Save changes"}
          </button>
        </div>
      </div>

      <div>
        <p className="label-mono text-ink/60">Promotion</p>
        <h1 className="mt-2 font-serif text-4xl text-ink leading-none">
          {isNew ? "New promotion" : v.label || "Edit promotion"}
        </h1>
      </div>

      {err && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
          {err}
        </div>
      )}

      <div className="rounded-2xl border border-ink/10 bg-white p-6 space-y-4">
        <Field label="Internal label" required hint="For your reference only — not shown to visitors.">
          <input value={v.label} onChange={(e) => update("label", e.target.value)} required className="input" placeholder="e.g. Black Friday 2026" />
        </Field>
        <Field label="Banner message" required hint="The text shown on the banner across the site.">
          <input
            value={v.message}
            onChange={(e) => update("message", e.target.value)}
            required
            className="input"
            placeholder="20% off Thorne supplements with code REGEN20"
          />
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="CTA button text">
            <input value={v.ctaText} onChange={(e) => update("ctaText", e.target.value)} className="input" placeholder="Shop now" />
          </Field>
          <Field label="CTA button URL">
            <input
              type="url"
              value={v.ctaUrl}
              onChange={(e) => update("ctaUrl", e.target.value)}
              className="input font-mono text-xs"
              placeholder="https://..."
            />
          </Field>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Starts at" hint="Leave blank to start immediately.">
            <input
              type="datetime-local"
              value={v.startsAt}
              onChange={(e) => update("startsAt", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Ends at" hint="Leave blank for no expiration.">
            <input
              type="datetime-local"
              value={v.endsAt}
              onChange={(e) => update("endsAt", e.target.value)}
              className="input"
            />
          </Field>
        </div>
        <label className="flex items-center justify-between gap-3 pt-2 border-t border-ink/10">
          <span className="text-sm">Active</span>
          <input
            type="checkbox"
            checked={v.isActive}
            onChange={(e) => update("isActive", e.target.checked)}
            className="h-5 w-5"
          />
        </label>
      </div>

      {/* Live preview */}
      <div>
        <p className="label-mono text-ink/60 text-xs mb-2">Preview</p>
        <div className="rounded-lg bg-ink text-bone p-3 flex items-center justify-center gap-3 text-sm">
          <span>{v.message || "Your banner message"}</span>
          {v.ctaText && (
            <span className="px-3 py-1 rounded-full bg-bone text-ink text-xs font-medium">
              {v.ctaText}
            </span>
          )}
        </div>
      </div>

      <style jsx global>{`
        .input { width: 100%; background: white; border: 1px solid rgba(0,0,0,0.15); border-radius: 0.5rem; padding: 0.6rem 0.85rem; font-size: 0.875rem; outline: none; }
        .input:focus { border-color: rgb(82 109 80); }
      `}</style>
    </form>
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