import { findAllByDisplayValue } from "@testing-library/react";
import "../styles/App.css";

import PropTypes from "prop-types";

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

function ProductCard({ product }) {
  const freeDelivery = "Free Delivery";
  const outOfStock = "Out of Stock";
  const stars = [];
  const makeStars = (rating) => {
    const wholeStars = Math.floor(rating);
    const fraction = `${Math.floor((rating - wholeStars) * 100)}%`;
    const getFillValue = (i, key) => {
      let ret = "cyan";
      if (i == wholeStars) {
        ret = `url(#${key})`;
      }
      return ret;
    };
    for (let i = 0; i <= wholeStars; i++) {
      let key = self.crypto.randomUUID();
      stars.push(
        <svg
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
              <stop offset="0%" stopColor="cyan" />
              <stop offset={fraction} stopColor="cyan" />
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

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />

      <p>{product.title}</p>
      <p>SKU # {product.id}</p>
      <div id="rating">
        <span>{product.rating}</span>
        {makeStars(product.rating)}
      </div>
      <p>${product.price}</p>
      <p>{product.amtInStock > 0 ? freeDelivery : outOfStock}</p>
      <input type="number" min="0" max={product.amtInStock} name="" id="" />
      <button type="button">Add to Cart</button>
    </div>
  );
}

export default ProductCard;
