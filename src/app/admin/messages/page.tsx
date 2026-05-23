import Link from "next/link";
import { listNewsletterSignups, listContactMessages } from "@/lib/repos";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const subs = listNewsletterSignups();
  const msgs = listContactMessages();

  return (
    <div className="space-y-12">
      <div>
        <p className="label-mono text-ink/60">Inbox</p>
        <h1 className="mt-2 font-serif text-4xl text-ink leading-none">
          Messages & subscribers
        </h1>
      </div>

      {/* Contact messages */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-serif text-2xl text-ink">
            Contact messages <span className="text-ink/40">({msgs.length})</span>
          </h2>
        </div>
        {msgs.length === 0 ? (
          <p className="rounded-2xl border border-ink/10 bg-white p-8 text-center text-ink/50 text-sm">
            No messages yet. Inquiries from the contact form will appear here.
          </p>
        ) : (
          <div className="space-y-3">
            {msgs.map((m) => (
              <details
                key={m.id}
                className={`rounded-2xl border bg-white px-6 py-4 ${
                  m.read_at ? "border-ink/10" : "border-clay/40 bg-clay/5"
                }`}
              >
                <summary className="cursor-pointer flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">
                      {m.name}
                      {!m.read_at && (
                        <span className="ml-2 text-xs uppercase tracking-wider text-clay font-medium">
                          New
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-ink/60">
                      <a href={`mailto:${m.email}`} className="hover:underline">
                        {m.email}
                      </a>
                      {m.subject && <> · {m.subject}</>}
                    </p>
                  </div>
                  <p className="text-xs text-ink/50">
                    {new Date(m.created_at).toLocaleString()}
                  </p>
                </summary>
                <div className="mt-4 pt-4 border-t border-ink/10 text-sm text-ink/80 whitespace-pre-wrap">
                  {m.message}
                </div>
              </details>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter signups */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-serif text-2xl text-ink">
            Newsletter subscribers <span className="text-ink/40">({subs.length})</span>
          </h2>
          {subs.length > 0 && (
            <a
              href={`data:text/csv;charset=utf-8,${encodeURIComponent(
                "email,signed_up_at\n" +
                  subs.map((s) => `${s.email},${s.created_at}`).join("\n")
              )}`}
              download="regeneralive-subscribers.csv"
              className="text-xs px-3 py-1.5 rounded-md border border-ink/15 hover:bg-ink/5"
            >
              Export CSV ↓
            </a>
          )}
        </div>
        {subs.length === 0 ? (
          <p className="rounded-2xl border border-ink/10 bg-white p-8 text-center text-ink/50 text-sm">
            No subscribers yet. Newsletter signups from the homepage and footer will appear here.
          </p>
        ) : (
          <div className="rounded-2xl border border-ink/10 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-ink/[0.03] text-ink/70">
                <tr>
                  <th className="text-left font-medium px-4 py-3">Email</th>
                  <th className="text-right font-medium px-4 py-3">Signed up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {subs.map((s) => (
                  <tr key={s.id}>
                    <td className="px-4 py-3 font-mono text-xs">{s.email}</td>
                    <td className="px-4 py-3 text-right text-xs text-ink/60">
                      {new Date(s.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}