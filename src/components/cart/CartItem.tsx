"use client";

import React from "react";
import { Trash2, ImageOff } from "lucide-react";

import { useAppDispatch } from "@/store";
import { removeCartItem, setCartItemQuantity } from "@/store/cartSlice";
import { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeCartItem(item.productId));
  };

  const hasImage = item.image && item.image.trim() !== "";

  return (
    <div className="flex items-center gap-4 border-b py-4">
      {/* Изображение — показываем только если оно есть */}
      {hasImage ? (
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded bg-gray-50">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded bg-gray-50">
          <ImageOff className="h-8 w-8 text-gray-300" />
        </div>
      )}

      {/* Информация */}
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {item.price} ₽
        </p>
      </div>

      {/* Итоговая сумма */}
      <div className="w-24 text-right text-sm font-bold">
        {item.price * item.quantity} ₽
      </div>

      {/* Удаление */}
      <button
        onClick={handleRemove}
        className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}