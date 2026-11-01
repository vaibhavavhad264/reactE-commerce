import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { inr } from "../data/products";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div className="card-body">
        <span className="tag">{product.category}</span>
        <Link to={`/products/${product.id}`} className="card-title">{product.name}</Link>
        <div className="rating">⭐ {product.rating}</div>
        <div className="row">
          <strong className="price">{inr(product.price)}</strong>
          <button className="btn small" onClick={() => addToCart(product)}>Add</button>
        </div>
      </div>
    </div>
  );
}
