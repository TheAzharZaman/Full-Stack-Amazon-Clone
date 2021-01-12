import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import HeaderSecondary from "./Components/HeaderSecondary";
import Homepage from "./Pages/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import ShopingCart from "./Pages/ShopingCart";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { auth, db } from "./Files/firebase";
import useStateValue from "./Files/StateProvider";
import Footer from "./Components/Footer";

const App = () => {
  const [{ currentUser }, dispatch] = useStateValue();
  const [fetchedData, setFetchedData] = useState({});
  const [secureData, setSecureData] = useState({});
  const [user, setUser] = useState({});
  const [userLocDetails, setUserLocDetails] = useState();

  console.log("Current Logged In User =>>>", currentUser);

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
          <Route path="/user_registration">
            <Signup />
          </Route>
          <Route path="/user_authentication">
            <Login />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/cart">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
            />
            <HeaderSecondary />
            <ShopingCart />
          </Route>
          <Route path="/">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
            />
            <HeaderSecondary />
            <Homepage />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
