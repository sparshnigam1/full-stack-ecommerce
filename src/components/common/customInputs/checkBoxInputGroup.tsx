"use client";

import { cn } from "@/lib/utils";
import { RefObject } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import CustomTooltip from "../customTooltip";
import { LuCircleAlert } from "react-icons/lu";

interface Props<T extends FieldValues> {
  control: Control<T>;
  inputLabel: string;
  inputKey: string;
  fieldOptions: string[];
  inputRef?: RefObject<any>;
  isRequired?: boolean;
  additionalInfo?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  className?: string;
}

const CheckBoxInputGroup = <T extends FieldValues>({
  control,
  inputLabel,
  inputKey,
  additionalInfo,
  fieldOptions,
  inputRef,
  isDisabled,
  isRequired,
  className,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={inputKey as Path<T>}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
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
            <div
              className={cn("flex flex-col items-start gap-1 pl-2", className)}
            >
              {fieldOptions?.map((item, index) => (
                <label
                  key={index}
                  className={cn(
                    "flex items-center gap-2 cursor-pointer select-none font-base",
                    isDisabled && "cursor-not-allowed text-icon-grey"
                  )}
                >
                  <input
                    type="checkbox"
                    value={item}
                    disabled={isDisabled}
                    onChange={(e) => {
                      let newValue: string[] = [];

                      if (e.target.checked) {
                        const updatedItems =
                          Array.isArray(value) && value?.length
                            ? [...value, e.target.value]
                            : [e.target.value];
                        newValue = [...updatedItems];
                      } else if (Array.isArray(value)) {
                        newValue = value.filter(
                          (val: any) => val !== e.target.value
                        );
                      }

                      onChange(newValue as PathValue<T, Path<T>>);
                    }}
                    checked={!!value && value.includes(item)}
                    className={cn(
                      "h-4 w-4 cursor-pointer",
                      "appearance-none",
                      "border border-border-grey bg-white rounded-xs",
                      "checked:bg-white checked:border-border-grey",
                      "disabled:cursor-not-allowed",

                      // Create the pseudo-element
                      "checked:before:content-[''] checked:before:block checked:before:w-full checked:before:h-full",
                      "checked:before:bg-center checked:before:bg-no-repeat",

                      // Enabled -> RED CHECK ICON
                      `checked:before:bg-[url("data:image/svg+xml,%3Csvg%20width='9.5'%20height='8'%20viewBox='0%200%208%206'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M0.75%202.74999L2.74765%204.75L6.75%200.75'%20stroke='%23C4161C'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3C/svg%3E")]`,

                      // Disabled -> GREY CHECK ICON (#AAAAAA)
                      `disabled:checked:before:bg-[url("data:image/svg+xml,%3Csvg%20width='9.5'%20height='8'%20viewBox='0%200%208%206'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M0.75%202.74999L2.74765%204.75L6.75%200.75'%20stroke='%23AAAAAA'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3C/svg%3E")]`
                    )}

                    // className={cn(
                    //   "h-4 w-4 cursor-pointer",
                    //   "appearance-none",
                    //   "relative", // <-- REQUIRED for before absolute
                    //   "border border-border-grey bg-white rounded-xs",
                    //   "checked:bg-white checked:border-border-grey",
                    //   "disabled:cursor-not-allowed",

                    //   // Create the pseudo-element
                    //   "checked:before:content-[''] checked:before:absolute checked:before:top-0 checked:before:left-0",
                    //   "checked:before:w-full checked:before:h-full",
                    //   "checked:before:bg-center checked:before:bg-no-repeat checked:before:bg-transparent",

                    //   // Enabled -> RED CHECK ICON
                    //   `checked:before:bg-[url("data:image/svg+xml,%3Csvg%20width='9.5'%20height='8'%20viewBox='0%200%208%206'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M0.75%202.74999L2.74765%204.75L6.75%200.75'%20stroke='%23C4161C'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3C/svg%3E")]`,

                    //   // Disabled -> GREY CHECK ICON
                    //   `disabled:checked:before:bg-[url("data:image/svg+xml,%3Csvg%20width='9.5'%20height='8'%20viewBox='0%200%208%206'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M0.75%202.74999L2.74765%204.75L6.75%200.75'%20stroke='%23AAAAAA'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3C/svg%3E")]`
                    // )}
                  />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
            {error?.message && (
              <p className="text-red text-sm">{error?.message}</p>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default CheckBoxInputGroup;
