"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  inputLabel: ReactNode;
  inputKey: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  postCheckUpdate?: (val: boolean) => void;
}

const CheckBoxInput = <T extends FieldValues>({
  control,
  inputLabel,
  inputKey,
  isDisabled,
  postCheckUpdate,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={inputKey as Path<T>}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <div className="flex flex-col items-start gap-1">
          <span className={cn("flex items-start gap-2")}>
            <span>
              <input
                type="checkbox"
                id={`${inputKey}-check`}
                checked={!!value}
                disabled={isDisabled}
                ref={ref}
                onChange={(event) => {
                  const checked = event.target.checked;
                  onChange(checked as PathValue<T, Path<T>>);

                  if (postCheckUpdate) {
                    postCheckUpdate(checked);
                  }
                }}
                onBlur={onBlur}
                className={cn(
                  "h-5! w-5! cursor-pointer accent-white",
                  "appearance-none",
                  "border border-border-grey bg-white rounded-xs text-white",
                  "checked:bg-white checked:border-border-grey",
                  "disabled:cursor-not-allowed",

                  // Create the pseudo-element
                  "checked:before:content-[''] checked:before:block checked:before:w-full checked:before:h-full",
                  "checked:before:bg-center checked:before:bg-no-repeat",

                  // Enabled -> RED CHECK ICON
                  `checked:before:bg-[url("data:image/svg+xml,%3Csvg%20width='10'%20height='9'%20viewBox='0%200%208%206'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M0.75%202.74999L2.74765%204.75L6.75%200.75'%20stroke='%23C4161C'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3C/svg%3E")]`,

                  // Disabled -> GREY CHECK ICON (#AAAAAA)
                  `disabled:checked:before:bg-[url("data:image/svg+xml,%3Csvg%20width='9.5'%20height='8'%20viewBox='0%200%208%206'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M0.75%202.74999L2.74765%204.75L6.75%200.75'%20stroke='%23AAAAAA'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3C/svg%3E")]`
                )}
              />
            </span>
            <label
              className={cn(
                "cursor-pointer select-none font-base text-sm",
                isDisabled && "cursor-not-allowed text-icon-grey"
              )}
              htmlFor={`${inputKey}-check`}
            >
              {inputLabel}
            </label>
          </span>

          {!!error?.message && (
            <p className="text-red text-sm">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default CheckBoxInput;
