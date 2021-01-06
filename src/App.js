import React from "react";
import Header from "./Components/Header";
import HeaderSecondary from "./Components/HeaderSecondary";
import Homepage from "./Pages/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import ShopingCart from "./Pages/ShopingCart";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

const App = () => {
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
