import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle2, XCircle } from "lucide-react";

export const metadata = {
  title: "Our Standards · The 100-point Regeneralive scoring rubric",
  description:
    "The exact public rubric we use to score every food, supplement, and wellness device on Regeneralive — sourcing, formulation, testing, clinical relevance, and value.",
};

type RubricRow = {
  criterion: string;
  weight: number;
  excellent: string;
  acceptable: string;
  fail: string;
};

const sections: { pillar: string; total: number; rows: RubricRow[] }[] = [
  {
    pillar: "Sourcing",
    total: 25,
    rows: [
      {
        criterion: "Farm / origin transparency",
        weight: 8,
        excellent: "Named farm, regenerative or biodynamic, public traceability",
        acceptable: "Named region + certified organic supplier",
        fail: "Generic 'sustainably sourced' with no traceable supplier",
      },
      {
        criterion: "Active extractor / contract manufacturer",
        weight: 8,
        excellent: "Named cGMP facility with NSF or USP audit on file",
        acceptable: "Named contract manufacturer, FDA-registered",
        fail: "Refused to disclose or unnamed",
      },
      {
        criterion: "Certifications verified",
        weight: 5,
        excellent: "ROC, EWG Verified, MADE SAFE, USDA Organic — verified at registry",
        acceptable: "USDA Organic only, verified",
        fail: "Logos used without active certification",
      },
      {
        criterion: "Supply chain ethics",
        weight: 4,
        excellent: "Fair-trade or living-wage documentation",
        acceptable: "Code of conduct published",
        fail: "No labor-practice information available",
      },
    ],
  },
  {
    pillar: "Formulation",
    total: 25,
    rows: [
      {
        criterion: "Bioavailable form of active",
        weight: 10,
        excellent: "Most-absorbable / clinically studied form (e.g., glycinate, methylated)",
        acceptable: "Standard form with clinical evidence",
        fail: "Cheapest oxide / synthetic form with poor absorption",
      },
      {
        criterion: "Clinical dose",
        weight: 10,
        excellent: "Within 100% of efficacious RCT dose",
        acceptable: "60–99% of efficacious RCT dose",
        fail: "Below 60% of efficacious RCT dose ('fairy-dusting')",
      },
      {
        criterion: "No proprietary blends",
        weight: 5,
        excellent: "Every ingredient with mg disclosed",
        acceptable: "Blend disclosed, with key actives broken out",
        fail: "Blacked-out blend with unknown actives",
      },
    ],
  },
  {
    pillar: "Independent testing",
    total: 20,
    rows: [
      {
        criterion: "Third-party COA recency",
        weight: 8,
        excellent: "ISO 17025 lab, COA dated within 6 months",
        acceptable: "Independent lab, COA within 12 months",
        fail: "No COA available or older than 18 months",
      },
      {
        criterion: "Heavy metals",
        weight: 6,
        excellent: "Below 50% of California Prop 65 thresholds",
        acceptable: "Below Prop 65 thresholds",
        fail: "Approaches or exceeds Prop 65 limits",
      },
      {
        criterion: "Contaminant-specific testing",
        weight: 6,
        excellent: "Glyphosate, microbial, mycotoxin, residual solvents all tested",
        acceptable: "Category-relevant contaminants tested",
        fail: "Heavy-metal panel only, nothing else",
      },
    ],
  },
  {
    pillar: "Clinical relevance",
    total: 15,
    rows: [
      {
        criterion: "Evidence base",
        weight: 8,
        excellent: "Multiple RCTs supporting the headline claim in the form sold",
        acceptable: "Mechanistic plus observational support",
        fail: "Animal-model evidence only",
      },
      {
        criterion: "Goal alignment",
        weight: 7,
        excellent: "Formulation matches a specific clinical use case clearly",
        acceptable: "Reasonable alignment with stated goal",
        fail: "Marketing claim doesn't match the formulation",
      },
    ],
  },
  {
    pillar: "Value",
    total: 15,
    rows: [
      {
        criterion: "Cost per clinical dose",
        weight: 8,
        excellent: "Top quartile vs. peer set",
        acceptable: "Median vs. peer set",
        fail: "Bottom quartile vs. peer set with no offsetting quality",
      },
      {
        criterion: "Pricing honesty",
        weight: 4,
        excellent: "True subscription savings, no fake anchor pricing",
        acceptable: "Standard pricing, modest discount stack",
        fail: "Inflated MSRP used to fake a 50% discount",
      },
      {
        criterion: "Returns + customer service",
        weight: 3,
        excellent: "60–90 day open return, lifetime device warranty where relevant",
        acceptable: "30 day return, manufacturer warranty",
        fail: "Final sale on a $60+ supplement",
      },
    ],
  },
];

