import { Link } from "react-router-dom";
import Button from "../Ui/Button";

type CartSummaryProps = {
  subtotal: number;
};

export default function CartSummary({ subtotal }: CartSummaryProps) {
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <aside className="h-fit rounded-xl border border-border p-5 lg:sticky lg:top-28">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div className="mt-6 space-y-4 text-sm">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-secondary">Subtotal</span>

          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="text-secondary">Shipping</span>

          <span className="font-medium text-success">Free</span>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>

            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Link to="/checkout">
        <Button type="button" className="mt-6 w-full py-3">
          Proceed to Checkout
        </Button>
      </Link>

      <Link
        to="/products"
        className="mt-3 flex w-full items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-surface"
      >
        Continue Shopping
      </Link>

      <p className="mt-5 text-center text-xs leading-5 text-secondary">
        Free shipping on all orders.
      </p>
    </aside>
  );
}
