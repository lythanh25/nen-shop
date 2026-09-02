import { Link } from "react-router-dom";
import Button from "../Ui/Button";
import heroImage from "../../assets/images/hero-fashion.jpg";

export default function Hero() {
  return (
    <section className="relative mt-2 min-h-[500px] overflow-hidden rounded-xl">
      <img
        src={heroImage}
        alt="Modern fashion"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex min-h-[500px] items-center px-6 py-12 md:px-12 lg:px-16">
        <div className="flex max-w-lg flex-col gap-3 text-white">
          <p className="text-sm font-medium tracking-widest">NEW COLLECTION</p>

          <h1 className="text-heading-2 font-bold">MODERN FASHION</h1>

          <p className="max-w-md">
            Discover premium fashion and accessories that complement your
            lifestyle.
          </p>

          <Link to="/products">
            <Button className="mt-2 gap-3">
              Shop Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-3 w-3"
              >
                <path
                  fill="currentColor"
                  d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
