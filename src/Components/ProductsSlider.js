import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const ProductsSlider = ({
  title,
  redirectTo,
  linkText,
  children,
  sliderSpecificClass,
  sliderContentSpecificClass,
}) => {
  useEffect(() => {
    const buttonRight = document.getElementById("slideRight");
    const buttonLeft = document.getElementById("slideLeft");

    buttonRight.onclick = function () {
      document.getElementById("slider__content").scrollLeft += 150;
    };
    buttonLeft.onclick = function () {
      document.getElementById("slider__content").scrollLeft -= 150;
    };
  }, []);

  return (
    <div className={`products__slider flexColumn ${sliderSpecificClass}`}>
      <div className="productsSlider__head flexRow center">
        <h4>{title}</h4>
        <Link className="redirectLink" to={redirectTo}>
          {linkText}
        </Link>
      </div>
      <div className="productsSlider__slider flexRow between">
        <Button
          id="slideLeft"
          className="productSlider__controller productSlider__controller1"
          variant="outlined"
        >
          <ArrowBackIosIcon />
        </Button>
        <div
          className={`slider__content flexRow between ${sliderContentSpecificClass}`}
          id="slider__content"
        >
          {children}
        </div>
        <Button
          id="slideRight"
          className="productSlider__controller productSlider__controller2"
          variant="outlined"
        >
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
};

export default ProductsSlider;
