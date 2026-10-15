import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/shop/OrderConfirmation";

export const metadata: Metadata = { title: "Köszönjük a rendelést!" };

export default function Page() {
  return <OrderConfirmation />;
}
