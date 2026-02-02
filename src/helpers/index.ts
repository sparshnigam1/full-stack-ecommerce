import { format, isValid, parseISO } from "date-fns";
import Cookies from "js-cookie";
import { DateRange } from "react-day-picker";

export const saveToSessionStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getFromSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const deleteFromSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};

export const saveToLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const deleteFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const saveToCookie = (
  key: string,
  value: any,
  days: number | Date = 1,
) => {
  let expires: Date | number;

  if (typeof days === "number") {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    expires = expirationDate;
  } else {
    expires = days;
  }

  Cookies.set(key, value, { expires });
};

export const getFromCookie = (key: string) => {
  return Cookies.get(key);
  // return JSON.parse(Cookies.get(key));
};

export const deleteFromCookie = (key: string) => {
  Cookies.remove(key);
};

export function formatDateRange(range?: DateRange) {
  if (!range?.from) return "";
  if (!range.to) return format(range.from, "yyyy-MM-dd");

  return `${format(range.from, "yyyy-MM-dd")},${format(
    range.to,
    "yyyy-MM-dd",
  )}`;
}

type DateRangeString = string | { from?: string; to?: string };

export function parseDateRange(input?: DateRangeString): DateRange | undefined {
  if (!input) return undefined;

  // Object format { from, to }
  if (typeof input === "object") {
    const from = input.from ? parseISO(input.from) : undefined;
    const to = input.to ? parseISO(input.to) : undefined;

    return {
      from: from && isValid(from) ? from : undefined,
      to: to && isValid(to) ? to : undefined,
    };
  }

  // String format "YYYY-MM-DD,YYYY-MM-DD"
  const [fromStr, toStr] = input.split(/[,|→]/).map((s) => s.trim());

  const from = fromStr ? parseISO(fromStr) : undefined;
  const to = toStr ? parseISO(toStr) : undefined;

  return {
    from: from && isValid(from) ? from : undefined,
    to: to && isValid(to) ? to : undefined,
  };
}

export const parseDateRangeFromUrl = (value: string): DateRange | undefined => {
  const [from, to] = value.split(",");
  if (!from) return undefined;

  return {
    from: parseISO(from),
    to: to ? parseISO(to) : undefined,
  };
};
