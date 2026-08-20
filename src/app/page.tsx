import type { Metadata } from "next";
import { HomePageClient } from "@/components/pages/HomePageClient";

export const metadata: Metadata = {
  title: "Главная",
  description:
    "Откройте для себя лучшие товары по выгодным ценам. Быстрая доставка и гарантия качества.",
};

export default function HomePage() {
  return <HomePageClient />;
}