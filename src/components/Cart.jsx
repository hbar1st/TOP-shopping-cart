import "../styles/App.css";
import { useNavigate } from "react-router";
import { useRef, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import { useOutletContext } from "react-router";

function Cart() {
  const { cartItems, setCartItems } = useOutletContext();
  const buttonPanelRef = useRef(null);
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

  useEffect(() => {
    if (total > 0) {
      buttonPanelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [total]);

  return (
    <div id="cart-page" aria-flowto="checkout">
      <div id="cart">
        <header>
          <h2>Shopping Cart</h2>
        </header>
        {cartItems.length > 0 ? (
          <div className="cart-items-container">{productCards}</div>
        ) : (
          <p className="cart-cell">Your cart is empty.</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <div ref={buttonPanelRef} className="button-panel" id="checkout">
          <p>
            Subtotal ({cartItems.reduce((acc, el) => acc + el.amt, 0)} items): $
            {total}
          </p>
          <button
            type="button"
            onClick={() => {
              setCartItems([]);
              navigate("/thanks");
            }}
          >
            Checkout Now
          </button>
          <button
            type="button"
            onClick={() => {
              setCartItems([]);
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
