
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { getCoreRowModel, useReactTable, type PaginationState, type RowSelectionState, type SortingState } from "@tanstack/react-table";

import { AdminAPI } from "@/api";
import type { AffiliatorAdminManagement, ResponseAffiliatorManagement } from "@/types/affiliator.type";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";
import { statusMapNoRejected } from "@/constants/statusDropdown";
import { useAdminOverviewContext } from "@/hooks/useAdminOverviewContext";
import { columnsDef } from "@/constants/columns/affiliatorManagementColumns";

import NoDataFound from "@/components/dashboard/common/NoDataFound";
import CardOverview from "@/components/dashboard/common/CardOverview";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import SearchDashboard from "@/components/dashboard/common/SearchDashboard";
import FloatingSelection from "@/components/dashboard/common/FloatingSelection";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import PaginationFooterTable from "@/components/dashboard/admin/common/PaginationFooterTable";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import TableAffiliatorAdmin from "@/components/dashboard/admin/affiliatorManagement/TableAffiliatorAdmin";
import DrawerAffiliatorDetail from "@/components/dashboard/admin/affiliatorManagement/DrawerAffiliatorDetail";

import Tooltip from "@/components/ui/Tooltip";
import Spinner from "@/components/ui/Spinner";
import SelectDropdown from "@/components/ui/SelectDropdown";

import { toast } from "react-toastify";
import { FaUsers } from "react-icons/fa6";
import { CgInfo } from "react-icons/cg";
import { LuRefreshCcw } from "react-icons/lu";

const supportEntry = [
  { key: "20", value: "20"}, 
  { key: "50", value: "50"},
  { key: "100", value: "100"}
];

