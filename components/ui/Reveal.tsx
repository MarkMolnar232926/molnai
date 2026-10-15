import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Scroll reveal in pure CSS (scroll-driven animations, see globals.css): no JavaScript, never hides
 * content before hydration, and browsers without support simply show the content.
 * `delay` (ms) staggers siblings by shifting their animation range slightly.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  return (
    <Tag data-reveal className={className} style={{ "--reveal-delay": `${Math.min(delay / 20, 20)}%` } as CSSProperties}>
      {children}
    </Tag>
  );
}
