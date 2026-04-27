import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { TraderAPI } from "@/api";
import { getLocalizedPath } from "@/helper/pathHelper";
import { statusMap } from "@/utils/dataDropdownDashboard";
import { formattingFullDateTime } from "@/helper/formattingDate";
import { formattingEmptyCurrency } from "@/helper/formattingCurrency";
import type { FullStatusType, StatusType } from "@/types/status.type";

import Table from "@/components/TableLayout";

import StatusTag from "@/components/dashboard/common/StatusTag";
import TinyButton from "@/components/dashboard/common/TinyButton";
import NoDataFound from "@/components/dashboard/common/NoDataFound";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";

import Spinner from "@/components/ui/Spinner";
import Tooltip from "@/components/ui/Tooltip";
import SelectDropdown from "@/components/ui/SelectDropdown";

import { LuRefreshCcw } from "react-icons/lu";
import type { MetaPage } from "@/types/metapage.type";

const CONFIG_HEADERS = [
  {key: "createdAt", header: "Tanggal"},
  {key: "method", header: "Metode"}, 
  {key: "walletAddress", header: "Alamat Wallet"}, 
  {key: "status", header: "Status"}, 
  {key: "currency", header: "Currency"}, 
  {key: "amount", header: "Amount"}, 
];

const supportEntry = [
  { "key": "20", "value": "20"}, 
  { "key": "50", "value": "50"},
  { "key": "100", "value": "100"}
];

type TransactionHistory = {
  createdAt: string;
  method: string;
  walletAddress: string;
  currency: "USD" | "IDR";
  status: StatusType;
  amount: number;
};
type ResponseWithdrawal = {
  created_at: string;
  bank: { name: string, account_number: string } | null;
  wallet_address: string;
  currency: string;
  amount_idr: number;
  amount_usd: number;
  status: string;
}

