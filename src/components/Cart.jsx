import "../styles/App.css";
import { useNavigate } from "react-router";

import ProductCard from "./ProductCard.jsx";
import { useOutletContext } from "react-router-dom";

function Cart() {
  const { cartItems, setCartItems } = useOutletContext();
  let navigate = useNavigate();

  const productCards = cartItems.map((product) => {
    return (
      <ProductCard
        type="cart"
        key={product.id}
        product={{
          ...product,
        }}
        cartItems={cartItems}
        setCartItems={setCartItems}
        setShowModal={() => {}} //empty function because we don't want the modal in this page
      ></ProductCard>
    );
  });

  const total = cartItems.reduce((acc, el) => acc + el.price, 0).toFixed(2);
  return (
    <div id="cart-page">
      <div id="cart">
        <header>
          <h2>Shopping Cart</h2>
        </header>
        {cartItems.length > 0 ? (
          <div className="cart-items-container">{productCards}</div>
        ) : (
          <p className="cart-cell">Nothing in cart.</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="button-panel">
          <p>
            Subtotal ({cartItems.reduce((acc, el) => acc + el.amt, 0)} items): $
            {total}
          </p>
          <button
            type="button"
            onClick={() => {
              navigate("/thanks");
            }}
          >
            Checkout Now
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/thanks");
            }}
          >
            Checkout With PayPal
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
