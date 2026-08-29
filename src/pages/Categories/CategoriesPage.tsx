import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../../components/Product/ProductGrid";
import products from "../../data/products";

export default function CategoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = [...new Set(products.map((product) => product.category))];

  const selectedCategory = searchParams.get("category") ?? "all";

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }

    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  function handleCategoryChange(category: string) {
    if (category === "all") {
      setSearchParams({});
      return;
    }

    setSearchParams({
      category,
    });
  }

  const categoryTitle =
    selectedCategory === "all" ? "All Products" : selectedCategory;

  return (
    <section className="mt-6 pb-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-heading-3 font-bold">Categories</h1>

        <p className="mt-2 text-secondary">
          Explore our collection by category.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="h-fit rounded-xl border border-border p-5">
          <div>
            <h2 className="mb-4 font-semibold">Categories</h2>

            <div className="flex flex-col gap-1">
              {/* All */}
              <button
                type="button"
                onClick={() => handleCategoryChange("all")}
                className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  selectedCategory === "all"
                    ? "bg-primary text-background"
                    : "hover:bg-surface"
                }`}
              >
                All Products
              </button>

              {/* Categories */}
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded-lg px-3 py-2 text-left text-sm capitalize transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-background"
                      : "hover:bg-surface"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products */}
        <div>
          {/* Category Header */}
          <div className="mb-6">
            <h2 className="text-heading-4 font-bold capitalize">
              {categoryTitle}
            </h2>

            <p className="mt-1 text-sm text-secondary">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="flex min-h-64 items-center justify-center rounded-xl border border-border">
              <div className="text-center">
                <h3 className="font-semibold">No products found</h3>

                <p className="mt-2 text-sm text-secondary">
                  There are no products in this category yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
