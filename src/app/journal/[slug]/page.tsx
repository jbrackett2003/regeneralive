import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/data/articles";
import { getProductBySlug } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Markdown } from "@/lib/markdown";
import { ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/site/section";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  if (!a) return { title: "Article not found" };
  return {
    title: a.title,
    description: a.dek,
    openGraph: { images: [{ url: a.coverImage }] },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  if (!a) notFound();

  const related = (a.relatedProductSlugs || [])
    .map((s) => getProductBySlug(s))
    .filter(Boolean);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.dek,
    image: [a.coverImage],
    datePublished: a.publishedAt,
    dateModified: a.publishedAt,
    author: {
      "@type": "Person",
      name: a.author,
      jobTitle: a.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Regeneralive",
      logo: {
        "@type": "ImageObject",
        url: "https://regeneralive.com/icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://regeneralive.com/journal/${a.slug}`,
    },
    keywords: a.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article>
        <div className="container-x pt-10">
          <nav className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-xs text-ink/50">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/journal" className="hover:text-ink">
              Journal
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="line-clamp-1 text-ink">{a.title}</span>
          </nav>
        </div>

        <header className="container-narrow py-12 text-center md:py-20">
          <p className="label-mono text-clay">
            {a.tags[0]} · {a.readTime} min read
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.05] text-ink md:text-6xl">
            {a.title}
          </h1>
          <p className="mt-6 text-xl text-ink/65 leading-relaxed">{a.dek}</p>
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-ink/55">
            <span className="font-medium text-ink">{a.author}</span>
            <span>·</span>
            <span>{a.authorRole}</span>
            <span>·</span>
            <time dateTime={a.publishedAt}>
              {new Date(a.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </header>

        <div className="container-x">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image
              src={a.coverImage}
              alt={a.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="container-narrow py-16 text-lg">
          <Markdown source={a.body} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-bone-2/30 py-24">
          <div className="container-x">
            <SectionHeader
              eyebrow="Featured in this article"
              title={
                <>
                  Products we mention <span className="italic text-moss">above.</span>
                </>
              }
            />
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p!.id} product={p!} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}