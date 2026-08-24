import { useSearchParams } from "react-router-dom";
import ProductGrid from "../../components/Product/ProductGrid";
import products from "../../data/products";

export default function ProductPage() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search?.toLowerCase() ?? ""),
  );

  return (
    <section>
      <div>
        <h1>Products</h1>
        <p>Explore our latest collection.</p>
      </div>

      <ProductGrid products={filteredProducts} />
    </section>
  );
}
