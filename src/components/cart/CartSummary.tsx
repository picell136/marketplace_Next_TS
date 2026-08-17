"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";

import { useAppSelector } from "@/store";

interface CartSummaryProps {
  showCheckoutButton?: boolean;
  showContinueButton?: boolean;
}

export function CartSummary({
  showCheckoutButton = true,
  showContinueButton = true,
}: CartSummaryProps) {
  const items = useAppSelector((state) => state.cart?.items ?? []);
  const isAuthenticated = useAppSelector(
    (state) => state.user?.isAuthenticated ?? false
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal >= 5000 ? 0 : 300;
  const total = subtotal + deliveryFee;

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-lg font-bold">Итого</h2>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Товары ({totalItems} шт.)</span>
          <span>{subtotal} ₽</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Доставка</span>
          <span className={deliveryFee === 0 ? "text-green-600" : ""}>
            {deliveryFee === 0 ? "Бесплатно" : `${deliveryFee} ₽`}
          </span>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between text-base font-bold">
            <span>К оплате</span>
            <span>{total} ₽</span>
          </div>
        </div>
      </div>

      {deliveryFee > 0 && (
        <p className="mt-3 text-xs text-gray-500">
          Бесплатная доставка от 5 000 ₽. Добавьте товаров ещё на{" "}
          {5000 - subtotal} ₽.
        </p>
      )}

      {showCheckoutButton && (
        <>
          {isAuthenticated ? (
            // Авторизован — ведём в чекаут
            <Link
              href="/checkout"
              className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700"
            >
              Оформить заказ
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            // Не авторизован — ведём на логин
            <>
              <Link
                href="/login"
                className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700"
              >
                <LogIn className="h-4 w-4" />
                Войти для оформления
              </Link>
              <p className="mt-2 text-center text-xs text-gray-500">
                Для оформления заказа необходимо войти в аккаунт
              </p>
            </>
          )}
        </>
      )}

      {showContinueButton && (
        <Link
          href="/catalog"
          className="mt-3 flex w-full cursor-pointer items-center justify-center rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-gray-50"
        >
          Продолжить покупки
        </Link>
      )}
    </div>
  );
}