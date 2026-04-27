import { useEffect, useState } from "react";
import { TiInfoLarge } from "react-icons/ti";
import RebateChart from "./RebateChart";
import { getLocalStorage, setLocalStorage } from "@/services/apiClient";
import { TraderAPI } from "@/api";
import { aggregateBrokerContribution, aggregateRebateByDate } from "@/helper/aggregateRebateEarning";
import { formattingUsd } from "@/helper/formattingCurrency";
import { formatDateYYYYMMDD } from "@/helper/formattingDate";

const EarningRebate = () => {
  const [intervalDays, setIntervalDays] = useState<7 | 30 | 90>(90);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rebateByDate, setRebateByDate] = useState<Record<string, number> | null>(null);
  const [rebateByBroker, setRebateByBroker] = useState<Record<string, number> | null>(null);

  const fetchData = async (days: number) => {
    setIsLoading(true);
    try { 
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(endDate.getDate() - intervalDays);

      const { error, data } = await TraderAPI.getRebateChartData({
        limit: 100,
        startDate: formatDateYYYYMMDD(startDate.toLocaleDateString())
      });

      if (!error && data) {
        const byDate = aggregateRebateByDate(data.data);
        const byBroker = aggregateBrokerContribution(data.data);

        setRebateByDate(byDate);
        setRebateByBroker(byBroker);

        const today = formatDateYYYYMMDD(endDate.toLocaleDateString());
        const payload = {
          date: today,
          data: {
            byDate, byBroker
          }
        };
        setLocalStorage(`rebate_cache_${days}_days`, JSON.stringify(payload));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkChaceRebateBeforeFetch = (days: number) => {
    if (isLoading) return;

    const cacheRebate = getLocalStorage(`rebate_cache_${days}_days`);
    // ? Jika tidak ada data => lakukan fetch
    if (!cacheRebate) {
      fetchData(days);
      return;
    }

    const parsed = JSON.parse(cacheRebate);
    const date = new Date().toLocaleDateString();;
    const today = formatDateYYYYMMDD(date)
    if (parsed.date === today) {
      // ? Jika hari masih sama => langsung gunakan data
      setRebateByDate(parsed.data.byDate);
      setRebateByBroker(parsed.data.byBroker);
    } else {
      // ? Jika beda hari => lakukan fetch
      fetchData(days);
    }
  }

  useEffect(() => {
    checkChaceRebateBeforeFetch(90);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="mt-7 2xl:mt-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
        <div>
          <h2 className="text-xl 2xl:text-[2rem] font-semibold">
            Earnings Rebate Overview
          </h2>
          <p className="text-base 2xl:text-xl text-black/80 md:max-w-[760px] leading-[169.2%]">
            Track your generated rebates and commissions over time.
          </p>
        </div>
        <div className="p-2 flex gap-2 bg-white border border-[#DDDDDD] rounded-lg w-full md:w-fit">
          {[7, 30, 90].map((interval) => (
            <div
              key={interval}
              onClick={() => {
                setIntervalDays(interval as 7 | 30 | 90);
                checkChaceRebateBeforeFetch(interval);
              }} 
              className={`${interval === intervalDays ? "bg-linear-to-t from-dark-primary to-primary border border-primary" : "bg-transparent"}
              py-2 px-2.5 w-full md:w-fit border border-[#DDDDDD] rounded-md cursor-pointer`}>
              <p className={`${interval === intervalDays ? "text-white" : "text-black/60"} text-sm 2xl:text-lg text-center font-medium`}>
                {interval} Days
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* DETAIL CHART */}
      <div className="mt-4 2xl:mt-5 flex flex-col md:flex-row gap-2 lg:gap-4 2xl:gap-5">
        <div className="shrink-0 space-y-2 md:space-y-4 2xl:space-y-5 select-none">
          <div className="p-5 lg:p-6 w-full md:max-w-60 2xl:max-w-[320px] h-fit bg-white border border-[#DDDDDD] rounded-lg">
            <div className="pb-4 md:pb-6 border-b">
              <p className="font-medium text-base 2xl:text-lg">Total Earnings</p>
              {!isLoading ? (rebateByDate &&
                <p className="mt-2 md:mt-4 text-[32px] 2xl:text-[36px] leading-[39px] font-semibold">
                  {formattingUsd(Object.values(rebateByDate).reduce((prev, cur) => prev + cur, 0))}
                </p>)
                :
                  <div className="mt-2 md:mt-4 animate-pulse">
                    <div className="h-4 w-full bg-gray-300 rounded-full"></div>
                  </div> 
              }
            </div>
            <div className="mt-4 md:mt-6 flex gap-2 items-center">
              <span className="flex shrink-0 items-center justify-center size-5 2xl:size-7 border border-primary rounded-full">
                <TiInfoLarge className="text-sm 2xl:text-xl text-primary" />
              </span>
              <span className="text-xs 2xl:text-base text-black/60">
                Total Rebate yang dihasilkan dalam {intervalDays} hari terakhir 
              </span>
            </div>
          </div>
          <div className="p-5 lg:p-6 w-full md:max-w-60 2xl:max-w-[320px] h-fit bg-white border border-[#DDDDDD] rounded-lg">
            <div className="pb-4 md:pb-6"> 
              <p className="font-medium text-base 2xl:text-lg">Broker Breakdown</p>
            </div>
            {!isLoading ? (rebateByBroker && 
              <div className="space-y-1">
              {Object.entries(rebateByBroker).map(([broker, rebate]) => (
                <div key={broker} className="flex justify-between items-center">
                  <p className="text-sm 2xl:text-lg text-primary font-medium">{broker}</p>
                  <p className="text-sm 2xl:text-lg text-black/80 font-bold">{formattingUsd(rebate)}</p>
                </div>
              ))}
              </div>)
              :
              <div className="space-y-3">
                <div className="animate-pulse">
                  <div className="h-2 w-full bg-gray-300 rounded-full"></div>
                </div> 
                <div className="animate-pulse">
                  <div className="h-2 w-full bg-gray-300 rounded-full"></div>
                </div> 
              </div>
            }
           </div>
        </div>
        {rebateByDate &&
          <RebateChart 
            rebateByDate={rebateByDate}
          />
        }
      </div>
    </section>
  )
}

export default EarningRebate;
