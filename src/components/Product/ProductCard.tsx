import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore.ts";
import { useWishListStore } from "../../store/wishlistStore.ts";
import type { Product } from "../../types/products.ts";
import Button from "../Ui/Button.tsx";
import Card from "../Ui/Card.tsx";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishListStore((state) => state.addToWishlist);
  return (
    <Card className="border inline-flex flex-col p-2 gap-2">
      <img src={product.image} alt={product.name} className="w-75 rounded" />
      <div className="border flex flex-col p-2">
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <p>{product.price}</p>
      </div>
      <div className="flex justify-between">
        <button onClick={() => addToWishlist(product)}>♡</button>
        <Link to={`/products/${product.id}`}>View detail</Link>
      </div>
      <Button
        onClick={() => {
          addToCart(product);
        }}
      >
        Add to Cart
      </Button>
    </Card>
  );
}
