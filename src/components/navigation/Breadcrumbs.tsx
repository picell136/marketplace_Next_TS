"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500">
      {/* Иконка дома */}
      <Link
        href="/"
        className="flex items-center text-gray-400 transition-colors hover:text-gray-900"
      >
        <Home className="h-4 w-4" />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-4 w-4 text-gray-300" />

            {isLast || !item.href ? (
              // Последний элемент или без ссылки — просто текст
              <span className="font-medium text-gray-900">
                {item.title}
              </span>
            ) : (
              // Элемент со ссылкой
              <Link
                href={item.href}
                className="transition-colors hover:text-gray-900"
              >
                {item.title}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}