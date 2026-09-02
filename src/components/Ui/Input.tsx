import type React from "react";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
  helperText?: string;
};

export default function Input({
  id,
  label,
  error,
  helperText,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}

      <input
        id={id}
        className={`
          w-full
          rounded-lg
          border
          bg-background
          px-3
          py-2.5
          text-sm
          outline-none
          transition-colors
          placeholder:text-muted
          ${
            error
              ? "border-error focus:border-error focus:ring-2 focus:ring-error/20"
              : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
          }
          disabled:cursor-not-allowed
          disabled:opacity-50
          ${className}
        `}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={
          error ? `${id}-error` : helperText ? `${id}-helper` : undefined
        }
        {...props}
      />

      {error && (
        <p id={`${id}-error`} className="text-sm text-error">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={`${id}-helper`} className="text-sm text-secondary">
          {helperText}
        </p>
      )}
    </div>
  );
}
