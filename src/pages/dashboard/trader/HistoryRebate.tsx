import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isEqual, subDays } from "date-fns";
import { type DateRange } from "react-day-picker";
import { getColumnsDef } from "@/constants/columns/historyRebateColumns";
import { getCoreRowModel, useReactTable, type PaginationState, type SortingState } from "@tanstack/react-table";

import { TraderAPI } from "@/api";
import { brokersName } from "@/constants/brokersName";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";
import { formatDateYYYYMMDD } from "@/helper/formattingDate";
import type { ResponseRebateAPI, TypeRebateTrader } from "@/types/rebate.type";

import NoDataFound from "@/components/dashboard/common/NoDataFound";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import HistoryRebateTable from "@/components/dashboard/trader/historyRebate/HistoryRebateTable";
import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";

import DateRangeButton from "../common/DateRangeButton";

import Tooltip from "@/components/ui/Tooltip";
import Spinner from "@/components/ui/Spinner";
import SelectDropdown from "@/components/ui/SelectDropdown";
import RangeDataPicker from "@/components/ui/RangeDataPicker";

import { LuRefreshCcw } from "react-icons/lu";

const supportEntry = [
  { "key": "20", "value": "20" }, 
  { "key": "50", "value": "50" },
  { "key": "100", "value": "100" }
];

const defaultFrom = subDays(new Date(), 30);
const defaultTo = new Date();

const HistoryRebate = () => {
  const { i18n } = useTranslation();
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPopupRange, setShowPopupRange] = useState<boolean>(false); 
  const [dataRebate, setDataRebate] = useState<TypeRebateTrader[]>([]);
  const { brokerParams } = useParams();
  const brokerName = brokersName.find(
    (item) =>
      item.toLowerCase().replace(/\s+/g, "-") === brokerParams
  );

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
      const { error, data } = await TraderAPI.getRebatesByTrader({
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        brokerSearch: brokerName ? brokerName : undefined,
        sortBy: sort?.id ?? "created_at",
        orderBy: sort?.desc === undefined ? "desc" :
          sort?.desc ? "desc" : "asc",
        startDate: initRange, 
        endDate: endRange, 
      });
  
      if (!error && data) {
        const temp = data.data.map((item: ResponseRebateAPI) => ({
          created_at: item.created_at,
          broker: item.broker.name,
          account_number: item.account_number,
          rebate: item.total_rebate,
          status: item.status
        }));
        setDataRebate(temp);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brokerParams, pagination.pageIndex, pagination.pageSize, sorting, range]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns = useMemo(() => getColumnsDef(i18n.language), [i18n.language]);
  const tableInstance = useReactTable({
    columns: columns,
    data: dataRebate,
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
      <section>
        <TitleDashboard>
          History Rebate 
          {brokerParams && brokerName &&
            <span className="ml-2 bg-linear-to-t from-dark-primary to-primary bg-clip-text text-transparent">
              {brokerName}
            </span>
          }
        </TitleDashboard>
        <ParagraphDashboard maxW="w-fit lg:w-[760px] 2xl:w-full">
          Daftar riwayat perolehan rebate Anda. Gunakan filter untuk melihat detail komisi berdasarkan periode waktu serta broker.
        </ParagraphDashboard>

        {/* FILTER TABLE */}
        <div className="mt-3 md:mt-4 mb-4 2xl:mt-5 2xl:mb-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 2xl:gap-2.5 text-[#212529]">
              <span className="text-base 2xl:text-xl">Tampilkan</span>
              <SelectDropdown 
                selectedInput={pagination.pageSize.toString()} 
                handleChangeInput={handleChangeFilterLimit} 
                objectInput={supportEntry}     
                inputCL="w-[72px]!"
                wrapperCL="w-fit!"         
              />
            </div>
            <div className="flex items-center gap-2 2xl:gap-3">
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
        <HistoryRebateTable 
          tableInstance={tableInstance} 
          isLoading={isLoading}        
        />

        {/* LOADING & 0 DATA TABLE */}
        {dataRebate.length === 0 && (initLoad || isLoading) &&
          <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
            <Spinner />
          </div>
        }
        {dataRebate.length === 0 && !initLoad && !isLoading &&
          <NoDataFound>
            {useFilter ? 
              "Tidak ada riwayat perolehan rebate sesuai filter Anda."
            : brokerParams && brokerName ? 
              `Saat ini, Anda tidak memiliki riwayat perolehan rebate pada broker ${brokerName}.`
            : "Saat ini, Anda tidak memiliki riwayat perolehan rebate."}
          </NoDataFound>
        }
        <div className="mt-4">
          <p className="text-base 2xl:text-xl text-black/80">
            {`Menampilkan 
            ${pagination.pageIndex === 0 ? (dataRebate.length > 0 ? "1":"0") : pagination.pageSize * pagination.pageIndex} 
            hingga  
            ${pagination.pageIndex === 0 ? dataRebate.length : (pagination.pageSize * pagination.pageIndex) + dataRebate.length} 
            dari ${totalData}
            entri.`}
          </p>
        </div>
      </section>

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

export default HistoryRebate;
