import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/data/articles";

export const metadata = {
  title: "Journal · Long reads on living regeneratively",
  description:
    "Editorial guides, reviews, and field reports on regenerative food, supplements, and wellness.",
};

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const sp = await searchParams;
  const articles = getAllArticles();
  let list = [...articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
  if (sp.tag) list = list.filter((a) => a.tags.includes(sp.tag!));

  const featured = list[0];
  const rest = list.slice(1);

  const allTags = Array.from(new Set(articles.flatMap((a) => a.tags))).sort();

  return (
    <>
      <section className="container-x pt-16 md:pt-24">
        <p className="eyebrow">The journal</p>
        <h1 className="mt-4 font-serif display-2 text-ink">
          Long reads on the things <br />
          that <span className="italic text-moss">actually</span> matter.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink/65">
          Editorial deep-dives, ingredient explainers, and field reports from
          farms, founders, and our own kitchen.
        </p>

        {/* Tags */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-ink/10 pb-10">
          <Link
            href="/journal"
            className={`rounded-full border px-4 py-1.5 text-xs ${
              !sp.tag
                ? "border-ink bg-ink text-bone"
                : "border-ink/15 text-ink/70 hover:border-ink"
            }`}
          >
            All
          </Link>
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/journal?tag=${t}`}
              className={`rounded-full border px-4 py-1.5 text-xs capitalize ${
                sp.tag === t
                  ? "border-ink bg-ink text-bone"
                  : "border-ink/15 text-ink/70 hover:border-ink"
              }`}
            >
              {t}
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x py-16">
        {featured && (
          <Link href={`/journal/${featured.slug}`} className="group block mb-20">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:col-span-7">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center lg:col-span-5">
                <p className="label-mono text-clay">Featured</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-ink transition-colors group-hover:text-moss md:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-5 text-lg text-ink/70 leading-relaxed">
                  {featured.dek}
                </p>
                <p className="mt-6 text-sm text-ink/55">
                  {featured.author} · {featured.readTime} min read
                </p>
              </div>
            </div>
          </Link>
        )}

        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <Link
              key={a.id}
              href={`/journal/${a.slug}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={a.coverImage}
                  alt={a.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="label-mono mt-5 text-ink/50">
                {a.tags[0]} · {a.readTime} min
              </p>
              <h3 className="mt-2 font-serif text-2xl leading-tight text-ink transition-colors group-hover:text-moss">
                {a.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm text-ink/65">{a.dek}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}