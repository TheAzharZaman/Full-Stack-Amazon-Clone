// Creating a container to store something in a data layer by assining a initial state

const initialState = {
  basket: [],
  currentUser: null,
  fetchedUserDetails: {},
  needToRedirectToCheckout: false,
  formState: true,
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

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: action.newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        currentUser: action.user,
      };

    case "SET_FETCHED_DETAILS":
      return {
        ...state,
        fetchedUserDetails: action.fetchedData,
      };

    case "SET_REDIRECT_TO_CHECKOUT":
      return {
        ...state,
        needToRedirectToCheckout: action.stateValue,
      };

    case "SET_FORM_STATE":
      return {
        ...state,
        formState: action.state,
      };
  }
};

export default reducer;

export { initialState, basketTotal };

// case "REMOVE_FROM_BASKET":
// return {
//   ...state,
//   basket: state.basket.filter((item) => item.id !== action.id),
// };
