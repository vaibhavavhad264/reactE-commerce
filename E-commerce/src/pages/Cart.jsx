import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { inr } from "../data/products";

export default function Cart() {
  const { items, count, subtotal, shipping, total, setQty, removeItem } = useCart();
  if (!items.length) return (
    <div className="container center"><h2>🛒 Your cart is empty</h2><Link to="/products" className="btn">Start shopping</Link></div>);

  return (
    <div className="container">
      <h1 className="section-title">Shopping Cart ({count} items)</h1>
      <div className="cart-layout">
        <div>
          {items.map((i) => (
            <div className="cart-item" key={i.id}>
              <img src={i.image} alt={i.name} />
              <div className="grow">
                <Link to={`/products/${i.id}`} className="card-title">{i.name}</Link>
                <div className="price">{inr(i.price)}</div>
                <div className="qty">
                  <button onClick={() => setQty(i.id, i.qty - 1)}>−</button>
                  <span>{i.qty}</span>
                  <button onClick={() => setQty(i.id, i.qty + 1)}>+</button>
                </div>
              </div>
              <div className="right">
                <strong>{inr(i.price * i.qty)}</strong>
                <button className="link-danger" onClick={() => removeItem(i.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <aside className="summary">
          <h3>Order Summary</h3>
          <div className="row"><span>Items</span><span>{count}</span></div>
          <div className="row"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
          <div className="row"><span>Shipping</span><span>{shipping ? inr(shipping) : "FREE"}</span></div>
          <hr />
          <div className="row total"><span>Total</span><span>{inr(total)}</span></div>
          <Link to="/checkout" className="btn block">Proceed to Checkout</Link>
        </aside>
      </div>
    </div>
  );
}
