import Image from "next/image";
import Link from "next/link";
import {
  FlaskConical,
  FileSearch,
  Microscope,
  Scale,
  ShieldAlert,
  Sprout,
  Stethoscope,
  Tag,
} from "lucide-react";

export const metadata = {
  title: "Our Methodology · How Regeneralive evaluates products",
  description:
    "The full process we use to evaluate every food, supplement, and wellness device we recommend — from supplier traceability to third-party COA review and clinical relevance.",
};

const phases = [
  {
    step: "01",
    title: "Sourcing intake",
    icon: FileSearch,
    body: "Every brand submits a sourcing dossier: farm or extractor of origin, contract manufacturer, country of cultivation, and harvest practices. If a brand can't or won't disclose, the product doesn't move forward — full stop.",
    points: [
      "Farm or wild-harvest origin documented",
      "Contract manufacturer named",
      "Country of cultivation + harvest year",
      "Regenerative or organic certifications verified at the registry",
    ],
  },
  {
    step: "02",
    title: "Formulation review",
    icon: Microscope,
    body: "Our lead reviewer reads the supplement facts panel against the published clinical literature. We look for the right form of the active, the right co-factors, and a clinically meaningful dose — not a fairy-dust dose engineered for the label.",
    points: [
      "Bioavailable form (e.g., methylated B-vitamins, glycinate vs. oxide)",
      "Clinically relevant dose vs. RDI vs. study dose",
      "No proprietary blends without per-ingredient amounts",
      "Excipients reviewed for known sensitivities",
    ],
  },
  {
    step: "03",
    title: "Independent COA review",
    icon: FlaskConical,
    body: "We require a third-party Certificate of Analysis dated within the last 12 months. We read it. We compare label claim to assayed potency. We look at heavy metals, microbial counts, and residual solvents. Anomalies kill the listing.",
    points: [
      "ISO 17025-accredited lab preferred",
      "Heavy metals (Pb, Cd, As, Hg) below California Prop 65 thresholds",
      "Glyphosate residue testing for grains, oats, legumes",
      "Microbial + yeast/mold within USP <2021>",
    ],
  },
  {
    step: "04",
    title: "Clinical relevance check",
    icon: Stethoscope,
    body: "Dr. Liam Park, our naturopath reviewer, asks one question: would I actually hand this to a patient? If the dose is fine but the pairing is wrong for the goal, we say so in the review. Real-world relevance over marketing claims.",
    points: [
      "Mechanism check against PubMed-indexed RCTs",
      "Goal alignment (sleep, stress, recovery, longevity, etc.)",
      "Stack interaction notes when relevant",
      "Contraindications surfaced in the review",
    ],
  },
  {
    step: "05",
    title: "Real-world use",
    icon: Sprout,
    body: "We test it. Foods get cooked. Supplements get taken for at least 30 days by at least one editor. Wearables go on a wrist for the full battery cycle. We write the review only after living with the product.",
    points: [
      "Minimum 30-day evaluation window for supplements",
      "Multi-week kitchen testing for foods",
      "Devices used through a full charge / data cycle",
      "Notes on packaging, fulfillment, and customer service",
    ],
  },
  {
    step: "06",
    title: "Pricing and value",
    icon: Scale,
    body: "Premium pricing for a premium product is fine. Premium pricing for a marketing skin over commodity ingredients is not. We calculate cost-per-clinical-dose and compare against three to five peer products before scoring.",
    points: [
      "Cost per serving + cost per active milligram",
      "Subscription discount honesty (true price vs. anchor price)",
      "Peer benchmarking across 3–5 directly competing SKUs",
      "Shipping + return policy factored into final value score",
    ],
  },
  {
    step: "07",
    title: "Editorial scoring",
    icon: Tag,
    body: "We score on a 100-point rubric across five pillars (sourcing, formulation, testing, clinical relevance, value). Anything below 70 is a 'pass' — we don't publish it. Between 70 and 84 earns a standard listing. 85+ becomes an Editor's Pick.",
    points: [
      "Sourcing — 25 points",
      "Formulation — 25 points",
      "Independent testing — 20 points",
      "Clinical relevance — 15 points",
      "Value — 15 points",
    ],
  },
  {
    step: "08",
    title: "Conflict-of-interest disclosure",
    icon: ShieldAlert,
    body: "If we hold a financial interest beyond a standard affiliate relationship, we say so in the review header. We've turned down brands who wanted to pay for placement. We rotate paid promotion never with editorial review — it's a hard wall.",
    points: [
      "Affiliate commissions disclosed on every product page",
      "No paid placement in editorial reviews — ever",
      "Free samples noted in the review byline",
      "Equity or advisory relationships disclosed prominently",
    ],
  },
];

