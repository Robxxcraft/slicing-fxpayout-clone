import type { ValidationData } from "@/models/validationData";
import Table from "../TableLayout";
import { 
  flexRender, 
  type Table as ReactTable
} from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import Spinner from "../ui/Spinner";

// ! FITUR:
// ! [1] SORTING TIAP KOLOM
// ! [2] FILTERING/SEARCH KE DATABASE
// ! [3] PAGINATION
// ! [4] HIDE KOLOM
// ! [5] SELECTION ROW DATA
// ! [6] DELETE 1 DATA
// ! [7] DELETE MANY DATA
// ! [8] EDIT DATA
// ! [9] IMPORT BY CSV
// ! [10] SORTING BY BROKER
// ! [11] FORM POST DATA
// ! [12] Visualisasi rebate & status

// TODO: SELECTION STATUS VALIDATION

const TableValData = ({ 
  tableInstance,
  isLoading,
  isInitialLoad
}: { 
  tableInstance: ReactTable<ValidationData>;
  isLoading: boolean;
  isInitialLoad: boolean;
}) => {
  const dataRows = tableInstance.getRowModel().rows;
  return (
    <>
      <Table className={`${dataRows.length > 0 ? "h-full" : "h-fit"}
        mt-0! rounded-none! border-[#A9A9A9]! max-w-fit border-separate border-spacing-0
      `}>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((cellEl) => {
                  const isSorted = cellEl.column.getIsSorted();
                  const isSelectRow = cellEl.column.id === "select";
                  return (
                  <Table.HeadingItem 
                    key={cellEl.id}
                    className={` ${isSelectRow ? "px-2! py-2! left-0 z-8" : "px-4! py-2! min-w-[180px] max-w-60"}
                      sticky top-0 border-r border-b border-[#A9A9A9] bg-gray-200 cursor-pointer shadow-[inset_-1px_0_0_0_#A9A9A9,inset_0_-1px_0_0_#A9A9A9]`}
                    handleClick={isLoading ? undefined : cellEl.column.getToggleSortingHandler()}
                  >
                    <div className="flex justify-between items-center gap-2">
                      <span className="whitespace-nowrap font-normal">
                          {flexRender(
                          cellEl.column.columnDef.header,
                          cellEl.getContext()
                          )}
                      </span>
                      { !isSelectRow && 
                        (isSorted === "asc" ? <FaArrowUpLong className="text-[12px] text-black/80" />
                        : isSorted === "desc" ? <FaArrowDownLong className="text-[12px] text-black/80" />
                        : <LuArrowUpDown className="text-black/80" />)
                      }
                    </div>
                  </Table.HeadingItem>
                )})}
              </tr>
            )
          })}
        </thead>
        <Table.Body>
        {dataRows.length > 0 &&
          (dataRows.map((rowEl, rowIdx) => (
            <Table.Row key={rowEl.id}>
              {rowEl.getVisibleCells().map((cellEl) => {
                const isSelectRow = cellEl.column.id === "select";
                return (
                <Table.Cell 
                  key={cellEl.id}
                  rowIndex={rowIdx}
                  className={` ${isSelectRow ? "px-2! py-2! sticky left-0 z-8" : "px-4! py-2! min-w-[180px] max-w-60"}
                    border-r border-b border-[#A9A9A9] group-hover:bg-gray-100 cursor-pointer shadow-[inset_-1px_0_0_0_#A9A9A9,inset_0_-1px_0_0_#A9A9A9]`}
                >
                  <span className="block leading-normal whitespace-nowrap font-semibold">
                    {flexRender(
                      cellEl.column.columnDef.cell,
                      cellEl.getContext()
                    )}
                  </span>
                </Table.Cell>
              )})}
            </Table.Row>
          ))
        )}
        </Table.Body>
      </Table>
      {dataRows.length === 0 &&
        <div className="mt-4 flex flex-col items-center justify-center w-full h-fit">
          {isInitialLoad || isLoading ?
            <Spinner />
          :
            <>
              <img src="/not-found-data.webp" alt="Not Found" 
                className="w-60 h-auto object-contain"
              />
              <div className="text-center">
                <h3 className="text-lg font-medium text-black/60">Data Tidak Ditemukan</h3>
              </div>
            </>
          }
        </div>
      }
    </>
  )
}

export default TableValData;
