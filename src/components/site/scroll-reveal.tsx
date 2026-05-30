"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Delay in ms before fade-in starts after entering viewport */
  delay?: number;
  /** Translate Y in px while hidden (default 24) */
  y?: number;
  /** Once true, never re-hide (default true) */
  once?: boolean;
  /** Threshold (0..1) of element visible to trigger */
  threshold?: number;
  className?: string;
  /** Render as: defaults to div */
  as?: "div" | "section" | "article" | "li";
}

/**
 * Lightweight scroll-triggered reveal. Uses IntersectionObserver to fade + slide
 * a child into view. No dependency on framer-motion to keep the bundle small.
 */
export function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  threshold = 0.12,
  className = "",
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, threshold]);

  const style: React.CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
    transition: `opacity 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms, transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms`,
    willChange: "opacity, transform",
  };

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}