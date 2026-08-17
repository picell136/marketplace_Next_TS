"use client";

import React from "react";
import Link from "next/link";
import { Package, LogIn } from "lucide-react";

import { useAppSelector } from "@/store";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { EmptyState } from "@/components/common/EmptyState";

export default function OrdersPage() {
  const orders = useAppSelector((state) => state.orders?.items ?? []);
  const isAuthenticated = useAppSelector(
    (state) => state.user?.isAuthenticated ?? false
  );

  // Если не авторизован
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ title: "Мои заказы" }]} />

        <EmptyState
          title="Войдите, чтобы увидеть заказы"
          description="История заказов доступна только авторизованным пользователям."
          actionLabel="Войти"
          actionHref="/login"
          icon={<LogIn className="h-8 w-8 text-gray-400" />}
        />
      </div>
    );
  }

  // Авторизован, но заказов нет
  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ title: "Мои заказы" }]} />

        <EmptyState
          title="Заказов пока нет"
          description="Оформите первый заказ, и он появится здесь."
          actionLabel="Перейти в каталог"
          actionHref="/catalog"
          icon={<Package className="h-8 w-8 text-gray-400" />}
        />
      </div>
    );
  }

  // Авторизован и есть заказы
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ title: "Мои заказы" }]} />

      <h1 className="mt-4 text-2xl font-bold md:text-3xl">Мои заказы</h1>

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-sm text-gray-500">
                  Заказ №{order.id.slice(0, 8)}
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold">{order.total} ₽</div>
                <div className="text-xs uppercase text-green-600">
                  {order.status === "new" && "Новый"}
                  {order.status === "processing" && "В обработке"}
                  {order.status === "done" && "Выполнен"}
                </div>
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="text-sm text-gray-600">
                Доставка:{" "}
                {order.customer.deliveryMethod === "courier" && "Курьер"}
                {order.customer.deliveryMethod === "post" && "Почта"}
                {order.customer.deliveryMethod === "pickup" && "Самовывоз"}
                {order.customer.deliveryMethod !== "pickup" &&
                  `, ${order.customer.city}, ${order.customer.address}`}
              </div>

              <div className="mt-2 text-sm text-gray-600">
                Оплата:{" "}
                {order.customer.paymentMethod === "card"
                  ? "Картой онлайн"
                  : "Наличными при получении"}
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="text-sm font-medium">Товары:</div>
              <ul className="mt-2 space-y-1">
                {order.items.map((item) => (
                  <li
                    key={item.productId}
                    className="flex items-center justify-between text-sm text-gray-600"
                  >
                    <span className="line-clamp-1">{item.title}</span>
                    <span>
                      {item.quantity} × {item.price} ₽
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}