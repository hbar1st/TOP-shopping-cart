import { useState } from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="shop">Shop</Link>
          </li>
        </ul>
      </nav>
      <header>
        <h1>Welcome to the randomest shopping experience ever!</h1>
      </header>
    </>
  );
}

export default App;
