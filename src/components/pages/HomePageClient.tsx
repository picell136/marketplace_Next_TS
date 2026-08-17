"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, AlertCircle } from "lucide-react";

import { useGetProductsQuery, useGetCategoriesQuery } from "@/store/api";
import {
  mapDummyJsonProductToProduct,
  mapDummyJsonCategoryToCategory,
} from "@/lib/mappers";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { ProductCard } from "@/components/catalog/ProductCard";

export function HomePageClient() {
  const {
    data: rawProducts = [],
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useGetProductsQuery();

  const {
    data: rawCategories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetCategoriesQuery();

  // Категории
  const categories = useMemo(() => {
    return rawCategories
      .map(mapDummyJsonCategoryToCategory);
  }, [rawCategories]);

  // Товары: только с 2+ изображениями
  const products = useMemo(() => {
    return rawProducts
      .map(mapDummyJsonProductToProduct)
      .filter(
        (product) =>
          product.images &&
          product.images.length >= 2 &&
          product.images[0] &&
          product.images[1]
      );
  }, [rawProducts]);

  const popularProducts = useMemo(() => {
    return [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  }, [products]);

  const saleProducts = useMemo(() => {
    return products
      .filter((product) => product.oldPrice !== undefined)
      .slice(0, 4);
  }, [products]);

  const newProducts = useMemo(() => {
    return [...products]
      .sort(
        (a, b) =>
          new Date(b.creationDate).getTime() -
          new Date(a.creationDate).getTime()
      )
      .slice(0, 4);
  }, [products]);

  if (isLoadingProducts || isLoadingCategories) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-500">Загрузка...</div>
      </div>
    );
  }

  if (isErrorProducts || isErrorCategories) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-gray-900">
            Не удалось загрузить данные
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Сервер временно недоступен. Попробуйте обновить страницу.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700"
          >
            Обновить страницу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold md:text-5xl">
              Откройте для себя лучшие товары
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Тысячи товаров по выгодным ценам. Быстрая доставка и гарантия
              качества.
            </p>
            <Link
              href="/catalog"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-100"
            >
              Перейти в каталог
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* КАТЕГОРИИ */}
      {categories.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Категории</h2>
            <Link
              href="/catalog"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Смотреть все
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                href={`/catalog?category=${category.id}`}
                className="group flex flex-col items-center justify-center rounded-lg border bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Sparkles className="h-6 w-6 text-gray-400" />
                </div>
                <span className="mt-3 text-center text-sm font-medium capitalize text-gray-900">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ПОПУЛЯРНЫЕ ТОВАРЫ */}
      {popularProducts.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <TrendingUp className="h-6 w-6" />
              Популярные товары
            </h2>
            <Link
              href="/catalog"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Смотреть все
            </Link>
          </div>
          <div className="mt-6">
            <ProductGrid products={popularProducts} />
          </div>
        </section>
      )}

      {/* ТОВАРЫ СО СКИДКОЙ */}
      {saleProducts.length > 0 && (
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                <Sparkles className="h-6 w-6" />
                Выгодные предложения
              </h2>
              <Link
                href="/catalog"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Смотреть все
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* НОВИНКИ */}
      {newProducts.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <Sparkles className="h-6 w-6" />
              Новинки
            </h2>
            <Link
              href="/catalog"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Смотреть все
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}