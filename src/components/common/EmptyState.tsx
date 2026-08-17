"use client";

import React from "react";
import Link from "next/link";
import { PackageSearch } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Иконка */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        {icon || <PackageSearch className="h-8 w-8 text-gray-400" />}
      </div>

      {/* Заголовок */}
      <h2 className="mt-4 text-xl font-semibold text-gray-900">
        {title}
      </h2>

      {/* Описание */}
      {description && (
        <p className="mt-2 max-w-md text-sm text-gray-500">
          {description}
        </p>
      )}

      {/* Кнопка действия */}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}