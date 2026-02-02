import { PermissionType } from "@/types/apiTypes/users";

export const checkUserPermission = ({
  permissionName,
  permissions,
}: {
  permissionName: string;
  permissions?: PermissionType[];
}) => {
  return !!permissions?.find(
    (item) => item.name === permissionName && !!item.granted,
  );
};

export const toTitleCase = (str: any) => {
  if (str == null || str == undefined || str == "") {
    return str;
  }

  const inputString = String(str);

  return inputString
    .replace(/_/g, " ")
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatCurrency = (
  val: number,
  toFixed?: number,
  currency?: string,
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "CAD",
    minimumFractionDigits: typeof toFixed === "number" ? toFixed : 2,
    maximumFractionDigits: typeof toFixed === "number" ? toFixed : 2,
  }).format(val || 0);
};

export const parseCurrency = (value: string) => {
  if (!value) return 0;
  return Number(value.replace(/[^\d.]/g, ""));
};
