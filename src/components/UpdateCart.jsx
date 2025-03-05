import "../styles/App.css";
import PropTypes from "prop-types";
import InputAmt from "./InputAmt.jsx";
import { Plus, Minus } from "lucide-react";

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
    let newCart = updateProd(false, newValue, cartItems, product);

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
 * @param {*} cartDisplay - if true, then the value is used as is, otherwise add the value to the amt in the cart
 * @param {*} value - the value the user typed in if it is valid only (don't pass in invalid values)
 * @param {*} cartItems - the current array of items in the cart
 * @param {*} product - the product object
 * @returns - an array of new cart items with the specific product amount updated within it, which can be passed to setCartItems
 */
function updateProd(cartDisplay, value, cartItems, product) {
  const prodId = product.id;
  const originalAmtInStock = product.amtInStock;
  const amtInCart = getAmtInCart(cartItems, prodId);

  let updatedProdArr = cartItems.filter((el) => el.id === prodId);
  let cart = [...cartItems];
  let newValue = cartDisplay ? value : value + amtInCart;
  cart.forEach((el, i) => {
    if (el.id === product.id) {
      let prod = {
        ...el,
        amt: newValue,
        remainingStock: el.remainingStock - value,
      };
      cart[i] = prod;
    }
  });
  if (updatedProdArr.length === 0) {
    {
      cart.push({
        ...product,
        amt: newValue,
        remainingStock: originalAmtInStock - value,
      });
    }
  }

  return cart;
}

function handlePlusClick(
  cartDisplay,
  cartItems,
  setCartItems,
  product,
  typedAmt,
  setTypedAmt,
  remainingStock,
  setShortStock
) {
  let amt = Number(typedAmt);
  if (isNaN(amt)) {
    amt = 0;
  }
  if (amt < remainingStock) {
    amt > 0 ? setTypedAmt(++amt) : setTypedAmt(1);
    setShortStock(false);
  }

  if (cartDisplay && amt > 0 && amt <= remainingStock) {
    //valid amount so we can safely update the cart
    let newCart = updateProd(cartDisplay, amt, cartItems, product);
    setCartItems(newCart);
  }
  if (cartDisplay && amt === 0) {
    // effectively delete the item from the cart
    let fakeFunc = () => {};
    handleClick(
      cartDisplay,
      amt,
      product,
      cartItems,
      setCartItems,
      setTypedAmt,
      fakeFunc
    );
  }
}

function handleMinusClick(
  cartDisplay,
  cartItems,
  setCartItems,
  product,
  typedAmt,
  setTypedAmt,
  remainingStock,
  setShortStock
) {
  let amt = Number(typedAmt);
  if (isNaN(amt)) {
    amt = 0;
  }
  if (amt > 0) {
    setTypedAmt(--amt);
    if (amt <= remainingStock) {
      setShortStock(false);
    }
  } else {
    setTypedAmt(0);
  }

  if (cartDisplay && amt > 0 && amt <= remainingStock) {
    //valid amount so we can safely update the cart
    let newCart = updateProd(cartDisplay, amt, cartItems, product);
    setCartItems(newCart);
  }
  if (cartDisplay && amt === 0) {
    //effectively delete this item from the cart
    let fakeFunc = () => {};
    handleClick(
      cartDisplay,
      amt,
      product,
      cartItems,
      setCartItems,
      setTypedAmt,
      fakeFunc
    );
  }
}

/**
 *
 * @param {*} e
 * @param {*} product
 * @param {*} cartDisplay (true if we're already in the cart and changing the value permanently updates the cart)
 * @param {*} cartItems
 * @param {*} setCartItems
 * @param {*} currAmtInStock
 * @param {*} setShortStock
 * @param {*} setTypedAmt
 */
function handleChange(
  e,
  product,
  cartDisplay,
  cartItems,
  setCartItems,
  currAmtInStock,
  setShortStock,
  setTypedAmt
) {
  const newValue = Number(e.target.value);
  const fakeShowModal = () => {};
  if (newValue !== 0) {
    // if the user tries to type a number great than amtInStock or a number greater than the total of amtInStock plus the number of in the cart then, that's invalid
    if (
      (!cartDisplay && newValue > currAmtInStock) ||
      (cartDisplay && newValue > product.amtInStock)
    ) {
      setShortStock(true);
    } else {
      setShortStock(false);
      // if in cart already then go ahead and add the difference between the old and new values to the cart
      if (cartDisplay) {
        handleClick(
          false,
          newValue - getAmtInCart(cartItems, product.id),
          product,
          cartItems,
          setCartItems,
          setTypedAmt,
          fakeShowModal
        );
      }
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
  getRemainingStock: PropTypes.func.isRequired,
};

export default function UpdateCart({
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
  getRemainingStock,
}) {
  let remainingStock = getRemainingStock(cartItems, product.id);
  if (remainingStock === -1 || cartDisplay) {
    remainingStock = product.amtInStock;
  }

  return (
    //TODO adjust display for cartDisplay true as below is for shop display configuration
    <div className="input-amt" id={product.id}>
      {cartDisplay ? (
        <InputAmt
          value={getAmtInCart(cartItems, product.id)}
          max={product.amtInStock}
          product={product}
          cartDisplay={cartDisplay}
          cartItems={cartItems}
          setCartItems={setCartItems}
          setShortStock={setShortStock}
          setShowModal={setShowModal}
          remainingStockOfProduct={remainingStockOfProduct}
          handleChange={handleChange}
          setTypedAmt={setTypedAmt}
        />
      ) : (
        <InputAmt
          value={typedAmt === 0 ? "" : typedAmt}
          max={remainingStockOfProduct}
          product={product}
          cartDisplay={cartDisplay}
          cartItems={cartItems}
          setCartItems={setCartItems}
          setShortStock={setShortStock}
          setShowModal={setShowModal}
          remainingStockOfProduct={remainingStockOfProduct}
          handleChange={handleChange}
          setTypedAmt={setTypedAmt}
        />
      )}
      <div className="inc-dec">
        <button type="button">
          <Plus
            size={18}
            strokeWidth={2}
            onClick={() =>
              handlePlusClick(
                cartDisplay,
                cartItems,
                setCartItems,
                product,
                cartDisplay ? getAmtInCart(cartItems, product.id) : typedAmt,
                setTypedAmt,
                remainingStock,
                setShortStock
              )
            }
          />
        </button>
        <button type="button">
          <Minus
            size={18}
            strokeWidth={2}
            onClick={() =>
              handleMinusClick(
                cartDisplay,
                cartItems,
                setCartItems,
                product,
                cartDisplay ? getAmtInCart(cartItems, product.id) : typedAmt,
                setTypedAmt,
                remainingStock,
                setShortStock
              )
            }
          />
        </button>
      </div>
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
