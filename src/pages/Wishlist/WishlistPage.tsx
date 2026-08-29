import { Link } from "react-router-dom";
import WishlistItem from "../../components/Wishlist/WishlistItem";
import { useWishListStore } from "../../store/wishlistStore";

export default function WishlistPage() {
  const wishlistItems = useWishListStore((state) => state.wishlistItems);

  return (
    <section className="mt-6 pb-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-heading-3 font-bold">Wishlist</h1>

        <p className="mt-2 text-secondary">
          Save your favorite items and come back to them later.
        </p>
      </div>

      {/* Empty */}
      {wishlistItems.length === 0 ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-border">
          <div className="max-w-md px-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface text-3xl">
              ♡
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-sm leading-6 text-secondary">
              You haven't added anything to your wishlist yet. Explore our
              collection and save the products you love.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-secondary"
            >
              Explore Products
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Wishlist Header */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-secondary">
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "item" : "items"}
            </p>

            <Link
              to="/products"
              className="text-sm font-medium underline underline-offset-4 transition-colors hover:text-secondary"
            >
              Continue shopping
            </Link>
          </div>

          {/* Items */}
          <div className="flex flex-col gap-4">
            {wishlistItems.map((item) => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
