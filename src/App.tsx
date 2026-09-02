import { BrowserRouter, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import AppRouter from "./routes/AppRouter.tsx";
import Container from "./components/Ui/Container.tsx";
import Header from "./components/layout/Header.tsx";
import Button from "./components/Ui/Button.tsx";
import Footer from "./components/layout/Footer.tsx";
import ToastContainer from "./components/Toast/ToastContainer";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  // Đóng mobile menu khi chuyển sang desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Khóa scroll của body khi mobile menu đang mở
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <BrowserRouter basename="/nen-shop">
      <ToastContainer />

      <div className="min-h-screen bg-background">
        {/* Mobile Menu */}
        <aside
          aria-label="Mobile navigation"
          className={`fixed left-0 top-0 z-50 h-screen w-64 bg-background p-6 shadow-xl transition-transform duration-300 md:hidden ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-xl font-bold">Menu</h2>

            <button
              type="button"
              onClick={closeMenu}
              className="flex h-9 w-9 items-center justify-center rounded text-2xl transition-colors hover:bg-surface"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-6">
            <Link
              to="/"
              onClick={closeMenu}
              className="font-medium transition-opacity hover:opacity-60"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={closeMenu}
              className="font-medium transition-opacity hover:opacity-60"
            >
              Products
            </Link>

            <Link
              to="/categories"
              onClick={closeMenu}
              className="font-medium transition-opacity hover:opacity-60"
            >
              Categories
            </Link>

            <div className="my-2 border-t border-border" />

            <Button className="w-full">Login</Button>
          </nav>
        </aside>

        {/* Overlay */}
        {isMenuOpen && (
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
          />
        )}

        {/* Main Content */}
        <div
          className={`min-h-screen transition-transform duration-300 md:translate-x-0 ${
            isMenuOpen ? "translate-x-64" : "translate-x-0"
          }`}
        >
          <Header onMenuToggle={toggleMenu} />

          <main>
            <Container>
              <AppRouter />
            </Container>
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
