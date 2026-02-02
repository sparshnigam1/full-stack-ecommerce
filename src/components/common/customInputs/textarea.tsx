import { cn } from "@/lib/utils";
import { RefObject } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  inputLabel: string;
  inputKey: string;
  placeholder?: string;
  inputRef?: RefObject<any>;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

const Textarea = <T extends FieldValues>({
  control,
  inputLabel,
  placeholder,
  inputKey,
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
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <div className="w-full flex flex-col gap-2">
            <textarea
              id={inputKey}
              ref={ref}
              value={value || ""}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder || inputLabel}
              disabled={isDisabled}
              rows={5}
              className={cn(
                "w-full rounded-md border border-border-grey bg-white px-3.5 py-2.5 text-sm resize-y shadow-light outline-none placeholder:text-icon-grey focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:bg-body-background disabled:text-icon-grey",
                error?.message && "border-primary-lightest"
              )}
            />
            {error?.message && (
              <p className="text-red text-sm">{error?.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default Textarea;
