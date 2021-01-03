import React, { useState } from "react";
import "./HeroSection.css";
import {
  importedSliderImages,
  ForwardArrow,
  BackArrow,
} from "../Files/allImagesLink";

import { Button } from "@material-ui/core";

const HeroSection = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState([
    "https://i.ibb.co/xGMmmcx/1.jpg",
    "https://i.ibb.co/72SvVHf/2.jpg",
    "https://i.ibb.co/RYdz0vj/3.jpg",
    "https://i.ibb.co/Zgbz8Ck/4.jpg",
    "https://i.ibb.co/4MsGzNb/5.jpg",
  ]);

  function sliderImageSetter(arg) {
    if (slideIndex >= 0 && slideIndex <= sliderImages.length - 1) {
      return arg[slideIndex];
    }
  }

  // Dynamic Slider Controllers(Forward)

  function increment() {
    if (slideIndex >= 0 && slideIndex <= 3) {
      setSlideIndex((prevIndex) => prevIndex + 1);
    } else {
      setSlideIndex(0);
    }
  }

  // Dynamic Slider Controllers(Backward)

  function decrement() {
    if (slideIndex > 0 && sliderImages.length - 1) {
      setSlideIndex((prevIndex) => prevIndex - 1);
    } else {
      setSlideIndex(sliderImages.length - 1);
    }
  }

  return (
    <div className="hero">
      <div className="slider">
        <Button
          onClick={decrement}
          className="slider__controller slider__controllerBack"
        >
          <img className="slider__arrows" src={BackArrow} alt="<" />
        </Button>
        <img src={sliderImageSetter(sliderImages)} />
        <Button
          onClick={increment}
          className="slider__controller slider__controllerForw"
        >
          <img className="slider__arrows" src={ForwardArrow} alt=">" />
        </Button>
      </div>
      <div className="slider__fade"></div>
    </div>
  );
};

export default HeroSection;
