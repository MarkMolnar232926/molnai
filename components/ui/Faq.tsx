import { Plus } from "lucide-react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-3xl bg-white px-6">
      {items.map((it) => (
        <details key={it.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
            {it.q}
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper transition-transform duration-300 group-open:rotate-45">
              <Plus className="h-4 w-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-muted">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
