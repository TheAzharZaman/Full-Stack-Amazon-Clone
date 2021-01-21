import React from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./OrderPlacedSuccess.css";

const OrderPlacedSuccssfully = () => {
  return (
    <div className="orderPlaced__page">
      <Card className="orderPlaced__card">
        <CheckCircleOutlineIcon />

        <h3 className="placedSuccess__tagline">Order Placed Successfully</h3>
        <Link className="mainHoverEffect" to="/account/my-orders">
          My orders
        </Link>
      </Card>
    </div>
  );
};

export default OrderPlacedSuccssfully;
