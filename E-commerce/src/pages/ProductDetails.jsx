import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { fetchProduct, inr } from "../data/products";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setProduct(null); setError("");
    fetchProduct(productId).then(setProduct).catch((e) => setError(e.message));
  }, [productId]);

  if (error) return (
    <div className="container center"><h2>😕 {error}</h2><Link to="/products" className="btn">Back to products</Link></div>);
  if (!product) return <div className="container center"><div className="spinner" /><p>Loading product...</p></div>;

  return (
    <div className="container details">
      <img src={product.image} alt={product.name} />
      <div>
        <span className="tag">{product.category}</span>
        <h1>{product.name}</h1>
        <div className="rating">⭐ {product.rating} / 5</div>
        <h2 className="price">{inr(product.price)}</h2>
        <p>{product.description}</p>
        <div className="qty">
          <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>
        <div className="actions">
          <button className="btn" onClick={() => { addToCart(product, qty); setAdded(true); }}>Add to Cart</button>
          <button className="btn outline" onClick={() => { addToCart(product, qty); navigate("/cart"); }}>Buy Now</button>
        </div>
        {added && <p className="ok">✅ Added to cart! <Link to="/cart">View cart</Link></p>}
      </div>
    </div>
  );
}
