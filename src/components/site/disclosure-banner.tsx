"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "regeneralive_disclosure_dismissed";

export function DisclosureBanner() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) setHidden(false);
  }, []);

  if (hidden) return null;

  return (
    <div className="relative z-50 bg-moss text-bone">
      <div className="container-x flex items-center justify-between gap-4 py-2 text-[12px]">
        <p className="flex-1 text-center md:text-left">
          <span className="label-mono mr-2 hidden text-bone/70 md:inline">
            Note ·
          </span>
          Some links earn us a commission — we only recommend products we'd give
          to family.{" "}
          <Link
            href="/disclosure"
            className="underline decoration-bone/40 underline-offset-4 hover:decoration-bone"
          >
            Learn how this works →
          </Link>
        </p>
        <button
          type="button"
          aria-label="Dismiss disclosure banner"
          onClick={() => {
            sessionStorage.setItem(STORAGE_KEY, "1");
            setHidden(true);
          }}
          className="shrink-0 rounded-full p-1 transition-colors hover:bg-bone/10"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}