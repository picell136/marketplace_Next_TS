"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CreditCard, Banknote, Truck, Package, Mail } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store";
import { addOrder } from "@/store/ordersSlice";
import { clearCart } from "@/store/cartSlice";
import { CheckoutFormValues, Order } from "@/types";

export function CheckoutForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart?.items ?? []);

  const isAuthenticated = useAppSelector(
    (state) => state.user?.isAuthenticated ?? false
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      deliveryMethod: "courier",
      paymentMethod: "card",
    },
  });

  const deliveryMethod = watch("deliveryMethod");

  // Считаем стоимость доставки
  const deliveryFee = deliveryMethod === "pickup" ? 0 : 300;

  const onSubmit: SubmitHandler<CheckoutFormValues> = (values) => {
    // Дополнительная проверка авторизации
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const total = subtotal + deliveryFee;

    const order: Order = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      customer: values,
      items: cartItems,
      total,
      deliveryFee,
      status: "new",
    };

    dispatch(addOrder(order));
    dispatch(clearCart());

    router.push("/orders");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* ============= КОНТАКТНЫЕ ДАННЫЕ ============= */}
      <section>
        <h2 className="mb-4 text-lg font-bold">Контактные данные</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Имя и фамилия *
            </label>
            <input
              {...register("name", {
                required: "Введите имя",
                minLength: { value: 2, message: "Минимум 2 символа" },
              })}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:border-black focus:outline-none"
              placeholder="Иван Иванов"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Телефон *
            </label>
            <input
              {...register("phone", {
                required: "Введите телефон",
                pattern: {
                  value: /^\+?[0-9\s\-()]{10,}$/,
                  message: "Некорректный телефон",
                },
              })}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:border-black focus:outline-none"
              placeholder="+7 (999) 123-45-67"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Введите email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Некорректный email",
                },
              })}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:border-black focus:outline-none"
              placeholder="example@mail.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ============= ДОСТАВКА ============= */}
      <section>
        <h2 className="mb-4 text-lg font-bold">Способ доставки</h2>

        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 has-[:checked]:border-black has-[:checked]:bg-gray-50">
            <input
              type="radio"
              value="courier"
              {...register("deliveryMethod", { required: true })}
              className="h-4 w-4"
            />
            <Truck className="h-5 w-5 text-gray-600" />
            <div className="flex-1">
              <div className="text-sm font-medium">Курьером</div>
              <div className="text-xs text-gray-500">1-3 дня</div>
            </div>
            <div className="text-sm font-semibold">300 ₽</div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 has-[:checked]:border-black has-[:checked]:bg-gray-50">
            <input
              type="radio"
              value="post"
              {...register("deliveryMethod", { required: true })}
              className="h-4 w-4"
            />
            <Package className="h-5 w-5 text-gray-600" />
            <div className="flex-1">
              <div className="text-sm font-medium">Почтой</div>
              <div className="text-xs text-gray-500">5-10 дней</div>
            </div>
            <div className="text-sm font-semibold">300 ₽</div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 has-[:checked]:border-black has-[:checked]:bg-gray-50">
            <input
              type="radio"
              value="pickup"
              {...register("deliveryMethod", { required: true })}
              className="h-4 w-4"
            />
            <Mail className="h-5 w-5 text-gray-600" />
            <div className="flex-1">
              <div className="text-sm font-medium">Самовывоз</div>
              <div className="text-xs text-gray-500">Завтра</div>
            </div>
            <div className="text-sm font-semibold text-green-600">Бесплатно</div>
          </label>
        </div>

        {/* Адрес доставки — только если не самовывоз */}
        {deliveryMethod !== "pickup" && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Город *
              </label>
              <input
                {...register("city", { required: "Введите город" })}
                className="w-full rounded-lg border px-4 py-2 text-sm focus:border-black focus:outline-none"
                placeholder="Москва"
              />
              {errors.city && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Почтовый индекс *
              </label>
              <input
                {...register("postalCode", { required: "Введите индекс" })}
                className="w-full rounded-lg border px-4 py-2 text-sm focus:border-black focus:outline-none"
                placeholder="101000"
              />
              {errors.postalCode && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Адрес *
              </label>
              <input
                {...register("address", { required: "Введите адрес" })}
                className="w-full rounded-lg border px-4 py-2 text-sm focus:border-black focus:outline-none"
                placeholder="ул. Пушкина, д. 10, кв. 5"
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ============= ОПЛАТА ============= */}
      <section>
        <h2 className="mb-4 text-lg font-bold">Способ оплаты</h2>

        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 has-[:checked]:border-black has-[:checked]:bg-gray-50">
            <input
              type="radio"
              value="card"
              {...register("paymentMethod", { required: true })}
              className="h-4 w-4"
            />
            <CreditCard className="h-5 w-5 text-gray-600" />
            <div className="flex-1">
              <div className="text-sm font-medium">Банковской картой онлайн</div>
              <div className="text-xs text-gray-500">Visa, Mastercard, МИР</div>
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 has-[:checked]:border-black has-[:checked]:bg-gray-50">
            <input
              type="radio"
              value="cash"
              {...register("paymentMethod", { required: true })}
              className="h-4 w-4"
            />
            <Banknote className="h-5 w-5 text-gray-600" />
            <div className="flex-1">
              <div className="text-sm font-medium">Наличными при получении</div>
              <div className="text-xs text-gray-500">
                Оплата курьеру или в пункте выдачи
              </div>
            </div>
          </label>
        </div>
      </section>

      {/* ============= КОММЕНТАРИЙ ============= */}
      <section>
        <h2 className="mb-4 text-lg font-bold">Комментарий к заказу</h2>
        <textarea
          {...register("comment")}
          rows={3}
          className="w-full resize-none rounded-lg border px-4 py-2 text-sm focus:border-black focus:outline-none"
          placeholder="Домофон не работает, позвоните за час до доставки"
        />
      </section>

      {/* ============= КНОПКА ОФОРМЛЕНИЯ ============= */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer rounded-lg bg-gray-900 px-6 py-4 font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
      >
        Подтвердить заказ
      </button>
    </form>
  );
}