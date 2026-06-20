import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Leaf,
  Sparkles,
  ShieldCheck,
  Award,
  TestTube2,
  Sprout,
  Sun as SunIcon,
} from "lucide-react";
import { getAllCategories } from "@/data/categories";
import {
  getEditorPicks,
  getFeatured,
  getAllProducts,
  getActiveDeals,
} from "@/data/products";
import { getLatestArticles } from "@/data/articles";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeader } from "@/components/site/section";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { LiveDeals } from "@/components/home/live-deals";
import { BrandCluster } from "@/components/home/brand-cluster";

const trustMarks = [
  { label: "USDA Organic", Icon: Leaf },
  { label: "Regenerative Certified", Icon: Sprout },
  { label: "Glyphosate-Free", Icon: ShieldCheck },
  { label: "Third-Party Tested", Icon: TestTube2 },
  { label: "Grass-Fed & Pastured", Icon: SunIcon },
  { label: "B-Corp Verified", Icon: Award },
];

const goals = [
  {
    slug: "sleep",
    label: "Sleep deeper",
    emoji: "🌙",
    tint: "from-moss/10 via-bone to-bone",
  },
  {
    slug: "performance",
    label: "Move stronger",
    emoji: "⚡",
    tint: "from-sun/15 via-bone to-bone",
  },
  {
    slug: "gut",
    label: "Heal your gut",
    emoji: "🌱",
    tint: "from-lichen/20 via-bone to-bone",
  },
  {
    slug: "longevity",
    label: "Live longer",
    emoji: "🌳",
    tint: "from-moss/15 via-bone to-bone",
  },
  {
    slug: "focus",
    label: "Focus sharper",
    emoji: "✶",
    tint: "from-clay/10 via-bone to-bone",
  },
  {
    slug: "skin",
    label: "Glow naturally",
    emoji: "✿",
    tint: "from-sun/15 via-bone to-bone",
  },
];

const stats = [
  { value: "150+", label: "Products vetted" },
  { value: "300h", label: "Of independent research" },
  { value: "8,400", label: "Readers in the dispatch" },
  { value: "0", label: "Paid placements" },
];

