import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    needToRedirectToCheckout: false,
  },
  reducers: {
    SET_USER: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    SET_REDIRECT_TO_CHECKOUT: (state, action) => {
      return {
        ...state,
        needToRedirectToCheckout: action.payload,
      };
    },
  },
});

export const { SET_USER, SET_REDIRECT_TO_CHECKOUT } = userSlice.actions;

export const selectUser = (state) => state.userStore.currentUser;
export const selectRedirectToCheckout = (state) =>
  state.userStore.needToRedirectToCheckout;

export default userSlice.reducer;
