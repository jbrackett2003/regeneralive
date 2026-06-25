"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const GOAL_OPTIONS = ["sleep", "gut", "longevity", "performance", "skin", "immunity", "energy", "focus"];
const CERT_OPTIONS = [
  "USDA Organic",
  "Regenerative Certified",
  "Glyphosate-Free",
  "Third-Party Tested",
  "Grass-Fed",
  "Pasture-Raised",
  "Wild-Caught",
  "Non-GMO",
  "B-Corp",
  "Fair Trade",
  "Biodynamic",
];

type Category = { slug: string; name: string };

export type ProductFormValues = {
  id?: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  price: number;
  imageUrl: string;
  galleryUrls?: string[];
  categorySlug: string;
  affiliateUrl: string;
  merchant: string;
  certifications: string[];
  goals: string[];
  rating: number;
  isEditorPick: boolean;
  isFeatured: boolean;
  isHidden?: boolean;
  pros: string[];
  cons: string[];
  ingredients?: string | null;
  servingSize?: string | null;
  dealLabel?: string | null;
  dealStartsAt?: string | null;
  dealEndsAt?: string | null;
};

export function ProductForm({
  initial,
  categories,
  isNew,
}: {
  initial: ProductFormValues;
  categories: Category[];
  isNew?: boolean;
}) {
  const router = useRouter();
  const [v, setV] = useState<ProductFormValues>(initial);
  const [pros, setPros] = useState((initial.pros || []).join("\n"));
  const [cons, setCons] = useState((initial.cons || []).join("\n"));
  const [gallery, setGallery] = useState((initial.galleryUrls || []).join("\n"));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  function update<K extends keyof ProductFormValues>(k: K, val: ProductFormValues[K]) {
    setV((prev) => ({ ...prev, [k]: val }));
  }

  function toggleArr<T extends string>(key: "goals" | "certifications", val: T) {
    setV((prev) => {
      const arr = (prev[key] || []) as string[];
      return {
        ...prev,
        [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val],
      };
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setSavedMsg(null);

    const payload: ProductFormValues = {
      ...v,
      pros: pros.split("\n").map((s) => s.trim()).filter(Boolean),
      cons: cons.split("\n").map((s) => s.trim()).filter(Boolean),
      galleryUrls: gallery.split("\n").map((s) => s.trim()).filter(Boolean),
      ingredients: v.ingredients?.trim() || null,
      servingSize: v.servingSize?.trim() || null,
      dealLabel: v.dealLabel?.trim() || null,
      dealStartsAt: v.dealStartsAt || null,
      dealEndsAt: v.dealEndsAt || null,
    };

    try {
      let res;
      if (isNew) {
        res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/admin/products/${v.id}`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ action: "update", input: payload }),
        });
      }
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || "Save failed");
      } else {
        setSavedMsg(isNew ? "Product created!" : "Saved");
        if (isNew && data.id) {
          router.push(`/admin/products/${data.id}/edit`);
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
      {/* Top action bar (sticky) */}
      <div className="sticky top-[73px] z-20 -mx-6 px-6 py-3 bg-bone/95 backdrop-blur border-b border-ink/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="text-sm text-ink/60 hover:text-ink"
          >
            ← All products
          </Link>
          <h1 className="font-serif text-2xl">
            {isNew ? "New product" : v.name || "Edit product"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className="text-sm text-moss-deep">✓ {savedMsg}</span>
          )}
          {!isNew && v.slug && (
            <Link
              href={`/product/${v.slug}`}
              target="_blank"
              className="text-sm text-ink/60 hover:text-ink"
            >
              Preview ↗
            </Link>
          )}
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-ink px-5 py-2 text-sm text-bone hover:bg-moss-deep disabled:opacity-50"
          >
            {busy ? "Saving..." : isNew ? "Create product" : "Save changes"}
          </button>
        </div>
      </div>

      {err && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
          {err}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left column — main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Basics">
            <Field label="Product name" required>
              <input
                value={v.name}
                onChange={(e) => update("name", e.target.value)}
                required
                className="input"
                placeholder="e.g. Vitamin D-5,000"
              />
            </Field>
            <Field label="Brand" required>
              <input
                value={v.brand}
                onChange={(e) => update("brand", e.target.value)}
                required
                className="input"
                placeholder="e.g. Thorne"
              />
            </Field>
            <Field label="Tagline" hint="One short sentence — shown under the product name on cards.">
              <input
                value={v.tagline}
                onChange={(e) => update("tagline", e.target.value)}
                className="input"
                placeholder="e.g. The clinician-favorite multivitamin in its cleanest form."
              />
            </Field>
            <Field
              label="Slug (URL)"
              required
              hint="Used in the URL. Auto-generates from name if blank. Lowercase, hyphens only."
            >
              <input
                value={v.slug}
                onChange={(e) => update("slug", slugify(e.target.value))}
                onBlur={(e) => {
                  if (!e.target.value && v.name) update("slug", slugify(v.name));
                }}
                required
                pattern="[a-z0-9\-]+"
                className="input font-mono text-sm"
                placeholder="e.g. thorne-vitamin-d-5000"
              />
            </Field>
          </Card>

          <Card title="Editorial review" hint="The body content shown on the product page. Markdown supported (** for bold, lists with -)">
            <Field label="Full review">
              <textarea
                value={v.description}
                onChange={(e) => update("description", e.target.value)}
                rows={10}
                className="input font-mono text-sm leading-relaxed"
                placeholder="Why we recommend this product..."
              />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Pros (one per line)">
                <textarea
                  value={pros}
                  onChange={(e) => setPros(e.target.value)}
                  rows={5}
                  className="input text-sm"
                  placeholder="NSF Certified for Sport&#10;Fast absorption&#10;Clean ingredients"
                />
              </Field>
              <Field label="Cons (one per line)">
                <textarea
                  value={cons}
                  onChange={(e) => setCons(e.target.value)}
                  rows={5}
                  className="input text-sm"
                  placeholder="Premium price&#10;Larger capsule"
                />
              </Field>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Ingredients (optional)">
                <textarea
                  value={v.ingredients || ""}
                  onChange={(e) => update("ingredients", e.target.value)}
                  rows={3}
                  className="input text-sm"
                />
              </Field>
              <Field label="Serving size (optional)">
                <input
                  value={v.servingSize || ""}
                  onChange={(e) => update("servingSize", e.target.value)}
                  className="input"
                  placeholder="e.g. 2 capsules"
                />
              </Field>
            </div>
          </Card>

          <Card title="Images">
            <Field label="Main image URL" required hint="Paste a URL (Unsplash, brand CDN, etc.) or use the upload button.">
              <ImageInput
                value={v.imageUrl}
                onChange={(url) => update("imageUrl", url)}
              />
            </Field>
            <Field label="Gallery image URLs" hint="One per line. Optional additional photos shown on the product page.">
              <textarea
                value={gallery}
                onChange={(e) => setGallery(e.target.value)}
                rows={3}
                className="input font-mono text-xs"
                placeholder="https://..."
              />
            </Field>
          </Card>

          <Card title="Promotion (deal)" hint="Optional. Show a deal badge on the product card and detail page during the date range.">
            <Field label="Deal label">
              <input
                value={v.dealLabel || ""}
                onChange={(e) => update("dealLabel", e.target.value)}
                className="input"
                placeholder="e.g. 20% off this week — code REGEN20"
              />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Starts at">
                <input
                  type="datetime-local"
                  value={v.dealStartsAt || ""}
                  onChange={(e) => update("dealStartsAt", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Ends at">
                <input
                  type="datetime-local"
                  value={v.dealEndsAt || ""}
                  onChange={(e) => update("dealEndsAt", e.target.value)}
                  className="input"
                />
              </Field>
            </div>
          </Card>
        </div>

        {/* Right column — sidebar */}
        <div className="space-y-6">
          <Card title="Visibility">
            <label className="flex items-center justify-between gap-3 py-1">
              <span className="text-sm">Hidden from site</span>
              <input
                type="checkbox"
                checked={!!v.isHidden}
                onChange={(e) => update("isHidden", e.target.checked)}
                className="h-5 w-5 rounded"
              />
            </label>
            <label className="flex items-center justify-between gap-3 py-1">
              <span className="text-sm">Editor's Pick</span>
              <input
                type="checkbox"
                checked={!!v.isEditorPick}
                onChange={(e) => update("isEditorPick", e.target.checked)}
                className="h-5 w-5 rounded"
              />
            </label>
            <label className="flex items-center justify-between gap-3 py-1">
              <span className="text-sm">Featured</span>
              <input
                type="checkbox"
                checked={!!v.isFeatured}
                onChange={(e) => update("isFeatured", e.target.checked)}
                className="h-5 w-5 rounded"
              />
            </label>
          </Card>

          <Card title="Pricing & link">
            <Field label="Price (USD)" required>
              <input
                type="number"
                step="0.01"
                min="0"
                value={v.price}
                onChange={(e) => update("price", Number.parseFloat(e.target.value) || 0)}
                required
                className="input"
              />
            </Field>
            <Field label="Affiliate URL" required hint="The full URL we redirect customers to (this is your earning link).">
              <input
                type="url"
                value={v.affiliateUrl}
                onChange={(e) => update("affiliateUrl", e.target.value)}
                required
                className="input text-xs font-mono"
                placeholder="https://..."
              />
            </Field>
            <Field label="Merchant name" required hint="Shown as 'Get it on [Merchant]' button text.">
              <input
                value={v.merchant}
                onChange={(e) => update("merchant", e.target.value)}
                required
                className="input"
                placeholder="e.g. Thorne"
              />
            </Field>
            <Field label="Rating (0-5)">
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={v.rating}
                onChange={(e) => update("rating", Number.parseFloat(e.target.value) || 0)}
                className="input"
              />
            </Field>
          </Card>

          <Card title="Category">
            <Field label="Category" required>
              <select
                value={v.categorySlug}
                onChange={(e) => update("categorySlug", e.target.value)}
                required
                className="input"
              >
                <option value="">Select…</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
          </Card>

          <Card title="Goals" hint="Tags used by the goal filter on the shop page.">
            <div className="flex flex-wrap gap-1.5">
              {GOAL_OPTIONS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => toggleArr("goals", g)}
                  className={`px-2.5 py-1 rounded-full text-xs border transition ${
                    v.goals.includes(g)
                      ? "bg-ink text-bone border-ink"
                      : "border-ink/15 hover:border-ink/40"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </Card>

          <Card title="Certifications">
            <div className="flex flex-wrap gap-1.5">
              {CERT_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleArr("certifications", c)}
                  className={`px-2.5 py-1 rounded-full text-xs border transition ${
                    v.certifications.includes(c)
                      ? "bg-moss-deep text-bone border-moss-deep"
                      : "border-ink/15 hover:border-ink/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
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
        .input:focus {
          border-color: rgb(82 109 80);
        }
        textarea.input {
          font-family: var(--font-inter-tight), sans-serif;
          line-height: 1.55;
        }
      `}</style>
    </form>
  );
}

function Card({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
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

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
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

function ImageInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  async function uploadFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setErr("Please drop an image file.");
      return;
    }
    setUploading(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || "Upload failed");
        return;
      }
      onChange(data.url);
    } catch (e: any) {
      setErr(e?.message || "Upload error");
    } finally {
      setUploading(false);
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void uploadFile(file);
  }

  async function onPaste(e: React.ClipboardEvent<HTMLDivElement>) {
    const item = Array.from(e.clipboardData.items).find((i) =>
      i.type.startsWith("image/"),
    );
    if (item) {
      const file = item.getAsFile();
      if (file) {
        e.preventDefault();
        await uploadFile(file);
      }
    }
  }

  return (
    <div className="space-y-3" onPaste={onPaste}>
      {/* Preview + dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`relative flex items-center gap-4 rounded-xl border-2 border-dashed p-4 transition ${
          dragOver
            ? "border-moss bg-moss/5"
            : "border-ink/15 bg-ink/[0.02] hover:border-ink/30"
        }`}
      >
        {value ? (
          <img
            src={value}
            alt=""
            className="h-32 w-32 rounded-lg object-contain bg-white border border-ink/10 flex-shrink-0"
          />
        ) : (
          <div className="h-32 w-32 rounded-lg bg-white border border-ink/10 flex-shrink-0 flex items-center justify-center text-ink/30 text-xs">
            No image
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-ink/80 mb-2">
            {uploading
              ? "Uploading..."
              : "Drag & drop, paste, or "}
            {!uploading && (
              <label className="cursor-pointer text-moss-deep hover:underline font-medium">
                choose file
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFile}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            )}
          </p>
          <p className="text-xs text-ink/50">
            PNG, JPG, WEBP or GIF · up to 8MB
          </p>
        </div>
      </div>

      {/* URL field */}
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input font-mono text-xs"
        placeholder="…or paste an image URL (https://…)"
      />
      {err && <p className="text-xs text-red-700">{err}</p>}
    </div>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/['"]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}