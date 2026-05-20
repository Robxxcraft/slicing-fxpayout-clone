// TODO: TIER DISPLAY

import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import { getCoreRowModel, useReactTable, type PaginationState, type RowSelectionState, type SortingState } from "@tanstack/react-table";

import { AdminAPI } from "@/api";
import type { UserTier } from "@/types/user.type";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";
import type { ResponseTradersAdminManagement, TradersAdminManagement } from "@/types/trader.type";
import { statusMapNoRejected } from "@/constants/statusDropdown";
import { tierMapTrader } from "@/constants/tierDropdown";
import { columnsDef } from "@/constants/columns/traderManagementColumns";
import { templateTier } from "@/constants/templateTier";
import { useAdminOverviewContext } from "@/hooks/useAdminOverviewContext";

import NoDataFound from "@/components/dashboard/common/NoDataFound";
import CardOverview from "@/components/dashboard/common/CardOverview";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import SearchDashboard from "@/components/dashboard/common/SearchDashboard";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import TableTraderAdmin from "@/components/dashboard/admin/traderManagement/TableTraderAdmin";
import FloatingStatusSelection from "@/components/dashboard/common/FloatingStatusSelection";
import PaginationFooterTable from "@/components/dashboard/admin/common/PaginationFooterTable";
import FloatingSelection from "@/components/dashboard/common/FloatingSelection";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import DrawerTraderDetail from "@/components/dashboard/admin/traderManagement/DrawerTraderDetail";

import Spinner from "@/components/ui/Spinner";
import Tooltip from "@/components/ui/Tooltip";
import ModalConfirmation from "@/components/ui/ModalConfirmation";
import SelectDropdown from "@/components/ui/SelectDropdown";

import { CgInfo } from "react-icons/cg";
import { FaUsers } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";

const supportEntry = [
  { key: "20", value: "20"}, 
  { key: "50", value: "50"},
  { key: "100", value: "100"}
];