export default function HomePage() {
  const categories = getAllCategories();
  const products = getAllProducts();
  const editorPicks = getEditorPicks(4);
  const featured = getFeatured(8);
  const latestArticles = getLatestArticles(3);
  const activeDeals = getActiveDeals(8);

  return (
    <>
      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* organic blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-20 h-[480px] w-[480px] rounded-full bg-lichen/40 blur-3xl" />
          <div className="absolute right-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full bg-sun/20 blur-3xl" />
          <div className="absolute bottom-[-20%] left-1/3 h-[420px] w-[420px] rounded-full bg-clay/15 blur-3xl" />
        </div>

        <div className="container-x pt-12 pb-24 md:pt-20 md:pb-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7 xl:col-span-7">
              <p className="reveal eyebrow inline-flex items-center gap-2">
                <Leaf className="h-3.5 w-3.5" />
                Regenerative · Reader-supported · Soil-first
              </p>

              <h1 className="reveal reveal-2 mt-6 font-serif display-1 text-ink">
                Eat like the
                <br />
                <span className="italic text-moss">soil is alive.</span>
              </h1>

              <p className="reveal reveal-3 mt-7 max-w-xl text-lg leading-relaxed text-ink/70 md:text-xl">
                A curated guide to regenerative organic foods, the world's best
                supplements, and wellness products that earn their place on
                your shelf — independently reviewed, never paid for.
              </p>

              <div className="reveal reveal-4 mt-9 flex flex-wrap gap-3">
                <Link href="/shop" className="btn-primary">
                  Shop the regenerative pantry
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/journal" className="btn-secondary">
                  Read the journal
                </Link>
              </div>

              <div className="reveal reveal-5 mt-12 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&q=80",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=128&q=80",
                  ].map((src) => (
                    <span
                      key={src}
                      className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-bone"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                  ))}
                </div>
                <p className="text-sm text-ink/60">
                  <span className="font-semibold text-ink">8,400+</span> readers
                  living more regeneratively.
                </p>
              </div>
            </div>

            {/* hero image collage — staggered 2-column with explicit aspect ratios */}
            <div className="reveal reveal-3 relative lg:col-span-5">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {/* Left column — one tall hero image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-ink/5 shadow-xl shadow-ink/5">
                  <Image
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80"
                    alt="Open field at golden hour"
                    fill
                    sizes="(min-width: 1024px) 18vw, 45vw"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Right column — two stacked, offset down */}
                <div className="flex flex-col gap-3 pt-10 md:gap-4 md:pt-14">
                  <div className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-ink/5">
                    <Image
                      src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1000&q=80"
                      alt="Fresh produce on linen"
                      fill
                      sizes="(min-width: 1024px) 18vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-ink/5">
                    <Image
                      src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
                      alt="Hand in soil"
                      fill
                      sizes="(min-width: 1024px) 18vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* floating badge */}
              <div className="float absolute -bottom-4 -left-4 hidden max-w-[210px] rounded-xl bg-bone p-4 shadow-xl ring-1 ring-ink/5 md:block">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-moss/10 text-moss">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <p className="font-serif text-sm leading-tight text-ink">
                    Honest picks
                    <br />
                    <span className="italic text-moss">we'd give to family</span>
                  </p>
                </div>
              </div>

              {/* small floating coffee chip top-left for atmosphere */}
              <div
                className="float absolute -top-3 right-6 hidden h-20 w-20 overflow-hidden rounded-full ring-4 ring-bone shadow-lg md:block"
                style={{ animationDelay: "1.5s" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80"
                  alt="Hand pouring coffee"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── TRUST BAR ─────────────────────────── */}
      <section className="border-y border-ink/10 bg-bone-2/40 backdrop-blur-sm">
        <div className="container-x py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:justify-between">
            {trustMarks.map(({ label, Icon }) => (
              <span
                key={label}
                className="group inline-flex items-center gap-2 text-ink/55 transition-colors hover:text-moss"
              >
                <Icon className="h-3.5 w-3.5 text-moss/70 transition-transform duration-500 group-hover:rotate-[8deg]" />
                <span className="label-mono">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── EDITOR'S PICKS ─────────────────────────── */}
      <ScrollReveal as="section" className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeader
            eyebrow="The shortlist"
            title={
              <>
                Editor's picks for{" "}
                <span className="italic text-moss">spring</span>
              </>
            }
            description="Four products we'd defend at dinner. Each one earns its category — tested, tasted, taken daily by us before it landed here."
            ctaHref="/shop"
            ctaLabel="Browse the full shop"
          />
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {editorPicks.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 70} y={20}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ─────────────────────────── LIVE DEALS ─────────────────────────── */}
      <LiveDeals deals={activeDeals} />

      {/* ─────────────────────────── BY THE NUMBERS ─────────────────────────── */}
      <section className="relative overflow-hidden border-y border-ink/10 bg-bone-2/30">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--ink)) 1px, transparent 1px)",
            backgroundSize: "120px 100%",
          }}
        />
        <div className="container-x relative py-14 md:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 80}>
                <div className="text-center md:text-left">
                  <p className="font-serif text-5xl leading-none text-ink md:text-6xl">
                    {s.value}
                  </p>
                  <p className="label-mono mt-3 text-ink/50">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── CATEGORIES ─────────────────────────── */}
      <ScrollReveal as="section" className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeader
            eyebrow="Browse by category"
            title={
              <>
                Eight aisles, <span className="italic text-clay">curated</span> with the
                same standards we use at home.
              </>
            }
          />
          <div className="mt-14 grid gap-4 md:grid-cols-12 md:grid-rows-[260px_260px_260px_260px]">
            {categories.map((cat, i) => {
              // asymmetric layout
              const layout = [
                "md:col-span-7 md:row-span-2",
                "md:col-span-5 md:row-span-1",
                "md:col-span-5 md:row-span-1",
                "md:col-span-4 md:row-span-2",
                "md:col-span-4 md:row-span-2",
                "md:col-span-4 md:row-span-2",
                "md:col-span-7 md:row-span-1",
                "md:col-span-5 md:row-span-1",
              ];
              return (
                <ScrollReveal
                  key={cat.id}
                  delay={(i % 4) * 70}
                  className={`${layout[i]}`}
                >
                  <Link
                    href={`/category/${cat.slug}`}
                    className="group relative block h-full w-full overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto"
                  >
                    <Image
                      src={cat.imageUrl}
                      alt={cat.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <p className="label-mono mb-2 text-bone/60">
                        {String(cat.order).padStart(2, "0")} · {cat.emoji}
                      </p>
                      <h3 className="font-serif text-2xl text-bone md:text-3xl">
                        {cat.name}
                      </h3>
                      <p className="mt-1.5 max-w-md text-sm text-bone/75">
                        {cat.tagline}
                      </p>
                      <span className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Explore <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* ─────────────────────────── BRANDS WE STAND BEHIND ─────────────────────────── */}
      <BrandCluster />

      {/* ─────────────────────────── MANIFESTO ─────────────────────────── */}
      <ScrollReveal as="section" className="py-24 md:py-32">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">The manifesto</p>
              <h2 className="mt-4 font-serif display-2 text-ink">
                We don't believe in
                <br />
                <span className="italic text-moss">silver bullets.</span>
              </h2>
              <div className="prose-editorial mt-8 max-w-2xl text-lg">
                <p>
                  We believe in the thousand small choices a body makes in a
                  week. The eggs, the salt, the water, the sleep, the sun. The
                  way the dirt was managed three counties over before the carrot
                  reached your plate.
                </p>
                <p>
                  Regeneralive is a guide for people who want those choices to
                  add up to something — for their bodies, and for the soil they
                  came from. Every product on this site has been chosen against
                  the same four-question test: <strong>does the formulation
                  respect the science, is the sourcing real, would we give it
                  to family, and is the price honest?</strong>
                </p>
                <p>
                  We're reader-supported and affiliate-funded. We earn a
                  commission when you buy. We've also turned down brands who
                  wanted to pay for placement. The line between those two
                  things is the whole product.
                </p>
              </div>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-clay link-underline"
              >
                Read our editorial standards
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-ink/10 shadow-2xl shadow-ink/10">
                <Image
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80"
                  alt="Farmer hands"
                  fill
                  sizes="(min-width: 1024px) 35vw, 80vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -right-4 top-8 hidden max-w-[220px] rounded-xl bg-bone p-5 shadow-xl ring-1 ring-ink/5 md:block">
                <p className="font-serif text-lg italic leading-snug text-ink">
                  "We vote with every bite — for soil that's healing, or soil
                  that's burning."
                </p>
                <p className="label-mono mt-3 text-ink/50">— Regeneralive</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ─────────────────────────── BY GOAL ─────────────────────────── */}
      <ScrollReveal as="section" className="bg-bone-2/40 py-24">
        <div className="container-x">
          <SectionHeader
            eyebrow="Shop by goal"
            title={
              <>
                What do you want to <span className="italic text-clay">change</span>?
              </>
            }
            description="Tell us what you're working on. We'll show you what we'd reach for first."
          />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {goals.map((g, i) => (
              <ScrollReveal key={g.slug} delay={i * 60}>
                <Link
                  href={`/shop?goal=${g.slug}`}
                  className={`group relative flex h-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-br ${g.tint} p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-moss/40 hover:shadow-xl hover:shadow-moss/10`}
                >
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-bone shadow-md ring-1 ring-ink/5 text-3xl transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
                    {g.emoji}
                  </span>
                  <span className="relative z-10 font-serif text-base text-ink">
                    {g.label}
                  </span>
                  <span className="relative z-10 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-ink/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Explore <ArrowUpRight className="h-3 w-3" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ─────────────────────────── FROM THE JOURNAL ─────────────────────────── */}
      <ScrollReveal as="section" className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeader
            eyebrow="From the journal"
            title={
              <>
                Long reads on the things <br />
                that <span className="italic text-moss">actually</span> matter.
              </>
            }
            ctaHref="/journal"
            ctaLabel="All articles"
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {latestArticles[0] && (
              <Link
                href={`/journal/${latestArticles[0].slug}`}
                className="group lg:row-span-2"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-ink/5">
                  <Image
                    src={latestArticles[0].coverImage}
                    alt={latestArticles[0].title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="label-mono mt-5 text-ink/50">
                  {latestArticles[0].tags[0]} · {latestArticles[0].readTime} min read
                </p>
                <h3 className="mt-2 font-serif text-3xl leading-tight text-ink transition-colors group-hover:text-moss md:text-4xl">
                  {latestArticles[0].title}
                </h3>
                <p className="mt-3 max-w-xl text-ink/65">
                  {latestArticles[0].dek}
                </p>
              </Link>
            )}
            <div className="flex flex-col gap-8">
              {latestArticles.slice(1, 3).map((a) => (
                <Link
                  key={a.id}
                  href={`/journal/${a.slug}`}
                  className="group grid grid-cols-5 gap-5"
                >
                  <div className="col-span-2 relative aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-ink/5">
                    <Image
                      src={a.coverImage}
                      alt={a.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="col-span-3 flex flex-col justify-center">
                    <p className="label-mono text-ink/50">
                      {a.tags[0]} · {a.readTime} min
                    </p>
                    <h3 className="mt-2 font-serif text-xl leading-tight text-ink transition-colors group-hover:text-moss md:text-2xl">
                      {a.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-ink/65">
                      {a.dek}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ─────────────────────────── MORE PRODUCTS ─────────────────────────── */}
      <ScrollReveal as="section" className="py-24">
        <div className="container-x">
          <SectionHeader
            eyebrow="Reader favorites"
            title={
              <>
                The most-clicked picks <span className="italic text-clay">this month.</span>
              </>
            }
            ctaHref="/shop"
            ctaLabel={`See all ${products.length} products`}
          />
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, 8).map((p, i) => (
              <ScrollReveal key={p.id} delay={(i % 4) * 70}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ─────────────────────────── INLINE NEWSLETTER (mid-page) ─────────────────────────── */}
      <ScrollReveal as="section" className="relative overflow-hidden py-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl bg-moss px-8 py-16 text-bone md:px-16 md:py-20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -bottom-32 -right-20 h-[400px] w-[400px] rounded-full bg-lichen/30 blur-3xl" />
              <div className="absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full bg-sun/15 blur-3xl" />
            </div>
            <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="label-mono text-bone/60">The dispatch</p>
                <h2 className="mt-3 font-serif text-4xl leading-[1.05] md:text-5xl">
                  One thoughtful email,
                  <br />
                  <span className="italic text-lichen">every other Sunday.</span>
                </h2>
                <p className="mt-5 max-w-md text-bone/75">
                  Reviews, deep guides, the occasional honest opinion about
                  something we tried and didn't love.
                </p>
              </div>
              <div>
                <NewsletterForm source="homepage-mid" variant="light" />
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </>
  );
}