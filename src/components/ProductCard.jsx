import { useState } from "react";
import "../styles/App.css";
import PropTypes from "prop-types";

function handleClick(
  newValue,
  product,
  cartItems,
  setCartItems,
  setTypedAmt,
  setShowModal
) {
  console.log({ newValue });
  if (isNaN(newValue) || newValue === 0) {
    newValue = 1; //assume user meant to add one item to the cart
  }
  let newCart = updateProd(newValue, cartItems, product.id, product.amtInStock);

  setTypedAmt(0);
  setCartItems(newCart);
  //show success dialog
  setShowModal({ ...product, amt: newValue });
}
// if stock total is 5, cart is 0, user types 2, then cart will say amt is 2 + 0 = 2, remainingInStock = 5 - 2 = 3
// if stock total is 5, cart is 2, user types 1, then cart will say amt is 1 + 2 = 3, remainingInStock = 3 - 1 = 2
/**
 *
 * @param {*} value - the value the user typed in if it is valid only (don't pass in invalid values)
 * @param {*} cartItems - the current array of items in the cart
 * @param {*} prodId - the product.id that represents the product the user is clicking Add To Cart on
 * @param {*} originalAmtInStock - the amount in stock we originally "fetched"
 * @returns - an array of new cart items with the specific product amount updated within it, which can be passed to setCartItems
 */
function updateProd(value, cartItems, prodId, originalAmtInStock) {
  const amtInCart = getAmtInCart(cartItems, prodId);

  let newCart = cartItems.filter((el) => el.id !== prodId);
  let updatedProdArr = cartItems.filter((el) => el.id === prodId);
  if (updatedProdArr.length === 1) {
    let currentStock = updatedProdArr[0].remainingStock;
    let updatedProd = {
      ...updatedProdArr[0],
      amt: value + amtInCart,
      remainingStock: currentStock - value,
    };
    newCart.push(updatedProd);
  } else {
    newCart.push({
      id: prodId,
      amt: value + amtInCart,
      remainingStock: originalAmtInStock - value,
    });
  }
  return newCart;
}

/**
 *
 * @param {*} e
 * @param {*} product
 * @param {*} cartItems
 * @param {*} setShortStock
 * @param {*} setTypedAmt
 */
function handleChange(e, currAmtInStock, setShortStock, setTypedAmt) {
  const newValue = Number(e.target.value);

  if (newValue !== 0) {
    // if the user tries to type a number great than amtInStock or a number greater than the total of amtInStock plus the number of in the cart then, that's invalid
    if (newValue > currAmtInStock) {
      setShortStock(true);
    } else {
      setShortStock(false);
    }
  }

  setTypedAmt(newValue);
}

function getAmtInCart(cartItems, id) {
  let amt = 0;
  let itemArr = cartItems.filter((el) => el.id === id);
  if (itemArr.length === 1) {
    amt = itemArr[0].amt;
  }
  return amt;
}

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
  product: PropTypes.object.isRequired,
  cartItems: PropTypes.array.isRequired,
  setCartItems: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

function ProductCard({ product, cartItems, setCartItems, setShowModal }) {
  const [shortStock, setShortStock] = useState(false);

  const [typedAmt, setTypedAmt] = useState(0);

  const freeDeliveryMsg = "Free Delivery";
  const outOfStockMsg = "Out of Stock";
  let highlightColor = "#c4f7fcff";

  const isOutOfStock = (product, cartItems) => {
    console.log("In isOutOfStock");
    console.log("product: ", product);
    console.log("cartItems: ", cartItems);
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
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />

      <p>{product.title}</p>
      <p>SKU # {product.id}</p>
      <div id="rating">
        <span>{product.rating}</span>
        {makeStars(product.rating)}
      </div>
      <p className="bigger">${product.price}</p>
      <p className="availability">
        {isOutOfStock(product, cartItems) ? outOfStockMsg : freeDeliveryMsg}
      </p>
      <div className="input-amt" id={product.id}>
        <input
          step="1"
          type="number"
          inputMode="numeric"
          pattern="\d*"
          min="0"
          max={remainingStockOfProduct}
          name="amt"
          value={typedAmt === 0 ? "" : typedAmt}
          onChange={(e) =>
            handleChange(e, remainingStockOfProduct, setShortStock, setTypedAmt)
          }
        />

        <button
          onClick={() =>
            handleClick(
              typedAmt,
              product,
              cartItems,
              setCartItems,
              setTypedAmt,
              setShowModal
            )
          }
          type="button"
          disabled={shortStock || isOutOfStock(product, cartItems)}
        >
          Add to Cart
        </button>
      </div>

      <p
        className={shortStock ? "invalid-amt" : "hidden"}
        aria-hidden={!shortStock}
      >
        Only {remainingStockOfProduct} available.
      </p>
    </div>
  );
}

export default ProductCard;
