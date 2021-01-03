import React from "react";
import Category from "./Category";

const CategoriesRow = () => {
  return (
    <div className="categories__row categories__row3 flexRow between">
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

      <Category
        categotyTitle="Gaming Accessories"
        imgUrl="https://i.ibb.co/SKXLw4n/g.jpg"
        linkText="Shop Now"
        row2CategoryClass
      />
      <Category
        categotyTitle="Computers & Accessories"
        imgUrl="https://i.ibb.co/H45ZtjG/cas.jpg"
        linkText="Shop Now"
        row2CategoryClass
      />

      <Category
        categotyTitle="Holiday deals"
        imgUrl="https://i.ibb.co/PxPtBY6/hd.jpg"
        linkText="Shop Now"
        row2CategoryClass
      />
    </div>
  );
};

export default CategoriesRow;
