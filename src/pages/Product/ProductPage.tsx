import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../../components/Product/ProductGrid";
import products from "../../data/products";

type SortOption = "featured" | "price-low" | "price-high" | "name";

type PriceRange = "all" | "under-50" | "50-100" | "100-200" | "over-200";

const priceOptions: {
  value: PriceRange;
  label: string;
}[] = [
  {
    value: "all",
    label: "All prices",
  },
  {
    value: "under-50",
    label: "Under $50",
  },
  {
    value: "50-100",
    label: "$50 - $100",
  },
  {
    value: "100-200",
    label: "$100 - $200",
  },
  {
    value: "over-200",
    label: "Over $200",
  },
];

export default function ProductPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";

  const category = searchParams.get("category") ?? "all";

  const priceRange = (searchParams.get("price") as PriceRange) ?? "all";

  const sortBy = (searchParams.get("sort") as SortOption) ?? "featured";

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    // Price
    if (priceRange === "under-50") {
      result = result.filter((product) => product.price < 50);
    }

    if (priceRange === "50-100") {
      result = result.filter(
        (product) => product.price >= 50 && product.price <= 100,
      );
    }

    if (priceRange === "100-200") {
      result = result.filter(
        (product) => product.price > 100 && product.price <= 200,
      );
    }

    if (priceRange === "over-200") {
      result = result.filter((product) => product.price > 200);
    }

    // Sort
    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, category, priceRange, sortBy]);

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams);

    if (!value || value === "all" || value === "featured") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  }

  function handleCategoryChange(value: string) {
    updateParams("category", value);
  }

  function handlePriceChange(value: PriceRange) {
    updateParams("price", value);
  }

  function handleSortChange(value: SortOption) {
    updateParams("sort", value);
  }

  function handleClearFilters() {
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }

    setSearchParams(params);
  }

  const hasFilters =
    category !== "all" || priceRange !== "all" || sortBy !== "featured";

  const resultTitle = search
    ? `Search results`
    : category === "all"
      ? "All Products"
      : category;

  return (
    <section className="mt-6 pb-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-heading-3 font-bold">Products</h1>

        <p className="mt-2 text-secondary">Explore our latest collection.</p>

        {search && (
          <p className="mt-3 text-sm text-secondary">
            Search results for{" "}
            <span className="font-medium text-primary">"{search}"</span>
          </p>
        )}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="h-fit rounded-xl border border-border p-5">
          {/* Categories */}
          <div>
            <h2 className="mb-4 font-semibold">Categories</h2>

            <div className="flex flex-col gap-1">
              {/* All */}
              <button
                type="button"
                onClick={() => handleCategoryChange("all")}
                className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  category === "all"
                    ? "bg-primary text-background"
                    : "hover:bg-surface"
                }`}
              >
                All Products
              </button>

              {/* Categories */}
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleCategoryChange(item)}
                  className={`rounded-lg px-3 py-2 text-left text-sm capitalize transition-colors ${
                    category === item
                      ? "bg-primary text-background"
                      : "hover:bg-surface"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="my-6 border-t border-border" />

          {/* Price */}
          <div>
            <h2 className="mb-4 font-semibold">Price</h2>

            <div className="flex flex-col gap-3 text-sm">
              {priceOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="price"
                    value={option.value}
                    checked={priceRange === option.value}
                    onChange={() => handlePriceChange(option.value)}
                    className="accent-primary"
                  />

                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasFilters && (
            <>
              <div className="my-6 border-t border-border" />

              <button
                type="button"
                onClick={handleClearFilters}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-surface"
              >
                Clear filters
              </button>
            </>
          )}
        </aside>

        {/* Products */}
        <div>
          {/* Toolbar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold capitalize">{resultTitle}</h2>

              <p className="mt-1 text-sm text-secondary">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            <select
              value={sortBy}
              onChange={(event) =>
                handleSortChange(event.target.value as SortOption)
              }
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
            >
              <option value="featured">Featured</option>

              <option value="price-low">Price: Low to High</option>

              <option value="price-high">Price: High to Low</option>

              <option value="name">Name</option>
            </select>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="flex min-h-64 items-center justify-center rounded-xl border border-border">
              <div className="px-6 text-center">
                <h3 className="font-semibold">No products found</h3>

                <p className="mt-2 text-sm text-secondary">
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-secondary"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