const AffiliatorsManagement = () => {
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Data Overview
  const { dataAdminOverview, fetchDataAdminOverview } = useAdminOverviewContext();

  // Data Table
  const [dataAffiliators, setDataAffiliators] = useState<AffiliatorAdminManagement[]>([]);
  const [selectedData, setSelectedData] = useState<AffiliatorAdminManagement | null>(null);
 
  // Table State
  const [globalFiltering, setGlobalFiltering] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved">("all");
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
      const status = filterStatus === "all" ? undefined : filterStatus === "pending" ? "verifying" : "approved"; 
      const { error, message, data } = await AdminAPI.getDataAffiliator({
        search: debouncedSearch,
        status: status,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sortBy: sort?.id ?? "created_at",
        orderBy: sort?.desc === undefined ? "desc" :
          sort?.desc ? "desc" : "asc"
      });

      if (!error && data) {
        const temp = data.data.map((item: ResponseAffiliatorManagement) => ({
          id: item.id,
          full_name: item.full_name,
          email: item.email,
          status: item.is_email_verified ? "approved" : "pending",
          created_at: item.created_at,
          total_referred: item.total_referred,
          tier: item.tier || "standard"
        }));
        setDataAffiliators(temp);
        setPagination({
          pageIndex: data.meta.page - 1,
          pageSize: data.meta.limit
        });
        setTotalData(data.meta.total);
        setTotalPages(data.meta.totalPages);
      } else {
        toast.error(message);
      }
    } finally {
      setInitLoad(false);
      setIsLoading(false);
      await fetchDataAdminOverview(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, filterStatus, pagination.pageIndex, pagination.pageSize, sorting]);

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
    data: dataAffiliators,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
    state: {
      sorting,
      pagination,
      globalFilter: globalFiltering,
      rowSelection
    },
    pageCount: totalPages,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFiltering,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true
  });

  // Function Filter
  const handleChangeStatus = (key: string) => {
    setFilterStatus(key as "all" | "approved" | "pending");
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
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

  useLockBodyScroll(selectedData !== null);
  const useFilter = filterStatus !== "all" || globalFiltering; 
  return (
    <WrapperDashboardComponent>
      {/* CARD OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CardOverview 
          title={"Total Refferal Partners"} 
          icon={<FaUsers />} 
          content={dataAdminOverview ? dataAdminOverview.affiliators.toLocaleString() : "0"} 
          detail={"Total active record Refferal Partner"} 
          isLoading={dataAdminOverview === null}
        />
        <CardOverview 
          title={"Pending Refferal Partners"} 
          icon={<FaUsers />} 
          content={dataAdminOverview ? dataAdminOverview.pendingAffiliators.toLocaleString() : "0"} 
          detail={`Unverified users out of ${dataAdminOverview ? dataAdminOverview.affiliators.toLocaleString() : "0"} total registrations`} 
          status="warning" 
          isLoading={dataAdminOverview === null}
        />
      </div>
      
      <section className="mt-5">
        <TitleDashboard>
          Refferal Partners Management
        </TitleDashboard>

        {/* FILTER TABLE */}
        <div className="my-4 flex flex-col md:flex-row justify-between items-center gap-2 3xl:gap-3">
          <div className="flex flex-col md:flex-row items-center gap-2 3xl:gap-3 w-full">
            <SearchDashboard 
              query={globalFiltering} 
              onQuery={handleChangeGlobalFiltering} 
              placeholder={"Cari nama lengkap atau email"} />
            {tableInstance.getSelectedRowModel().flatRows.length === 1 && 
              <div className="flex items-center gap-2 3xl:gap-3 w-full md:w-fit">
                {tableInstance.getSelectedRowModel().flatRows.length === 1 && 
                  <Tooltip 
                    fullMobile
                    disabled={false}
                    variant="primary"
                    icon={<CgInfo className={`text-xl`} />} 
                    handleClick={() => {
                      setSelectedData(tableInstance.getSelectedRowModel().rows[0].original)
                    }} 
                    detail={"Detail Data"} />
                }
              </div>
            }
          </div>
          <div className="flex items-center gap-2 3xl:gap-3 w-full md:w-fit">
            <SelectDropdown 
              selectedInput={filterStatus} 
              handleChangeInput={handleChangeStatus} 
              objectInput={statusMapNoRejected}     
              disabled={isLoading}  
              wrapperCL="w-full! md:w-[150px]! 3xl:w-[200px]!"             
              inputCL="w-[200px]! 3xl:w-[240px]!"        
            />
            <Tooltip 
              disabled={isLoading}
              icon={<LuRefreshCcw className={`${isLoading ? "animate-spin" : ""}`} />} 
              handleClick={fetchData} 
              detail={"Reload Data"} />
              
            <NextPreviousButton 
              onNextPage={tableInstance.nextPage}
              onPreviousPage={tableInstance.previousPage}
              disabledNext={isLoading || !tableInstance.getCanNextPage()}
              disabledPrev={isLoading || !tableInstance.getCanPreviousPage()}
            />
          </div>
        </div>
        
        {/* TABLE */}
        <TableAffiliatorAdmin 
          tableInstance={tableInstance}
          isLoading={initLoad || isLoading}
        />

        {/* LOADING & 0 DATA TABLE */}
        {dataAffiliators.length === 0 && (initLoad || isLoading) &&
          <div className="mt-4 3xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
            <Spinner />
          </div>
        }
        {dataAffiliators.length === 0 && !initLoad && !isLoading &&
          <NoDataFound useImage>
            <p className="text-black/80 text-base 3xl:text-xl">
            {useFilter ?
              "Tidak ditemukan data refferal partner yang sesuai dengan filter atau pencarian Anda." :
              "Belum ada refferal partner yang terdaftar di sistem saat ini."}
            </p>
          </NoDataFound>
        }

        {/* FOOTER */}
        <PaginationFooterTable
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalData={totalData}
          onChangePageSize={handleChangeFilterLimit}
          onNext={tableInstance.nextPage}
          onPrev={tableInstance.previousPage}
          disabledNext={isLoading || !tableInstance.getCanNextPage()}
          disabledPrev={isLoading || !tableInstance.getCanPreviousPage()}
          isLoading={initLoad || isLoading}
          supportEntry={supportEntry}
        /> 
      </section>

      {/* FLOATING SECTION */}
      {tableInstance.getSelectedRowModel().flatRows.length > 0 &&
        <FloatingSelection 
          selectedNumber={tableInstance.getSelectedRowModel().flatRows.length} 
          onClose={() => tableInstance.resetRowSelection()} 
        />
      }
      {selectedData && 
        <DrawerAffiliatorDetail
          dataAffiliator={selectedData} 
          onCloseDrawer={() => setSelectedData(null)}
          isOpen={selectedData !== null}
        />
      }
    </WrapperDashboardComponent>
  )
}

export default AffiliatorsManagement;
