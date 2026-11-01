import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const search = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/products?q=${encodeURIComponent(q.trim())}` : "/products");
  };

  return (
    <header className="header">
      <div className="container nav">
        <Link to="/" className="logo">shopease</Link>
        <form className="searchbar" onSubmit={search}>
          <span>🔍</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for Products, Brands and More" />
        </form>
        <nav className="links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">🛒 Cart {count > 0 && <span className="badge">{count}</span>}</NavLink>
        </nav>
      </div>
    </header>
  );
}
