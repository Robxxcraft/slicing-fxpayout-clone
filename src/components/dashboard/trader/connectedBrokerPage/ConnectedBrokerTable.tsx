import Table from '@/components/TableLayout';
import { formattingUsd } from '@/helper/formattingCurrency';
import { formattingFullDate } from '@/helper/formattingDate';
import type { BrokerUser } from '@/types/broker.type';
import { FaTrash } from 'react-icons/fa6';
import StatusTag from '../../common/StatusTag';

const ConnectedBrokerTable = ({
  CONFIG_HEADERS,
  brokersUser,
  onOpenDeleteConfirm,
  isLoading
}: {
  CONFIG_HEADERS: Record<string, string>[];
  brokersUser: BrokerUser[];
  onOpenDeleteConfirm: (id: number) => void;
  isLoading: boolean;
}) => {
  return (
    <Table className={`${isLoading ? "opacity-70" : "opacity-100"} mt-0!`}>
      <Table.Heading>
        {CONFIG_HEADERS.map((header, idx) => (
          <Table.HeadingItem key={idx} className={`
            ${idx === CONFIG_HEADERS.length - 1 ? "px-2!":""}
            ${idx === CONFIG_HEADERS.length - 2 ? "text-right!" : "text-left!"}
            ${idx === 0 ? "px-0! pl-4! pr-8!":""}
            py-4! md:py-3! text-nowrap font-medium! text-sm! 2xl:text-lg! select-none
          `}>
            {header.header}
          </Table.HeadingItem>
        ))}
      </Table.Heading>
      
      <Table.Body>
        {brokersUser.length > 0 && brokersUser.map((data, rowIndex) => (
          <Table.Row key={rowIndex}>
            {CONFIG_HEADERS.map((header, cellIndex) => {
              let value;
              const baseStyle = "py-2! text-nowrap align-middle! group-hover:bg-gray-200";

              if (header.key === "rebate") {
                value = formattingUsd(data.totalRebate);
              } else if (header.key === "createdAt") {
                value = formattingFullDate(data.createdAt)
              } else if (header.key === "action") {
                return (
                <Table.Cell key={cellIndex} rowIndex={rowIndex} className={`${baseStyle} px-2!`}>
                  <div className="flex justify-center items-center">
                    <FaTrash
                      onClick={() => {
                        onOpenDeleteConfirm(data.connectionId);
                      }} 
                      className="text-base 2xl:text-2xl text-black/60 cursor-pointer" />
                  </div>
                </Table.Cell>)
              } else if (header.key === "status") {
                value = data.status === "pending" ? "Verifying" : data.status === "approved" ? "Connected" : "Rejected";
                return ( 
                <Table.Cell key={cellIndex} rowIndex={rowIndex} className={`${baseStyle}`}>
                  <div className="w-fit"> 
                    <StatusTag status={data.status} text={value} />
                  </div>
                </Table.Cell>)
              } else {
                value = data[header.key as keyof typeof data];
              }

              return <Table.Cell key={cellIndex} rowIndex={rowIndex} className={`${baseStyle}
                ${cellIndex === CONFIG_HEADERS.length - 2 ? "text-right!" : "text-left!"}
                ${cellIndex === 0 ? "px-0! pl-4! pr-8!":""}
              `}>
                {value}
              </Table.Cell>
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default ConnectedBrokerTable;
