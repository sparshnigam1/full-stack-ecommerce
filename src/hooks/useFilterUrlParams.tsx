import { FilterTypeEnum, FilterValue } from "@/types/filters";
import { format, parseISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";

const useFilterUrlParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setUrlParams = (key: string, value: FilterValue) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);

    if (!value) {
      router.replace(`?${params.toString()}`, { scroll: false });
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value instanceof Date) {
      params.set(key, format(value, "yyyy-MM-dd"));
    } else if (typeof value === "object" && "from" in value) {
      const range = value as DateRange;
      if (range.from) {
        params.set(
          key,
          `${format(range.from, "yyyy-MM-dd")},${
            range.to ? format(range.to, "yyyy-MM-dd") : ""
          }`
        );
      }
    } else {
      params.set(key, String(value));
    }

    params.set("page", "0");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const getUrlParam = (
    key: string,
    filterType: FilterTypeEnum,
    searchParams: URLSearchParams
  ): FilterValue => {
    const values = searchParams.getAll(key);

    if (!values.length) return undefined;

    switch (filterType) {
      case FilterTypeEnum.MULTI_SELECT:
        return values;

      case FilterTypeEnum.SELECT:
        return values[0];

      case FilterTypeEnum.DATE:
        return values[0] ? parseISO(values[0]) : undefined;

      case FilterTypeEnum.DATE_RANGE: {
        const [from, to] = values[0].split(",");
        return {
          from: from ? parseISO(from) : undefined,
          to: to ? parseISO(to) : undefined,
        } satisfies DateRange;
      }

      case FilterTypeEnum.NUMBER:
        return Number(values[0]);

      default:
        return undefined;
    }
  };

  return { getUrlParam, setUrlParams } as const;
};

export default useFilterUrlParams;
