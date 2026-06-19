"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Brain,
  Dumbbell,
  Flame,
  HeartPulse,
  Leaf,
  Moon,
  ShieldCheck,
  Sparkles,
  Sprout,
  Star,
} from "lucide-react";

type Goal =
  | "sleep"
  | "gut"
  | "longevity"
  | "performance"
  | "skin"
  | "immunity"
  | "energy"
  | "focus";

type Level = "starting" | "building" | "optimizing";

type Budget = "under-30" | "30-75" | "75-plus";

type CorpusItem = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  price: number;
  imageUrl: string;
  categorySlug: string;
  goals: Goal[];
  certifications: string[];
  rating: number;
  isEditorPick: boolean;
};

const GOALS: { id: Goal; label: string; icon: typeof Moon; helper: string }[] =
  [
    { id: "sleep", label: "Sleep", icon: Moon, helper: "Fall faster, stay under" },
    { id: "energy", label: "Energy", icon: Flame, helper: "Steady through the day" },
    { id: "focus", label: "Focus", icon: Brain, helper: "Calm, clear, present" },
    { id: "gut", label: "Gut", icon: Sprout, helper: "Digestion + microbiome" },
    {
      id: "performance",
      label: "Performance",
      icon: Dumbbell,
      helper: "Strength and recovery",
    },
    {
      id: "longevity",
      label: "Longevity",
      icon: HeartPulse,
      helper: "Healthspan, mitochondria",
    },
    { id: "skin", label: "Skin", icon: Sparkles, helper: "Glow from the inside" },
    {
      id: "immunity",
      label: "Immunity",
      icon: ShieldCheck,
      helper: "Resilience all year",
    },
  ];

const LEVELS: { id: Level; label: string; helper: string }[] = [
  {
    id: "starting",
    label: "Just starting",
    helper: "I want one or two foundational picks.",
  },
  {
    id: "building",
    label: "Building a routine",
    helper: "I have a few staples. Add the right next thing.",
  },
  {
    id: "optimizing",
    label: "Dialing it in",
    helper: "I'm looking for the upgrade-tier formulation.",
  },
];

const BUDGETS: { id: Budget; label: string; helper: string }[] = [
  { id: "under-30", label: "Under $30", helper: "Per item" },
  { id: "30-75", label: "$30 – $75", helper: "Per item" },
  { id: "75-plus", label: "$75+", helper: "Premium / device tier" },
];

function priceMatches(price: number, budget: Budget) {
  if (budget === "under-30") return price < 30;
  if (budget === "30-75") return price >= 30 && price <= 75;
  return price > 75;
}

function scoreItem(p: CorpusItem, goal: Goal, level: Level, budget: Budget) {
  let score = 0;
  // Goal match — strongest signal
  if (p.goals?.includes(goal)) score += 40;
  // Editor's pick weight scales with how seriously the user is dialing in
  if (p.isEditorPick) {
    score += level === "optimizing" ? 25 : level === "building" ? 18 : 12;
  }
  // Rating
  score += Math.round((p.rating ?? 0) * 4); // 0–20
  // Budget alignment
  if (priceMatches(p.price, budget)) score += 15;
  else {
    // soft penalty if outside budget
    score -= 12;
  }
  // Certifications signal
  const certBonus = Math.min(8, (p.certifications?.length ?? 0) * 2);
  score += certBonus;
  // Slight nudge for having an image
  if (p.imageUrl) score += 1;
  return score;
}

