import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart")) || []; } catch { return []; }
  });
  useEffect(() => localStorage.setItem("cart", JSON.stringify(items)), [items]);

  const addToCart = (p, qty = 1) =>
    setItems((c) => c.find((i) => i.id === p.id)
      ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + qty } : i))
      : [...c, { ...p, qty }]);
  const setQty = (id, qty) =>
    setItems((c) => (qty < 1 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i))));
  const removeItem = (id) => setItems((c) => c.filter((i) => i.id !== id));
  const clearCart = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider value={{ items, count, subtotal, shipping, total, addToCart, setQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
