import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import { dummyJsonApi } from "./api";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";
import filtersReducer from "./filtersSlice";
import ordersReducer from "./ordersSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
    orders: ordersReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyJsonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;