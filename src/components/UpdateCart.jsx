import "../styles/App.css";
import PropTypes from "prop-types";

// this button acts as a delete if it is shown in the cart page
// and as an add if it is shown in the shop page
function handleClick(
  cartDisplay,
  newValue,
  product,
  cartItems,
  setCartItems,
  setTypedAmt,
  setShowModal
) {
  if (cartDisplay) {
    const updatedCart = [...cartItems].filter((el) => el.id !== product.id);
    setCartItems(updatedCart);
  } else {
    //try to add this product to the cart
    if (isNaN(newValue) || newValue === 0) {
      newValue = 1; //assume user meant to add one item to the cart
    }
    let newCart = updateProd(newValue, cartItems, product);

    setTypedAmt(0);
    setCartItems(newCart);
    //show success dialog
    setShowModal({ ...product, amt: newValue });
  }
}

function getAmtInCart(cartItems, id) {
  let amt = 0;
  let itemArr = cartItems.filter((el) => el.id === id);
  if (itemArr.length === 1) {
    amt = itemArr[0].amt;
  }
  return amt;
}

// if stock total is 5, cart is 0, user types 2, then cart will say amt is 2 + 0 = 2, remainingInStock = 5 - 2 = 3
// if stock total is 5, cart is 2, user types 1, then cart will say amt is 1 + 2 = 3, remainingInStock = 3 - 1 = 2
/**
 *
 * @param {*} value - the value the user typed in if it is valid only (don't pass in invalid values)
 * @param {*} cartItems - the current array of items in the cart
 * @param {*} product - the product object
 * @returns - an array of new cart items with the specific product amount updated within it, which can be passed to setCartItems
 */
function updateProd(value, cartItems, product) {
  const prodId = product.id;
  const originalAmtInStock = product.amtInStock;
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
      ...product,
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

UpdateCart.propTypes = {
  cartDisplay: PropTypes.bool.isRequired,
  product: PropTypes.object.isRequired,
  cartItems: PropTypes.array.isRequired,
  setCartItems: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  shortStock: PropTypes.bool.isRequired,
  isOutOfStock: PropTypes.func.isRequired,
  typedAmt: PropTypes.number.isRequired,
  remainingStockOfProduct: PropTypes.number.isRequired,
  setShortStock: PropTypes.func.isRequired,
  setTypedAmt: PropTypes.func.isRequired,
};

function UpdateCart({
  cartDisplay,
  product,
  cartItems,
  setCartItems,
  setShowModal,
  shortStock,
  isOutOfStock,
  typedAmt,
  remainingStockOfProduct,
  setShortStock,
  setTypedAmt,
}) {
  return (
    //TODO adjust display for cartDisplay true as below is for shop display configuration
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
            cartDisplay,
            typedAmt,
            product,
            cartItems,
            setCartItems,
            setTypedAmt,
            setShowModal
          )
        }
        type="button"
        disabled={
          !cartDisplay && (shortStock || isOutOfStock(product, cartItems))
        }
      >
        {cartDisplay ? "Delete" : "Add to Cart"}
      </button>
    </div>
  );
}

export default UpdateCart;
