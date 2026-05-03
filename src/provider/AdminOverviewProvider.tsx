import { AdminAPI } from "@/api";
import { AdminOverviewContext, type DataAdminOverview } from "@/context/AdminOverviewContext";
import { useState } from "react";

const AdminOverviewProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataAdminOverview, setDataAdminOverview] = useState<DataAdminOverview | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const fetchDataAdminOverview = async (force?: boolean) => {
    if (isFetched && !force) return;

    try {
      const { error, message, data } = await AdminAPI.getDataOverview();
      if (!error && data) {
        const payload = {
          pendingWithdrawals: data.pending_withdrawals,
          totalWithdrawals: data.total_withdrawals,
          pendingBanks: data.pending_banks,
          totalBanks: data.total_banks,
          pendingRebates: data.pending_rebates,
          totalRebates: data.total_rebates,
          pendingBrokers: data.pending_brokers,
          totalBrokers: data.total_brokers,
          traders: data.total_traders,
          pendingTraders: data.pending_traders,
          pendingAffiliators: data.pending_affiliators,
          affiliators: data.total_affiliators,
          totalCommission: data.total_commision_paids
        };
        setDataAdminOverview(payload);
      } else {
        setDataAdminOverview({
          pendingWithdrawals: 0,
          totalWithdrawals: 0,
          pendingBanks: 0,
          totalBanks: 0,
          pendingRebates: 0,
          totalRebates: 0,
          pendingBrokers: 0,
          totalBrokers: 0,
          pendingTraders: 0,
          traders: 0,
          pendingAffiliators: 0,
          affiliators: 0,
          totalCommission: 0
        })
      }
      return { error, message };
    } finally {
      setIsFetched(true);
    }
  }

  return (
    <AdminOverviewContext.Provider value={{ dataAdminOverview, setDataAdminOverview, fetchDataAdminOverview }}>
      {children}
    </AdminOverviewContext.Provider>
  )
}

export default AdminOverviewProvider;
