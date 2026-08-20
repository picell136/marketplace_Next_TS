import type { ReactNode } from "react";
import type { Metadata } from "next";
import Providers from "@/components/providers/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Marketplace — интернет-магазин",
    template: "%s | Marketplace",
  },
  description:
    "Онлайн-маркетплейс с тысячами товаров по выгодным ценам. Быстрая доставка и гарантия качества.",
  keywords: ["маркетплейс", "интернет-магазин", "товары", "покупки"],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}