"use client";

import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/store";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyState } from "@/components/common/EmptyState";

export default function CartPage() {
  const items = useAppSelector((state) => state.cart?.items ?? []);

  if (items.length === 0) {
    return (
        <EmptyState
          title="Корзина пустая"
          description="Добавьте товары из каталога, чтобы оформить заказ."
          actionLabel="Перейти в каталог"
          actionHref="/catalog"
          icon={<ShoppingCart className="h-8 w-8 text-gray-400" />}
        />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Корзина</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Список товаров */}
        <div>
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        {/* Итого */}
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}