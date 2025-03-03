import { useRef, useEffect } from "react";

import { Link } from "react-router-dom";
export default function Modal({ showModal, onClose, children }) {
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
        <button onClick={onClose}>Close</button>
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
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

// use {children} if you want to include the children of the modal from Shop.jsx
