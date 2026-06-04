"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface CategoryItem {
  slug: string;
  name: string;
  emoji?: string;
  tagline?: string;
}

const goals = [
  { slug: "sleep", label: "Sleep", emoji: "🌙" },
  { slug: "gut", label: "Gut", emoji: "🌱" },
  { slug: "longevity", label: "Longevity", emoji: "🌳" },
  { slug: "performance", label: "Performance", emoji: "⚡" },
  { slug: "skin", label: "Skin", emoji: "✿" },
  { slug: "focus", label: "Focus", emoji: "✶" },
  { slug: "immunity", label: "Immunity", emoji: "🛡" },
  { slug: "energy", label: "Energy", emoji: "☀" },
];

interface Props {
  categories: CategoryItem[];
  active: boolean;
}

export function HeaderShopMenu({ categories, active }: Props) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Link
        href="/shop"
        className={`relative inline-flex items-center gap-1 text-sm font-medium transition-colors ${
          active ? "text-ink" : "text-ink/65 hover:text-ink"
        }`}
        onFocus={onEnter}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Shop
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
        <span
          className={`absolute -bottom-1 left-0 h-px w-[calc(100%-1rem)] origin-left bg-moss transition-transform duration-500 ${
            active ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </Link>

      {/* Mega-menu panel */}
      <div
        className={`absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3 transition-all duration-200 ${
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-1"
        }`}
      >
        <div className="rounded-2xl border border-ink/10 bg-bone shadow-2xl shadow-ink/15 ring-1 ring-ink/5">
          <div className="grid grid-cols-12 gap-6 p-6">
            <div className="col-span-7">
              <p className="label-mono mb-3 text-ink/45">Browse by category</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    className="group flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-ink/80 transition-colors hover:bg-bone-2 hover:text-moss"
                    onClick={() => setOpen(false)}
                  >
                    {c.emoji && (
                      <span className="text-base leading-none">{c.emoji}</span>
                    )}
                    <span className="font-medium">{c.name}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 border-t border-ink/10 pt-4">
                <Link
                  href="/shop"
                  className="text-xs font-medium text-moss link-underline"
                  onClick={() => setOpen(false)}
                >
                  All products →
                </Link>
                <span className="text-ink/20">·</span>
                <Link
                  href="/shop?deals=1"
                  className="text-xs font-medium text-clay link-underline"
                  onClick={() => setOpen(false)}
                >
                  Live deals →
                </Link>
              </div>
            </div>

            <div className="col-span-5 rounded-xl bg-bone-2/60 p-4">
              <p className="label-mono mb-3 text-ink/45">Shop by goal</p>
              <div className="grid grid-cols-2 gap-1">
                {goals.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/shop?goal=${g.slug}`}
                    className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink/75 transition-colors hover:bg-bone hover:text-ink"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-sm leading-none">{g.emoji}</span>
                    <span>{g.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}