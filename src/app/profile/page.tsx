import type { Metadata } from "next";
import { ProfilePageClient } from "@/components/profile/ProfilePageClient";

export const metadata: Metadata = {
  title: "Мой профиль",
  description: "Управляйте своим профилем и заказами.",
};

export default function ProfilePage() {
  return <ProfilePageClient />;
}