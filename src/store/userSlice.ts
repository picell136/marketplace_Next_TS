import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthState } from "@/types";

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },

    logout(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
    },

    updateProfile(state, action: PayloadAction<Partial<User>>) {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },

    hydrate(_state, action: PayloadAction<AuthState>) {
      return action.payload;
    },
  },
});

export const { login, logout, updateProfile, hydrate } = userSlice.actions;
export default userSlice.reducer;