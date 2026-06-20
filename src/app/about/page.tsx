import Image from "next/image";
import Link from "next/link";
import { Leaf, Microscope, ShieldCheck, Sprout } from "lucide-react";

export const metadata = {
  title: "About · Why Regeneralive exists",
  description:
    "Why I built Regeneralive — a personal note on illness, the supplement industry, soil, and the search for things that actually work.",
};

const principles = [
  {
    icon: Microscope,
    title: "Formulation respects the science",
    body: "Real doses. No proprietary blends. The right form of the active ingredient. I read the studies and I read the labels.",
  },
  {
    icon: Leaf,
    title: "Sourcing is real and traceable",
    body: "For food: I want to know the farm and the practices. For supplements: the source of the active and the contract manufacturer. \"Manufactured by\" matters more than \"manufactured for.\"",
  },
  {
    icon: ShieldCheck,
    title: "Tested, where testing matters",
    body: "I look for third-party Certificates of Analysis, heavy-metal testing on greens and seafood, and glyphosate residue testing on grains. If a brand won't share, I move on.",
  },
  {
    icon: Sprout,
    title: "Honest pricing, honest reviews",
    body: "Premium pricing for a premium thing is fine. Premium pricing for a marketing skin over commodity ingredients is not. I name the difference.",
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
              Why this site exists.{" "}
              <span className="italic text-moss">Because it's personal.</span>
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-12">
            <p className="text-lg text-ink/70 leading-relaxed">
              Regeneralive is a curated guide to the regenerative foods,
              supplements, and wellness tools I've come to trust — built after
              years of trial, error, and finally getting let in on what the
              industry doesn't tell you.
            </p>
            <p className="mt-5 text-lg text-ink/70 leading-relaxed">
              This is reader-supported. I earn affiliate commissions on the
              links you click. I've also turned down brands who wanted to pay
              for placement. The two have to stay separate.
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

      {/* Personal story — Why I started */}
      <section className="container-x py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="eyebrow">Why I started</p>
            <h2 className="mt-3 font-serif display-3 text-ink">
              My journey into health wasn't a hobby.
            </h2>
            <p className="mt-4 font-serif text-2xl italic text-clay leading-snug">
              It was survival.
            </p>
          </div>
          <div className="md:col-span-8 space-y-6 text-lg text-ink/75 leading-relaxed">
            <p>
              Growing up, illness was everywhere around me — in my family, in
              people I loved. I watched lives get cut short, and I couldn't
              ignore it. I started searching for answers, chasing anything that
              might explain how to live stronger, healthier, longer.
            </p>
            <p>
              Supplements seemed like part of that answer. But the more I
              searched, the more confused I got. One expert would say one
              thing, another would contradict it, and every bottle on the shelf
              promised miracles. I tried, failed, experimented, and most of the
              time felt like I was guessing with my own health.
            </p>
            <p>
              The deeper I dug, the more I realized supplements were only one
              piece. Soil was another. The same carrot grown in living,
              biologically-rich soil and the one grown in chemically-fed dirt
              are not the same carrot — not in minerals, not in phytochemicals,
              not in what they do for your body. So the search widened: real
              food, regenerative farming, clean water, sleep, sun, the way the
              dirt was managed three counties over before the food reached my
              plate.
            </p>
            <p>
              Then I met my mentor — the founder of one of the most respected,
              doctor-trusted supplement companies in the world. Out of respect
              for his privacy I won't name him here, but if you follow top
              health voices, you've heard of his brand. He pulled back the
              curtain and showed me the reality of the industry: largely
              unregulated, full of shortcuts, mislabeled ingredients, and
              missing oversight. Most of what's on the shelf isn't what it
              claims to be.
            </p>
            <p>
              What he taught me changed how I read every label. It also
              explained why I'd struggled for so long to get consistent
              results. And it gave me a mission.
            </p>
          </div>
        </div>
      </section>

      {/* Where I am now */}
      <section className="bg-bone-2/60 py-20">
        <div className="container-x">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <p className="eyebrow">Where I am now</p>
              <h2 className="mt-3 font-serif display-3 text-ink">
                The same people who once watched me chase answers{" "}
                <span className="italic text-moss">now ask me for them.</span>
              </h2>
            </div>
            <div className="md:col-span-8 space-y-6 text-lg text-ink/75 leading-relaxed">
              <p>
                Today my health is the best it has ever been. Energy is steady.
                My body feels stronger. My mind is sharper. The change wasn't
                luck — it was applying what I learned from the inside: how to
                spot real quality, how to separate science from marketing, and
                how to choose products with integrity from the soil up.
              </p>
              <p>
                People started noticing the difference and asking me what I was
                doing. The list of brands and foods I kept recommending kept
                getting longer. At some point it made more sense to put it
                somewhere they could find — and where I could explain the why
                behind every pick — than to keep texting it one person at a
                time.
              </p>
              <p>That's how Regeneralive started.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Where we're headed */}
      <section className="container-x py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="eyebrow">Where we're headed</p>
            <h2 className="mt-3 font-serif display-3 text-ink">
              No hype. No smoke and mirrors.{" "}
              <span className="italic text-clay">Just the truth.</span>
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-lg text-ink/75 leading-relaxed">
            <p>
              Regeneralive is a trusted shelf. A place to cut through the
              confusion in food, supplements, and wellness — and find the
              brands that earn the recommendation.
            </p>
            <p>
              I only list brands I personally use, trust, and believe in.
              Because your health deserves more than marketing — it deserves
              the truth, traceable from the ingredient back to the soil.
            </p>
            <p>
              If a product doesn't make it onto the site, that absence is the
              review. I'd rather send you to nothing than to the wrong thing.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="container-x py-24">
        <p className="eyebrow text-center">The four-question test</p>
        <h2 className="mt-4 text-center font-serif display-3 text-ink">
          How I choose what to recommend.
        </h2>
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {principles.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-ink/10 bg-bone-2/40 p-8"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full bg-moss text-bone">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-serif text-2xl text-ink">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/70">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/methodology" className="btn-secondary">
            Read the full methodology
          </Link>
        </div>
      </section>

      {/* Manifesto block */}
      <section className="bg-moss-deep py-32 text-bone">
        <div className="container-narrow text-center">
          <p className="label-mono text-bone/60">A short manifesto</p>
          <p className="mt-6 font-serif text-3xl leading-[1.25] md:text-5xl">
            I don't believe in silver bullets. I believe in the thousand small
            choices a body makes in a week — the eggs, the salt, the water, the
            sleep, the sun, the way the dirt was managed three counties over
            before the carrot reached your plate.
          </p>
          <p className="mt-8 label-mono text-bone/60">— Regeneralive</p>
        </div>
      </section>

      <section className="container-x py-24 text-center">
        <h2 className="font-serif display-3 text-ink">Have a question?</h2>
        <p className="mt-4 text-ink/65">
          Press, partnerships, product pitches — every email gets read.
        </p>
        <Link href="/contact" className="mt-8 btn-primary">
          Get in touch
        </Link>
      </section>
    </>
  );
}