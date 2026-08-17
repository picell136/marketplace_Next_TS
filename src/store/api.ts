import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { DummyJsonProduct, DummyJsonCategory } from "@/types";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "https://dummyjson.com",
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

export const dummyJsonApi = createApi({
  reducerPath: "dummyJsonApi",
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    // Все товары (100 штук)
    getProducts: builder.query<DummyJsonProduct[], void>({
      query: () => "/products?limit=100&skip=0",
      transformResponse: (response: { products: DummyJsonProduct[] }) =>
        response.products,
    }),

    // Товар по id
    getProductById: builder.query<DummyJsonProduct, number>({
      query: (id) => `/products/${id}`,
    }),

    // Все категории
    getCategories: builder.query<DummyJsonCategory[], void>({
      query: () => "/products/categories",
    }),

    // Товары по категории
    getProductsByCategory: builder.query<DummyJsonProduct[], string>({
      query: (categorySlug) => `/products/category/${categorySlug}`,
      transformResponse: (response: { products: DummyJsonProduct[] }) =>
        response.products,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = dummyJsonApi;