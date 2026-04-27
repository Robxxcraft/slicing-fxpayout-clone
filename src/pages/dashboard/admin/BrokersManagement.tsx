import { useCallback, useEffect, useState } from "react"
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
import type { StatusType } from "@/types/status.type"
import { statusMap } from "@/utils/dataDropdownDashboard"

import NoDataFound from "@/components/dashboard/common/NoDataFound"
import CardOverview from "@/components/dashboard/common/CardOverview"
import TitleDashboard from "@/components/dashboard/common/TitleDashboard"
import FloatingSelection from "@/components/dashboard/common/FloatingSelection"
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton"
import ChangeStatusSelection from "@/components/dashboard/common/ChangeStatusSelection"
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent"
import Tooltip from "@/components/ui/Tooltip"
import Spinner from "@/components/ui/Spinner"
import SelectDropdown from "@/components/ui/SelectDropdown"
import ModalConfirmation from "@/components/ui/ModalConfirmation"

import { BsBank2 } from "react-icons/bs"
import { CiSearch } from "react-icons/ci"
import { LuRefreshCcw } from "react-icons/lu"

export type DataBroker = {
  id: number;
  username: string;
  broker: string;
  accountNumber: string;
  platform: string;
  status: StatusType;
  createdAt: string;
};

const supportEntry = [
  { key: "10", value: "10" }, 
  { key: "20", value: "20"}, 
  { key: "50", value: "50"},
  { key: "100", value: "100"}
];

