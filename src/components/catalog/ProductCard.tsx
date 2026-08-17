"use client";

import React from "react";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  addCartItem,
  incrementCartItem,
  decrementCartItem,
} from "@/store/cartSlice";
import { toggleFavorite } from "@/store/favoritesSlice";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector((state) => state.favorites?.productIds ?? []);
  const isFavorite = favorites.includes(product.id);

  // Проверяем, есть ли товар в корзине
  const cartItem = useAppSelector((state) =>
    state.cart?.items.find((item) => item.productId === product.id)
  );
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    dispatch(
      addCartItem({
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        quantity: 1,
      })
    );
  };

  const handleIncrement = () => {
    dispatch(incrementCartItem(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementCartItem(product.id));
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.id));
  };

  return (
    <div className="relative flex h-full flex-col rounded-lg border border-gray-400 p-4 transition-shadow hover:shadow-xl">
      {/* Кнопка избранного */}
      <button
        onClick={handleToggleFavorite}
        className={`absolute right-3 top-3 z-10 rounded-full p-2 transition-colors ${
          isFavorite
            ? "bg-red-50 text-red-500"
            : "bg-gray-50 text-gray-400 hover:text-red-500"
        }`}
      >
        <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
      </button>

      {/* Link оборачивает только изображение и текст */}
      <Link href={`/product/${product.id}`} className="flex flex-1 flex-col">
        {/* Изображение */}
        <div className="flex h-48 items-center justify-center overflow-hidden rounded bg-gray-50">
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Информация */}
        <div className="mt-4 flex flex-col items-center gap-2 text-center">
          <div className="text-lg font-bold">
            {product.price} ₽
          </div>

          <div className="text-sm text-gray-700 line-clamp-2">
            {product.title}
          </div>
        </div>
      </Link>

      {/* Кнопка или счётчик */}
      <div className="mt-4">
        {isInCart ? (
          <div className="flex items-center justify-center gap-3 rounded-lg">
            <button
              onClick={handleDecrement}
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-300 border"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="min-w-[2rem] text-center font-medium">
              {cartItem.quantity}
            </span>

            <button
              onClick={handleIncrement}
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-300 border"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full rounded-lg border px-4 py-2 transition-colors hover:bg-gray-300"
          >
            В корзину
          </button>
        )}
      </div>
    </div>
  );
}