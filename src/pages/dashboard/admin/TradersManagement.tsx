import CardOverview from "@/components/dashboard/common/CardOverview"
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton"
import NoDataFound from "@/components/dashboard/common/NoDataFound"
import StatusTag from "@/components/dashboard/common/StatusTag"
import TitleDashboard from "@/components/dashboard/common/TitleDashboard"
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent"
import Table from "@/components/TableLayout"
import IndeterminateCheckbox from "@/components/ui/IndeterminateCheckbox"
import SelectDropdown from "@/components/ui/SelectDropdown"
import Tooltip from "@/components/ui/Tooltip"
import { formattedUsd } from "@/helper/formHelper"
import type { StatusType } from "@/types/status.type"
import { statusMap } from "@/utils/dataDropdownDashboard"
import { useState } from "react"
import { CgInfo } from "react-icons/cg"
import { CiSearch } from "react-icons/ci"
import { FaUsers } from "react-icons/fa6"
import { LuRefreshCcw } from "react-icons/lu"

const CONFIG_HEADER = ["_", "Username", "Email", "Balance", "Status", "Tanggal Dibuat"];

const dataTraders = [
  {
    empty: "_",
    username: "Adib",
    email: "adib@gmail.com",
    balance: 9,
    status: "rejected",
    createdAt: "8 January 2025"
  },
  {
    empty: "_",
    username: "Adib",
    email: "adib@gmail.com",
    balance: 9,
    status: "pending",
    createdAt: "8 January 2025"
  },
  {
    empty: "_",
    username: "Adib",
    email: "adib@gmail.com",
    balance: 9,
    status: "approved",
    createdAt: "8 January 2025"
  },
  {
    empty: "_",
    username: "Adib",
    email: "adib@gmail.com",
    balance: 9,
    status: "approved",
    createdAt: "8 January 2025"
  },
  {
    empty: "_",
    username: "Adib",
    email: "adib@gmail.com",
    balance: 9,
    status: "approved",
    createdAt: "8 January 2025"
  },
];

const supportEntry = [
  { "key": "5", "value": "5" },
  { "key": "10", "value": "10" }, 
  { "key": "20", "value": "20"}, 
  { "key": "50", "value": "50"}
];

const TradersManagement = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [querySearch, setQuerySearch] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  return (
    <WrapperDashboardComponent>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CardOverview 
          title={"Total Traders"} icon={<FaUsers />} content={"100"} 
          detail={"Total active record traders"} />
        <CardOverview 
          title={"Pending Traders"} icon={<FaUsers />} content={"8"} 
          detail={"Unverified users out of 100 total registrations"} status="warning" />
      </div>
      <section className="mt-5">
        <TitleDashboard>
          Traders Management
        </TitleDashboard>

        {/* FILTER TABLE */}
        <div className="my-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 2xl:gap-3 w-full">
            <div className="h-9 2xl:h-12 py-2 md:py-0 px-2 2xl:px-4 flex flex-1 items-center gap-2 2xl:gap-4 w-full bg-white border border-[#D2CEE1] rounded-lg max-w-full lg:max-w-[456px] 2xl:max-w-[640px]">
              <label htmlFor="search" className="cursor-pointer">
                <CiSearch className="text-2xl 2xl:text-3xl text-[#7E7E7E]" />
              </label>
              <input
                id="search"
                name="search"
                placeholder="Cari username atau email"
                value={querySearch}
                onChange={(e) => setQuerySearch(e.target.value)}
                type="text"
                autoComplete="off"
                className="w-full h-full text-base 2xl:text-xl placeholder:text-[rgba(0,0,0,0.6)] focus:outline-0 placeholder:text-ellipsis placeholder:line-clamp-1"
              />
            </div>
            <div className="flex items-center gap-2 2xl:gap-3 w-full md:w-fit">
              <div
                onClick={() => {}}
                className="h-9 2xl:h-12 px-2 2xl:px-4 flex flex-1 items-center rounded-md border border-my-red bg-my-red text-white place-items-center cursor-pointer active:brightness-90 transition-all duration-300 ease-out">
                <p className="text-nowrap">
                  Hapus 1 data
                </p>
              </div>
              <Tooltip 
                disabled={false}
                variant="primary"
                icon={<CgInfo className={`text-xl`} />} 
                handleClick={() => {}} 
                detail={"Detail Data"} />
            </div>
          </div>
          <div className="flex items-center gap-2 2xl:gap-3 w-full md:w-fit">
            <SelectDropdown 
              selectedInput={filterStatus} 
              handleChangeInput={(key) => setFilterStatus(key as "all" | "pending" | "approved" | "rejected")} 
              objectInput={statusMap}       
              wrapperCL="w-full! md:w-[150px]! 2xl:w-[200px]!"             
              inputCL="w-[200px]! 2xl:w-[240px]!"        
            />
            <Tooltip 
              disabled={false}
              icon={<LuRefreshCcw className={`${isLoading ? "animate-spin" : ""}`} />} 
              handleClick={() => {}} 
              detail={"Reload Data"} />
              
            <NextPreviousButton />
          </div>
        </div>

        <Table className="mt-0!">
          <Table.Heading>
          {CONFIG_HEADER.map((header, idx) => {
            const baseStyle = "py-4! md:py-3! text-nowrap font-medium! text-sm! 2xl:text-lg!"
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
            {dataTraders.length > 0 && dataTraders.map((item, rowIndex) => (
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
                  if (key === "balance") {
                    return (
                      <Table.Cell rowIndex={rowIndex} key={cellIndex} className={`${baseStyle}`}>
                        {formattedUsd(Number(value))}
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

        {dataTraders.length === 0 && 
          // (initLoad || isLoading) ?
          //   <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
          //     <Spinner />
          //   </div>
          // : 
          <NoDataFound useImage>
            Belum ada data pengguna trader yang terdaftar di dalam sistem.
          </NoDataFound>
        }

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <p className="w-fit text-base 2xl:text-xl">
              Baris per halaman
            </p>
            <SelectDropdown 
              selectedInput={"20"} 
              handleChangeInput={function (key: string): void {
                        throw new Error("Function not implemented.")
                    } } 
              objectInput={supportEntry}
              containerCL="w-fit!"
              inputCL="w-[80px]! text-center!"
              positionDrop="center"
              positionY="up" />
            <p className="w-fit text-base 2xl:text-xl">
              menampilkan 1 hingga 20 dari 50 entri.
            </p>
          </div>
          <div className="hidden md:block">
            <NextPreviousButton />
          </div>
        </div>
      </section>
    </WrapperDashboardComponent>
  )
}

export default TradersManagement;
