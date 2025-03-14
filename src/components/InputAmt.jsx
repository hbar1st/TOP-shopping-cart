import "../styles/App.css";
import PropTypes from "prop-types";

InputAmt.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  product: PropTypes.object.isRequired,
  cartDisplay: PropTypes.bool.isRequired,
  cartItems: PropTypes.array.isRequired,
  setCartItems: PropTypes.func.isRequired,
  setShortStock: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  remainingStockOfProduct: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  setTypedAmt: PropTypes.func.isRequired,
};

function InputAmt({
  value,
  max,
  product,
  cartDisplay,
  cartItems,
  setCartItems,
  setShortStock,
  setShowModal,
  remainingStockOfProduct,
  handleChange,
  setTypedAmt,
}) {
  return (
    <input
      disabled={!cartDisplay && remainingStockOfProduct < 1}
      aria-hidden={!cartDisplay && remainingStockOfProduct < 1}
      aria-label="input amount"
      aria-description="input field for amount of this item"
      step="1"
      type="number"
      inputMode="numeric"
      pattern="[\s\d]*"
      min="0"
      max={max}
      name="amt"
      value={value}
      onChange={(e) =>
        handleChange(
          e,
          product,
          cartDisplay,
          cartItems,
          setCartItems,
          remainingStockOfProduct,
          setShortStock,
          setTypedAmt,
          setShowModal
        )
      }
    />
  );
}

export default InputAmt;
