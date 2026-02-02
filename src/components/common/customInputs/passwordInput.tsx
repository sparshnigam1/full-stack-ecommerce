import { InputPassword } from "@/components/ui/inputPassword";
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

const PasswordInput = <T extends FieldValues>({
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
        render={({ field, fieldState: { error } }) => (
          <div className="relative w-full flex flex-col gap-2">
            <InputPassword
              id={inputKey}
              placeholder={placeholder || inputLabel}
              disabled={isDisabled}
              isError={!!error?.message}
              autoComplete="new-password"
              className="pl-10"
              {...field}
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

export default PasswordInput;
