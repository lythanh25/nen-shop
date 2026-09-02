import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="text-center">
        <p className="text-6xl font-bold" aria-hidden="true">
          404
        </p>

        <h1 className="mt-4 text-heading-3 font-bold">Page not found</h1>

        <p className="mt-2 text-secondary">
          Sorry, the page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-secondary"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
