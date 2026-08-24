import { Link } from "react-router-dom";
import Button from "../Ui/Button";

export default function Hero() {
  return (
    <div className="flex gap-2 items-center mt-2 justify-between flex-col md:flex-row">
      <div className="flex flex-col gap-2 order-last md:order-first">
        <h2>MODERN FASHION </h2>
        <p>Discover your style</p>
        <Link to="/products">
          <Button>{"Shop Now"}</Button>
        </Link>
      </div>
      <div>
        <img
          className="w-full max-w-md"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAPf_062JKWOBQr9rKxfyjLtlwzCn6Wwx_fJ6vQDIAgQ&s=10"
          alt="Hero image"
        />
      </div>
    </div>
  );
}
