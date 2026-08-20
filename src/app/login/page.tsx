import type { Metadata } from "next";
import { LoginPageClient } from "@/components/auth/LoginPageClient";

export const metadata: Metadata = {
  title: "Вход в аккаунт",
  description: "Войдите в свой аккаунт для оформления заказов.",
};

export default function LoginPage() {
  return <LoginPageClient />;
}