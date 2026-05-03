import { useCallback, useEffect, useState, type ChangeEvent } from "react"
import { toast } from "react-toastify"
import { 
  getCoreRowModel, 
  useReactTable, 
  type PaginationState, 
  type RowSelectionState, 
  type SortingState 
} from "@tanstack/react-table"

import { AdminAPI } from "@/api"
import { columnsDef } from "@/constants/columns/brokerColumns"
import type { SetStatusType, StatusType } from "@/types/status.type"
import { statusMap } from "@/utils/dataDropdownDashboard"
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll"
import { useAdminOverviewContext } from "@/hooks/useAdminOverviewContext"

import NoDataFound from "@/components/dashboard/common/NoDataFound"
import CardOverview from "@/components/dashboard/common/CardOverview"
import TitleDashboard from "@/components/dashboard/common/TitleDashboard"
import SearchDashboard from "@/components/dashboard/common/SearchDashboard"
import PaginationFooterTable from "@/components/dashboard/admin/common/PaginationFooterTable"
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton"
import ChangeStatusSelection from "@/components/dashboard/common/ChangeStatusSelection"
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent"
import TableBrokerManagement from "@/components/dashboard/admin/brokerManagement/TableBrokerManagement"

import Tooltip from "@/components/ui/Tooltip"
import Spinner from "@/components/ui/Spinner"
import SelectDropdown from "@/components/ui/SelectDropdown"
import ModalConfirmation from "@/components/ui/ModalConfirmation"

import { BsBank2 } from "react-icons/bs"
import { LuRefreshCcw } from "react-icons/lu"

export type DataBroker = {
  connection_id: number;
  full_name: string;
  broker_name: string;
  account_number: string;
  platform: string;
  status: StatusType;
  created_at: string;
};
type ResponseDataBroker = {
  id: number;
  broker: { name: string };
  account_name: string;
  account_number: string;
  platform: string;
  status: string;
  created_at: string;
  user: { full_name: string }
}

const supportEntry = [
  { key: "20", value: "20"}, 
  { key: "50", value: "50"},
  { key: "100", value: "100"}
];

