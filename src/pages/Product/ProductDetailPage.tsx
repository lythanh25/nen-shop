import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import products from "../../data/products";
import { useCartStore } from "../../store/cartStore";
import { useWishListStore } from "../../store/wishlistStore";
import { useToast } from "../../hooks/useToast";

import ProductGrid from "../../components/Product/ProductGrid";
import Button from "../../components/Ui/Button";

const sizes = ["S", "M", "L", "XL"];

export default function ProductDetailPage() {
  const { id } = useParams();

  const addToCart = useCartStore((state) => state.addToCart);

  const isInWishlist = useWishListStore((state) =>
    state.isInWishlist(Number(id)),
  );

  const toggleWishlist = useWishListStore((state) => state.toggleWishlist);

  const addToast = useToast((state) => state.addToast);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const foundProduct = products.find((item) => item.id === Number(id));

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
    setQuantity((current) => current + 1);
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

  return (
    <section className="pb-16 pt-4 md:pt-6">
      {/* Breadcrumb */}
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

      {/* Main product */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        {/* Product image */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="mx-auto max-w-[420px] overflow-hidden rounded-2xl bg-surface">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        {/* Product information */}
        <div className="max-w-xl">
          {/* Category */}
          <Link
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="text-sm font-medium uppercase tracking-wider text-secondary transition-colors hover:text-primary"
          >
            {product.category}
          </Link>

          {/* Name */}
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

          {/* Description */}
          <div className="mt-8 border-t border-border pt-6">
            <h2 className="font-semibold">Description</h2>

            <p className="mt-3 leading-7 text-secondary">
              A versatile piece designed for everyday wear. Clean details,
              comfortable fit, and an easy-to-style design make it a great
              addition to your wardrobe.
            </p>

            <p className="mt-3 leading-7 text-secondary">
              Designed with comfort and everyday versatility in mind, this piece
              can easily be styled with different outfits. Its minimal design
              makes it suitable for casual and everyday occasions.
            </p>
          </div>

          {/* Size */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Size</h2>

              <button
                type="button"
                className="text-sm text-secondary underline underline-offset-4 transition-colors hover:text-primary"
              >
                Size guide
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
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

          {/* Quantity */}
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

              <span className="flex h-11 w-14 items-center justify-center border-x border-border text-sm font-medium">
                {quantity}
              </span>

              <button
                type="button"
                onClick={handleIncreaseQuantity}
                className="flex h-11 w-11 items-center justify-center text-lg transition-colors hover:bg-surface"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
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
              aria-pressed={isInWishlist}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-5 py-3 font-medium transition-colors ${
                isInWishlist
                  ? "border-primary bg-surface"
                  : "border-border hover:bg-surface"
              }`}
            >
              <span className="text-xl">{isInWishlist ? "♥" : "♡"}</span>

              <span>
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </span>
            </button>
          </div>

          {/* Product information */}
          <div className="mt-8 border-t border-border">
            <div className="flex items-center justify-between border-b border-border py-4 text-sm">
              <span className="text-secondary">Category</span>

              <Link
                to={`/products?category=${encodeURIComponent(
                  product.category,
                )}`}
                className="font-medium capitalize transition-colors hover:text-secondary"
              >
                {product.category}
              </Link>
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

      {/* Product details */}
      <section className="mt-20 border-t border-border pt-12">
        <div className="max-w-3xl">
          <h2 className="text-heading-4 font-bold">Product Details</h2>

          <p className="mt-4 leading-7 text-secondary">
            This product is designed around a simple and timeless aesthetic. The
            clean silhouette makes it easy to pair with other pieces in your
            wardrobe while maintaining a comfortable everyday feel.
          </p>

          <p className="mt-4 leading-7 text-secondary">
            Whether you're creating a casual everyday outfit or adding a simple
            statement to your wardrobe, this piece offers an easy combination of
            style and comfort.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-surface p-5">
              <p className="text-sm text-secondary">Category</p>

              <p className="mt-1 font-medium capitalize">{product.category}</p>
            </div>

            <div className="rounded-xl bg-surface p-5">
              <p className="text-sm text-secondary">Available Sizes</p>

              <p className="mt-1 font-medium">S, M, L, XL</p>
            </div>

            <div className="rounded-xl bg-surface p-5">
              <p className="text-sm text-secondary">Availability</p>

              <p className="mt-1 font-medium text-success">In stock</p>
            </div>

            <div className="rounded-xl bg-surface p-5">
              <p className="text-sm text-secondary">Shipping</p>

              <p className="mt-1 font-medium">Free shipping</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-border pt-12">
          <div className="mb-7">
            <h2 className="text-heading-4 font-bold">You may also like</h2>

            <p className="mt-2 text-sm text-secondary">
              More products from the{" "}
              <span className="capitalize">{product.category}</span> collection.
            </p>
          </div>

          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </section>
  );
}
