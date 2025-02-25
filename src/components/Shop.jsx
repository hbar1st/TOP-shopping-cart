import { useState, useEffect, useRef } from "react";
import "../styles/App.css";

import Nav from "./Nav.jsx";

const useStoreProducts = () => {
  const hasRunOnce = useRef(false);
  const [storeProducts, setStoreProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(hasRunOnce.current);
    if (!hasRunOnce.current) {
      fetch("https://fakestoreapi.com/products")
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("server error");
          }
          return res.json();
        })
        .then((json) => setStoreProducts(processStoreProducts(json)))
        .then(() => console.log("re-running the fetch?"))
        .catch((error) => setError(error))
        .finally(() => {
          hasRunOnce.current = true;
          console.log("just set hasRunOnce to true");
          setLoading(false);
        });
    }
  }, []);

  return { storeProducts, error, loading };
};

function processStoreProducts(json) {
  // each item in the store will be kept in state with the following values:
  // category, description, id, image url, price, rating, ratingCount, title, amtInStock
  // initially, all items will get a random number between 0 and 5 inclusive of amtInStock

  let products = [];
  json.forEach(({ id, title, category, description, image, price, rating }) => {
    products.push({
      id,
      title,
      category,
      description,
      image,
      price,
      rating: rating.rate,
      ratingCount: rating.count,
      amtInStock: Math.floor(Math.random() * 6),
    });
  });
  return products;
}

function Shop() {
  const { storeProducts, error, loading } = useStoreProducts();

  if (loading)
    return (
      <p className="centerV centerH announce">
        Gimme a minute to grab my bag...
      </p>
    );
  if (error)
    return (
      <p className="centerV centerH announce">
        Retail therapy aborted due to network error!
      </p>
    );

  //TODO display storeProducts in cards down there
  return (
    <>
      <Nav />
      <header>
        <h1>Here we go!</h1>
      </header>
    </>
  );
}

export default Shop;
