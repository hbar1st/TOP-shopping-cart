import { useState } from "react";
import "../styles/App.css";
import Nav from "./Nav.jsx";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();

  return (
    <>
      <Nav />
      <Navigate to="/home" replace />
      <main>
        <Outlet />
      </main>
    </>
  );
}


export default App;
