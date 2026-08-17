"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Package, Heart } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/userSlice";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user?.currentUser);
  const ordersCount = useAppSelector(
    (state) => state.orders?.items?.length ?? 0
  );
  const favoritesCount = useAppSelector(
    (state) => state.favorites?.productIds?.length ?? 0
  );

  // Если не авторизован — редирект на логин
  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Вы не авторизованы</p>
          <Link
            href="/login"
            className="mt-4 inline-block rounded-lg bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Войти
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ title: "Профиль" }]} />

      <h1 className="mt-4 text-2xl font-bold md:text-3xl">Мой профиль</h1>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Информация о пользователе */}
        <div className="rounded-lg border p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl font-bold text-gray-600">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold">{currentUser.name}</h2>
              <p className="text-sm text-gray-500">{currentUser.email}</p>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <div>
              <span className="text-gray-400">Дата регистрации:</span>{" "}
              {new Date(currentUser.registeredAt).toLocaleDateString("ru-RU")}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Выйти из аккаунта
          </button>
        </div>

        {/* Статистика */}
        <div className="space-y-4">
          <Link
            href="/orders"
            className="flex items-center justify-between rounded-lg border p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <Package className="h-6 w-6 text-gray-400" />
              <span className="font-medium">Мои заказы</span>
            </div>
            <span className="text-lg font-bold">{ordersCount}</span>
          </Link>

          <Link
            href="/favorites"
            className="flex items-center justify-between rounded-lg border p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-gray-400" />
              <span className="font-medium">Избранное</span>
            </div>
            <span className="text-lg font-bold">{favoritesCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}