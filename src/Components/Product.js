import React from "react";
import "./Product.css";
import useStateValue from "../Files/StateProvider";

const Product = ({ id, title, price, imgUrl, rating }) => {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // Dispatch a product to the Data layer (in our case data layer is a basket)

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        price: price,
        rating: rating,
        imgUrl: imgUrl,
      },
    });
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
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default Product;
