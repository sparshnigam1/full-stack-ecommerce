import { ReactNode } from "react";

const DevOnly = ({ children }: { children: ReactNode }) => {
  const isDev = process.env.NEXT_PUBLIC_ENVIRONMENT !== "production";

  return isDev && <>{children}</>;
};

export default DevOnly;
