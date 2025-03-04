import "../styles/App.css";
import { NavLink, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import PropTypes from "prop-types";

Nav.propTypes = {
  cartItems: PropTypes.array.isRequired,
  setCartItems: PropTypes.func.isRequired,
};
function Nav({ cartItems, setCartItems }) {
  return (
    <nav>
      <Link to="/home" id="logo">
        <span>z</span>
        <div id="mid-logo">
          <p>hana</p>
        </div>
        <span>n</span>
      </Link>
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
            <div className="cart">
              <ShoppingCart color="white" size={24}></ShoppingCart>
              <div className="counter">
                <span>{cartItems.reduce((acc, el) => acc + el.amt, 0)}</span>
              </div>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
