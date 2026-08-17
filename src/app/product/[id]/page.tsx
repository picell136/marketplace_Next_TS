"use client";

import { useParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/store/api";
import { mapDummyJsonProductToProduct } from "@/lib/mappers";

import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const productId = Number(params.id);

  const { data: rawProduct, isLoading } = useGetProductByIdQuery(productId, {
    skip: Number.isNaN(productId),
  });

  if (isLoading) {
    return <div className="p-8 text-center">Загрузка...</div>;
  }

  if (!rawProduct) {
    return <div className="p-8 text-center">Товар не найден</div>;
  }

  const product = mapDummyJsonProductToProduct(rawProduct);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { title: "Каталог", href: "/catalog" },
          { title: product.categoryName, href: `/catalog?category=${product.categoryId}` },
          { title: product.title },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.title} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}