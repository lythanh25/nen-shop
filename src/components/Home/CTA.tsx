const benefits = [
  {
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    title: "Quality Guarantee",
    description: "Premium products",
  },
  {
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    title: "Easy Returns",
    description: "30-day return policy",
  },
];

export default function CTA() {
  return (
    <section className="mt-12 border-y py-8 md:mt-16">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="text-center">
            <h3 className="font-semibold">{benefit.title}</h3>

            <p className="mt-1 text-sm text-secondary">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
