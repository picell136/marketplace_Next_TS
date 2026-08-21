"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, CreditCard, Wallet, Smartphone } from "lucide-react";

import { LuGithub } from "react-icons/lu";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-gray-900 text-gray-300">
      {/* Основная часть футера */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Логотип и описание */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <span className="text-xl font-bold text-gray-900">O</span>
              </div>
              <span className="text-xl font-bold text-white">OrderShip</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm text-gray-400">
              Онлайн-маркетплейс с тысячами товаров по выгодным ценам. Быстрая
              доставка, гарантия качества и удобные способы оплаты.
            </p>

            {/* Контакты */}
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <a
                  href="tel:+78001234567"
                  className="transition-colors hover:text-white"
                >
                  8 (800) 123-45-67
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <a
                  href="mailto:info@ordership.ru"
                  className="transition-colors hover:text-white"
                >
                  info@ordership.ru
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>Москва, ул. Примерная, 1</span>
              </div>
            </div>
          </div>

          {/* Покупателям */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Покупателям
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/catalog"
                  className="transition-colors hover:text-white"
                >
                  Каталог товаров
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="transition-colors hover:text-white"
                >
                  Избранное
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="transition-colors hover:text-white"
                >
                  Корзина
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="transition-colors hover:text-white"
                >
                  Мои заказы
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="transition-colors hover:text-white"
                >
                  Личный кабинет
                </Link>
              </li>
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Компания
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  О нас
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Вакансии
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Партнёрам
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Продавцам
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Новости
                </a>
              </li>
            </ul>
          </div>

          {/* Помощь */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Помощь
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Доставка
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Оплата
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Возврат товара
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Вопросы и ответы
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Контакты
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Соцсети и способы оплаты */}
        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-gray-800 pt-8 md:flex-row">
          {/* Соцсети */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Мы в соцсетях:</span>
            <div className="flex gap-3">
                <a
                    href="https://github.com/picell136"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-gray-700"
                    >
                    <LuGithub className="h-4 w-4" />
                </a>
            </div>
          </div>

          {/* Способы оплаты */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Мы принимаем:</span>
            <div className="flex gap-3">
              <div className="flex h-9 w-14 items-center justify-center rounded bg-gray-800">
                <CreditCard className="h-5 w-5" />
              </div>
              <div className="flex h-9 w-14 items-center justify-center rounded bg-gray-800">
                <Wallet className="h-5 w-5" />
              </div>
              <div className="flex h-9 w-14 items-center justify-center rounded bg-gray-800">
                <Smartphone className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть с копирайтом */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-gray-500 md:flex-row">
          <p>
            © {currentYear} OrderShip. Все права защищены.
          </p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-white">
              Политика конфиденциальности
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}