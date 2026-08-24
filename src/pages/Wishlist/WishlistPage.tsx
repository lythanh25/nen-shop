import WishlistItem from "../../components/Wishlist/WishlistItem";
import { useWishListStore } from "../../store/wishlistStore";

export default function WishlistPage() {
  const wishlistItems = useWishListStore((state) => state.wishlistItems);
  return (
    <>
      {wishlistItems.map((item) => (
        <WishlistItem key={item.id} item={item} />
      ))}
    </>
  );
}
