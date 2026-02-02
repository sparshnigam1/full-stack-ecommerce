"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";
import { LuLoaderCircle } from "react-icons/lu";

const buttonVariants = cva(
  "flex items-center justify-center gap-2 whitespace-nowrap shrink-0 [&_svg]:shrink-0 [&_svg]:rotate-0 outline-none focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer transition-all [&_svg]:transition-all duration-300 ease-in-out hover:[&_svg]:rotate-45 min-w-[5.625rem] font-open-sans disabled:cursor-not-allowed disabled:[&_svg]:rotate-0 aria-disabled:[&_svg]:rotate-0 aria-disabled:cursor-not-allowed disabled:ring-0 aria-disabled:ring-0",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-primary hover:bg-primary-white hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus:shadow-shadow active:bg-primary-lightest active:shadow-elevation-3 disabled:text-dark-grey disabled:[&_svg]:rotate-0 disabled:shadow-none disabled:bg-transparent aria-disabled:text-dark-grey aria-disabled:shadow-none aria-disabled:bg-transparent border-0!",
        primary:
          "bg-primary border-2 border-primary text-white hover:bg-primary-dark hover:text-white hover:border-primary-dark hover:shadow-elevation-2 focus-visible:ring-3 focus-visible:ring-ring focus-visible:bg-primary focus-visible:text-white focus-visible:[&_svg]:rotate-0 active:bg-primary-darker active:text-white active:border-primary-darker active:[&_svg]:rotate-45 active:shadow-elevation-3 disabled:bg-light-grey disabled:text-dark-grey disabled:[&_svg]:rotate-0 disabled:shadow-none aria-disabled:bg-light-grey aria-disabled:text-dark-grey aria-disabled:[&_svg]:rotate-0 aria-disabled:shadow-none",
        outline:
          "bg-white border-2 border-primary text-primary hover:bg-primary-white hover:shadow-elevation-2 focus-visible:border-2 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:bg-transparent active:bg-primary-lightest active:text-primary active:[&_svg]:rotate-45 active:shadow-elevation-3 disabled:bg-transparent disabled:border-light-grey disabled:text-dark-grey disabled:[&_svg]:rotate-0 disabled:shadow-none aria-disabled:bg-transparent aria-disabled:border-light-grey aria-disabled:text-dark-grey aria-disabled:[&_svg]:rotate-0 aria-disabled:shadow-none",
      },
      size: {
        default:
          "text-sm font-semibold px-7 py-3.5 rounded-lg [&_svg:not([class*='size-'])]:size-4",
        "extra-small":
          "border-1 md:border-2 text-sm font-semibold px-4 py-2 rounded-std [&_svg:not([class*='size-'])]:size-3.5",
        small:
          "border-1 md:border-2 text-sm font-semibold px-6 py-2.5 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        medium:
          "border-1 md:border-2 text-sm font-semibold px-7 py-3.5 rounded-lg [&_svg:not([class*='size-'])]:size-4",
        large:
          "text-base font-semibold rounded-lg px-7 py-4 [&_svg:not([class*='size-'])]:size-5",
        giant:
          "text-base font-semibold rounded-xl px-9 py-5 [&_svg:not([class*='size-'])]:size-5",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  disabled,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const isDisabled = Boolean(isLoading || disabled);
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : props.onClick}
      aria-disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <LuLoaderCircle className="animate-spin size-6 text-current" />
      ) : (
        children
      )}
    </Comp>
  );
}

export function AnchorButton({
  className,
  variant,
  size,
  isLoading = false,
  children,
  href,
  onClick,
  isDisabled,
  ...props
}: React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
  }) {
  const mergedClassName = cn(buttonVariants({ variant, size, className }));

  return (
    <Link
      data-slot="button"
      className={mergedClassName}
      href={!isDisabled && href ? href : ("" as any)}
      aria-disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      {...props}
    >
      {isLoading ? (
        <LuLoaderCircle className="animate-spin size-6 text-current" />
      ) : (
        children
      )}
    </Link>
  );
}

export { Button, buttonVariants };
