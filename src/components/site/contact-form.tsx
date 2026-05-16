"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.ok) {
        setState("ok");
        setMsg("Got it — we'll respond within two business days.");
      } else {
        setState("error");
        setMsg(json.error || "Something went wrong.");
      }
    } catch {
      setState("error");
      setMsg("Network error. Try again.");
    }
  }

  const inputBase =
    "w-full rounded-xl border border-ink/15 bg-bone px-4 py-3 text-sm placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-moss/40";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Your name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputBase}
        />
        <input
          type="email"
          placeholder="your@email.com"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputBase}
        />
      </div>
      <select
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
        className={inputBase}
      >
        <option value="general">General question</option>
        <option value="press">Press / media</option>
        <option value="partnership">Brand partnership</option>
        <option value="suggestion">Product suggestion</option>
      </select>
      <textarea
        placeholder="Tell us what's on your mind…"
        required
        rows={6}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className={`${inputBase} resize-y`}
      />
      <button
        type="submit"
        disabled={state === "loading" || state === "ok"}
        className="btn-primary w-full sm:w-auto"
      >
        {state === "ok" ? (
          <>
            <Check className="h-4 w-4" /> Sent
          </>
        ) : state === "loading" ? (
          "Sending…"
        ) : (
          <>
            Send message
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      {msg && (
        <p
          className={`text-sm ${
            state === "error" ? "text-clay" : "text-moss"
          }`}
        >
          {msg}
        </p>
      )}
    </form>
  );
}