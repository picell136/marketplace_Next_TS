import type { Metadata } from "next";
import { CheckoutPageClient } from "@/components/checkout/CheckoutPageClient";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description: "Заполните данные для оформления заказа.",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}