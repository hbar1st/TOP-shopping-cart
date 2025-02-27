import "../styles/App.css";
import PosterSlider from "./PosterSlider.jsx";

import { NavLink } from "react-router-dom";
import { MoveRight } from "lucide-react";

function Home() {
  return (
    <>
      <header>
        <h1>Welcome to Hanazon! The randomest shopping experience ever!</h1>
        <h2 id="start">
          Click to start <MoveRight />
        </h2>
      </header>
      <NavLink to="/shop">
        <PosterSlider />
      </NavLink>
    </>
  );
}

export default Home;
