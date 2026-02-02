"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {
  isLoading?: boolean;
}

const IconButton = ({ className, children, ...props }: Props) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center h-9.5 w-9.5 border border-border-grey rounded-md outline-none p-2.5 bg-white text-black cursor-pointer transition-all duration-300",
        "hover:bg-body-background hover:shadow-light",
        "active:bg-body-background active:shadow-elevation-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
