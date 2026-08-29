import { Link } from "react-router-dom";
import Button from "../Ui/Button";

export default function CTAFooter() {
  return (
    <section className="mt-16 overflow-hidden rounded-2xl bg-surface px-6 py-12 text-center md:px-12 md:py-16">
      <p className="text-sm font-medium uppercase tracking-wider text-secondary">
        Find your style
      </p>

      <h2 className="mt-3 text-3xl font-bold md:text-4xl">
        Upgrade Your Everyday Style
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-secondary">
        Discover premium fashion and accessories designed for your everyday
        lifestyle.
      </p>

      <Link to="/products" className="mt-6 inline-block">
        <Button>Explore Collection</Button>
      </Link>
    </section>
  );
}
