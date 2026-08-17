"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { setSort } from "@/store/filtersSlice";
import { SortOption } from "@/types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popular", label: "По популярности" },
  { value: "newest", label: "Сначала новые" },
  { value: "price-asc", label: "Сначала дешёвые" },
  { value: "price-desc", label: "Сначала дорогие" },
  { value: "rating", label: "По рейтингу" },
];

export function SortSelect() {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.filters.sort);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Сортировка:</span>
      <select
        value={sort}
        onChange={(e) => dispatch(setSort(e.target.value as SortOption))}
        className="cursor-pointer rounded-lg border px-3 py-2 text-sm focus:border-black focus:outline-none"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}