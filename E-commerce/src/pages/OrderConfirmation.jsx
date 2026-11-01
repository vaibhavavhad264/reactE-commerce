import { Link, useLocation } from "react-router-dom";
import { inr } from "../data/products";

export default function OrderConfirmation() {
  const { state } = useLocation();
  let order = state;
  if (!order) { try { order = JSON.parse(localStorage.getItem("lastOrder")); } catch { order = null; } }
  if (!order) return <div className="container center"><h2>No recent order found</h2><Link to="/products" className="btn">Shop now</Link></div>;
  const s = order.shippingInfo;

  return (
    <div className="container narrow">
      <div className="center"><div className="tick">✓</div><h1>Order Placed Successfully!</h1>
        <p>Thank you, {s.name}. Order ID: <b>{order.id}</b> · {order.date}</p></div>
      <div className="box">
        <h3>Items</h3>
        {order.items.map((i) => (
          <div className="cart-item" key={i.id}>
            <img src={i.image} alt={i.name} />
            <div className="grow">{i.name}<br /><small>{inr(i.price)} × {i.qty}</small></div>
            <strong>{inr(i.price * i.qty)}</strong>
          </div>))}
      </div>
      <div className="box">
        <h3>Shipping To</h3>
        <p>{s.name}<br />{s.address}, {s.city} - {s.pincode}<br />📞 {s.phone} · ✉️ {s.email}</p>
        <h3>Payment</h3><p>{order.payment}</p>
        <div className="row"><span>Subtotal</span><span>{inr(order.subtotal)}</span></div>
        <div className="row"><span>Shipping</span><span>{order.shipping ? inr(order.shipping) : "FREE"}</span></div>
        <div className="row total"><span>{order.payment === "Cash on Delivery" ? "Amount to pay on delivery" : "Total Paid"}</span><span>{inr(order.total)}</span></div>
      </div>
      <div className="center"><Link to="/products" className="btn">Continue Shopping</Link></div>
    </div>
  );
}
