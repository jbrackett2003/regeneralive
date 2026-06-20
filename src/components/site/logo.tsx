import Link from "next/link";

type LogoVariant = "light" | "dark";

export function Logo({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: LogoVariant;
}) {
  // light = on a light background (bone): moss circle, ink wordmark, moss "live"
  // dark  = on a dark background (moss-deep): bone circle w/ moss icon, bone wordmark, lichen "live"
  const isDark = variant === "dark";

  const circleClasses = isDark
    ? "bg-bone text-moss-deep"
    : "bg-moss text-bone";

  const wordmarkClasses = isDark ? "text-bone" : "text-ink";
  const accentClasses = isDark ? "italic text-lichen" : "italic text-moss";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 ${className}`}
      aria-label="Regeneralive home"
    >
      <span
        className={`relative grid h-8 w-8 place-items-center rounded-full transition-transform group-hover:rotate-12 ${circleClasses}`}
      >
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
      <span
        className={`font-serif text-[1.35rem] leading-none tracking-[-0.02em] ${wordmarkClasses}`}
      >
        regenera<span className={accentClasses}>live</span>
      </span>
    </Link>
  );
}