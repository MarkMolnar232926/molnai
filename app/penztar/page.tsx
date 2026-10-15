import type { Metadata } from "next";
import { Checkout } from "@/components/shop/Checkout";

export const metadata: Metadata = { title: "Pénztár" };

export default function Page() {
  return <Checkout />;
}
