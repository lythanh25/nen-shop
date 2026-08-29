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
    <Card className="flex flex-col gap-3 border p-2">
      <div className="relative overflow-hidden rounded">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div>
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-secondary">{product.category}</p>
        <p className="mt-1 font-semibold">${product.price}</p>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={() => addToWishlist(product)} className="text-xl">
          ♡
        </button>

        <Link
          to={`/products/${product.id}`}
          className="text-sm underline underline-offset-4"
        >
          View detail
        </Link>
      </div>

      <Button onClick={() => addToCart(product)} className="w-full">
        Add to Cart
      </Button>
    </Card>
  );
}
