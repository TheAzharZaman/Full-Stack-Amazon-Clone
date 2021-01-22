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
    "https://i.ibb.co/h2P2BRR/Fuji-Tall-Hero-Beauty-v2-en-US-1x-CB429089975.jpg",
    "https://i.ibb.co/rFShK06/AMZ-Associates-ACC-Banner-Evergreen-1500x600-v2-CB415565312.jpg",
    "https://i.ibb.co/72SvVHf/2.jpg",
    "https://i.ibb.co/RYdz0vj/3.jpg",
    "https://i.ibb.co/Zgbz8Ck/4.jpg",
  ]);

  const firstSlideIndex = 0;
  const lastSlideIndex = sliderImages.length - 1;

  function sliderImageSetter(arg) {
    if (slideIndex >= firstSlideIndex && slideIndex <= lastSlideIndex) {
      return arg[slideIndex];
    }
  }

  // Dynamic Slider Controllers(Forward)

  function increment() {
    if (slideIndex >= firstSlideIndex && slideIndex < lastSlideIndex) {
      setSlideIndex((prevIndex) => prevIndex + 1);
    } else {
      setSlideIndex(firstSlideIndex);
    }
  }

  // Dynamic Slider Controllers(Backward)

  function decrement() {
    if (slideIndex > 0 && slideIndex <= lastSlideIndex) {
      setSlideIndex((prevIndex) => prevIndex - 1);
    } else {
      setSlideIndex(lastSlideIndex);
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
