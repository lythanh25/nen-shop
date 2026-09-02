import { useSearchParams } from "react-router-dom";

import ProductGrid from "../../components/Product/ProductGrid";
import products from "../../data/products";

export default function CategoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  /*
   * Get all unique categories
   */
  const categories = [...new Set(products.map((product) => product.category))];

  /*
   * Current selected category
   *
   * /categories
   * /categories?category=shirts
   */
  const selectedCategory = searchParams.get("category") ?? "all";

  /*
   * Filter products
   */
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  /*
   * Change category
   */
  function handleCategoryChange(category: string) {
    if (category === "all") {
      setSearchParams({});
      return;
    }

    setSearchParams({
      category,
    });
  }

  /*
   * Format category name for UI
   *
   * Example:
   * "t-shirts" -> "T-Shirts"
   * "shoes"    -> "Shoes"
   */
  function formatCategoryName(category: string) {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  /*
   * Get number of products in each category
   */
  function getCategoryCount(category: string) {
    return products.filter((product) => product.category === category).length;
  }

  const categoryTitle =
    selectedCategory === "all"
      ? "All Products"
      : formatCategoryName(selectedCategory);

  return (
    <section className="mt-6 pb-12">
      {/* ========================================
          Page Header
      ======================================== */}
      <div className="mb-8">
        <h1 className="text-heading-3 font-bold">Categories</h1>

        <p className="mt-2 text-secondary">
          Explore our collection by category.
        </p>
      </div>

      {/* ========================================
          Content
      ======================================== */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        {/* ========================================
            Sidebar
        ======================================== */}
        <aside className="h-fit rounded-xl border border-border p-4 sm:p-5 lg:sticky lg:top-28">
          <h2 className="mb-4 font-semibold">Categories</h2>

          <div
            className="
              flex gap-2 overflow-x-auto pb-1
              lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0
            "
          >
            {/* ----------------------------------------
                All Products
            ---------------------------------------- */}
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              aria-pressed={selectedCategory === "all"}
              className={`
                flex shrink-0 items-center justify-between gap-4
                rounded-lg px-3 py-2.5 text-left text-sm
                transition-colors
                lg:w-full
                ${
                  selectedCategory === "all"
                    ? "bg-primary text-background"
                    : "hover:bg-surface"
                }
              `}
            >
              <span>All Products</span>

              <span
                className={`
                  text-xs
                  ${
                    selectedCategory === "all"
                      ? "text-background/70"
                      : "text-secondary"
                  }
                `}
              >
                {products.length}
              </span>
            </button>

            {/* ----------------------------------------
                Categories
            ---------------------------------------- */}
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              const count = getCategoryCount(category);

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  aria-pressed={isSelected}
                  className={`
                    flex shrink-0 items-center justify-between gap-4
                    rounded-lg px-3 py-2.5 text-left text-sm
                    transition-colors
                    lg:w-full
                    ${
                      isSelected
                        ? "bg-primary text-background"
                        : "hover:bg-surface"
                    }
                  `}
                >
                  <span>{formatCategoryName(category)}</span>

                  <span
                    className={`
                      text-xs
                      ${isSelected ? "text-background/70" : "text-secondary"}
                    `}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ========================================
            Products
        ======================================== */}
        <div>
          {/* Category Header */}
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-heading-4 font-bold">{categoryTitle}</h2>

              <p className="mt-1 text-sm text-secondary">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>
          </div>

          {/* ========================================
              Product Grid
          ======================================== */}
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="flex min-h-64 items-center justify-center rounded-xl border border-border px-6">
              <div className="max-w-md text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface">
                  <span className="text-xl text-secondary">?</span>
                </div>

                <h3 className="mt-4 font-semibold">No products found</h3>

                <p className="mt-2 text-sm leading-6 text-secondary">
                  There are no products in this category yet.
                </p>

                <button
                  type="button"
                  onClick={() => handleCategoryChange("all")}
                  className="mt-5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-secondary"
                >
                  View all products
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
