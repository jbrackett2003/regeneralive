import Link from "next/link";
import { headers } from "next/headers";
import { LogoutButton } from "./_components/logout-button";

export const metadata = {
  title: "Admin · Regeneralive",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/content", label: "Text snippets" },
  { href: "/admin/promotions", label: "Promotions" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // login page renders without the admin chrome
  const hdrs = await headers();
  const path = hdrs.get("x-pathname") || "";
  const adminName = process.env.ADMIN_NAME || "Admin";

  if (path === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#fafaf7] text-ink">
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-bone/95 backdrop-blur">
        <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-serif text-2xl text-ink">
              Regeneralive <span className="text-ink/40">/ Admin</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1.5 rounded-md text-sm text-ink/70 hover:bg-ink/5 hover:text-ink transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-ink/60 hover:text-ink"
            >
              View site ↗
            </Link>
            <span className="text-sm text-ink/60 hidden md:inline">
              {adminName}
            </span>
            <LogoutButton />
          </div>
        </div>
        {/* Mobile nav */}
        <nav className="md:hidden border-t border-ink/10 px-4 py-2 flex items-center gap-1 overflow-x-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2.5 py-1 rounded text-xs text-ink/70 hover:bg-ink/5 whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-[1400px] px-6 py-10">{children}</main>
    </div>
  );
}