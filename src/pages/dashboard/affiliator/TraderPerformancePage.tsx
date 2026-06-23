import { useCallback, useEffect, useState } from "react";
import { isEqual, subDays } from "date-fns";
import { getCoreRowModel, useReactTable, type PaginationState, type SortingState } from "@tanstack/react-table";
import type { DateRange } from "react-day-picker";

import { AffilitorAPI } from "@/api";
import { formatDateYYYYMMDD } from "@/helper/formattingDate";
import { columnsDef } from "@/constants/columns/traderPerformanceColumns";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";

import NoDataFound from "@/components/dashboard/common/NoDataFound";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import TraderPerformanceTable from "@/components/dashboard/affiiliator/traderPerformance/TraderPerformanceTable";

import Spinner from "@/components/ui/Spinner";
import Tooltip from "@/components/ui/Tooltip";
import SelectDropdown from "@/components/ui/SelectDropdown";
import RangeDataPicker from "@/components/ui/RangeDataPicker";

import DateRangeButton from "../common/DateRangeButton";

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
  total_earning: number;
};

const supportEntry = [
  { "key": "20", "value": "20"}, 
  { "key": "50", "value": "50"},
  { "key": "100", "value": "100"}
];
const defaultFrom = subDays(new Date(), 30);
const defaultTo = new Date();

const TraderPerformancePage = () => {
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPopupRange, setShowPopupRange] = useState<boolean>(false); 
  const [dataTraderPerformance, setDataTraderPerformance] = useState<TraderPerformance[]>([]);

  // Table State
  const [range, setRange] = useState<DateRange>({
    from: defaultFrom,
    to: defaultTo
  });
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
      const initRange = range.from ? formatDateYYYYMMDD(range.from) : formatDateYYYYMMDD(new Date());
      const endRange = range.to ? formatDateYYYYMMDD(range.to) : initRange;
      const { error, data } = await AffilitorAPI.getTraderPerformance({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sortBy: sort?.id ?? "created_at",
        orderBy: sort?.desc === undefined ? "desc" :
          sort?.desc ? "desc" : "asc",
        startDate: initRange, 
        endDate: endRange,
      });

      if (!error && data) {
        const temp = data.data.map((item: ResponseTraderPerformance) => ({
          created_at: item.created_at,
          account_number: item.account_number,
          broker: item.broker.name,
          trader: item.user.full_name,
          total_rebate: item.total_rebate,
          commission: item.total_earning
        }));
        setDataTraderPerformance(temp);
        setPagination({
          pageIndex: data.meta.page - 1,
          pageSize: data.meta.limit
        });
        setTotalData(data.meta.total);
        setTotalPages(data.meta.totalPages);
      }
    } finally {
      setInitLoad(false);
      setIsLoading(false);
      setShowPopupRange(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, range, sorting]);

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
  const applyChangeRangeDate = (dateRange: DateRange) => {
    if (isLoading) return;
    setRange(dateRange);
  } 

  useLockBodyScroll(showPopupRange);
  const useFilter =
    !!range?.from &&
    !!range?.to &&
    (
      !isEqual(range.from, defaultFrom) ||
      !isEqual(range.to, defaultTo)
    );
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
        <div className="flex items-center justify-between gap-2">
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

          <div className="flex items-center gap-2 w-fit">
            <div className="hidden md:block">
              <DateRangeButton 
                openPopup={() => setShowPopupRange(true)} 
                isLoading={isLoading} 
                range={range} 
              />
            </div>
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
        <div className="mt-2 block md:hidden">
          <DateRangeButton 
            openPopup={() => setShowPopupRange(true)} 
            isLoading={isLoading} 
            range={range} 
            containerCL="w-full!"
            buttonCL="w-full!"
          />
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
            {useFilter ? 
              "Tidak ada pendapatan terkini dari trader yang sesuai dengan filter Anda." 
            :
              "Saat ini, belum ada pendapatan terkini dari trader Anda. Mulai undang trader untuk mendapatkan komisi rebate."
            }
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

      {/* FLOATING */}
      <RangeDataPicker 
        isOpen={showPopupRange} 
        onClose={() => {
          if (!isLoading) setShowPopupRange(false);
        }} 
        currentRange={range} 
        applyRange={applyChangeRangeDate}
        isLoading={isLoading}
      />
    </WrapperDashboardComponent>
  )
}

export default TraderPerformancePage;
