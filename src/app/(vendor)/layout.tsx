"use client";

import DashboardHeader from "@/components/common/dashboardHeader";
import DashboardSidebar from "@/components/common/dashboardSidebar";
import { getFromSessionStorage, saveToSessionStorage } from "@/helpers";
import useCustomMediaQuery from "@/hooks/useCustomMediaQuery";
import { cn } from "@/lib/utils";
import { IS_DASHBOARD_SIDEBAR_COLLAPSED } from "@/utils/constants";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isTablet } = useCustomMediaQuery();
  const MIN_WIDTH = 64;
  const MAX_WIDTH = 280;

  const [sidebarWidth, setSidebarWidth] = useState(240);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean | null>(
    null,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);

    saveToSessionStorage(IS_DASHBOARD_SIDEBAR_COLLAPSED, {
      isSidebarCollapsed: !isSidebarCollapsed,
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDefaultCollapsed = getFromSessionStorage(
        IS_DASHBOARD_SIDEBAR_COLLAPSED,
      )?.isSidebarCollapsed;

      setIsSidebarCollapsed(!!isDefaultCollapsed);
      if (isTablet) {
        setIsSidebarCollapsed(true);
      }
    }
  }, [isTablet]);

  if (isSidebarCollapsed === null) return null;

  return (
    <div className="w-full relative h-screen flex bg-body-background">
      <div
        className={cn(
          "absolute h-80 w-40 bg-primary/20 rotate-[-20deg] z-0 blur-[10rem]",
          "top-0 left-49 transition-all duration-500",
          // isSidebarCollapsed && "left-0"
        )}
        style={{
          left: isSidebarCollapsed ? MIN_WIDTH : sidebarWidth - 40,
        }}
      />
      <button
        className={cn(
          "bg-white absolute border border-border-grey h-7 w-7 grid place-items-center rounded-full top-21 left-60 -translate-1/2 shadow-light transition-all duration-500 cursor-pointer z-20",
          // isSidebarCollapsed && "left-16"
        )}
        style={{
          left: isSidebarCollapsed ? MIN_WIDTH : sidebarWidth,
        }}
        onClick={handleToggle}
      >
        <FaChevronLeft
          className={cn(
            "size-3 text-primary transition-all duration-500",
            isSidebarCollapsed && "rotate-180",
          )}
        />
      </button>
      <DashboardSidebar
        isSidebarCollapsed={isSidebarCollapsed}
        sidebarWidth={sidebarWidth}
        setSidebarWidth={setSidebarWidth}
        minWidth={MIN_WIDTH}
        maxWidth={MAX_WIDTH}
      />
      <div className="h-screen overflow-hidden relative flex flex-1 flex-col">
        <DashboardHeader />
        <div className="relative h-[calc(100vh-6.25rem)] flex flex-1 overflow-x-hidden p-6 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
