import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

Modal.propTypes = {
  showModalObj: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default function Modal({ showModalObj, onClose }) {
  const ref = useRef();

  useEffect(() => {
    if (showModalObj) {
      if (ref.current instanceof HTMLDialogElement) {
        ref.current.showModal();
      }
    } else {
      ref.current?.close();
    }
  }, [showModalObj]);
  return (
    <dialog data-testid="modal" aria-modal="true" ref={ref} onCancel={onClose}>
      <div>
        <div>
          <h2>Added to cart:</h2>
          <p>{showModalObj.title}</p>
          <div>
            <img src={showModalObj.image} alt={showModalObj.title} />
            <div>
              <details>
                <summary>Description</summary>
                {showModalObj.description}
              </details>
              <p>{`Amount: ${showModalObj.amt}`}</p>
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
