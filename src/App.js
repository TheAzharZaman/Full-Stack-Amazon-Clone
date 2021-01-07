import React, { useState } from "react";
import Header from "./Components/Header";
import HeaderSecondary from "./Components/HeaderSecondary";
import Homepage from "./Pages/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import ShopingCart from "./Pages/ShopingCart";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { auth } from "./Files/firebase";
import useStateValue from "./Files/StateProvider";

const App = () => {
  const [{ currentUser }, dispatch] = useStateValue();

  console.log(currentUser);

  React.useEffect(() => {
    auth.onAuthStateChanged((userObj) => {
      localStorage.setItem("userID", userObj?.uid);

      if (userObj) {
        dispatch({
          type: "SET_USER",
          user: userObj,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

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
            <Header />
            <HeaderSecondary />
            <Checkout />
          </Route>
          <Route path="/cart">
            <Header />
            <HeaderSecondary />
            <ShopingCart />
          </Route>
          <Route path="/">
            <Header />
            <HeaderSecondary />
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
