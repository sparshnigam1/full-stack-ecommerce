"use client";

import { cn } from "@/lib/utils";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  inputKey: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  fields: { label: string; value: string }[];
}

const SingleSelectCheckBox = <T extends FieldValues>({
  control,
  inputKey,
  isDisabled,
  fields,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={inputKey as Path<T>}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="flex flex-col gap-2">
          {fields.map((item) => {
            const checked = value === item.value;
            const id = `${inputKey}-${item.value}`;

            return (
              <label
                key={item.value}
                htmlFor={id}
                className={cn(
                  "flex items-center gap-2 cursor-pointer select-none text-sm w-max max-w-full",
                  isDisabled && "cursor-not-allowed text-icon-grey"
                )}
              >
                <span>
                  <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    disabled={isDisabled}
                    onChange={() =>
                      onChange(
                        checked
                          ? (undefined as PathValue<T, Path<T>>)
                          : (item.value as PathValue<T, Path<T>>)
                      )
                    }
                    className={cn(
                      "h-4.5! w-4.5! cursor-pointer accent-white",
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
                <span className="-translate-y-0.5">{item.label}</span>
              </label>
            );
          })}

          {!!error?.message && (
            <p className="text-red text-sm">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default SingleSelectCheckBox;
