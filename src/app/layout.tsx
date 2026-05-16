import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { DisclosureBanner } from "@/components/site/disclosure-banner";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://regeneralive.com"),
  title: {
    default: "Regeneralive — Eat like the soil is alive.",
    template: "%s · Regeneralive",
  },
  description:
    "A curated guide to regenerative organic foods, the world's best supplements, and wellness products that heal both body and soil.",
  openGraph: {
    title: "Regeneralive — Eat like the soil is alive.",
    description:
      "Regenerative organic foods, top supplements, and wellness products — independently reviewed.",
    siteName: "Regeneralive",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrains.variable}`}
    >
      <body suppressHydrationWarning className="antialiased">
        <DisclosureBanner />
        <Header />
        <main className="relative z-[2]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}