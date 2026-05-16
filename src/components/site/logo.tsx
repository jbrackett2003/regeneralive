import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 ${className}`}
      aria-label="Regeneralive home"
    >
      <span className="relative grid h-8 w-8 place-items-center rounded-full bg-moss text-bone transition-transform group-hover:rotate-12">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4"
          aria-hidden="true"
        >
          {/* sprouting leaf mark */}
          <path
            d="M12 21V12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M12 12C12 8 9 5 5 5C5 9 8 12 12 12Z"
            fill="currentColor"
          />
          <path
            d="M12 14C12 11 14.5 8.5 18.5 8.5C18.5 12 16 14 12 14Z"
            fill="currentColor"
            opacity="0.7"
          />
        </svg>
      </span>
      <span className="font-serif text-[1.35rem] leading-none tracking-[-0.02em] text-ink">
        regenera<span className="italic text-moss">live</span>
      </span>
    </Link>
  );
}