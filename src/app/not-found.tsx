import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-narrow py-32 text-center">
      <p className="eyebrow">404 · Off the trail</p>
      <h1 className="mt-4 font-serif display-2 text-ink">
        We can't find <span className="italic text-moss">that.</span>
      </h1>
      <p className="mt-5 text-lg text-ink/65">
        The page you were looking for has been moved, or never existed. Find
        your way back below.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Back to home</Link>
        <Link href="/shop" className="btn-secondary">Browse the shop</Link>
      </div>
    </section>
  );
}