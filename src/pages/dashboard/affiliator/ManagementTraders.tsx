import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { getCoreRowModel, useReactTable, type PaginationState, type SortingState } from "@tanstack/react-table";

import type { FullStatusType, StatusType } from "@/types/status.type";
import { statusMap } from "@/constants/statusDropdown";
import { AffilitorAPI } from "@/api";
import { columnsDef } from "@/constants/columns/traderAffiliatorColumns";

import NoDataFound from "@/components/dashboard/common/NoDataFound";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import SearchDashboard from "@/components/dashboard/common/SearchDashboard";
import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import TraderAffiliatorTable from "@/components/dashboard/affiiliator/managemenTrader/TraderAffiliatorTable";

import Spinner from "@/components/ui/Spinner";
import Tooltip from "@/components/ui/Tooltip";
import SelectDropdown from "@/components/ui/SelectDropdown";

import { LuRefreshCcw } from "react-icons/lu";

export type TraderBroker = {
  trader: string;
  broker: string;
  account_number: string;
  status: StatusType;
  total_rebates: number;
};
type ResponseTraderAffiliator = {
  account_number: string;
  user: { full_name: string };
  status: string;
  broker: { name: string };
  total_rebates: number;
};

const supportEntry = [
  { "key": "20", "value": "20"}, 
  { "key": "50", "value": "50"},
  { "key": "100", "value": "100"}
];

const ManagementTraders = () => {
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataTraderBroker, setDataTraderBroker] = useState<TraderBroker[]>([]);

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
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const sort = sorting[0];
      const { error, data } = await AffilitorAPI.getTraderBroker({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        status: filterStatus === "all" ? undefined : filterStatus,
        search: debouncedSearch,
        sortBy: sort?.id ?? "created_at",
        orderBy: sort?.desc === undefined ? "desc" :
          sort?.desc ? "desc" : "asc"
      });

      if (!error && data) {
        const raw = data.data;
        const temp = raw.data.map((item: ResponseTraderAffiliator) => ({
          trader: item.user.full_name,
          broker: item.broker.name,
          account_number: item.account_number,
          status: item.status,
          total_rebates: item.total_rebates
        }));
        setDataTraderBroker(temp);
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
  }, [sorting, pagination.pageIndex, pagination.pageSize, filterStatus, debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(globalFiltering);
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, 500);

    return () => clearTimeout(handler);
  }, [globalFiltering]);

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
  const handleChangeGlobalFiltering = (e: ChangeEvent<HTMLInputElement>) => {
    setGlobalFiltering(e.target.value);
  }   
  
  const useFilter = filterStatus !== "all" || debouncedSearch !== "";
  return (
    <WrapperDashboardComponent>
      <section>
        {/* HEADER */}
        <TitleDashboard>
          Traders
        </TitleDashboard>
        <ParagraphDashboard maxW="full">
          Daftar trader aktif, periksa status akun mereka, dan lihat kontribusi rebate yang dihasilkan dari setiap akun.
        </ParagraphDashboard>

        {/* FILTER TABLE */}
        <div className="mt-3 md:mt-4 mb-4 2xl:mt-5 2xl:mb-5">
          <div className="space-y-2"> 
            <SearchDashboard 
              query={globalFiltering}
              onQuery={handleChangeGlobalFiltering}
              placeholder="Cari broker atau nomor akun trading"
              containerCL="max-w-full!"
            />
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
        </div>

        {/* TABLE */}
        <TraderAffiliatorTable
          tableInstance={tableInstance}
          isLoading={initLoad || isLoading}
        />

        {/* LOADING & 0 DATA TABLE */}
        {dataTraderBroker.length === 0 && (initLoad || isLoading) &&
          <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
            <Spinner />
          </div>
        }
        {dataTraderBroker.length === 0 && !initLoad && !isLoading &&
          <NoDataFound>
            <p className="text-black/80 text-base 2xl:text-xl">
            {useFilter ?
              "Tidak ditemukan data trader yang sesuai dengan filter atau pencarian Anda." :
              "Saat ini, belum ada trader aktif dengan akun broker yang terhubung. Mulai undang trader untuk mendapatkan komisi rebate."}
            </p>
          </NoDataFound>
        }

        <div className="mt-4">
          <p className="text-base 2xl:text-xl text-black/80">
            {`Menampilkan 
            ${pagination.pageIndex === 0 ? (dataTraderBroker.length > 0 ? "1":"0") : pagination.pageSize * pagination.pageIndex} 
            hingga  
            ${pagination.pageIndex === 0 ? dataTraderBroker.length : (pagination.pageSize * pagination.pageIndex) + dataTraderBroker.length} 
            dari ${totalData}
            entri.`}
          </p>
        </div>
      </section>
    </WrapperDashboardComponent>
  )
}

export default ManagementTraders;
