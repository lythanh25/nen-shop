import { Link } from "react-router-dom";

import { useCartStore } from "../../store/cartStore";
import { useWishListStore } from "../../store/wishlistStore";
import { useToast } from "../../hooks/useToast";

import type { Product } from "../../types/products";

type WishlistItemProps = {
  item: Product;
};

export default function WishlistItem({ item }: WishlistItemProps) {
  const removeFromWishlist = useWishListStore(
    (state) => state.removeFromWishlist,
  );

  const addToCart = useCartStore((state) => state.addToCart);

  const addToast = useToast((state) => state.addToast);

  function handleRemove() {
    removeFromWishlist(item.id);

    addToast("Removed from wishlist");
  }

  function handleAddToCart() {
    addToCart(item);

    addToast("Added to cart");
  }

  return (
    <article className="group flex gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-surface sm:p-5">
      {/* Image */}
      <Link to={`/products/${item.id}`} className="shrink-0">
        <div className="h-28 w-24 overflow-hidden rounded-lg bg-surface sm:h-36 sm:w-28">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        {/* Product Info */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-secondary">
            {item.category}
          </p>

          <Link to={`/products/${item.id}`} className="mt-1 block">
            <h2 className="truncate font-semibold transition-colors hover:text-secondary">
              {item.name}
            </h2>
          </Link>

          <p className="mt-2 font-semibold">${item.price.toFixed(2)}</p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-secondary"
          >
            Add to Cart
          </button>

          <button
            type="button"
            onClick={handleRemove}
            className="text-sm text-secondary underline underline-offset-4 transition-colors hover:text-primary"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
