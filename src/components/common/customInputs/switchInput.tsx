import { Switch } from "@/components/ui/switch";
import { RefObject } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  inputLabel: string;
  inputKey: string;
  placeholder?: string;
  inputRef?: RefObject<any>;
  isRequired?: boolean;
  additionalInfo?: string;
  isDisabled?: boolean;
}

const SwitchInput = <T extends FieldValues>({
  control,
  inputKey,
  inputLabel,
  isDisabled,
  isRequired,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={inputKey as Path<T>}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <div className="flex flex-col gap-1" ref={ref || null}>
          <div className="flex items-center justify-between">
            <label
              htmlFor={`${inputKey}-switch`}
              className="text-sm font-medium"
            >
              {inputLabel}
              {isRequired && <span className="text-red">*</span>}
            </label>

            <Switch
              id={`${inputKey}-switch`}
              checked={!!value}
              onCheckedChange={(checked) =>
                onChange(checked as PathValue<T, Path<T>>)
              }
              disabled={isDisabled}
            />
          </div>

          {!!error?.message && (
            <p className="text-red-600 text-sm">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default SwitchInput;
