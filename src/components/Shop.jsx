import { useState, useEffect } from "react";
import "../styles/App.css";

import Nav from "./Nav.jsx";

const useStoreProducts = () => {
  const [storeProducts, setStoreProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("server error");
        }
        return res.json();
      })
      .then((json) => setStoreProducts(processStoreProducts(json)))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
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

  if (loading) return <p>Gimme a minute to grab my bag...</p>;
  if (error) return <p>Retail therapy aborted due to network error!</p>;

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
