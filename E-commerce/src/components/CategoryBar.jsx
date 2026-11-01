import { Link } from "react-router-dom";
import { catIcons } from "../data/products";

export default function CategoryBar() {
  return (
    <div className="catbar">
      <div className="container catbar-in">
        {catIcons.map(([name, icon]) => (
          <Link key={name} to={`/products?category=${encodeURIComponent(name)}`} className="catitem">
            <span className="circle">{icon}</span>
            <span className="catname">{name} ⌄</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
