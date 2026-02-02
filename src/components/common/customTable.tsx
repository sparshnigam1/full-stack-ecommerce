"use client";

import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";
import { Skeleton } from "../ui/skeleton";

interface Props {
  data: any[];
  columns: ColumnDef<any, any>[];
  isLoading?: boolean;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
}

const CustomTable = ({
  data,
  columns,
  isLoading,
  sorting,
  onSortingChange,
}: Props) => {
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    manualSorting: true,
    columnResizeMode: "onChange",
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),

    // defaultColumn: {
    //   size: 10,
    //   minSize: 10,
    //   maxSize: 300,
    // },
  });

  return (
    // Outer container handles the height and the scroll
    <div className="w-full flex-1 overflow-auto max-h-full mt-5 mb-2 pt-px px-px">
      <table className="w-full border-separate border-spacing-y-3 select-none">
        <thead className="sticky top-0 z-20 bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="rounded-std ring-1 ring-ring">
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    style={{ width: header.getSize() }}
                    className={cn(
                      "relative px-6 py-4 text-left text-sm font-semibold text-black first:rounded-l-std last:rounded-r-std bg-primary-white",
                      header.column.getCanSort() && "cursor-pointer"
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <span>
                        {isSorted === "asc" && (
                          <LuArrowUp className="text-primary" />
                        )}
                        {isSorted === "desc" && (
                          <LuArrowDown className="text-primary" />
                        )}
                      </span>
                    </div>
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={cn(
                          "absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none",
                          "bg-transparent hover:bg-primary/30",
                          header.column.getIsResizing() && "bg-primary"
                        )}
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="bg-white shadow-sm rounded-lg">
                  {table.getHeaderGroups()[0].headers.map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 border-y first:border-l last:border-r first:rounded-l-lg last:rounded-r-lg border-border-grey"
                    >
                      <Skeleton className="h-4 w-full rounded-md" />
                    </td>
                  ))}
                </tr>
              ))
            : table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="group bg-white transition-all hover:ring-1 hover:ring-primary shadow-sm rounded-lg"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                      }}
                      className="p-3 text-left text-sm font-normal text-black border-y first:border-l last:border-r first:rounded-l-lg last:rounded-r-lg border-border-grey"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
