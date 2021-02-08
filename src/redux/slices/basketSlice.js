import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "counter",
  initialState: {
    basket: [],
  },
  reducers: {
    ADD_TO_BASKET: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };
    },

    REMOVE_FROM_BASKET: (state, action) => {
      const newBasketAfterRemovingProduct = action.payload.localBasket.filter(
        (product) => product.id !== action.payload.id
      );

      localStorage.setItem(
        "basket",
        JSON.stringify(newBasketAfterRemovingProduct)
      );

      action.payload.setLocalBasket(newBasketAfterRemovingProduct);

      return {
        ...state,
        basket: newBasketAfterRemovingProduct,
      };
    },
    EMPTY_BASKET: (state, action) => {
      return {
        ...state,
        basket: action.payload,
      };
    },
    UPDATE_BASKET_ON_QTY_CHANGE: (state, action) => {
      return {
        ...state,
        basket: action.payload,
      };
    },
  },
});

export const {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  EMPTY_BASKET,
  UPDATE_BASKET_ON_QTY_CHANGE,
} = basketSlice.actions;

export const selectBasket = (state) => state.basketStore.basket;

export default basketSlice.reducer;
