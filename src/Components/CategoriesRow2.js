import React from "react";
import Category from "./Category";

const CategoriesRow = ({ categoryRowSpecificClass }) => {
  return (
    <div
      className={`categories__row flexRow between ${categoryRowSpecificClass}`}
    >
      <Category
        categotyTitle="Start on your holiday list early"
        imgUrl="https://i.ibb.co/1z4BjqT/start.jpg"
        linkText="Shop Now"
        row2CategoryClass
      />
      <Category
        categotyTitle="Shop Laptops & Tablets"
        imgUrl="https://i.ibb.co/bK9hDHp/gg.jpg"
        linkText="Shop Now"
        row2CategoryClass
      />
      <Category
        categotyTitle="Deals & Promotions"
        imgUrl="https://i.ibb.co/gz6rm7h/promoti.jpg"
        linkText="Shop Now"
        row2CategoryClass
      />
      <Category
        categotyTitle="Explore home bedding"
        imgUrl="https://i.ibb.co/kmS9SZW/abs.jpg"
        linkText="Shop Now"
        row2CategoryClass
      />
    </div>
  );
};

export default CategoriesRow;
