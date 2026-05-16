"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm({
  source = "footer",
  variant = "default",
}: {
  source?: string;
  variant?: "default" | "light";
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const json = await res.json();
      if (json.ok) {
        setState("ok");
        setMsg("Welcome — check your inbox 🌱");
      } else {
        setState("error");
        setMsg(json.error || "Something went wrong.");
      }
    } catch {
      setState("error");
      setMsg("Network error. Try again.");
    }
  }

  const isLight = variant === "light";

  return (
    <form
      onSubmit={onSubmit}
      className={`relative flex w-full flex-col gap-3 sm:flex-row ${
        isLight ? "" : ""
      }`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        disabled={state === "ok"}
        className={`flex-1 rounded-full border px-5 py-3 text-sm placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-moss/50 ${
          isLight
            ? "border-bone/30 bg-bone/10 text-bone placeholder:text-bone/50"
            : "border-ink/15 bg-bone-2/40 text-ink"
        }`}
      />
      <button
        type="submit"
        disabled={state === "loading" || state === "ok"}
        className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all ${
          isLight
            ? "bg-bone text-ink hover:bg-bone/90"
            : "bg-ink text-bone hover:bg-moss"
        } ${state === "ok" ? "!bg-moss !text-bone" : ""}`}
      >
        {state === "ok" ? (
          <>
            <Check className="h-4 w-4" /> Subscribed
          </>
        ) : state === "loading" ? (
          "Joining…"
        ) : (
          <>
            Join the list
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
      {msg && (
        <p
          className={`absolute -bottom-6 left-2 text-xs ${
            state === "error"
              ? "text-clay"
              : isLight
                ? "text-bone/80"
                : "text-moss"
          }`}
        >
          {msg}
        </p>
      )}
    </form>
  );
}