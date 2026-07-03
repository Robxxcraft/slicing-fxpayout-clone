import { AffilitorAPI } from "@/api";
import PreviewRefferal from "@/components/dashboard/affiiliator/overview/PreviewRefferal";
import RecentEarnings from "@/components/dashboard/affiiliator/overview/RecentEarnings";
import CardOverview from "@/components/dashboard/common/CardOverview";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import BalanceContext from "@/context/BalanceContext";
import UserContext from "@/context/UserContext";
import { copyToClipboard } from "@/helper/copyToClipboard";
import { formattingUsd } from "@/helper/formattingCurrency";
import { getLocalStorage, setLocalStorage } from "@/services/apiClient";
import { useContext, useEffect, useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";

type DataEarnings = {
  created_at: string;
  account_name: string;
  broker: string;
  account_number: string;
  rebate: string;
  comission: string; 
};

type LayoutCard = {
  activeTraders: number;
  refferedTraders: number;
  balance: number;
}

const OverviewAffiliator = () => {
  const [authUser] = useContext(UserContext);
  const [balance, setBalance] = useContext(BalanceContext);
  const [isLoading, setIsLoading] = useState<{ card: boolean, earnings: boolean }>({
    card: true,
    earnings: true
  });
  const [isCopied, setIsCopied] = useState({
    url: false,
    code: false
  });
  const [dataEarnings, setDataEarnings] = useState<DataEarnings[]>([])
  const [cardData, setCardData] = useState<LayoutCard>(() => {
    let active, reffered;
    const cache = getLocalStorage("card_trader");
    if (cache) {
      const data = JSON.parse(cache);
      active = data.active;
      reffered = data.reffered;
    }
    return {
      activeTraders: active || 0,
      refferedTraders: reffered || 0,
      balance: balance?.balance || 0
    }
  });

  const fetchCard = async () => {
    setIsLoading((prev) => ({
      ...prev,
      card: true
    }));

    const responseDashboard = await AffilitorAPI.getDashboardData();
    if (!responseDashboard.error && responseDashboard.data) {
      const currentAmount = responseDashboard.data.balance ? 
        responseDashboard.data.balance.amount : (balance ? balance.balance : 0)
      setCardData((prev) => ({
        ...prev,
        refferedTraders: responseDashboard.data.total_traders,
        activeTraders: responseDashboard.data.active_traders,
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
      const payload = {
        reffered: responseDashboard.data.total_traders,
        active: responseDashboard.data.active_traders
      };
      setLocalStorage("card_trader", JSON.stringify(payload));
    } 

    setIsLoading((prev) => ({
      ...prev,
      card: false
    }));
  }
  const fetchRecentEarnings = async () => {
    setIsLoading((prev) => ({
      ...prev,
      earnings: true
    }));

    const responseDashboard = await AffilitorAPI.getRecentEarnings();
    if (!responseDashboard.error && responseDashboard.data) {
      const raw = responseDashboard.data.data;
      const temp = raw.map((item: {
        created_at: string;
        user: { full_name: string };
        broker: { name: string };
        account_number: string;
        total_rebate: number;
        total_earning: number;
      }) => ({
        created_at: item.created_at,
        account_name: item.user.full_name,
        broker: item.broker.name,
        account_number: item.account_number,
        rebate: item.total_rebate,
        comission: item.total_earning,
      }));
      setDataEarnings(temp);
    } 

    setIsLoading((prev) => ({
      ...prev,
      earnings: false
    }));
  }

  const fetchDataDashboard = async () => {
    await Promise.all([
      fetchRecentEarnings(),
      fetchCard()
    ]);
  }
  
  useEffect(() => {
    fetchDataDashboard()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = async (ref: "url" | "code") => {
    if (!authUser?.affiliatorCode) return;

    const text = ref === "url" ? `https://fxpayout.com/register?ref=${authUser.affiliatorCode}` : authUser.affiliatorCode;
    const isCopySuccess = await copyToClipboard(text);
    if (isCopySuccess) {
      setIsCopied((prev) => ({
        ...prev,
        [ref]: true
      }));
      setTimeout(() => {
        setIsCopied((prev) => ({
          ...prev,
          [ref]: false
        }));
      }, 2000);
    }
  };

  const overviewLoading = isLoading.card && (cardData.activeTraders === 0 || cardData.refferedTraders === 0 || cardData.balance === 0);
  return (
    <WrapperDashboardComponent>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4 3xl:gap-5">
        <CardOverview 
          status={"active"} title={"Reffered Traders"} 
          icon={<LuUsers />} content={cardData.refferedTraders.toLocaleString()} 
          detail={"Total traders joined using your link"} 
          isLoading={overviewLoading}  
        />
        <CardOverview 
          title={"Active Traders"} icon={<LuUsers />} 
          content={cardData.activeTraders.toLocaleString()} detail={"Active traders in your network"} 
          isLoading={overviewLoading}    
        />
        <CardOverview 
          title={"Balance"} icon={<IoWalletOutline />} 
          content={formattingUsd(cardData.balance)} 
          detail={"Available balance for withdrawal"} 
          isLoading={overviewLoading}    
        />
      </section>
      <PreviewRefferal 
        onCopy={handleCopy}
        isCopied={isCopied}
        codeRefferal={authUser?.affiliatorCode || ""}
      />
      <RecentEarnings 
        dataEarnings={dataEarnings}
        isLoading={isLoading.earnings}
      />
    </WrapperDashboardComponent>
  )
}

export default OverviewAffiliator;
