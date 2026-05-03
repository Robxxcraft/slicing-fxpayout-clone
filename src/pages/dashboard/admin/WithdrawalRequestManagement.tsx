// TODO: SORT DATE?

import { AdminAPI } from "@/api";
import PaginationFooterTable from "@/components/dashboard/admin/common/PaginationFooterTable";
import DrawerWithdrawalDetail from "@/components/dashboard/admin/withdrawalManagement/DrawerWithdrawalDetail";
import TableDataWithdrawals from "@/components/dashboard/admin/withdrawalManagement/TableDataWithdrawals";
import CardOverview from "@/components/dashboard/common/CardOverview";
import ChangeStatusSelection from "@/components/dashboard/common/ChangeStatusSelection";
import FloatingSelection from "@/components/dashboard/common/FloatingSelection";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import NoDataFound from "@/components/dashboard/common/NoDataFound";
import SearchDashboard from "@/components/dashboard/common/SearchDashboard";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import ModalConfirmation from "@/components/ui/ModalConfirmation";
import SelectDropdown from "@/components/ui/SelectDropdown";
import Spinner from "@/components/ui/Spinner";
import Tooltip from "@/components/ui/Tooltip";
import { columnsDef } from "@/constants/columns/withdrawalManagementColumns";
import { formattingUsd } from "@/helper/formattingCurrency";
import { useAdminOverviewContext } from "@/hooks/useAdminOverviewContext";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";
import type { FullStatusType, SetStatusType, StatusType } from "@/types/status.type";
import { statusMap } from "@/utils/dataDropdownDashboard";
import { getCoreRowModel, useReactTable, type PaginationState, type RowSelectionState, type SortingState } from "@tanstack/react-table";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { CgInfo } from "react-icons/cg";
import { IoCardOutline, IoWalletOutline } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import { toast } from "react-toastify";

export type DataWithdrawalManagement = {
  id: number;
  user_id: number;
  bank_id: number | null;
  method: "bank" | "crypto";
  bank_name: string;
  account_name: string;
  wallet_address: string;
  total: string;
  currency: "USD" | "IDR";
  status: StatusType;
  created_at: string;
};
export type ResponseDataWithdrawal = {
 id: number;
 user_id: number;
 bank_id: number;
 wallet_address: string;
 amount_usd: string;
 amount_idr: string;
 currency: string;
 created_at: string;
 status: string;
 user: { full_name: string };
 bank: {
   name: string;
   account_name: string;
   account_number: string;
 } | null
}

const supportEntry = [
  { key: "20", value: "20"}, 
  { key: "50", value: "50"},
  { key: "100", value: "100"}
];

