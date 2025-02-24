import { useState } from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";
import Nav from "./Nav.jsx";

function App() {
  return (
    <>
      <Nav />
      <header>
        <h1>Welcome to the randomest shopping experience ever!</h1>
      </header>
    </>
  );
}

export default App;
