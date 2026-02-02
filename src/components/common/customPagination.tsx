import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationItemBtn,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useCustomUrlParams from "@/hooks/useCustomUrlParams";
import { cn } from "@/lib/utils";
import { ComponentProps, useEffect, useId } from "react";
import { LuEllipsis } from "react-icons/lu";
import CustomDropdown from "./customDropdown";

interface Props extends ComponentProps<"nav"> {
  total: number;
  hideLimit?: boolean;
}

const TablePaginationDemo = ({ total, hideLimit }: Props) => {
  const labelId = useId();
  const { getUrlParam, setUrlParams } = useCustomUrlParams();

  const limitOptions = [
    { label: "10", value: "10" },
    { label: "25", value: "25" },
    { label: "50", value: "50" },
    { label: "100", value: "100" },
  ];

  const limitValue = (getUrlParam({ key: "limit" }) as string) || "10";
  const setLimitValue = (val: string) => {
    setUrlParams({ key: "limit", val });
  };

  const rawPage = Number(getUrlParam({ key: "page" })) ?? 0;
  const currentPage = Math.max(1, rawPage + 1);
  const limit = Number(limitValue) || 10;

  const totalPages = Math.ceil(total / limit);
  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  const siblingCount = 1;
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);
  const getPaginationRange = () => {
    if (totalPages <= 4) {
      return range(1, totalPages);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 2);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < totalPages - 1;

    const pages: (number | "ellipsis")[] = [1];

    if (showLeftEllipsis) pages.push("ellipsis");

    pages.push(...range(leftSibling, rightSibling));

    if (showRightEllipsis) pages.push("ellipsis");

    pages.push(totalPages);

    return pages;
  };

  const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  const handleFirstBtnClick = () => {
    if (isPreviousDisabled) return;
    setUrlParams({ key: "page", val: "0" });
  };
  const handlePrevBtnClick = () => {
    if (isPreviousDisabled) return;

    setUrlParams({
      key: "page",
      val: String(currentPage - 2), // (ui - 1) - 1
    });
  };
  const handleNextBtnClick = () => {
    if (isNextDisabled) return;

    setUrlParams({
      key: "page",
      val: String(currentPage), // (ui + 1) - 1
    });
  };
  const handleLastBtnClick = () => {
    setUrlParams({
      key: "page",
      val: String(totalPages - 1),
    });
  };
  const handlePageBtnClick = (uiPage: number) => {
    setUrlParams({
      key: "page",
      val: String(uiPage - 1),
    });
  };

  useEffect(() => {
    if (rawPage < 0) {
      setUrlParams({ key: "page", val: "0" });
    }
    if (rawPage > totalPages - 1) {
      setUrlParams({
        key: "page",
        val: String(Math.max(totalPages - 1, 0)),
      });
    }
  }, [rawPage, totalPages]);

  const disabledBtnStyling =
    "cursor-not-allowed hover:bg-transparent text-muted-black hover:text-muted-black";

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-6 max-sm:justify-center">
      {!hideLimit && (
        <div className="flex shrink-0 items-center gap-3">
          <Label htmlFor={labelId} className="font-normal">
            Rows per page
          </Label>
          <CustomDropdown
            labelId={labelId}
            value={limitValue}
            setValue={setLimitValue}
            options={limitOptions}
          />
        </div>
      )}
      <div className="text-muted-black flex grow items-center justify-end whitespace-nowrap max-sm:justify-center">
        <p
          className="text-muted-black text-sm whitespace-nowrap"
          aria-live="polite"
        >
          <span className="text-black">{startItem}</span>-
          <span className="text-black">{endItem}</span> of{" "}
          <span className="text-black">{total}</span>
        </p>
      </div>
      <Pagination className="w-fit max-sm:mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst
              onClick={handleFirstBtnClick}
              className={cn(!!isPreviousDisabled && disabledBtnStyling)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevBtnClick}
              className={cn(!!isPreviousDisabled && disabledBtnStyling)}
            />
          </PaginationItem>

          {getPaginationRange().map((item, idx) => {
            if (item === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <LuEllipsis className="cursor-default" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>More pages</p>
                    </TooltipContent>
                  </Tooltip>
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={item}>
                <PaginationItemBtn
                  isActive={currentPage === item}
                  onClick={() => handlePageBtnClick(item)}
                  className="rounded-full text-sm w-7.5 h-7.5"
                >
                  {item}
                </PaginationItemBtn>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={handleNextBtnClick}
              className={cn(!!isNextDisabled && disabledBtnStyling)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast
              onClick={handleLastBtnClick}
              className={cn(!!isNextDisabled && disabledBtnStyling)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePaginationDemo;
