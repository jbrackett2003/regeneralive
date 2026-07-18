"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HeaderShopMenu } from "./header-shop-menu";
import { Logo } from "./logo";

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
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname intentionally triggers menu closure after navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const shopActive =
    pathname.startsWith("/shop") || pathname.startsWith("/category");

  return (
    <header
      className={`sticky top-0 transition-all duration-300 ${open ? "z-[70]" : "z-40"} ${
        scrolled
          ? "bg-bone/85 backdrop-blur-md border-b border-ink/10"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex xl:gap-10">
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

        <div className="hidden items-center gap-2 md:flex">
          <form
            action="/shop"
            method="get"
            className="hidden w-[min(30vw,21rem)] items-center rounded-full border border-ink/15 bg-bone/70 p-1.5 shadow-[0_8px_20px_rgba(28,26,20,0.04)] transition-all focus-within:border-moss focus-within:bg-bone focus-within:ring-2 focus-within:ring-moss/20 lg:flex"
          >
            <Search className="ml-3 h-4 w-4 shrink-0 text-moss" aria-hidden="true" />
            <label htmlFor="header-product-search" className="sr-only">
              Search products
            </label>
            <input
              id="header-product-search"
              name="q"
              type="search"
              placeholder="Search products"
              className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm text-ink outline-none placeholder:text-ink/45"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-4 py-1.5 text-xs font-medium text-bone transition-colors hover:bg-moss"
            >
              Search
            </button>
          </form>
          <Link
            href="/shop"
            aria-label="Search products"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-ink/15 px-4 text-sm font-medium text-ink transition-colors hover:border-moss hover:text-moss focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/45 lg:hidden"
          >
            <Search className="h-4 w-4" />
            Search
          </Link>
          <Link href="/#newsletter" className="btn-primary !py-2 !px-5">
            Subscribe
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/shop"
            aria-label="Search products"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink"
          >
            <Search className="h-5 w-5" />
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            className="rounded-full border border-ink/15 p-2"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
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
            <form action="/shop" method="get" className="mb-5">
              <label
                htmlFor="mobile-product-search"
                className="label-mono mb-2 block text-ink/50"
              >
                Search products
              </label>
              <div className="flex items-center rounded-full border border-ink/15 bg-white/50 p-1.5 focus-within:border-moss focus-within:ring-2 focus-within:ring-moss/20">
                <Search
                  className="ml-3 h-4 w-4 shrink-0 text-moss"
                  aria-hidden="true"
                />
                <input
                  id="mobile-product-search"
                  name="q"
                  type="search"
                  placeholder="Product, brand, ingredient…"
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-ink outline-none placeholder:text-ink/40"
                />
                <button
                  type="submit"
                  className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-bone"
                >
                  Search
                </button>
              </div>
            </form>
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
