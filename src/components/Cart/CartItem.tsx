import { Link } from "react-router-dom";

import { useCartStore } from "../../store/cartStore";
import type { CartItem as CartItemType } from "../../types/carts";
import { useToast } from "../../hooks/useToast";

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const addToast = useToast((state) => state.addToast);

  const itemTotal = item.price * item.quantity;

  function handleDecrease() {
    decreaseQuantity(item.id, item.size);
  }

  function handleIncrease() {
    increaseQuantity(item.id, item.size);
  }

  function handleRemove() {
    removeFromCart(item.id, item.size);

    addToast(`${item.name} removed from cart`);
  }

  return (
    <article className="flex gap-4 p-4 sm:p-5">
      {/* Product Image */}
      <Link
        to={`/products/${item.id}`}
        className="shrink-0 overflow-hidden rounded-lg bg-surface"
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-24 w-20 object-cover transition-transform duration-300 hover:scale-105 sm:h-28 sm:w-24"
        />
      </Link>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Product Info */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              to={`/products/${item.id}`}
              className="line-clamp-2 font-medium transition-colors hover:text-secondary"
            >
              {item.name}
            </Link>

            <p className="mt-1 text-sm capitalize text-secondary">
              {item.category}
            </p>

            <p className="mt-1 text-sm text-secondary">
              Size:{" "}
              <span className="font-medium text-primary">{item.size}</span>
            </p>
          </div>

          {/* Unit Price */}
          <p className="hidden shrink-0 font-semibold sm:block">
            ${item.price.toFixed(2)}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-4">
          {/* Quantity */}
          <div>
            <p className="mb-2 text-xs text-secondary">Quantity</p>

            <div className="flex w-fit items-center overflow-hidden rounded-lg border border-border">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={item.quantity === 1}
                className="flex h-9 w-9 items-center justify-center text-lg transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                −
              </button>

              <span className="flex h-9 w-10 items-center justify-center border-x border-border text-sm font-medium">
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={handleIncrease}
                className="flex h-9 w-9 items-center justify-center text-lg transition-colors hover:bg-surface"
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="flex flex-col items-end gap-2">
            <p className="font-semibold sm:hidden">${item.price.toFixed(2)}</p>

            <p className="text-sm">
              Total:{" "}
              <span className="font-semibold">${itemTotal.toFixed(2)}</span>
            </p>

            <button
              type="button"
              onClick={handleRemove}
              className="text-xs text-secondary underline underline-offset-4 transition-colors hover:text-primary"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
