import CustomTooltip from "@/components/common/customTooltip";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EMAIL_DOMAINS } from "@/utils/constants";
import { RefObject, useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { LuCircleAlert, LuMail } from "react-icons/lu";

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

const EmailInput = <T extends FieldValues>({
  control,
  inputLabel,
  placeholder,
  inputKey,
  additionalInfo,
  inputRef,
  isDisabled,
  isRequired,
}: Props<T>) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

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
        }) => {
          const handleOnChange = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            const val = event.target.value;
            onChange(val as PathValue<T, Path<T>>);

            const atIndex = val.indexOf("@");
            if (atIndex > 0) {
              const typedDomain = val.slice(atIndex + 1);
              const filteredSuggestions = EMAIL_DOMAINS.filter(
                (domain) =>
                  domain.startsWith(typedDomain) && domain !== typedDomain
              );
              setSuggestions(filteredSuggestions);
            } else {
              setSuggestions([]);
            }
          };

          return (
            <div className="relative w-full flex flex-col gap-2">
              <div className="relative">
                <LuMail className="inline-block absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-lg text-icon-grey" />
                <Input
                  id={inputKey}
                  value={value}
                  onChange={handleOnChange}
                  onBlur={onBlur}
                  ref={ref}
                  placeholder={placeholder || inputLabel}
                  disabled={isDisabled}
                  isError={!!error?.message}
                  className={cn("pl-10", !!additionalInfo && "pr-10")}
                  autoComplete="new-email"
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

              {suggestions.length > 0 && (
                <ul className="w-full block absolute top-14 bg-white border border-border-grey rounded-md shadow-md z-50 list-none p-0 m-0">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        onChange(
                          (value.split("@")[0] + "@" + suggestion) as PathValue<
                            T,
                            Path<T>
                          >
                        );
                        setSuggestions([]);
                      }}
                      className="px-3 py-2 hover:bg-primary-white transition-all duration-300 cursor-pointer text-sm"
                    >
                      {value.split("@")[0]?.slice(0, 2) +
                        "*****" +
                        "@" +
                        suggestion}
                    </li>
                  ))}
                </ul>
              )}

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

export default EmailInput;
