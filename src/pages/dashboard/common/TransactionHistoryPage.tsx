import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCoreRowModel, useReactTable, type PaginationState, type SortingState } from "@tanstack/react-table";

import { WithdrawalAPI } from "@/api";
import UserContext from "@/context/UserContext";
import { getLocalizedPath } from "@/helper/pathHelper";
import { statusMap } from "@/constants/statusDropdown";
import type { FullStatusType, StatusType } from "@/types/status.type";
import { columnsDef } from "@/constants/columns/transactionHistoryColumns";
import type { ResponseWithdrawalAPI, TransactionHistory } from "@/types/withdrawal.type";

import TinyButton from "@/components/dashboard/common/TinyButton";
import NoDataFound from "@/components/dashboard/common/NoDataFound";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import TransactionHistoryTable from "@/components/dashboard/common/TransactionHistoryTable";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";

import Spinner from "@/components/ui/Spinner";
import Tooltip from "@/components/ui/Tooltip";
import SelectDropdown from "@/components/ui/SelectDropdown";

import { LuRefreshCcw } from "react-icons/lu";

const supportEntry = [
  { "key": "20", "value": "20"}, 
  { "key": "50", "value": "50"},
  { "key": "100", "value": "100"}
];

const TransactionHistoryPage = () => {
  const { i18n } = useTranslation();
  const [authUser] = useContext(UserContext);
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataWithdrawal, setDataWithdrawal] = useState<TransactionHistory[]>([]);

  // Table State
  const [filterStatus, setFilterStatus] = useState<FullStatusType>("all");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20
  });
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  
  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      if (!authUser) return;
      const sort = sorting[0];
      if (authUser.role === "user" || authUser.role === "affiliator") {
        const { error, data } = await WithdrawalAPI.getWithdrawalUser({
          role: authUser.role === "user" ? "trader" : "affiliate",
          status: filterStatus === "all" ? undefined : filterStatus as StatusType,
          limit: pagination.pageSize,
          page: pagination.pageIndex + 1,
          sortBy: sort?.id ?? "created_at",
          orderBy: sort?.desc === undefined ? "desc" :
            sort?.desc ? "desc" : "asc"
        });
    
        if (!error && data) {
          const raw = data.data;
          const temp = raw.data.map((item: ResponseWithdrawalAPI) => {
            const useCrypto = item.bank_name === null && item.bank_account_name === null && item.bank_account_number === null;
            return  {
              withdrawal_id: item.id,
              created_at: item.created_at,
              method: useCrypto ? "Crypto" : item.bank_name || "-",
              wallet_address: useCrypto ? item.wallet_address : item.bank_account_number || "-",
              currency: item.currency as "USD" | "IDR",
              status: item.status as StatusType,
              amount: item.currency === "USD" ? item.amount_usd : item.amount_idr
            }
          });
          setDataWithdrawal(temp);
          setPagination({
            pageIndex: raw.meta.page - 1,
            pageSize: raw.meta.limit
          });
          setTotalData(raw.meta.total);
          setTotalPages(raw.meta.totalPages);
        }
      }
    } finally {
      setInitLoad(false);
      setIsLoading(false);
    }
  }, [authUser, filterStatus, pagination.pageIndex, pagination.pageSize, sorting]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const tableInstance = useReactTable({
    columns: columnsDef,
    data: dataWithdrawal,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    state: {
      sorting,
      pagination,
    },
    pageCount: totalPages,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    enableRowSelection: true
  });

  const handleChangeStatus = (key: string) => {
    setFilterStatus(key as FullStatusType);
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  }
  const handleChangeFilterLimit = (key: string) => {
    if (isLoading) return;
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
      pageSize: Number(key)
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
                selectedInput={pagination.pageSize.toString()} 
                handleChangeInput={handleChangeFilterLimit} 
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
                onNextPage={tableInstance.nextPage}
                onPreviousPage={tableInstance.previousPage}
                disabledNext={isLoading || !tableInstance.getCanNextPage()}
                disabledPrev={isLoading || !tableInstance.getCanPreviousPage()}
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        <TransactionHistoryTable 
          tableInstance={tableInstance}
          isLoading={isLoading}
        />
        

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
            ${pagination.pageIndex === 0 ? (dataWithdrawal.length > 0 ? "1":"0") : pagination.pageSize * pagination.pageIndex} 
            hingga  
            ${pagination.pageIndex === 0 ? dataWithdrawal.length : (pagination.pageSize * pagination.pageIndex) + dataWithdrawal.length} 
            dari ${totalData}
            entri.`}
          </p>
        </div>
      </section>
    </WrapperDashboardComponent>
  )
}

export default TransactionHistoryPage;
