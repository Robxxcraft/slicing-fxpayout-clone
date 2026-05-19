import Table from "@/components/TableLayout";
import { formattingEmptyCurrency } from "@/helper/formattingCurrency";
import { formattingFullDateTime } from "@/helper/formattingDate";
import { formattingWithdrawalId } from "@/helper/formattingWithdrawal";
import type { PendingWithdrawal } from "@/types/withdrawal.type";

const CONFIG_HEADERS = [
  {key: "withdrawalId", header: "ID"},
  {key: "createdAt", header: "Tanggal Dibuat"},
  {key: "method", header: "Metode"}, 
  {key: "walletAddress", header: "Alamat Wallet"}, 
  {key: "currency", header: "Currency"}, 
  {key: "amount", header: "Amount"}, 
];

const TablePendingWithdrawal = ({
  dataWithdrawal,
  isLoading
}: {
  dataWithdrawal: PendingWithdrawal[];
  isLoading: boolean;
}) => {
  return (
    <Table isLoading={isLoading} className={`mt-0!`}>
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
        {dataWithdrawal.length > 0 && dataWithdrawal.map((data, rowIndex) => (
          <Table.Row key={rowIndex}>
            {CONFIG_HEADERS.map((header, cellIndex) => {
              let value;
              const baseStyle = "py-2! text-nowrap align-middle! group-hover:bg-gray-200";

              if (header.key === "withdrawalId") {
                value = formattingWithdrawalId(data.withdrawalId);
              } else if (header.key === "createdAt") {
                value = formattingFullDateTime(data.createdAt);
              } else if (header.key === "amount") {
                value = `-${formattingEmptyCurrency(data.amount)}`;
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

export default TablePendingWithdrawal;
