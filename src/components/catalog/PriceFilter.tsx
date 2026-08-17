"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setPriceMin, setPriceMax } from "@/store/filtersSlice";
import { useGetProductsQuery } from "@/store/api";

export function PriceFilter() {
  const dispatch = useAppDispatch();
  const priceMin = useAppSelector((state) => state.filters.priceMin);
  const priceMax = useAppSelector((state) => state.filters.priceMax);

  const { data: rawProducts = [] } = useGetProductsQuery();

  const { minPrice, maxPrice } = useMemo(() => {
    const prices = rawProducts.map((p) => Math.round(p.price * 100));
    if (prices.length === 0) return { minPrice: 0, maxPrice: 100000 };

    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices)),
    };
  }, [rawProducts]);

  const [localMin, setLocalMin] = useState(priceMin ?? minPrice);
  const [localMax, setLocalMax] = useState(priceMax ?? maxPrice);

  useEffect(() => {
    setLocalMin(priceMin ?? minPrice);
    setLocalMax(priceMax ?? maxPrice);
  }, [priceMin, priceMax, minPrice, maxPrice]);

  const handleApply = () => {
    dispatch(setPriceMin(localMin <= minPrice ? null : localMin));
    dispatch(setPriceMax(localMax >= maxPrice ? null : localMax));
  };

  const handleReset = () => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
    dispatch(setPriceMin(null));
    dispatch(setPriceMax(null));
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1 block text-xs text-gray-500">От, ₽</label>
          <input
            type="number"
            value={localMin}
            onChange={(e) => setLocalMin(Number(e.target.value))}
            min={minPrice}
            max={maxPrice}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-500">До, ₽</label>
          <input
            type="number"
            value={localMax}
            onChange={(e) => setLocalMax(Number(e.target.value))}
            min={minPrice}
            max={maxPrice}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleApply}
          className="cursor-pointer rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Применить
        </button>
        <button
          onClick={handleReset}
          className="cursor-pointer rounded-lg border px-3 py-2 text-sm transition-colors hover:bg-gray-50"
        >
          Сбросить
        </button>
      </div>
    </div>
  );
}