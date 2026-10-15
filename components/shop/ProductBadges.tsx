import { discountPercent } from "@/lib/format";
import type { Product } from "@/lib/types";
import { fromPrice, isOnSale } from "@/data/products";

/** `compact` shows only the most important badge on small screens. */
export function ProductBadges({ product, compact = false }: { product: Product; compact?: boolean }) {
  const fp = fromPrice(product);
  const pct = discountPercent(product.price, product.oldPrice) ?? discountPercent(fp.price, fp.oldPrice);
  const badges: { text: string; cls: string }[] = [];
  if (pct) badges.push({ text: `−${pct}%`, cls: "bg-sale text-white" });
  else if (isOnSale(product)) badges.push({ text: "Akció", cls: "bg-sale text-white" });
  if (product.tags?.includes("bestseller")) badges.push({ text: "Kedvenc", cls: "bg-ink text-white" });
  if (product.tags?.includes("szakmai")) badges.push({ text: "Szakmai", cls: "bg-white text-ink" });
  if (product.slug.startsWith("bemutato")) badges.push({ text: "Bemutató darab", cls: "bg-brand-lime text-ink" });
  if (!badges.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((b, i) => (
        <span
          key={b.text}
          className={`rounded-full px-2.5 py-1 text-[0.7rem] font-bold leading-none ${b.cls} ${compact && i > 0 ? "hidden sm:inline" : ""}`}
        >
          {b.text}
        </span>
      ))}
    </div>
  );
}
