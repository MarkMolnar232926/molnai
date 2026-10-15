import Link from "next/link";

/**
 * Placeholder wordmark for the concept. Replace with the client's real logo.
 */
export function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Thera-Team – vissza a főoldalra"
    >
      <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ink">
        <span className="absolute inset-x-0 bottom-0 h-1.5 bg-spectrum" />
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
          <path d="M5 11c6-5 16-5 22 0" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M16 11v15" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
        </svg>
      </span>
      <span className={`whitespace-nowrap font-display text-[1.35rem] font-extrabold tracking-tight ${dark ? "text-white" : "text-ink"}`}>
        Thera<span className="text-r-red">-</span>Team
      </span>
      <span
        className="rounded-full bg-r-gold px-1.5 py-0.5 text-[0.625rem] font-bold leading-none tracking-wide text-ink"
        title="30 éves jubileum"
      >
        30
      </span>
    </Link>
  );
}
