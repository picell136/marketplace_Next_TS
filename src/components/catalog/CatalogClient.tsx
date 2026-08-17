"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { useGetProductsQuery, useGetCategoriesQuery } from "@/store/api";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCategory, resetFilters } from "@/store/filtersSlice";
import {
  mapDummyJsonProductToProduct,
  mapDummyJsonCategoryToCategory,
} from "@/lib/mappers";
import { applyFilters } from "@/lib/filters";

import { ProductGrid } from "@/components/catalog/ProductGrid";
import { Pagination } from "@/components/catalog/Pagination";
import { CategoryFilter } from "@/components/catalog/CategoryFilter";
import { PriceFilter } from "@/components/catalog/PriceFilter";
import { SortSelect } from "@/components/catalog/SortSelect";
import { EmptyState } from "@/components/common/EmptyState";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PackageSearch, AlertCircle } from "lucide-react";

export function CatalogClient() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const {
    data: rawProducts = [],
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useGetProductsQuery();

  const {
    data: rawCategories = [],
    isLoading: isLoadingCategories,
  } = useGetCategoriesQuery();

  const filters = useAppSelector((state) => state.filters);

  // Подхватываем категорию из URL (например, при клике на категорию на главной)
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      dispatch(setCategory(categoryFromUrl));
    }
  }, [searchParams, dispatch]);

  // Категории из DummyJSON
  const categories = useMemo(() => {
    return rawCategories.map(mapDummyJsonCategoryToCategory);
  }, [rawCategories]);

  // Активная категория для хлебных крошек
  const activeCategory = useMemo(() => {
    if (!filters.category) return null;
    return categories.find((c) => c.id === filters.category) ?? null;
  }, [categories, filters.category]);

  // Товары: только с 2+ изображениями
  const products = useMemo(() => {
    return rawProducts
      .map(mapDummyJsonProductToProduct)
      .filter(
        (product) =>
          product.images &&
          product.images.length >= 1
      );
  }, [rawProducts]);

  // Применяем фильтры
  const { items, totalPages, totalItems } = useMemo(() => {
    return applyFilters(products, filters);
  }, [products, filters]);

  // Хлебные крошки
  const breadcrumbs = useMemo(() => {
    if (!activeCategory) {
      return [{ title: "Каталог" }];
    }
    return [
      { title: "Каталог", href: "/catalog" },
      { title: activeCategory.name },
    ];
  }, [activeCategory]);

  // Загрузка
  if (isLoadingProducts || isLoadingCategories) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-lg text-gray-500">Загрузка каталога...</div>
      </div>
    );
  }

  // Ошибка
  if (isErrorProducts) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-gray-900">
            Не удалось загрузить каталог
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Сервер временно недоступен. Попробуйте обновить страницу.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700"
          >
            Обновить
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      {/* Заголовок */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">
            {activeCategory ? activeCategory.name : "Каталог"}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {totalItems} {getItemsWord(totalItems)}
          </p>
        </div>

        <button
          onClick={() => dispatch(resetFilters())}
          className="cursor-pointer rounded-lg border px-4 py-2 text-sm transition-colors hover:bg-gray-50"
        >
          Сбросить фильтры
        </button>
      </div>

      {/* Основной контент */}
      <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Сайдбар с фильтрами */}
        <aside className="space-y-6">
          {/* Категории */}
          <div className="rounded-lg border p-4">
            <h3 className="mb-4 font-semibold">Категории</h3>
            <CategoryFilter categories={categories} />
          </div>

          {/* Цена */}
          <div className="rounded-lg border p-4">
            <h3 className="mb-4 font-semibold">Цена</h3>
            <PriceFilter />
          </div>
        </aside>

        {/* Товары */}
        <div>
          {/* Сортировка */}
          <div className="mb-4 flex items-center justify-end">
            <SortSelect />
          </div>

          {/* Сетка товаров или пустое состояние */}
          {items.length === 0 ? (
            <EmptyState
              title="Товары не найдены"
              description="Попробуйте изменить фильтры или сбросить их."
              actionLabel="Сбросить фильтры"
              actionHref="/catalog"
              icon={<PackageSearch className="h-8 w-8 text-gray-400" />}
            />
          ) : (
            <>
              <ProductGrid products={items} />
              <Pagination totalPages={totalPages} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Вспомогательная функция для склонения слова "товар"
function getItemsWord(count: number): string {
  const lastTwo = count % 100;
  const lastOne = count % 10;

  if (lastTwo >= 11 && lastTwo <= 14) return "товаров";
  if (lastOne === 1) return "товар";
  if (lastOne >= 2 && lastOne <= 4) return "товара";
  return "товаров";
}