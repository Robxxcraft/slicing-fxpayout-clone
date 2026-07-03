import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import { 
  getCoreRowModel, 
  useReactTable, 
  type PaginationState, 
  type RowSelectionState, 
  type SortingState 
} from "@tanstack/react-table";

import { AdminAPI, BankAPI, CryptoAPI } from "@/api";
import { columnsDef as columnsBank } from "@/constants/columns/bankColumns";
import { columnsDef as columnsCrypto } from "@/constants/columns/cryptoColumns";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";
import { useAdminOverviewContext } from "@/hooks/useAdminOverviewContext";
import { statusMap, statusMapNoPendingAll } from "@/constants/statusDropdown";
import type { FullStatusType, OrderStatus, SetStatusType, StatusType } from "@/types/status.type";
import type { BankAdminManagement, CryptoAdminManagement, ResponseBankAdminManagement, ResponseCryptoAdminManagement, WalletAdminManagement } from "@/types/wallet.type";;

import NoDataFound from "@/components/dashboard/common/NoDataFound";
import CardOverview from "@/components/dashboard/common/CardOverview";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import SearchDashboard from "@/components/dashboard/common/SearchDashboard";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import TableDataWallet from "@/components/dashboard/admin/bankManagement/TableDataWallet";
import PaginationFooterTable from "@/components/dashboard/admin/common/PaginationFooterTable";
import FloatingStatusSelection from "@/components/dashboard/common/FloatingStatusSelection";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";

import Tooltip from "@/components/ui/Tooltip";
import Spinner from "@/components/ui/Spinner";
import SelectDropdown from "@/components/ui/SelectDropdown";
import ModalConfirmation from "@/components/ui/ModalConfirmation";

import { BsBank2 } from "react-icons/bs";
import { LuRefreshCcw } from "react-icons/lu";
import FloatingSelection from "@/components/dashboard/common/FloatingSelection";

type FilterType = {
  limit?: number;
  page?: number;
  sortBy?: string;
  orderBy?: OrderStatus;
  search?: string;
};
type InitialLoadState = {
  bank: boolean;
  crypto: boolean;
}

const supportEntry = [
  { key: "20", value: "20"}, 
  { key: "50", value: "50"},
  { key: "100", value: "100"}
];

