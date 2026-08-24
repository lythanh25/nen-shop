import type React from "react";

type Inputs = React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
  helperText?: string;
};

export default function Input({ label, error, helperText, ...props }: Inputs) {
  return (
    <div>
    {label && <label>{label}</label>}

    <input {...props} />

    {error && <p>{error}</p>}

    {helperText && <p>{helperText}</p>}
  </div>
  );
}
