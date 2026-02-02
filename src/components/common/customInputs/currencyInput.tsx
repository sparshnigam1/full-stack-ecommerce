import CustomTooltip from "@/components/common/customTooltip";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/helpers/uiHelpers";
import { cn } from "@/lib/utils";
import { RefObject } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { LuCircleAlert } from "react-icons/lu";
import { TbCurrencyDollarCanadian } from "react-icons/tb";

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
  step?: string | number;
}

const CurrencyInput = <T extends FieldValues>({
  control,
  inputLabel,
  placeholder,
  inputKey,
  additionalInfo,
  inputRef,
  isDisabled,
  isRequired,
  step,
}: Props<T>) => {
  return (
    <div ref={inputRef || null}>
      <div
        id={`${inputLabel}-label`}
        className="text-sm text-dark-grey mb-2 flex items-center justify-between"
      >
        <label htmlFor={inputKey} className="font-semibold">
          {inputLabel}
          {isRequired && <span className="text-red">*</span>}
        </label>
      </div>

      <Controller
        control={control}
        name={inputKey as Path<T>}
        render={({ field, fieldState: { error } }) => {
          const displayValue =
            field.value === null || field.value === undefined
              ? ""
              : formatCurrency(field.value);

          return (
            <div className="w-full flex flex-col gap-2">
              <div className="relative">
                <TbCurrencyDollarCanadian className="inline-block absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-lg text-icon-grey" />
                <Input
                  id={inputKey}
                  type="number"
                  step={step || 0.01}
                  min={0}
                  placeholder={placeholder || inputLabel}
                  disabled={isDisabled}
                  className={cn("pl-10", !!additionalInfo && "pr-10")}
                  isError={!!error?.message}
                  {...field}
                  onChange={(e) => {
                    const parsedValue = parseFloat(e.target.value);
                    return field.onChange(
                      isNaN(parsedValue) ? null : parsedValue
                    );
                  }}
                  value={Number(field.value) || ""}
                />

                {additionalInfo && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
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
          );
        }}
      />
    </div>
  );
};

export default CurrencyInput;
