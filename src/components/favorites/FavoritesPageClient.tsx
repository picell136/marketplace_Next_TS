"use client";

import { useMemo } from "react";

import { ShoppingCart } from "lucide-react";
import { useGetProductsQuery } from "@/store/api";
import { useAppSelector } from "@/store";
import { mapDummyJsonProductToProduct } from "@/lib/mappers";

import { ProductGrid } from "@/components/catalog/ProductGrid";
import { EmptyState } from "@/components/common/EmptyState";

export default function FavoritesPageClient() {
  const { data: rawProducts = [], isLoading } = useGetProductsQuery();

  const favoriteIds = useAppSelector((state) => state.favorites.productIds);

  const favoriteProducts = useMemo(() => {
    return rawProducts
      .filter((product) => favoriteIds.includes(String(product.id)))
      .map(mapDummyJsonProductToProduct);
  }, [rawProducts, favoriteIds]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (favoriteProducts.length === 0) {
    return (
      <EmptyState
        title="Нет избранных товаров"
        description="Добавьте товары в избранное из каталога."
        actionLabel="Перейти в каталог"
        actionHref="/catalog"
        icon={<ShoppingCart className="h-8 w-8 text-gray-400" />}
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">Избранное</h1>

      <div className="mt-6">
        <ProductGrid products={favoriteProducts} />
      </div>
    </div>
  );
}