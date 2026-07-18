"use client";

import { useState } from "react";
import type { ContentBlock } from "@/lib/repos";

export function ContentBlockEditor({ block }: { block: ContentBlock }) {
  const [value, setValue] = useState(block.value);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const isLong = value.length > 80 || block.kind !== "text";
  const isModified = block.defaultValue !== null && value !== block.defaultValue;
  const isDirty = value !== block.value;

  async function save() {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ key: block.key, value }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || "Save failed");
        return;
      }
      setSavedAt(new Date().toLocaleTimeString());
    } catch (e: any) {
      setErr(e?.message || "Network error");
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    if (
      !confirm(
        `Reset "${block.key}" back to the default text?`
      )
    )
      return;
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "reset", key: block.key }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || "Reset failed");
        return;
      }
      if (block.defaultValue !== null) setValue(block.defaultValue);
      setSavedAt(new Date().toLocaleTimeString());
    } catch (e: any) {
      setErr(e?.message || "Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border border-ink/10 bg-white p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
        <div className="min-w-0">
          <p className="text-sm text-ink font-medium">
            {block.label || block.key}
          </p>
          <p className="text-xs text-ink/40 font-mono truncate">{block.key}</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          {isModified && (
            <span className="px-2 py-0.5 rounded bg-sun/40 text-soil">
              Edited
            </span>
          )}
          {block.kind !== "text" && (
            <span className="px-2 py-0.5 rounded bg-ink/10 text-ink/70 font-mono">
              {block.kind}
            </span>
          )}
        </div>
      </div>

      {isLong ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={Math.min(8, Math.max(2, Math.ceil(value.length / 80)))}
          className="input font-sans text-sm"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input font-sans text-sm"
        />
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-ink/50">
          {savedAt && <span className="text-moss-deep">Saved {savedAt}</span>}
          {err && <span className="text-red-700">{err}</span>}
          {!savedAt && !err && block.defaultValue !== null && (
            <span title={block.defaultValue}>
              Default:{" "}
              <span className="font-mono text-ink/40">
                {block.defaultValue.slice(0, 60)}
                {block.defaultValue.length > 60 ? "…" : ""}
              </span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isModified && (
            <button
              type="button"
              onClick={reset}
              disabled={busy}
              className="text-xs text-ink/60 hover:text-ink underline-offset-4 hover:underline disabled:opacity-50"
            >
              Reset to default
            </button>
          )}
          <button
            type="button"
            onClick={save}
            disabled={busy || !isDirty}
            className="rounded-md bg-ink text-bone px-4 py-1.5 text-sm hover:bg-moss-deep transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}