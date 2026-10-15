import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/thera-team-logo.png";

/**
 * The official Thera-Team logo. On dark backgrounds it sits on a white tile,
 * because the blue wordmark is not legible on navy.
 */
export function Logo({
  dark = false,
  size = "md",
  priority = false,
  className = "",
}: {
  dark?: boolean;
  size?: "md" | "lg";
  /** Only the header logo is above the fold. */
  priority?: boolean;
  className?: string;
}) {
  const img = size === "lg" ? "h-24 w-24" : "h-[52px] w-[52px] sm:h-[60px] sm:w-[60px]";
  return (
    <Link href="/" className={`group inline-flex shrink-0 items-center gap-3 ${className}`}>
      <span className={dark ? "rounded-2xl bg-white p-2 shadow-sm" : undefined}>
        <Image src={logo} alt="Thera-Team" priority={priority} className={`${img} object-contain`} sizes={size === "lg" ? "96px" : "60px"} />
      </span>
      <span className="sr-only"> – főoldal</span>
      <span
        className={`hidden rounded-full px-2.5 py-1 text-[0.7rem] font-bold leading-none md:inline ${
          dark ? "bg-white/10 text-brand-lime" : "bg-brand-green/10 text-brand-green-dark"
        }`}
        aria-hidden="true"
      >
        30 év
      </span>
    </Link>
  );
}
