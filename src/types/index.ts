import { Button } from "@/components/ui/button";
import type { NextRequest, NextResponse } from "next/server";
import { DateRange, DayPicker } from "react-day-picker";

export type ApiRequest<TReq = any> = NextRequest & {
  json: () => Promise<TReq extends { body: infer B } ? B : unknown>;
  query: TReq extends { query: infer Q }
    ? Q
    : Record<string, string | undefined>;
};

export type ApiResponse<T> = NextResponse<T>;
export interface IApiResponse<T> {
  message: string;
  data?: T;
  status?: number;
  total?: Number;
  page?: Number;
  limit?: Number;
}

export enum UserRolesEnum {
  STUDENT = "STUDENT",
  SUPER_ADMIN = "SUPER_ADMIN",
  TEACHER = "TEACHER",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
}

export enum AppPermissionKeyEnum {
  PROFILE = "PROFILE",
  USERS = "USERS",
  STUDENTS = "STUDENTS",
  APP_PERMISSIONS = "APP_PERMISSIONS",
}

export enum AppPermissionValueEnum {
  VIEW = "VIEW",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  ASSIGN = "ASSIGN",
}

export interface SidebarMenuItemType {
  text: string;
  href: string;
}

export type InputType =
  | "text"
  | "password"
  | "number"
  | "email"
  | "phone_no"
  | "boolean"
  | "select"
  | "radio"
  | "date"
  | "checkbox"
  | "check"
  | "switch"
  | "textarea";

export type filterSelectInputValueType = string | number | (string | number)[];

export type CalendarMode = CalendarValueProps["mode"];

export type CalendarSingleProps = {
  mode: "single";
  value?: Date;
  onChange?: (date: Date | undefined) => void;
};

export type CalendarMultipleProps = {
  mode: "multiple";
  value?: Date[];
  onChange?: (dates: Date[] | undefined) => void;
};

export type CalendarRangeProps = {
  mode: "range";
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
};

export type CalendarValueProps =
  | CalendarSingleProps
  | CalendarMultipleProps
  | CalendarRangeProps;

export type CalendarProps = CalendarValueProps & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  label?: string;
  inputButtonClassName?: string;
  disabled?: boolean;
  align?: "start" | "center" | "end";
} & Omit<
    React.ComponentProps<typeof DayPicker>,
    "mode" | "selected" | "onSelect"
  >;
