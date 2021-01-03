import React from "react";
import Category from "./Category";

const CategoriesRow = () => {
  return (
    <div className="categories__row categories__row4 flexRow between">
      <Category
        categotyTitle="Start on your holiday list early"
        imgUrl="https://i.ibb.co/1z4BjqT/start.jpg"
        linkText="Shop Now"
        row2CategoryClass
      />
      <Category
        categotyTitle="Explore home bedding"
        imgUrl="https://i.ibb.co/kmS9SZW/abs.jpg"
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
        needBlocksInCategory
        categotyTitle="Explore Girls Comfy Fashion"
        linkText="Shop Now"
        blockName1="Sweat shirts"
        blockName2="Joggers"
        blockName3="Cardigans"
        blockName4="Easy tees"
        imgSrc1="https://i.ibb.co/NC4rDnS/Fuji-Dash-Women-Fashion-Tees-Quad-Cat-1x-SY116-CB418608878.jpg"
        imgSrc2="https://i.ibb.co/bmmNcv1/Fuji-Dash-Women-Fashion-Cardigans-Quad-Cat-1x-SY116-CB418608722.jpg"
        imgSrc3="https://i.ibb.co/8m0HrhY/Fuji-Dash-Women-Fashion-Joggers-Quad-Cat-1x-SY116-CB418608748.jpg"
        imgSrc4="https://i.ibb.co/Wgpnz4p/41-F9-RVTMUy-L-AC-SY200.jpg"
      />
    </div>
  );
};

export default CategoriesRow;
