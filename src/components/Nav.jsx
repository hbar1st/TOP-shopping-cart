import { useState } from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/shop">Shop</Link>
        </li>

        <li>
          <Link to="/cart">
            <ShoppingCart color="white" size={24}></ShoppingCart>
            <span className="counter"></span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
