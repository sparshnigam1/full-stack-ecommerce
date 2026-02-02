import * as React from "react";

import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { MdOutlineLockOpen } from "react-icons/md";
import { inputVariants } from "./input";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  size?: "sm" | "md" | "lg" | null | undefined;
  isError?: boolean;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, isError, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const currentType = showPassword ? "text" : "password";

    return (
      <div className="relative">
        <MdOutlineLockOpen className="inline-block absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-xl text-icon-grey" />
        <input
          type={currentType}
          className={cn(
            inputVariants({ size }),
            "px-10",
            isError && "border-primary-lightest",
            className
          )}
          ref={ref}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={!!props.disabled}
          className={cn(
            "cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-icon-grey focus:outline-none disabled:cursor-not-allowed"
          )}
          tabIndex={-1}
        >
          {showPassword ? (
            <LuEyeOff className="h-4.5 w-4.5" />
          ) : (
            <LuEye className="h-4.5 w-4.5" />
          )}
        </button>
      </div>
    );
  }
);
InputPassword.displayName = "InputPassword";

export { InputPassword };
