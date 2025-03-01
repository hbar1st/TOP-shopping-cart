import { useState } from "react";
import "../styles/App.css";
import { useNavigate } from "react-router";

function Cart() {
  let navigate = useNavigate();
  return (
    <>
      <header>
        <h1>What have we got here?</h1>
      </header>
      <div>
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
    </>
  );
}

export default Cart;
