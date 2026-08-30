import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore.ts";
import { useWishListStore } from "../../store/wishlistStore.ts";
import { useToast } from "../../hooks/useToast";
import type { Product } from "../../types/products.ts";

import Button from "../Ui/Button.tsx";
import Card from "../Ui/Card.tsx";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const isInWishlist = useWishListStore((state) =>
    state.isInWishlist(product.id),
  );

  const toggleWishlist = useWishListStore((state) => state.toggleWishlist);

  const addToast = useToast((state) => state.addToast);

  function handleToggleWishlist() {
    toggleWishlist(product);

    if (isInWishlist) {
      addToast("Removed from wishlist");
    } else {
      addToast("Added to wishlist");
    }
  }

  function handleAddToCart() {
    addToCart(product);
    addToast("Added to cart");
  }

  return (
    <Card className="flex flex-col gap-3 border p-2">
      {/* Image */}
      <Link
        to={`/products/${product.id}`}
        className="group relative overflow-hidden rounded"
      >
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Information */}
      <div>
        <h3 className="font-medium">{product.name}</h3>

        <p className="text-sm capitalize text-secondary">{product.category}</p>

        <p className="mt-1 font-semibold">${product.price.toFixed(2)}</p>
      </div>

      {/* Wishlist + Detail */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-xl transition-colors ${
            isInWishlist
              ? "text-error"
              : "text-secondary hover:bg-surface hover:text-primary"
          }`}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? "♥" : "♡"}
        </button>

        <Link
          to={`/products/${product.id}`}
          className="text-sm underline underline-offset-4 transition-opacity hover:opacity-60"
        >
          View detail
        </Link>
      </div>

      {/* Cart */}
      <Button onClick={handleAddToCart} className="w-full">
        Add to Cart
      </Button>
    </Card>
  );
}
