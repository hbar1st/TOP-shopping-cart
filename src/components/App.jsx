import "../styles/App.css";
import Nav from "./Nav.jsx";
import { Outlet, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      <Navigate to="/home" replace />
    </>
  );
}

export default App;

/**
       <main className="orient">
        <Outlet />
      </main>
 */
