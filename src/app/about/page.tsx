import Image from "next/image";
import Link from "next/link";
import { Leaf, Microscope, ShieldCheck, Sprout } from "lucide-react";

export const metadata = {
  title: "About · The Regeneralive editorial standard",
  description:
    "Why we built Regeneralive, who runs it, and how we choose what we recommend.",
};

const principles = [
  {
    icon: Microscope,
    title: "Formulation respects the science",
    body: "Real doses. No proprietary blends. The right form of the active ingredient. We read the studies and we read the labels.",
  },
  {
    icon: Leaf,
    title: "Sourcing is real and traceable",
    body: "For food: we want to know the farm and the practices. For supplements: the source of the active and the contract manufacturer.",
  },
  {
    icon: ShieldCheck,
    title: "Tested for purity",
    body: "Independent third-party verification of the COA. Heavy-metal testing for greens and seafood. Glyphosate residue testing for grains.",
  },
  {
    icon: Sprout,
    title: "Honest pricing, honest reviews",
    body: "Premium pricing for a premium thing is fine. Premium pricing for a marketing skin over commodity ingredients is not. We name the difference.",
  },
];

const team = [
  {
    name: "Iris Mendoza",
    role: "Editor-in-Chief",
    bio: "Former food editor at a Bay Area magazine. Spent two years living on a regenerative ranch in Patagonia before launching Regeneralive.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Dr. Liam Park",
    role: "Lead Reviewer, Functional Medicine",
    bio: "Naturopath with 12 years of clinical practice. Reviews supplement formulations for clinical relevance and dosing.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Naomi Becker",
    role: "Environmental Health Writer",
    bio: "Investigative journalist focused on environmental contaminants in food, water, and air. Previously at the Environmental Working Group.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="container-x pt-20 pb-12 md:pt-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">About Regeneralive</p>
            <h1 className="mt-4 font-serif display-1 text-ink">
              An independent guide for people who want their wellness to{" "}
              <span className="italic text-moss">heal the soil too.</span>
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-12">
            <p className="text-lg text-ink/70 leading-relaxed">
              Regeneralive is a small editorial team curating the foods,
              supplements, and wellness products we'd reach for first. Every
              recommendation passes the same four-question test before it earns
              a place on this site.
            </p>
            <p className="mt-5 text-lg text-ink/70 leading-relaxed">
              We are reader-supported. We earn affiliate commissions on the
              links you click. We've also turned down brands who wanted to pay
              for placement.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-12">
        <div className="relative aspect-[16/8] overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=80"
            alt="Regenerative landscape"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Principles */}
      <section className="container-x py-24">
        <p className="eyebrow text-center">The four-question test</p>
        <h2 className="mt-4 text-center font-serif display-3 text-ink">
          How we choose what to recommend.
        </h2>
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="rounded-2xl border border-ink/10 bg-bone-2/40 p-8">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-moss text-bone">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-serif text-2xl text-ink">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/70">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="container-x py-24">
        <p className="eyebrow">Who we are</p>
        <h2 className="mt-4 font-serif display-3 text-ink max-w-3xl">
          Three people, one shared bias toward{" "}
          <span className="italic text-clay">things that actually work.</span>
        </h2>
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {team.map((t) => (
            <div key={t.name}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 font-serif text-2xl text-ink">{t.name}</h3>
              <p className="label-mono text-moss">{t.role}</p>
              <p className="mt-3 text-sm text-ink/65 leading-relaxed">{t.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto block */}
      <section className="bg-moss-deep py-32 text-bone">
        <div className="container-narrow text-center">
          <p className="label-mono text-bone/60">Our manifesto</p>
          <p className="mt-6 font-serif text-3xl leading-[1.25] md:text-5xl">
            We don't believe in silver bullets. We believe in the thousand small
            choices a body makes in a week — the eggs, the salt, the water, the
            sleep, the sun, the way the dirt was managed three counties over
            before the carrot reached your plate.
          </p>
          <p className="mt-8 label-mono text-bone/60">— The Regeneralive editors</p>
        </div>
      </section>

      <section className="container-x py-24 text-center">
        <h2 className="font-serif display-3 text-ink">Have a question?</h2>
        <p className="mt-4 text-ink/65">
          Press, partnerships, product pitches — we read every email.
        </p>
        <Link href="/contact" className="mt-8 btn-primary">
          Get in touch
        </Link>
      </section>
    </>
  );
}