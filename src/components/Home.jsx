import "../styles/App.css";
import { useState, useRef, useEffect } from "react";
import PosterSlider from "./PosterSlider.jsx";

import { NavLink } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { MoveDown } from "lucide-react";

function Home() {
  const [flexHorizontal, setFlexHorizontal] = useState(true);
  const startRef = useRef(null);
  const posterSliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (startRef.current && posterSliderRef.current) {
        if (startRef.current.offsetTop < posterSliderRef.current.offsetTop) {
          if (flexHorizontal) {
            setFlexHorizontal(false);
          }
        } else {
          if (!flexHorizontal) {
            setFlexHorizontal(true);
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [flexHorizontal]);

  return (
    <>
      <header>
        <h1>Welcome to Hanazon! The randomest shopping experience ever!</h1>
        <h2 id="start" ref={startRef}>
          Click to start {flexHorizontal ? <MoveRight /> : <MoveDown />}
        </h2>
      </header>
      <NavLink to="/shop">
        <div className="poster-frame" ref={posterSliderRef}>
          <PosterSlider />
        </div>
      </NavLink>
    </>
  );
}

export default Home;
