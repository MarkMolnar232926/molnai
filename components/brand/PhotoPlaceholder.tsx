import { Camera } from "lucide-react";

/**
 * Intentional, art-directed slot for future photography.
 * The caption tells the client exactly which photo belongs here.
 */
export function PhotoPlaceholder({
  caption,
  tone = "#2563c9",
  className = "",
  dark = false,
}: {
  caption: string;
  tone?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <figure
      className={`relative isolate flex overflow-hidden rounded-[var(--radius-card)] ${className}`}
      style={{
        background: dark
          ? `radial-gradient(90% 80% at 80% 10%, color-mix(in oklab, ${tone} 45%, #0b1530), #0b1530 70%)`
          : `radial-gradient(90% 80% at 80% 10%, color-mix(in oklab, ${tone} 28%, #fff), color-mix(in oklab, ${tone} 8%, #efebe2) 70%)`,
      }}
    >
      <svg className="absolute inset-0 -z-10 h-full w-full opacity-[0.35]" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 400 300">
        <path d="M-20 220 C 80 120, 180 300, 420 140" fill="none" stroke={tone} strokeWidth="38" strokeLinecap="round" opacity=".35" />
        <path d="M-20 260 C 120 180, 220 320, 420 200" fill="none" stroke="#fff" strokeWidth="2" opacity=".6" />
      </svg>
      <figcaption
        className={`m-auto flex max-w-[85%] items-center gap-2 rounded-full px-4 py-2 text-center text-xs font-medium backdrop-blur ${
          dark ? "bg-white/10 text-white/85" : "bg-white/70 text-ink/75"
        }`}
      >
        <Camera className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>[Fotó: {caption}]</span>
      </figcaption>
    </figure>
  );
}
