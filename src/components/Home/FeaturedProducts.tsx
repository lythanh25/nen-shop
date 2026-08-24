import ProductGrid from "../Product/ProductGrid";
import products from "../../data/products";
export default function FeaturedProducts() {
  return (
    <section className="mt-2">
      <div className="text-center">
        <h2 className="font-bold">Featured Products</h2>
        <p>Discover our latest collection.</p>
      </div>
      <ProductGrid products={products.slice(0, 3)} />
    </section>
  );
}
