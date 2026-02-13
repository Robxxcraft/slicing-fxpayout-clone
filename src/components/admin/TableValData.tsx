import type { ValidationData } from "@/models/validationData";
import Table from "../TableLayout";
import { 
  flexRender, 
  type Table as ReactTable
} from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import Spinner from "../ui/Spinner";

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
                    className={` ${isSelectRow ? "px-2! py-2! left-0 z-8" : "px-2! py-2! min-w-60 max-w-[300px]"}
                      sticky top-0 border-r border-b border-[#A9A9A9] bg-gray-200 cursor-pointer shadow-[inset_-1px_0_0_0_#A9A9A9,inset_0_-1px_0_0_#A9A9A9]`}
                    handleClick={isLoading ? undefined : cellEl.column.getToggleSortingHandler()}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <span className="whitespace-nowrap font-normal">
                          {flexRender(
                          cellEl.column.columnDef.header,
                          cellEl.getContext()
                          )}
                      </span>
                      { !isSelectRow && 
                        <div className="shrink-0">
                          {isSorted === "asc" ? <FaArrowUpLong className="text-[12px] text-black/80" />
                          : isSorted === "desc" ? <FaArrowDownLong className="text-[12px] text-black/80" />
                          : <LuArrowUpDown className="text-black/80" />}
                        </div>
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
                  className={` ${isSelectRow ? "px-2! py-2! sticky left-0 z-8" : "px-2! py-2! min-w-60 max-w-[300px]"}
                    border-r border-b border-[#A9A9A9] group-hover:bg-gray-100 cursor-pointer shadow-[inset_-1px_0_0_0_#A9A9A9,inset_0_-1px_0_0_#A9A9A9]`}
                >
                  <span className="block leading-normal whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
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
