"use client";

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "dotenv/config";
import Cookies from "js-cookie";
import { useState } from "react";

export default function Providers({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState?: DehydratedState | null;
}) {
  const [queryClient] = useState(() => new QueryClient());

  const buildVersion = process.env.NEXT_PUBLIC_BUILD_VERSION;

  if (buildVersion) {
    const existing = Cookies.get("app_version");

    if (!existing || existing !== buildVersion) {
      Cookies.set("app_version", buildVersion, {
        path: "/",
        sameSite: "lax",
        secure: false,
      });
    }
  }

  return (
    // <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
    // </SessionProvider>
  );
}
