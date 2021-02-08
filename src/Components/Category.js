import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { db } from "../Files/firebase";
import useStateValue from "../Files/StateProvider";
import { useSelector } from "react-redux";
import { selectFetchedUserDetails } from "../redux/slices/fetchedDetailsSlice";

const Product = ({
  categotyTitle,
  imgUrl,
  redirectUrl,
  linkText,
  row2CategoryClass,
  needBlocksInCategory,
  blockName1,
  blockName2,
  blockName3,
  blockName4,
  imgSrc1,
  imgSrc2,
  imgSrc3,
  imgSrc4,
  specialBlocksCat,
  specialBlocksCatTitle,
}) => {
  const fetchedUserDetails = useSelector(selectFetchedUserDetails);

  return (
    <div className={`category ${row2CategoryClass && "row2__category"}`}>
      <div className="category__content">
        <h3 className="categoty__title">{categotyTitle}</h3>
        {specialBlocksCat && (
          <div className="user__Avatar">
            <Avatar src="https://www.amazon.com/avatar/default?customer_id=amzn1.account.AHXOHXUPVLWUMOQM5WE6SOM6FU3Q&max_width=60&max_height=60&square=true" />
            <h3 id="gg">Hi, {fetchedUserDetails?.displayName}</h3>
          </div>
        )}
        {specialBlocksCat && (
          <h3 className="specialBlocksCat__title">{specialBlocksCatTitle}</h3>
        )}
        {!needBlocksInCategory ? (
          <Link to={redirectUrl}>
            <div
              className="category__image"
              style={{ backgroundImage: `url(${imgUrl})` }}
            />
          </Link>
        ) : (
          <div className="categoryBlocks__blocks flexColumn">
            <div className="categoryBlocks__row1 flexRow">
              <CategoryBlock blockName={blockName1} imgUrl={imgSrc1} />
              <CategoryBlock blockName={blockName2} imgUrl={imgSrc2} />
            </div>
            <div className="categoryBlocks__row2 flexRow">
              <CategoryBlock blockName={blockName3} imgUrl={imgSrc3} />
              <CategoryBlock blockName={blockName4} imgUrl={imgSrc4} />
            </div>
          </div>
        )}
        <Link className="redirectLink" to="/order-placed-notification">
          {linkText}
        </Link>
      </div>
    </div>
  );
};

const CategoryBlock = ({ imgUrl, blockName, redirectUrl }) => {
  return (
    <Link to={redirectUrl} className="category__block">
      <div
        className="blockImage__div"
        style={{ backgroundImage: `url(${imgUrl})` }}
      />
      <h5>{blockName}</h5>
    </Link>
  );
};

export default Product;
