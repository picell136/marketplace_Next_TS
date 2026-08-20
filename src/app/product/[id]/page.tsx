import type { Metadata } from "next";
import { ProductPageClient } from "@/components/product/ProductPageClient";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return { title: "Товар не найден" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "https://dummyjson.com"}/products/${productId}`
    );

    if (!response.ok) {
      return { title: "Товар не найден" };
    }

    const product = await response.json();

    return {
      title: product.title,
      description: product.description?.slice(0, 160),
      openGraph: {
        title: product.title,
        description: product.description?.slice(0, 160),
        images: product.images?.[0] ? [product.images[0]] : [],
      },
    };
  } catch {
    return { title: "Товар не найден" };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return <ProductPageClient productId={id} />;
}