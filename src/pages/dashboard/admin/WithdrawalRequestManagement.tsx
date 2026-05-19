import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import { isEqual, subDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { 
  getCoreRowModel, 
  useReactTable, 
  type PaginationState, 
  type RowSelectionState, 
  type SortingState 
} from "@tanstack/react-table";

import { AdminAPI } from "@/api";
import { statusMap, statusMapNoPendingAll } from "@/constants/statusDropdown";
import { formattingUsd } from "@/helper/formattingCurrency";
import { formatDateYYYYMMDD } from "@/helper/formattingDate";
import { columnsDef } from "@/constants/columns/withdrawalManagementColumns";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";
import { useAdminOverviewContext } from "@/hooks/useAdminOverviewContext";
import type { FullStatusType, SetStatusType } from "@/types/status.type";
import type { ResponseWithdrawalAPI, WithdrawalAdminManagement } from "@/types/withdrawal.type";

import RangeDataPicker from "@/components/ui/RangeDataPicker";
import NoDataFound from "@/components/dashboard/common/NoDataFound";
import CardOverview from "@/components/dashboard/common/CardOverview";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import SearchDashboard from "@/components/dashboard/common/SearchDashboard";
import FloatingSelection from "@/components/dashboard/common/FloatingSelection";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import PaginationFooterTable from "@/components/dashboard/admin/common/PaginationFooterTable";
import DrawerWithdrawalDetail from "@/components/dashboard/admin/withdrawalManagement/DrawerWithdrawalDetail";
import FloatingStatusSelection from "@/components/dashboard/common/FloatingStatusSelection";
import TableDataWithdrawals from "@/components/dashboard/admin/withdrawalManagement/TableDataWithdrawals";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";

import Spinner from "@/components/ui/Spinner";
import Tooltip from "@/components/ui/Tooltip";
import SelectDropdown from "@/components/ui/SelectDropdown";
import ModalConfirmation from "@/components/ui/ModalConfirmation";
import DateRangeButton from "../common/DateRangeButton";

import { CgInfo } from "react-icons/cg";
import { LuRefreshCcw } from "react-icons/lu";
import { IoCardOutline, IoWalletOutline } from "react-icons/io5";

const supportEntry = [
  { key: "20", value: "20"}, 
  { key: "50", value: "50"},
  { key: "100", value: "100"}
];

const defaultFrom = subDays(new Date(), 30);
const defaultTo = new Date();

const WithdrawalRequestManagement = () => {
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showPopupRange, setShowPopupRange] = useState<boolean>(false);
  const [showPopupStatus, setShowPopupStatus] = useState<boolean>(false);
  const [selectedStatusChange, setSelectedStatusChange] = useState<SetStatusType | null>(null);

  // Data Overview
  const { dataAdminOverview, fetchDataAdminOverview } = useAdminOverviewContext();

  // Data Table
  const [dataWithdrawals, setDataWithdrawals] = useState<WithdrawalAdminManagement[]>([]);
  const [selectedData, setSelectedData] = useState<WithdrawalAdminManagement | null>(null);

  // Table State
  const [range, setRange] = useState<DateRange>({
    from: defaultFrom,
    to: defaultTo
  });
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
      const initRange = range.from ? formatDateYYYYMMDD(range.from) : formatDateYYYYMMDD(new Date());
      const endRange = range.to ? formatDateYYYYMMDD(range.to) : initRange;
      const { error, message, data } = await AdminAPI.getAllWithdrawalRequests({
        search: debouncedSearch,
        status: filterStatus === "all" ? undefined : filterStatus,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sortBy: sort?.id ?? "created_at",
        orderBy: sort?.desc === undefined ? "desc" :
          sort?.desc ? "desc" : "asc",
        startDate: initRange, 
        endDate: endRange, 
      });
  
      if (!error && data) {
        const temp = data.data.map((item: ResponseWithdrawalAPI) => {
          const useUsd = item.currency === "USD";
          const useCrypto = item.bank_name === null && item.bank_account_name === null && item.bank_account_number === null;
          return ({
            id: item.id,
            user_id: item.user_id,
            bank_id: item.bank_id,
            method: useCrypto ? "crypto" : "bank",
            bank_name: useCrypto ? "Crypto" : item.bank_name || "-",
            account_name: useCrypto ? item.user.full_name : item.bank_account_name || "-",
            wallet_address: useCrypto ? item.wallet_address : item.bank_account_number || "-",
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
      setShowPopupRange(false);
      await fetchDataAdminOverview(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, filterStatus, pagination.pageIndex, pagination.pageSize, sorting, range]);

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

  // Function Filter Table
  const handleChangeFilterStatus = (key: string) => {
    if (isLoading) return;
    setFilterStatus(key as FullStatusType);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }  
  const handleChangeFilterLimit = (key: string) => {
    if (isLoading) return;
    setPagination({
      pageIndex: 0,
      pageSize: Number(key)
    });
  } 
  const handleChangeGlobalFiltering = (e: ChangeEvent<HTMLInputElement>) => {
    setGlobalFiltering(e.target.value);
  } 
  const applyChangeRangeDate = (dateRange: DateRange) => {
    if (isLoading) return;
    setRange(dateRange);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  } 

  useLockBodyScroll(selectedData !== null || showPopupStatus || showPopupRange);
  const dateFilter =
    !!range?.from &&
    !!range?.to &&
    (
      !isEqual(range.from, defaultFrom) ||
      !isEqual(range.to, defaultTo)
    );
  const useFilter = filterStatus !== "all" || globalFiltering || dateFilter; 
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
          content={dataAdminOverview ? formattingUsd(dataAdminOverview.totalCommission).toString() : "$0.00"} 
          detail={"Total commission successfully disbursed"} 
          isLoading={dataAdminOverview === null}  
        />
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
        <div className="my-4 flex flex-col justify-between items-center gap-2 2xl:gap-3">
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
          <div className="flex flex-col md:flex-row items-center gap-2 2xl:gap-3 w-full">
            <DateRangeButton 
              openPopup={() => setShowPopupRange(true)} 
              isLoading={isLoading} 
              range={range} 
              containerCL="w-full!"
              buttonCL="w-full!"
            />
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
        <FloatingStatusSelection 
          selectedNumber={tableInstance.getSelectedRowModel().flatRows.length} 
          onClose={() => tableInstance.resetRowSelection()} 
          onChangeStatus={openPopUpStatus} 
          command="Ubah Status"
          objectsInput={statusMapNoPendingAll}
        />
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

export default WithdrawalRequestManagement;
