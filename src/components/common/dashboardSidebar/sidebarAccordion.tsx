"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";
import CustomTooltip from "../customTooltip";

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path?: string;
  nestedItems: {
    href: string;
    text: string;
    icon: ReactNode;
  }[];
}

interface Props {
  item: MenuItem;
  pathname: string;
  isSidebarCollapsed?: boolean;
}

const SidebarAccordion = ({ item, pathname, isSidebarCollapsed }: Props) => {
  const isAnyNestedActive = pathname.includes(item.path || "");
  const defaultValue = isAnyNestedActive ? item.text : undefined;

  const baseTriggerClasses = cn(
    "w-full py-3 pl-6 pr-4 text-sm font-normal rounded-l-xl rounded-r-[0] transition-all duration-500 cursor-pointer flex items-center gap-3 whitespace-nowrap [&_svg]:fill-icon-grey group",
    isSidebarCollapsed && "pl-6 justify-start pr-5",
  );

  return (
    <Accordion
      key={pathname}
      type="single"
      collapsible={!isAnyNestedActive}
      value={defaultValue}
      className="w-full"
    >
      <AccordionItem value={item.text} className="border-none flex flex-col">
        <CustomTooltip
          key={item.text}
          side="right"
          isHide={!isSidebarCollapsed}
          trigger={
            <AccordionTrigger
              className={cn(
                baseTriggerClasses,
                "h-11 bg-white hover:bg-primary-white font-normal border-r-2 border-transparent",
                "data-[state=open]:bg-primary-white data-[state=open]:font-semibold data-[state=open]:text-primary data-[state=open]:[&_svg]:fill-primary",
                isAnyNestedActive &&
                  "bg-primary-white border-primary font-semibold text-primary [&_svg]:fill-primary",
                "pl-6",
              )}
              hideDropdownArrow={isSidebarCollapsed}
            >
              <div className="flex items-center gap-3">
                <span>{item.icon}</span>
                <span
                  className={cn(
                    "transition-all duration-300",
                    isSidebarCollapsed && "opacity-0",
                  )}
                >
                  {item.text}
                </span>
              </div>
            </AccordionTrigger>
          }
        >
          {item.text}
        </CustomTooltip>

        {/* Dropdown Content */}
        <AccordionContent className="pt-2 pb-2">
          <div className={"flex flex-col gap-1 transition-all duration-500"}>
            {item.nestedItems.map((nested, index) => {
              const isActive = pathname === nested.href;
              return (
                <CustomTooltip
                  key={nested.text}
                  side="right"
                  isHide={!isSidebarCollapsed}
                  className="w-full"
                  trigger={
                    <div
                      key={nested.href}
                      className={cn(
                        "relative pl-10 pr-2 transition-all duration-300",
                        isSidebarCollapsed && "pl-6 pr-0",
                      )}
                    >
                      <div
                        className={cn(
                          "absolute top-0 left-6 h-[65%] translate-y-[-12%] w-4 border-l-2 border-b-2 border-light-grey rounded-bl-md transition-all duration-300",
                          index !== 0 && "h-[140%] translate-y-[-60%]",
                          isSidebarCollapsed && "w-2.5 left-3",
                        )}
                      />
                      <Link
                        key={nested.href}
                        href={nested.href}
                        className={cn(
                          "h-9 py-2 pl-3 pr-4 text-sm font-normal transition-all duration-300 cursor-pointer flex items-center gap-3 whitespace-nowrap rounded-lg [&_svg]:fill-icon-grey",
                          isActive
                            ? "bg-primary-white text-primary font-bold [&_svg]:fill-primary"
                            : "text-black hover:bg-primary-white",
                          isSidebarCollapsed && "pl-2.5 pr-0",
                        )}
                      >
                        <span>{nested.icon}</span>
                        <span
                          className={cn(
                            "transition-all duration-300",
                            isSidebarCollapsed && "opacity-0",
                          )}
                        >
                          {nested.text}
                        </span>
                      </Link>
                    </div>
                  }
                >
                  {nested.text}
                </CustomTooltip>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarAccordion;
