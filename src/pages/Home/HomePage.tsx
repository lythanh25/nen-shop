import CTA from "../../components/Home/CTA";
import CTAFooter from "../../components/Home/CTAFooter";
import FeaturedProducts from "../../components/Home/FeaturedProducts";
import Hero from "../../components/Home/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CTA />
      <FeaturedProducts />
      <CTAFooter />
    </>
  );
}
