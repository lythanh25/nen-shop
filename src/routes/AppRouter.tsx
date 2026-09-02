import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ProductPage from "../pages/Product/ProductPage";
import CategoriesPage from "../pages/Categories/CategoriesPage";
import CartPage from "../pages/Cart/CartPage";
import WishlistPage from "../pages/Wishlist/WishlistPage";
import ProductDetailPage from "../pages/Product/ProductDetailPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/carts" element={<CartPage />} />
      <Route path="/wishlists" element={<WishlistPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
