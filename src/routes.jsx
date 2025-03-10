import App from "./components/App.jsx";
import Shop from "./components/Shop.jsx";
import Cart from "./components/Cart.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Home from "./components/Home.jsx";
import ThanksForShopping from "./components/ThanksForShopping.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "home", element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "thanks", element: <ThanksForShopping /> },
    ],
  },
];
export default routes;
