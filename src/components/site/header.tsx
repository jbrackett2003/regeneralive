"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-bone/85 backdrop-blur-md border-b border-ink/10"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Logo />

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="link-underline text-sm font-medium text-ink/80 transition-colors hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Link href="/#newsletter" className="btn-primary !py-2 !px-5">
            Subscribe
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden rounded-full border border-ink/15 p-2"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-bone md:hidden">
          <div className="container-x flex h-16 items-center justify-between">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              className="rounded-full border border-ink/15 p-2"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="container-x flex flex-col gap-2 pt-8">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/10 py-5 font-serif text-3xl text-ink"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/#newsletter"
              onClick={() => setOpen(false)}
              className="mt-8 btn-primary justify-center !py-4 text-base"
            >
              Subscribe
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}