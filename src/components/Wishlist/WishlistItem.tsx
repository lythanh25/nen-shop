import { useWishListStore } from "../../store/wishlistStore";
import type { Product } from "../../types/products";

type WishlistItemProps = {
  item: Product;
};

export default function WishlistItem({ item }: WishlistItemProps) {
  const removeFromWishlist = useWishListStore(
    (state) => state.removeFromWishlist,
  );

  return (
    <div className="flex gap-4 border p-4">
      <img src={item.image} alt={item.name} className="w-24 rounded" />

      <div>
        <h3>{item.name}</h3>
        <p>{item.category}</p>
        <p>${item.price}</p>
      </div>

      <div>
        <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
      </div>
    </div>
  );
}
