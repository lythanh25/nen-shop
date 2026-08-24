import CategoryCard from "../../components/Category/CategoryCard";
import ProductGrid from "../../components/Product/ProductGrid";
import products from "../../data/products";
import { useState } from "react";

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory,
  );

  const categories = [...new Set(products.map((product) => product.category))];
  return (
    <div>
      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <CategoryCard
            key={category}
            category={category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>
      {selectedCategory && <ProductGrid products={filteredProducts} />}
    </div>
  );
}
