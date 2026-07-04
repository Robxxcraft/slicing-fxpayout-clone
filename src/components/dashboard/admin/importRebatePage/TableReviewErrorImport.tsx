import Table from '@/components/TableLayout';

const TableReviewErrorImport = ({
  detailError
}: {
  detailError: {
    row: number;
    message: string;
  }[]
}) => {
  return (
    <Table className="mt-6!">
      <Table.Heading>
        {["Baris", "Keterangan"].map((header, idx) => {
          const baseStyle = "py-4! md:py-3! text-nowrap font-medium! text-sm! 3xl:text-lg!";
      
          return (
          <Table.HeadingItem 
            key={idx}
            className={`${baseStyle}
              ${idx === 0 ? "px-4! w-[100px]!":""}
              select-none text-left!
            `}>
            <span className="text-sm whitespace-nowrap">{header}</span>
          </Table.HeadingItem>
        )})}
      </Table.Heading>
      <Table.Body>
        {detailError.map((rows, rowIdx) => {
          const baseStyle = "py-3! text-nowrap align-middle! group-hover:bg-gray-200";
          return (
          <Table.Row key={rowIdx}>
            <Table.Cell rowIndex={rowIdx}
            className={`${baseStyle} w-[100px]! px-4! text-lg! 3xl:text-xl! whitespace-nowrap leading-normal truncate`}>
              {rows.row}
            </Table.Cell>
            <Table.Cell rowIndex={rowIdx}
            className={`${baseStyle} text-left! 3xl:text-xl! whitespace-nowrap leading-normal`}>
              {rows.message}
            </Table.Cell>
          </Table.Row>
        )})}
      </Table.Body>
    </Table>
  )
}

export default TableReviewErrorImport;
