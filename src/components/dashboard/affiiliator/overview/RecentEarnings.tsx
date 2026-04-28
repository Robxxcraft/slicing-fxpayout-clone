/* eslint-disable @typescript-eslint/no-explicit-any */
import ParagraphDashboard from '../../common/ParagraphDashboard';
import { Link } from 'react-router-dom';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';
import Table from '@/components/TableLayout';
import { formattingUsd } from '@/helper/formattingCurrency';
import { formattingFullDate } from '@/helper/formattingDate';
import Spinner from '@/components/ui/Spinner';
import NoDataFound from '../../common/NoDataFound';

const CONFIG_HEADERS = [
  {key: "created_at", header: "Tanggal"}, 
  {key: "account_name", header: "Trader"},
  {key: "broker", header: "Broker"},
  {key: "account_number", header: "Nomor Akun Trading"}, 
  {key: "rebate", header: "Rebate"}, 
  {key: "comission", header: "Komisi"}, 
];

const RecentEarnings = ({
  dataEarnings,
  isLoading
}: {
  dataEarnings: any[];
  isLoading: boolean;
}) => {
  return (
    <section className="mt-7 2xl:mt-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl 2xl:text-[2rem] font-semibold">
            Recent Earnings
          </h2>
          <ParagraphDashboard colorCL="text-black/60">
            History perolehan komisi terkini dari pendapatan rebate trader yang anda undang. 
          </ParagraphDashboard>
        </div>
        <Link to="#"
          className="flex items-center gap-4 text-base 2xl:text-xl font-medium text-primary underline"
        >
          <span>Lihat semua</span>
          <HiOutlineArrowLongRight className="text-2xl" />
        </Link>
      </div>

      {/* TABLE */}
      <Table>
        <Table.Heading>
          {CONFIG_HEADERS.map((header, idx) => (
            <Table.HeadingItem 
              key={idx} 
              className={`
                ${idx === CONFIG_HEADERS.length - 1 ? "px-2! text-right!" : "text-left!"}
                ${idx === 0 ? "px-0! pl-2! pr-8!":""}
                py-4! md:py-3! text-nowrap font-medium! text-sm! 2xl:text-lg! select-none
            `}
            >
              {header.header}
            </Table.HeadingItem>
          ))}
        </Table.Heading>

        <Table.Body>
          {dataEarnings.map((data, rowIndex) => (
            <Table.Row key={rowIndex}>
              {CONFIG_HEADERS.map((header, cellIndex) => {
                let value;
                const baseStyle = "py-2! text-nowrap align-middle!";

                if (header.key === "rebate") {
                  value = formattingUsd(data.rebate);
                } else if (header.key === "comission") {
                  value = formattingUsd(data.comission);
                } else if (header.key === "created_at") {
                  value = formattingFullDate(data.created_at)
                } else {
                  value = data[header.key as keyof typeof data];
                }

                return ( <Table.Cell key={cellIndex} rowIndex={rowIndex} 
                  className={`${baseStyle}
                    ${cellIndex === CONFIG_HEADERS.length - 1 ? "px-2! text-right!" : "text-left!"}
                    ${cellIndex === 0 ? "px-0! pl-2! pr-8!":""}
                  `}
                >
                  {value}
                </Table.Cell>
              )})}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* LOADING & 0 DATA TABLE */}
      {dataEarnings.length === 0 && isLoading &&
        <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
          <Spinner />
        </div>
      }
      {dataEarnings.length === 0 && !isLoading &&
        <NoDataFound useImage>
          Belum ada pendapatan terkini. Mulai undang trader untuk mendapatkan komisi rebate.
        </NoDataFound>
      }
    </section>
  )
}

export default RecentEarnings;
