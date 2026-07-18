import { listContentBlocks } from "@/lib/repos";
import { ContentBlockEditor } from "../_components/content-block-editor";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const blocks = listContentBlocks();
  // Group by page bucket
  const groups = new Map<string, typeof blocks>();
  for (const b of blocks) {
    const p = b.page || "misc";
    if (!groups.has(p)) groups.set(p, []);
    groups.get(p)!.push(b);
  }
  const groupOrder = [
    "global",
    "home",
    "shop",
    "footer",
    "header",
    "about",
    "methodology",
    "our-standards",
    "disclosure",
    "contact",
    "misc",
  ];
  const sortedGroups = Array.from(groups.entries()).sort(
    ([a], [b]) =>
      (groupOrder.indexOf(a) === -1 ? 999 : groupOrder.indexOf(a)) -
      (groupOrder.indexOf(b) === -1 ? 999 : groupOrder.indexOf(b))
  );

  return (
    <div className="space-y-8">
      <div>
        <p className="label-mono text-ink/60">Content</p>
        <h1 className="mt-2 font-serif text-4xl text-ink leading-none">
          Text snippets <span className="text-ink/40">({blocks.length})</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-ink/70 leading-relaxed">
          Edit individual text strings used throughout the site — headlines,
          taglines, captions, button labels. Long-form pages (About,
          Methodology, etc.) live in{" "}
          <a href="/admin/pages" className="text-moss-deep underline">
            Pages
          </a>
          . Changes go live instantly — no deploy needed.
        </p>
      </div>

      {blocks.length === 0 && (
        <div className="rounded-2xl border border-ink/10 bg-white p-12 text-center">
          <p className="text-ink/70">
            No editable text blocks have been registered yet.
          </p>
          <p className="mt-2 text-sm text-ink/50">
            Blocks register themselves on first page render. Visit the public
            site once, then come back.
          </p>
        </div>
      )}

      {sortedGroups.map(([page, list]) => (
        <section key={page} className="space-y-3">
          <h2 className="font-serif text-2xl text-ink capitalize">
            {page.replace(/-/g, " ")}{" "}
            <span className="text-ink/40 text-base">({list.length})</span>
          </h2>
          <div className="space-y-3">
            {list.map((block) => (
              <ContentBlockEditor key={block.key} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}