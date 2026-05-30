"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame } from "lucide-react";
import type { Product } from "@/data/types";
import { useEffect, useState } from "react";

interface Props {
  deals: Product[];
}

/**
 * "Live Deals" homepage section. Auto-shows products with active deals.
 * Pure presentation — data comes from getActiveDeals() on the server.
 *
 * Includes a live countdown to the soonest-expiring deal (visual cue that
 * "live" is real). If no deal has an end date, the countdown is hidden.
 */
export function LiveDeals({ deals }: Props) {
  if (!deals.length) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-clay/[0.06] via-bone to-bone py-24 md:py-28">
      {/* Decorative background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, hsl(var(--clay)) 0 1px, transparent 1px 26px)",
        }}
      />

      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow inline-flex items-center gap-2 text-clay">
              <span className="relative grid h-5 w-5 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-clay/30" />
                <span className="relative h-2 w-2 rounded-full bg-clay" />
              </span>
              Live deals · updated nightly
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
              Active discounts
              <br />
              <span className="italic text-clay">on the shelf right now.</span>
            </h2>
            <p className="mt-5 max-w-xl text-ink/65">
              Reader-only deals from brands we already trust. Some are evergreen
              affiliate codes, others are seasonal — when a deal ends, this
              section quietly removes it.
            </p>
          </div>
          <NextExpiryCountdown deals={deals} />
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {deals.slice(0, 8).map((p) => (
            <DealCard key={p.id} product={p} />
          ))}
        </div>

        {deals.length > 8 && (
          <div className="mt-12 text-center">
            <Link
              href="/shop?deals=1"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-clay link-underline"
            >
              See all {deals.length} active deals
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function DealCard({ product: p }: { product: Product }) {
  const hasOriginal =
    typeof p.originalPrice === "number" && p.originalPrice > p.price;
  const savings = hasOriginal
    ? Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100)
    : null;

  return (
    <Link
      href={`/product/${p.slug}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-bone-2 ring-1 ring-ink/[0.04] transition-all duration-500 group-hover:ring-clay/30 group-hover:shadow-xl group-hover:shadow-clay/10">
        <Image
          src={p.imageUrl}
          alt={p.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {/* Deal label ribbon */}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-clay px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-bone shadow-md shadow-clay/30">
            <Flame className="h-3 w-3" />
            {p.dealLabel}
          </span>
        </div>
        {savings && savings > 0 && (
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-bone/95 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-clay shadow-sm backdrop-blur-sm">
              −{savings}%
            </span>
          </div>
        )}
        {/* Subtle bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="mt-4">
        <p className="label-mono text-ink/50">{p.brand}</p>
        <h3 className="mt-1 font-serif text-lg leading-tight text-ink transition-colors group-hover:text-clay">
          {p.name}
        </h3>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-base font-semibold text-clay">
            ${p.price.toFixed(2)}
          </span>
          {hasOriginal && (
            <span className="text-sm text-ink/40 line-through">
              ${p.originalPrice!.toFixed(2)}
            </span>
          )}
        </div>
        {p.dealEndsAt && <DealCountdown endsAt={p.dealEndsAt} compact />}
      </div>
    </Link>
  );
}

/**
 * Big top-right countdown to the soonest-expiring deal — adds urgency
 * without being pushy.
 */
function NextExpiryCountdown({ deals }: { deals: Product[] }) {
  // Pick the soonest dealEndsAt
  const upcomingEnd = deals
    .filter((d) => d.dealEndsAt)
    .map((d) => new Date(d.dealEndsAt!).getTime())
    .filter((t) => Number.isFinite(t) && t > Date.now())
    .sort((a, b) => a - b)[0];

  if (!upcomingEnd) return null;

  return (
    <div className="hidden rounded-2xl border border-ink/10 bg-bone px-5 py-4 shadow-sm md:block">
      <p className="label-mono text-ink/50">Next deal expires in</p>
      <DealCountdown endsAt={new Date(upcomingEnd).toISOString()} large />
    </div>
  );
}

function DealCountdown({
  endsAt,
  compact,
  large,
}: {
  endsAt: string;
  compact?: boolean;
  large?: boolean;
}) {
  const [remaining, setRemaining] = useState<number>(
    Math.max(0, new Date(endsAt).getTime() - Date.now())
  );

  useEffect(() => {
    const i = setInterval(
      () => setRemaining(Math.max(0, new Date(endsAt).getTime() - Date.now())),
      1000
    );
    return () => clearInterval(i);
  }, [endsAt]);

  const days = Math.floor(remaining / (24 * 3600 * 1000));
  const hours = Math.floor((remaining % (24 * 3600 * 1000)) / (3600 * 1000));
  const minutes = Math.floor((remaining % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000);

  if (compact) {
    if (days > 1) {
      return (
        <p className="mt-2 text-[11px] uppercase tracking-wider text-ink/45">
          ends in {days} days
        </p>
      );
    }
    return (
      <p className="mt-2 text-[11px] uppercase tracking-wider text-clay">
        ends in {String(hours).padStart(2, "0")}:
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </p>
    );
  }

  if (large) {
    return (
      <div className="mt-1 flex items-baseline gap-2 font-serif text-2xl text-ink">
        <span>
          {days}
          <span className="ml-0.5 text-xs text-ink/50">d</span>
        </span>
        <span className="text-ink/30">·</span>
        <span>
          {String(hours).padStart(2, "0")}
          <span className="ml-0.5 text-xs text-ink/50">h</span>
        </span>
        <span className="text-ink/30">·</span>
        <span>
          {String(minutes).padStart(2, "0")}
          <span className="ml-0.5 text-xs text-ink/50">m</span>
        </span>
        <span className="text-ink/30">·</span>
        <span>
          {String(seconds).padStart(2, "0")}
          <span className="ml-0.5 text-xs text-ink/50">s</span>
        </span>
      </div>
    );
  }

  return null;
}