const TradersManagement = () => {
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPopupTier, setShowPopupTier] = useState<boolean>(false);
  const [selectedTierChange, setSelectedTierChange] = useState<UserTier | null>(null);

  // Data Overview
  const { dataAdminOverview, fetchDataAdminOverview } = useAdminOverviewContext();

  // Data Table
  const [dataTraders, setDataTraders] = useState<TradersAdminManagement[]>([]);
  const [selectedData, setSelectedData] = useState<TradersAdminManagement | null>(null);

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
      const { error, message, data } = await AdminAPI.getDataTrader({
        search: debouncedSearch,
        status: status,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sortBy: sort?.id ?? "created_at",
        orderBy: sort?.desc === undefined ? "desc" :
          sort?.desc ? "desc" : "asc"
      });

      if (!error && data) {
        const temp = data.data.map((item: ResponseTradersAdminManagement) => ({
          id: item.id,
          full_name: item.full_name,
          email: item.email,
          status: item.is_email_verified ? "approved" : "pending",
          created_at: item.created_at,
          total_balance: item.total_balance,
          tier: item.tier || "standard"
        }));
        setDataTraders(temp);
        setPagination({
          pageIndex: data.meta.page - 1,
          pageSize: data.meta.limit
        });
        setTotalData(data.meta.total);
        setTotalPages(data.meta.totalPages);
        setRowSelection({});
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
    data: dataTraders,
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

  // Function Helper
  const handleChangeTierUser = async () => {
    if (isLoading || !selectedTierChange) return;
        
    setIsLoading(true);
    const userId = tableInstance.getSelectedRowModel().flatRows.map((item) => Number(item.original.id))[0];
    const { error, message } = await AdminAPI.changeTierUser({
      userId: userId, tier: selectedTierChange
    });
    if (error) {
      toast.error(message);
    } else {
      setDataTraders((prev) => (
        prev.map((item) => {
          if (item.id === userId) {
            return {
              ...item,
              tier: selectedTierChange
            }
          }
          return item;
        })
      ));
      toast.success(message);
      fetchData();
    }
    setShowPopupTier(false);
    setIsLoading(false);
  }

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
  const openPopUpTier = (key: string) => {
    setShowPopupTier(true);
    setSelectedTierChange(key as UserTier);
  }

  useLockBodyScroll(selectedData !== null);
  const useFilter = filterStatus !== "all" || globalFiltering; 
  return (
    <WrapperDashboardComponent>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CardOverview 
          title={"Total Traders"} 
          icon={<FaUsers />} 
          content={dataAdminOverview ? dataAdminOverview.traders.toLocaleString() : "0"} 
          detail={"Total active record traders"} 
          isLoading={dataAdminOverview === null}  
        />
        <CardOverview 
          title={"Pending Traders"} 
          icon={<FaUsers />} 
          content={dataAdminOverview ? dataAdminOverview.pendingTraders.toLocaleString() : "0"} 
          detail={`Unverified users out of ${dataAdminOverview ? dataAdminOverview.traders.toLocaleString() : "0"} total registrations`} 
          status="warning" 
          isLoading={dataAdminOverview === null}  
        />
      </div>
      <section className="mt-5">
        <TitleDashboard>
          Traders Management
        </TitleDashboard>

        {/* FILTER TABLE */}
        <div className="my-4 flex flex-col md:flex-row justify-between items-center gap-2 2xl:gap-3">
          <div className="flex flex-col md:flex-row items-center gap-2 2xl:gap-3 w-full">
            <SearchDashboard 
              query={globalFiltering} 
              onQuery={handleChangeGlobalFiltering} 
              placeholder={"Cari nama lengkap atau email"} />
            {tableInstance.getSelectedRowModel().flatRows.length === 1 && 
              <div className="flex items-center gap-2 2xl:gap-3 w-full md:w-fit">
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
          <div className="flex items-center gap-2 2xl:gap-3 w-full md:w-fit">
            <SelectDropdown 
              selectedInput={filterStatus} 
              handleChangeInput={handleChangeStatus} 
              objectInput={statusMapNoRejected}       
              wrapperCL="w-full! md:w-[150px]! 2xl:w-[200px]!"             
              inputCL="w-[200px]! 2xl:w-[240px]!"        
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

        <TableTraderAdmin 
          tableInstance={tableInstance}
          isLoading={initLoad || isLoading}
        />

        {/* LOADING & 0 DATA TABLE */}
        {dataTraders.length === 0 && (initLoad || isLoading) &&
          <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
            <Spinner />
          </div>
        }
        {dataTraders.length === 0 && !initLoad && !isLoading &&
          <NoDataFound useImage>
            <p className="text-black/80 text-base 2xl:text-xl">
            {useFilter ?
              "Tidak ditemukan data trader yang sesuai dengan filter atau pencarian Anda." :
              "Belum ada trader yang terdaftar di sistem saat ini."}
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
      {tableInstance.getSelectedRowModel().flatRows.length === 1 ?
        <FloatingStatusSelection 
          selectedNumber={tableInstance.getSelectedRowModel().flatRows.length} 
          onClose={() => tableInstance.resetRowSelection()} 
          onChangeStatus={openPopUpTier}
          command="Ubah Tier"
          objectsInput={tierMapTrader}
        /> : tableInstance.getSelectedRowModel().flatRows.length > 1 && 
        <FloatingSelection
          selectedNumber={tableInstance.getSelectedRowModel().flatRows.length} 
          onClose={() => tableInstance.resetRowSelection()} 
        />
      }
      {selectedData && 
        <DrawerTraderDetail
          isOpen={selectedData !== null}
          dataTrader={selectedData} 
          onCloseDrawer={() => setSelectedData(null)}
        />
      }
      {showPopupTier &&
        <ModalConfirmation 
          title={`Konfirmasi Perubahan Tier`} 
          paragraph={`Apakah anda yakin ingin mengubah tier pengguna menjadi
            ${selectedTierChange ? templateTier["user"][selectedTierChange].title : "(Eror: tier tidak terdeteksi)"}?  
          `} 
          isVisible={showPopupTier} 
          handleClose={() => setShowPopupTier(false)} 
          handleConfirmation={handleChangeTierUser} 
          btnConfirmation={"primary"} 
          confirmText={"Konfirmasi"} 
          cancelText={"Batal"}        
        />
      }
    </WrapperDashboardComponent>
  )
}

export default TradersManagement;
