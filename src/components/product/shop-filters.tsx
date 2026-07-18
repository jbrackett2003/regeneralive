"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const goals = [
  { value: "sleep", label: "Sleep" },
  { value: "gut", label: "Gut" },
  { value: "longevity", label: "Longevity" },
  { value: "performance", label: "Performance" },
  { value: "skin", label: "Skin" },
  { value: "immunity", label: "Immunity" },
  { value: "energy", label: "Energy" },
  { value: "focus", label: "Focus" },
];

const certs = [
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
];

const sorts = [
  { value: "", label: "Editor's picks" },
  { value: "rating", label: "Highest rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

interface Props {
  categories: { slug: string; name: string }[];
}

export function ShopFilters({ categories }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(sp.toString());
      if (!value) next.delete(key);
      else next.set(key, value);
      router.push(`/shop?${next.toString()}`);
    },
    [router, sp],
  );

  const activeCategory = sp.get("category") || "";
  const activeCert = sp.get("cert") || "";
  const activeGoal = sp.get("goal") || "";
  const activeSort = sp.get("sort") || "";
  const activeQ = sp.get("q") || "";

  const hasFilters =
    activeCategory || activeCert || activeGoal || activeSort || activeQ;

  return (
    <div className="lg:sticky lg:top-28 space-y-8">
      {/* Sort */}
      <div>
        <label className="label-mono mb-3 block text-ink/55">Sort</label>
        <div className="space-y-1.5">
          {sorts.map((s) => (
            <button
              type="button"
              key={s.value}
              onClick={() => setParam("sort", s.value || null)}
              className={`block w-full text-left text-sm ${
                activeSort === s.value
                  ? "text-moss font-medium"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <p className="label-mono mb-3 text-ink/55">Category</p>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => setParam("category", null)}
            className={`block w-full text-left text-sm ${
              !activeCategory
                ? "text-moss font-medium"
                : "text-ink/70 hover:text-ink"
            }`}
          >
            All categories
          </button>
          {categories.map((c) => (
            <button
              type="button"
              key={c.slug}
              onClick={() =>
                setParam("category", activeCategory === c.slug ? null : c.slug)
              }
              className={`block w-full text-left text-sm ${
                activeCategory === c.slug
                  ? "text-moss font-medium"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Goal */}
      <div>
        <p className="label-mono mb-3 text-ink/55">Goal</p>
        <div className="flex flex-wrap gap-1.5">
          {goals.map((g) => (
            <button
              type="button"
              key={g.value}
              onClick={() =>
                setParam("goal", activeGoal === g.value ? null : g.value)
              }
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                activeGoal === g.value
                  ? "border-moss bg-moss text-bone"
                  : "border-ink/15 text-ink/70 hover:border-ink"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Certification */}
      <div>
        <p className="label-mono mb-3 text-ink/55">Certification</p>
        <div className="flex flex-wrap gap-1.5">
          {certs.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setParam("cert", activeCert === c ? null : c)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                activeCert === c
                  ? "border-clay bg-clay text-bone"
                  : "border-ink/15 text-ink/70 hover:border-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={() => router.push("/shop")}
          className="inline-flex items-center gap-1.5 text-xs text-clay hover:underline"
        >
          <X className="h-3 w-3" /> Clear all filters
        </button>
      )}
    </div>
  );
}
