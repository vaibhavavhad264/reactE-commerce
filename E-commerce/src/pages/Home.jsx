import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products, catIcons } from "../data/products";

export default function Home() {
  const featured = products.filter((p) => p.featured);
  return (
    <>
      <div className="container">
        <div className="banner">
          <div><span>₹</span><b>Easy<br />Returns</b></div>
          <div><span>🏅</span><b>Top Rated<br />Products</b></div>
          <div><span>🚚</span><b>Cash<br />on Delivery</b></div>
        </div>
        <h2 className="section-title">Shop by Category</h2>
        <div className="cats">
          {catIcons.map(([c, i]) => (
            <Link key={c} to={`/products?category=${encodeURIComponent(c)}`} className="cat">{i}<br />{c}</Link>
          ))}
        </div>
        <h2 className="section-title">Featured Products</h2>
        <div className="grid">{featured.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </div>
    </>
  );
}
