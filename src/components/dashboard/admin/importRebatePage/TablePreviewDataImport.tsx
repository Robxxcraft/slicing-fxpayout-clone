import Table from "@/components/TableLayout";
import { formattingUsd } from "@/helper/formattingCurrency";
import { formattingFullDate } from "@/helper/formattingDate";
import type { ImportRebateData } from "@/types/importRebate.type";
import { HEADER_REBATE_IMPORT } from "@/utils/adminUnit";

const TablePreviewDataImport = ({ data }: { data: ImportRebateData[]; }) => {
  return (
    <Table className="mt-6!">
      <Table.Heading>
        {Object.keys(HEADER_REBATE_IMPORT).map((header, idx) => {
          const baseStyle = "py-4! md:py-3! text-nowrap font-medium! text-sm! 2xl:text-lg!";
    
          return (
          <Table.HeadingItem 
            key={idx}
            className={`${baseStyle}
              ${idx === Object.keys(HEADER_REBATE_IMPORT).length - 1 ? "px-2! text-right!" : "text-left!"}
              ${idx === 0 ? "px-0! pl-2! pr-8!":""}
              select-none
            `}>
            <span className="text-sm whitespace-nowrap">{header}</span>
          </Table.HeadingItem>
        )})}
      </Table.Heading>
      <Table.Body>
        {data.slice(0, 5).map((rows, rowIdx) => (
          <Table.Row key={rowIdx}>
            {Object.entries(rows).map(([key, value], collIdx) => {
              let finalVal = value;
              const baseStyle = "py-2! text-nowrap align-middle! group-hover:bg-gray-200";
    
              if (key === "total_rebate") {
                finalVal = formattingUsd(Number(value));
              } else if (key === "created_at") {
                finalVal = formattingFullDate(value);
              }
    
              return (
              <Table.Cell rowIndex={rowIdx} key={collIdx}
              className={`${baseStyle}
                ${collIdx === Object.values(rows).length - 1 ? "px-2! text-right!" : "text-left!"}
                ${collIdx === 0 ? "px-0! pl-2! pr-8!" : ""} 2xl:text-xl!  
              `}>
                <span className="text-sm whitespace-nowrap leading-normal">{finalVal}</span>
              </Table.Cell>
            )})}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default TablePreviewDataImport;
