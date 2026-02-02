import { IErrorResponse } from "@/types/apiTypes/users";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const formatZodErrors = (error: any) => {
  return JSON.parse(error)?.map((item: any) => ({
    path: item?.path[0],
    message: item?.message,
  }));
};

export const SuccessResponse = ({
  status,
  message,
  data,
  headers,
  total,
}: {
  status?: number;
  message?: string;
  data?: any;
  headers?: HeadersInit;
  total?: number;
}) => {
  const body: { message: string; data?: any; total?: number } = {
    message: message || "Successful",
  };

  if (data) {
    body.data = data;
  }

  if (typeof total === "number") {
    body.total = total;
  }

  return NextResponse.json(body, { status: status || 200, headers });
};

export const ErrorResponse = (
  status = 500,
  message = "Something went wrong",
  errors?: any
) => {
  const body: IErrorResponse = { message };

  if (errors) {
    body.errors = errors;
  }

  return NextResponse.json(body, { status });
};

export const pgErrorResponse = (error: any) => {
  const pgError = error?.cause ?? error;
  const { status, message } = formatPgError(pgError);

  return ErrorResponse(status, message);
};

export const getClientIp = (req: NextRequest): string => {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // "x-forwarded-for" can contain multiple IPs → take the first one
    return forwardedFor.split(",")[0].trim();
  }

  // Fallback to Next.js headers
  return req.headers.get("x-real-ip") || "unknown";
};

export const detectHttpVersion = (req: NextRequest): string => {
  // 1. Check "via" header (common in CDNs/proxies, includes http/2 info)
  const via = req.headers.get("via");
  if (via && /2\.0/i.test(via)) return "HTTP/2.0";
  if (via && /1\.1/i.test(via)) return "HTTP/1.1";

  // 2. Check "x-forwarded-proto" (https usually implies HTTP/2 at edge)
  const proto = req.headers.get("x-forwarded-proto");
  if (proto === "https") return "Likely HTTP/2.0 (TLS over CDN)";
  if (proto === "http") return "HTTP/1.1";

  // 3. If running on custom Node.js server (not Vercel), fall back:
  // @ts-ignore – NextRequest wraps Node req, but not typed
  const raw = (req as any)?.req;
  if (raw?.httpVersion) return `HTTP/${raw.httpVersion}`;

  return "Unknown (possibly proxied)";
};

// src/utils/pgErrorFormatter.ts

type PgError = {
  code?: string;
  detail?: string;
  message?: string;
  constraint?: string;
  table?: string;
  column?: string;
};

export const formatPgError = (
  error: PgError
): { status: number; message: string } => {
  switch (error?.code) {
    case "23505": // unique_violation
      if (error.constraint === "users_email_unique") {
        return { status: 409, message: "Email already exists" };
      } else {
        return {
          status: 409,
          message: `Duplicate entry: ${
            error?.detail || "This record already exists."
          }`,
        };
      }

    case "23503": // foreign_key_violation
      return {
        status: 400,
        message: `Invalid reference: ${
          error?.detail || "Related record not found."
        }`,
      };

    case "23502": // not_null_violation
      return {
        status: 400,
        message: `Missing value: ${
          error?.column || "A required field"
        } cannot be null.`,
      };

    case "42703": // undefined_column
      return {
        status: 400,
        message: `Invalid column: ${error?.column || "Unknown column"}.`,
      };

    case "42P01": // undefined_table
      return {
        status: 400,
        message: `Invalid table: ${error?.table || "Unknown table"}.`,
      };

    case "22P02": // invalid_text_representation
      return {
        status: 400,
        message: `Invalid input format: ${
          error?.message || "Check the input value."
        }`,
      };

    default:
      return {
        status: 500,
        message: error?.message || "An unexpected error occurred.",
      };
  }
};

export const getPgError = (error: any) => {
  const pgError = error?.cause;
  return formatPgError(pgError);
};

export const getUrlParams = (req: NextRequest) => {
  const params: Record<string, string | string[]> = {};
  for (const key of req.nextUrl.searchParams.keys()) {
    const values = req.nextUrl.searchParams.getAll(key);
    params[key] = values.length > 1 ? values : values[0];
  }

  return params;
};

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value || "";
}
