import React from "react";
import Category from "./Category";
import { Link } from "react-router-dom";

const CategoriesRow = () => {
  return (
    <div className="categories__row categories__row1 flexRow between">
      <Category
        categotyTitle="Gaming Accessories"
        imgUrl="https://i.ibb.co/SKXLw4n/g.jpg"
        linkText="Shop our full selection"
      />
      <Category
        categotyTitle="Computers & Accessories"
        imgUrl="https://i.ibb.co/H45ZtjG/cas.jpg"
        linkText="Shop Now"
      />
      <Category
        categotyTitle="Holiday deals"
        imgUrl="https://i.ibb.co/PxPtBY6/hd.jpg"
        linkText="Shop Now"
      />
      <div className="signin__promotion flexColumn">
        <div className="signin flexColumn">
          <h3>Sign in for the best experience</h3>
          <Link to="/login">
            <button>Sign in securely</button>
          </Link>
        </div>
        <div
          style={{
            backgroundImage: `url('https://i.ibb.co/PmJw03C/prom.jpg')`,
          }}
          className="promotion"
        ></div>
      </div>
    </div>
  );
};

export default CategoriesRow;
