import { BrowserRouter, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import AppRouter from "./routes/AppRouter.tsx";
import Container from "./components/Ui/Container.tsx";
import Header from "./components/layout/Header.tsx";
import Button from "./components/Ui/Button.tsx";
import Footer from "./components/layout/Footer.tsx";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  // Khi chuyển từ mobile -> desktop thì tự đóng menu
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

  return (
    <BrowserRouter basename="/nen-shop">
      <div className="min-h-screen  bg-background">
        <aside
          className={`fixed left-0 top-0 z-50 h-screen w-64 bg-background p-6 shadow-xl transition-transform duration-300 md:hidden ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-xl font-bold">Menu</h2>

            <button
              type="button"
              onClick={closeMenu}
              className="flex h-9 w-9 items-center justify-center text-2xl"
              aria-label="Close menu"
            >
              x
            </button>
          </div>

          <nav className="flex flex-col gap-6">
            <Link
              to="/"
              onClick={closeMenu}
              className="font-medium hover:opacity-60"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={closeMenu}
              className="font-medium hover:opacity-60"
            >
              Products
            </Link>

            <Link
              to="/categories"
              onClick={closeMenu}
              className="font-medium hover:opacity-60"
            >
              Categories
            </Link>

            <div className="my-2 border-t border-border" />

            <Button className="w-full">Login</Button>
          </nav>
        </aside>

        {isMenuOpen && (
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
          />
        )}

        <div
          className={`min-h-screen transition-transform duration-300 md:translate-x-0 ${
            isMenuOpen ? "translate-x-64" : "translate-x-0"
          }`}
        >
          <Header onMenuToggle={toggleMenu} />
          <Container>
            <AppRouter />
          </Container>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
