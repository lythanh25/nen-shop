import { Link, useNavigate } from "react-router-dom";
import Button from "../Ui/Button";
import { useState } from "react";

type HeaderProps = {
  onMenuToggle: () => void;
};

export default function Header({ onMenuToggle }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const keyword = searchTerm.trim();

    if (!keyword) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(keyword)}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 py-4 backdrop-blur-md md:py-5 px-3">
      {" "}
      <div className="flex items-center justify-between gap-3 ">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="flex h-9 w-9 items-center justify-center rounded md:hidden"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="h-5 w-5"
            >
              <path
                fill="currentColor"
                d="M0 96C0 78.3 14.3 64 32 64H416C433.7 64 448 78.3 448 96S433.7 128 416 128H32C14.3 128 0 113.7 0 96zM0 256C0 238.3 14.3 224 32 224H416C433.7 224 448 238.3 448 256S433.7 288 416 288H32C14.3 288 0 273.7 0 256zM0 416C0 398.3 14.3 384 32 384H416C433.7 384 448 398.3 448 416S433.7 448 416 448H32C14.3 448 0 433.7 0 416z"
              />
            </svg>
          </button>

          <Link to="/" className="shrink-0">
            <h1 className="text-2xl font-bold lg:text-heading-1">NenShop</h1>
          </Link>
        </div>

        <nav className="hidden items-center gap-4 font-medium md:flex lg:gap-6 xl:gap-8 lg:text-heading-4">
          <Link to="/" className="hover:opacity-60">
            Home
          </Link>

          <Link to="/products" className="hover:opacity-60">
            Products
          </Link>

          <Link to="/categories" className="hover:opacity-60">
            Categories
          </Link>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
              type="search"
              className="w-40 rounded border border-border px-3 py-2 pr-10 outline-none focus:border-primary lg:w-52"
              value={searchTerm}
              placeholder="Search..."
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <button
              type="submit"
              className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-4 w-4"
              >
                <path
                  fill="currentColor"
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 0 0 0 288z"
                />
              </svg>
            </button>
          </form>

          <Link
            to="/wishlists"
            className="flex h-9 w-9 shrink-0 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-5 w-5"
            >
              <path
                fill="currentColor"
                d="M378.9 80c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9s-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2s10.8-1.8 14-4.2c34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1z"
              />
            </svg>
          </Link>

          <Link
            to="/carts"
            className="flex h-9 w-9 shrink-0 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              className="h-5 w-5"
            >
              <path
                fill="currentColor"
                d="M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16z"
              />
            </svg>
          </Link>

          <Button className="hidden md:inline-flex">Login</Button>
        </div>
      </div>
      <form onSubmit={handleSearch} className="relative mt-4 md:hidden">
        <input
          type="search"
          className="w-full rounded border border-border px-3 py-2 pr-10 outline-none focus:border-primary"
          value={searchTerm}
          placeholder="Search..."
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <button
          type="submit"
          className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 w-4"
          >
            <path
              fill="currentColor"
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 0 0 0 288z"
            />
          </svg>
        </button>
      </form>
    </header>
  );
}
