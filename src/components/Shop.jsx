import { useState, useEffect } from "react";

import "../styles/App.css";
import ProductCard from "./ProductCard.jsx";
import { useOutletContext } from "react-router-dom";

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
  const [productInventory, setProductInventory] = useState([]);
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

  function getProductInventory(id, inventory) {
    if (!inventory) return [];
    let prodArr = inventory.filter((el) => el.id === id);
    if (prodArr.length === 0) {
      return 0;
    } else {
      return prodArr[0].amt;
    }
  }

  // setup a product inventory to use to manage inventory between rerenders?
  let newProductInventory = [...productInventory];
  if (newProductInventory.length === 0) {
    storeProducts.map((product) => {
      console.log(
        "does cart ever have anything at this point? ",
        cartItems.length
      );
      let cartProdArr = cartItems.filter((el) => el.id === product.id);
      let amtInCart = 0;
      if (cartProdArr.length > 0) {
        amtInCart = cartProdArr[0].amt;
      }
      let prodArr = newProductInventory.filter((el) => el.id === product.id);
      if (prodArr.length === 0) {
        newProductInventory.push({
          id: product.id,
          amt: product.amtInStock - amtInCart,
        });
      }
    });
    setProductInventory(newProductInventory);
    console.log(newProductInventory);
  }

  const productCards = storeProducts.map((product) => {
    return (
      <ProductCard
        key={product.id}
        product={{
          ...product,
          amtInStock: getProductInventory(product.id, productInventory),
        }}
        productInventory={productInventory}
        setProductInventory={setProductInventory}
        cartItems={cartItems}
        setCartItems={setCartItems}
      ></ProductCard>
    );
  });
  //TODO display storeProducts in cards down there
  return (
    <div className="shop" id="main">
      <header>
        <h2>Shop till you drop!</h2>
      </header>
      <div className="card-container">{productCards}</div>
    </div>
  );
}

export default Shop;
