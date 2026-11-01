import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products, categories, inr } from "../data/products";

export default function Products() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "All";
  const search = params.get("q") || "";
  const [maxPrice, setMaxPrice] = useState(60000);
  const [sort, setSort] = useState("none");

  const setParam = (k, v) => {
    const p = new URLSearchParams(params);
    v && v !== "All" ? p.set(k, v) : p.delete(k);
    setParams(p);
  };

  let list = products.filter((p) =>
    (category === "All" || p.category === category) &&
    p.price <= maxPrice &&
    (p.name + " " + p.category).toLowerCase().includes(search.toLowerCase()));
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <div className="container">
      <h1 className="section-title">{search ? `Results for "${search}"` : category === "All" ? "All Products" : category}</h1>
      <div className="filters">
        <select value={category} onChange={(e) => setParam("category", e.target.value)}>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="none">Sort: Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
        <label className="range">Max price: <b>{inr(maxPrice)}</b>
          <input type="range" min="300" max="60000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} />
        </label>
        {(search || category !== "All") && <button className="btn small outline" onClick={() => setParams({})}>Clear filters</button>}
      </div>
      {list.length === 0 ? <p className="empty">No products match your filters.</p> :
        <div className="grid">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>}
    </div>
  );
}
