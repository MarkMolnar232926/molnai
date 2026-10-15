"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Lightweight scroll reveal (IntersectionObserver + CSS) so most sections ship no animation library.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  y = 24,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translate3d(0, ${y}px, 0)`,
        transition: `opacity 0.9s var(--ease-out-expo) ${delay}ms, transform 0.9s var(--ease-out-expo) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
