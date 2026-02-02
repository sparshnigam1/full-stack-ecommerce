"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Props {
  triggerClassName?: string;
  valueClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  labelId?: string;
  placeholder?: string;
  value?: string;
  setValue: (val: string) => void;
  options: { label: string; value: string }[];
}

const CustomDropdown = ({
  labelId,
  placeholder = "Select",
  value,
  options,
  setValue,
  triggerClassName,
  valueClassName,
  contentClassName,
  itemClassName,
}: Props) => {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger
        id={labelId}
        className={cn(
          "bg-white",
          "data-placeholder:text-icon-grey",
          triggerClassName
        )}
      >
        <SelectValue placeholder={placeholder} className={valueClassName} />
      </SelectTrigger>
      <SelectContent className={cn("w-full", contentClassName)}>
        {options.map((opt) => (
          <SelectItem
            value={opt.value}
            key={opt.value}
            className={itemClassName}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomDropdown;
