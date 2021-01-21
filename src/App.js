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
import Copyright from "./Components/Copyright";
import { auth, db } from "./Files/firebase";
import useStateValue from "./Files/StateProvider";
import Footer from "./Components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPayment from "./Pages/CheckoutPayment";
import OrderPlacedSuccssfully from "./Pages/OrderPlacedSuccssfully";
import MyOrders from "./Pages/MyOrders";

const App = () => {
  const [{ currentUser, basket }, dispatch] = useStateValue();
  const [fetchedData, setFetchedData] = useState({});
  const [secureData, setSecureData] = useState({});
  const [user, setUser] = useState({});
  const [userLocDetails, setUserLocDetails] = useState();
  const [localBasketAfterRefrsh, setLocalBasketAfterRefrsh] = useState();

  // console.log("Current Logged In User =>>>", currentUser);

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
        dispatch({
          type: "SET_USER",
          user: userObj,
        });
        localStorage.setItem("userID", userObj?.uid);
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  // Fetche Location Details of visiting user

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("visitingUserLoc"))) {
      setUserLocDetails(JSON.parse(localStorage.getItem("visitingUserLoc")));
      console.log(
        "Visiting User Location Details",
        JSON.parse(localStorage.getItem("visitingUserLoc"))
      );
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
        dispatch({
          type: "SET_FETCHED_DETAILS",
          fetchedData: doc.data(),
        });
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
            <Copyright />
          </Route>
          <Route path="/cart">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
              basketItems={localBasketAfterRefrsh?.length}
            />

            <HeaderSecondary />
            <ShopingCart />
            <Copyright />
          </Route>
          <Route path="/auth/register">
            <Signup />
            <Copyright />
          </Route>
          <Route path="/auth/signin">
            <Login />
            <Copyright />
          </Route>
          <Route path="/checkout/payment-and-order-placement">
            <Elements stripe={promise}>
              <Header
                countryName={userLocDetails?.country_name}
                displayName={fetchedData?.displayName}
                basketItems={localBasketAfterRefrsh?.length}
              />
              <CheckoutPayment />
              <Copyright />
            </Elements>
          </Route>
          <Route path="/checkout/add-your-shipping-address">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
              basketItems={localBasketAfterRefrsh?.length}
            />
            <CheckoutAdress />
            <Copyright />
          </Route>
          <Route path="/order-placed-notification">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
              basketItems={localBasketAfterRefrsh?.length}
            />
            <OrderPlacedSuccssfully />
            <Copyright />
          </Route>
          <Route path="/account/my-orders">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
              basketItems={localBasketAfterRefrsh?.length}
            />
            <HeaderSecondary />
            <MyOrders />
            <Copyright />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
