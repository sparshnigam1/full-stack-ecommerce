import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FilterConfig, FilterTypeEnum } from "@/types/filters";
import { ReactNode } from "react";
import {
  MdKeyboardArrowDown,
  MdOutlineFileDownload,
  MdOutlineFileUpload,
} from "react-icons/md";
import { FilterCalenderInput } from "../customInputs/filterInputs/filterCalenderInput";
import FilterSelectInput from "../customInputs/filterInputs/filterSelectInput";
import PeopleIcon from "../dashboardSidebar/icons/peopleIcon";
import GlobalSearch from "../globalSearch";
import PopoverFilter from "../popoverFilter";

interface Props {
  heading: string;
  headingIcon?: ReactNode;
  handleInputChange?: (value: string) => void;
  searchTerms?: string[];
  ActionButtons?: ReactNode;
  handleUpload?: () => void;
  handleDownload?: () => void;
  multiDownload?: boolean;
  multiDownloadOptions?: { title: string; handler: () => void }[];
  isDownloadLoading?: boolean;
  children?: ReactNode;
  defaultSearchValue?: string;
  filterationOptions?: { filters: FilterConfig[]; showOuter?: number };
}

const DashboardTop = ({
  heading,
  headingIcon,
  handleUpload,
  handleDownload,
  multiDownload,
  multiDownloadOptions,
  isDownloadLoading,
  ActionButtons,
  handleInputChange,
  searchTerms,
  children,
  defaultSearchValue,
  filterationOptions = { filters: [], showOuter: 2 },
}: Props) => {
  const showSearchBarAndActions =
    !!handleInputChange ||
    !!ActionButtons ||
    !!handleUpload ||
    !!multiDownload ||
    !!handleDownload;

  const topFilters = (filterationOptions?.filters ?? [])
    .slice() // optional, avoids mutating original array
    .sort(
      (a, b) =>
        (a.priority ?? Number.MAX_SAFE_INTEGER) -
        (b.priority ?? Number.MAX_SAFE_INTEGER)
    )
    .filter((elem) => elem.mostUsed)
    .slice(0, filterationOptions?.showOuter);

  return (
    <div className="w-full flex flex-col gap-3 md:gap-5">
      <div className="w-full flex flex-wrap items-center justify-between gap-2 lg:gap-4">
        <h4 className="w-max flex items-center gap-2 lg:gap-4">
          {headingIcon || (
            <PeopleIcon color="#C4161C" className="w-6 h-6 text-primary" />
          )}
          {heading}
        </h4>

        <div className="w-max flex flex-wrap-reverse items-center justify-end gap-2 lg:gap-4">
          <div className="hidden md:block">
            {!!ActionButtons && ActionButtons}
          </div>
          <div className="w-max h-10 flex items-center gap-4">
            {!!handleUpload && (
              <Button
                size="extra-small"
                className={cn(
                  "relative p-0 min-w-auto px-3 h-full rounded-lg border-border-grey",
                  "hover:[&_svg]:rotate-0 active:[&_svg]:rotate-0"
                )}
                variant="outline"
                onClick={handleUpload}
              >
                <MdOutlineFileUpload className="size-4.5" />
              </Button>
            )}
            {!!handleDownload && (
              <Button
                size="extra-small"
                className={cn(
                  "relative min-w-auto p-0 px-3 h-full rounded-lg border-border-grey",
                  "hover:[&_svg]:rotate-0 active:[&_svg]:rotate-0"
                )}
                variant="outline"
                onClick={handleDownload}
                isLoading={isDownloadLoading}
              >
                <MdOutlineFileDownload className="size-4.5" />
              </Button>
            )}
            {!!multiDownload && (
              <Popover>
                <PopoverTrigger
                  className={cn(
                    "relative flex items-center justify-center gap-2 px-3 h-full rounded-lg bg-white border-2 border-border-grey text-primary hover:bg-primary-white hover:shadow-elevation-2 focus-visible:border-2 focus-visible:border-border-grey focus-visible:ring-3 focus-visible:ring-ring focus-visible:bg-transparent active:bg-primary-lightest cursor-pointer"
                  )}
                >
                  <MdOutlineFileDownload className="size-4.5" />
                  <MdKeyboardArrowDown className="size-4 text-icon-grey" />
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="rounded-2xl bg-white border-2 border-border-grey text-primary"
                >
                  {multiDownloadOptions?.map((elem, i) => (
                    <p
                      key={i + 1}
                      className={cn(
                        "py-2 px-3 text-dark-grey cursor-pointer rounded-md transition-all duration-150",
                        "hover:bg-primary-white hover:text-primary hover:font-semibold focus-visible:bg-primary-white focus-visible:text-primary focus-visible:font-semibold"
                      )}
                      onClick={elem?.handler}
                    >
                      {elem?.title}
                    </p>
                  ))}
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        <div className="w-full block md:hidden">
          {!!ActionButtons && ActionButtons}
        </div>
      </div>

      {showSearchBarAndActions && (
        <div className="flex items-center justify-between gap-4">
          {!!handleInputChange && (
            <GlobalSearch
              searchTerms={searchTerms || []}
              onChange={handleInputChange}
              defaultVal={defaultSearchValue}
            />
          )}

          <div className="w-max md:w-full h-full max-h-10 flex flex-wrap items-center justify-end gap-4">
            {children}
            <div className="hidden xl:flex w-max h-full items-center justify-end gap-4">
              {topFilters?.map((elem, i) => getFilter({ ...elem, key: i + 1 }))}
            </div>
            <PopoverFilter filters={filterationOptions?.filters} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTop;

export const ActionButtonsWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("flex items-center flex-wrap gap-2 lg:gap-4", className)}
    >
      {children}
    </div>
  );
};

const getFilter = ({ filterType, ...filter }: any) => {
  switch (filterType) {
    case FilterTypeEnum.SELECT:
      return (
        <FilterSelectInput
          key={filter?.key}
          inputLabel={filter?.title}
          value={filter?.selectedOptions}
          onChange={filter?.handler}
          menuItems={filter?.options}
        />
      );
    case FilterTypeEnum.MULTI_SELECT:
      return (
        <FilterSelectInput
          key={filter?.key}
          isMultiSelect
          inputLabel={filter?.title}
          value={filter?.selectedOptions}
          onChange={filter?.handler}
          menuItems={filter?.options}
        />
      );
    case FilterTypeEnum.DATE:
      return (
        <FilterCalenderInput
          align="end"
          key={filter?.key}
          label={filter?.title}
          mode="single"
          value={filter?.selectedOptions}
          onChange={filter?.handler}
        />
      );
    case FilterTypeEnum.DATE_RANGE:
      return (
        <FilterCalenderInput
          align="end"
          key={filter?.key}
          label={filter?.title}
          mode="range"
          value={filter?.selectedOptions}
          onChange={filter?.handler}
        />
      );

    default:
      return null;
  }
};
