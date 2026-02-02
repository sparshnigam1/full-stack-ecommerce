import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { RefObject } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { LuCalendar } from "react-icons/lu";

interface Props<T extends FieldValues> {
  control: Control<T>;
  inputLabel: string;
  inputKey: string;
  inputRef?: RefObject<any>;
  isRequired?: boolean;
  isDisabled?: boolean;
  enablePastDate?: boolean;
  disableFutureDate?: boolean;
  maxDate?: string;
}

const DateInput = <T extends FieldValues>({
  control,
  inputLabel,
  inputKey,
  inputRef,
  isDisabled,
  isRequired,
  disableFutureDate,
  enablePastDate,
  maxDate,
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
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="w-full flex flex-col gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!value}
                  className={cn(
                    "w-full justify-start text-left font-normal px-3.5 shadow-light text-black hover:bg-white active:text-black active:bg-white rounded-md border border-border-grey bg-white [&_svg]:rotate-0! focus-visible:border focus-visible:border-border-grey focus-visible:bg-white data-[empty=true]:text-light-grey disabled:text-icon-grey! disabled:shadow-light! disabled:bg-body-background!",
                    !!error?.message && "border-primary-lightest!"
                  )}
                  disabled={isDisabled}
                >
                  <LuCalendar className="mr-1 h-4 w-4 text-icon-grey" />
                  {value ? (
                    format(value, "PPP")
                  ) : (
                    <span className="text-icon-grey">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0 bg-white border border-border-grey rounded-md">
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={value}
                  onSelect={(selectedDate) => onChange(selectedDate)}
                  disabled={(date) =>
                    (!enablePastDate && date < new Date()) ||
                    (!!disableFutureDate && date > new Date()) ||
                    (maxDate ? date > new Date(maxDate as string) : false)
                  }
                />
              </PopoverContent>
            </Popover>
            {error?.message && (
              <p className="text-red text-sm">{error?.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default DateInput;
