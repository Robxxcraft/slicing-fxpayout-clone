import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getCoreRowModel, useReactTable, type PaginationState, type RowSelectionState, type SortingState, type VisibilityState } from "@tanstack/react-table";
import { CiSearch } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import { MdEdit, MdOutlineFileUpload } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Spinner from "@/components/ui/Spinner";
import TableValData from "@/components/admin/TableValData";
import DrawerFilterTable from "@/components/admin/DrawerFilterTable";
import DrawerDetailData from "@/components/admin/DrawerDetailData";
import ModalDeleteValidationData from "@/components/ui/ModalDeleteValidationData";
import DrawerImportCsv from "@/components/admin/DrawerImportCsv";
import type { ValidationData } from "@/models/validationData";
import { columnsDef } from "@/helper/columnsValidation";
import { bulkDeleteValidationData, deleteValidationData, exportCsvValidationData, getLocalStorage, getValidationData, setLocalStorage } from "@/utils/api";
import { TbTableExport } from "react-icons/tb";
import Tooltip from "@/components/ui/Tooltip";

type DrawerType = "FILTER" | "DETAIL" | "IMPORT" | null;

const ValidationDataDashboard = () => {
  // Drawer state
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
  const [showPopupDelete, setShowPopupDelete] = useState<boolean>(false);
  
  const closeDrawer = () => setActiveDrawer(null);
  const openFilter = () => setActiveDrawer("FILTER");
  const openDetail = () => setActiveDrawer("DETAIL");
  const openImport = () => setActiveDrawer("IMPORT");

  useEffect(() => {
    if (showPopupDelete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPopupDelete]);
  
  // Table data state
  const [data, setData] = useState<ValidationData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFiltering, setGlobalFiltering] = useState<string>("");
  const [querySearch, setQuerySearch] = useState<string>("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
    const valueFromStorage = getLocalStorage("columnVisibility");
    if (valueFromStorage) {
      try {
        const parsed = JSON.parse(valueFromStorage);
        if (Object.keys(parsed).length > 0) return parsed;
      } catch (error) {
        console.error(error)
      }
    }

    return {
      full_name: true,
      email: true,
      broker: true,
      trading_account_name: true,
      trading_account_number: true,
      phone_number: true,
      rebate: true,
      bank: true,
      bank_account_name: true,
      bank_account_number: true,
      created_at: true,
      status: true,
    }
  });
  const [selectedData, setSelectedData] = useState<ValidationData | null>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50
  });
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const sort = sorting[0];
      const { error, result, message } = await getValidationData({
        sort: sort?.desc === undefined ? "desc" 
        : sort?.desc ? "desc" : "asc",
        sortBy: sort?.id ?? "created_at",
        query: globalFiltering.trim().length === 0 ? undefined : globalFiltering,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize
      });
      
      if (error) {
        toast.error(message);
        setData([]);
        return;
      }
      
      setData(result.data as ValidationData[]);
      setTotalPages(result.meta.totalPages);
      setTotalData(result.meta.totalData);
      setRowSelection({});
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalFiltering, pagination.pageIndex, pagination.pageSize, sorting]);
  
  useEffect(() => {
    fetchData().finally(() => setIsInitialLoad(false));
  }, [fetchData]);

  useEffect(() => {
    const timeout = setTimeout(() => setGlobalFiltering(querySearch), 500);
    return () => clearTimeout(timeout);
  }, [querySearch]);

  useEffect(() => {
    setLocalStorage("columnVisibility", JSON.stringify(columnVisibility));
  }, [columnVisibility]); 

  const columns = useMemo(() => columnsDef, []);

  const tableInstance = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    state: {
      sorting,
      pagination,
      globalFilter: globalFiltering,
      rowSelection,
      columnVisibility
    },
    pageCount: totalPages,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFiltering,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true
  });

  const handleDeleteData = async () => {
    const totalSelectedData = tableInstance.getSelectedRowModel().flatRows.length;
    if (totalSelectedData === 1) {
      const dataId = tableInstance.getSelectedRowModel().flatRows[0].original.id;
      const { error, message } = await deleteValidationData({ 
        validationId: Number(dataId)
      });
      if (error) {
        toast.error(message);
      } else {
        await fetchData();
        toast.success(message);
      }
      setShowPopupDelete(false);
    } else if (totalSelectedData > 1) {
      const dataIds = tableInstance.getSelectedRowModel().flatRows.map((item) => Number(item.original.id));
      const { error, message } = await bulkDeleteValidationData({
        validationIds: dataIds
      });
      if (error) {
        toast.error(message);
      } else {
        await fetchData();
        toast.success(message);
      }
      setShowPopupDelete(false);
    }
  }

  const handleExportData = async () => {
    setIsLoading(true);
    const { error, message } = await exportCsvValidationData();
    if (error) {
      toast.error(message);
    } else {
      toast.success(message);
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="px-4 md:px-8 pt-4">
        <h1 className="text-[26px] font-medium">
          Data Validasi Akun Trading
        </h1>
        <p className="text-base text-black/60">
          Total {totalData} data
        </p>
        <div className="mb-5 mt-4 lg:mt-8 flex flex-col lg:flex-row items-end lg:items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-2 w-full">
            <div className="py-1 px-2 flex flex-1 items-center gap-2 w-full bg-white border border-[#D2CEE1] rounded-sm max-w-full lg:max-w-[456px]">
              <label htmlFor="search" className="cursor-pointer">
                <CiSearch className="text-2xl text-[#7E7E7E]" />
              </label>
              <input
                id="search"
                name="search"
                placeholder="Cari nama, email, atau akun bank"
                value={querySearch}
                onChange={(e) => setQuerySearch(e.target.value)}
                type="text"
                autoComplete="off"
                className="w-full text-base placeholder:text-[rgba(0,0,0,0.6)] focus:outline-0"
              />
            </div>
            {tableInstance.getSelectedRowModel().flatRows.length > 0 &&
              <div
                onClick={() => setShowPopupDelete(!showPopupDelete)}
                className="px-2 py-1 rounded-md border border-my-red bg-my-red text-white place-items-center cursor-pointer active:brightness-90 transition-all duration-300 ease-out">
                <span className="whitespace-nowrap">
                  Hapus {tableInstance.getSelectedRowModel().flatRows.length} data
                </span>
              </div>
            }
            {tableInstance.getSelectedRowModel().flatRows.length === 1 &&
              <button
                onClick={() => {
                  openDetail();
                  setSelectedData(tableInstance.getSelectedRowModel().flatRows[0].original)
                }}
                className="p-2 rounded-md bg-linear-to-t from-dark-primary to-primary border border-primary text-white place-items-center cursor-pointer active:brightness-90 transition-all duration-300 ease-out"
              >
                <MdEdit />
              </button>
            }
          </div>
          <div className="flex items-center gap-2">
            {isLoading && <Spinner w="w-6" h="h-6" />}
            <div className="flex">
              <button
                onClick={tableInstance.previousPage}
                disabled={isLoading || !tableInstance.getCanPreviousPage()}
                className="p-2 rounded-l-md border border-[#D2CEE1] text-black/60 place-items-center cursor-pointer hover:bg-black/5 transition-all duration-300 ease-out disabled:opacity-60 disabled:hover:bg-black/0 disabled:cursor-auto"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={tableInstance.nextPage}
                disabled={isLoading || !tableInstance.getCanNextPage()}
                className="p-2 rounded-r-md border border-[#D2CEE1] text-black/60 place-items-center cursor-pointer hover:bg-black/5 transition-all duration-300 ease-out disabled:opacity-60 disabled:hover:bg-black/0 disabled:cursor-auto"
              >
                <FaChevronRight />
              </button>
            </div>
            <Tooltip 
              disabled={isLoading}
              icon={<LuRefreshCcw />} 
              handleClick={fetchData} 
              detail={"Reload Data"} />
            <Tooltip 
              disabled={isLoading}
              icon={<TbTableExport className="text-lg" />} 
              handleClick={handleExportData} 
              detail={"Export CSV"} />
            <Tooltip 
              disabled={isLoading}
              icon={<MdOutlineFileUpload className="text-lg" />} 
              handleClick={openImport} 
              detail={"Import CSV"} />
            <Tooltip 
              icon={<IoFilter />} 
              handleClick={openFilter} 
              detail={"Filter"} />
          </div>
        </div>
      </div>
      <div className="w-full flex-1 h-2.5">
        <TableValData 
          tableInstance={tableInstance}
          isLoading={isLoading}
          isInitialLoad={isInitialLoad}
        />
      </div>
      
      {activeDrawer === "DETAIL" && selectedData &&
        <DrawerDetailData 
          validationData={selectedData}
          closeDrawer={closeDrawer}
          setData={setData}
        />
      }
      
      {activeDrawer === "FILTER" && <DrawerFilterTable
        tableInstance={tableInstance} 
        closeDrawer={closeDrawer}
      />}

      {activeDrawer === "IMPORT" && <DrawerImportCsv
        closeDrawer={closeDrawer}
        refreshData={fetchData}
      />}

      {showPopupDelete && <ModalDeleteValidationData
        title={`Hapus ${tableInstance.getSelectedRowModel().flatRows.length} data validasi`}
        handleDelete={handleDeleteData} 
        isVisible={showPopupDelete} 
        handleClose={() => setShowPopupDelete(false)}          
      />}
    </>
  )
}

export default ValidationDataDashboard;
