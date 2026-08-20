"use client";

import React from "react";
import { useGetProductByIdQuery } from "@/store/api";
import { mapDummyJsonProductToProduct } from "@/lib/mappers";

import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { Reviews } from "@/components/product/Reviews";

interface ProductPageClientProps {
  productId: string;
}

export function ProductPageClient({ productId }: ProductPageClientProps) {
  const numericId = Number(productId);

  const { data: rawProduct, isLoading } = useGetProductByIdQuery(numericId, {
    skip: Number.isNaN(numericId),
  });

  if (Number.isNaN(numericId)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-lg text-gray-500">Некорректный ID товара</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-lg text-gray-500">Загрузка...</div>
      </div>
    );
  }

  if (!rawProduct) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-lg text-gray-500">Товар не найден</div>
      </div>
    );
  }

  const product = mapDummyJsonProductToProduct(rawProduct);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { title: "Каталог", href: "/catalog" },
          {
            title: product.categoryName,
            href: `/catalog?category=${product.categoryId}`,
          },
          { title: product.title },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.title} />
        <ProductInfo product={product} />
      </div>

      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900">Описание</h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-700 whitespace-pre-line">
          {product.description}
        </p>
      </section>

      {/* Отзывы с формой */}
      <Reviews
        productId={product.id}
        reviews={product.reviews}
        averageRating={product.rating}
      />
    </div>
  );
}