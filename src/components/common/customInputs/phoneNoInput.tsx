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
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface Props<T extends FieldValues> {
  control: Control<T>;
  inputLabel: string;
  inputKey: string;
  placeholder?: string;
  inputRef?: RefObject<any>;
  isRequired?: boolean;
  additionalInfo?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

const PhoneNoInput = <T extends FieldValues>({
  control,
  inputLabel,
  placeholder,
  inputKey,
  additionalInfo,
  inputRef,
  isDisabled,
  isRequired,
}: Props<T>) => {
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
      </div>

      <Controller
        control={control}
        name={inputKey as Path<T>}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => (
          <div className="w-full flex flex-col gap-2">
            <div className="relative w-full flex flex-col">
              <PhoneInput
                defaultCountry="ca"
                value={value || ""}
                onChange={(phone) => onChange(phone as PathValue<T, Path<T>>)}
                disabled={isDisabled}
                placeholder={placeholder}
                inputClassName={cn(
                  "!w-full !rounded-r-md !border !border-border-grey !bg-white  !px-3.5 !py-2.5 !text-base !focus-visible:border-ring !focus-visible:ring-ring/50 !focus-visible:ring-[3px] !h-12 font-poppins!",
                  !!isDisabled &&
                    "!bg-body-background cursor-not-allowed! text-icon-grey!",
                  !!additionalInfo && "!pr-10",
                  !!error?.message && "!border-primary-lightest"
                )}
                className="w-full! rounded-md! shadow-light!"
                countrySelectorStyleProps={{
                  buttonClassName: cn(
                    "rounded-l-md! h-12! py-1.5! pr-2! pl-3!",
                    !!isDisabled && "!bg-body-background cursor-not-allowed!",
                    !!error?.message && "border-primary-lightest!"
                  ),
                }}
                ref={ref}
              />
              {additionalInfo && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                  <CustomTooltip
                    trigger={
                      <LuCircleAlert
                        className={cn(
                          "text-icon-grey text-md",
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
            {error?.message && (
              <p className="text-red text-sm">{error?.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default PhoneNoInput;
