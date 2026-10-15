import type { Metadata } from "next";
import { CategoryHeader } from "@/components/shop/CategoryHeader";
import { CategoryView } from "@/components/shop/CategoryView";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Termékek",
  description: "TheraBand, rehabilitációs, funkcionális és gyerekfejlesztő eszközök egy helyen.",
};

export default function ProductsPage() {
  return (
    <>
      <CategoryHeader
        title="Összes termék"
        description="Rehabilitáció, sport és gyerekfejlesztés: válogass a teljes kínálatból, vagy szűkíts kategóriára, márkára és ellenállás-szintre."
        count={PRODUCTS.length}
        art="band"
        tone="#1162a9"
        crumbs={[{ label: "Termékek" }]}
      />
      <CategoryView slug="all" />
    </>
  );
}
