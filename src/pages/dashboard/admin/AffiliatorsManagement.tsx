import CardOverview from "@/components/dashboard/common/CardOverview";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import SelectDropdown from "@/components/ui/SelectDropdown";
import Tooltip from "@/components/ui/Tooltip";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUsers } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";
import { CgInfo } from "react-icons/cg";
import Table from "@/components/TableLayout";
import IndeterminateCheckbox from "@/components/ui/IndeterminateCheckbox";
import StatusTag from "@/components/dashboard/common/StatusTag";
import type { StatusType } from "@/types/status.type";
import NoDataFound from "@/components/dashboard/common/NoDataFound";

const CONFIG_HEADER = ["_", "Username", "Email", "Total Referral", "Status", "Tanggal Dibuat"];

const statusMap = [
  {key: "all", value: "Semua status"}, 
  {key: "approved", value: "Approved"},
  {key: "rejected", value: "Rejected"}, 
  {key: "pending", value: "Pending"},
];

const dataAffiliators = [
  {
    empty: "_",
    username: "Adib",
    email: "adib@gmail.com",
    referral: 9,
    status: "rejected",
    createdAt: "8 January 2025"
  },
  {
    empty: "_",
    username: "Adib",
    email: "adib@gmail.com",
    referral: 9,
    status: "pending",
    createdAt: "8 January 2025"
  },
  {
    empty: "_",
    username: "Adib",
    email: "adib@gmail.com",
    referral: 9,
    status: "approved",
    createdAt: "8 January 2025"
  },
  {
    empty: "_",
    username: "Adib",
    email: "adib@gmail.com",
    referral: 9,
    status: "approved",
    createdAt: "8 January 2025"
  },
  {
    empty: "_",
    username: "Adib",
    email: "adib@gmail.com",
    referral: 9,
    status: "approved",
    createdAt: "8 January 2025"
  },
];

const AffiliatorsManagement = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [querySearch, setQuerySearch] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  return (
    <WrapperDashboardComponent>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CardOverview 
          title={"Total Affiliators"} icon={<FaUsers />} content={"100"} 
          detail={"Total active record affiliator"} />
        <CardOverview 
          title={"Pending Affiliators"} icon={<FaUsers />} content={"8"} 
          detail={"Unverified users out of 100 total registrations"} status="warning" />
      </div>
      <section className="mt-5">
        <TitleDashboard>
          Affiliators Management
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
            {dataAffiliators.length > 0 && dataAffiliators.map((item, rowIndex) => (
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

        {dataAffiliators.length === 0 && 
          // (initLoad || isLoading) ?
          //   <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
          //     <Spinner />
          //   </div>
          // : 
          <NoDataFound useImage>
            Belum ada data pengguna affiliator yang terdaftar di dalam sistem.
          </NoDataFound>
        }
      </section>
    </WrapperDashboardComponent>
  )
}

export default AffiliatorsManagement;
