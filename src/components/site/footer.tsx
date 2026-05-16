import Link from "next/link";
import { Logo } from "./logo";
import { NewsletterForm } from "./newsletter-form";
import { categories } from "@/data/categories";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-[2] mt-32 bg-moss-deep text-bone">
      <div className="container-x py-20">
        {/* Newsletter row */}
        <div
          id="newsletter"
          className="grid gap-8 border-b border-bone/10 pb-16 md:grid-cols-2 md:gap-16"
        >
          <div>
            <p className="label-mono text-bone/60">The dispatch</p>
            <h3 className="mt-3 font-serif text-4xl leading-[1.05] md:text-5xl">
              One thoughtful email,
              <br />
              <span className="italic text-lichen">every other Sunday.</span>
            </h3>
            <p className="mt-4 max-w-md text-bone/70">
              New product reviews, deep-dive guides, and the occasional honest
              opinion about something we tried and didn't love. No spam, ever.
            </p>
          </div>
          <div className="flex items-end">
            <div className="w-full">
              <NewsletterForm source="footer" variant="light" />
              <p className="mt-3 text-xs text-bone/50">
                We'll never share your email. Unsubscribe in one click.
              </p>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-12 py-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Logo className="text-bone [&_span:last-child]:!text-bone [&_span:first-child]:!bg-bone [&_span:first-child]:!text-moss-deep" />
            <p className="mt-5 max-w-sm font-serif text-2xl italic leading-snug text-bone/90">
              Eat like the soil is alive.
            </p>
            <p className="mt-4 max-w-sm text-sm text-bone/60">
              An independent guide to regenerative organic foods, premium
              supplements, and wellness products that earn their place on your
              shelf.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-full border border-bone/20 transition-colors hover:bg-bone hover:text-moss-deep"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@regeneralive.com"
                aria-label="Email"
                className="grid h-9 w-9 place-items-center rounded-full border border-bone/20 transition-colors hover:bg-bone hover:text-moss-deep"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="md:col-span-2">
            <h4 className="label-mono mb-4 text-bone/60">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/shop" className="link-underline">
                  All products
                </Link>
              </li>
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="link-underline text-bone/80 hover:text-bone"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="label-mono mb-4 text-bone/60">Read</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/journal" className="link-underline">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/journal?tag=guide" className="link-underline text-bone/80 hover:text-bone">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/journal?tag=supplements" className="link-underline text-bone/80 hover:text-bone">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="label-mono mb-4 text-bone/60">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="link-underline text-bone/80 hover:text-bone">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-underline text-bone/80 hover:text-bone">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-underline text-bone/80 hover:text-bone">
                  Partner with us
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="label-mono mb-4 text-bone/60">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/disclosure" className="link-underline text-bone/80 hover:text-bone">
                  Affiliate disclosure
                </Link>
              </li>
              <li>
                <Link href="/disclosure#privacy" className="link-underline text-bone/80 hover:text-bone">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/disclosure#terms" className="link-underline text-bone/80 hover:text-bone">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline !bg-bone/10" />
        <div className="flex flex-col items-start justify-between gap-3 pt-8 text-xs text-bone/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Regeneralive. Independently published.</p>
          <p className="label-mono text-[10px] tracking-[0.2em]">
            Made with care · soil-first · reader-supported
          </p>
        </div>
      </div>
    </footer>
  );
}