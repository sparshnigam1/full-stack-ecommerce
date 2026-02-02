"use client";

import CustomTooltip from "@/components/common/customTooltip";
import PencilLineIcon from "@/components/icons/pencilLineIcon";
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
import { ReactNode, RefObject, useMemo, useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { FaCheck, FaChevronDown } from "react-icons/fa6";
import { HiChevronDown, HiChevronUpDown } from "react-icons/hi2";
import { LuCircleAlert } from "react-icons/lu";

interface Props<T extends FieldValues> {
  control: Control<T>;
  inputLabel: string;
  inputKey: string;
  inputRef?: RefObject<any>;
  isRequired?: boolean;
  additionalInfo?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  menuItems?: { label: string; value: string }[];
  startIcon?: ReactNode;
}

const SelectInput = <T extends FieldValues>({
  control,
  inputLabel,
  inputKey,
  additionalInfo,
  inputRef,
  isDisabled,
  isRequired,
  menuItems,
  startIcon,
}: Props<T>) => {
  const [open, setOpen] = useState(false);

  // Detect if on mobile
  const isMobile = useMemo(
    () =>
      typeof window !== "undefined" &&
      /Mobi|Android/i.test(navigator.userAgent),
    []
  );

  return (
    <Controller
      control={control}
      name={inputKey as Path<T>}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const selectedLabel =
          menuItems?.find(
            (item: { value: string | number; label: string }) =>
              item.value === value
          )?.label ?? "Select...";

        return (
          <div ref={inputRef || null}>
            <div
              id={`${inputLabel}-label`}
              className="text-sm text-dark-grey mb-2 bg-transparent flex items-center justify-between"
            >
              <label htmlFor={inputKey} className="font-semibold">
                {inputLabel}
                {isRequired && <span className="text-red">*</span>}
              </label>
              {additionalInfo && (
                <div className="flex items-center">
                  <CustomTooltip
                    trigger={
                      <LuCircleAlert
                        className={cn(
                          "text-icon-grey text-base",
                          !!error?.message && "text-red"
                        )}
                      />
                    }
                  >
                    {additionalInfo}
                  </CustomTooltip>
                </div>
              )}
            </div>

            <div className="w-full flex flex-col gap-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-between text-left font-normal px-3.5 shadow-light text-black hover:bg-white active:text-black active:bg-white rounded-md border border-border-grey bg-white [&_svg]:rotate-0! focus-visible:border focus-visible:border-border-grey focus-visible:bg-white data-[empty=true]:text-light-grey disabled:text-icon-grey! disabled:shadow-light! disabled:bg-body-background!",
                      selectedLabel === "Select..." &&
                        "text-icon-grey active:text-icon-grey",
                      !!error?.message && "border-primary-lightest!"
                    )}
                    disabled={isDisabled}
                  >
                    <span className="flex items-center gap-3">
                      {!!startIcon && startIcon}
                      {!startIcon && <PencilLineIcon />} {selectedLabel}
                    </span>
                    <FaChevronDown className="size-3.5 opacity-50 text-icon-grey" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="p-0 bg-white border border-border-grey rounded-md w-(--radix-popover-trigger-width)"
                  onOpenAutoFocus={(e) => {
                    !!isMobile && e.preventDefault();
                  }}
                >
                  <Command>
                    <CommandInput placeholder={`Search...`} />
                    <CommandList>
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {menuItems?.map(
                          (
                            item: { value: string | number; label: string },
                            index: number
                          ) => (
                            <CommandItem
                              key={index}
                              onSelect={() => {
                                onChange(item.value as PathValue<T, Path<T>>);
                                setOpen(false);
                              }}
                            >
                              {item.label}
                              <FaCheck
                                className={cn(
                                  "h-4 w-4",
                                  item.value === value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          )
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {error?.message && (
                <p className="text-red text-sm">{error?.message}</p>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};

export default SelectInput;
