import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

Modal.propTypes = {
  showModal: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default function Modal({ showModal, onClose }) {
  const ref = useRef();

  useEffect(() => {
    if (showModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [showModal]);

  return (
    <dialog ref={ref} onCancel={onClose}>
      <div>
        <div>
          <h2>Added to cart:</h2>
          <p>{showModal.title}</p>
          <div>
            <img src={showModal.image} alt={showModal.title} />
            <div>
              <p>Amount: {showModal.amt}</p>
              <Link to="/cart">
                <button>Go to cart</button>
              </Link>

              <button onClick={onClose}>Continue Shopping</button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

// use {children} if you want to include the children of the modal from Shop.jsx
