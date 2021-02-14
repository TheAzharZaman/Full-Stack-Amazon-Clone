import React, { useState, useEffect } from "react";
import { db } from "../Files/firebase";
import useStateValue from "../Files/StateProvider";
import "./MyOrders.css";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const currentUser = useSelector(selectUser);
  const [orders, setOrders] = useState();

  useEffect(() => {
    db.collection("users")
      .doc(currentUser?.uid)
      .collection("orders")
      .onSnapshot((snapshot) =>
        setOrders(
          snapshot.docs.map((order) => ({
            id: order.id,
            orderDetails: order.data(),
          }))
        )
      );
  }, [currentUser]);

  return (
    <div className="my__orders">
      <div className="myOrders__content">
        <div className="myOrders__header">
          <h3>My Orders</h3>
        </div>
        <div className="myOrders__list">
          {orders?.map((order) => (
            <MyOrdersOrder
              orderNumber={order.id}
              orderTimeStamp={new Date(
                order?.orderDetails.orderInfo.orderTimeStamp.toDate()
              ).toUTCString()}
              orderAddressName={order?.orderDetails.address.fullName}
              addressLineOne={order?.orderDetails.address.addressLineOne}
              addressLineTwo={order?.orderDetails.address.addressLineTwo}
              zipCode={order?.orderDetails.address.zipCode}
              city={order?.orderDetails.address.city}
              country={order?.orderDetails.address.country}
              province={order?.orderDetails.address.province}
              cartArray={order?.orderDetails.cart}
              orderTotal={
                order?.orderDetails.orderInfo.orderTotalAmountInDollers
              }
              orderItems={order?.orderDetails.orderInfo.orderTotalItems}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const MyOrdersOrder = ({
  orderNumber,
  orderTimeStamp,
  orderAddressName,
  addressLineOne,
  addressLineTwo,
  zipCode,
  city,
  province,
  country,
  cartArray,
  orderItems,
  orderTotal,
}) => {
  return (
    <div className="order">
      <div className="orderMainContent flexRow">
        <div className="orderContent__left">
          <div className="orderDetails flexColumn">
            <h3>Order No: {orderNumber}</h3>
            <span>Order placed at: {orderTimeStamp} </span>
          </div>
          <div className="order__address flexColumn">
            <h3>Order shipping address </h3>
            <h4>{orderAddressName}</h4>
            <h4>{addressLineOne}</h4>
            <h4>
              <span>{addressLineTwo},</span> <span>{zipCode}</span>
            </h4>
            <h4>
              <span>{city},</span> <span>{province} | </span>{" "}
              <span>{country}</span>
            </h4>
          </div>
        </div>
        <div className="orderContent__right">
          <div className="order__cart flexColumn">
            <h3>Order Items </h3>
            {cartArray?.map((cartItem) => (
              <OrderCartItem
                key={cartItem.id}
                title={cartItem.title}
                imgUrl={cartItem.imgUrl}
                price={cartItem.price}
                qty={cartItem.qty}
              />
            ))}
          </div>
        </div>
        <div className="order__amounts flexColumn">
          <h4>Order Total Items : {orderItems}</h4>
          <h4>Order Total : ${orderTotal.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
};

const OrderCartItem = ({ title, imgUrl, price, qty }) => {
  return (
    <div className="ordersCart__item flexRow">
      <img className="checkout__productImage" src={imgUrl} />
      <div className="orderCart__itemInfo flexColumn">
        <h3 className="orderCart__itemTitle">{title}</h3>
        <div className="calc flexRow">
          <h3>
            {qty} * {price} ={" "}
          </h3>
          <strong> {qty * price} </strong>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
