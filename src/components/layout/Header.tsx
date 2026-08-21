"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingCart, User, X, Ship } from "lucide-react";

import { useGetProductsQuery } from "@/store/api";
import { useAppSelector } from "@/store";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: rawProducts = [], isLoading } = useGetProductsQuery();

  const currentUser = useAppSelector((state) => state.user?.currentUser);
  const isAuthenticated = useAppSelector(
    (state) => state.user?.isAuthenticated ?? false
  );

  const cartItemsCount = useAppSelector(
    (state) =>
      state.cart?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0
  );
  const favoritesCount = useAppSelector(
    (state) => state.favorites?.productIds?.length ?? 0
  );

  const filteredProducts = useMemo(() => {
    if (!searchValue.trim()) return [];
    return rawProducts
      .filter(
        (product) =>
          product.title.toLowerCase().includes(searchValue.toLowerCase()) &&
          product.images &&
          product.images.length >= 2
      )
      .slice(0, 5);
  }, [rawProducts, searchValue]);

  useEffect(() => {
    if (searchValue) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [searchValue]);

  const handleProductClick = () => {
    setSearchValue("");
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Логотип */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Ship className="h-6 w-6" />
          <span className="text-xl font-bold tracking-tight">OrderShip</span>
        </Link>

        {/* Поиск */}
        <div className="relative hidden w-80 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-10 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-10 text-sm focus:border-black focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-black"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Дропдаун поиска */}
          {isDropdownOpen && (searchValue || isLoading) && (
            <div className="absolute top-full left-0 mt-2 w-full rounded-lg border bg-white shadow-lg overflow-hidden z-50">
              {isLoading ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  Загрузка...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  Ничего не найдено
                </div>
              ) : (
                <ul className="py-2">
                  {filteredProducts.map((product) => {
                    const hasImage =
                      product.images && product.images.length > 0 && product.images[0];

                    return (
                      <li key={product.id}>
                        <Link
                          href={`/product/${product.id}`}
                          onClick={handleProductClick}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                        >
                          {/* Показываем изображение только если оно есть */}
                          {hasImage && (
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="h-10 w-10 rounded object-contain bg-white border"
                            />
                          )}
                          <span className="text-sm line-clamp-1 text-gray-900">
                            {product.title}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-1 md:gap-4">
          {/* Пользователь */}
          {isAuthenticated ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 p-2 text-sm font-medium transition-colors hover:text-black"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                {currentUser?.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden lg:inline text-gray-700">
                {currentUser?.name}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 p-2 text-sm font-medium transition-colors hover:text-black"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <span className="hidden lg:inline text-gray-700">Войти</span>
            </Link>
          )}

          {/* Избранное */}
          <Link
            href="/favorites"
            className="relative p-2 text-gray-600 transition-colors hover:text-black"
          >
            <Heart className="h-6 w-6" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] font-bold text-white">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Корзина */}
          <Link
            href="/cart"
            className="relative p-2 text-gray-600 transition-colors hover:text-black"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] font-bold text-white">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}