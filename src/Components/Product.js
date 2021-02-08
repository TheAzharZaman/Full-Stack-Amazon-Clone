import React, { useState, useEffect } from "react";
import "./Product.css";
import useStateValue from "../Files/StateProvider";
import { ADD_TO_BASKET } from "../redux/slices/basketSlice";
import { useDispatch } from "react-redux";

const Product = ({ id, title, price, imgUrl, rating }) => {
  const dispatchRedux = useDispatch();
  const [{ basket }, dispatch] = useStateValue();
  const [objectPresentInBasket, setObjectPresentInBasket] = useState(undefined);

  useEffect(() => {
    const tracedProduct = basket.find((product) => product.id === id);
    setObjectPresentInBasket(tracedProduct);
  }, [basket]);

  const addToBasketOrRemoveFromBasket = () => {
    // Dispatch a product to the Data layer (in our case data layer is a basket)

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        price: price,
        rating: rating,
        imgUrl: imgUrl,
        qty: 1,
      },
    });
    dispatchRedux(
      ADD_TO_BASKET({
        id: id,
        title: title,
        price: price,
        rating: rating,
        imgUrl: imgUrl,
        qty: 1,
      })
    );
  };
  return (
    <div className="product">
      <div className="product__info">
        <p className="product__title mainHoverEffect">{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
      <div className="product__rating flexRow">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <p>⭐</p>
          ))}
      </div>
      <div className="product__images">
        <img src={imgUrl} alt="Oops... Product images missing" />
      </div>
      <button
        disabled={objectPresentInBasket}
        onClick={addToBasketOrRemoveFromBasket}
      >
        {objectPresentInBasket ? "Added to Basket" : "Add to Basket"}
      </button>
    </div>
  );
};

export default Product;
