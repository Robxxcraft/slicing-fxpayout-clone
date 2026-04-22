import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getLocalizedPath } from "@/helper/pathHelper";
import { useBrokerUserContext } from "@/hooks/useBrokerUserContext";

import TinyButton from "@/components/dashboard/common/TinyButton";
import CardBroker from "@/components/dashboard/trader/CardBroker";
import CardOverview from "@/components/dashboard/common/CardOverview";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";

import { BsBank2 } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { TiInfoLarge } from "react-icons/ti";
import BalanceContext from "@/context/BalanceContext";
import { formattingUsd } from "@/helper/formattingCurrency";

const OverviewTrader = () => {
  const { i18n } = useTranslation();
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const { brokersUser, fetchBrokerUser } = useBrokerUserContext();
  const [balance] = useContext(BalanceContext);
   
  useEffect(() => {
    const fetchData = async () => {
      await fetchBrokerUser();
      setInitLoad(false);
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <WrapperDashboardComponent>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4">
        <CardOverview index={0} title={"Lifetime Rebate"} icon={<IoWalletOutline />} content={"$120.00"} detail={"Lifetime accumulated"} />
        <CardOverview index={1} title={"Connected Broker"} icon={<BsBank2 />} content={brokersUser.length.toString()} detail={"Total active connected broker"} />
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardOverview 
            index={2} title={"Balance"} icon={<IoWalletOutline />} 
            content={formattingUsd(balance?.balance || 0)} detail={"Available balance for withdrawal"} />
        </div>
      </section>
      <section className="mt-7">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
          <div>
            <h2 className="text-xl font-medium">
              Earnings Rebate Overview
            </h2>
            <p className="text-black/80 md:max-w-[760px]">
              Track your generated rebates and commissions over time.
            </p>
          </div>
          <div className="p-2 flex gap-2 bg-white border border-[#DDDDDD] rounded-lg w-full md:w-fit">
            <div className="py-2 px-2.5 w-full md:w-fit border border-[#DDDDDD] rounded-md cursor-pointer">
              <p className="text-sm text-center text-black/60 font-medium">7 Days</p>
            </div>
            <div className="py-2 px-2.5 w-full md:w-fit border border-[#DDDDDD] rounded-md cursor-pointer">
              <p className="text-sm text-center text-black/60 font-medium">30 Days</p>
            </div>
            <div className="py-2 px-2.5 w-full md:w-fit bg-linear-to-t from-dark-primary to-primary border border-primary rounded-md cursor-pointer">
              <p className="text-sm text-center text-white font-medium">90 Days</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col md:flex-row gap-4 lg:gap-6">
          <div className="p-5 lg:p-6 w-full md:max-w-60 bg-white border border-[#DDDDDD] rounded-lg">
            <div className="pb-4 md:pb-6 border-b">
              <p className="font-medium">Total Earnings</p>
              <p className="mt-2 md:mt-4 text-[32px] leading-[39px] font-semibold">
                $90.00 
              </p>
            </div>
            <div className="mt-4 md:mt-6 flex gap-2 items-center">
              <span className="flex shrink-0 items-center justify-center size-5 border border-primary rounded-full">
                <TiInfoLarge className="text-sm text-primary" />
              </span>
              <span className="text-xs text-black/60">
                Total Rebate yang dihasilkan dalam 30 hari terakhir 
              </span>
            </div>
          </div>
          <div className="p-6 w-full bg-white border border-[#DDDDDD] rounded-lg"></div>
        </div>
      </section>
      <section className="mt-7">
        <div className="flex flex-col md:flex-row justify-between items-start gap-3">
          <div>
            <h2 className="text-xl font-medium">
              Connected Broker
            </h2>
            <p className="text-black/80 md:max-w-[760px]">
              Daftar seluruh broker yang terkoneksi dengan akun Anda dan pantau status koneksi dan perolehan komisi rebate Anda.
            </p>
          </div>
          <TinyButton 
            buttonType="link" 
            icon={<IoIosAdd className="text-2xl" />} 
            iconPosition="left"
            urlTo={getLocalizedPath("trader/broker/connect", i18n.language)}
          >
            Tambah Broker
          </TinyButton>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {initLoad ?
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="w-full rounded-lg overflow-hidden border border-[#DDDDDD]">
                <div className="px-4 lg:px-6 pt-4 lg:pt-6 pb-3 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 size-10 bg-gray-300 rounded-full"></div>
                    <div className="flex flex-col gap-3">
                      <div className="h-2 w-60 bg-gray-300 rounded-full"></div>
                      <div className="h-2 w-60 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="h-2 w-32 bg-gray-300 rounded-full"></div>
                    <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <div className="h-2 w-[80%] bg-gray-300 rounded-full"></div>
                    <div className="h-2 w-[20%] bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))
          :
          brokersUser.length > 0 ? 
            brokersUser.map((item, idx) => (
              <CardBroker 
                key={idx} 
                name={item.name} 
                accountNumber={item.accountNumber} 
                status={item.status}              
              />
            ))
          : 
            <div className="mt-4 col-span-1 md:col-span-2 xl:col-span-3">
              <p className="text-center text-black/80">Belum ditemukan data broker yang terhubung. {" "}
                <Link to={getLocalizedPath("trader/broker/connect", i18n.language)}
                  className="text-primary underline"
                >Hubungkan broker.</Link>
              </p>
            </div>
          }
        </div>
      </section>
    </WrapperDashboardComponent>
  )
}

export default OverviewTrader;
