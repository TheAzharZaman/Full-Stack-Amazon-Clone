import React, { useState, useEffect } from "react";
import "./ShopingCart.css";
import "../Components/Product.css";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import { basketTotal } from "../Files/reducer";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_FROM_BASKET, selectBasket } from "../redux/slices/basketSlice";
import { SET_REDIRECT_TO_CHECKOUT } from "../redux/slices/userSlice";
import { selectUser } from "../redux/slices/userSlice";
import useStateValue from "../Files/StateProvider";

const ShopingCart = () => {
  // const basket = useSelector(selectBasket);
  const [{ basket }, dispatch] = useStateValue();
  const [localBasket, setLocalBasket] = useState(
    localStorage.getItem("basket")
      ? JSON.parse(localStorage.getItem("basket"))
      : basket
  );
  // const [localBasket, setLocalBasket] = useState(basket);

  const [sortedBasket, setSortedBasket] = useState([]);

  useEffect(() => {
    const sortBasket = () => {
      return localBasket.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    };

    setSortedBasket(sortBasket);
  }, [localBasket]);

  const emptyCart = () => {
    dispatch({
      type: "EMPTY_BASKET",
      newBasket: [],
    });
    localStorage.clear();
    setLocalBasket([]);
  };

  return (
    <div className="shopingCart flexColumn">
      <div className="shopingCart__mainSection flexRow evenly">
        <div className="shopingCart__left flexColumn">
          <div className="shopingCart__leftHeader flexRow">
            <div>
              <span class="shopingCart__emptyTagline">
                {localBasket?.length < 1
                  ? "Your Shopping Cart is empty"
                  : "Shoping Cart"}
              </span>
              {localBasket?.length > 0 && (
                <h3
                  onClick={emptyCart}
                  className="shopingCart__deselectAll mainHoverEffect"
                >
                  Deselect all items
                </h3>
              )}
              {localBasket?.length < 1 && (
                <div className="shopingCart__emptyStatus">
                  <h3>
                    Return to products <Link to="/"> page</Link>
                  </h3>
                </div>
              )}
            </div>
            {localBasket?.length > 0 && <h3>Price</h3>}
          </div>
          <div className="shopingCart__productsList">
            {localBasket?.length > 0 &&
              localBasket.map((product) => (
                <ShopingCartProduct
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  imgUrl={product.imgUrl}
                  rating={product.rating}
                  price={product.price}
                  setLocalBasket={setLocalBasket}
                  localBasket={localBasket}
                />
              ))}
          </div>
          {localBasket?.length > 0 && (
            <h3 className="productsList__subTotal">
              <span>Subtotal ({localBasket.length} items):</span>

              <CurrencyFormat
                decimalScale={2}
                value={basketTotal(localBasket)}
                displayType={"text"}
                thousandSeperator={true}
                prefix={"$"}
                renderText={(value) => <strong>{value}</strong>}
              />
            </h3>
          )}
        </div>
        <div className="shopingCart__right flexColumn">
          <SubTotal numberOfItems={localBasket?.length} basket={localBasket} />
        </div>
      </div>
    </div>
  );
};

const SubTotal = ({ numberOfItems, basket }) => {
  const dispatchRedux = useDispatch();
  const currentUser = useSelector(selectUser);

  const setUserPendingState = () => {
    if (!currentUser) {
      dispatchRedux(SET_REDIRECT_TO_CHECKOUT(true));
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
        to={
          currentUser ? "/checkout/add-your-shipping-address" : "/auth/signin"
        }
      >
        <button disabled={basket.length < 1}>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

const ShopingCartProduct = ({
  id,
  title,
  rating,
  price,
  imgUrl,
  setLocalBasket,
  localBasket,
}) => {
  const dispatchRedux = useDispatch();

  const [{ basket }, dispatch] = useStateValue();
  const [productQuantity, setProductQuantity] = useState(
    localBasket.find((product) => product.id === id)?.qty
  );
  const removeFromBasket = () => {
    dispatchRedux(
      REMOVE_FROM_BASKET({
        id: id,
        setLocalBasket: setLocalBasket,
        localBasket: localBasket,
      })
    );
    // dispatch({
    //   type: "REMOVE_FROM_BASKET",
    //   payload: {
    //     id: id,
    //     setLocalBasket: setLocalBasket,
    //     localBasket: localBasket,
    //   },
    // });
  };

  const onQtyChange = (e) => {
    setProductQuantity(e.target.value);
    let alteredProduct = localBasket.find((product) => product.id === id);

    alteredProduct.qty = parseFloat(e.target.value);

    if (e.target.value > 0) {
      localStorage.setItem("basket", JSON.stringify(localBasket));

      dispatch({
        type: "UPDATE_BASKET_ON_QTY_CHANGE",
        basket: localBasket,
      });
    } else {
      dispatch({
        type: "REMOVE_FROM_BASKET",
        payload: {
          id: id,
          setLocalBasket: setLocalBasket,
          localBasket: localBasket,
        },
      });
    }
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

        <FormControl className="productQty__dropdown">
          <span>Qty:</span>
          <Select
            className="productQty__select"
            onChange={onQtyChange}
            variant="outlined"
            value={productQuantity}
          >
            <MenuItem className="menuItem" value="0">
              0
            </MenuItem>
            <MenuItem className="menuItem" value="1">
              1
            </MenuItem>
            <MenuItem className="menuItem" value="2">
              2
            </MenuItem>
            <MenuItem className="menuItem" value="3">
              3
            </MenuItem>
            <MenuItem className="menuItem" value="4">
              4
            </MenuItem>
            <MenuItem className="menuItem" value="5">
              5
            </MenuItem>
            <MenuItem className="menuItem" value="6">
              6
            </MenuItem>
            <MenuItem className="menuItem" value="7">
              7
            </MenuItem>
            <MenuItem className="menuItem" value="8">
              8
            </MenuItem>
            <MenuItem className="menuItem" value="9">
              9
            </MenuItem>
            <MenuItem className="menuItem" value="10">
              10
            </MenuItem>
          </Select>
        </FormControl>
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
