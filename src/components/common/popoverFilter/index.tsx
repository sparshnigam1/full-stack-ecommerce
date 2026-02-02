import FilterIcon from "@/components/icons/filterIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toTitleCase } from "@/helpers/uiHelpers";
import { useFilters } from "@/hooks/useFilters";
import { cn } from "@/lib/utils";
import { FilterConfig, FilterState, FilterTypeEnum } from "@/types/filters";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { FilterCalenderInput } from "../customInputs/filterInputs/filterCalenderInput";
import FilterCheckBoxInput from "../customInputs/filterInputs/filterCheckBoxInput";
import RadioGroupInput from "../customInputs/filterInputs/filterRadioGroupInput";

interface Props {
  filters: FilterConfig[];
}

const PopoverFilter = ({ filters }: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(filters[0]?.key);
  const { appliedValues, applyFilters, appliedCount, resetAll } =
    useFilters(filters);
  const [draftValues, setDraftValues] = useState<FilterState>(appliedValues);

  const tabTriggerClassName =
    "w-full px-2 md:px-3 py-3 md:py-4 text-sm font-medium cursor-pointer flex items-center justify-between gap-1 md:gap-3 min-h-auto h-auto";
  const checkboxLabelClassName = "text-sm text-dark-grey";

  const filterKeys = filters.map((f) => f.key);
  const activeFilter = filters.find((f) => f.key === activeKey);

  const hasDraftValue = Boolean(draftValues[activeKey]);

  const getFilterCount = (filter: FilterConfig) => {
    const value = draftValues[filter.key];

    if (!value) return 0;

    switch (filter.filterType) {
      case FilterTypeEnum.MULTI_SELECT:
        return Array.isArray(value) ? value.length : 0;

      case FilterTypeEnum.DATE_RANGE:
        return (value as DateRange)?.from ? 1 : 0;

      case FilterTypeEnum.DATE:
      case FilterTypeEnum.SELECT:
      case FilterTypeEnum.NUMBER:
        return 1;

      default:
        return 0;
    }
  };

  const renderFilter = () => {
    if (!activeFilter) return null;

    switch (activeFilter.filterType) {
      case FilterTypeEnum.SELECT:
        return (
          <RadioGroupInput
            inputLabel=""
            labelClassName="m-0"
            optionsContainerClassName="grid md:grid-cols-2 gap-4"
            inputLabelTextClassName={checkboxLabelClassName}
            value={draftValues[activeFilter.key] as string}
            options={activeFilter.options}
            onChange={(value: string) =>
              setDraftValues((prev) => ({
                ...prev,
                [activeFilter.key]: value,
              }))
            }
          />
        );

      case FilterTypeEnum.MULTI_SELECT:
        return (
          <div className="grid md:grid-cols-2 gap-4">
            {activeFilter.options.map((option) => {
              const selected =
                (draftValues[activeFilter.key] as string[]) ?? [];

              return (
                <FilterCheckBoxInput
                  key={option.value}
                  inputKey={option.value}
                  checked={selected.includes(option.value)}
                  onCheckedChange={(checked) =>
                    setDraftValues((prev) => {
                      const selected =
                        (prev[activeFilter.key] as string[]) ?? [];

                      return {
                        ...prev,
                        [activeFilter.key]: checked
                          ? [...selected, option.value]
                          : selected.filter((v) => v !== option.value),
                      };
                    })
                  }
                  inputLabel={option.label}
                  labelClassName={checkboxLabelClassName}
                />
              );
            })}
          </div>
        );

      case FilterTypeEnum.DATE:
        return (
          <FilterCalenderInput
            align="end"
            mode="single"
            inputButtonClassName="w-full max-w-none gap-1 md:gap-2 px-1.5 md:px-3.5"
            label={activeFilter?.title}
            value={draftValues[activeFilter.key] as Date}
            onChange={(value) =>
              setDraftValues((prev) => ({
                ...prev,
                [activeFilter.key]: value,
              }))
            }
          />
        );

      case FilterTypeEnum.DATE_RANGE:
        return (
          <FilterCalenderInput
            align="end"
            mode="range"
            inputButtonClassName="w-full max-w-none gap-1 md:gap-2 px-1.5 md:px-3.5"
            label={activeFilter?.title}
            value={draftValues[activeFilter.key] as DateRange}
            onChange={(value) =>
              setDraftValues((prev) => ({
                ...prev,
                [activeFilter.key]: value,
              }))
            }
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    if (isPopoverOpen) {
      setDraftValues(appliedValues);
    }
  }, [isPopoverOpen, appliedValues]);

  return (
    <>
      {filters?.length > 2 && (
        <div className="hidden lg:block h-full">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger
              className={cn(
                "relative flex items-center justify-center gap-2 px-3 h-full rounded-lg bg-white border-2 border-border-grey  hover:shadow-elevation-2 focus-visible:border-2 focus-visible:border-border-grey focus-visible:ring-3 focus-visible:ring-ring focus-visible:bg-transparent active:bg-primary-lightest cursor-pointer"
              )}
            >
              {appliedCount > 0 && (
                <Badge className="absolute -top-2 -right-2 outline-3 outline-white bg-primary text-white text-xs p-1 rounded-full aspect-square">
                  {appliedCount}
                </Badge>
              )}
              <FilterIcon className="size-4.5" />
            </PopoverTrigger>

            <PopoverContent
              align="end"
              className="rounded-2xl bg-white border-2 border-border-grey flex flex-col gap-2 w-220"
            >
              <div className="flex items-center justify-between gap-6">
                <h4 className="text-base">Filter By</h4>
                <Button
                  className="text-sm"
                  size="small"
                  onClick={() => setDraftValues({})}
                >
                  Reset All
                </Button>
              </div>
              <div className="w-full grid grid-cols-[4fr_9fr] overflow-hidden gap-6 justify-between">
                {/* LEFT SIDE */}
                <div className="w-full h-full rounded-lg flex flex-col p-0 bg-primary-white/65">
                  {filters.map((f, i) => {
                    const count = getFilterCount(f);
                    return (
                      <div
                        key={f.key}
                        onClick={() => setActiveKey(f.key)}
                        className={cn(
                          tabTriggerClassName,
                          f.key == activeKey &&
                            "bg-primary-lightest/40 text-sm text-primary font-bold",
                          i == 0 && "rounded-t-lg"
                          // i == filters?.length - 1 && "rounded-b-lg"
                        )}
                      >
                        {f.title}
                        {count > 0 && (
                          <Badge className="bg-primary text-white text-xs p-1.5 rounded-full aspect-square">
                            {count}
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full bg-white flex flex-col gap-6 h-85">
                  {/* FILTER OPTIONS */}
                  <div className="w-full h-full bg-white flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-4">
                      <div className="w-full flex items-center justify-between">
                        <p className="font-semibold text-base">
                          {toTitleCase(activeKey)}
                        </p>
                        <Button
                          className="text-sm"
                          size="small"
                          onClick={() =>
                            setDraftValues((prev) => ({
                              ...prev,
                              [activeKey]: undefined,
                            }))
                          }
                        >
                          Reset
                        </Button>
                      </div>
                      <div className="max-h-65 overflow-y-auto">
                        {renderFilter()}
                      </div>
                    </div>
                    <Button
                      // disabled={!hasDraftValue}
                      variant="primary"
                      size="extra-small"
                      onClick={() => {
                        setIsPopoverOpen(false);
                        applyFilters(draftValues);
                        setIsPopoverOpen(false);
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
      <div className="block lg:hidden h-full">
        <Drawer>
          <DrawerTrigger
            asChild
            className={cn(
              "relative flex items-center justify-center gap-2 px-3 h-full rounded-lg bg-white border-2 border-border-grey  hover:shadow-elevation-2 focus-visible:border-2 focus-visible:border-border-grey focus-visible:ring-3 focus-visible:ring-ring focus-visible:bg-transparent active:bg-primary-lightest cursor-pointer"
            )}
          >
            <div
              className={cn(
                "relative flex items-center justify-center gap-2 px-3 h-full rounded-lg bg-white border-2 border-border-grey  hover:shadow-elevation-2 focus-visible:border-2 focus-visible:border-border-grey focus-visible:ring-3 focus-visible:ring-ring focus-visible:bg-transparent active:bg-primary-lightest cursor-pointer"
              )}
            >
              {appliedCount > 0 && (
                <Badge className="absolute -top-2 -right-2 outline-3 outline-white bg-primary text-white text-xs p-1 rounded-full aspect-square">
                  {appliedCount}
                </Badge>
              )}
              <FilterIcon className="size-4.5" />
            </div>
          </DrawerTrigger>
          <DrawerContent
            className="bg-white border-2 border-border-grey flex flex-col p-3 md:p-4 gap-2 w-full"
            toggleIconClassName="h-1 my-0 bg-primary mx-auto"
          >
            <DrawerHeader className="flex flex-row items-center justify-between gap-6 p-0">
              <DrawerTitle className="text-base">Filter By</DrawerTitle>
              <DrawerDescription>
                <Button
                  className="text-sm px-3 md:px-7 min-w-none"
                  size="small"
                  onClick={() => setDraftValues({})}
                >
                  Reset All
                </Button>
              </DrawerDescription>
            </DrawerHeader>
            <div
              className={cn(
                "w-full overflow-hidden gap-3 md:gap-6 justify-between min-h-105",
                "grid grid-cols-[5fr_9fr] md:grid-cols-[4fr_9fr]"
              )}
            >
              {/* LEFT SIDE */}
              <div className="min-w-30 w-full h-full rounded-lg flex flex-col p-0 bg-primary-white/65 max-h-115 overflow-y-auto overflow-x-hidden">
                {filters.map((f, i) => {
                  const count = getFilterCount(f);
                  return (
                    <div
                      key={f.key}
                      onClick={() => setActiveKey(f.key)}
                      className={cn(
                        tabTriggerClassName,
                        f.key == activeKey &&
                          "bg-primary-lightest/40 text-primary font-semibold",
                        i == 0 && "rounded-t-lg"
                        // i == filters?.length - 1 && "rounded-b-lg"
                      )}
                    >
                      {f.title}
                      {count > 0 && (
                        <Badge className="bg-primary text-white text-xs p-1 md:p-1.5 rounded-full aspect-square">
                          {count}
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* RIGHT SIDE */}
              <div className="bg-white flex flex-col gap-6 overflow-hidden">
                {/* FILTER OPTIONS */}
                <div className="w-full h-full bg-white flex flex-col justify-between gap-4">
                  <div className="w-full flex flex-col gap-2 md:gap-4">
                    <div className="w-full flex items-center justify-between">
                      <h5 className="text-sm md:text-sm font-semibold">
                        {toTitleCase(activeKey)}
                      </h5>
                      <Button
                        className="text-sm px-3 md:px-7 min-w-none"
                        size="small"
                        onClick={() =>
                          setDraftValues((prev) => ({
                            ...prev,
                            [activeKey]: undefined,
                          }))
                        }
                      >
                        Reset
                      </Button>
                    </div>
                    <div className="w-full max-h-80 overflow-y-auto">
                      {renderFilter()}
                    </div>
                  </div>
                  <DrawerClose
                    variant="primary"
                    size="extra-small"
                    onClick={() => {
                      applyFilters(draftValues);
                      setIsPopoverOpen(false);
                    }}
                  >
                    Apply
                  </DrawerClose>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default PopoverFilter;
