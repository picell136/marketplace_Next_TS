"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { LogIn } from "lucide-react";

import { useAppDispatch } from "@/store";
import { login } from "@/store/userSlice";
import { findUserByEmail, checkPassword } from "@/lib/users";
import { User } from "@/types";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (values) => {
    setError(null);

    // Проверяем, существует ли пользователь
    const user = findUserByEmail(values.email);

    if (!user) {
      setError("Аккаунт с таким email не найден. Зарегистрируйтесь.");
      return;
    }

    // Проверяем пароль
    const isPasswordCorrect = checkPassword(values.email, values.password);

    if (!isPasswordCorrect) {
      setError("Неверный пароль");
      return;
    }

    const { password: _, ...userWithoutPassword } = user as User & {
      password: string;
    };

    dispatch(login(userWithoutPassword));
    router.push("/profile");
  };

  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg border p-8">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <LogIn className="h-7 w-7 text-gray-600" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">Вход в аккаунт</h1>
            <p className="mt-2 text-sm text-gray-500">
              Введите email и пароль для входа
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
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

            {/* Password */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Пароль
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Введите пароль",
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

            {/* Ошибка */}
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Кнопка входа */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
            >
              Войти
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Нет аккаунта?{" "}
            <Link
              href="/register"
              className="font-medium text-gray-900 hover:underline"
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}