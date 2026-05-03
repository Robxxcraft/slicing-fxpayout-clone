import { useContext, useEffect, useState } from "react";

import { TraderAPI } from "@/api";
import BalanceContext from "@/context/BalanceContext";
import { formattingUsd } from "@/helper/formattingCurrency";
import { useBrokerUserContext } from "@/hooks/useBrokerUserContext";
import { getLocalStorage, setLocalStorage } from "@/services/apiClient";

import CardOverview from "@/components/dashboard/common/CardOverview";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import EarningRebate from "@/components/dashboard/trader/overview/EarningRebate";
import BrokerOverview from "@/components/dashboard/trader/overview/BrokerOverview";

import { BsBank2 } from "react-icons/bs";
import { IoCardOutline, IoWalletOutline } from "react-icons/io5";

type LayoutCard = {
  lifetimeBalance: number;
  connectBrokers: number;
  balance: number;
}

const OverviewTrader = () => {
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const { brokersUser, fetchBrokerUser } = useBrokerUserContext();
  const [balance, setBalance] = useContext(BalanceContext);
  const [cardData, setCardData] = useState<LayoutCard>({
    lifetimeBalance: Number(getLocalStorage("lifetime_balance")) || 0,
    connectBrokers: brokersUser.filter((item) => item.status === "approved").length,
    balance: balance?.balance || 0
  });
   
  const fetchDataDashboard = async () => {
    await fetchBrokerUser();
    const responseDashboard = await TraderAPI.getDashboardData();
    if (!responseDashboard.error && responseDashboard.data) {
      const currentAmount = responseDashboard.data.balance ? 
        responseDashboard.data.balance.amount : (balance ? balance.balance : 0);
      setCardData((prev) => ({
        ...prev,
        lifetimeBalance: responseDashboard.data.lifetimeBalance,
        balance: currentAmount
      }));
      if (balance && balance.balance !== currentAmount) {
        setBalance((prev) => {
          if (!prev) {
            return {
              userId: responseDashboard.data.balance.userId,
              currency: responseDashboard.data.balance.currency,
              balance: currentAmount
            }
          }
          return { 
            ...prev, 
            balance: currentAmount 
          }});
      }
      setLocalStorage("lifetime_balance", responseDashboard.data.lifetimeBalance);
    } 
    setInitLoad(false);
  }
  useEffect(() => {
    fetchDataDashboard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (brokersUser.length > 0) {
      setCardData(prev => ({
        ...prev,
        connectBrokers: brokersUser.filter((item) => item.status === "approved").length
      }));
    }
  }, [brokersUser]);
  
  const overviewLoading = initLoad && (cardData.lifetimeBalance === 0 || cardData.connectBrokers === 0 || cardData.balance === 0);
  return (
    <WrapperDashboardComponent>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4 2xl:gap-5">
        <CardOverview 
          status={"active"}
          title={"Lifetime Rebate"} 
          icon={<IoCardOutline />} sizeIcon="sm"
          content={`${formattingUsd(cardData.lifetimeBalance)}`} 
          detail={"Lifetime accumulated"} 
          isLoading={overviewLoading}
        />
        <CardOverview 
          title={"Active Broker"} 
          icon={<BsBank2 />} 
          content={cardData.connectBrokers.toString()} 
          detail={"Total active connected broker"} 
          isLoading={overviewLoading}
        />
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardOverview 
            title={"Balance"} 
            icon={<IoWalletOutline />} 
            sizeIcon="sm"
            content={formattingUsd(cardData.balance)} 
            detail={"Available balance for withdrawal"} 
            isLoading={overviewLoading}
          />
        </div>
      </section>
      <EarningRebate />
      <BrokerOverview initLoad={initLoad} brokersUser={brokersUser} />
    </WrapperDashboardComponent>
  )
}

export default OverviewTrader;
