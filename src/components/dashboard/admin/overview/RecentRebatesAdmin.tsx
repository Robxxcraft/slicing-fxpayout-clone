import Table from '@/components/TableLayout';
import { HiArrowLongRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import StatusTag from '../../common/StatusTag';
import type { StatusType } from '@/types/status.type';
import { getLocalizedPath } from '@/helper/pathHelper';
import { useTranslation } from 'react-i18next';
import NoDataFound from '../../common/NoDataFound';
import type { DataRebateManagement } from '@/pages/dashboard/admin/RebatesManagement';
import Spinner from '@/components/ui/Spinner';
import { formattingFullDate } from '@/helper/formattingDate';

const CONFIG_HEADER = ["ID Akun Trading", "Broker", "Total Rebate", "Status", "Tanggal Dibuat"];

const RecentRebatesAdmin = ({
  dataRebates,
  isLoading
}: {
  dataRebates: DataRebateManagement[];
  isLoading: boolean;
}) => {
  const { i18n } = useTranslation();
  const dataRows = dataRebates.map((item) => ({
    numberTrading: item.account_number,
    broker: item.broker_name,
    rebate: item.total_rebate,
    status: item.status,
    date: item.created_at
  }));
  return (
    <section className="mt-8 2xl:mt-10">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
        <div>
          <h2 className="text-2xl 2xl:text-[2rem] font-semibold">
            Recent Rebates
          </h2>
          <p className="text-base 2xl:text-xl text-black/80 md:max-w-[760px] leading-[169.2%]">
            Ringkasan riwayat rebate yang baru saja masuk.
          </p>
        </div>
        <Link to={getLocalizedPath("dashboard/rebates", i18n.language)} className="flex items-center gap-3 text-primary">
          <p className="text-base 2xl:text-xl">Lihat Semua</p>
          <HiArrowLongRight className="text-2xl" />
        </Link>
      </div>

      {/* TABLE */}
      <Table className="mt-6!">
        <Table.Heading>
          {CONFIG_HEADER.map((header, idx) => (
            <Table.HeadingItem key={header} className={`
              ${idx === CONFIG_HEADER.length - 1 ? "px-2! text-right!" : "text-left!"} 
              ${idx === 0 ? "px-2!":""}
              py-3! text-nowrap font-medium! text-sm! 2xl:text-lg!`}>
              {header}
            </Table.HeadingItem>
          ))}
        </Table.Heading>

        <Table.Body>
          {dataRows.length > 0 && dataRows.map((item, rowIndex) => (
            <Table.Row key={rowIndex}>
              {Object.entries(item).map(([key, value], cellIndex) => {
                if (key === "status") {
                  const textStatus = value === "pending" ? "Verifying" : value === "approved" ? "Approved" : "Rejected";
                  return (
                    <Table.Cell rowIndex={rowIndex} key={cellIndex} className="py-2! align-middle! group-hover:bg-gray-200">
                      <div className="w-fit">
                        <StatusTag status={value as StatusType} text={textStatus} />
                      </div>
                    </Table.Cell>
                  )
                }
                return (
                  <Table.Cell rowIndex={rowIndex} key={cellIndex} className={`${cellIndex === CONFIG_HEADER.length - 1 ? "px-2! text-right!" : "text-left!"}
                  ${cellIndex === 0 ? "px-2!":""}
                    py-2! 2xl:text-xl! group-hover:bg-gray-200`}>
                    {key === "date" ? formattingFullDate(value.toLocaleString()) : value}
                  </Table.Cell>
                )
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* LOADING & 0 DATA TABLE */}
      {dataRows.length === 0 && isLoading &&
        <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
          <Spinner />
        </div>
      }
      {dataRows.length === 0 && !isLoading &&
        <NoDataFound useImage>
          Belum ada laporan penarikan dana yang dilakukan oleh pengguna.
        </NoDataFound>
      }
    </section>
  )
}

export default RecentRebatesAdmin;
