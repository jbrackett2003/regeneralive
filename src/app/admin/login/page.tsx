"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/admin";
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErr(data.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push(next);
      router.refresh();
    } catch (e: any) {
      setErr(e?.message || "Network error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bone flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="label-mono text-ink/60">Regeneralive</p>
          <h1 className="mt-3 font-serif text-4xl text-ink leading-none">
            Admin
          </h1>
          <p className="mt-3 text-sm text-ink/60">
            Sign in to manage your store
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label-mono text-ink/70 block mb-2">
              Password
            </label>
            <input
              type="password"
              autoFocus
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-moss"
              placeholder="Enter your admin password"
            />
          </div>
          {err && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
              {err}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-ink text-bone py-3 font-medium hover:bg-moss-deep transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-8 text-center text-xs text-ink/40">
          This is a private admin area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}