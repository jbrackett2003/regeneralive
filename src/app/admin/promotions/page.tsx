import Link from "next/link";
import { listPromotions } from "@/lib/repos";
import { PromotionRowActions } from "../_components/promotion-row-actions";

export const dynamic = "force-dynamic";

export default async function AdminPromotionsPage() {
  const promos = listPromotions();
  const now = new Date().toISOString();

  function status(p: typeof promos[0]): { label: string; cls: string } {
    if (!p.isActive) return { label: "Inactive", cls: "bg-ink/10 text-ink/60" };
    if (p.startsAt && p.startsAt > now) return { label: "Scheduled", cls: "bg-sun/30 text-soil" };
    if (p.endsAt && p.endsAt < now) return { label: "Expired", cls: "bg-ink/10 text-ink/60" };
    return { label: "Live", cls: "bg-moss/15 text-moss-deep" };
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-mono text-ink/60">Promotions</p>
          <h1 className="mt-2 font-serif text-4xl text-ink leading-none">
            Site banners & deals
          </h1>
          <p className="mt-3 text-sm text-ink/60 max-w-xl">
            Banners appear at the top of every page on the site during their active window. Only one runs at a time (the most recent active one wins).
          </p>
        </div>
        <Link
          href="/admin/promotions/new"
          className="rounded-full bg-ink px-5 py-2.5 text-sm text-bone hover:bg-moss-deep transition"
        >
          + New promotion
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-ink/[0.03] text-ink/70">
            <tr>
              <th className="text-left font-medium px-4 py-3">Label</th>
              <th className="text-left font-medium px-4 py-3 hidden md:table-cell">Message</th>
              <th className="text-left font-medium px-4 py-3 hidden lg:table-cell">Window</th>
              <th className="text-center font-medium px-4 py-3">Status</th>
              <th className="text-right font-medium px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {promos.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-ink/50">
                  No promotions yet. <Link href="/admin/promotions/new" className="underline">Create one</Link> to show a banner.
                </td>
              </tr>
            )}
            {promos.map((p) => {
              const st = status(p);
              return (
                <tr key={p.id} className="hover:bg-ink/[0.02]">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/promotions/${p.id}/edit`}
                      className="font-medium text-ink hover:underline"
                    >
                      {p.label}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-ink/80 text-xs hidden md:table-cell max-w-xs truncate">
                    {p.message}
                  </td>
                  <td className="px-4 py-3 text-ink/60 hidden lg:table-cell text-xs">
                    {p.startsAt ? new Date(p.startsAt).toLocaleDateString() : "—"} → {p.endsAt ? new Date(p.endsAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs ${st.cls}`}>
                      {st.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <PromotionRowActions id={p.id} isActive={p.isActive} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}