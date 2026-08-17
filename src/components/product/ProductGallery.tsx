"use client";

import React, { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg bg-gray-50">
        <span className="text-sm text-gray-400">Нет изображения</span>
      </div>
    );
  }

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Основное изображение */}
      <div className="flex h-96 items-center justify-center overflow-hidden rounded-lg border bg-gray-50">
        <img
          src={activeImage}
          alt={alt}
          className="h-full w-full object-contain p-4"
        />
      </div>

      {/* Миниатюры — только если изображений больше одного */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-20 w-20 cursor-pointer overflow-hidden rounded-lg border-2 transition-colors ${
                index === activeIndex
                  ? "border-gray-900"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <img
                src={image}
                alt={`${alt} ${index + 1}`}
                className="h-full w-full object-contain bg-gray-50"
              />
            </button>
          ))}
        </div>
      )}
      
    </div>
  );
}