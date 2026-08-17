"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { setCategory } from "@/store/filtersSlice";
import { Category } from "@/types";

interface CategoryFilterProps {
  categories: Category[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((state) => state.filters.category);

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => dispatch(setCategory(null))}
        className={`block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm transition-colors ${
          !activeCategory
            ? "bg-gray-900 font-medium text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Все категории
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => dispatch(setCategory(category.id))}
          className={`block w-full cursor-pointer truncate rounded-md px-3 py-2 text-left text-sm capitalize transition-colors ${
            activeCategory === category.id
              ? "bg-gray-900 font-medium text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}