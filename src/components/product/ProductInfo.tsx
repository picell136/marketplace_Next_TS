"use client";

import React from "react";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingCart, Star, Truck, ShieldCheck } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  addCartItem,
  incrementCartItem,
  decrementCartItem,
} from "@/store/cartSlice";
import { toggleFavorite } from "@/store/favoritesSlice";
import { Product } from "@/types";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector((state) => state.favorites?.productIds ?? []);
  const isFavorite = favorites.includes(product.id);

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
    <div className="flex flex-col">
      {/* Категория */}
      <span className="text-sm font-medium uppercase tracking-wide text-gray-500">
        {product.category}
      </span>

      {/* Название */}
      <h1 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
        {product.title}
      </h1>

      {/* Рейтинг */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
        </div>
        <span className="text-sm text-gray-500">
          ({product.reviewsCount} отзывов)
        </span>
      </div>

      {/* Цена */}
      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-3xl font-bold text-gray-900">
          {product.price} ₽
        </span>
        {product.oldPrice && (
          <span className="text-lg text-gray-400 line-through">
            {product.oldPrice} ₽
          </span>
        )}
      </div>

      {/* Наличие */}
      <div className="mt-2 text-sm">
        {product.stock > 0 ? (
          <span className="text-green-600">В наличии: {product.stock} шт.</span>
        ) : (
          <span className="text-red-600">Нет в наличии</span>
        )}
      </div>

      {/* Описание */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-gray-900">Описание</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {product.description}
        </p>
      </div>

      {/* Продавец */}
      <div className="mt-4 rounded-lg bg-gray-50 p-4">
        <span className="text-sm text-gray-500">Продавец</span>
        <p className="mt-1 text-sm font-medium text-gray-900">{product.seller}</p>
      </div>

      {/* Кнопки действий */}
      <div className="mt-6">
        {isInCart ? (
          <div className="flex items-center gap-4">
            {/* Счётчик */}
            <div className="flex items-center rounded-lg border">
              <button
                type="button"
                onClick={handleDecrement}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-l-lg transition-colors hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="min-w-[3rem] text-center text-lg font-medium">
                {cartItem.quantity}
              </span>

              <button
                type="button"
                onClick={handleIncrement}
                disabled={cartItem.quantity >= product.stock}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-r-lg transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Кнопка избранного */}
            <button
              type="button"
              onClick={handleToggleFavorite}
              className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border transition-colors ${
                isFavorite
                  ? "border-red-200 bg-red-50 text-red-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            </button>
            <Link
              href="/cart"
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
            >
              <ShoppingCart className="h-5 w-5" />
              Перейти в корзину
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Кнопка "Добавить в корзину" */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart className="h-5 w-5" />
              Добавить в корзину
            </button>

            {/* Кнопка избранного */}
            <button
              type="button"
              onClick={handleToggleFavorite}
              className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border transition-colors ${
                isFavorite
                  ? "border-red-200 bg-red-50 text-red-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            </button>
          </div>
        )}
      </div>

      {/* Преимущества */}
      <div className="mt-8 grid gap-4 border-t pt-6 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <Truck className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">Быстрая доставка</span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">Гарантия качества</span>
        </div>
      </div>
    </div>
  );
}