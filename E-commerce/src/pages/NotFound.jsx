import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="container center">
      <h1 style={{ fontSize: "5rem", margin: 0 }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn">Go Home</Link>
    </div>
  );
}
