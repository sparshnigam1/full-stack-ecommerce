import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "file:text-black placeholder:text-icon-grey selection:bg-white selection:text-black border-border-grey flex w-full min-w-0 rounded-md border bg-white px-3.5 py-2.5 shadow-light transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-white file:font-medium disabled:cursor-not-allowed disabled:bg-body-background disabled:text-icon-grey focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-red/20 aria-invalid:border-primary-lightest",
  {
    variants: {
      size: {
        sm: "h-9 text-sm file:h-7 file:text-sm",
        md: "h-12 text-base file:h-10 file:text-base",
        lg: "h-14 text-lg file:h-12 file:text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  size?: "sm" | "md" | "lg" | null | undefined;
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, isError, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({ size }),
          isError && "border-primary-lightest",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
