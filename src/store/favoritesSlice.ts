import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  productIds: string[];
}

const initialState: FavoritesState = {
  productIds: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.productIds.indexOf(id);

      if (index > -1) {
        state.productIds.splice(index, 1);
      } else {
        state.productIds.push(id);
      }
    },

    clearFavorites(state) {
      state.productIds = [];
    },

    // Для гидратации из localStorage
    hydrate(_state, action: PayloadAction<FavoritesState>) {
      return action.payload;
    },
  },
});

export const { toggleFavorite, clearFavorites, hydrate } = favoritesSlice.actions;
export default favoritesSlice.reducer;