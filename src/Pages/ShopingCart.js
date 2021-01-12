import React, { useState, useEffect } from "react";
import "./ShopingCart.css";
import "../Components/Product.css";
import CurrencyFormat from "react-currency-format";
import useStateValue from "../Files/StateProvider";
import { Link } from "react-router-dom";
import { basketTotal } from "../Files/reducer";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

const ShopingCart = () => {
  const [{ basket, currentUser }, dispatch] = useStateValue();
  const [sortedBasket, setSortedBasket] = React.useState([]);

  useEffect(() => {
    const sortBasket = () => {
      return basket.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    };

    setSortedBasket(sortBasket);
  }, [basket]);

  const emptyCart = () => {
    dispatch({
      type: "EMPTY_BASKET",
      newBasket: [],
    });
  };

  return (
    <div className="shopingCart flexColumn">
      <div className="shopingCart__mainSection flexRow evenly">
        <div className="shopingCart__left flexColumn">
          <div className="shopingCart__leftHeader flexRow">
            <div>
              <span class="shopingCart__emptyTagline">Shopping Cart</span>
              {basket.length > 0 && (
                <h3
                  onClick={emptyCart}
                  className="shopingCart__deselectAll mainHoverEffect"
                >
                  Deselect all items
                </h3>
              )}
              {basket.length < 1 && (
                <div className="shopingCart__emptyReturnBox">
                  <h5>Please return to products page to select something</h5>
                  <Link to="/">
                    <KeyboardReturnIcon />
                  </Link>
                </div>
              )}
            </div>
            {basket.length > 0 && <h3>Price</h3>}
          </div>
          <div className="shopingCart__productsList">
            {basket.length > 0 &&
              sortedBasket.map((product) => (
                <ShopingCartProduct
                  id={product.id}
                  title={product.title}
                  imgUrl={product.imgUrl}
                  rating={product.rating}
                  price={product.price}
                />
              ))}
          </div>
          {basket.length > 0 && (
            <h3 className="productsList__subTotal">
              <span>Subtotal ({basket.length} items):</span>

              <CurrencyFormat
                decimalScale={2}
                value={basketTotal(basket)}
                displayType={"text"}
                thousandSeperator={true}
                prefix={"$"}
                renderText={(value) => <strong>{value}</strong>}
              />
            </h3>
          )}
        </div>
        <div className="shopingCart__right flexColumn">
          <SubTotal numberOfItems={basket.length} basket={basket} />
        </div>
      </div>
    </div>
  );
};

const SubTotal = ({ numberOfItems, basket }) => {
  const [{ currentUser }, dispatch] = useStateValue();

  const setUserPendingState = () => {
    if (!currentUser) {
      dispatch({
        type: "SET_REDIRECT_TO_CHECKOUT",
        stateValue: true,
      });
    }
  };

  return (
    <div className="subtotal flexColumn between">
      <CurrencyFormat
        decimalScale={2}
        value={basketTotal(basket)}
        displayType={"text"}
        thousandSeperator={true}
        prefix={"$"}
        renderText={(value) => (
          <>
            <p className="subtotal__info">
              Subtotal ({numberOfItems} items):
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
      />
      <Link
        onClick={setUserPendingState}
        to={currentUser ? "checkout" : "user_authentication"}
      >
        <button disabled={basket.length < 1}>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

const ShopingCartProduct = ({ id, title, rating, price, imgUrl }) => {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    // Remove from from data layer by dispatching
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="shopingCart__product flexRow">
      <img className="shopingCart__productImage" src={imgUrl} />
      <div className="shopingCart__productInfo">
        <h3 className="shopingCart__productTitle mainHoverEffect">{title}</h3>
        <div className="shopingCart__productRating flexRow">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        <div className="gift">
          <input type="checkbox" />
          <h3> This product is a gift</h3>
        </div>
        <h3 onClick={removeFromBasket} className="shopingCart__productButton">
          Remove from cart
        </h3>
      </div>
      <p className="shopingCart__productPrice">
        <strong>${price}</strong>
      </p>
    </div>
  );
};

export default ShopingCart;
