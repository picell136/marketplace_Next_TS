import { DummyJsonProduct, DummyJsonCategory, Product, Category } from "@/types";

export function mapDummyJsonProductToProduct(product: DummyJsonProduct): Product {
  // Конвертируем цену в рубли
  const priceInRubles = Math.round(product.price * 100);

  // Считаем старую цену на основе скидки
  const oldPrice =
    product.discountPercentage > 0
      ? Math.round(priceInRubles / (1 - product.discountPercentage / 100))
      : undefined;

  return {
    id: String(product.id),
    title: product.title,
    description: product.description,
    price: priceInRubles,
    oldPrice,
    images: product.images ?? [],
    categoryId: product.category,
    categoryName: product.category,
    seller: product.brand ?? "DummyJSON Store",
    rating: product.rating,
    reviewsCount: product.reviews?.length ?? 0,
    stock: product.stock,
    creationDate: product.meta?.createdAt ?? new Date().toISOString(),
  };
}

export function mapDummyJsonCategoryToCategory(category: DummyJsonCategory): Category {
  return {
    id: category.slug,
    name: category.name,
    image: "", 
  };
}