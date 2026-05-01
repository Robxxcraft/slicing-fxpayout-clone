import Table from "@/components/TableLayout";
import { 
  flexRender, 
  type Table as ReactTable
} from "@tanstack/react-table";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { HiChevronUpDown } from "react-icons/hi2";
import type { DataTradersAdmin } from "@/pages/dashboard/admin/TradersManagement";

const TableTraderAdmin = ({
  tableInstance,
  isLoading
}: {
  tableInstance: ReactTable<DataTradersAdmin>;  
  isLoading: boolean;
}) => {
  const dataTraders = tableInstance.getRowModel().rows;
  return (
    <Table isLoading={isLoading} className={`mt-0!`}>
      <thead>
        {tableInstance.getHeaderGroups().map((headerEl) => {
          const baseStyle = "py-4! md:py-3! text-nowrap font-medium! text-sm! 2xl:text-lg!";

          return (
            <tr key={headerEl.id}>
              {headerEl.headers.map((cellEl) => {
                const isSorted = cellEl.column.getIsSorted();
                const isSelectRow = cellEl.column.id === "select";
                const canSorting = cellEl.column.getCanSort();

                return (
                  <Table.HeadingItem
                    key={cellEl.id}
                    className={`${baseStyle} ${isSelectRow ? "px-2!":""}
                      ${cellEl.index === headerEl.headers.length - 1 ? "px-2! text-right!" : "text-left!"}
                      ${cellEl.index === 1 ? "px-0! pl-2! pr-8!":""}
                      ${canSorting ? "cursor-pointer":""}
                      select-none
                    `}
                    handleClick={canSorting && !isLoading ? cellEl.column.getToggleSortingHandler() : undefined}
                  >
                    <div className={`flex justify-between items-center
                      ${cellEl.index === headerEl.headers.length - 1 ? "justify-end" : "justify-between"}
                    `}>
                     <span className="whitespace-nowrap">
                         {flexRender(
                         cellEl.column.columnDef.header,
                         cellEl.getContext()
                         )}
                     </span>
                     {canSorting && (!isSelectRow && 
                       <div className="shrink-0">
                         {isSorted === "asc" ? <IoChevronDown className="text-[12px] text-black/80" />
                         : isSorted === "desc" ? <IoChevronUp className="text-[12px] text-black/80" />
                         : <HiChevronUpDown className="text-lg text-black/80" />}
                       </div>)
                     }
                    </div>
                  </Table.HeadingItem>
                )
              })}
            </tr>
          )
        })}
      </thead>

      <Table.Body>
        {dataTraders.length > 0 &&
          dataTraders.map((rowEl, rowIndex) => (
            <Table.Row key={rowEl.id}>
              {rowEl.getVisibleCells().map((cellEl, cellIndex) => {
                const baseStyle = "py-2! text-nowrap align-middle! group-hover:bg-gray-200";
                const isSelectRow = cellEl.column.id === "select";

                return (
                  <Table.Cell
                    key={cellEl.id}
                    rowIndex={rowIndex}
                    className={`${baseStyle} ${isSelectRow ? "px-2!":""}
                      ${cellIndex === rowEl.getVisibleCells().length - 1 ? "px-2! text-right!" : "text-left!"}
                      ${cellIndex === 1 ? "px-0! pl-2! pr-8!" : ""} 2xl:text-xl!
                    `}
                  >
                    {flexRender(
                      cellEl.column.columnDef.cell,
                      cellEl.getContext()
                    )}
                  </Table.Cell>
                )
              })}
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
  )
}

export default TableTraderAdmin;
