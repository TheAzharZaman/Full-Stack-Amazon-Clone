import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";
import fetchedUserDetailsReducer from "./slices/fetchedDetailsSlice";
import userReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    basketStore: basketReducer,
    userStore: userReducer,
    fetchedDetailsStore: fetchedUserDetailsReducer,
  },
});