const BrokersManagement = () => {
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPopupDelete, setShowPopupDelete] = useState<boolean>(false);
  const [showPopupStatus, setShowPopupStatus] = useState<boolean>(false);
  const [selectedStatusChange, setSelectedStatusChange] = useState<SetStatusType | null>(null);

  // Data Overview
  const { dataAdminOverview, fetchDataAdminOverview } = useAdminOverviewContext();

  // Data Table
  const [dataBroker, setDataBroker] = useState<DataBroker[]>([]);
  
  // Table State
  const [globalFiltering, setGlobalFiltering] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
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
      const {error, message, data} = await AdminAPI.getAllBrokerUsers({
        search: debouncedSearch,
        status: filterStatus === "all" ? undefined : filterStatus,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sortBy: sort?.id ?? "created_at",
        orderBy: sort?.desc === undefined ? "desc" :
          sort?.desc ? "desc" : "asc"
      });
      if (!error && data) {
        const temp = data.data.map((item: ResponseDataBroker) => ({
          connection_id: item.id,
          broker_name: item.broker.name,
          account_number: item.account_number,
          status: item.status,
          platform: item.platform,
          full_name: item.user.full_name,
          created_at: item.created_at
        }));
        setDataBroker(temp);
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
    data: dataBroker,
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
  const handleDeleteUserBroker = async () => {
    if (isLoading) return;

    let responseDelete;
    const totalSelectedData = tableInstance.getSelectedRowModel().flatRows.length;
    setIsLoading(true);
    if (totalSelectedData === 1) {  
      const brokerId = tableInstance.getSelectedRowModel().flatRows[0].original.connection_id;
      responseDelete = await AdminAPI.deleteBrokerUserById({ brokerId });
    } else if (totalSelectedData > 1) {
      const brokerIds = tableInstance.getSelectedRowModel().flatRows.map((item) => Number(item.original.connection_id));
      responseDelete = await AdminAPI.bulkDeleteBrokerUsers({ brokerIds });
    }

    if (!responseDelete) return;
    if (responseDelete.error) {
      toast.error(responseDelete.message);
    } else {
      await fetchData();
      toast.success(responseDelete.message);
    }
    setShowPopupDelete(false);
    setIsLoading(false);
  }
  const openPopUpStatus = (key: string) => {
    setShowPopupStatus(true);
    setSelectedStatusChange(key as SetStatusType)
  }
  const handleChangeStatusUserBroker = async () => {
    if (isLoading || !selectedStatusChange) return;
    
    setIsLoading(true);
    const brokerIds = tableInstance.getSelectedRowModel().flatRows.map((item) => Number(item.original.connection_id));
    const { error, message } = await AdminAPI.bulkChangeStatusBrokerUsers({
      brokerIds, status: selectedStatusChange
    });
    if (error) {
      toast.error(message);
    } else {
      setDataBroker((prev) => (
        prev.map((item) => (
          brokerIds.includes(item.connection_id) ?
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

  useLockBodyScroll(showPopupDelete || showPopupStatus);
  const useFilter = filterStatus !== "all" || globalFiltering; 
  return (
    <WrapperDashboardComponent>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CardOverview 
          title={"Registered Broker"} 
          icon={<BsBank2 />} 
          content={dataAdminOverview ? dataAdminOverview.totalBrokers.toLocaleString() : "0"} 
          detail={"Total trader registered brokers"}
          isLoading={dataAdminOverview === null}
        />
        <CardOverview 
          title={"Pending Broker Connections"} 
          icon={<BsBank2 />} 
          content={dataAdminOverview ? dataAdminOverview.pendingBrokers.toLocaleString() : "0"} 
          detail={"Requires admin review"} 
          status="warning" 
          isLoading={dataAdminOverview === null}
        />
      </div>
      <section className="mt-5">
        <TitleDashboard>
          Registered Broker Management
        </TitleDashboard>

        {/* FILTER TABLE */}
        <div className="my-4 flex flex-col md:flex-row justify-between items-center gap-2 2xl:gap-3">
          <div className="flex flex-col md:flex-row items-center gap-2 2xl:gap-3 w-full">
            <SearchDashboard 
              query={globalFiltering} 
              onQuery={handleChangeGlobalFiltering} 
              placeholder={"Cari nama lengkap, broker, atau id trading"} />
            {tableInstance.getSelectedRowModel().flatRows.length > 0 &&
              <div className="flex items-center gap-2 2xl:gap-3 w-full md:w-fit">
              {tableInstance.getSelectedRowModel().flatRows.length > 0 &&
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
        <TableBrokerManagement 
          tableInstance={tableInstance}
          isLoading={isLoading}
        />

        {/* LOADING & 0 DATA TABLE */}
        {dataBroker.length === 0 && (initLoad || isLoading) &&
            <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
              <Spinner />
            </div>
        }
        {dataBroker.length === 0 && !initLoad && !isLoading &&
          <NoDataFound useImage>
            {useFilter ?
              "Tidak ditemukan data broker pengguna yang sesuai dengan filter atau pencarian Anda."
            : 
              "Belum ada data broker pengguna yang terdaftar di dalam sistem."
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
      {tableInstance.getSelectedRowModel().flatRows.length > 0 &&
        <ChangeStatusSelection 
          selectedNumber={tableInstance.getSelectedRowModel().flatRows.length} 
          onClose={() => tableInstance.resetRowSelection()} 
          onChangeStatus={openPopUpStatus} />
      }

      {/* MODAL FLOATING SECTION */}
      {showPopupStatus && <ModalConfirmation
        title={`Konfirmasi 
          ${selectedStatusChange === "approved" ? "Persetujuan":""} 
          ${selectedStatusChange === "rejected" ? "Penolakan":""}
          ${tableInstance.getSelectedRowModel().flatRows.length} 
          Broker Pengguna`}
        paragraph={`Apakah Anda yakin ingin 
          ${selectedStatusChange === "approved" ? "menyetujui":""}
          ${selectedStatusChange === "rejected" ? "menolak":""}
        verifikasi broker pengguna yang dipilih? Tindakan tidak dapat dibatalkan.`}
        handleConfirmation={handleChangeStatusUserBroker}
        btnConfirmation={selectedStatusChange === "rejected" ? "danger" : "primary-light"}
        isVisible={showPopupStatus} 
        handleClose={() => setShowPopupStatus(false)} 
        cancelText="Batal"
        confirmText={selectedStatusChange === "rejected" ? "Reject" : "Approve"}
      />}   
      {showPopupDelete && <ModalConfirmation
        title={`Hapus ${tableInstance.getSelectedRowModel().flatRows.length} Data Broker`}
        paragraph="Data yang dipilih akan dihapus permanen dari sistem dan tidak dapat dipulihkan kembali."
        handleConfirmation={handleDeleteUserBroker}
        btnConfirmation="danger" 
        isVisible={showPopupDelete} 
        handleClose={() => setShowPopupDelete(false)}
        cancelText="Batal"
        confirmText="Hapus" 
      />}  
    </WrapperDashboardComponent>
  )
}

export default BrokersManagement;
