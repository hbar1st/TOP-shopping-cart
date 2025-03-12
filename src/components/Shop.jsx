import { useState, useEffect } from "react";
import "../styles/App.css";
import ProductCard from "./ProductCard.jsx";
import { useOutletContext } from "react-router";

import Modal from "./Modal.jsx";

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
      .finally(() => {
        setLoading(false);
      });
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
  const { cartItems, setCartItems } = useOutletContext();
  const { storeProducts, error, loading } = useStoreProducts();

  const [showModal, setShowModal] = useState(null);

  if (loading)
    return (
      <p className="centerV centerH announce">
        Gimme a minute to grab my bag...
      </p>
    );
  if (error)
    return (
      <h1 className="centerV centerH announce">
        Retail therapy aborted due to network error!
      </h1>
    );

  const productCards = storeProducts.map((product) => {
    return (
      <ProductCard
        type="shop"
        key={product.id}
        product={{
          ...product,
        }}
        cartItems={cartItems}
        setCartItems={setCartItems}
        setShowModal={setShowModal}
      ></ProductCard>
    );
  });

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(null)} showModal={showModal}></Modal>
      )}
      <div className="shop" id="main">
        <header>
          <h1>Shop till you drop!</h1>
        </header>
        <section className="card-container">{productCards}</section>
      </div>
    </>
  );
}

export default Shop;
