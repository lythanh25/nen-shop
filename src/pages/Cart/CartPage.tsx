import CartItem from "../../components/Cart/CartItem";
import CartSummary from "../../components/Cart/CartSummary";
import { useCartStore } from "../../store/cartStore";

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              className="h-7 w-7 text-secondary"
              fill="currentColor"
            >
              <path d="M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16z" />
            </svg>
          </div>

          <h1 className="mt-5 text-heading-3 font-bold">Your cart is empty</h1>

          <p className="mt-2 text-secondary">
            Looks like you haven't added anything to your cart yet.
          </p>

          <a
            href="/products"
            className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-secondary"
          >
            Continue Shopping
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-16 pt-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-heading-3 font-bold">Shopping Cart</h1>

        <p className="mt-2 text-secondary">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your
          cart.
        </p>
      </div>

      {/* Cart Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        {/* Cart Items */}
        <div>
          <div className="divide-y divide-border rounded-xl border border-border">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Summary */}
        <CartSummary subtotal={subtotal} />
      </div>
    </section>
  );
}
