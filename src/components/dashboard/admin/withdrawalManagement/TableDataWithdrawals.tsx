import Table from "@/components/TableLayout";
import type { DataWithdrawalManagement } from "@/pages/dashboard/admin/WithdrawalRequestManagement";
import { 
  flexRender, 
  type Table as ReactTable
} from "@tanstack/react-table";
import { HiChevronUpDown } from "react-icons/hi2";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const TableDataWithdrawals = ({
  tableInstance,
  isLoading
}: {
  tableInstance: ReactTable<DataWithdrawalManagement>;  
  isLoading: boolean;
}) => {
  const dataRows = tableInstance.getRowModel().rows;
  return (
    <Table className="mt-0!">
      <thead>
        {tableInstance.getHeaderGroups().map((headerEl) => {
          const baseStyle = "py-4! md:py-3! text-nowrap font-medium! text-sm! 2xl:text-lg!";
          return (
            <tr key={headerEl.id}>
              {headerEl.headers.map((cellEl) => {
                const isSorted = cellEl.column.getIsSorted();
                const isSelectRow = cellEl.column.id === "select";
                return (
                  <Table.HeadingItem
                    key={cellEl.id}
                    className={`${baseStyle} ${isSelectRow ? "px-2!":""}
                      ${cellEl.index === cellEl.getSize() - 1 ? "text-right!" : "text-left!"}
                      ${cellEl.index === 1 ? "px-0! pl-2! pr-8!":""}
                      cursor-pointer select-none
                    `}
                    handleClick={isLoading ? undefined : cellEl.column.getToggleSortingHandler()}
                  >
                    <div className="flex justify-between items-center">
                     <span className="whitespace-nowrap">
                         {flexRender(
                         cellEl.column.columnDef.header,
                         cellEl.getContext()
                         )}
                     </span>
                     { !isSelectRow && 
                       <div className="shrink-0">
                         {isSorted === "asc" ? <IoChevronDown className="text-[12px] text-black/80" />
                         : isSorted === "desc" ? <IoChevronUp className="text-[12px] text-black/80" />
                         : <HiChevronUpDown className="text-lg text-black/80" />}
                       </div>
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
        {dataRows.length > 0 &&
        (dataRows.map((rowEl, rowIndex) => (
          <Table.Row key={rowEl.id}>
            {rowEl.getVisibleCells().map((cellEl, cellIndex) => {
              const baseStyle = "py-2! text-nowrap align-middle!";
              const isSelectRow = cellEl.column.id === "select";
              return (
                <Table.Cell
                  key={cellEl.id}
                  rowIndex={rowIndex}
                  className={`${baseStyle} ${isSelectRow ? "px-2!":""}
                    ${cellIndex === cellEl.column.depth - 1 ? "text-right!" : "text-left!"}
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
        )))}
      </Table.Body>
    </Table>
  )
}

export default TableDataWithdrawals;