const BrokersManagement = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showPopupDelete, setShowPopupDelete] = useState<boolean>(false);
  const [showPopupStatus, setShowPopupStatus] = useState<boolean>(false);
  const [selectedStatusChange, setSelectedStatusChange] = useState<StatusType | null>(null);
  const [dataBroker, setDataBroker] = useState<DataBroker[]>([]);
  
  // Table State
  const [querySearch, setQuerySearch] = useState<string>("");
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
    const {error, message, data} = await AdminAPI.getAllBroker({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize.toString(),
      status: filterStatus === "all" ? undefined : filterStatus
    });
    if (!error && data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const temp = data.data.map((item: any) => ({
        id: item["id"],
        name: item["name"],
        accountName: item["account_name"],
        accountNumber: item["account_number"],
        status: item["status"],
        fullName: item["user"]["full_name"],
        createdAt: item["created_at"]
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
    setIsLoading(false);
  }, [filterStatus, pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      globalFilter: querySearch,
      rowSelection,
    },
    pageCount: totalPages,
    onSortingChange: setSorting,
    onGlobalFilterChange: setQuerySearch,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true
  });

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
  const handleDeleteUserBank = async () => {
    if (isLoading) return;

    let responseDelete;
    const totalSelectedData = tableInstance.getSelectedRowModel().flatRows.length;
    setIsLoading(true);
    if (totalSelectedData === 1) {  
      const bankId = tableInstance.getSelectedRowModel().flatRows[0].original.id;
      responseDelete = await AdminAPI.deleteUserBank({ bankId });
    } else if (totalSelectedData > 1) {
      const bankIds = tableInstance.getSelectedRowModel().flatRows.map((item) => Number(item.original.id));
      responseDelete = await AdminAPI.bulkDeleteUserBanks({ bankIds });
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
    setSelectedStatusChange(key as StatusType)
  }
  const handleChangeStatusUserBank = async () => {
    if (isLoading || !selectedStatusChange) return;
    
    setIsLoading(true);
    const bankIds = tableInstance.getSelectedRowModel().flatRows.map((item) => Number(item.original.id));
    const { error, message } = await AdminAPI.bulkChangeStatusUserBanks({
      bankIds, status: selectedStatusChange
    });
    if (error) {
      toast.error(message);
    } else {
      setDataBroker((prev) => (
        prev.map((item) => (
          bankIds.includes(item.id) ?
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

  const useFilter = filterStatus !== "all";

  return (
    <WrapperDashboardComponent>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CardOverview 
          title={"Registered Bank"} icon={<BsBank2 />} content={"100"} 
          detail={"Total user registered bank"} />
        <CardOverview 
          title={"Pending Bank Verifications"} icon={<BsBank2 />} content={"8"} 
          detail={"Requires admin review"} status="warning" />
      </div>
      <section className="mt-5">
        <TitleDashboard>
          Bank Management
        </TitleDashboard>

        {/* FILTER TABLE */}
        <div className="my-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 2xl:gap-3 w-full">
            <div className="h-9 2xl:h-12 py-2 md:py-0 px-2 2xl:px-4 flex flex-1 items-center gap-2 2xl:gap-4 w-full bg-white border border-[#D2CEE1] rounded-lg max-w-full lg:max-w-[456px] 2xl:max-w-[640px]">
              <label htmlFor="search" className="cursor-pointer">
                <CiSearch className="text-2xl 2xl:text-3xl text-[#7E7E7E]" />
              </label>
              <input
                id="search"
                name="search"
                placeholder="Cari username atau email"
                value={querySearch}
                onChange={(e) => setQuerySearch(e.target.value)}
                type="text"
                autoComplete="off"
                className="w-full h-full text-base 2xl:text-xl placeholder:text-[rgba(0,0,0,0.6)] focus:outline-0 placeholder:text-ellipsis placeholder:line-clamp-1"
              />
            </div>
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
              disabled={false}
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
        {/* <TableDataBank 
          tableInstance={tableInstance}
          isLoading={isLoading}
        /> */}

        {/* LOADING & 0 DATA TABLE */}
        {dataBroker.length === 0 && isLoading &&
            <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
              <Spinner />
            </div>
        }
        {dataBroker.length === 0 && !isLoading &&
          <NoDataFound useImage>
            {useFilter ?
              "Tidak ditemukan data trader yang sesuai dengan filter atau pencarian Anda."
            : 
              "Belum ada data pengguna trader yang terdaftar di dalam sistem."
            }
          </NoDataFound>
        }

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <p className="w-fit text-base 2xl:text-xl">
              Baris per halaman
            </p>
            <SelectDropdown 
              selectedInput={pagination.pageSize.toString()} 
              handleChangeInput={handleChangeFilterLimit} 
              objectInput={supportEntry}
              containerCL="w-fit!"
              inputCL="w-[80px]! text-center!"
              positionDrop="center"
              positionY="up" />
            <p className="w-fit text-base 2xl:text-xl">
              menampilkan 1 hingga {totalData} dari {totalData} entri.
            </p>
          </div>
          <div className="hidden md:block">
            <NextPreviousButton 
              onNextPage={tableInstance.nextPage}
              onPreviousPage={tableInstance.previousPage}
              disabledNext={isLoading || !tableInstance.getCanNextPage()}
              disabledPrev={isLoading || !tableInstance.getCanPreviousPage()}
            />
          </div>
        </div>
      </section>
        
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
        title={`Konfirmasi ${tableInstance.getSelectedRowModel().flatRows.length} status data`}
        paragraph={`Apakah Anda yakin ingin 
          ${selectedStatusChange === "approved" ? "menyetujui":""}
          ${selectedStatusChange === "rejected" ? "menolak":""}
          ${selectedStatusChange === "pending" ? "membatalkan":""}
        status pendaftaran bank untuk data yang dipilih?`}
        handleConfirmation={handleChangeStatusUserBank}
        btnConfirmation="primary-light" 
        isVisible={showPopupStatus} 
        handleClose={() => setShowPopupStatus(false)} 
        cancelText="Batal"
        confirmText="Lanjutkan"
      />}  
      {showPopupDelete && <ModalConfirmation
        title={`Hapus ${tableInstance.getSelectedRowModel().flatRows.length} data bank`}
        paragraph="Data yang dipilih akan dihapus permanen dari sistem dan tidak dapat dipulihkan kembali."
        handleConfirmation={handleDeleteUserBank}
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
