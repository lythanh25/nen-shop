import { Link } from "react-router-dom";

import { useCartStore } from "../../store/cartStore";
import { useWishListStore } from "../../store/wishlistStore";
import { useToast } from "../../hooks/useToast";

import type { Product } from "../../types/products";

import Button from "../Ui/Button";
import Card from "../Ui/Card";

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
    <Card className="flex flex-col gap-3 rounded-xl border p-2">
      {/* Product Image */}
      <Link
        to={`/products/${product.id}`}
        className="group relative overflow-hidden rounded-lg"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Product Information */}
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
          aria-label={
            isInWishlist
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isInWishlist}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-xl transition-colors ${
            isInWishlist
              ? "text-error"
              : "text-secondary hover:bg-surface hover:text-primary"
          }`}
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

      {/* Add to Cart */}
      <Button type="button" onClick={handleAddToCart} className="w-full">
        Add to Cart
      </Button>
    </Card>
  );
}
