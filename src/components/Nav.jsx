import { useState } from "react";
import "../styles/App.css";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Nav() {
  return (
    <nav>
      <div id="logo">
        <span>z</span>
        <div id="mid-logo">
          <p>hana</p>
        </div>
        <span>n</span>
      </div>
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
