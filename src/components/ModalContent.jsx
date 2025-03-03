export default function ModalContent({ refProp, onClose }) {
  return (
    <div ref={refProp} className="modal">
      <div>I'm a modal dialog</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
