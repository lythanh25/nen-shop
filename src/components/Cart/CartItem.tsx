import { useCartStore } from "../../store/cartStore";
import type { CartItem as CartItemType } from "../../types/carts";

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  return (
    <div className="flex gap-4 border p-4">
      <img src={item.image} alt={item.name} className="w-24 rounded" />

      <div>
        <h3>{item.name}</h3>
        <p>{item.category}</p>
        <p>${item.price}</p>
        <div>
          <p>
            Quantity:
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
          </p>
        </div>
        <p>Total: ${item.price * item.quantity}</p>
      </div>
      <div>
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </div>
  );
}
