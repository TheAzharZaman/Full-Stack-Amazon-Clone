import React, { useState, useEffect } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import AmazonLogo from "./files/logo.png";
import EnglishFlag from "./files/english.png";
import {
  KeyboardArrowDown,
  ShoppingBasket,
  PersonPinCircle,
} from "@material-ui/icons";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Dropdown from "./Dropdown";
import useStateValue from "../Files/StateProvider";
import { Link } from "react-router-dom";
import { auth, db } from "../Files/firebase";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { selectBasket } from "../redux/slices/basketSlice";

const Header = ({ displayName, countryName, basketItems }) => {
  const currentUser = useSelector(selectUser);
  const [{ basket }] = useStateValue();

  const [localBasket, setLocalBasket] = useState(
    JSON.parse(localStorage.getItem("basket"))
  );
  const [vistorsDetails, setVisitorsDetails] = useState(null);
  const [listCurrentValue, setListCurrentValue] = useState("All");
  const [show, setShow] = useState(false);
  const [showLoginDropDown, setShowLoginDropDown] = useState(false);

  useEffect(() => {
    setLocalBasket(JSON.parse(localStorage.getItem("basket")));
  }, [basket]);

  return (
    <div className="header flexRow between center">
      <div className="header__LogoLocation flexRow center">
        <Link to="/" className="header__logo">
          <img src={AmazonLogo} alt="Amazon" />
        </Link>

        {countryName !== "" && (
          <div className="header__delivery flexRow">
            <PersonPinCircle className="locationIcon" />
            <div className="flexColumn center pointer">
              <span className="headerNav__optionLineOne">Deliver to</span>
              <span className="headerNav__optionLineTwo">{countryName}</span>
            </div>
          </div>
        )}
      </div>
      <div className="header__search flexRow evenly center" id="header__search">
        <h3 onClick={() => setShow(!show)} className="headerSearch__listOpener">
          <span>{listCurrentValue}</span> <ArrowDropDownIcon />
        </h3>

        {show && <Dropdown />}

        <input
          onFocus={() => {
            document
              .getElementById("header__search")
              .classList.add("header__searchBarActive");
          }}
          onChange={() => {
            document
              .getElementById("header__search")
              .classList.remove("header__searchBarActive");
          }}
          type="text"
        />
        <span className="searchIcon pointer">
          <SearchIcon />
        </span>
      </div>
      <div className="header__nav between flexRow center">
        <div className="headerNav__languages pointer">
          <img src={EnglishFlag} alt="EN" />
          <KeyboardArrowDown />
        </div>
        <div
          onClick={() => {
            setShowLoginDropDown(!showLoginDropDown);
          }}
          className="headerNav__option headerNav__loginOption borderOnHover flexColumn"
        >
          {!currentUser ? (
            <span className="headerNav__optionLineOne signIn marginNeg pointer">
              Hello Guest, Sign In
            </span>
          ) : (
            <span className="headerNav__optionLineOne signIn marginNeg pointer">
              Hi, {displayName}
            </span>
          )}

          <span className="headerNav__optionLineTwo pointer">
            Accounts & Lists <KeyboardArrowDown className="signInArrow" />
          </span>
        </div>
        {showLoginDropDown && <LoginDropDown />}
        <div className="headerNav__option borderOnHover flexColumn pointer">
          <span className="headerNav__optionLineOne">Returns</span>
          <span className="headerNav__optionLineTwo">& Orders</span>
        </div>
        <Link to="/cart" className="headerNav__basket pointer">
          <ShoppingBasket className="basketIcon" />
          <span className="headerNav__optionLineTwo basketCount">
            {basket.length > 0 ? basket.length : basketItems}
          </span>
        </Link>
      </div>
    </div>
  );
};

const LoginDropDown = () => {
  const currentUser = useSelector(selectUser);

  const signoutHandler = () => {
    auth.signOut();
  };

  return (
    <div className="loginDropDown flexColumn">
      {currentUser ? (
        <div className="loginDropDown__top flexColumn">
          <a>
            <button onClick={signoutHandler}>Sign out</button>
          </a>
        </div>
      ) : (
        <div className="loginDropDown__top flexColumn">
          <Link to="/auth/signin">
            <button>Sign in</button>
          </Link>
          <div className="flexRow">
            <p className="newCustomer__text">New customer?</p>
            <Link to="/auth/register" className="redirectLink">
              Start here
            </Link>
          </div>
        </div>
      )}

      <div className="loginDropDown__bottom flexRow">
        <div className="loginDropDown__bottomLeft flexColumn">
          <h3>Your lists</h3>

          <a href="#">Create a list</a>
          <a href="#">Find a list or registry</a>
          <a href="#">Amazon Smile Charity Lists</a>
        </div>

        <div className="loginDropDown__bottomRight flexColumn">
          <h3>Your account</h3>
          <a href="#">Account</a>
          <Link to="/account/my-orders">Orders</Link>
          <a href="#">Recommendations</a>
          <a href="#">Browsing history</a>
          <a href="#">Watch list</a>
          <a href="#">Purchasing history</a>
          <a href="#">Kindle unlimited</a>
        </div>
      </div>
    </div>
  );
};
export default Header;
