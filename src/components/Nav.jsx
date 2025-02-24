import { useState } from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="shop">Shop</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
