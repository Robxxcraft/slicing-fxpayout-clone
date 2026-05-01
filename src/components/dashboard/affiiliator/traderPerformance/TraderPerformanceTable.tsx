import Table from '@/components/TableLayout';
import type { TraderPerformance } from '@/pages/dashboard/affiliator/TraderPerformancePage';
import { 
  flexRender, 
  type Table as ReactTable
} from "@tanstack/react-table";
import { HiChevronUpDown } from 'react-icons/hi2';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const TraderPerformanceTable = ({ 
  tableInstance,
  isLoading
}: { 
  tableInstance:  ReactTable<TraderPerformance>;  
  isLoading: boolean;
}) => {
  const dataTraderBroker = tableInstance.getRowModel().rows;
  return (
    <Table isLoading={isLoading} className={`mt-0!`}>
      <thead>
        {tableInstance.getHeaderGroups().map((headerEl) => (
          <tr key={headerEl.id}>
            {headerEl.headers.map((cellEl) => {
              const isSorted = cellEl.column.getIsSorted();
              const canSorting = ["created_at", "account_number", "user", "broker_name"].includes(cellEl.column.id);

              return (
                <Table.HeadingItem key={cellEl.id}
                  className={`
                    ${cellEl.index === headerEl.headers.length - 1 ? "px-0! pr-2! pl-8! text-right!" : "text-left!"}
                    ${cellEl.index === 0 ? "px-0! pl-2! pr-8!":""}
                    ${canSorting ? "cursor-pointer":""}
                    py-4! md:py-3! text-nowrap font-medium! text-sm! 2xl:text-lg! select-none 
                  `}
                  handleClick={canSorting && !isLoading ? cellEl.column.getToggleSortingHandler() : undefined}
                >
                  <div className={`
                    ${cellEl.index === headerEl.headers.length - 1 ? "justify-end" : "justify-between"}
                    flex items-center gap-2
                  `}>
                   <span className="whitespace-nowrap">
                       {flexRender(
                       cellEl.column.columnDef.header,
                       cellEl.getContext()
                       )}
                   </span>
                   {canSorting && 
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
        ))}
      </thead>

      <Table.Body>
        {dataTraderBroker.length > 0 
          && dataTraderBroker.map((rowEl, rowIndex) => (
            <Table.Row key={rowEl.id}>
              {rowEl.getVisibleCells().map((cellEl, cellIndex) => {
                const baseStyle = "py-2! text-nowrap align-middle! group-hover:bg-gray-200";

                return (
                  <Table.Cell
                    key={cellEl.id}
                    rowIndex={rowIndex}
                    className={`${baseStyle}
                     ${cellIndex === rowEl.getVisibleCells().length - 1 ? "px-2! text-right!" : "text-left!"}
                     ${cellIndex === 0 ? "px-0! pl-2! pr-8!":""}
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
          ))}
      </Table.Body>
    </Table>

  )
}

export default TraderPerformanceTable;
