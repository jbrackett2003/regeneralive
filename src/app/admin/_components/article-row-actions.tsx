"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export function ArticleRowActions({
  id,
  slug,
  isHidden,
}: {
  id: string;
  slug: string;
  isHidden: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function call(action: string, confirmText?: string) {
    if (confirmText && !confirm(confirmText)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Action failed");
      } else {
        router.refresh();
      }
    } finally {
      setBusy(false);
      setOpen(false);
    }
  }

  return (
    <div className="relative inline-flex items-center gap-1">
      <Link
        href={`/admin/articles/${id}/edit`}
        className="px-3 py-1.5 rounded-md border border-ink/15 text-xs hover:bg-ink/5"
      >
        Edit
      </Link>
      <button
        onClick={() => setOpen(!open)}
        disabled={busy}
        className="px-2 py-1.5 rounded-md border border-ink/15 text-xs hover:bg-ink/5"
      >
        ⋯
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 w-44 rounded-lg border border-ink/15 bg-white shadow-lg overflow-hidden">
            <Link
              href={`/journal/${slug}`}
              target="_blank"
              className="block px-3 py-2 text-xs hover:bg-ink/5"
            >
              View on site ↗
            </Link>
            <button
              onClick={() => call(isHidden ? "show" : "hide")}
              className="w-full text-left px-3 py-2 text-xs hover:bg-ink/5"
            >
              {isHidden ? "Show on site" : "Hide from site"}
            </button>
            <button
              onClick={() => call("delete", "Delete this article permanently?")}
              className="w-full text-left px-3 py-2 text-xs text-red-700 hover:bg-red-50 border-t border-ink/10"
            >
              Delete permanently
            </button>
          </div>
        </>
      )}
    </div>
  );
}