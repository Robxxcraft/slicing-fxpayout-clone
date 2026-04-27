import Table from '@/components/TableLayout';
import { HiArrowLongRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import StatusTag from '../../common/StatusTag';
import type { StatusType } from '@/types/status.type';
import { getLocalizedPath } from '@/helper/pathHelper';
import { useTranslation } from 'react-i18next';
import NoDataFound from '../../common/NoDataFound';

const CONFIG_HEADER = ["ID Akun Trading", "Broker", "Total Rebate", "Status", "Tanggal Dibuat"];
const dataEarnings = [
  {
    numberTrading: "28104472",
    broker: "Pepperstone",
    rebate: "$406.27",
    status: "pending",
    date: "8/2/19"
  },
  {
    numberTrading: "13294857",
    broker: "HFM",
    rebate: "$928.41",
    status: "rejected",
    date: "7/11/19"
  },
  {
    numberTrading: "76840125",
    broker: "FP Markets",
    rebate: "$450.54",
    status: "approved",
    date: "6/21/19"
  },
  {
    numberTrading: "59321085",
    broker: "Finex",
    rebate: "$328.85",
    status: "approved",
    date: "4/4/18"
  },
  {
    numberTrading: "90638412",
    broker: "Octa FX",
    rebate: "$943.65",
    status: "approved",
    date: "12/4/17"
  },
  {
    numberTrading: "77394012",
    broker: "Exness",
    rebate: "$202.87",
    status: "approved",
    date: "8/15/17"
  }
];

const RecentRebatesAdmin = () => {
  const { i18n } = useTranslation();
  return (
    <section className="mt-8 2xl:mt-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
        <div>
          <h2 className="text-2xl 2xl:text-[2rem] font-semibold">
            Recent Rebates
          </h2>
          <p className="text-base 2xl:text-xl text-black/80 md:max-w-[760px] leading-[169.2%]">
            Ringkasan riwayat rebate yang baru saja masuk.
          </p>
        </div>
        <Link to="#" className="flex items-center gap-3 text-primary">
          <p className="text-base 2xl:text-xl">Lihat Semua</p>
          <HiArrowLongRight className="text-2xl" />
        </Link>
      </div>

      <Table className="mt-6!">
        <Table.Heading>
          {CONFIG_HEADER.map((header, idx) => (
            <Table.HeadingItem key={header} className={`${idx === CONFIG_HEADER.length - 1 ? "text-right!" : "text-left!"} 
              py-3! text-nowrap font-medium! text-sm! 2xl:text-lg!`}>
              {header}
            </Table.HeadingItem>
          ))}
        </Table.Heading>

        <Table.Body>
          {dataEarnings.length > 0 && dataEarnings.map((item, rowIndex) => (
            <Table.Row key={rowIndex}>
              {Object.entries(item).map(([key, value], cellIndex) => {
                if (key === "status") {
                  const textStatus = value === "pending" ? "Verifying" : value === "approved" ? "Approved" : "Rejected";
                  return (
                    <Table.Cell rowIndex={rowIndex} key={cellIndex} className="py-2! align-middle!">
                      <div className="w-fit">
                        <StatusTag status={value as StatusType} text={textStatus} />
                      </div>
                    </Table.Cell>
                  )
                }
                return (
                  <Table.Cell rowIndex={rowIndex} key={cellIndex} className={`${cellIndex === CONFIG_HEADER.length - 1 ? "text-right!" : "text-left!"}
                    py-2! 2xl:text-xl!`}>
                    {value}
                  </Table.Cell>
                )
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {dataEarnings.length === 0 && 
        // (initLoad || isLoading) ?
        //   <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
        //     <Spinner />
        //   </div>
        // : 
        <NoDataFound useImage>
           Belum ada data laporan perolehan rebate pengguna. {" "}
            <Link to={getLocalizedPath("dashboard/import", i18n.language)}
              className="text-primary underline">
              Import laporan rebate
            </Link>.
        </NoDataFound>
      }
    </section>
  )
}

export default RecentRebatesAdmin;