export function QuizClient({ corpus }: { corpus: CorpusItem[] }) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);

  const results = useMemo(() => {
    if (!goal || !level || !budget) return [];
    return corpus
      .map((p) => ({ p, s: scoreItem(p, goal, level, budget) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 3)
      .map((r) => r.p);
  }, [corpus, goal, level, budget]);

  function reset() {
    setGoal(null);
    setLevel(null);
    setBudget(null);
    setStep(0);
  }

  return (
    <>
      {/* Stepper */}
      <section className="container-x">
        <div className="flex items-center gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 w-12 rounded-full transition-colors ${
                step >= i ? "bg-moss" : "bg-ink/10"
              }`}
            />
          ))}
          <span className="label-mono ml-2 text-ink/50">
            Step {Math.min(step + 1, 4)} of 4
          </span>
        </div>
      </section>

      {/* Step 0 — Goal */}
      {step === 0 && (
        <section className="container-x py-12">
          <p className="eyebrow">Question 1</p>
          <h2 className="mt-3 font-serif display-3 text-ink">
            What's the goal?
          </h2>
          <p className="mt-3 text-ink/65">Pick the one that matters most this season.</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GOALS.map((g) => {
              const active = goal === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id)}
                  className={`group rounded-2xl border p-6 text-left transition-all ${
                    active
                      ? "border-moss bg-moss/5 shadow-sm"
                      : "border-ink/10 bg-bone-2/40 hover:border-moss/40 hover:bg-bone-2/70"
                  }`}
                >
                  <div
                    className={`grid h-11 w-11 place-items-center rounded-full transition-colors ${
                      active
                        ? "bg-moss text-bone"
                        : "bg-bone text-moss group-hover:bg-moss group-hover:text-bone"
                    }`}
                  >
                    <g.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 font-serif text-xl text-ink">{g.label}</p>
                  <p className="mt-1 text-sm text-ink/60">{g.helper}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex justify-end">
            <button
              type="button"
              disabled={!goal}
              onClick={() => setStep(1)}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* Step 1 — Level */}
      {step === 1 && (
        <section className="container-x py-12">
          <p className="eyebrow">Question 2</p>
          <h2 className="mt-3 font-serif display-3 text-ink">
            Where are you in your routine?
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {LEVELS.map((l) => {
              const active = level === l.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLevel(l.id)}
                  className={`rounded-2xl border p-7 text-left transition-all ${
                    active
                      ? "border-moss bg-moss/5"
                      : "border-ink/10 bg-bone-2/40 hover:border-moss/40 hover:bg-bone-2/70"
                  }`}
                >
                  <Leaf
                    className={`h-5 w-5 ${active ? "text-moss" : "text-clay"}`}
                  />
                  <p className="mt-4 font-serif text-xl text-ink">{l.label}</p>
                  <p className="mt-2 text-sm text-ink/65 leading-relaxed">
                    {l.helper}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="btn-secondary"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!level}
              onClick={() => setStep(2)}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* Step 2 — Budget */}
      {step === 2 && (
        <section className="container-x py-12">
          <p className="eyebrow">Question 3</p>
          <h2 className="mt-3 font-serif display-3 text-ink">
            What's a comfortable budget?
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {BUDGETS.map((b) => {
              const active = budget === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBudget(b.id)}
                  className={`rounded-2xl border p-7 text-left transition-all ${
                    active
                      ? "border-moss bg-moss/5"
                      : "border-ink/10 bg-bone-2/40 hover:border-moss/40 hover:bg-bone-2/70"
                  }`}
                >
                  <p className="font-serif text-3xl text-ink">{b.label}</p>
                  <p className="mt-2 label-mono text-clay">{b.helper}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-secondary"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!budget}
              onClick={() => setStep(3)}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              See your shelf
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* Step 3 — Results */}
      {step === 3 && (
        <section className="container-x py-12 pb-32">
          <p className="eyebrow">Your shelf</p>
          <h2 className="mt-3 font-serif display-3 text-ink max-w-3xl">
            Three picks for{" "}
            <span className="italic text-moss">
              {GOALS.find((g) => g.id === goal)?.label.toLowerCase()}
            </span>
            , matched to a{" "}
            <span className="italic text-clay">
              {BUDGETS.find((b) => b.id === budget)?.label.toLowerCase()}
            </span>{" "}
            budget.
          </h2>
          <p className="mt-4 text-ink/65 max-w-2xl">
            Scored against our 100-point rubric and filtered to your stated
            goal. Read the full review on each before clicking out.
          </p>

          {results.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-ink/10 bg-bone-2/40 p-10 text-center">
              <p className="font-serif text-2xl text-ink">
                No exact matches in that budget.
              </p>
              <p className="mt-3 text-ink/65">
                Try a different budget tier — we'd rather send you to nothing
                than to the wrong thing.
              </p>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-secondary mt-6"
              >
                Adjust budget
              </button>
            </div>
          ) : (
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {results.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bone-2">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    ) : null}
                    <span className="absolute left-4 top-4 rounded-full bg-bone/95 px-3 py-1 label-mono text-moss-deep">
                      Match #{i + 1}
                    </span>
                    {p.isEditorPick && (
                      <span className="absolute right-4 top-4 rounded-full bg-moss text-bone px-3 py-1 label-mono">
                        Editor's Pick
                      </span>
                    )}
                  </div>
                  <p className="mt-4 label-mono text-clay">{p.brand}</p>
                  <h3 className="mt-1 font-serif text-2xl text-ink leading-tight">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink/65 leading-relaxed">
                    {p.tagline}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-serif text-xl text-ink">
                      ${p.price.toFixed(0)}
                    </p>
                    <p className="flex items-center gap-1 label-mono text-ink/55">
                      <Star className="h-3.5 w-3.5 fill-clay text-clay" />
                      {p.rating?.toFixed(1) ?? "—"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-10">
            <button type="button" onClick={reset} className="btn-secondary">
              Start over
            </button>
            <Link href="/our-standards" className="btn-clay">
              See how we score
            </Link>
            <Link
              href="/shop"
              className="link-underline text-ink/70 hover:text-ink ml-auto"
            >
              Browse the full shop →
            </Link>
          </div>
        </section>
      )}
    </>
  );
}