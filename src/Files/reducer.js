// Creating a container to store something in a data layer by assining a initial state

const initialState = {
  basket: [],
  currentUser: null,
};

const basketTotal = (basket) => {
  return basket?.reduce((amount, item) => item.price + amount, 0);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_BASKET":
      const itemIndexToBeRemoved = state.basket.findIndex(
        (basketItemToBeRemoved) => basketItemToBeRemoved.id === action.id
      );

      let newBasketAfterRemovingProduct = [...state.basket];

      if (itemIndexToBeRemoved >= 0) {
        newBasketAfterRemovingProduct.splice(itemIndexToBeRemoved, 1);
      } else {
        console.warn(
          `Cannot Remove product (id: ${action.id}), as it is not present in Basket`
        );
      }

      return {
        ...state,
        basket: newBasketAfterRemovingProduct,
      };

    default:
      return state;

    // case "REMOVE_FROM_BASKET":
    //   return {
    //     ...state,
    //     currentUser: action.user,
    //   }
  }
};

export default reducer;

export { initialState, basketTotal };

// case "REMOVE_FROM_BASKET":
// return {
//   ...state,
//   basket: state.basket.filter((item) => item.id !== action.id),
// };
