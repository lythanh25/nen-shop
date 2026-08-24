import CartItem from "../../components/Cart/CartItem";
import CartSummary from "../../components/Cart/CartSummary.tsx";
import { useCartStore } from "../../store/cartStore.ts";

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <CartSummary subtotal={subtotal} />
    </>
  );
}
