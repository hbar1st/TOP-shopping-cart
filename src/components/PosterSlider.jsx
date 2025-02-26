import "../styles/posterSlider.css";
import { useState, useRef, useEffect } from "react";

import pic1 from "../assets/hanazon1.jpg";
import pic2 from "../assets/hanazon2.jpg";
import pic3 from "../assets/hanazon3.jpg";

function PosterSlider() {
  const imgRefs = [useRef(null), useRef(null), useRef(null)];
  const imgArray = [pic1, pic2, pic3];
  const altArray = ["shop", "shop", "shop"];
  const posterSpans = imgArray.map((pic, i) => {
    return (
      <span key={i} className="poster" id={`post-${i}`}>
        <img ref={imgRefs[i]} src={pic} alt={altArray[i]} />
      </span>
    );
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    function slide() {
      let curr = currentSlide;
      if (curr > imgArray.length) {
        curr = -1;
      }
      setCurrentSlide(curr + 1);
      imgRefs[currentSlide]?.current?.scrollIntoView();
    }

    const intervalId = setInterval(slide, 1700);

    return () => clearInterval(intervalId);
  });

  return (
    <div className="poster-frame">
      <div className="poster-slider">{posterSpans}</div>
    </div>
  );
}

export default PosterSlider;
