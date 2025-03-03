import "../styles/App.css";

import { useState, useRef, useEffect } from "react";
import PosterSlider from "./PosterSlider.jsx";

import { NavLink } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { MoveDown } from "lucide-react";

function Home() {
  const [portrait, setPortrait] = useState(false);
  const startRef = useRef(null);
  const posterSliderRef = useRef(null);

  // respond to window resizing by changing the arrow icon displayed
  // as layout will either be horizontal or vertical (flex)
  useEffect(() => {
    const handleResize = () => {
      if (startRef.current && posterSliderRef.current) {
        if (startRef.current.offsetTop < posterSliderRef.current.offsetTop) {
          if (!portrait) {
            setPortrait(true);
          }
        } else {
          if (portrait) {
            setPortrait(false);
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [portrait, setPortrait]);

  return (
    <div className="home" id="main">
      <header>
        <h1>Welcome to Hanazon! The randomest shopping experience ever!</h1>
        <h2 id="start" ref={startRef}>
          Click to start {portrait ? <MoveDown /> : <MoveRight />}
        </h2>
      </header>
      <NavLink to="/shop">
        <div className="poster-frame" ref={posterSliderRef}>
          <PosterSlider />
        </div>
      </NavLink>
    </div>
  );
}

export default Home;
