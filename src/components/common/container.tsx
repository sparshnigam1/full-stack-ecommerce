import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const Container = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "relative w-7xl max-w-[94%] md:max-w-[90%] mx-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
