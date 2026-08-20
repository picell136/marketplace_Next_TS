import type { Metadata } from "next";
import OrdersPageClient from "@/components/orders/OrdersPageClient";

export const metadata: Metadata = {
  title: "Мои заказы",
  description: "История ваших заказов.",
};

export default function OrdersPage() {
  return <OrdersPageClient />;
}