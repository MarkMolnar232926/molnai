import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items, dark = false }: { items: { href?: string; label: string }[]; dark?: boolean }) {
  return (
    <nav aria-label="Morzsamenü" className="text-sm">
      <ol className={`flex flex-wrap items-center gap-1 ${dark ? "text-white/65" : "text-muted"}`}>
        <li>
          <Link href="/" className={dark ? "hover:text-white" : "hover:text-ink"}>
            Főoldal
          </Link>
        </li>
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
            {it.href ? (
              <Link href={it.href} className={dark ? "hover:text-white" : "hover:text-ink"}>
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? "text-white" : "text-ink"}>
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
