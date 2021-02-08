// Creating a container to store something in a data layer by assining a initial state

const initialState = {
  basket: [],
  currentUser: null,
};

const basketTotal = (basket, extra) => {
  return basket?.reduce((amount, item) => item.price * item.qty + amount, 0);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_BASKET":
      // const itemIndexToBeRemoved = state.basket.findIndex(
      //   (basketItemToBeRemoved) =>
      //     basketItemToBeRemoved.id === action.payload.id
      // );

      // let newBasketAfterRemovingProduct = [...state.basket];

      // if (itemIndexToBeRemoved >= 0) {
      //   newBasketAfterRemovingProduct.splice(itemIndexToBeRemoved, 1);
      // } else {
      //   console.warn(
      //     `Cannot Remove product (id: ${action.payload.id}), as it is not present in Basket`
      //   );
      // }

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

    default:
      return state;

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: action.newBasket,
      };

    case "SET_USERR":
      return {
        ...state,
        currentUser: action.user,
      };

    case "SET_FORM_STATE":
      return {
        ...state,
        formState: action.state,
      };

    case "UPDATE_BASKET_ON_QTY_CHANGE":
      return {
        ...state,
        basket: action.basket,
      };
  }
};

export default reducer;

export { initialState, basketTotal };
