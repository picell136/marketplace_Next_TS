"use client";

import React from "react";
import Link from "next/link";
import { LogIn, ShoppingCart } from "lucide-react";

import { useAppSelector } from "@/store";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { CheckoutForm } from "@/components/forms/CheckoutForm";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyState } from "@/components/common/EmptyState";

export default function CheckoutPage() {
  const items = useAppSelector((state) => state.cart?.items ?? []);
  const isAuthenticated = useAppSelector(
    (state) => state.user?.isAuthenticated ?? false
  );
  const currentUser = useAppSelector((state) => state.user?.currentUser);

  // Если корзина пуста
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="Корзина пустая"
          description="Добавьте товары из каталога, чтобы оформить заказ."
          actionLabel="Перейти в каталог"
          actionHref="/catalog"
          icon={<ShoppingCart className="h-8 w-8 text-gray-400" />}
        />
      </div>
    );
  }

  // Если не авторизован
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ title: "Оформление заказа" }]} />

        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <LogIn className="h-8 w-8 text-gray-400" />
          </div>

          <h1 className="mt-4 text-xl font-bold">
            Войдите, чтобы оформить заказ
          </h1>
          <p className="mt-2 max-w-md text-sm text-gray-500">
            Для оформления заказа необходимо авторизоваться. Это позволит нам
            сохранить историю ваших заказов и ускорить процесс покупки.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700"
            >
              Войти
            </Link>
            <Link
              href="/register"
              className="rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-gray-50"
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Авторизован и корзина не пуста — показываем форму
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ title: "Оформление заказа" }]} />

      <h1 className="mt-4 text-2xl font-bold md:text-3xl">Оформление заказа</h1>

      {/* Приветствие пользователя */}
      <p className="mt-2 text-sm text-gray-500">
        Заказ оформляется на имя{" "}
        <span className="font-medium text-gray-900">{currentUser?.name}</span>{" "}
        ({currentUser?.email})
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Форма */}
        <div>
          <CheckoutForm />
        </div>

        {/* Итоги заказа */}
        <div>
          <div className="sticky top-24">
            <CartSummary showCheckoutButton={false} showContinueButton={false} />
          </div>
        </div>
      </div>
    </div>
  );
}