import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { inr } from "../data/products";

const init = { name: "", email: "", phone: "", address: "", city: "", pincode: "", payment: "cod", card: "", expiry: "", cvv: "", upi: "" };

function validate(f) {
  const e = {};
  if (f.name.trim().length < 3) e.name = "Enter your full name (min 3 characters)";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email";
  if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = "Enter a valid 10-digit mobile number";
  if (f.address.trim().length < 8) e.address = "Enter complete address";
  if (f.city.trim().length < 2) e.city = "Enter city";
  if (!/^\d{6}$/.test(f.pincode)) e.pincode = "Enter a 6-digit pincode";
  if (f.payment === "card") {
    if (!/^\d{16}$/.test(f.card.replace(/\s/g, ""))) e.card = "Card number must be 16 digits";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(f.expiry)) e.expiry = "Use MM/YY";
    if (!/^\d{3}$/.test(f.cvv)) e.cvv = "CVV must be 3 digits";
  }
  if (f.payment === "upi" && !/^[\w.-]+@\w+$/.test(f.upi)) e.upi = "Enter valid UPI ID (e.g. name@upi)";
  return e;
}

export default function Checkout() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [f, setF] = useState(init);
  const [errors, setErrors] = useState({});

  if (!items.length) return (
    <div className="container center"><h2>Your cart is empty</h2><Link to="/products" className="btn">Shop products</Link></div>);

  const change = (e) => setF({ ...f, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const order = {
      id: "ORD" + Date.now().toString().slice(-8),
      date: new Date().toLocaleString("en-IN"),
      items, subtotal, shipping, total,
      shippingInfo: { name: f.name, email: f.email, phone: f.phone, address: f.address, city: f.city, pincode: f.pincode },
      payment: f.payment === "cod" ? "Cash on Delivery" : f.payment === "upi" ? `UPI (${f.upi})` : `Card ending ${f.card.slice(-4)}`,
    };
    localStorage.setItem("lastOrder", JSON.stringify(order));
    clearCart();
    navigate("/order-confirmation", { state: order });
  };

  const field = (name, label, props = {}) => (
    <div className="field">
      <label>{label}</label>
      <input name={name} value={f[name]} onChange={change} className={errors[name] ? "bad" : ""} {...props} />
      {errors[name] && <small className="err">{errors[name]}</small>}
    </div>
  );

  return (
    <div className="container">
      <h1 className="section-title">Checkout</h1>
      <form className="cart-layout" onSubmit={submit} noValidate>
        <div>
          <div className="box">
            <h3>Shipping Information</h3>
            <div className="two">{field("name", "Full Name")}{field("phone", "Mobile Number", { maxLength: 10 })}</div>
            {field("email", "Email", { type: "email" })}
            {field("address", "Address")}
            <div className="two">{field("city", "City")}{field("pincode", "Pincode", { maxLength: 6 })}</div>
          </div>
          <div className="box">
            <h3>Payment Method</h3>
            {[["cod", "💵 Cash on Delivery"], ["upi", "📱 UPI"], ["card", "💳 Credit / Debit Card"]].map(([v, l]) => (
              <label key={v} className="radio"><input type="radio" name="payment" value={v} checked={f.payment === v} onChange={change} /> {l}</label>
            ))}
            {f.payment === "upi" && field("upi", "UPI ID", { placeholder: "name@upi" })}
            {f.payment === "card" && <>
              {field("card", "Card Number", { maxLength: 19, placeholder: "1234 5678 9012 3456" })}
              <div className="two">{field("expiry", "Expiry (MM/YY)", { maxLength: 5 })}{field("cvv", "CVV", { type: "password", maxLength: 3 })}</div>
            </>}
          </div>
        </div>
        <aside className="summary">
          <h3>Your Order</h3>
          {items.map((i) => <div className="row" key={i.id}><span>{i.name} × {i.qty}</span><span>{inr(i.price * i.qty)}</span></div>)}
          <hr />
          <div className="row"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
          <div className="row"><span>Shipping</span><span>{shipping ? inr(shipping) : "FREE"}</span></div>
          <div className="row total"><span>Total</span><span>{inr(total)}</span></div>
          <button className="btn block" type="submit">Place Order</button>
        </aside>
      </form>
    </div>
  );
}
