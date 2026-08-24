import { Link } from "react-router-dom";
import Button from "../Ui/Button";
import { useState } from "react";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header className="flex justify-around">
      <h1>NenShop</h1>
      <div className="navigation-header flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/categories">Categories</Link>
      </div>
      <div className="actions-header flex gap-4">
        <div>
          <input
            type="search"
            className="border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to={`/products?search=${searchTerm}`}>🔍</Link>
        </div>
        <Link to="/wishlists">♡</Link>
        <Link to="/carts">🛒</Link>
        <Button>Login</Button>
      </div>
    </header>
  );
}
