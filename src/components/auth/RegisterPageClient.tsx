"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { UserPlus } from "lucide-react";

import { useAppDispatch } from "@/store";
import { login } from "@/store/userSlice";
import { addUser, isUserExists } from "@/lib/users";
import { User } from "@/types";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>();

  const password = watch("password");

  const onSubmit: SubmitHandler<RegisterFormValues> = (values) => {
    setError(null);

    // Проверка совпадения паролей
    if (values.password !== values.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    // Проверка, существует ли уже пользователь с таким email
    if (isUserExists(values.email)) {
      setError("Пользователь с таким email уже зарегистрирован");
      return;
    }

    // Создаём пользователя
    const user: User & { password: string } = {
      id: crypto.randomUUID(),
      name: values.name,
      email: values.email,
      password: values.password,
      registeredAt: new Date().toISOString(),
    };

    addUser(user);

    const { password: _, ...userWithoutPassword } = user;
    dispatch(login(userWithoutPassword));

    router.push("/profile");
  };

  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg border p-8">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <UserPlus className="h-7 w-7 text-gray-600" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">Регистрация</h1>
            <p className="mt-2 text-sm text-gray-500">
              Создайте аккаунт для оформления заказов
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            {/* Имя */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Имя
              </label>
              <input
                {...register("name", {
                  required: "Введите имя",
                  minLength: { value: 2, message: "Минимум 2 символа" },
                })}
                className="w-full rounded-lg border px-4 py-2 text-sm focus:border-black focus:outline-none"
                placeholder="Иван Иванов"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Введите email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Некорректный email",
                  },
                })}
                className="w-full rounded-lg border px-4 py-2 text-sm focus:border-black focus:outline-none"
                placeholder="example@mail.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Пароль */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Пароль
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Введите пароль",
                  minLength: { value: 4, message: "Минимум 4 символа" },
                })}
                className="w-full rounded-lg border px-4 py-2 text-sm focus:border-black focus:outline-none"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Подтверждение пароля */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Подтвердите пароль
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Подтвердите пароль",
                  validate: (value) =>
                    value === password || "Пароли не совпадают",
                })}
                className="w-full rounded-lg border px-4 py-2 text-sm focus:border-black focus:outline-none"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Ошибка */}
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Кнопка регистрации */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
            >
              Зарегистрироваться
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Уже есть аккаунт?{" "}
            <Link
              href="/login"
              className="font-medium text-gray-900 hover:underline"
            >
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}