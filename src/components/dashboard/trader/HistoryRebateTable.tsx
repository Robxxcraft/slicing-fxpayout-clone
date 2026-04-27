import Table from '@/components/TableLayout';
import { formattingUsd } from '@/helper/formattingCurrency';
import { formattingFullDateTime } from '@/helper/formattingDate';
import { formatingUrlBroker } from '@/helper/formattingUrlBroker';
import { getLocalizedPath } from '@/helper/pathHelper';
import type { DataRebate } from '@/pages/dashboard/trader/HistoryRebate';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HistoryRebateTable = ({ 
  dataRebate,
  CONFIG_HEADERS 
}: { 
  dataRebate: DataRebate[] 
  CONFIG_HEADERS: Record<string, string>[]
}) => {
  const { i18n } = useTranslation();
  return (
    <Table className="mt-0!">
      <Table.Heading>
        {CONFIG_HEADERS.map((headerEl, cellIndex) => (
          <Table.HeadingItem key={headerEl.key}
            className={`
              ${cellIndex === CONFIG_HEADERS.length - 1 ? "px-0! pr-2! pl-8! text-right!" : "text-left!"}
              ${cellIndex === 0 ? "px-0! pl-2! pr-8!":""}
              py-4! md:py-3! text-nowrap font-medium! text-sm! 2xl:text-lg! select-none
            `}
          >
            {headerEl.header}
          </Table.HeadingItem>
        ))}
      </Table.Heading>

      <Table.Body>
        {dataRebate.length > 0 && dataRebate.map((data, rowIndex) => (
          <Table.Row key={rowIndex}>
            {CONFIG_HEADERS.map((header, cellIndex) => {
              let value;
              const baseStyle = "py-2! text-nowrap align-middle!";

              if (header.key === "createdAt") {
                value = formattingFullDateTime(data.createdAt);
              } else if (header.key === "rebate") {
                value = formattingUsd(data.rebate);
              } else if (header.key === "broker") {
                return (
                  <Table.Cell key={cellIndex} rowIndex={rowIndex} className={`${baseStyle}
                  `}>
                    <Link to={getLocalizedPath(`trader/rebate/${formatingUrlBroker(data.broker)}`, i18n.language)}
                      className="text-primary underline"
                    >
                      {data.broker}
                    </Link>
                  </Table.Cell>
                )
              } else {
                value = data[header.key as keyof typeof data];
              }

              return (
                <Table.Cell key={cellIndex} rowIndex={rowIndex} className={`${baseStyle}
                  ${cellIndex === CONFIG_HEADERS.length - 1 ? "px-2! text-right!" : "text-left!"}
                  ${header.key === "amount" ? "text-red-700":""}
                  ${cellIndex === 0 ? "px-0! pl-2! pr-8!":""}
                `}>
                  {value.toString()}
                </Table.Cell>
              )
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default HistoryRebateTable;
