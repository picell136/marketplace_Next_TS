"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Star } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store";
import { addReview } from "@/store/reviewsSlice";
import { UserReview } from "@/types";

interface ReviewFormProps {
  productId: string;
}

interface ReviewFormValues {
  rating: number;
  comment: string;
}

export function ReviewForm({ productId }: ReviewFormProps) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user?.currentUser);
  const isAuthenticated = useAppSelector(
    (state) => state.user?.isAuthenticated ?? false
  );

  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>();

  const onSubmit: SubmitHandler<ReviewFormValues> = (values) => {
    if (!currentUser) return;

    const review: UserReview = {
      id: crypto.randomUUID(),
      productId,
      rating: values.rating,
      comment: values.comment,
      date: new Date().toISOString(),
      reviewerName: currentUser.name,
      reviewerEmail: currentUser.email,
      isUserReview: true,
    };

    dispatch(addReview(review));
    reset();
    setSelectedRating(0);
    setHoveredStar(0);
  };

  // Если не авторизован — показываем призыв войти
  if (!isAuthenticated) {
    return (
      <div className="mt-8 rounded-lg border bg-gray-50 p-6 text-center">
        <p className="text-sm text-gray-600">
          Чтобы оставить отзыв,{" "}
          <a href="/login" className="font-medium text-blue-600 hover:underline">
            войдите в аккаунт
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-lg border p-6">
      <h3 className="text-lg font-semibold text-gray-900">Оставить отзыв</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        {/* Оценка звёздами */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Ваша оценка *
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setSelectedRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="cursor-pointer transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 transition-colors ${
                    star <= (hoveredStar || selectedRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="mt-1 text-xs text-red-500">{errors.rating.message}</p>
          )}
        </div>

        {/* Текст отзыва */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Ваш отзыв *
          </label>
          <textarea
            {...register("comment", {
              required: "Введите текст отзыва",
              minLength: {
                value: 10,
                message: "Отзыв должен быть не менее 10 символов",
              },
            })}
            rows={4}
            className="w-full resize-none rounded-lg border px-4 py-2 text-sm focus:border-black focus:outline-none"
            placeholder="Поделитесь впечатлениями о товаре..."
          />
          {errors.comment && (
            <p className="mt-1 text-xs text-red-500">
              {errors.comment.message}
            </p>
          )}
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={isSubmitting || selectedRating === 0}
          className="cursor-pointer rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Отправить отзыв
        </button>
      </form>
    </div>
  );
}