const tiers = [
  {
    label: "Editor's Pick",
    range: "85–100",
    color: "bg-moss text-bone",
    body: "Best-in-class across all five pillars. We'd hand it to family. Limited to roughly 8% of products we evaluate.",
  },
  {
    label: "Recommended",
    range: "70–84",
    color: "bg-clay text-bone",
    body: "Solid product. Some compromise — usually on price-per-dose or a single formulation choice — but worth listing.",
  },
  {
    label: "Pass",
    range: "Under 70",
    color: "bg-ink/80 text-bone",
    body: "Doesn't get published. We don't keep a 'worst of' page — silence is the review.",
  },
];

export default function StandardsPage() {
  return (
    <>
      {/* Hero */}
      <section className="container-x pt-20 pb-12 md:pt-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">Our Standards</p>
            <h1 className="mt-4 font-serif display-1 text-ink">
              The 100-point rubric, published in full.{" "}
              <span className="italic text-moss">No black box.</span>
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-12">
            <p className="text-lg text-ink/70 leading-relaxed">
              This is the exact scoring template I use to evaluate every
              product before adding it to the site. Every listing on
              Regeneralive has a number behind it — and I'll happily show you
              the math.
            </p>
            <p className="mt-5 text-lg text-ink/70 leading-relaxed">
              Scores are revisited annually, or sooner if a brand changes
              formulation, supplier, or COA cadence.
            </p>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="container-x py-12">
        <div className="relative aspect-[16/8] overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=2400&q=80"
            alt="Open notebook and pen on a wooden desk"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Tiers */}
      <section className="container-x py-16">
        <p className="eyebrow text-center">How the score becomes a label</p>
        <h2 className="mt-4 text-center font-serif display-3 text-ink">
          Three tiers, no ambiguity.
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.label}
              className="rounded-2xl border border-ink/10 bg-bone-2/40 p-8"
            >
              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 label-mono ${t.color}`}
              >
                <Award className="h-3.5 w-3.5" />
                {t.label}
              </span>
              <p className="mt-5 font-serif text-3xl text-ink">{t.range}</p>
              <p className="mt-3 leading-relaxed text-ink/65">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rubric */}
      <section className="container-x py-24">
        <p className="eyebrow">The full rubric</p>
        <h2 className="mt-4 font-serif display-3 text-ink max-w-3xl">
          Five pillars,{" "}
          <span className="italic text-clay">100 points total.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-ink/65 leading-relaxed">
          Read down the table for the criterion. Read across for what an
          excellent, acceptable, or failing answer looks like in our reviews.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <div
              key={s.pillar}
              className="overflow-hidden rounded-2xl border border-ink/10 bg-bone"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3 bg-moss-deep px-6 py-5 text-bone md:px-8">
                <h3 className="font-serif text-2xl">{s.pillar}</h3>
                <p className="label-mono text-bone/70">{s.total} points</p>
              </div>
              <div className="divide-y divide-ink/10">
                {s.rows.map((r) => (
                  <div
                    key={r.criterion}
                    className="grid gap-4 px-6 py-6 md:grid-cols-12 md:gap-6 md:px-8"
                  >
                    <div className="md:col-span-3">
                      <p className="font-serif text-lg text-ink">
                        {r.criterion}
                      </p>
                      <p className="mt-1 label-mono text-clay">
                        {r.weight} pts
                      </p>
                    </div>
                    <div className="md:col-span-3 flex items-start gap-2 text-sm text-ink/75">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
                      <span>{r.excellent}</span>
                    </div>
                    <div className="md:col-span-3 flex items-start gap-2 text-sm text-ink/65">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                      <span>{r.acceptable}</span>
                    </div>
                    <div className="md:col-span-3 flex items-start gap-2 text-sm text-ink/55">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-ink/60" />
                      <span>{r.fail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-moss-deep py-32 text-bone">
        <div className="container-narrow text-center">
          <p className="label-mono text-bone/60">Disagree with a score?</p>
          <p className="mt-6 font-serif text-3xl leading-[1.25] md:text-5xl">
            We publish corrections. We don't bury them. If you've spotted a
            data point we missed,{" "}
            <span className="italic text-lichen">tell us.</span>
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-bone px-7 py-3.5 text-sm font-medium text-moss-deep transition-colors hover:bg-lichen"
            >
              Send us a correction
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}