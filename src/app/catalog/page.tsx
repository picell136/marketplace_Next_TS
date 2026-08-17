import { Suspense } from "react";
import { CatalogClient } from "@/components/catalog/CatalogClient";

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