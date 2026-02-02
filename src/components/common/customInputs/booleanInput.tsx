"use client";

import CustomTooltip from "@/components/common/customTooltip";
import { cn } from "@/lib/utils";
import { RefObject } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
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
  labelClassName?: string;
}

const BooleanInput = <T extends FieldValues>({
  control,
  inputLabel,
  inputKey,
  additionalInfo,
  inputRef,
  isDisabled,
  isRequired,
  labelClassName,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={inputKey as Path<T>}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const inputLabelClassName = cn(
          "flex items-center gap-2 cursor-pointer text-black font-medium",
          isDisabled && "cursor-not-allowed text-icon-grey"
        );

        const inputClassName = cn(
          "h-4 w-4 cursor-pointer rounded-full",
          "appearance-none",
          "relative", // for absolute pseudo element
          "border border-border-grey bg-white",
          "disabled:cursor-not-allowed",

          // White background even when checked
          "checked:bg-white checked:border-border-grey",

          // INNER DOT (primary circle)
          "checked:before:content-[''] checked:before:absolute checked:before:top-1/2 checked:before:left-1/2",
          "checked:before:-translate-x-1/2 checked:before:-translate-y-1/2",
          "checked:before:w-2 checked:before:h-2 checked:before:rounded-full",
          "checked:before:bg-primary", // your theme primary color

          // Disabled + checked inner dot (optional lighter color)
          "disabled:checked:before:bg-icon-grey"
        );

        return (
          <div ref={inputRef || null}>
            <div
              id={`${inputLabel}-label`}
              className={cn(
                "text-sm text-dark-grey mb-4 bg-transparent flex items-center justify-between",
                labelClassName
              )}
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
              <div className="flex items-center gap-10 px-1">
                <label className={inputLabelClassName}>
                  <input
                    type="radio"
                    id={`${inputKey}-yes`}
                    value="Yes"
                    onChange={() => onChange("Yes" as PathValue<T, Path<T>>)}
                    checked={value === "Yes"}
                    disabled={isDisabled}
                    className={inputClassName}
                  />
                  <span className="text-sm">Yes</span>
                </label>

                <label className={inputLabelClassName}>
                  <input
                    type="radio"
                    id={`${inputKey}-no`}
                    value="No"
                    onChange={() => onChange("No" as PathValue<T, Path<T>>)}
                    checked={value === "No"}
                    disabled={isDisabled}
                    className={inputClassName}
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>

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

export default BooleanInput;
