import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersState, SortOption } from "@/types";

const initialState: FiltersState = {
  search: "",
  category: null,
  priceMin: null,
  priceMax: null,
  sort: "popular",
  page: 1,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },

    setCategory(state, action: PayloadAction<string | null>) {
      state.category = action.payload;
      state.page = 1;
    },

    setPriceMin(state, action: PayloadAction<number | null>) {
      state.priceMin = action.payload;
      state.page = 1;
    },

    setPriceMax(state, action: PayloadAction<number | null>) {
      state.priceMax = action.payload;
      state.page = 1;
    },

    setSort(state, action: PayloadAction<SortOption>) {
      state.sort = action.payload;
      state.page = 1;
    },

    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setSearch,
  setCategory,
  setPriceMin,
  setPriceMax,
  setSort,
  setPage,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;