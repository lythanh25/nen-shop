import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "../../hooks/useToast";
import { useCartStore } from "../../store/cartStore";
import Button from "../../components/Ui/Button";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),

  email: z.string().email("Please enter a valid email address"),

  phone: z
    .string()
    .min(9, "Phone number must be at least 9 digits")
    .max(15, "Phone number is too long")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),

  address: z.string().min(5, "Address must be at least 5 characters"),

  city: z.string().min(2, "Please enter your city"),

  paymentMethod: z.enum(["cod", "card"], {
    message: "Please select a payment method",
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const addToast = useToast((state) => state.addToast);

  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "cod",
    },
  });

  const shipping = 0;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const total = subtotal + shipping;

  function onSubmit(data: CheckoutFormData) {
    console.log("Checkout data:", data);

    clearCart();

    addToast("Your order has been placed successfully");

    navigate("/order-success");
  }

  if (cartItems.length === 0) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>

          <p className="mt-3 text-secondary">
            Add some products to your cart before proceeding to checkout.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 font-medium text-background transition-colors hover:bg-secondary"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-16 pt-6">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/carts"
            className="text-sm text-secondary transition-colors hover:text-primary"
          >
            ← Back to Cart
          </Link>

          <h1 className="mt-4 text-3xl font-bold">Checkout</h1>

          <p className="mt-2 text-secondary">
            Complete your information to place your order.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="rounded-xl border border-border p-5 sm:p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold">
                    Customer Information
                  </h2>

                  <p className="mt-1 text-sm text-secondary">
                    Enter your contact information.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-medium"
                    >
                      Full Name
                    </label>

                    <input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      {...register("fullName")}
                      className={`w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition-colors ${
                        errors.fullName
                          ? "border-error focus:ring-2 focus:ring-error/20"
                          : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                      }`}
                    />

                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      className={`w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition-colors ${
                        errors.email
                          ? "border-error focus:ring-2 focus:ring-error/20"
                          : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                      }`}
                    />

                    {errors.email && (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      {...register("phone")}
                      className={`w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition-colors ${
                        errors.phone
                          ? "border-error focus:ring-2 focus:ring-error/20"
                          : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                      }`}
                    />

                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="rounded-xl border border-border p-5 sm:p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold">Shipping Address</h2>

                  <p className="mt-1 text-sm text-secondary">
                    Where should we deliver your order?
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-medium"
                    >
                      Address
                    </label>

                    <input
                      id="address"
                      type="text"
                      placeholder="Street address, apartment, etc."
                      {...register("address")}
                      className={`w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition-colors ${
                        errors.address
                          ? "border-error focus:ring-2 focus:ring-error/20"
                          : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                      }`}
                    />

                    {errors.address && (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div className="grid grid-cols-1 gap-5 ">
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-2 block text-sm font-medium"
                      >
                        City
                      </label>

                      <input
                        id="city"
                        type="text"
                        placeholder="Enter your city"
                        {...register("city")}
                        className={`w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition-colors ${
                          errors.city
                            ? "border-error focus:ring-2 focus:ring-error/20"
                            : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                        }`}
                      />

                      {errors.city && (
                        <p className="mt-1.5 text-xs text-error">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-xl border border-border p-5 sm:p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold">Payment Method</h2>

                  <p className="mt-1 text-sm text-secondary">
                    Choose how you want to pay.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Cash on Delivery */}
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-surface">
                    <input
                      type="radio"
                      value="cod"
                      {...register("paymentMethod")}
                      className="mt-1 h-4 w-4 accent-primary"
                    />

                    <div>
                      <p className="text-sm font-medium">Cash on Delivery</p>

                      <p className="mt-1 text-xs text-secondary">
                        Pay when your order is delivered.
                      </p>
                    </div>
                  </label>

                  {/* Card / Online Payment */}
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-surface">
                    <input
                      type="radio"
                      value="card"
                      {...register("paymentMethod")}
                      className="mt-1 h-4 w-4 accent-primary"
                    />

                    <div>
                      <p className="text-sm font-medium">
                        Card / Online Payment
                      </p>

                      <p className="mt-1 text-xs text-secondary">
                        Online payment will be available soon.
                      </p>
                    </div>
                  </label>
                </div>

                {errors.paymentMethod && (
                  <p className="mt-2 text-xs text-error">
                    {errors.paymentMethod.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <aside className="h-fit rounded-xl border border-border p-5 lg:sticky lg:top-28">
              <h2 className="text-lg font-semibold">Order Summary</h2>

              {/* Products */}
              <div className="mt-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-surface">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-background">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-medium">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-secondary">
                        Size: {item.size}
                      </p>

                      <p className="mt-2 text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="mt-6 space-y-4 border-t border-border pt-5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Subtotal</span>

                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-secondary">Shipping</span>

                  <span className="font-medium text-success">Free</span>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>

                    <span className="text-xl font-bold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Place Order */}
              <Button
                type="submit"
                variant="primary"
                size="medium"
                disabled={isSubmitting}
                className="mt-6 w-full"
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </Button>

              <Link
                to="/carts"
                className="mt-3 flex w-full items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-surface"
              >
                Return to Cart
              </Link>

              <p className="mt-5 text-center text-xs leading-5 text-secondary">
                By placing your order, you agree to our terms and conditions.
              </p>
            </aside>
          </div>
        </form>
      </div>
    </section>
  );
}
