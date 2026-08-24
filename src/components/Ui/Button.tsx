import type React from "react";

type ButtonProps = React.ComponentProps<"button"> & {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

const variants = {
  primary:
    "bg-primary text-background hover:bg-secondary focus:ring-2 focus:ring-secondary",
  secondary:
    "bg-secondary text-surface hover:bg-muted focus:ring-2 focus:ring-secondary",
  ghost:
    "bg-transparent text-secondary hover:bg-muted focus:ring-2 focus:ring-secondary",
};

const sizes = {
  small: "px-3 py-2 text-sm",
  medium: "px-4 py-2.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        rounded-lg
        font-medium
        transition-colors
        duration-200
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
