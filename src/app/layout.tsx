import type { ReactNode } from "react";
import Providers from "@/components/providers/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* <CartDrawer /> */}
        </Providers>
      </body>
    </html>
  );
}