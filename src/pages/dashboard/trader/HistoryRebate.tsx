import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TraderAPI } from "@/api";
import type { MetaPage } from "@/types/metapage.type";

import NoDataFound from "@/components/dashboard/common/NoDataFound";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import HistoryRebateTable from "@/components/dashboard/trader/HistoryRebateTable";
import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";

import Tooltip from "@/components/ui/Tooltip";
import Spinner from "@/components/ui/Spinner";
import SelectDropdown from "@/components/ui/SelectDropdown";

import { LuRefreshCcw } from "react-icons/lu";
import { brokers } from "@/utils/dataBroker/brokers";

const CONFIG_HEADERS = [
  {key: "createdAt", header: "Tanggal"},
  {key: "broker", header: "Broker"}, 
  {key: "accountNumber", header: "Nomor Akun Trading"}, 
  {key: "rebate", header: "Rebate"}, 
];

const supportEntry = [
  { "key": "20", "value": "20" }, 
  { "key": "50", "value": "50" },
  { "key": "100", "value": "100" }
];

export type DataRebate = {
  createdAt: string;
  broker: string;
  accountNumber: string;
  rebate: number;
};
type ResponseRebate = {
  created_at: string;
  broker: { name: string };
  account_number: string;
  total_rebate: number;
}

const HistoryRebate = () => {
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataRebate, setDataRebate] = useState<DataRebate[]>([]);
  const { brokerParams } = useParams();
  const broker = brokers[brokerParams as keyof typeof brokers];

  const [metaPage, setMetaPage] = useState<MetaPage>({
    pageIndex: 1,
    pageTotal: 1,
    totalData: 0,
    limit: 20
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const { error, data } = await TraderAPI.getRebatesByTrader({
        limit: metaPage.limit,
        page: metaPage.pageIndex,
        brokerSearch: broker ? brokerParams : undefined
      });
  
      if (!error && data) {
        const temp = data.data.map((item: ResponseRebate) => ({
          createdAt: item.created_at,
          broker: item.broker.name,
          accountNumber: item.account_number,
          rebate: item.total_rebate,
        }));
        setDataRebate(temp);
        setMetaPage((prev) => {
          if (
            prev.pageIndex === data.meta.page &&
            prev.pageTotal === data.meta.totalPages &&
            prev.totalData === data.meta.total &&
            prev.limit === data.meta.limit
          ) return prev;
  
          return {
            ...prev,
            pageIndex: data.meta.page,
            pageTotal: data.meta.totalPages,
            totalData: data.meta.total,
            limit: data.meta.limit
          };
        });
      }    
    } finally {
      setInitLoad(false);
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brokerParams, metaPage.limit, metaPage.pageIndex]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNextPage = () => {
    if (isLoading) return;
    if (metaPage.pageIndex < metaPage.pageTotal) {
      setMetaPage((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex + 1
      }));
    }
  };
  const handlePreviousPage = () => {
    if (isLoading) return;
    if (metaPage.pageIndex > 1) {
      setMetaPage((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex - 1
      }));
    }
  };

  return (
    <WrapperDashboardComponent>
      <section>
        <TitleDashboard>
          History Rebate 
          {brokerParams && broker?.name &&
            <span className="ml-2 bg-linear-to-t from-dark-primary to-primary bg-clip-text text-transparent">
              {broker.name}
            </span>
          }
        </TitleDashboard>
        <ParagraphDashboard maxW="w-fit lg:w-[760px] 2xl:w-full">
          Daftar riwayat perolehan rebate Anda. Gunakan filter untuk melihat detail komisi berdasarkan periode waktu serta broker.
        </ParagraphDashboard>

        {/* FILTER TABLE */}
        <div className="mt-3 md:mt-4 mb-4 2xl:mt-5 2xl:mb-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 2xl:gap-2.5 text-[#212529]">
              <span className="text-base 2xl:text-xl">Tampilkan</span>
              <SelectDropdown 
                selectedInput={metaPage.limit.toString()} 
                handleChangeInput={(key) => {
                  setMetaPage((prev) => ({
                    ...prev,
                    limit: Number(key),
                    pageIndex: 1
                  }))
                }} 
                objectInput={supportEntry}     
                inputCL="w-[72px]!"
                wrapperCL="w-fit!"         
              />
            </div>
            <div className="flex items-center gap-2 2xl:gap-3">
              <Tooltip 
                disabled={isLoading}
                icon={<LuRefreshCcw className={`${isLoading ? "animate-spin" : ""}`} />} 
                handleClick={() => fetchData()} 
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
        <HistoryRebateTable 
          dataRebate={dataRebate} 
          CONFIG_HEADERS={CONFIG_HEADERS}        
        />

        {/* LOADING & 0 DATA TABLE */}
        {dataRebate.length === 0 && (initLoad || isLoading) &&
          <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
            <Spinner />
          </div>
        }
        {dataRebate.length === 0 && !initLoad && !isLoading &&
          <NoDataFound>
            <p className="text-black/80 text-base 2xl:text-xl">
              {brokerParams && broker?.name ? 
                `Saat ini, Anda tidak memiliki riwayat perolehan rebate pada broker ${broker.name}.`
              : "Saat ini, Anda tidak memiliki riwayat perolehan rebate."}
              
            </p>
          </NoDataFound>
        }
        <div className="mt-4">
          <p className="text-base 2xl:text-xl text-black/80">
            {`Menampilkan 
            ${metaPage.pageIndex === 1 ? (dataRebate.length > 0 ? "1":"0") : metaPage.limit * metaPage.pageIndex} 
            hingga  
            ${metaPage.pageIndex === 1 ? dataRebate.length : (metaPage.limit * metaPage.pageIndex) + dataRebate.length} 
            dari ${metaPage.totalData}
            entri.`}
          </p>
        </div>
      </section>
    </WrapperDashboardComponent>
  )
}

export default HistoryRebate;
