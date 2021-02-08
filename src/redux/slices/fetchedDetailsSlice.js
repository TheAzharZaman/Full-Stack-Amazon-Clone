import { createSlice } from "@reduxjs/toolkit";

export const fetchedUserDetailsSlice = createSlice({
  name: "fetchedUserDetails",
  initialState: {
    fetchedUserDetails: {},
  },
  reducers: {
    SET_FETCHED_DETAILS: (state, action) => {
      return {
        ...state,
        fetchedUserDetails: action.payload,
      };
    },
  },
});

export const { SET_FETCHED_DETAILS } = fetchedUserDetailsSlice.actions;

export const selectFetchedUserDetails = (state) =>
  state.fetchedDetailsStore.fetchedUserDetails;

export default fetchedUserDetailsSlice.reducer;
