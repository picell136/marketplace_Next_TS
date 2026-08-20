import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Корзина",
  description: "Ваша корзина покупок. Оформите заказ быстро и удобно.",
};

export default function CartPage() {
  return <CartPageClient />;
}