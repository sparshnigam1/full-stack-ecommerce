import { DateRange } from "react-day-picker";

export enum FilterTypeEnum {
  SELECT = "SELECT",
  MULTI_SELECT = "MULTI_SELECT",
  DATE = "DATE",
  DATE_RANGE = "DATE_RANGE",
  NUMBER = "NUMBER",
  NUMBER_RANGE = "NUMBER_RANGE",
}

export type FilterValueMap = {
  [FilterTypeEnum.SELECT]: string | undefined;
  [FilterTypeEnum.MULTI_SELECT]: string[];
  [FilterTypeEnum.DATE]: Date | undefined;
  [FilterTypeEnum.DATE_RANGE]: DateRange | undefined;
  [FilterTypeEnum.NUMBER]: number | undefined;
};

export type FilterValue =
  | string
  | string[]
  | Date
  | DateRange
  | number
  | undefined;

export type FilterState = Record<string, FilterValue>;

type BaseFilter = {
  title: string;
  key: string;
  priority?: number;
  mostUsed?: boolean;
  selectedOptions: FilterValue;
  handler?: (value: FilterValue) => void;
};

export type SelectFilter = BaseFilter & {
  filterType: FilterTypeEnum.SELECT;
  options: { label: string; value: string }[];
};

export type MultiSelectFilter = BaseFilter & {
  filterType: FilterTypeEnum.MULTI_SELECT;
  options: { label: string; value: string }[];
};

export type DateFilter = BaseFilter & {
  filterType: FilterTypeEnum.DATE;
};

export type DateRangeFilter = BaseFilter & {
  filterType: FilterTypeEnum.DATE_RANGE;
};

export type NumberFilter = BaseFilter & {
  filterType: FilterTypeEnum.NUMBER;
};

export type FilterConfig =
  | SelectFilter
  | MultiSelectFilter
  | DateFilter
  | DateRangeFilter
  | NumberFilter;
