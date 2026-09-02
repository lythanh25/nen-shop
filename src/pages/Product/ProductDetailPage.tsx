import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import products from "../../data/products";
import { useWishListStore } from "../../store/wishlistStore";
import { useCartStore } from "../../store/cartStore";
import { useToast } from "../../hooks/useToast";

import ProductGrid from "../../components/Product/ProductGrid";
import Button from "../../components/Ui/Button";

const sizes = ["S", "M", "L", "XL"];
const MAX_QUANTITY = 99;

export default function ProductDetailPage() {
  const { id } = useParams();

  const productId = Number(id);

  const addToCart = useCartStore((state) => state.addToCart);

  const isInWishlist = useWishListStore((state) =>
    state.isInWishlist(productId),
  );

  const toggleWishlist = useWishListStore((state) => state.toggleWishlist);

  const addToast = useToast((state) => state.addToast);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  /*
   * Find product
   */
  const foundProduct = products.find((item) => item.id === productId);

  /*
   * Close size guide with Escape
   */
  useEffect(() => {
    if (!isSizeGuideOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSizeGuideOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSizeGuideOpen]);

  /*
   * Lock body scroll while size guide is open
   */
  useEffect(() => {
    if (!isSizeGuideOpen) {
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSizeGuideOpen]);

  /*
   * Product not found
   */
  if (!foundProduct) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface">
            <span className="text-2xl">?</span>
          </div>

          <h1 className="mt-5 text-heading-3 font-bold">Product not found</h1>

          <p className="mt-3 leading-6 text-secondary">
            The product you're looking for doesn't exist or may have been
            removed.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-secondary"
          >
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  /*
   * Related products
   *
   * Priority:
   * 1. Same category
   * 2. Exclude current product
   * 3. Show maximum 4 products
   */

  const product = foundProduct;

  const relatedProducts = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4);

  function handleDecreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function handleIncreaseQuantity() {
    setQuantity((current) => Math.min(MAX_QUANTITY, current + 1));
  }

  function handleAddToCart() {
    addToCart(product, quantity, selectedSize);

    addToast(
      quantity > 1 ? `${quantity} items added to cart` : "Added to cart",
    );
  }

  function handleToggleWishlist() {
    toggleWishlist(product);

    if (isInWishlist) {
      addToast("Removed from wishlist");
    } else {
      addToast("Added to wishlist");
    }
  }

  function handleOpenSizeGuide() {
    setIsSizeGuideOpen(true);
  }

  function handleCloseSizeGuide() {
    setIsSizeGuideOpen(false);
  }

  return (
    <>
      <section className="pb-16 pt-4 md:pt-6">
        {/* ========================================
            Breadcrumb
        ======================================== */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 overflow-hidden text-sm"
        >
          <Link
            to="/"
            className="shrink-0 text-secondary transition-colors hover:text-primary"
          >
            Home
          </Link>

          <span className="text-muted">/</span>

          <Link
            to="/products"
            className="shrink-0 text-secondary transition-colors hover:text-primary"
          >
            Products
          </Link>

          <span className="text-muted">/</span>

          <span className="truncate text-primary">{product.name}</span>
        </nav>

        {/* ========================================
            Main Product
        ======================================== */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Product Image */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="mx-auto max-w-[460px] overflow-hidden rounded-2xl bg-surface">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="lg:pt-2">
            {/* Category */}
            <Link
              to={`/products?category=${encodeURIComponent(product.category)}`}
              className="text-sm font-medium uppercase tracking-wider text-secondary transition-colors hover:text-primary"
            >
              {product.category}
            </Link>

            {/* Product Name */}
            <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <div
                className="flex items-center gap-0.5 text-sm"
                aria-label="4 out of 5 stars"
              >
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span className="text-muted">★</span>
              </div>

              <span className="text-sm text-secondary">4.0 · 24 reviews</span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="text-2xl font-semibold">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* ========================================
                Description
            ======================================== */}
            <div className="mt-8 border-t border-border pt-6">
              <h2 className="font-semibold">Description</h2>

              <p className="mt-3 leading-7 text-secondary">
                A versatile piece designed for everyday wear. Clean details,
                comfortable fit, and an easy-to-style design make it a great
                addition to your wardrobe.
              </p>

              <p className="mt-3 leading-7 text-secondary">
                Designed with comfort and everyday versatility in mind, this
                piece can easily be styled with different outfits. Its minimal
                design makes it suitable for both casual and everyday occasions.
              </p>
            </div>

            {/* ========================================
                Size
            ======================================== */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Size</h2>

                <button
                  type="button"
                  onClick={handleOpenSizeGuide}
                  className="text-sm text-secondary underline underline-offset-4 transition-colors hover:text-primary"
                >
                  Size guide
                </button>
              </div>

              <div className="mt-3 flex gap-2">
                {sizes.map((size) => {
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={isSelected}
                      className={`flex h-11 w-14 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                        isSelected
                          ? "border-primary bg-primary text-background"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================
                Quantity
            ======================================== */}
            <div className="mt-8">
              <h2 className="font-semibold">Quantity</h2>

              <div className="mt-3 flex w-fit overflow-hidden rounded-lg border border-border">
                <button
                  type="button"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity === 1}
                  className="flex h-11 w-11 items-center justify-center text-lg transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span
                  className="flex h-11 w-14 items-center justify-center border-x border-border text-sm font-medium"
                  aria-live="polite"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={handleIncreaseQuantity}
                  disabled={quantity === MAX_QUANTITY}
                  className="flex h-11 w-11 items-center justify-center text-lg transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* ========================================
                Actions
            ======================================== */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3"
              >
                Add to Cart
              </Button>

              <button
                type="button"
                onClick={handleToggleWishlist}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-5 py-3 font-medium transition-colors ${
                  isInWishlist
                    ? "border-primary bg-surface"
                    : "border-border hover:bg-surface"
                }`}
                aria-pressed={isInWishlist}
              >
                <span className="text-xl">{isInWishlist ? "♥" : "♡"}</span>

                <span>
                  {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </span>
              </button>
            </div>

            {/* ========================================
                Product Information
            ======================================== */}
            <div className="mt-8 border-t border-border">
              <div className="flex items-center justify-between border-b border-border py-4 text-sm">
                <span className="text-secondary">Category</span>

                <span className="font-medium capitalize">
                  {product.category}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-border py-4 text-sm">
                <span className="text-secondary">Availability</span>

                <span className="font-medium text-success">In stock</span>
              </div>

              <div className="flex items-center justify-between py-4 text-sm">
                <span className="text-secondary">Shipping</span>

                <span className="font-medium">Free shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================
            You May Also Like
        ======================================== */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-border pt-12">
            <div className="mb-7">
              <h2 className="text-heading-4 font-bold">You may also like</h2>

              <p className="mt-2 text-sm text-secondary">
                More products from the{" "}
                <span className="capitalize">{product.category}</span>{" "}
                collection.
              </p>
            </div>

            <ProductGrid products={relatedProducts} />
          </section>
        )}

        {relatedProducts.length === 0 && (
          <section className="mt-20 border-t border-border pt-12">
            <div className="mb-7">
              <h2 className="text-heading-4 font-bold">You may also like</h2>

              <p className="mt-2 text-sm text-secondary">
                There are no more products from this{" "}
                <span className="capitalize">{product.category}</span>{" "}
                collection.
              </p>
            </div>
          </section>
        )}
      </section>

      {/* ========================================
          Size Guide Modal
      ======================================== */}
      {isSizeGuideOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseSizeGuide();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-guide-title"
            className="relative w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl sm:p-8"
          >
            {/* Close */}
            <button
              type="button"
              onClick={handleCloseSizeGuide}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl text-secondary transition-colors hover:bg-surface hover:text-primary"
              aria-label="Close size guide"
            >
              ×
            </button>

            {/* Header */}
            <div className="pr-10">
              <h2 id="size-guide-title" className="text-xl font-bold">
                Size Guide
              </h2>

              <p className="mt-2 text-sm leading-6 text-secondary">
                Use the measurements below to find the best fit for you.
              </p>
            </div>

            {/* Table */}
            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-surface">
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold">Size</th>

                    <th className="px-4 py-3 text-left font-semibold">Chest</th>

                    <th className="px-4 py-3 text-left font-semibold">
                      Length
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium">S</td>
                    <td className="px-4 py-3 text-secondary">52 cm</td>
                    <td className="px-4 py-3 text-secondary">68 cm</td>
                  </tr>

                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium">M</td>
                    <td className="px-4 py-3 text-secondary">54 cm</td>
                    <td className="px-4 py-3 text-secondary">70 cm</td>
                  </tr>

                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium">L</td>
                    <td className="px-4 py-3 text-secondary">56 cm</td>
                    <td className="px-4 py-3 text-secondary">72 cm</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3 font-medium">XL</td>
                    <td className="px-4 py-3 text-secondary">58 cm</td>
                    <td className="px-4 py-3 text-secondary">74 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note */}
            <p className="mt-4 text-xs leading-5 text-secondary">
              Measurements are approximate and may vary slightly depending on
              the product.
            </p>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleCloseSizeGuide}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
