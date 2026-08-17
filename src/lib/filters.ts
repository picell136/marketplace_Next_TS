import { FiltersState, Product } from "@/types";

export const PAGE_SIZE = 12;

export function applyFilters(
  products: Product[],
  filters: FiltersState
): {
  items: Product[];
  totalItems: number;
  totalPages: number;
} {
  let result = [...products];

  // Поиск
  if (filters.search) {
    const search = filters.search.toLowerCase();
    result = result.filter((product) =>
      product.title.toLowerCase().includes(search)
    );
  }

  // Категория
  if (filters.category) {
    result = result.filter(
      (product) => product.categoryId === filters.category
    );
  }

  if (filters.priceMin !== null) {
    result = result.filter((product) => product.price >= filters.priceMin!);
  }

  if (filters.priceMax !== null) {
    result = result.filter((product) => product.price <= filters.priceMax!);
  }

  // Сортировка
  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort(
        (a, b) =>
          new Date(b.creationDate).getTime() -
          new Date(a.creationDate).getTime()
      );
      break;
    case "popular":
    default:
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
      break;
  }

  const totalItems = result.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, filters.page), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return {
    items: result.slice(start, end),
    totalItems,
    totalPages,
  };
}