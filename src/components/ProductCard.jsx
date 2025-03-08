import { useState } from "react";
import "../styles/App.css";
import PropTypes from "prop-types";
import UpdateCart from "./UpdateCart.jsx";

/**
 * gets the remaining stock value from the cart object
 * @param {*} cartItems
 * @param {*} id
 * @returns -1 if this product is not in the cart
 */
function getRemainingStock(cartItems, id) {
  let amt = 0;
  let itemArr = cartItems.filter((el) => el.id === id);
  if (itemArr.length === 1) {
    amt = itemArr[0].remainingStock;
  } else {
    return -1;
  }
  return amt;
}

ProductCard.propTypes = {
  type: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  cartItems: PropTypes.array.isRequired,
  setCartItems: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

function ProductCard({ type, product, cartItems, setCartItems, setShowModal }) {
  const [shortStock, setShortStock] = useState(false);

  const [typedAmt, setTypedAmt] = useState(0);

  const freeDeliveryMsg = "Free Delivery";
  const outOfStockMsg = "Out of Stock";
  let highlightColor = "#c4f7fcff";

  const isOutOfStock = (product, cartItems) => {
    return (
      product.amtInStock === 0 || getRemainingStock(cartItems, product.id) === 0
    );
  };

  const stars = [];
  const makeStars = (rating) => {
    const wholeStars = Math.floor(rating);
    const fraction = `${Math.floor((rating - wholeStars) * 100)}%`;
    const getFillValue = (i, key) => {
      let ret = highlightColor;
      if (i == wholeStars) {
        ret = `url(#${key})`;
      }
      return ret;
    };
    for (let i = 0; i <= wholeStars; i++) {
      let key = self.crypto.randomUUID();
      stars.push(
        <svg
          aria-hidden
          key={key}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-star"
        >
          <defs>
            <linearGradient id={key}>
              <stop offset="0%" stopColor={highlightColor} />
              <stop offset={fraction} stopColor={highlightColor} />
              <stop offset={fraction} stopColor="white" />
              <stop offset="100%" stopColor="white" />
            </linearGradient>
          </defs>
          <g fill={getFillValue(i, key)}>
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
          </g>
        </svg>
      );
    }
    return stars;
  };

  let remainingStockOfProduct = getRemainingStock(cartItems, product.id);
  remainingStockOfProduct =
    remainingStockOfProduct !== -1
      ? remainingStockOfProduct
      : product.amtInStock;

  // either type is shop (from the shopping page) or the type is 'cart' from the cart page
  const shopPage = type === "shop";

  return (
    <div className={shopPage ? "card" : "cart-cell"}>
      <img src={product.image} alt={product.title} />

      <p aria-hidden>{product.title}</p>
      <p>SKU # {product.id}</p>
      <div id="rating" aria-label="product rating">
        <span>{product.rating}</span>
        {makeStars(product.rating)}
      </div>
      <p className="bigger">${product.price}</p>
      {shopPage && (
        <p className="availability">
          {isOutOfStock(product, cartItems) ? outOfStockMsg : freeDeliveryMsg}
        </p>
      )}
      <UpdateCart
        cartDisplay={shopPage ? false : true}
        product={product}
        cartItems={cartItems}
        setCartItems={setCartItems}
        setShowModal={setShowModal}
        shortStock={shortStock}
        isOutOfStock={isOutOfStock}
        typedAmt={typedAmt}
        remainingStockOfProduct={remainingStockOfProduct}
        setShortStock={setShortStock}
        setTypedAmt={setTypedAmt}
        getRemainingStock={getRemainingStock}
      />

      <p
        className={shortStock ? "invalid-amt" : "hidden"}
        aria-hidden={!shortStock}
      >
        Only {shopPage ? remainingStockOfProduct : product.amtInStock}{" "}
        available.
      </p>
    </div>
  );
}

export default ProductCard;
