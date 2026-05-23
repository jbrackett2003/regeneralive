"use client";

import { useState } from "react";

export function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (next.length < 10) {
      setMsg({ type: "err", text: "New password must be at least 10 characters." });
      return;
    }
    if (next !== confirmPw) {
      setMsg({ type: "err", text: "Passwords don't match." });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ current, next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg({ type: "err", text: data.error || "Change failed" });
      } else {
        setMsg({ type: "ok", text: "Password updated. Use your new password next login." });
        setCurrent("");
        setNext("");
        setConfirmPw("");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-ink/10 bg-white p-6 space-y-4">
      <div>
        <h3 className="font-serif text-lg text-ink">Change password</h3>
        <p className="text-xs text-ink/50 mt-1">At least 10 characters.</p>
      </div>
      <div>
        <label className="label-mono text-ink/70 text-xs block mb-1.5">Current password</label>
        <input
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          required
          className="input"
        />
      </div>
      <div>
        <label className="label-mono text-ink/70 text-xs block mb-1.5">New password</label>
        <input
          type="password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          required
          minLength={10}
          className="input"
        />
      </div>
      <div>
        <label className="label-mono text-ink/70 text-xs block mb-1.5">Confirm new password</label>
        <input
          type="password"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          required
          className="input"
        />
      </div>
      {msg && (
        <p className={`text-sm ${msg.type === "ok" ? "text-moss-deep" : "text-red-700"}`}>
          {msg.text}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="rounded-full bg-ink text-bone px-5 py-2 text-sm hover:bg-moss-deep disabled:opacity-50"
      >
        {busy ? "Updating..." : "Update password"}
      </button>
      <style jsx global>{`
        .input { width: 100%; background: white; border: 1px solid rgba(0,0,0,0.15); border-radius: 0.5rem; padding: 0.6rem 0.85rem; font-size: 0.875rem; outline: none; }
        .input:focus { border-color: rgb(82 109 80); }
      `}</style>
    </form>
  );
}