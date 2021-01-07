import React, { useState, useEffect } from "react";
import "./ShopingCart.css";
import CurrencyFormat from "react-currency-format";
import useStateValue from "../Files/StateProvider";
import { Link } from "react-router-dom";
import { basketTotal } from "../Files/reducer";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { db } from "../Files/firebase";

const ShopingCart = () => {
  const [{ basket, currentUser }, dispatch] = useStateValue();
  const [sortedBasket, setSortedBasket] = React.useState([]);
  const [fetchedData, setFetchedData] = useState({});
  const [userID, setUserID] = useState(localStorage.getItem("userID"));

  useEffect(() => {
    const sortBasket = () => {
      return basket.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    };

    const fetchDataFromDB = () => {
      const docRef = db.collection("users").doc(userID);

      docRef.get().then((doc) => {
        setFetchedData(doc.data());
      });
    };

    fetchDataFromDB();

    setSortedBasket(sortBasket);
  }, [basket]);

  return (
    <div className="shopingCart flexRow evenly">
      <div className="shopingCart__left flexColumn">
        <div className="shopingCart__tagline">
          {basket.length < 1 && (
            <div>
              <span class="shopingCart__emptyTagline">
                {fetchedData?.displayName} Your Shoping Basket is Empty
              </span>
              <div className="shopingCart__emptyReturnBox">
                <h5>Please return to products page to select something</h5>
                <Link to="/">
                  <KeyboardReturnIcon />
                </Link>
              </div>
            </div>
          )}
          {basket.length > 0 && (
            <span>{fetchedData?.displayName} Your Shoping Basket</span>
          )}
          {/* <h3>Your Shoping basket</h3> */}
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
      </div>
      <div className="shopingCart__right flexColumn">
        <SubTotal numberOfItems={basket.length} basket={basket} />
      </div>
    </div>
  );
};

const SubTotal = ({ numberOfItems, basket }) => {
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
      <Link to="checkout">
        <button>Proceed to Checkout</button>
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
        <h3 className="shopingCart__productTitle">{title}</h3>
        <p className="shopingCart__productPrice">
          <small>$</small> <strong>{price}</strong>
        </p>
        <div className="shopingCart__productRating flexRow">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        <button
          onClick={removeFromBasket}
          className="shopingCart__productButton"
        >
          Remove from cart
        </button>
      </div>
    </div>
  );
};

export default ShopingCart;
