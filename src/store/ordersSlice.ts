import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "@/types";

interface OrdersState {
  items: Order[];
}

const initialState: OrdersState = {
  items: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.items.unshift(action.payload);
    },

    clearOrders(state) {
      state.items = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;