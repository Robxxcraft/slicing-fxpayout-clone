import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import RecentRebatesAdmin from "@/components/dashboard/admin/overview/RecentRebatesAdmin";
import { useEffect, useState } from "react";
import { AdminAPI } from "@/api";
import RecentTransactionsAdmin from "@/components/dashboard/admin/overview/RecentTransactionsAdmin";
import ChangeStatusSelection from "@/components/dashboard/common/ChangeStatusSelection";
import OverviewAdminHeader from "@/components/dashboard/admin/overview/OverviewAdminHeader";
import { getLocalStorage, setLocalStorage } from "@/services/apiClient";

type CardAdminOverview = {
  withdrawals: number;
  banks: number;
  rebates: number;
  brokers: number;
  traders: number;
  affiliators: number;
};

const OverviewAdmin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cardAdmin, setCardAdmin] = useState<CardAdminOverview>(() => {
    let data;
    const cache = getLocalStorage("card_admin");
    if (cache) data = JSON.parse(cache);

    return {
      withdrawals: data?.withdrawals || 0,
      banks: data?.banks || 0,
      rebates: data?.rebates || 0,
      brokers: data?.brokers || 0,
      traders: data?.traders || 0,
      affiliators: data?.affiliators || 0
    }
  });
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const responseOverview = await AdminAPI.getDataOverview();
        if (!responseOverview.error && responseOverview.data) {
          const raw = responseOverview.data;
          const payload = {
            withdrawals: raw.pending_withdrawals,
            banks: raw.pending_banks,
            rebates: raw.pending_rebates,
            brokers: raw.pending_brokers,
            traders: raw.total_traders,
            affiliators: raw.total_affiliators
          };
          setCardAdmin(payload);
          setLocalStorage("card_admin", JSON.stringify(payload));
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <WrapperDashboardComponent>
      <OverviewAdminHeader 
        withdrawals={cardAdmin.withdrawals} 
        banks={cardAdmin.banks} 
        rebates={cardAdmin.rebates} 
        brokers={cardAdmin.brokers} 
        traders={cardAdmin.traders} 
        affiliators={cardAdmin.affiliators} 
      />
      <RecentTransactionsAdmin />
      <RecentRebatesAdmin />

      <ChangeStatusSelection />
    </WrapperDashboardComponent>
  )
}

export default OverviewAdmin;
