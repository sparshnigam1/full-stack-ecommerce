"use client";

import CustomTooltip from "@/components/common/customTooltip";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { filterSelectInputValueType } from "@/types";
import { ReactNode, RefObject, useMemo, useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa6";
import { LuCircleAlert } from "react-icons/lu";
import { MdClose } from "react-icons/md";

interface MenuItem {
  label: string;
  value: string | number;
}

interface Props {
  inputLabel: string;
  inputKey?: string;
  value?: filterSelectInputValueType;
  onChange: (value: filterSelectInputValueType) => void;
  inputRef?: RefObject<any>;
  isMultiSelect?: boolean;
  additionalInfo?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  menuItems?: MenuItem[];
  startIcon?: ReactNode;
}

const FilterSelectInput = ({
  inputLabel,
  inputKey,
  value,
  onChange,
  additionalInfo,
  inputRef,
  isDisabled,
  isMultiSelect,
  menuItems,
  startIcon,
}: Props) => {
  const [open, setOpen] = useState(false);

  // Detect if on mobile
  const isMobile = useMemo(
    () =>
      typeof window !== "undefined" &&
      /Mobi|Android/i.test(navigator.userAgent),
    []
  );

  const selectedValues: (string | number)[] = isMultiSelect
    ? Array.isArray(value)
      ? value
      : []
    : [];

  const selectedLabel = isMultiSelect
    ? selectedValues.length
      ? menuItems
          ?.filter((item) => selectedValues.includes(item.value))
          .map((item) => item.label)
          .join(", ")
      : inputLabel
    : (menuItems?.find((item) => item.value === value)?.label ?? inputLabel);

  const toggleValue = (val: string | number) => {
    if (!isMultiSelect) {
      onChange(val);
      setOpen(false);
      return;
    }

    const current = Array.isArray(value) ? value : [];
    const exists = current.includes(val);

    const updated = exists
      ? current.filter((v) => v !== val)
      : [...current, val];

    onChange(updated);
  };

  const clearSelection = () => {
    onChange(isMultiSelect ? [] : "");
  };

  return (
    <div className="w-max" ref={inputRef || null}>
      {(inputKey || additionalInfo) && (
        <div
          id={`${inputLabel}-label`}
          className="text-sm text-dark-grey mb-2 bg-transparent flex items-center justify-between"
        >
          {inputKey && (
            <label htmlFor={inputKey} className="font-semibold">
              {inputLabel}
            </label>
          )}

          {additionalInfo && (
            <CustomTooltip
              trigger={<LuCircleAlert className="text-icon-grey text-base" />}
            >
              {additionalInfo}
            </CustomTooltip>
          )}
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="extra-small"
            disabled={isDisabled}
            className={cn(
              "min-w-50 w-full max-w-55 justify-between text-sm text-left font-normal px-3.5 shadow-light text-black hover:bg-white active:text-black active:bg-white rounded-md border border-border-grey bg-white [&_svg]:rotate-0! focus-visible:border focus-visible:border-border-grey focus-visible:bg-white data-[empty=true]:text-light-grey disabled:text-icon-grey! disabled:shadow-light! disabled:bg-body-background!",
              selectedLabel === inputLabel &&
                "text-icon-grey active:text-icon-grey"
            )}
          >
            <span className="flex items-center gap-3 truncate">
              {startIcon}
              <span className={cn("truncate line-clamp")}>{selectedLabel}</span>
            </span>

            {selectedLabel !== inputLabel ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  clearSelection();
                }}
              >
                <MdClose className="text-primary" />
              </span>
            ) : (
              <FaChevronDown className="size-3.5 opacity-50 text-icon-grey" />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="p-0 bg-white border border-border-grey rounded-md w-(--radix-popover-trigger-width)"
          onOpenAutoFocus={(e) => {
            if (isMobile) e.preventDefault();
          }}
        >
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {menuItems?.map((item) => {
                  const isSelected = isMultiSelect
                    ? selectedValues.includes(item.value)
                    : item.value === value;

                  return (
                    <CommandItem
                      key={item.value}
                      onSelect={() => toggleValue(item.value)}
                    >
                      {item.label}
                      <FaCheck
                        className={cn(
                          "h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterSelectInput;
