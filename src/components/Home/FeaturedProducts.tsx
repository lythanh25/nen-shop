import ProductGrid from "../Product/ProductGrid";
import products from "../../data/products";

export default function FeaturedProducts() {
  return (
    <section className="mt-16 md:mt-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-secondary">
            Our collection
          </p>

          <h2 className="text-2xl font-bold md:text-3xl">Featured Products</h2>

          <p className="mt-2 text-secondary">Discover our latest collection.</p>
        </div>

        <a
          href="/products"
          className="hidden text-sm font-medium underline underline-offset-4 sm:block"
        >
          View all
        </a>
      </div>

      <ProductGrid products={products.slice(0, 4)} />
    </section>
  );
}
