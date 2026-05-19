import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { subDays } from "date-fns";
import { isEqual } from "lodash";
import type { DateRange } from "react-day-picker";
import { toast } from "react-toastify";
import { 
  getCoreRowModel, 
  useReactTable, 
  type PaginationState, 
  type RowSelectionState, 
  type SortingState 
} from "@tanstack/react-table";

import { AdminAPI } from "@/api";
import { statusMap, statusMapNoPendingAll } from "@/constants/statusDropdown";
import { columnsDef } from "@/constants/columns/rebatesManagementColumns";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";
import { useAdminOverviewContext } from "@/hooks/useAdminOverviewContext";
import type { FullStatusType, SetStatusType } from "@/types/status.type";
import type { RebateAdminManagement, ResponseRebateAPI } from "@/types/rebate.type";
import { formattingUsd } from "@/helper/formattingCurrency";
import { formatDateYYYYMMDD } from "@/helper/formattingDate";

import CardOverview from "@/components/dashboard/common/CardOverview";
import NoDataFound from "@/components/dashboard/common/NoDataFound";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import SearchDashboard from "@/components/dashboard/common/SearchDashboard";
import FloatingSelection from "@/components/dashboard/common/FloatingSelection";
import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import PaginationFooterTable from "@/components/dashboard/admin/common/PaginationFooterTable";
import FloatingStatusSelection from "@/components/dashboard/common/FloatingStatusSelection";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import DrawerRebateDetail from "@/components/dashboard/admin/rebatesManagement/DrawerRebateDetail";
import TableRebatesManagement from "@/components/dashboard/admin/rebatesManagement/TableRebatesManagement";

import Spinner from "@/components/ui/Spinner";
import Tooltip from "@/components/ui/Tooltip";
import SelectDropdown from "@/components/ui/SelectDropdown";
import ModalConfirmation from "@/components/ui/ModalConfirmation";
import RangeDataPicker from "@/components/ui/RangeDataPicker";
import DateRangeButton from "../common/DateRangeButton";

import { CgInfo } from "react-icons/cg";
import { RiStockFill } from "react-icons/ri";
import { LuRefreshCcw } from "react-icons/lu";
import { IoCardOutline } from "react-icons/io5";

const supportEntry = [
  { key: "20", value: "20"}, 
  { key: "50", value: "50"},
  { key: "100", value: "100"},
  { key: "200", value: "200"}
];

const defaultFrom = subDays(new Date(), 30);
const defaultTo = new Date();

