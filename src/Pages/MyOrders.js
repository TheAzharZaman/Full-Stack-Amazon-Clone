import React, { useState, useEffect } from "react";
import { db } from "../Files/firebase";
import useStateValue from "../Files/StateProvider";
import "./MyOrders.css";

const MyOrders = () => {
  const [{ currentUser }] = useStateValue();
  // const [codedOrders, setCodedOrders] = useState([]);

  // useEffect(() => {
  //   db.collection("users")
  //     .doc(currentUser?.uid)
  //     .collection("orders")
  //     .get()
  //     .then((querySnapshot) => {
  //       // querySnapshot.forEach((doc) => console.log(doc.data()));
  //       setCodedOrders(querySnapshot.docs);
  //     });
  // }, [currentUser]);

  return (
    <div className="my__orders">
      <h1
        style={{
          marginTop: "10rem",
          textAlign: "center",
          fontSize: 80,
          fontWeight: 800,
        }}
      >
        Build in Progress
      </h1>
    </div>
  );
};

export default MyOrders;
