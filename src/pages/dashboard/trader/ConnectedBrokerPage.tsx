import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { BrokerAPI } from "@/api";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useBrokerUserContext } from "@/hooks/useBrokerUserContext";
import type { FullStatusType } from "@/types/status.type";
import { statusMap } from "@/constants/statusDropdown";

import NoDataFound from "@/components/dashboard/common/NoDataFound";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";

import Spinner from "@/components/ui/Spinner";
import Tooltip from "@/components/ui/Tooltip";
import SelectDropdown from "@/components/ui/SelectDropdown";
import ModalConfirmation from "@/components/ui/ModalConfirmation";

import { LuRefreshCcw } from "react-icons/lu";
import HeaderConnectedBroker from "@/components/dashboard/trader/connectedBrokerPage/HeaderConnectedBroker";
import SearchDashboard from "@/components/dashboard/common/SearchDashboard";
import ConnectedBrokerTable from "@/components/dashboard/trader/connectedBrokerPage/ConnectedBrokerTable";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";

const CONFIG_HEADERS = [
  {key: "name", header: "Broker"}, 
  {key: "accountNumber", header: "Nomor Akun Trading"}, 
  {key: "rebate", header: "Total Rebate"}, 
  {key: "status", header: "Status"}, 
  {key: "createdAt", header: "Tanggal Dibuat"}, 
  {key: "action", header: "Aksi"}
];

const ConnectedBrokerPage = () => {
  const { i18n } = useTranslation();
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { brokersUser, fetchBrokerUser, metaPage } = useBrokerUserContext();
  const searchTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Filter Table
  const [querySearch, setQuerySearch] = useState<string>("");
  const [showPopupDelete, setShowPopupDelete] = useState<boolean>(false);
  const [selectedBrokerId, setSelectedBrokerId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<FullStatusType>("all");
 
  const fetchData = async (
    init?: boolean,
    filters?: { status?: FullStatusType; limit?: number; query?: string; page?: number }
  ) => {
    setIsLoading(true);
    const status = filters?.status !== "all" ? 
      filters?.status || (filterStatus === "all" ? undefined : filterStatus) : undefined;
    const query = (filters?.query || filters?.query === "") ? filters.query : querySearch;
    
    await fetchBrokerUser(init, {
      page: filters?.page,
      query: query,
      status: status,
      limit: filters?.limit
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    setInitLoad(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function Helper
  const openPopupDeleteConfimation = (id: number) => {
    setSelectedBrokerId(id);
    setShowPopupDelete(true);
  }
  const handleDeleteBroker = async (brokerId: number) => {
    const { error, message } =  await BrokerAPI.deleteBrokerByUser({ brokerId });

    if (error) {
      toast.error(message);
    } else {
      await fetchData(true, {
        page: 1
      });
      toast.success(message);
    }
    setShowPopupDelete(false);
  }
  const handleNextPage = () => {
    if (isLoading) return;
    if (metaPage.pageIndex < metaPage.pageTotal) {
      fetchData(true, {
        page: metaPage.pageIndex + 1,
      });
    }
  }
  const handlePreviousPage = () => {
    if (isLoading) return;
    if (metaPage.pageIndex > 1) {
      fetchData(true, {
        page: metaPage.pageIndex - 1,
      });
    }
  }
  const handleChangeStatus = (key: string) => {
    if (isLoading) return;
    setFilterStatus(key as FullStatusType);
    fetchData(true, {
      status: key as FullStatusType,
      page: 1
    });
  }
  const handleQueryBrokerUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuerySearch(value);

    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    searchTimerRef.current = setTimeout(() => {
      fetchData(true, {
        query: value,
        page: 1
      });
    }, 500);
  }

  useLockBodyScroll(showPopupDelete);
  const useFilter = filterStatus !== "all" || querySearch;
  return (
    <WrapperDashboardComponent>
      <section>
        {/* HEADER */}
        <HeaderConnectedBroker />
        {/* FILTER TABLE */}
        <div className="mt-3 md:mt-4 mb-4 3xl:mt-5 3xl:mb-5">
          <div className="flex items-center flex-col md:flex-row justify-between gap-2 3xl:gap-3">
            <SearchDashboard 
              query={querySearch}
              onQuery={handleQueryBrokerUser}
              placeholder="Search..."
            />
            <div className="flex items-center gap-2 3xl:gap-3 w-full md:w-fit">
              <SelectDropdown 
                selectedInput={filterStatus} 
                handleChangeInput={handleChangeStatus} 
                objectInput={statusMap}       
                disabled={isLoading}
                wrapperCL="w-full! md:w-[150px]! 3xl:w-[200px]!"             
                inputCL="w-[200px]! 3xl:w-[240px]!"        
              />
              <Tooltip 
                disabled={isLoading}
                icon={<LuRefreshCcw className={`${isLoading ? "animate-spin" : ""}`} />} 
                handleClick={() => fetchData(true)} 
                detail={"Reload Data"} />
                
              <NextPreviousButton 
                onNextPage={handleNextPage} 
                onPreviousPage={handlePreviousPage} 
                disabledNext={metaPage.pageIndex >= metaPage.pageTotal} 
                disabledPrev={metaPage.pageIndex <= 1} 
              />
            </div>

          </div>
        </div>
        {/* TABLE */}
        <ConnectedBrokerTable 
          isLoading={initLoad || isLoading}
          CONFIG_HEADERS={CONFIG_HEADERS}
          onOpenDeleteConfirm={openPopupDeleteConfimation}
          brokersUser={brokersUser}
        />
        {/* LOADING & 0 DATA TABLE */}
        {brokersUser.length === 0 && (initLoad || isLoading) &&
          <div className="mt-4 3xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
            <Spinner />
          </div>
        }
        {brokersUser.length === 0 && !initLoad && !isLoading &&
          <NoDataFound useImage>
            {useFilter ?
              "Tidak ditemukan data broker yang sesuai dengan filter atau pencarian Anda."
            : 
              <p className="text-black/80 text-base 3xl:text-xl">Belum ditemukan data broker yang terhubung. {" "}
                <Link to={getLocalizedPath("trader/broker/connect", i18n.language)}
                  className="text-primary underline"
                >Hubungkan broker.</Link>
              </p>
            }
          </NoDataFound>
        }

        <div className="mt-4">
          <p className="text-base 3xl:text-xl text-black/80">
            {`Menampilkan 
            ${metaPage.pageIndex === 1 ? (brokersUser.length > 0 ? "1":"0") : metaPage.limit * (metaPage.pageIndex - 1)} 
            hingga  
            ${metaPage.pageIndex === 1 ? brokersUser.length : (metaPage.limit * (metaPage.pageIndex - 1)) + brokersUser.length} 
            dari ${metaPage.totalData}
            entri.`}
          </p>
        </div>
      </section>

      {/* FLOATIN MODAL */}
      {showPopupDelete && <ModalConfirmation
        title="Hapus koneksi broker"
        paragraph="Tindakan ini akan menghapus koneksi broker secara permanen dan tidak dapat dibatalkan."
        handleConfirmation={async () => {
          if (selectedBrokerId) {
            await handleDeleteBroker(selectedBrokerId);
          }
        }}
        isVisible={showPopupDelete}
        handleClose={() => {
          setSelectedBrokerId(null);
          setShowPopupDelete(false);
        }} 
        btnConfirmation={"danger"} 
        confirmText={"Hapus"} 
        cancelText={"Batal"}      
      />}
    </WrapperDashboardComponent>
  )
}

export default ConnectedBrokerPage;
