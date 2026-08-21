"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { hydrate as hydrateCart } from "@/store/cartSlice";
import { hydrate as hydrateFavorites } from "@/store/favoritesSlice";
import { hydrate as hydrateOrders }  from "@/store/ordersSlice";
import { hydrate as hydrateUser } from "@/store/userSlice";
import { hydrate as hydrateReviews } from "@/store/reviewsSlice";

const STORAGE_KEY = "ordership-store";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  // Гидратация при загрузке
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.cart) store.dispatch(hydrateCart(parsed.cart));
        if (parsed.favorites)
          store.dispatch(hydrateFavorites(parsed.favorites));
        if (parsed.orders) store.dispatch(hydrateOrders(parsed.orders));
        if (parsed.user) store.dispatch(hydrateUser(parsed.user));
        if (parsed.reviews) store.dispatch(hydrateReviews(parsed.reviews));
      }
    } catch (error) {
      console.error("Ошибка гидратации:", error);
    } finally {
      setIsReady(true);
    }
  }, []);

  // Сохранение при изменении
  useEffect(() => {
    if (!isReady) return;

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            cart: state.cart,
            favorites: state.favorites,
            orders: state.orders,
            user: state.user,
            reviews: state.reviews,
          })
        );
      } catch (error) {
        console.error("Ошибка сохранения:", error);
      }
    });

    return unsubscribe;
  }, [isReady]);

  if (!isReady) return null;

  return <Provider store={store}>{children}</Provider>;
}