const refusalReasons = [
  "Refused to disclose contract manufacturer",
  "COA older than 18 months on a perishable active",
  "Glyphosate residue above 75 ppb on an oat-based product",
  "Marketing claims unsupported by any human RCT",
  "Heavy-metal failure on a greens powder (lead > 0.5 µg/serving)",
  "Proprietary blend hiding sub-clinical doses of headline actives",
];

export default function MethodologyPage() {
  return (
    <>
      {/* Hero */}
      <section className="container-x pt-20 pb-12 md:pt-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">Methodology</p>
            <h1 className="mt-4 font-serif display-1 text-ink">
              The eight steps every product clears before it earns a{" "}
              <span className="italic text-moss">place on this shelf.</span>
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-12">
            <p className="text-lg text-ink/70 leading-relaxed">
              We publish our methodology because you deserve to see the work.
              Most affiliate sites don't. They rank by commission rate. We rank
              by what we'd actually take, eat, or wear ourselves.
            </p>
            <p className="mt-5 text-lg text-ink/70 leading-relaxed">
              Below is the full process — sourcing intake to editorial scoring
              — that every brand on Regeneralive has walked through. It is
              deliberately slow. That's the point.
            </p>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="container-x py-12">
        <div className="relative aspect-[16/8] overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2400&q=80"
            alt="Laboratory glassware and notebooks"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Phases */}
      <section className="container-x py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="eyebrow">The eight phases</p>
            <h2 className="mt-4 font-serif display-3 text-ink">
              Slow, on purpose.
            </h2>
            <p className="mt-6 text-ink/65 leading-relaxed">
              We average 9–14 weeks per product from intake to publication.
              Most listings on the internet take an afternoon. The difference
              is in the bottle.
            </p>
          </div>
          <div className="md:col-span-8">
            <ol className="space-y-6">
              {phases.map((phase) => (
                <li
                  key={phase.step}
                  className="rounded-2xl border border-ink/10 bg-bone-2/40 p-8"
                >
                  <div className="flex items-start gap-5">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-moss text-bone">
                      <phase.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="label-mono text-clay">{phase.step}</p>
                      <h3 className="mt-1 font-serif text-2xl text-ink">
                        {phase.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-ink/70">
                        {phase.body}
                      </p>
                      <ul className="mt-5 grid gap-2 text-sm text-ink/65 sm:grid-cols-2">
                        {phase.points.map((p) => (
                          <li key={p} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Things we've turned down */}
      <section className="bg-bone-2/60 py-24">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <p className="eyebrow">What didn't make it</p>
              <h2 className="mt-4 font-serif display-3 text-ink">
                A short ledger of{" "}
                <span className="italic text-clay">recent rejections.</span>
              </h2>
              <p className="mt-6 text-ink/65 leading-relaxed">
                Anonymized but real. Every quarter we turn down 30–40% of the
                brands that pitch us. Here's a slice of why.
              </p>
            </div>
            <div className="md:col-span-7">
              <ul className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-bone overflow-hidden">
                {refusalReasons.map((r, i) => (
                  <li
                    key={r}
                    className="flex items-start gap-4 px-6 py-5"
                  >
                    <span className="label-mono text-clay mt-0.5 w-8 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink/80 leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="container-x py-24 text-center">
        <p className="eyebrow">Read more</p>
        <h2 className="mt-4 font-serif display-3 text-ink max-w-3xl mx-auto">
          See the public scoring rubric we use on every review.
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/our-standards" className="btn-primary">
            Read our standards
          </Link>
          <Link href="/quiz" className="btn-secondary">
            Find products for your goals
          </Link>
        </div>
      </section>
    </>
  );
}