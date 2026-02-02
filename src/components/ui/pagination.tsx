import * as React from "react";

import { buttonVariants, type Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LuChevronFirst,
  LuChevronLast,
  LuChevronLeft,
  LuChevronRight,
  LuEllipsis,
} from "react-icons/lu";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : null,
          size,
        }),
        "min-w-none hover:[&_svg]:rotate-0 active:[&_svg]:rotate-0",
        className
      )}
      {...props}
    />
  );
}

type PaginationItemBtnProps = {
  isActive?: boolean;
} & React.ComponentProps<typeof Button>;

function PaginationItemBtn({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationItemBtnProps) {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-item-btn"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : null,
          size,
        }),
        "min-w-none hover:[&_svg]:rotate-0 active:[&_svg]:rotate-0",
        isActive && "border",
        className
      )}
      {...props}
    >
      {props.children}
    </button>
  );
}

function PaginationFirst({
  className,
  ...props
}: React.ComponentProps<typeof PaginationItemBtn>) {
  return (
    <PaginationItemBtn
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <LuChevronFirst />
    </PaginationItemBtn>
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationItemBtn>) {
  return (
    <PaginationItemBtn
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <LuChevronLeft />
    </PaginationItemBtn>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationItemBtn>) {
  return (
    <PaginationItemBtn
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <LuChevronRight />
    </PaginationItemBtn>
  );
}

function PaginationLast({
  className,
  ...props
}: React.ComponentProps<typeof PaginationItemBtn>) {
  return (
    <PaginationItemBtn
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <LuChevronLast />
    </PaginationItemBtn>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <LuEllipsis className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationItemBtn,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
