import "../styles/App.css";
import Nav from "./Nav.jsx";
import { Outlet, Navigate } from "react-router-dom";

import { useState } from "react";

function App() {
  // an array of objects containing the id of each product the user added to the cart and the corresponding amounts
  // example: [{id: a11, price:11.11, amt: 2, remainingStock: 0}, {id: b22, price:10.00, amt: 1, remainingStock: 1}]
  // if the user removed all the items of a certain type from the cart then they will not appear in this list (they will be removed here too)
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <Nav cartItems={cartItems} />
      <Navigate to="/home" replace />
      <main>
        <Outlet
          context={{
            cartItems,
            setCartItems,
          }}
        />
      </main>
    </>
  );
}

export default App;
