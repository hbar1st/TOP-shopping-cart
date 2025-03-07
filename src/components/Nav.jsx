import "../styles/App.css";
import { NavLink, Link } from "react-router";
import { ShoppingCart } from "lucide-react";

import PropTypes from "prop-types";

Nav.propTypes = {
  cartItems: PropTypes.array.isRequired,
};
function Nav({ cartItems }) {
  const cartItemCount = cartItems.reduce((acc, el) => acc + el.amt, 0);
  return (
    <nav>
      <Link
        to="/home"
        id="logo"
        aria-label="Hanazon logo"
        aria-description="Hanazon logo and home page link"
      >
        <span aria-hidden>z</span>
        <div aria-hidden id="mid-logo">
          <p>hana</p>
        </div>
        <span aria-hidden>n</span>
        <span
          className="hidden"
          aria-hidden
          aria-description="logo and home page link"
        >
          Hanazon
        </span>
      </Link>
      <ul role="menubar">
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
            aria-label={`${cartItemCount} items in cart`}
            to="/cart"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <div className="cart" aria-hidden>
              <ShoppingCart color="white" size={24}></ShoppingCart>
              <div className="counter">
                <span>{cartItemCount}</span>
              </div>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
