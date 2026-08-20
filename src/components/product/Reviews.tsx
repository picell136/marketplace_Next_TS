"use client";

import React, { useState, useMemo } from "react";
import { Star, ChevronDown, ChevronUp, Trash2 } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store";
import { deleteReview } from "@/store/reviewsSlice";
import { Review } from "@/types";
import { ReviewForm } from "./ReviewForm";

interface ReviewsProps {
  productId: string;
  reviews: Review[];
  averageRating: number;
}

export function Reviews({ productId, reviews, averageRating }: ReviewsProps) {
  const dispatch = useAppDispatch();
  const [showAll, setShowAll] = useState(false);

  const isAuthenticated = useAppSelector(
    (state) => state.user?.isAuthenticated ?? false
  );
  const currentUser = useAppSelector((state) => state.user?.currentUser);

  // Мемоизируем фильтрацию пользовательских отзывов
  const allUserReviews = useAppSelector((state) => state.reviews?.items ?? []);
  
  const userReviews = useMemo(
    () => allUserReviews.filter((r) => r.productId === productId),
    [allUserReviews, productId]
  );

  // Объединяем отзывы с уникальными ключами
  const allReviews = useMemo(() => {
    const combined = [
      ...userReviews.map((r) => ({ ...r, source: "user" as const })),
      ...reviews.map((r, idx) => ({ 
        ...r, 
        id: `api-${idx}`,
        source: "api" as const 
      })),
    ];
    return combined;
  }, [userReviews, reviews]);

  if (allReviews.length === 0) {
    return (
      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900">Отзывы</h2>
        <p className="mt-4 text-sm text-gray-500">
          У этого товара пока нет отзывов. Будьте первым!
        </p>
        <ReviewForm productId={productId} />
      </section>
    );
  }

  // Пересчитываем средний рейтинг
  const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
  const calculatedAverage = totalRating / allReviews.length;

  // Распределение оценок
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = allReviews.filter((r) => Math.round(r.rating) === rating).length;
    return {
      rating,
      count,
      percentage: Math.round((count / allReviews.length) * 100),
    };
  });

  const visibleReviews = showAll ? allReviews : allReviews.slice(0, 3);

  const handleDeleteReview = (reviewId: string) => {
    dispatch(deleteReview(reviewId));
  };

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Отзывы ({allReviews.length})
      </h2>

      {/* Сводка по рейтингам */}
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900">
            {calculatedAverage.toFixed(1)}
          </div>
          <div className="mt-2 flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(calculatedAverage)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {allReviews.length}{" "}
            {allReviews.length === 1
              ? "отзыв"
              : allReviews.length < 5
              ? "отзыва"
              : "отзывов"}
          </p>
        </div>

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

      {/* Список отзывов с уникальными ключами */}
      <div className="mt-8 space-y-6">
        {visibleReviews.map((review, index) => {
          // Генерируем уникальный ключ
          const key = review.source === "user" 
            ? `user-${review.id}` 
            : `api-${review.id || index}`;

          return (
            <div key={key} className="border-b pb-6 last:border-b-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    {review.reviewerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {review.reviewerName}
                      {review.source === "user" && (
                        <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                          Ваш отзыв
                        </span>
                      )}
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

                <div className="flex items-center gap-2">
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

                  {/* Кнопка удаления только для своих отзывов */}
                  {review.source === "user" && 
                   isAuthenticated &&
                   currentUser &&
                   review.reviewerEmail === currentUser.email && (
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {review.comment}
              </p>
            </div>
          );
        })}
      </div>

      {/* Кнопка "Показать ещё" */}
      {allReviews.length > 3 && (
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
              Показать все отзывы ({allReviews.length})
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      )}

      {/* Форма добавления отзыва */}
      <ReviewForm productId={productId} />
    </section>
  );
}