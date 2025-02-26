import "../styles/App.css";
import PosterSlider from "./PosterSlider.jsx";

import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <header>
        <h1>Welcome to Hanazon! The randomest shopping experience ever!</h1>
      </header>
      <NavLink to="/shop">
        <PosterSlider />
      </NavLink>
    </>
  );
}

export default Home;
