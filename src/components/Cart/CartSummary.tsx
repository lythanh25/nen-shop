type CartSummaryProps = {
  subtotal: number;
};

export default function CartSummary({ subtotal }: CartSummaryProps) {
  return (
    <div>
      <h2>Cart Summary</h2>

      <p>Subtotal: ${subtotal}</p>
      <p>Shipping: Free</p>
      <p>Total: ${subtotal}</p>

      <button>Checkout</button>
    </div>
  );
}
