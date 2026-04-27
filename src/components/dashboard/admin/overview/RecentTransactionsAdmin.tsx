import { Link } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import Table from "@/components/TableLayout";
import IndeterminateCheckbox from "@/components/ui/IndeterminateCheckbox";
import StatusTag from "../../common/StatusTag";
import type { StatusType } from "@/types/status.type";
import NoDataFound from "../../common/NoDataFound";

const CONFIG_HEADER = ["_", "ID", "Status", "Metode", "Nama Bank", "Pemilik Rekening", "Alamat Penarikan", "Total Withdrawal", "Currency", "Tanggal Dibuat"];
const dataEarnings = [
  {
    empty: "_",
    id: "#WD-12434",
    status: "pending",
    metode: "Bank",
    bank: "BRI",
    username: "Adib",
    walletAddress: "28104472",
    total: "$406.27",
    currency: "USD",
    date: "8 February 2019"
  },
  {
    empty: "_",
    id: "#WD-12434",
    status: "pending",
    metode: "Bank",
    bank: "BRI",
    username: "Adib",
    walletAddress: "28104472",
    total: "$406.27",
    currency: "USD",
    date: "8 February 2019"
  },
]

const RecentTransactionsAdmin = () => {
  return (
    <section className="mt-8 2xl:mt-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
        <div>
          <h2 className="text-2xl 2xl:text-[2rem] font-semibold">
            Recent Transactions
          </h2>
          <p className="text-base 2xl:text-xl text-black/80 md:max-w-[760px] leading-[169.2%]">
            Daftar transaksi penarikan dana terbaru yang diajukan oleh pengguna.
          </p>
        </div>
        <Link to="#" className="flex items-center gap-3 text-primary">
          <p className="text-base 2xl:text-xl">Lihat Semua</p>
          <HiArrowLongRight className="text-2xl" />
        </Link>
      </div>

      <Table className="mt-6!">
        <Table.Heading>
          {CONFIG_HEADER.map((header, idx) => {
            const baseStyle = "py-3! text-nowrap font-medium! text-sm! 2xl:text-lg!"
            if (header === "_") {
              return (
              <Table.HeadingItem key={header} className={`${baseStyle} px-2!`}>
                <IndeterminateCheckbox />
              </Table.HeadingItem>
              )
            }
            return (
            <Table.HeadingItem key={header} className={`${idx === CONFIG_HEADER.length - 1 ? "text-right!" : "text-left!"} ${baseStyle}
              ${idx === 1 ? "px-0! pl-2! pr-8!" : ""} 
            `}>
              {header}
            </Table.HeadingItem>
          )})}
        </Table.Heading>

        <Table.Body>
          {dataEarnings.length > 0 && dataEarnings.map((item, rowIndex) => (
            <Table.Row key={rowIndex}>
              {Object.entries(item).map(([key, value], cellIndex) => {
                const baseStyle = "py-2! text-nowrap align-middle!"
                if (cellIndex === 0) {
                  return (
                    <Table.Cell rowIndex={rowIndex} key={cellIndex} className={`${baseStyle} px-2!`}>
                      <IndeterminateCheckbox />
                    </Table.Cell>
                  ) 
                }
                if (key === "status") {
                  const textStatus = value === "pending" ? "Verifying" : value === "approved" ? "Approved" : "Rejected";
                  return (
                    <Table.Cell rowIndex={rowIndex} key={cellIndex} className={`${baseStyle}`}>
                      <div className="w-fit">
                        <StatusTag status={value as StatusType} text={textStatus} />
                      </div>
                    </Table.Cell>
                  )
                }
                return (
                  <Table.Cell rowIndex={rowIndex} key={cellIndex} className={`${cellIndex === CONFIG_HEADER.length - 1 ? "text-right!" : "text-left!"} ${baseStyle} ${cellIndex === 1 ? "px-0! pl-2! pr-8!" : ""} 2xl:text-xl!`}>
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
          Belum ada laporan penarikan dana yang dilakukan oleh pengguna.
        </NoDataFound>
      }
    </section>
  )
}

export default RecentTransactionsAdmin;
