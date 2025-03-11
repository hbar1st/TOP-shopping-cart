import "../styles/App.css";

import { useState, useRef, useEffect } from "react";
import PosterSlider from "./PosterSlider.jsx";

import { NavLink } from "react-router";
import { MoveRight } from "lucide-react";
import { MoveDown } from "lucide-react";

function Home() {
  const [portrait, setPortrait] = useState(false);
  const startRef = useRef(null);
  const posterSliderRef = useRef(null);

  // respond to window resizing by changing the arrow icon displayed
  // as layout will either be horizontal or vertical (flex)
  useEffect(() => {
    const startRefClone = startRef.current;
    const posterRefClone = posterSliderRef.current;

    const handleResize = (startRefClone, posterRefClone) => {
      if (startRefClone && posterRefClone) {
        if (startRefClone.offsetTop < posterRefClone.offsetTop) {
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

    window.addEventListener("resize", () => {
      handleResize(startRefClone, posterRefClone);
    });

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", () => {
        handleResize(startRefClone, posterRefClone);
      });
    };
  }, [portrait, setPortrait]);

  return (
    <div className="home" id="main">
      <header>
        <h1>Welcome to Hanazon! The randomest shopping experience ever!</h1>
        <h2 id="start" ref={startRef}>
          Click to start{" "}
          {portrait ? (
            <MoveDown data-testid="arrow" alt="arrow pointing down" />
          ) : (
            <MoveRight data-testid="arrow" alt="arrow pointing right" />
          )}
        </h2>
      </header>
      <NavLink to="/shop">
        <div
          aria-label="slideshow"
          aria-live="false"
          aria-description="Hanazon poster slideshow"
          className="poster-frame"
          ref={posterSliderRef}
        >
          <PosterSlider />
        </div>
      </NavLink>
    </div>
  );
}

export default Home;
