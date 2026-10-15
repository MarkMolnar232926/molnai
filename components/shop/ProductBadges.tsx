import { discountPercent } from "@/lib/format";
import type { Product } from "@/lib/types";
import { fromPrice, isOnSale } from "@/data/products";

export function ProductBadges({ product }: { product: Product }) {
  const fp = fromPrice(product);
  const pct = discountPercent(product.price, product.oldPrice) ?? discountPercent(fp.price, fp.oldPrice);
  const badges: { text: string; cls: string }[] = [];
  if (pct) badges.push({ text: `−${pct}%`, cls: "bg-sale text-white" });
  else if (isOnSale(product)) badges.push({ text: "Akció", cls: "bg-sale text-white" });
  if (product.tags?.includes("bestseller")) badges.push({ text: "Kedvenc", cls: "bg-ink text-white" });
  if (product.tags?.includes("szakmai")) badges.push({ text: "Szakmai", cls: "bg-white text-ink" });
  if (product.slug.startsWith("bemutato")) badges.push({ text: "Bemutató darab", cls: "bg-r-yellow text-ink" });
  if (!badges.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((b) => (
        <span key={b.text} className={`rounded-full px-2.5 py-1 text-[0.7rem] font-bold leading-none ${b.cls}`}>
          {b.text}
        </span>
      ))}
    </div>
  );
}
