import { useCallback, useEffect, useState } from "react";
import { getCoreRowModel, useReactTable, type PaginationState, type SortingState } from "@tanstack/react-table";

import { AffilitorAPI } from "@/api";
import { columnsDef } from "@/constants/columns/traderPerformanceColumns";

import NoDataFound from "@/components/dashboard/common/NoDataFound";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import TraderPerformanceTable from "@/components/dashboard/affiiliator/traderPerformance/TraderPerformanceTable";

import Spinner from "@/components/ui/Spinner";
import Tooltip from "@/components/ui/Tooltip";
import SelectDropdown from "@/components/ui/SelectDropdown";

import { LuRefreshCcw } from "react-icons/lu";

export type TraderPerformance = {
  created_at: string;
  account_number: string;
  broker: string;
  trader: string;
  total_rebate: string;
  commission: string;
}
type ResponseTraderPerformance = {
  created_at: string;
  account_number: string;
  broker: { name: string };
  user: { full_name: string };
  total_rebate: number;
};

const supportEntry = [
  { "key": "20", "value": "20"}, 
  { "key": "50", "value": "50"},
  { "key": "100", "value": "100"}
];

const TraderPerformancePage = () => {
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataTraderPerformance, setDataTraderPerformance] = useState<TraderPerformance[]>([]);

  // Table State
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50
  });
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  
  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const sort = sorting[0];
      const { error, data } = await AffilitorAPI.getTraderPerformance({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sortBy: sort?.id ?? "created_at",
        orderBy: sort?.desc === undefined ? "desc" :
          sort?.desc ? "desc" : "asc"
      });

      if (!error && data) {
        const raw = data.data;
        const temp = raw.data.map((item: ResponseTraderPerformance) => ({
          created_at: item.created_at,
          account_number: item.account_number,
          broker: item.broker.name,
          trader: item.user.full_name,
          total_rebate: item.total_rebate,
          commission: (item.total_rebate * 10) / 100
        }));
        setDataTraderPerformance(temp);
        setPagination({
          pageIndex: raw.meta.page - 1,
          pageSize: raw.meta.limit
        });
        setTotalData(raw.meta.total);
        setTotalPages(raw.meta.totalPages);
      }
    } finally {
      setInitLoad(false);
      setIsLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, sorting]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const tableInstance = useReactTable({
    columns: columnsDef,
    data: dataTraderPerformance,
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

  // Function Helper
  const handleChangeFilterLimit = (key: string) => {
    if (isLoading) return;
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
      pageSize: Number(key)
    }));
  }   

  return (
    <WrapperDashboardComponent>
      {/* HEADER */}
      <TitleDashboard>
        Performance Traders
      </TitleDashboard>
      <ParagraphDashboard maxW="full">
        Pantau performa jaringan trader Anda dan kelola perolehan komisi dari seluruh akun broker yang terhubung.
      </ParagraphDashboard>

      {/* FILTER TABLE */}
      <div className="mt-3 md:mt-4 mb-4 2xl:mt-5 2xl:mb-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 2xl:gap-2.5 text-[#212529] w-fit">
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
      <TraderPerformanceTable 
        tableInstance={tableInstance}
        isLoading={initLoad || isLoading}
      />

      {/* LOADING & 0 DATA TABLE */}
      {dataTraderPerformance.length === 0 && (initLoad || isLoading) &&
        <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
          <Spinner />
        </div>
      }
      {dataTraderPerformance.length === 0 && !initLoad && !isLoading &&
        <NoDataFound>
          <p className="text-black/80 text-base 2xl:text-xl">
            Saat ini, belum ada pendapatan terkini dari trader Anda. Mulai undang trader untuk mendapatkan komisi rebate.
          </p>
        </NoDataFound>
      }

      <div className="mt-4">
        <p className="text-base 2xl:text-xl text-black/80">
          {`Menampilkan 
          ${pagination.pageIndex === 0 ? (dataTraderPerformance.length > 0 ? "1":"0") : pagination.pageSize * pagination.pageIndex} 
          hingga  
          ${pagination.pageIndex === 0 ? dataTraderPerformance.length : (pagination.pageSize * pagination.pageIndex) + dataTraderPerformance.length} 
          dari ${totalData}
          entri.`}
        </p>
      </div>
    </WrapperDashboardComponent>
  )
}

export default TraderPerformancePage;
