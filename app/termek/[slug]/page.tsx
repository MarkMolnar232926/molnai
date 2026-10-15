import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductDetail } from "@/components/shop/ProductDetail";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CATEGORY_BY_SLUG, subName } from "@/data/categories";
import { PRODUCTS, getProduct, relatedProducts } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: p.name, description: p.short } : {};
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = CATEGORY_BY_SLUG[product.category];
  const related = relatedProducts(product);

  return (
    <div className="pb-24">
      <div className="container-x pb-6 pt-6 sm:pt-8">
        <Breadcrumbs
          items={[
            { href: "/termekek", label: "Termékek" },
            { href: `/termekek/${category.slug}`, label: category.short },
            { href: `/termekek/${category.slug}?al=${product.sub}`, label: subName(product.category, product.sub) },
          ]}
        />
      </div>
      <div className="container-x">
        <ProductDetail product={product} />
      </div>

      {related.length > 0 && (
        <section className="container-x mt-24" aria-labelledby="kapcsolodo">
          <SectionHeading eyebrow="Ehhez ajánljuk" title={<span id="kapcsolodo">Kapcsolódó termékek</span>} />
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
