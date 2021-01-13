import React from "react";
import { useHistory } from "react-router-dom";
import AmazonLogo from "./logo.png";
import "./Checkout.css";
import { Link } from "react-scroll";

const CheckoutPayment = () => {
  const history = useHistory();
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
        </div>
        <h3
          style={{
            fontSize: 80,
            marginTop: 180,
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          BUILD IN PROGRESS
        </h3>
        <h3
          style={{
            fontSize: 30,
            marginTop: 30,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          WORKING ON PAYMENT PROCESSING
        </h3>
      </div>
    </div>
  );
};

export default CheckoutPayment;
