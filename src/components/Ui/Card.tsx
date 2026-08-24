import type React from "react";

type CardProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
};

export default function Card({ children, ...props }: CardProps) {
  return <div {...props}>{children}</div>;
}
