"use client";

import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { useSpotlight } from "@/lib/useTilt";

/** Wraps content in an element with a soft, cursor-following glow (see `.spotlight` in globals.css). */
export function Spotlight({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: { as?: ElementType; className?: string; children: ReactNode } & HTMLAttributes<HTMLElement>) {
  const ref = useSpotlight<HTMLElement>();
  return (
    <Tag ref={ref} className={`spotlight ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
