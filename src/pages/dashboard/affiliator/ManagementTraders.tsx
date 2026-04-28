import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import SelectDropdown from "@/components/ui/SelectDropdown";
import Tooltip from "@/components/ui/Tooltip";
import { columnsDef } from "@/constants/columns/traderAffiliatorColumns";
import type { FullStatusType, StatusType } from "@/types/status.type";
import { statusMap } from "@/utils/dataDropdownDashboard";
import { getCoreRowModel, useReactTable, type PaginationState, type SortingState } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";

type TraderBroker = {
  trader: string;
  broker: string;
  account_number: string;
  status: StatusType;
  total_rebate: string;
};

const supportEntry = [
  { "key": "20", "value": "20"}, 
  { "key": "50", "value": "50"},
  { "key": "100", "value": "100"}
];

const ManagementTraders = () => {
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataTraderBroker, setDataTraderBroker] = useState<[]>([]);

  // Table State
  const [filterStatus, setFilterStatus] = useState<FullStatusType>("all");
  const [globalFiltering, setGlobalFiltering] = useState<string>("");
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
    } finally {
      setInitLoad(false);
      setIsLoading(false);
    }
  }, []);

  const tableInstance = useReactTable({
    columns: columnsDef,
    data: dataTraderBroker,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
    state: {
      sorting,
      pagination,
      globalFilter: globalFiltering,
    },
    pageCount: totalPages,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFiltering,
    onPaginationChange: setPagination,
    enableRowSelection: true
  });

  // Function Helper
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

  return (
    <WrapperDashboardComponent>
      <section>
        {/* HEADER */}
        <TitleDashboard>
          Traders
        </TitleDashboard>
        <ParagraphDashboard>
          Daftar trader aktif, periksa status akun mereka, dan lihat kontribusi rebate yang dihasilkan dari setiap akun.
        </ParagraphDashboard>
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
      </section>
    </WrapperDashboardComponent>
  )
}

export default ManagementTraders;
