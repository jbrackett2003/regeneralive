"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export function PromotionRowActions({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function call(action: string, confirmText?: string) {
    if (confirmText && !confirm(confirmText)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/promotions/${id}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Action failed");
      } else router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="inline-flex items-center gap-1.5">
      <Link
        href={`/admin/promotions/${id}/edit`}
        className="px-3 py-1.5 rounded-md border border-ink/15 text-xs hover:bg-ink/5"
      >
        Edit
      </Link>
      <button
        onClick={() => call(isActive ? "deactivate" : "activate")}
        disabled={busy}
        className="px-3 py-1.5 rounded-md border border-ink/15 text-xs hover:bg-ink/5"
      >
        {isActive ? "Pause" : "Activate"}
      </button>
      <button
        onClick={() => call("delete", "Delete this promotion?")}
        disabled={busy}
        className="px-3 py-1.5 rounded-md border border-red-200 text-xs text-red-700 hover:bg-red-50"
      >
        Delete
      </button>
    </div>
  );
}