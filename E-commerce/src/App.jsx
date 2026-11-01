import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CategoryBar from "./components/CategoryBar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";
import "./App.css";

export default function App() {
  return (
    <>
      <Header />
      <CategoryBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">© 2026 ShopEase · Built with React & React Router</footer>
    </>
  );
}
