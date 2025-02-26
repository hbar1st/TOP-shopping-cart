import "../styles/App.css";

function ProductCard({ product }) {
  const freeDelivery = "Free Delivery";
  const outOfStock = "Out of Stock";
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />

      <p>{product.title}</p>
      <p>SKU # {product.id}</p>
      <p>{product.rating}</p>
      <p>{product.price}</p>
      <p>{product.amtInStock > 0 ? freeDelivery : outOfStock}</p>
      <input type="number" name="" id="" />
      <button type="button">Add to Cart</button>
    </div>
  );
}

export default ProductCard;
