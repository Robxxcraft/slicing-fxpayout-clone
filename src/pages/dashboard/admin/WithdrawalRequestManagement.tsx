import { AdminAPI } from "@/api";
import DrawerWithdrawalDetail from "@/components/dashboard/admin/withdrawalManagement/DrawerWithdrawalDetail";
import TableDataWithdrawals from "@/components/dashboard/admin/withdrawalManagement/TableDataWithdrawals";
import CardOverview from "@/components/dashboard/common/CardOverview";
import ChangeStatusSelection from "@/components/dashboard/common/ChangeStatusSelection";
import FloatingSelection from "@/components/dashboard/common/FloatingSelection";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import NoDataFound from "@/components/dashboard/common/NoDataFound";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import ModalConfirmation from "@/components/ui/ModalConfirmation";
import SelectDropdown from "@/components/ui/SelectDropdown";
import Spinner from "@/components/ui/Spinner";
import Tooltip from "@/components/ui/Tooltip";
import { columnsDef } from "@/constants/columns/withdrawalManagementColumns";
import type { FullStatusType, StatusType } from "@/types/status.type";
import { statusMap } from "@/utils/dataDropdownDashboard";
import { getCoreRowModel, useReactTable, type PaginationState, type RowSelectionState, type SortingState } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import { CgInfo } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { IoCardOutline, IoWalletOutline } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import { toast } from "react-toastify";

export type DataWithdrawalManagement = {
  id: number;
  method: "bank" | "crypto";
  bank: string;
  accountName: string;
  walletAddress: string;
  total: string;
  currency: "USD" | "IDR";
  status: StatusType;
  createdAt: string;
};

const supportEntry = [
  { key: "10", value: "10" }, 
  { key: "20", value: "20"}, 
  { key: "50", value: "50"},
  { key: "100", value: "100"}
];

const WithdrawalRequestManagement = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showPopupStatus, setShowPopupStatus] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedStatusChange, setSelectedStatusChange] = useState<StatusType | null>(null);
  const [dataWithdrawals, setDataWithdrawals] = useState<DataWithdrawalManagement[]>([]);
  const [selectedData, setSelectedData] = useState<DataWithdrawalManagement | null>(null)

  // Table State
  const [globalFiltering, setGlobalFiltering] = useState<string>("");
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

    const { error, message, data } = await AdminAPI.getAllWithdrawalRequests({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize.toString(),
      status: filterStatus === "all" ? undefined : filterStatus
    });

    if (!error && data) {
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       const temp = data.data.map((item: any) => {
       const useBank = item["bank"];
       const useUsd = item["currency"] === "USD";
       return ({
         id: item["id"],
         method: useBank ? "bank" : "crypto",
         bank: useBank ? item["bank"] : "Crypto",
         accountName: useBank ? item["bank"]["account_name"] : item["user"]["full_name"],
         walletAddress: item["wallet_address"],
         total: useUsd ? item["amount_usd"] : item["amount_idr"],
         currency: item["currency"],
         status: item["status"],
         createdAt: item["created_at"]
      })});
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

    setIsLoading(false);
  }, [filterStatus, pagination.pageIndex, pagination.pageSize]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
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

  const useFilter = filterStatus !== "all";
  return (
    <WrapperDashboardComponent>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <CardOverview 
          title={"Total Request"} icon={<IoWalletOutline />} content={"100"} 
          detail={"Total cumulative withdrawal requests"} />
        <CardOverview 
          title={"Commission Paid"} icon={<IoCardOutline />} content={"$20.00"} 
          detail={"Total commission successfully disbursed"} />
        <CardOverview 
          title={"Pending Request"} icon={<IoWalletOutline />} content={"8"} 
          detail={"Awaiting administrative review"} status="warning" />
      </div>
      <section className="mt-5">
        <TitleDashboard>
          Withdrawal Management
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
                value={globalFiltering}
                onChange={(e) => setGlobalFiltering(e.target.value)}
                type="text"
                autoComplete="off"
                className="w-full h-full text-base 2xl:text-xl placeholder:text-[rgba(0,0,0,0.6)] focus:outline-0 placeholder:text-ellipsis placeholder:line-clamp-1"
              />
            </div>
            <div className="flex items-center gap-2 2xl:gap-3 w-full md:w-fit">
              {tableInstance.getSelectedRowModel().flatRows.length === 1 &&
                <Tooltip 
                  disabled={isLoading}
                  variant="primary"
                  icon={<CgInfo className={`text-xl`} />} 
                  handleClick={() => {
                    setSelectedData(tableInstance.getSelectedRowModel().flatRows[0].original)
                    setOpenDrawer(true);
                  }} 
                  detail={"Detail Data"} />
              }
            </div>
          </div>
          <div className="flex items-center gap-2 2xl:gap-3 w-full md:w-fit">
            <SelectDropdown 
              selectedInput={filterStatus} 
            //   handleChangeInput={handleChangeFilterStatus} 
              handleChangeInput={() => {}} 
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
        {dataWithdrawals.length === 0 && isLoading &&
            <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
              <Spinner />
            </div>
        }
        {dataWithdrawals.length === 0 && !isLoading &&
          <NoDataFound useImage>
            {useFilter ?
              "Tidak ditemukan data laporan penarikan yang sesuai dengan filter atau pencarian Anda."
            : 
              "Belum ada data pengguna yang melakukan penarikan dana."
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
              handleChangeInput={() => {}} 
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
    
      {(openDrawer && selectedData) &&
        <DrawerWithdrawalDetail 
          dataWithdrawal={selectedData}
          closeDrawer={() => {
            tableInstance.resetRowSelection();
            setOpenDrawer(false);
          }}
        />
      }

      {tableInstance.getSelectedRowModel().flatRows.length > 0 &&
        (tableInstance.getSelectedRowModel().flatRows.filter(row => row.getValue("status") === "approved").length === 0 ?
        <ChangeStatusSelection 
          selectedNumber={tableInstance.getSelectedRowModel().flatRows.length} 
          onClose={() => tableInstance.resetRowSelection()} 
          onChangeStatus={() => {}} />
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
        handleConfirmation={() => {}}
        btnConfirmation="primary-light" 
        isVisible={showPopupStatus} 
        handleClose={() => setShowPopupStatus(false)} 
        cancelText="Batal"
        confirmText="Lanjutkan"
      />}  
    </WrapperDashboardComponent>
  )
}

export default WithdrawalRequestManagement;