const RebatesManagement = () => {
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showPopupRange, setShowPopupRange] = useState<boolean>(false); 
  const [showPopupStatus, setShowPopupStatus] = useState<boolean>(false);
  const [showPopupDelete, setShowPopupDelete] = useState<boolean>(false);
  const [selectedStatusChange, setSelectedStatusChange] = useState<SetStatusType | null>(null);

  // Data Overview
  const { dataAdminOverview, fetchDataAdminOverview } = useAdminOverviewContext();

  // Data Table
  const [dataRebates, setDataRebates] = useState<RebateAdminManagement[]>([]);
  const [selectedData, setSelectedData] = useState<RebateAdminManagement | null>(null);

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
      const { error, message, data } = await AdminAPI.getAllRebates({
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
        const temp = data.data.map((item: ResponseRebateAPI) => ({
          id: item.id,
          created_at: item.created_at,
          date: item.date,
          account_number: item.account_number,
          broker_name: item.broker.name,
          total_rebate: item.total_rebate,
          status: item.status,
        }));
        setDataRebates(temp);
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
    data: dataRebates,
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
  const handleDeleteRebates = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const rebateIds = tableInstance.getSelectedRowModel().flatRows.map((item) => Number(item.original.id));
    const { error, message } = await AdminAPI.bulkDeleteRebates({ rebateIds });

    if (error) {
      toast.error(message);
    } else {
      await fetchData();
      toast.success(message);
    }
    setShowPopupDelete(false);
    setIsLoading(false);
  }
  const openPopUpStatus = (key: string) => {
    setShowPopupStatus(true);
    setSelectedStatusChange(key as SetStatusType)
  }
  const handleChangeStatusRebates = async () => {
    if (isLoading || !selectedStatusChange) return;
    
    setIsLoading(true);
    const rebateIds = tableInstance.getSelectedRowModel().flatRows.map((item) => Number(item.original.id));
    const { error, message } = await AdminAPI.bulkChangeStatusRebates({
      rebateIds, status: selectedStatusChange
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
      setDataRebates((prev) => (
        prev.map((item) => (
          rebateIds.includes(item.id) ?
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
  const handleUpdateRebateById = async (rebateId: number, totalRebate: string) => {
    const { error, message } = await AdminAPI.updateRebateById({
      rebateId: rebateId,
      totalRebate: totalRebate
    });
    if (!error) {
      toast.success(message);
      if (selectedData) {
        setSelectedData((prev) => {
          if (!prev) return null 
          
          return {
          ...prev,
          total_rebate: parseFloat(totalRebate)
        }});
      }
      setDataRebates((prev) => (
        prev.map((item) => (
          item.id === rebateId ?
          {...item, total_rebate: parseFloat(totalRebate)} :
          item
        ))
      ));
    } else {
      toast.error(message);
    }

    return error;
  }

  // Function Filter
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
    });;
  } 
  const handleChangeGlobalFiltering = (e: ChangeEvent<HTMLInputElement>) => {
    setGlobalFiltering(e.target.value);
  } 
  const applyChangeRangeDate = (dateRange: DateRange) => {
    if (isLoading) return;
    setRange(dateRange);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  } 

  useLockBodyScroll(selectedData !== null || showPopupStatus || showPopupDelete || showPopupRange);
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
          title={"Total Rebates"} 
          icon={<RiStockFill />} 
          content={dataAdminOverview ? dataAdminOverview.totalRebates.toLocaleString() : "0"} 
          detail={"Total data from import rebates"} 
          isLoading={dataAdminOverview === null}  
        />
        <CardOverview 
          title={"Internal Earning"} 
          icon={<IoCardOutline />} 
          content={dataAdminOverview ? formattingUsd(dataAdminOverview.totalInternalCommisions).toString() : "$0.00"} 
          detail={"Total earning rebate for FXPayout"} 
          isLoading={dataAdminOverview === null}  
        />
        <CardOverview 
          title={"Pending Rebates"} 
          icon={<RiStockFill />} 
          content={dataAdminOverview ? dataAdminOverview.pendingRebates.toLocaleString() : "0"} 
          detail={"Requires admin review"} 
          status="warning" 
          isLoading={dataAdminOverview === null}  
        />
      </div>
      <section className="mt-5">
        <div className="space-y-2.5">
          <TitleDashboard>
            History Import Rebates
          </TitleDashboard>
          <ParagraphDashboard maxW="w-full">
            Tinjau hasil import rebates yang dilakukan kemudian verifikasi data rebates. Data yang sudah diverifikasi tidak dapat diubah atau pembatalan verifikasi.
          </ParagraphDashboard>
        </div>

        {/* FILTER TABLE */}
        <div className="my-4 flex flex-col justify-between items-center gap-2 2xl:gap-3">
          <div className="flex flex-col md:flex-row items-center gap-2 2xl:gap-3 w-full">
            <SearchDashboard 
              query={globalFiltering} 
              onQuery={handleChangeGlobalFiltering} 
              placeholder={"Cari id akun trading atau broker"} />
            {tableInstance.getSelectedRowModel().flatRows.length > 0 && 
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
                {tableInstance.getSelectedRowModel().flatRows.length > 0 &&
                  (tableInstance.getSelectedRowModel().flatRows.filter((row) => ["approved", "rejected"].includes(row.getValue("status"))).length === 0) && 
                  <div
                    onClick={() => setShowPopupDelete(true)}
                    className="h-9 2xl:h-12 px-2 2xl:px-4 flex flex-1 items-center rounded-md border border-my-red bg-my-red text-white place-items-center cursor-pointer active:brightness-90 transition-all duration-300 ease-out">
                    <p className="text-nowrap">
                      Hapus {tableInstance.getSelectedRowModel().flatRows.length} data
                    </p>
                  </div>
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
        <TableRebatesManagement 
          tableInstance={tableInstance}
          isLoading={initLoad || isLoading}
        />

        {/* LOADING & 0 DATA TABLE */}
        {dataRebates.length === 0 && (initLoad || isLoading) &&
            <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
              <Spinner />
            </div>
        }
        {dataRebates.length === 0 && !initLoad && !isLoading &&
          <NoDataFound useImage>
            {useFilter ?
              "Tidak ditemukan data rebate yang sesuai dengan filter atau pencarian Anda."
            : 
              "Belum ada data rebate pengguna yang tersimpan di sistem."
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
        <DrawerRebateDetail 
          dataRebate={selectedData}
          onCloseDrawer={() => {
            setSelectedData(null);
          }}
          isOpen={selectedData !== null}
          openPopUpStatus={openPopUpStatus}
          onUpdateRebateById={handleUpdateRebateById}
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
          Data Rebate`}
        paragraph={`Apakah Anda yakin ingin 
          ${selectedStatusChange === "approved" ? "menyetujui":""}
          ${selectedStatusChange === "rejected" ? "menolak":""}
        status data rebate yang dipilih? Tindakan tidak dapat dibatalkan.`}
        handleConfirmation={handleChangeStatusRebates}
        btnConfirmation={selectedStatusChange === "rejected" ? "danger" : "primary-light"}
        isVisible={showPopupStatus} 
        handleClose={() => setShowPopupStatus(false)} 
        cancelText="Batal"
        confirmText={selectedStatusChange === "rejected" ? "Reject" : "Approve"}
      />}  
      {showPopupDelete && <ModalConfirmation
        title={`Hapus ${tableInstance.getSelectedRowModel().flatRows.length} Data Rebate`}
        paragraph="Data yang dipilih akan dihapus permanen dari sistem dan tidak dapat dipulihkan kembali."
        handleConfirmation={handleDeleteRebates}
        btnConfirmation="danger" 
        isVisible={showPopupDelete} 
        handleClose={() => setShowPopupDelete(false)}
        cancelText="Batal"
        confirmText="Hapus" 
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

export default RebatesManagement