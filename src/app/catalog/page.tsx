import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export const metadata: Metadata = {
  title: "Каталог товаров",
  description:
    "Полный каталог товаров с фильтрами по категориям, цене и рейтингу.",
};

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-lg text-gray-500">Загрузка каталога...</div>
        </div>
      }
    >
      <CatalogClient />
    </Suspense>
  );
}