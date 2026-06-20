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
    "The criteria I use to evaluate every food, supplement, and wellness device that earns a place on Regeneralive — from supplier transparency to third-party COA review and clinical relevance.",
};

const phases = [
  {
    step: "01",
    title: "Sourcing intake",
    icon: FileSearch,
    body: "Every brand has to clear a transparency check before I'll consider listing it. I want to know the farm or extractor of origin, the contract manufacturer, the country of cultivation, and the practices on the land. If a brand can't or won't disclose, the product doesn't move forward — full stop.",
    points: [
      "Farm or wild-harvest origin documented",
      "Contract manufacturer named (\"manufactured by,\" not just \"manufactured for\")",
      "Country of cultivation documented",
      "Regenerative or organic certifications verified at the registry, not just on the label",
    ],
  },
  {
    step: "02",
    title: "Formulation review",
    icon: Microscope,
    body: "I read the supplement facts panel against the published clinical literature. The right form of the active ingredient, the right co-factors, and a clinically meaningful dose — not a fairy-dust dose engineered for the label.",
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
    body: "I want to see a third-party Certificate of Analysis dated within the last 12 months. I read it. I compare label claim to assayed potency. I look at heavy metals, microbial counts, and residual solvents. Anomalies kill the listing.",
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
    body: "Beyond \"does the dose match the studies\" is the harder question: does this product actually fit the goal someone would buy it for? I cross-reference each formulation against the relevant peer-reviewed literature and flag mismatches in the review when they're worth flagging.",
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
    body: "I don't list things I haven't lived with. Foods get cooked. Supplements get taken. Devices go on a wrist or in a bedroom for the full battery cycle. The review only goes up after the product has been used — not just researched.",
    points: [
      "Hands-on evaluation before publication",
      "Notes on taste, texture, and kitchen use for foods",
      "Real-world wear, app, and data quality for devices",
      "Notes on packaging, fulfillment, and customer service",
    ],
  },
  {
    step: "06",
    title: "Pricing and value",
    icon: Scale,
    body: "Premium pricing for a premium product is fine. Premium pricing for a marketing skin over commodity ingredients is not. I calculate cost-per-clinical-dose and benchmark against peer products before scoring.",
    points: [
      "Cost per serving + cost per active milligram",
      "Subscription discount honesty (true price vs. anchor price)",
      "Peer benchmarking across competing SKUs in the same category",
      "Shipping + return policy factored into final value score",
    ],
  },
  {
    step: "07",
    title: "Editorial scoring",
    icon: Tag,
    body: "Every product is scored against a 100-point rubric across five pillars: sourcing, formulation, testing, clinical relevance, and value. Anything below 70 is a 'pass' — it doesn't get published. Between 70 and 84 earns a standard listing. 85+ becomes an Editor's Pick.",
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
    body: "Affiliate commissions on outbound links are how this site stays free to read. I disclose them on every product page. I've turned down brands who wanted to pay for placement — that's a hard wall between editorial review and paid promotion.",
    points: [
      "Affiliate commissions disclosed on every product page",
      "No paid placement in editorial reviews — ever",
      "Free samples noted in the review byline when received",
      "Equity or advisory relationships disclosed prominently if any exist",
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
              I publish my methodology because you deserve to see the work.
              Most affiliate sites don't. They rank by commission rate. I rank
              by what I'd actually take, eat, or wear myself.
            </p>
            <p className="mt-5 text-lg text-ink/70 leading-relaxed">
              Below is the full process — sourcing intake to editorial scoring
              — every brand on Regeneralive walks through. It's deliberately
              slow. That's the point.
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
              Listings on most affiliate sites take an afternoon. The
              difference is in the bottle — and on the plate.
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
                The kinds of red flags that{" "}
                <span className="italic text-clay">end an evaluation.</span>
              </h2>
              <p className="mt-6 text-ink/65 leading-relaxed">
                These are the exact failure modes I look for in any product
                under consideration. Any one of them is enough to take a brand
                off the shortlist.
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
          See the public scoring rubric I use on every review.
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