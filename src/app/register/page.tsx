import type { Metadata } from "next";
import { RegisterPageClient } from "@/components/auth/RegisterPageClient";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Создайте аккаунт для оформления заказов.",
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}