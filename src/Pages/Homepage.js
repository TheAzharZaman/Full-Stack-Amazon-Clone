import React, { useState, useEffect } from "react";
import HeroSection from "../Components/HeroSection";
import "./Homepage.css";
import CategoriesRow1 from "../Components/CategoriesRow1";
import CategoriesRow2 from "../Components/CategoriesRow2";
import CategoriesRow3 from "../Components/CategoriesRow3";
import CategoriesRow4 from "../Components/CategoriesRow4";
import Product from "../Components/Product";
import DoneIcon from "@material-ui/icons/Done";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import ProductsSlider from "../Components/ProductsSlider";
import useStateValue from "../Files/StateProvider";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import { basketTotal } from "../Files/reducer";
import {
  selectUser,
  SET_REDIRECT_TO_CHECKOUT,
} from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectBasket } from "../redux/slices/basketSlice";

const Homepage = () => {
  // const basket = useSelector(selectBasket);
  const [{ basket }] = useStateValue();

  return (
    <div className="home">
      <HeroSection />

      <CategoriesRow1 />
      <CategoriesRow2 categoryRowSpecificClass="categories__row2" />

      {basket.length > 0 && <BasketLiveStatusBar />}

      <div className="products__row products__row1 flexRow center">
        <Product
          id="1255345"
          title="Dell Latitude 2415p | 4GB | 320GB | UHD Display | Life-time Guarentee"
          price={199.99}
          imgUrl="https://i.ibb.co/Ry17Zy6/5.jpg"
          rating={4}
        />
        <Product
          id="255325"
          title="HP Elitebook 8440p | 6GB | 500GB | UHD Display | 2 Year Guarentee"
          price={499.99}
          imgUrl="https://i.ibb.co/kmCKqPx/55.jpg"
          rating={5}
        />
        <Product
          id="432453543"
          title="HP Elitebook 9111p | 12GB | 1TB | UHD Display | 5 Year Guarentee"
          price={799.99}
          imgUrl="https://i.ibb.co/Zx77kkW/555.jpg"
          rating={3}
        />
        <Product
          id="4323543"
          title="Dell Latitude 4450p | 6GB | 512GB | UHD Display | Life-time Guarentee"
          price={999.99}
          imgUrl="https://i.ibb.co/bBxHMp8/5555.jpg"
          rating={5}
        />
      </div>
      <ProductsSlider title="Discover Amazon" linkText="Click to learn more">
        <ProductsSliderProduct imgUrl="https://i.ibb.co/gg3XGbW/1.jpg" />
        <ProductsSliderProduct imgUrl="https://i.ibb.co/pWmHyff/2.jpg" />
        <ProductsSliderProduct imgUrl="https://i.ibb.co/W33b1Mj/3.png" />
        <ProductsSliderProduct imgUrl="https://i.ibb.co/ctMdYKp/4.jpg" />
        <ProductsSliderProduct imgUrl="https://i.ibb.co/SNxDy8C/5.jpg" />
        <ProductsSliderProduct imgUrl="https://i.ibb.co/df1sZvT/6.jpg" />
      </ProductsSlider>

      <ProductsSlider
        sliderSpecificClass="topSellers__productsSlider"
        sliderContentSpecificClass="sliderTopSeller__content"
        title="Amazon Top Sellers"
        linkText="Shop now"
      >
        <ProductsSliderProduct imgUrl="https://i.ibb.co/Dff2h1n/pro1.jpg" />
        <ProductsSliderProduct imgUrl="https://i.ibb.co/tZW5vFg/pro2.jpg" />
        <ProductsSliderProduct imgUrl="https://i.ibb.co/3TK3ZY8/pro3.jpg" />
        <ProductsSliderProduct imgUrl="https://i.ibb.co/qkfLfMT/pro4.jpg" />
        <ProductsSliderProduct imgUrl="https://i.ibb.co/GngnzXq/pro5.jpg" />
        <ProductsSliderProduct imgUrl="https://i.ibb.co/Wz27nLF/pro6.jpg" />
      </ProductsSlider>

      <CategoriesRow3 />
      <CategoriesRow4 />
    </div>
  );
};

const BasketLiveStatusBar = () => {
  const basket = useSelector(selectBasket);
  const currentUser = useSelector(selectUser);
  const dispatchRedux = useDispatch();

  const setUserPendingState = () => {
    if (!currentUser) {
      dispatchRedux(SET_REDIRECT_TO_CHECKOUT(true));
    }
  };

  return (
    <div className="basketLive__statusBar flexRow">
      <div className="basketLive__left">
        <DoneIcon />
        <h3>{basket.length} Product(s) in Cart</h3>
      </div>
      <div className="basketLive__center flexColumn">
        <div className="basket__subtotal flexRow">
          <h3>
            Cart subtotal <span>({basket.length} items):</span>{" "}
          </h3>
          <CurrencyFormat
            decimalScale={2}
            value={basketTotal(basket)}
            displayType={"text"}
            thousandSeperator={true}
            prefix={"$"}
            renderText={(value) => <strong>{value}</strong>}
          />
        </div>

        <div className="gift__check flexRow">
          <input type="checkbox" className="checkbox" />
          <div className="flexRow">
            <CardGiftcardIcon /> <h5> This order contains a gift</h5>
          </div>
        </div>
      </div>
      <div className="basketLive__right flexRow">
        <Link to="cart">
          <button className="cart__btn">Cart</button>
        </Link>
        <Link
          onClick={setUserPendingState}
          to={
            currentUser ? "/checkout/add-your-shipping-address" : "/auth/signin"
          }
        >
          <button className="checkout__btn">
            Proceed to Checkout({basket.length} items)
          </button>
        </Link>
      </div>
    </div>
  );
};

const ProductsSliderProduct = ({ imgUrl }) => {
  return (
    <a href="#">
      <img src={imgUrl} />
    </a>
  );
};

export default Homepage;
