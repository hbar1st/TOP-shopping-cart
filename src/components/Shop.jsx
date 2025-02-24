import { useState } from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";

function Shop() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <header>
        <h1>Here we go!</h1>
      </header>
    </>
  );
}

export default Shop;
