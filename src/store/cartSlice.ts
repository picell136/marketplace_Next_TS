// src/store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeCartItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },

    setCartItemQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    // Увеличить количество на 1
    incrementCartItem(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (item) => item.productId === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },

    // Уменьшить количество на 1
    decrementCartItem(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (item) => item.productId === action.payload
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (i) => i.productId !== action.payload
          );
        }
      }
    },

    clearCart(state) {
      state.items = [];
    },

    // Для гидратации из localStorage
    hydrate(_state, action: PayloadAction<CartState>) {
      return action.payload;
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  setCartItemQuantity,
  incrementCartItem,
  decrementCartItem,
  clearCart,
  hydrate,
} = cartSlice.actions;

export default cartSlice.reducer;