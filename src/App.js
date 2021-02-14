import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import HeaderSecondary from "./Components/HeaderSecondary";
import Homepage from "./Pages/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import ShopingCart from "./Pages/ShopingCart";
import CheckoutAdress from "./Pages/CheckoutAddress";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { auth, db } from "./Files/firebase";
import useStateValue from "./Files/StateProvider";
import Footer from "./Components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPayment from "./Pages/CheckoutPayment";
import OrderPlacedSuccssfully from "./Pages/OrderPlacedSuccssfully";
import MyOrders from "./Pages/MyOrders";
import { useSelector, useDispatch } from "react-redux";
import { SET_FETCHED_DETAILS } from "./redux/slices/fetchedDetailsSlice";
import { selectBasket } from "./redux/slices/basketSlice";
import { SET_USER } from "./redux/slices/userSlice";
// import Copyright from "./Components/Copyright";

const App = () => {
  // const basket = useSelector(selectBasket);
  const [{ basket }] = useStateValue();
  const dispatch = useDispatch();
  const [fetchedData, setFetchedData] = useState({});
  const [secureData, setSecureData] = useState({});
  const [user, setUser] = useState({});
  const [userLocDetails, setUserLocDetails] = useState();
  const [localBasketAfterRefrsh, setLocalBasketAfterRefrsh] = useState();

  useEffect(() => {
    if (basket?.length > 0) {
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }, [basket]);

  useEffect(() => {
    if (basket?.length < 1) {
      setLocalBasketAfterRefrsh(JSON.parse(localStorage.getItem("basket")));
    }
  }, [basket]);

  const promise = loadStripe(
    "pk_test_51I8N1gJHgoNdpJN9NedWNqHGlHGZRCcKRyvxG9eB4tmOmwU6KXjJFeKbxqUbpSbi1vmR5tKNqp4tUIcybLHbsdT600cmjwGy5m"
  );

  useEffect(() => {
    auth.onAuthStateChanged((userObj) => {
      if (userObj) {
        setUser(userObj);
        dispatch(
          SET_USER({
            uid: userObj.uid,
            email: userObj.email,
            displayName: userObj.displayName,
            emailVerified: userObj.emailVerified,
          })
        );
        localStorage.setItem("userID", userObj.uid);
      } else {
        dispatch(SET_USER(null));
      }
    });
  }, []);

  // Fetche Location Details of visiting user

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("visitingUserLoc"))) {
      setUserLocDetails(JSON.parse(localStorage.getItem("visitingUserLoc")));
    } else {
      const getUserGeoLocationDetails = () => {
        fetch(
          "https://geolocation-db.com/json/8f12b5f0-2bc2-11eb-9444-076679b7aeb0"
        )
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("visitingUserLoc", JSON.stringify(data));
            setUserLocDetails(data);
          });
      };
      getUserGeoLocationDetails();
    }
  }, []);

  // Fetch and Prepare data from Data base

  useEffect(() => {
    const fetchDataFromDB = () => {
      const docRef = db.collection("users").doc(user?.uid);

      docRef.get().then((doc) => {
        setFetchedData(doc.data());
        dispatch(SET_FETCHED_DETAILS(doc.data()));
      });
    };

    fetchDataFromDB();
  }, [user]);

  useEffect(() => {
    setSecureData({
      displayName: fetchedData?.displayName,
      userID: fetchedData?.userID,
      email: fetchedData?.email,
    });
  }, [fetchedData]);

  useEffect(() => {
    localStorage.setItem("fetchedData", JSON.stringify(secureData));
  }, [secureData]);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
              basketItems={localBasketAfterRefrsh?.length}
            />
            <HeaderSecondary />
            <Homepage />
            <Footer />
            {/* <Copyright /> */}
          </Route>
          <Route path="/cart">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
              basketItems={localBasketAfterRefrsh?.length}
            />

            <HeaderSecondary />
            <ShopingCart />
            {/* <Copyright /> */}
          </Route>
          <Route path="/auth/register">
            <Signup />
            {/* <Copyright /> */}
          </Route>
          <Route path="/auth/signin">
            <Login />
            {/* <Copyright /> */}
          </Route>
          <Route path="/checkout/payment-and-order-placement">
            <Elements stripe={promise}>
              <Header
                countryName={userLocDetails?.country_name}
                displayName={fetchedData?.displayName}
                basketItems={localBasketAfterRefrsh?.length}
              />
              <CheckoutPayment />
              {/* <Copyright /> */}
            </Elements>
          </Route>
          <Route path="/checkout/add-your-shipping-address">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
              basketItems={localBasketAfterRefrsh?.length}
            />
            <CheckoutAdress />
            {/* <Copyright /> */}
          </Route>
          <Route path="/order-placed-notification">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
              basketItems={localBasketAfterRefrsh?.length}
            />
            <OrderPlacedSuccssfully />
            {/* <Copyright /> */}
          </Route>
          <Route path="/account/my-orders">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
              basketItems={localBasketAfterRefrsh?.length}
            />
            <HeaderSecondary />
            <MyOrders />
            {/* <Copyright /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
