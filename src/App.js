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
        <Header />
        <HeaderSecondary />
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/cart">
            <ShopingCart />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
