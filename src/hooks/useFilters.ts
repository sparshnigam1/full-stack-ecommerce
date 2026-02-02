"use client";

import { parseDateRangeFromUrl } from "@/helpers";
import { FilterConfig, FilterState, FilterTypeEnum } from "@/types/filters";
import { format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { DateRange } from "react-day-picker";

export const useFilters = (filters: FilterConfig[]) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const filterKeys = filters.map((f) => f.key);

  /* ---------------------------------- */
  /* URL → APPLIED STATE */
  /* ---------------------------------- */
  const appliedValues: FilterState = useMemo(() => {
    const values: FilterState = {};

    filters.forEach(({ key, filterType }) => {
      const params = searchParams.getAll(key);

      switch (filterType) {
        case FilterTypeEnum.MULTI_SELECT:
          values[key] = params;
          break;

        case FilterTypeEnum.SELECT:
          values[key] = params[0];
          break;

        case FilterTypeEnum.DATE:
          values[key] = params[0] ? new Date(params[0]) : undefined;
          break;

        case FilterTypeEnum.DATE_RANGE:
          values[key] = params[0]
            ? parseDateRangeFromUrl(params[0])
            : undefined;
          break;

        case FilterTypeEnum.NUMBER:
          values[key] = params[0] ? Number(params[0]) : undefined;
          break;
      }
    });

    return values;
  }, [searchParams, filters]);

  /* ---------------------------------- */
  /* APPLY DRAFT STATE → URL */
  /* ---------------------------------- */
  const applyFilters = (draftValues: FilterState) => {
    const params = new URLSearchParams(searchParams.toString());

    // remove existing filter params first
    filterKeys.forEach((key) => {
      params.delete(key);
    });

    filters.forEach((filter) => {
      const value = draftValues[filter.key];
      if (!value) return;

      switch (filter.filterType) {
        case FilterTypeEnum.MULTI_SELECT:
          (value as string[]).forEach((v) => params.append(filter.key, v));
          break;

        case FilterTypeEnum.SELECT:
          params.set(filter.key, value as string);
          break;

        case FilterTypeEnum.DATE:
          params.set(filter.key, format(value as Date, "yyyy-MM-dd"));
          break;

        case FilterTypeEnum.DATE_RANGE: {
          const range = value as DateRange;
          if (range.from) {
            params.set(
              filter.key,
              `${format(range.from, "yyyy-MM-dd")},${
                range.to ? format(range.to, "yyyy-MM-dd") : ""
              }`
            );
          }
          break;
        }

        case FilterTypeEnum.NUMBER:
          params.set(filter.key, String(value));
          break;
      }
    });

    params.set("page", "0");

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const resetAll = () => {
    const params = new URLSearchParams(searchParams.toString());

    filterKeys.forEach((key) => {
      params.delete(key);
    });

    params.set("page", "0"); // optional

    router.replace(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
      { scroll: false }
    );
  };

  const appliedCount = Object.values(appliedValues).filter((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }

    if (value instanceof Date) {
      return !isNaN(value.getTime());
    }

    if (typeof value === "object" && value !== null) {
      // DateRange
      return Boolean((value as DateRange).from);
    }

    return value !== undefined && value !== "";
  }).length;

  return {
    appliedValues,
    applyFilters,
    resetAll,
    appliedCount,
  };
};
