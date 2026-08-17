"use client";

import React, { useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";

import { Review } from "@/types";

interface ReviewsProps {
  reviews: Review[];
  averageRating: number;
}

export function Reviews({ reviews, averageRating }: ReviewsProps) {
  const [showAll, setShowAll] = useState(false);

  if (reviews.length === 0) {
    return (
      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900">Отзывы</h2>
        <p className="mt-4 text-sm text-gray-500">
          У этого товара пока нет отзывов. Будьте первым!
        </p>
      </section>
    );
  }

  // Считаем распределение оценок
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => Math.round(r.rating) === rating).length,
    percentage: Math.round(
      (reviews.filter((r) => Math.round(r.rating) === rating).length /
        reviews.length) *
        100
    ),
  }));

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Отзывы ({reviews.length})
      </h2>

      {/* Сводка по рейтингам */}
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
        {/* Общая оценка */}
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900">
            {averageRating.toFixed(1)}
          </div>
          <div className="mt-2 flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {reviews.length}{" "}
            {reviews.length === 1
              ? "отзыв"
              : reviews.length < 5
              ? "отзыва"
              : "отзывов"}
          </p>
        </div>

        {/* Распределение оценок */}
        <div className="flex-1 space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <span>{rating}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex-1">
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-yellow-400"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <span className="w-8 text-right text-xs text-gray-500">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Список отзывов */}
      <div className="mt-8 space-y-6">
        {visibleReviews.map((review, index) => (
          <div key={index} className="border-b pb-6 last:border-b-0">
            {/* Заголовок отзыва */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Аватар (первая буква имени) */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                  {review.reviewerName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {review.reviewerName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Рейтинг отзыва */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Текст отзыва */}
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Кнопка "Показать ещё" */}
      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
        >
          {showAll ? (
            <>
              Свернуть отзывы
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Показать все отзывы ({reviews.length})
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      )}
    </section>
  );
}