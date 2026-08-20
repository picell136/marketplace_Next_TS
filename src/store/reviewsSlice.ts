import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReview } from "@/types";

interface ReviewsState {
  items: UserReview[];
}

const initialState: ReviewsState = {
  items: [],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview(state, action: PayloadAction<UserReview>) {
      state.items.unshift(action.payload);
    },

    deleteReview(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (review) => review.id !== action.payload
      );
    },

    clearReviews(state) {
      state.items = [];
    },

    hydrate(_state, action: PayloadAction<ReviewsState>) {
      return action.payload;
    },
  },
});

export const { addReview, deleteReview, clearReviews, hydrate } =
  reviewsSlice.actions;

export default reviewsSlice.reducer;