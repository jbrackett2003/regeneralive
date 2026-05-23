import Link from "next/link";
import {
  clicksLastNDays,
  totalClicks,
  listNewsletterSignups,
  listContactMessages,
  listProducts,
  listArticles,
  getProductBySlug,
} from "@/lib/repos";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const products = listProducts({ includeHidden: true });
  const articles = listArticles({ includeHidden: true });
  const subs = listNewsletterSignups();
  const msgs = listContactMessages();
  const clicks7 = totalClicks(7);
  const clicks30 = totalClicks(30);
  const topClicks7 = clicksLastNDays(7).slice(0, 8);
  const unreadMsgs = msgs.filter((m) => !m.read_at).length;

  const stats = [
    { label: "Total products", value: products.length, href: "/admin/products" },
    { label: "Hidden", value: products.filter((p) => (p as any).isHidden).length, href: "/admin/products" },
    { label: "Articles", value: articles.length, href: "/admin/articles" },
    { label: "Subscribers", value: subs.length, href: "/admin/messages" },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-mono text-ink/60">Dashboard</p>
          <h1 className="mt-2 font-serif text-5xl text-ink leading-none">
            Welcome back
          </h1>
          <p className="mt-3 text-sm text-ink/60">
            Here's what's happening on your site.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/products/new"
            className="rounded-full bg-ink px-5 py-2.5 text-sm text-bone hover:bg-moss-deep transition"
          >
            + Add product
          </Link>
          <Link
            href="/admin/promotions/new"
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm hover:bg-ink/5"
          >
            + New promotion
          </Link>
          <Link
            href="/admin/articles/new"
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm hover:bg-ink/5"
          >
            + New article
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-ink/10 bg-white p-6 hover:border-ink/30 transition group"
          >
            <p className="label-mono text-ink/60 text-xs">{s.label}</p>
            <p className="mt-3 font-serif text-4xl text-ink">{s.value}</p>
          </Link>
        ))}
      </div>

      {/* Click analytics + Recent messages */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-ink/10 bg-white p-8">
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl text-ink">Affiliate clicks</h2>
              <p className="text-sm text-ink/60 mt-1">
                Where your traffic is converting
              </p>
            </div>
            <div className="text-right">
              <p className="font-serif text-3xl text-ink">{clicks7}</p>
              <p className="label-mono text-ink/60 text-xs">last 7 days</p>
              <p className="mt-2 text-xs text-ink/50">
                {clicks30} in last 30
              </p>
            </div>
          </div>
          {topClicks7.length === 0 ? (
            <p className="text-sm text-ink/50 italic py-8 text-center">
              No clicks yet in the last 7 days. Clicks will appear here once visitors start using your affiliate links.
            </p>
          ) : (
            <ul className="divide-y divide-ink/10">
              {topClicks7.map((c) => {
                const p = getProductBySlug(c.product_slug);
                return (
                  <li
                    key={c.product_slug}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <Link
                        href={`/product/${c.product_slug}`}
                        target="_blank"
                        className="text-sm text-ink hover:underline"
                      >
                        {p?.name || c.product_slug}
                      </Link>
                      <p className="text-xs text-ink/50">
                        {p?.brand}
                      </p>
                    </div>
                    <span className="font-mono text-sm text-ink/70">
                      {c.clicks} {c.clicks === 1 ? "click" : "clicks"}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-ink/10 bg-white p-8">
          <h2 className="font-serif text-2xl text-ink">Messages</h2>
          <p className="text-sm text-ink/60 mt-1">
            Contact form inquiries
          </p>
          <p className="mt-6 font-serif text-4xl text-ink">{msgs.length}</p>
          <p className="label-mono text-ink/60 text-xs">total</p>
          {unreadMsgs > 0 && (
            <p className="mt-2 text-sm text-clay">
              {unreadMsgs} unread
            </p>
          )}
          <Link
            href="/admin/messages"
            className="mt-6 inline-block text-sm text-ink underline-offset-4 hover:underline"
          >
            View all messages →
          </Link>
        </div>
      </div>
    </div>
  );
}