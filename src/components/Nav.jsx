import { useState } from "react";
import "../styles/App.css";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Nav() {
  return (
    <nav>
      <p id="logo">hanazon</p>
      <ul>
        <li>
          <NavLink
            to="/home"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/shop"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Shop
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/cart"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <ShoppingCart color="white" size={24}></ShoppingCart>
            <span className="counter"></span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
