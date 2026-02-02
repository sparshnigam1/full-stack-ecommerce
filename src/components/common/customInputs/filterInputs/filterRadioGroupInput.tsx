"use client";

import CustomTooltip from "@/components/common/customTooltip";
import { cn } from "@/lib/utils";
import { RefObject } from "react";
import { LuCircleAlert } from "react-icons/lu";

export interface RadioOption {
  label: string;
  value: string;
}

interface Props {
  inputLabel: string;
  value?: string;
  onChange: (value: string) => void;

  options: RadioOption[];

  inputRef?: RefObject<any>;
  isRequired?: boolean;
  additionalInfo?: string;
  isDisabled?: boolean;
  labelClassName?: string;
  inputLabelTextClassName?: string;
  optionsContainerClassName?: string;
  errorMessage?: string;
}

const RadioGroupInput = ({
  inputLabel,
  value,
  onChange,
  options,
  additionalInfo,
  inputRef,
  isDisabled,
  isRequired,
  labelClassName,
  inputLabelTextClassName,
  optionsContainerClassName,
  errorMessage,
}: Props) => {
  const inputLabelClassName = cn(
    "flex items-center gap-2 cursor-pointer text-black font-medium",
    isDisabled && "cursor-not-allowed text-icon-grey"
  );

  const inputClassName = cn(
    "h-5 w-5 cursor-pointer rounded-full",
    "appearance-none relative",
    "border border-icon-grey bg-white",
    "disabled:cursor-not-allowed",
    "checked:bg-white checked:border-icon-grey",

    // inner dot
    "checked:before:content-[''] checked:before:absolute",
    "checked:before:top-1/2 checked:before:left-1/2",
    "checked:before:-translate-x-1/2 checked:before:-translate-y-1/2",
    "checked:before:w-2 checked:before:h-2 checked:before:rounded-full",
    "checked:before:bg-primary",
    "disabled:checked:before:bg-icon-grey"
  );

  return (
    <div ref={inputRef || null}>
      {/* Label */}
      <div
        className={cn(
          "text-sm text-dark-grey mb-4 flex items-center justify-between",
          labelClassName
        )}
      >
        <label className="font-semibold">
          {inputLabel}
          {isRequired && <span className="text-red">*</span>}
        </label>

        {additionalInfo && (
          <CustomTooltip
            trigger={
              <LuCircleAlert
                className={cn(
                  "text-icon-grey text-base",
                  errorMessage && "text-red"
                )}
              />
            }
          >
            {additionalInfo}
          </CustomTooltip>
        )}
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2">
        <div className={cn("flex flex-wrap gap-4", optionsContainerClassName)}>
          {options.map((option) => (
            <label key={option.value} className={inputLabelClassName}>
              <span className="flex">
                <input
                  type="radio"
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => onChange(option.value)}
                  disabled={isDisabled}
                  className={inputClassName}
                />
              </span>
              <span
                className={cn(
                  "select-none font-medium text-base",
                  inputLabelTextClassName
                )}
              >
                {option.label}
              </span>
            </label>
          ))}
        </div>

        {errorMessage && <p className="text-red text-sm">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default RadioGroupInput;
