import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import AmazonLogo from "./logo.png";
import "./CheckoutPayment.css";
import { Link } from "react-scroll";
import { db } from "../Files/firebase";
import useStateValue from "../Files/StateProvider";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
import { basketTotal } from "../Files/reducer";

const CheckoutPayment = () => {
  const [{ currentUser, basket }, dispatch] = useStateValue();
  const [fetchedData, setFetchedData] = useState({});
  const [localBasket, setLocalBasket] = useState(
    localStorage.getItem("basket")
      ? JSON.parse(localStorage.getItem("basket"))
      : basket
  );
  const [addressPresentInDatabase, setAddressPresentInDatabase] = useState(
    false
  );
  const [sortedBasket, setSortedBasket] = useState([]);
  const history = useHistory();

  useEffect(() => {
    db.collection("users")
      .doc(currentUser?.uid)
      .onSnapshot((doc) => {
        setFetchedData(doc.data());
        if (doc.data()?.addressAdded) {
          setAddressPresentInDatabase(doc.data()?.addressAdded);
        }
      });
  }, [currentUser]);

  useEffect(() => {
    const sortBasket = () => {
      return localBasket.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    };

    setSortedBasket(sortBasket);
  }, [localBasket]);

  return (
    <div className="checkout__payment">
      <div className="checkout__content flexColumn">
        <div className="checkout__header flexColumn">
          <div className="checkoutHeader__steps flexRow">
            <Link to="/">
              <img src={AmazonLogo} alt="" />
            </Link>
            <div className="header__steps flexRow">
              <h3 className="passed">LOGIN</h3>
              <h3 className="passed">SHIPPING ADDRESS</h3>
              <h3 className="active">PAYMENT & ORDER PLACEMENT</h3>
            </div>
          </div>
          <div className="checkoutHeader__paymentPage">
            <p>
              Please verify your Shipping address, if its not your desired
              address, just click edit, please also check your cart again, if
              you want to change your shoping cart products just click update.
              If everything is all right just Checkout.
            </p>
          </div>
        </div>
        <div className="checkoutPayment__mainContent flexRow">
          <div className="checkoutPayment__left flexColumn">
            <div className="checkoutPayment__addressVerify">
              {addressPresentInDatabase && (
                <div
                  style={{ marginBottom: 32 }}
                  className="alreadyPresent__address extraMargin"
                >
                  <h2>Order will be shipped to</h2>
                  <strong>{fetchedData?.address.fullName}</strong>
                  <h3>{fetchedData?.address.addressLineOne}</h3>
                  <h3>
                    <span>{fetchedData?.address.addressLineTwo}</span>,
                    <span>{fetchedData?.address.zipCode}</span>
                  </h3>
                  <h3>
                    <span>{fetchedData?.address.city}</span>,
                    <span>{fetchedData?.address.province}</span>,
                    <span>{fetchedData?.address.country}</span>
                  </h3>
                  <h3>Phone: {fetchedData?.address.phoneNo}</h3>
                  <div>
                    <div className="address__controls flexRow">
                      <button>Edit</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="checkoutPayment__cartOverview">
              <h3>Your Basket</h3>
              <div className="checkout__productsList">
                {localBasket?.length > 0 &&
                  sortedBasket?.map((product) => (
                    <CheckoutProduct
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      imgUrl={product.imgUrl}
                      price={product.price}
                      localBasket={localBasket}
                      setLocalBasket={setLocalBasket}
                    />
                  ))}
              </div>
              <div className="checkout__totalSection flexRow">
                {/* <Link to="/cart">
                  <h3 className="mainHoverEffect goToBasket">Go to basket</h3>
                </Link> */}
                {localBasket?.length > 0 && (
                  <h3 className="checkoutProductsList__subTotal">
                    <span>Total ({localBasket.length} items):</span>

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
            </div>
          </div>
          <div className="checkoutPayment__right">
            <h3>Checkout</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutProduct = ({
  title,
  id,
  imgUrl,
  price,
  localBasket,
  setLocalBasket,
}) => {
  const [{ basket }, dispatch] = useStateValue();
  const [productQuantity, setProductQuantity] = useState(
    localBasket.find((product) => product.id === id)?.qty
  );

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

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      payload: {
        id: id,
        setLocalBasket: setLocalBasket,
        localBasket: localBasket,
      },
    });
  };

  return (
    <div className="checkout__product flexRow">
      <img className="checkout__productImage" src={imgUrl} />
      <div className="checkout__productInfo flexColumn">
        <h3 className="checkout__productTitle mainHoverEffect">{title}</h3>
        <div className="checkoutProduct__controls flexRow">
          <FormControl className="checkoutProduct__qtyDropdown">
            <span>Qty:</span>
            <Select
              className="checkoutProduct__qtySelect"
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
          <h3
            onClick={removeFromBasket}
            className="checkoutProduct__removeButton"
          >
            Remove from cart
          </h3>
        </div>
      </div>
      <p className="checkout__productPrice">
        <strong>${price}</strong>
      </p>
    </div>
  );
};

export default CheckoutPayment;
