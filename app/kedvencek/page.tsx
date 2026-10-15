import type { Metadata } from "next";
import { FavoritesView } from "@/components/shop/FavoritesView";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = { title: "Kedvencek" };

export default function Page() {
  return (
    <div className="container-x min-h-[80vh] pb-24 pt-6 sm:pt-8">
      <Breadcrumbs items={[{ label: "Kedvencek" }]} />
      <h1 className="mt-6 text-h1 font-extrabold">Kedvencek</h1>
      <FavoritesView />
    </div>
  );
}
