import type { ValidationData } from '@/models/validationData';
import Table from '../TableLayout';
import { HEADER_MAPPING } from '@/utils/adminUnit';

const PreviewValDataTable = ({
  data
}: {
  data: ValidationData[]
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
        Preview data
      </h3>
      <Table className="primary-scrollbar mt-2! rounded-none! border-[#A9A9A9]! max-w-fit h-fit! border-separate border-spacing-0">
        <Table.Heading>
          {Object.keys(HEADER_MAPPING).map((header, idx) => (
            <Table.HeadingItem 
              key={idx}
              className="px-1! py-1! min-w-[100px] max-w-60 sticky top-0 border-r border-b border-[#A9A9A9] bg-gray-200">
              <span className="text-sm whitespace-nowrap">{header}</span>
            </Table.HeadingItem>
          ))}
        </Table.Heading>
        <Table.Body>
          {data.slice(0, 5).map((rows, rowIdx) => (
            <Table.Row key={rowIdx}>
              {Object.values(rows).map((cell, colIdx) => (
                <Table.Cell rowIndex={rowIdx} key={colIdx}
                className="px-1! py-0! min-w-[100px] max-w-60 border-r border-b border-[#A9A9A9]">
                  <span className="text-sm whitespace-nowrap leading-normal">{cell}</span>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default PreviewValDataTable;