const TransactionHistoryPage = () => {
  const { i18n } = useTranslation();
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [filterStatus, setFilterStatus] = useState<FullStatusType>("all");
  const [dataWithdrawal, setDataWithdrawal] = useState<TransactionHistory[]>([]);
  const [metaPage, setMetaPage] = useState<MetaPage>({
    pageIndex: 1,
    pageTotal: 1,
    limit: 20,
    totalData: 0
  });
  
  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const { error, data } = await TraderAPI.getWithdrawalByTrader({
        status: filterStatus === "all" ? undefined : filterStatus as StatusType,
        limit: metaPage.limit,
        page: metaPage.pageIndex
      });
  
      if (!error && data) {
        const raw = data.data;
        const temp = raw.data.map((item: ResponseWithdrawal) => ({
          createdAt: item.created_at,
          method: !item.bank ? "Crypto" : item.bank.name,
          walletAddress: !item.bank ? item.wallet_address : item.bank.account_number,
          currency: item.currency as "USD" | "IDR",
          status: item.status as StatusType,
          amount: item.currency === "USD" ? item.amount_usd : item.amount_idr
        }));
        setDataWithdrawal(temp);
        setMetaPage((prev) => {
            if (
              prev.pageIndex === raw.meta.page &&
              prev.pageTotal === raw.meta.totalPages &&
              prev.totalData === raw.meta.total &&
              prev.limit === raw.meta.limit
            ) return prev;
    
            return {
              ...prev,
              pageIndex: raw.meta.page,
              pageTotal: raw.meta.totalPages,
              totalData: raw.meta.total,
              limit: raw.meta.limit
            };
          });
      }
    } finally {
      setInitLoad(false);
      setIsLoading(false);
    }
  }, [filterStatus, metaPage.limit, metaPage.pageIndex]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNextPage = () => {
    if (isLoading) return;
    if (metaPage.pageIndex < metaPage.pageTotal) {
      setMetaPage((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex + 1
      }));
    }
  };
  const handlePreviousPage = () => {
    if (isLoading) return;
    if (metaPage.pageIndex > 1) {
      setMetaPage((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex - 1
      }));
    }
  };
  const handleChangeStatus = (key: string) => {
    setFilterStatus(key as FullStatusType);
    setMetaPage((prev) => ({
      ...prev,
      pageIndex: 1
    }));
  }

  const useFilter = filterStatus !== "all";
  return (
    <WrapperDashboardComponent>
      <section>
        <div className="flex justify-between items-center md:items-start">
          <TitleDashboard>
            Transaction History
          </TitleDashboard>
          <TinyButton 
            buttonType="link"
            urlTo={getLocalizedPath("withdrawal/request", i18n.language)}
          >
            Tarik dana sekarang!
          </TinyButton>
        </div>
        
        {/* FILTER TABLE */}
        <div className="mt-3 md:mt-4 mb-4 2xl:mt-5 2xl:mb-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 2xl:gap-2.5 text-[#212529] w-full md:w-fit">
              <span className="text-base 2xl:text-xl">Tampilkan</span>
              <SelectDropdown 
                selectedInput={metaPage.limit.toLocaleString()} 
                handleChangeInput={(key) => {
                  setMetaPage((prev) => ({
                    ...prev,
                    limit: Number(key),
                    pageIndex: 1
                  }))
                }} 
                objectInput={supportEntry}     
                inputCL="w-[72px]!"
                wrapperCL="w-fit!"         
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-fit">
              <SelectDropdown 
                selectedInput={filterStatus} 
                handleChangeInput={handleChangeStatus} 
                objectInput={statusMap} 
                wrapperCL="w-full! md:w-[150px]! 2xl:w-[200px]!"             
                inputCL="w-[200px]! 2xl:w-[240px]!"             
              />
              <Tooltip 
                disabled={isLoading}
                icon={<LuRefreshCcw className={`${isLoading ? "animate-spin" : ""}`} />} 
                handleClick={() => fetchData()} 
                detail={"Reload Data"} />
              <NextPreviousButton 
                onNextPage={handleNextPage} 
                onPreviousPage={handlePreviousPage} 
                disabledNext={metaPage.pageIndex >= metaPage.pageTotal} 
                disabledPrev={metaPage.pageIndex <= 1} 
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
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
            {dataWithdrawal.length > 0 && dataWithdrawal.map((data, rowIndex) => (
              <Table.Row key={rowIndex}>
                {CONFIG_HEADERS.map((header, cellIndex) => {
                  let value;
                  const baseStyle = "py-2! text-nowrap align-middle!";
        
                  if (header.key === "createdAt") {
                    value = formattingFullDateTime(data.createdAt);
                  } else if (header.key === "amount") {
                    value = `-${formattingEmptyCurrency(data.amount)}`;
                  } else if (header.key === "status") {
                    value = data.status === "pending" ? "Verifying" : data.status === "approved" ? "Approved" : "Rejected";
                    return ( 
                    <Table.Cell key={cellIndex} rowIndex={rowIndex} className={`${baseStyle}`}>
                      <div className="w-fit"> 
                        <StatusTag status={data.status} text={value} />
                      </div>
                    </Table.Cell>)
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

        {/* LOADING & 0 DATA TABLE */}
        {dataWithdrawal.length === 0 && (initLoad || isLoading) &&
          <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
            <Spinner />
          </div>
        }
        {dataWithdrawal.length === 0 && !initLoad && !isLoading &&
          <NoDataFound>
            <p className="text-black/80 text-base 2xl:text-xl">
            {useFilter ?
              "Tidak ditemukan riwayat penarikan dana yang sesuai dengan filter atau pencarian Anda." :
              "Saat ini, Anda tidak memiliki riwayat penarikan dana."}
            </p>
          </NoDataFound>
        }
        <div className="mt-4">
          <p className="text-base 2xl:text-xl text-black/80">
            {`Menampilkan 
            ${metaPage.pageIndex === 1 ? (dataWithdrawal.length > 0 ? "1":"0") : metaPage.limit * metaPage.pageIndex} 
            hingga  
            ${metaPage.pageIndex === 1 ? dataWithdrawal.length : (metaPage.limit * metaPage.pageIndex) + dataWithdrawal.length} 
            dari ${metaPage.totalData}
            entri.`}
          </p>
        </div>
      </section>
    </WrapperDashboardComponent>
  )
}

export default TransactionHistoryPage;
