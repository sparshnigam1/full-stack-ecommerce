"use client";

import { cn } from "@/lib/utils";
import { ChangeEvent, ReactNode } from "react";

interface Props {
  inputLabel: ReactNode;
  parentClassName?: string;
  conatinerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  inputKey: string;
  checked?: boolean;
  value?: any;
  defaultChecked?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  postCheckUpdate?: (val: boolean) => void;
  errorMessage?: string;
}

const FilterCheckBoxInput = ({
  parentClassName,
  conatinerClassName,
  inputClassName,
  labelClassName,
  inputLabel,
  inputKey,
  checked,
  value,
  defaultChecked,
  isDisabled,
  isReadOnly,
  onCheckedChange,
  postCheckUpdate,
}: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly) return;

    const value = event.target.checked;

    onCheckedChange?.(value);
    postCheckUpdate?.(value);
  };

  return (
    <div className={cn("flex flex-col items-start gap-1", parentClassName)}>
      <span className={cn("flex items-center gap-2", conatinerClassName)}>
        <span className="flex">
          <input
            type="checkbox"
            id={`${inputKey}-check`}
            checked={checked}
            value={value}
            defaultChecked={defaultChecked}
            disabled={isDisabled}
            onChange={handleChange}
            className={cn(
              "h-5 w-5 cursor-pointer accent-white",
              "appearance-none",
              "border border-icon-grey bg-white rounded-xs text-white",
              "checked:bg-white checked:border-icon-grey",
              "disabled:cursor-not-allowed",

              // Pseudo-element base
              "checked:before:content-[''] checked:before:block checked:before:w-full checked:before:h-full",
              "checked:before:bg-center checked:before:bg-no-repeat",

              // Enabled → red tick
              `checked:before:bg-[url("data:image/svg+xml,%3Csvg%20width='10'%20height='9'%20viewBox='0%200%208%206'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M0.75%202.74999L2.74765%204.75L6.75%200.75'%20stroke='%23C4161C'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3C/svg%3E")]`,

              // Disabled → grey tick
              `disabled:checked:before:bg-[url("data:image/svg+xml,%3Csvg%20width='9.5'%20height='8'%20viewBox='0%200%208%206'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M0.75%202.74999L2.74765%204.75L6.75%200.75'%20stroke='%23AAAAAA'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3C/svg%3E")]`,
              inputClassName
            )}
          />
        </span>

        <label
          htmlFor={`${inputKey}-check`}
          className={cn(
            "cursor-pointer select-none font-medium text-base",
            isDisabled && "cursor-not-allowed text-icon-grey",
            labelClassName
          )}
        >
          {inputLabel}
        </label>
      </span>
    </div>
  );
};

export default FilterCheckBoxInput;
