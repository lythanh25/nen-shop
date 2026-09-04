import { Link } from "react-router-dom";

export default function OrderSuccessPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl text-center">
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-success"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
          Order Placed Successfully
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-secondary sm:text-base">
          Thank you for your purchase! Your order has been successfully placed.
          We&apos;ll process it and get it ready for delivery.
        </p>

        {/* Confirmation Card */}
        <div className="mx-auto mt-8 max-w-md rounded-xl border border-border bg-surface p-5 text-left sm:p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-success"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-sm font-semibold">What happens next?</h2>

              <p className="mt-2 text-sm leading-6 text-secondary">
                Your order is now being processed. You&apos;ll receive updates
                about your order once order tracking is available.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/products"
            className="flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-secondary"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-surface"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