const WithdrawalRequestManagement = () => {
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showPopupStatus, setShowPopupStatus] = useState<boolean>(false);
  const [selectedStatusChange, setSelectedStatusChange] = useState<SetStatusType | null>(null);

  // Data Overview
  const { dataAdminOverview, fetchDataAdminOverview } = useAdminOverviewContext();

  // Data Table
  const [dataWithdrawals, setDataWithdrawals] = useState<DataWithdrawalManagement[]>([]);
  const [selectedData, setSelectedData] = useState<DataWithdrawalManagement | null>(null);

  // Table State
  const [globalFiltering, setGlobalFiltering] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterStatus, setFilterStatus] = useState<FullStatusType>("all");
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
      const { error, message, data } = await AdminAPI.getAllWithdrawalRequests({
        search: debouncedSearch,
        status: filterStatus === "all" ? undefined : filterStatus,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sortBy: sort?.id ?? "created_at",
        orderBy: sort?.desc === undefined ? "desc" :
          sort?.desc ? "desc" : "asc"
      });
  
      if (!error && data) {
        const temp = data.data.map((item: ResponseDataWithdrawal) => {
          const useUsd = item.currency === "USD";
          return ({
            id: item.id,
            user_id: item.user_id,
            bank_id: item.bank_id,
            method: item.bank !== null ? "bank" : "crypto",
            bank_name: item.bank !== null ? item.bank.name : "Crypto",
            account_name: item.bank !== null ? item.bank.account_name : item.user.full_name,
            wallet_address: item.bank !== null ? item.bank.account_number : item.wallet_address,
            total: useUsd ? item.amount_usd : item.amount_idr,
            currency: item.currency,
            status: item.status,
            created_at: item.created_at
          })
        });
        setDataWithdrawals(temp);
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
    data: dataWithdrawals,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    state: {
      sorting,
      pagination,
      globalFilter: globalFiltering,
      rowSelection,
    },
    pageCount: totalPages,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFiltering,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true
  });

  // Function Helper
  const openPopUpStatus = (key: string) => {
    setShowPopupStatus(true);
    setSelectedStatusChange(key as SetStatusType)
  }
  const handleChangeStatusWithdrawals = async () => {
    if (isLoading || !selectedStatusChange) return;
    
    setIsLoading(true);
    const withdrawalIds = tableInstance.getSelectedRowModel().flatRows.map((item) => Number(item.original.id));
    const { error, message } = await AdminAPI.bulkChangeStatusWithdrawals({
      withdrawalIds, status: selectedStatusChange
    });
    if (error) {
      toast.error(message);
    } else {
      if (selectedData) {
        setSelectedData((prev) => {
          if (!prev) return null 
          
          return {
          ...prev,
          status: selectedStatusChange
        }});
      }
      setDataWithdrawals((prev) => (
        prev.map((item) => (
          withdrawalIds.includes(item.id) ?
          {...item, status: selectedStatusChange} :
          item
        ))
      ));
      toast.success(message);
      fetchData();
    }
    setShowPopupStatus(false);
    setIsLoading(false);
  }
  const handleChangeFilterStatus = (key: string) => {
    if (isLoading) return;
    setFilterStatus(key as "all" | "pending" | "approved" | "rejected");
  }  
  const handleChangeFilterLimit = (key: string) => {
    if (isLoading) return;
    setPagination({
      pageIndex: 0,
      pageSize: Number(key)
    });;
  } 
  const handleChangeGlobalFiltering = (e: ChangeEvent<HTMLInputElement>) => {
    setGlobalFiltering(e.target.value);
  } 

  useLockBodyScroll(selectedData !== null || showPopupStatus);
  const useFilter = filterStatus !== "all" || globalFiltering; 
  return (
    <WrapperDashboardComponent>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <CardOverview 
          title={"Total Request"} 
          icon={<IoWalletOutline />} 
          content={dataAdminOverview ? dataAdminOverview.totalWithdrawals.toLocaleString() : "0"} 
          detail={"Total cumulative withdrawal requests"}
          isLoading={dataAdminOverview === null}
        />
        <CardOverview 
          title={"Commission Paid"} 
          icon={<IoCardOutline />} 
          content={dataAdminOverview ? formattingUsd(dataAdminOverview.totalCommission).toString() : "0.00"} 
          detail={"Total commission successfully disbursed"} />
        <CardOverview 
          title={"Pending Request"} 
          icon={<IoWalletOutline />} 
          content={dataAdminOverview ? dataAdminOverview.pendingWithdrawals.toLocaleString() : "0"} 
          detail={"Awaiting administrative review"} 
          status="warning" 
          isLoading={dataAdminOverview === null}  
        />
      </div>
      <section className="mt-5">
        <TitleDashboard>
          Withdrawal Management
        </TitleDashboard>

        {/* FILTER TABLE */}
        <div className="my-4 flex flex-col md:flex-row justify-between items-center gap-2 2xl:gap-3">
          <div className="flex flex-col md:flex-row items-center gap-2 2xl:gap-3 w-full">
            <SearchDashboard 
              query={globalFiltering} 
              onQuery={handleChangeGlobalFiltering} 
              placeholder={"Cari nama lengkap atau alamat penarikan/rekening/wallet"} />
            {tableInstance.getSelectedRowModel().flatRows.length === 1 && 
              <div className="flex items-center gap-2 2xl:gap-3 w-full md:w-fit">
                {tableInstance.getSelectedRowModel().flatRows.length === 1 &&
                  <Tooltip 
                    fullMobile
                    disabled={isLoading}
                    variant="primary"
                    icon={<CgInfo className={`text-xl`} />} 
                    handleClick={() => {
                      setSelectedData(tableInstance.getSelectedRowModel().flatRows[0].original)
                    }} 
                    detail={"Detail Data"} />
                }
              </div>
            }
          </div>
          <div className="flex items-center gap-2 2xl:gap-3 w-full md:w-fit">
            <SelectDropdown 
              selectedInput={filterStatus} 
              handleChangeInput={handleChangeFilterStatus} 
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

        {/* TABLE */}
        <TableDataWithdrawals
          tableInstance={tableInstance}
          isLoading={isLoading}
        />

        {/* LOADING & 0 DATA TABLE */}
        {dataWithdrawals.length === 0 && (initLoad || isLoading) &&
            <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
              <Spinner />
            </div>
        }
        {dataWithdrawals.length === 0 && !initLoad && !isLoading &&
          <NoDataFound useImage>
            {useFilter ?
              "Tidak ditemukan data laporan penarikan yang sesuai dengan filter atau pencarian Anda."
            : 
              "Belum ada data pengguna yang melakukan penarikan dana."
            }
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
      {selectedData &&
        <DrawerWithdrawalDetail 
          dataWithdrawal={selectedData}
          onCloseDrawer={() => {
            setSelectedData(null);
          }}
          isOpen={selectedData !== null}
          openPopUpStatus={openPopUpStatus}
        />
      }

      {tableInstance.getSelectedRowModel().flatRows.length > 0 &&
        (tableInstance.getSelectedRowModel().flatRows.filter(row => row.getValue("status") === "approved").length === 0 ?
        <ChangeStatusSelection 
          selectedNumber={tableInstance.getSelectedRowModel().flatRows.length} 
          onClose={() => tableInstance.resetRowSelection()} 
          onChangeStatus={openPopUpStatus} />
        :
          <FloatingSelection 
            selectedNumber={tableInstance.getSelectedRowModel().flatRows.length} 
            onClose={() => tableInstance.resetRowSelection()} 
          />
        )
      }
      {showPopupStatus && <ModalConfirmation
        title={`Konfirmasi 
          ${selectedStatusChange === "approved" ? "Persetujuan":""} 
          ${selectedStatusChange === "rejected" ? "Penolakan":""}
          ${tableInstance.getSelectedRowModel().flatRows.length} 
          Penarikan Dana`}
        paragraph={`Apakah Anda yakin ingin 
          ${selectedStatusChange === "approved" ? "menyetujui":""}
          ${selectedStatusChange === "rejected" ? "menolak":""}
        status penarikan dana yang dipilih? Tindakan tidak dapat dibatalkan.`}
        handleConfirmation={handleChangeStatusWithdrawals}
        btnConfirmation={selectedStatusChange === "rejected" ? "danger" : "primary-light"}
        isVisible={showPopupStatus} 
        handleClose={() => setShowPopupStatus(false)} 
        cancelText="Batal"
        confirmText={selectedStatusChange === "rejected" ? "Reject" : "Approve"}
      />}  
    </WrapperDashboardComponent>
  )
}

export default WithdrawalRequestManagement;
