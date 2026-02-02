"use client";

import BttLogoCompact from "@/components/icons/bttLogoCompact";
import { cn } from "@/lib/utils";
import { HOME_PAGE_URL } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import CustomTooltip from "../customTooltip";
import PeopleIcon from "./icons/peopleIcon";
import SidebarAccordion from "./sidebarAccordion";

interface Props {
  isSidebarCollapsed?: boolean;
  sidebarWidth: number;
  minWidth: number;
  maxWidth: number;
  setSidebarWidth: React.Dispatch<React.SetStateAction<number>>;
}

const DashboardSidebar = ({
  sidebarWidth,
  setSidebarWidth,
  isSidebarCollapsed,
  minWidth,
  maxWidth,
}: Props) => {
  const pathname = usePathname();
  const isResizingRef = useRef(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isResizingRef.current) return;

      setSidebarWidth((prev) => {
        const next = prev + e.movementX;
        return Math.min(maxWidth, Math.max(minWidth, next));
      });
    };

    const onMouseUp = () => {
      isResizingRef.current = false;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (isSidebarCollapsed) {
      setSidebarWidth(minWidth);
    } else {
      setSidebarWidth(maxWidth);
    }
  }, [isSidebarCollapsed]);

  return (
    <aside
      id="sidemenu"
      style={{
        width: isSidebarCollapsed ? minWidth : sidebarWidth,
      }}
      className={cn(
        "h-screen pb-5 flex flex-col gap-6 overflow-y-auto overflow-x-hidden relative rounded-r-xl bg-white shadow-lg",
        "transition-[width] duration-200 ease-out",
        // "h-screen w-60 pb-5 flex flex-col gap-6 overflow-y-auto overflow-x-hidden relative rounded-r-xl bg-white shadow-lg transition-all duration-500",
        isSidebarCollapsed && "w-16",
      )}
    >
      <div className="grid place-items-center border-b border-border-grey py-5 h-21">
        <Link href={HOME_PAGE_URL}>
          {!isSidebarCollapsed && (
            <img
              src="/images/btt-logo.webp"
              alt="Ecom. Logo"
              className="inline-block h-[44] w-[90] object-contain"
            />
          )}
          {!!isSidebarCollapsed && <BttLogoCompact />}
        </Link>
      </div>

      <div
        className={cn("flex flex-col gap-2 pl-3", isSidebarCollapsed && "pl-0")}
      >
        {MENU_ITEMS?.map(({ text, href, icon, nestedItems, path }) => {
          const isActive = pathname === href;

          return !!href ? (
            <CustomTooltip
              key={text}
              side="right"
              isHide={!isSidebarCollapsed}
              trigger={
                <Link
                  key={text}
                  href={href}
                  className={cn(
                    "h-11 py-3 pl-6 pr-4 text-sm font-normal rounded-l-xl transition-all duration-300 cursor-pointer hover:bg-primary-white flex items-center gap-3 whitespace-nowrap [&_svg]:fill-icon-grey",
                    !!isActive &&
                      "text-primary bg-primary-white font-bold [&_svg]:fill-primary border-r-2 border-primary",
                  )}
                >
                  <span>{icon}</span>

                  <span
                    className={cn(
                      "transition-all duration-300",
                      isSidebarCollapsed && "opacity-0",
                    )}
                  >
                    {text}
                  </span>
                </Link>
              }
            >
              {text}
            </CustomTooltip>
          ) : (
            <SidebarAccordion
              key={text}
              item={{ text, path, icon, nestedItems: nestedItems || [] }}
              pathname={pathname}
              isSidebarCollapsed={isSidebarCollapsed}
            />
          );
        })}
      </div>

      {!isSidebarCollapsed && (
        <div
          onMouseDown={() => {
            if (isSidebarCollapsed) return;
            isResizingRef.current = true;
            document.body.style.userSelect = "none";
            document.body.style.cursor = "col-resize";
          }}
          className="
          absolute top-0 right-0 h-full w-1
          cursor-col-resize
          hover:bg-primary-white
          transition-colors
          z-10
        "
        />
      )}
    </aside>
  );
};

export default DashboardSidebar;

const MENU_ITEMS = [
  { href: "/dashboard", text: "Dashboard", icon: <PeopleIcon /> },
  { href: "/dashboard/profile", text: "Profile", icon: <PeopleIcon /> },
  { href: "/dashboard/callbacks", text: "Callbacks", icon: <PeopleIcon /> },
  {
    href: "/dashboard/virtual-meeting",
    text: "Virtual Meeting",
    icon: <PeopleIcon />,
  },
  { href: "/dashboard/webinar", text: "Webinar", icon: <PeopleIcon /> },
  { href: "/dashboard/contact-us", text: "Contact Us", icon: <PeopleIcon /> },
  { href: "/dashboard/campus-tour", text: "Campus Tour", icon: <PeopleIcon /> },
  {
    text: "Why Ecom.",
    icon: <PeopleIcon />,
    path: "/dashboard/why-btt",
    nestedItems: [
      {
        href: "/dashboard/why-btt/project",
        text: "Project",
        icon: <PeopleIcon />,
      },
      {
        href: "/dashboard/why-btt/revenue",
        text: "Revenue",
        icon: <PeopleIcon />,
      },
      {
        href: "/dashboard/why-btt/insights",
        text: "Insights",
        icon: <PeopleIcon />,
      },
    ],
  },
];
