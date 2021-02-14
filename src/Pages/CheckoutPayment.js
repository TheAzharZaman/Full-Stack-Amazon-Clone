import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AmazonLogo from "./logo.png";
import "./CheckoutPayment.css";
import { db } from "../Files/firebase";
import useStateValue from "../Files/StateProvider";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import CurrencyFormat from "react-currency-format";
import { basketTotal } from "../Files/reducer";
import {
  CardExpiryElement,
  CardNumberElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectFetchedUserDetails } from "../redux/slices/fetchedDetailsSlice";
import { selectUser } from "../redux/slices/userSlice";

const CheckoutPayment = () => {
  const currentUser = useSelector(selectUser);
  const fetchedUserDetails = useSelector(selectFetchedUserDetails);
  const [{ basket }, dispatch] = useStateValue();
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
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [privacyNotice, setPrivacyNotice] = useState(false);
  const [setOrderPlacedSuccesfully, setSetOrderPlacedSuccesfully] = useState(
    false
  );
  const [processing, setProcessing] = useState(false);

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

  const placeOrder = async () => {
    if (termsOfUse) {
      document
        .getElementById("termsAndConditions__error")
        .classList.remove("showTerms___errorIcon");
    }

    if (privacyNotice) {
      document
        .getElementById("privacyPolicy__error")
        .classList.remove("showPrivacy___errorIcon");
    }

    if (!termsOfUse) {
      document
        .getElementById("termsAndConditions__error")
        .classList.add("showTerms___errorIcon");
    } else if (!privacyNotice) {
      document
        .getElementById("privacyPolicy__error")
        .classList.add("showPrivacy___errorIcon");
    } else {
      setProcessing(true);

      document
        .getElementById("termsAndConditions__error")
        .classList.remove("showTerms___errorIcon");
      document
        .getElementById("privacyPolicy__error")
        .classList.remove("showPrivacy___errorIcon");

      await db
        .collection("users")
        .doc(currentUser?.uid)
        .collection("orders")
        .doc(`${fetchedUserDetails?.ordersPlaced + 1}`)
        .set({
          address: fetchedData?.address,
          cart: localBasket,
          orderInfo: {
            orderTotalAmountInDollers: basketTotal(localBasket),
            orderTotalItems: localBasket.length,
            orderNumber: fetchedUserDetails?.ordersPlaced + 1,
            orderTimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
          },
        });

      await db
        .collection("users")
        .doc(currentUser?.uid)
        .set(
          {
            ordersPlaced: fetchedUserDetails?.ordersPlaced + 1,
          },
          { merge: true }
        );
      setProcessing(false);
      dispatch({
        type: "EMPTY_BASKET",
        newBasket: [],
      });
      localStorage.removeItem("basket");
      setLocalBasket([]);
      history.push("/order-placed-notification");
    }
  };

  return (
    <div className="checkout__payment">
      <div className="checkout__content flexColumn">
        <div className="checkout__header flexColumn">
          <div className="checkoutHeader__steps flexRow">
            <img src={AmazonLogo} alt="" />
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
                      <button
                        onClick={() =>
                          history.push("/checkout/add-your-shipping-address")
                        }
                      >
                        Edit
                      </button>
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
            <h3>Please enter your Card details</h3>
            <p>
              As this is a demo app, no money will be deducted from your
              account, or enter dummy account details with same pattern, then
              click 'Place Order' button to recieve confirmation notificaton
            </p>

            {/* Card Inputs */}
            <div className="cardDetails__inputs flexColumn">
              <div className="cardInput cardNumber__input flexColumn">
                <h4>Enter your Credit/Debit card number</h4>
                <CardNumberElement />
              </div>
              <div className="cardCVExpiry__inputs flexRow">
                <div className="cardInput cardExpiry__input flexColumn">
                  <h4>Enter card expiry date</h4>
                  <CardExpiryElement />
                </div>
                <div className="cardInput cardCvc__input flexColumn">
                  <h4>Enter card Cvc </h4>
                  <CardCvcElement />
                </div>
              </div>
            </div>

            {/* Terms And Conditions */}
            <div className="aggrements">
              <div className="terms__conditions flexRow" id="terms__conditions">
                <input
                  value={termsOfUse}
                  onChange={(e) => setTermsOfUse(!termsOfUse)}
                  type="checkbox"
                />
                <h3>
                  I agree to
                  <a
                    className="mainHoverEffect"
                    href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_register_notification_condition_of_use?ie=UTF8&nodeId=508088"
                  >
                    Conditions of use
                  </a>
                </h3>
                <ErrorIcon
                  className="errorIcon"
                  id="termsAndConditions__error"
                />
              </div>
              <div className="privacy__policy flexRow">
                <input
                  value={privacyNotice}
                  onChange={(e) => setPrivacyNotice(!privacyNotice)}
                  type="checkbox"
                />
                <h3>
                  I agree to
                  <a
                    className="mainHoverEffect"
                    href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_register_notification_privacy_notice?ie=UTF8&nodeId=468496"
                  >
                    Privacy notice
                  </a>
                </h3>
                <ErrorIcon className="errorIcon" id="privacyPolicy__error" />
              </div>
            </div>

            <button
              disabled={processing}
              className="placeOrder__btn"
              onClick={placeOrder}
            >
              {processing ? "Processing..." : "Place Order"}
            </button>
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
