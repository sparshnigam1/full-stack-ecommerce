import CustomTooltip from "@/components/common/customTooltip";
import PencilLineIcon from "@/components/icons/pencilLineIcon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ReactNode, RefObject } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { LuCircleAlert } from "react-icons/lu";

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
  startIcon?: ReactNode;
}

const TextInput = <T extends FieldValues>({
  control,
  inputLabel,
  placeholder,
  inputKey,
  additionalInfo,
  inputRef,
  isDisabled,
  isRequired,
  startIcon,
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
        render={({ field, fieldState: { error } }) => (
          <div className="w-full flex flex-col gap-2">
            <div className="relative">
              {!!startIcon && startIcon}
              {!startIcon && (
                <span className="inline-block absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <PencilLineIcon />
                </span>
              )}
              <Input
                id={inputKey}
                placeholder={placeholder || inputLabel}
                disabled={isDisabled}
                className={cn("pl-10", !!additionalInfo && "pr-10")}
                isError={!!error?.message}
                {...field}
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

export default TextInput;
