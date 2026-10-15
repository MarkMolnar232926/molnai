import type { Metadata } from "next";
import { CartPage } from "@/components/shop/CartPage";

export const metadata: Metadata = { title: "Kosár" };

export default function Page() {
  return <CartPage />;
}
