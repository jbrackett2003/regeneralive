"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { HeaderShopMenu } from "./header-shop-menu";

interface CategoryItem {
  slug: string;
  name: string;
  emoji?: string;
}

const otherNav = [
  { href: "/journal", label: "Journal" },
  { href: "/quiz", label: "Quiz" },
  { href: "/about", label: "About" },
];

export function Header({ categories }: { categories: CategoryItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const shopActive = pathname.startsWith("/shop") || pathname.startsWith("/category");

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
          <HeaderShopMenu categories={categories} active={shopActive} />
          {otherNav.map((n) => {
            const active = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative text-sm font-medium transition-colors ${
                  active ? "text-ink" : "text-ink/65 hover:text-ink"
                }`}
              >
                {n.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-moss transition-transform duration-500 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
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
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-bone md:hidden">
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
          <nav className="container-x flex flex-col gap-1 pb-20 pt-6">
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between border-b border-ink/10 py-5 font-serif text-3xl ${
                shopActive ? "text-moss italic" : "text-ink"
              }`}
            >
              Shop all
            </Link>

            <p className="label-mono mt-4 text-ink/45">Categories</p>
            <div className="grid grid-cols-2 gap-1">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-2 py-3 text-base text-ink/80 hover:bg-bone-2"
                >
                  {c.emoji && <span>{c.emoji}</span>}
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>

            {otherNav.map((n) => {
              const active = isActive(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`mt-1 flex items-center justify-between border-b border-ink/10 py-5 font-serif text-3xl ${
                    active ? "text-moss italic" : "text-ink"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
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