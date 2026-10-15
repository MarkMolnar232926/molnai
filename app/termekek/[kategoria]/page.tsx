import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryHeader } from "@/components/shop/CategoryHeader";
import { CategoryView } from "@/components/shop/CategoryView";
import { CATEGORIES, getCategory } from "@/data/categories";
import { productsInCategory } from "@/data/products";

const SALE = {
  name: "Akciók",
  description: "Outlet, bemutató darabok és intézményi mennyiségi kedvezmények. Gyors döntés, nagy megtakarítás.",
};

export function generateStaticParams() {
  return [...CATEGORIES.map((c) => ({ kategoria: c.slug })), { kategoria: "akciok" }];
}

export const dynamicParams = false;

type Props = { params: Promise<{ kategoria: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategoria } = await params;
  const c = getCategory(kategoria);
  return { title: c?.name ?? SALE.name, description: c?.description ?? SALE.description };
}

export default async function CategoryPage({ params }: Props) {
  const { kategoria } = await params;
  const category = getCategory(kategoria);
  if (!category && kategoria !== "akciok") notFound();

  return (
    <>
      <CategoryHeader
        title={category?.name ?? SALE.name}
        description={category?.description ?? SALE.description}
        count={productsInCategory(kategoria).length}
        art={category?.art ?? "spinner"}
        tone={category?.accent ?? "#c8202a"}
        crumbs={[{ href: "/termekek", label: "Termékek" }, { label: category?.name ?? SALE.name }]}
      />
      <CategoryView key={kategoria} slug={kategoria} />
    </>
  );
}