const WalletManagement = () => {
  const [initLoad, setInitLoad] = useState<InitialLoadState>({
    bank: true,
    crypto: true
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"bank" | "crypto">("bank");
  const activeTabRef = useRef(activeTab);
  const [showPopupDelete, setShowPopupDelete] = useState<boolean>(false);
  const [showPopupStatus, setShowPopupStatus] = useState<boolean>(false);
  const [selectedStatusChange, setSelectedStatusChange] = useState<SetStatusType | null>(null);

  // Data Overview
  const { dataAdminOverview, fetchDataAdminOverview } = useAdminOverviewContext();

  // Data Table
  const [dataBank, setDataBank] = useState<WalletAdminManagement[]>([]);
  const [dataCrypto, setDataCrypto] = useState<WalletAdminManagement[]>([]);
  
  // Table State
  const [globalFiltering, setGlobalFiltering] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  // Table Bank State
  const [filterStatus, setFilterStatus] = useState<FullStatusType>("all");
  const [paginationBank, setPaginationBank] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50
  });
  const [totalPagesBank, setTotalPagesBank] = useState<number>(0);
  const [totalDataBank, setTotalDataBank] = useState<number>(0);

  // Table Crypto State
  const [paginationCrypto, setPaginationCrypto] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50
  });
  const [totalPagesCrypto, setTotalPagesCrypto] = useState<number>(0);
  const [totalDataCrypto, setTotalDataCrypto] = useState<number>(0);

  const getDataBank = async (filters: FilterType) => {
    const {error, message, data} = await AdminAPI.getAllBank({
      ...filters,
      status: filterStatus === "all" ? undefined : filterStatus,
    });
    if (!error && data) {
      const temp = data.data.map((item: ResponseBankAdminManagement): BankAdminManagement => ({
        id: item.id,
        name: item.name,
        account_name: item.account_name,
        account_number: item.account_number,
        status: item.status as StatusType,
        full_name: item.user.full_name,
        created_at: item.created_at
      }));
      setDataBank(temp);
      setPaginationBank({
        pageIndex: data.meta.page - 1,
        pageSize: data.meta.limit
      });
      setTotalDataBank(data.meta.total);
      setTotalPagesBank(data.meta.totalPages);
      setRowSelection({});
    } else {
      toast.error(message);
    }
  }
  const getDataCrypto = async (filters: FilterType) => {
    const {error, message, data} = await AdminAPI.getAllCrypto(filters);
    if (!error && data) {
      const temp = data.data.map((item: ResponseCryptoAdminManagement): CryptoAdminManagement => ({
        id: item.id,
        token: item.token,
        network: item.network,
        wallet_address: item.wallet_address,
        full_name: item.user.full_name,
        created_at: item.created_at
      }));
      setDataCrypto(temp);
      setPaginationCrypto({
        pageIndex: data.meta.page - 1,
        pageSize: data.meta.limit
      });
      setTotalDataCrypto(data.meta.total);
      setTotalPagesCrypto(data.meta.totalPages);
      setRowSelection({});
    } else {
      toast.error(message);
    }
  }
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const currentTab = activeTabRef.current;
    console.log("active", currentTab);
    
    try {
      const sort = sorting[0];
      const filters = {
        search: debouncedSearch,
        limit: currentTab === "bank" ? paginationBank.pageSize : paginationCrypto.pageSize,
        page: currentTab === "bank" ? paginationBank.pageIndex + 1 : paginationCrypto.pageIndex + 1,
        sortBy: sort?.id ?? "created_at",
        orderBy: sort?.desc === undefined ? "desc" :
          sort?.desc ? "desc" : "asc" as OrderStatus
      };
      if (currentTab === "bank") {
        await getDataBank(filters);
      } else {
        await getDataCrypto(filters);
      }
    } finally {
      setInitLoad((prev) => {
        if (currentTab === "bank") {
          return {
            ...prev,
            bank: false
          }
        }

        return {
          ...prev,
          crypto: false
        }
      });
      setIsLoading(false);
      await fetchDataAdminOverview(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, filterStatus, paginationBank.pageIndex, paginationBank.pageSize, sorting]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(globalFiltering);
      if (activeTab === "bank") {
        setPaginationBank((prev) => ({ ...prev, pageIndex: 0 }));
      } else {
        setPaginationCrypto((prev) => ({ ...prev, pageIndex: 0 }));
      }
    }, 500);
  
    return () => clearTimeout(handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalFiltering]);

  // ReactTable
  const tableBankInstance = useReactTable({
    columns: columnsBank,
    data: dataBank,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    state: {
      sorting,
      pagination: paginationBank,
      globalFilter: globalFiltering,
      rowSelection,
    },
    pageCount: totalPagesBank,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFiltering,
    onPaginationChange: setPaginationBank,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true
  });
  const tableCryptoInstance = useReactTable({
    columns: columnsCrypto,
    data: dataCrypto,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    state: {
      sorting,
      pagination: paginationCrypto,
      globalFilter: globalFiltering,
      rowSelection,
    },
    pageCount: totalPagesCrypto,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFiltering,
    onPaginationChange: setPaginationCrypto,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true
  });

  // Function Helper
  const deleteBankUser = async () => {
    const totalSelectBank = tableBankInstance.getSelectedRowModel().flatRows.length;
    if (totalSelectBank === 1) {  
      const bankId = tableBankInstance.getSelectedRowModel().flatRows[0].original.id;
      return await BankAPI.deleteUserBank({ bankId });
    } else if (totalSelectBank > 1) {
      const bankIds = tableBankInstance.getSelectedRowModel().flatRows.map((item) => Number(item.original.id));
      return await AdminAPI.bulkDeleteUserBanks({ bankIds });
    }
  }
  const deleteCryptoUser = async () => {
    const totalSelectCrypto = tableCryptoInstance.getSelectedRowModel().flatRows.length;
    if (totalSelectCrypto === 1) {  
      const cryptoId = tableCryptoInstance.getSelectedRowModel().flatRows[0].original.id;
      return await CryptoAPI.deleteUserCrypto({ cryptoId });
    } else if (totalSelectCrypto > 1) {
      const cryptoIds = tableCryptoInstance.getSelectedRowModel().flatRows.map((item) => Number(item.original.id));
      return await AdminAPI.bulkDeleteUserCrypto({ cryptoIds });
    }
  }
  const handleDeleteUserWallet = async () => {
    if (isLoading) return;

    let responseDelete;
    setIsLoading(true);
    if (activeTab === "bank") {
      responseDelete = await deleteBankUser();
    } else {
      responseDelete = await deleteCryptoUser();
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
    if (activeTab === "crypto") return;
    setShowPopupStatus(true);
    setSelectedStatusChange(key as SetStatusType)
  }
  const handleChangeStatusUserBank = async () => {
    if (isLoading || !selectedStatusChange || activeTab === "crypto") return;
    
    setIsLoading(true);
    const bankIds = tableBankInstance.getSelectedRowModel().flatRows.map((item) => Number(item.original.id));
    const { error, message } = await AdminAPI.bulkChangeStatusUserBanks({
      bankIds, status: selectedStatusChange
    });
    if (error) {
      toast.error(message);
    } else {
      setDataBank((prev) => (
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
  const handleChangeTabs = (key: "bank" | "crypto") => {
    setRowSelection({});
    activeTabRef.current = key;
    if (key === "bank" && initLoad.bank) {
      fetchData();
    }
    if (key === "crypto" && initLoad.crypto) {
      fetchData();
    }
    setActiveTab(key);
  }

  // Function Filter
  const handleChangeFilterStatus = (key: string) => {
    if (isLoading || activeTab === "crypto") return;

    setFilterStatus(key as FullStatusType);
    setPaginationBank((prev) => ({ ...prev, pageIndex: 0 }));
  }  
  const handleChangeFilterLimit = (key: string) => {
    if (isLoading) return;
    if (activeTab === "bank") {
      setPaginationBank({
        pageIndex: 0,
        pageSize: Number(key)
      });
    } else {
      setPaginationCrypto({
        pageIndex: 0,
        pageSize: Number(key)
      });
    }
  }  
  const handleChangeGlobalFiltering = (e: ChangeEvent<HTMLInputElement>) => {
    setGlobalFiltering(e.target.value);
  } 

  useLockBodyScroll(showPopupDelete || showPopupStatus);
  const useFilter = filterStatus !== "all" || globalFiltering; 
  return (
    <WrapperDashboardComponent>
      
      {/* CARD OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CardOverview 
          title={"Registered Bank"} 
          icon={<BsBank2 />} 
          content={dataAdminOverview ? dataAdminOverview.totalBanks.toLocaleString() : "0"} 
          detail={"Total user registered bank"} 
          isLoading={dataAdminOverview === null}
        />
        <CardOverview 
          title={"Pending Bank Verifications"} 
          icon={<BsBank2 />} 
          content={dataAdminOverview ? dataAdminOverview.pendingBanks.toLocaleString() : "0"} 
          detail={"Requires admin review"} 
          status="warning" 
          isLoading={dataAdminOverview === null}
        />
      </div>
      <section className="mt-5">
        <TitleDashboard>
          Wallets Management
        </TitleDashboard>

        {/* FILTER TABLE */}
        <div className="my-4 space-y-2 3xl:space-y-3">
          <div className="flex items-center gap-2 w-full border-b border-[#DDDDDD]">
            <div 
            onClick={() => handleChangeTabs("bank")}
            className={`px-2 py-1  border-primary rounded-t-lg hover:bg-light-gray transition-all duration-300 cursor-pointer
              ${activeTab === "bank" ? "border-b-2 font-medium" : "border-b-0 font-normal"}
            `}>
              <p className="text-base 3xl:text-lg">
                Bank
              </p>
            </div>
            <div 
            onClick={() => handleChangeTabs("crypto")}
            className={`px-2 py-1  border-primary rounded-t-lg hover:bg-light-gray transition-all duration-300 cursor-pointer
              ${activeTab === "crypto" ? "border-b-2 font-medium" : "border-b-0 font-normal"}
            `}>
              <p className="text-base 3xl:text-lg">
                Crypto
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-2 3xl:gap-3">
            <div className="flex flex-col md:flex-row items-center gap-2 3xl:gap-3 w-full">
              <SearchDashboard 
                query={globalFiltering} 
                onQuery={handleChangeGlobalFiltering} 
                placeholder={"Cari nama pengguna, bank atau nomor rekening"} />
              
              {/* BUTTON DEL BANK */}
              {activeTab === "bank" ? 
                tableBankInstance.getSelectedRowModel().flatRows.length > 0 &&
                <div className="flex items-center gap-2 3xl:gap-3 w-full md:w-fit">
                {tableBankInstance.getSelectedRowModel().flatRows.length > 0 &&
                  <div
                    onClick={() => setShowPopupDelete(true)}
                    className="h-9 3xl:h-12 px-2 3xl:px-4 flex flex-1 items-center rounded-md border border-my-red bg-my-red text-white place-items-center cursor-pointer active:brightness-90 transition-all duration-300 ease-out">
                    <p className="text-nowrap">
                      Hapus {tableBankInstance.getSelectedRowModel().flatRows.length} data
                    </p>
                  </div>
                }
                </div>
              :
              
                // BUTTON DEL CRYPTO
               tableCryptoInstance.getSelectedRowModel().flatRows.length > 0 &&
                <div className="flex items-center gap-2 3xl:gap-3 w-full md:w-fit">
                {tableCryptoInstance.getSelectedRowModel().flatRows.length > 0 &&
                  <div
                    onClick={() => setShowPopupDelete(true)}
                    className="h-9 3xl:h-12 px-2 3xl:px-4 flex flex-1 items-center rounded-md border border-my-red bg-my-red text-white place-items-center cursor-pointer active:brightness-90 transition-all duration-300 ease-out">
                    <p className="text-nowrap">
                      Hapus {tableCryptoInstance.getSelectedRowModel().flatRows.length} data
                    </p>
                  </div>
                }
                </div>
              }
              
            </div>
            <div className="flex items-center gap-2 3xl:gap-3 w-full md:w-fit">
              <SelectDropdown 
                selectedInput={filterStatus} 
                handleChangeInput={handleChangeFilterStatus} 
                objectInput={statusMap}       
                wrapperCL={`w-full! md:w-[150px]! 3xl:w-[200px]!`}             
                inputCL="w-[200px]! 3xl:w-[240px]!"   
                disabled={activeTab === "crypto" || isLoading}     
              />
              <Tooltip 
                disabled={isLoading}
                icon={<LuRefreshCcw className={`${isLoading ? "animate-spin" : ""}`} />} 
                handleClick={() => fetchData()} 
                detail={"Reload Data"} />
                
              {/* BUTTON NEXT PREV BANK */}
              {activeTab === "bank" ? 
                <NextPreviousButton 
                  onNextPage={tableBankInstance.nextPage}
                  onPreviousPage={tableBankInstance.previousPage}
                  disabledNext={isLoading || !tableBankInstance.getCanNextPage()}
                  disabledPrev={isLoading || !tableBankInstance.getCanPreviousPage()}
                />
              :
              // BUTTON NEXT PREV CRYPTO
                <NextPreviousButton 
                  onNextPage={tableBankInstance.nextPage}
                  onPreviousPage={tableBankInstance.previousPage}
                  disabledNext={isLoading || !tableBankInstance.getCanNextPage()}
                  disabledPrev={isLoading || !tableBankInstance.getCanPreviousPage()}
                />
              }
            </div>
          </div>
        </div>

        {/* TABLE BANK */}
        {activeTab === "bank" ? 
          <TableDataWallet 
            tableInstance={tableBankInstance}
            isLoading={initLoad.bank || isLoading}
          />
          :

          // TABLE CRYPTO
          <TableDataWallet 
            tableInstance={tableCryptoInstance}
            isLoading={initLoad.crypto || isLoading}
          />
        }

        {/* LOADING & 0 DATA TABLE */}
        {(activeTab === "crypto" ? dataCrypto.length === 0 : dataBank.length === 0) 
          && ((activeTab === "crypto" ? initLoad.crypto : initLoad.bank) || isLoading) &&
            <div className="mt-4 3xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
              <Spinner />
            </div>
        }
        {(activeTab === "crypto" ? dataCrypto.length === 0 : dataBank.length === 0) 
          && (activeTab === "crypto" ? !initLoad.crypto : !initLoad.bank) && !isLoading &&
          <NoDataFound useImage>
            {useFilter ?
              `Tidak ditemukan data ${activeTab === "bank" ? "bank" : "crypto"} yang sesuai dengan filter atau pencarian Anda.`
            : 
              `Belum ada data ${activeTab === "bank" ? "bank" : "crypto"} yang terdaftar di dalam sistem.`
            }
          </NoDataFound>
        }

        {/* FOOTER */}
        <PaginationFooterTable
          pageIndex={activeTab === "bank" ? paginationBank.pageIndex : paginationCrypto.pageIndex}
          pageSize={activeTab === "bank" ? paginationBank.pageSize : paginationCrypto.pageSize}
          totalData={activeTab === "bank" ? totalDataBank : totalDataCrypto}
          onChangePageSize={handleChangeFilterLimit}
          onNext={activeTab === "bank" ? tableBankInstance.nextPage : tableCryptoInstance.nextPage}
          onPrev={activeTab === "bank" ? tableBankInstance.previousPage : tableCryptoInstance.previousPage}
          disabledNext={isLoading 
            || activeTab === "bank" ? 
            !tableBankInstance.getCanNextPage() 
            : !tableCryptoInstance.getCanNextPage()}
          disabledPrev={isLoading 
            || activeTab === "bank" ? 
            !tableBankInstance.getCanPreviousPage() 
            : !tableCryptoInstance.getCanPreviousPage()}
          isLoading={(activeTab === "crypto" ? initLoad.crypto : initLoad.bank) || isLoading}
          supportEntry={supportEntry}
        /> 
      </section>

      {/* FLOATING SECTION */}
      {activeTab === "bank" ? 
        tableBankInstance.getSelectedRowModel().flatRows.length > 0 &&
          <FloatingStatusSelection 
            selectedNumber={tableBankInstance.getSelectedRowModel().flatRows.length} 
            onClose={() => tableBankInstance.resetRowSelection()} 
            onChangeStatus={openPopUpStatus} 
            command="Ubah Status"
            objectsInput={statusMapNoPendingAll}
          />
        :
        tableCryptoInstance.getSelectedRowModel().flatRows.length > 0 && 
          <FloatingSelection 
            selectedNumber={tableCryptoInstance.getSelectedRowModel().flatRows.length} 
            onClose={() => tableCryptoInstance.resetRowSelection()}           
          />
      }

      {/* MODAL FLOATING SECTION */}
      {showPopupStatus && <ModalConfirmation
        title={`Konfirmasi 
          ${selectedStatusChange === "approved" ? "Persetujuan":""} 
          ${selectedStatusChange === "rejected" ? "Penolakan":""}
          ${tableBankInstance.getSelectedRowModel().flatRows.length} 
          Bank`}
        paragraph={`Apakah Anda yakin ingin 
          ${selectedStatusChange === "approved" ? "menyetujui":""}
          ${selectedStatusChange === "rejected" ? "menolak":""}
        verifikasi bank untuk data yang dipilih? Tindakan tidak dapat dibatalkan.`}
        handleConfirmation={handleChangeStatusUserBank}
        btnConfirmation={selectedStatusChange === "rejected" ? "danger" : "primary-light"}
        isVisible={showPopupStatus} 
        handleClose={() => setShowPopupStatus(false)} 
        cancelText="Batal"
        confirmText={selectedStatusChange === "rejected" ? "Reject" : "Approve"}
      />}  
      {showPopupDelete && <ModalConfirmation
        title={`Hapus 
          ${activeTab === "bank" ? `${tableBankInstance.getSelectedRowModel().flatRows.length} Data Bank`
          : `${tableCryptoInstance.getSelectedRowModel().flatRows.length} Data Crypto`} 
        `}
        paragraph="Data yang dipilih akan dihapus permanen dari sistem dan tidak dapat dipulihkan kembali."
        handleConfirmation={handleDeleteUserWallet}
        btnConfirmation="danger" 
        isVisible={showPopupDelete} 
        handleClose={() => setShowPopupDelete(false)}
        cancelText="Batal"
        confirmText="Hapus" 
      />}  
    </WrapperDashboardComponent>
  )
}

export default WalletManagement;
