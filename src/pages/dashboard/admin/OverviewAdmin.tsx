import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AdminAPI } from "@/api";
import type { SetStatusType } from "@/types/status.type";
import { useAdminOverviewContext } from "@/hooks/useAdminOverviewContext";
import type { ResponseWithdrawalAPI, WithdrawalAdminManagement } from "@/types/withdrawal.type";
import type { RebateAdminManagement, ResponseRebateAPI } from "@/types/rebate.type";

import RecentRebatesAdmin from "@/components/dashboard/admin/overview/RecentRebatesAdmin";
import OverviewAdminHeader from "@/components/dashboard/admin/overview/OverviewAdminHeader";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import RecentTransactionsAdmin from "@/components/dashboard/admin/overview/RecentTransactionsAdmin";

type LoadingState = {
  overview: boolean;
  withdrawal: boolean;
  rebate: boolean;
};

const OverviewAdmin = () => {
  const [isLoading, setIsLoading] = useState<LoadingState>({
    overview: false,
    withdrawal: false,
    rebate: false
  });
  const { dataAdminOverview, fetchDataAdminOverview } = useAdminOverviewContext();
  const [dataWithdrawals, setDataWithdrawals] = useState<WithdrawalAdminManagement[]>([]); 
  const [dataRebates, setDataRebates] = useState<RebateAdminManagement[]>([]);

  const fetchDataOverview = async (init?: boolean) => {
    setIsLoading((prev) => ({
      ...prev,
      overview: true
    }));
    const responseDataAdminOverview = await fetchDataAdminOverview(init);
    if (responseDataAdminOverview && responseDataAdminOverview.error) {
      toast.error(responseDataAdminOverview.message);
    } 
    setIsLoading((prev) => ({
      ...prev,
      overview: false
    }));
  }
  const fetchDataWithdrawals = async () => {
    setIsLoading((prev) => ({
      ...prev,
      withdrawal: true
    }));

    const { error, message, data } = await AdminAPI.getAllWithdrawalRequests({
      limit: 5
    });
    if (!error && data) {
      const temp = data.data.map((item: ResponseWithdrawalAPI) => {
        const useUsd = item.currency === "USD";
        const useCrypto = item.bank_name === null && item.bank_account_name === null && item.bank_account_number === null;
        return ({
          id: item.id,
          user_id: item.user_id,
          bank_id: item.bank_id,
          crypto_id: item.crypto_id,
          method: useCrypto ? "crypto" : "bank",
          bank_name: useCrypto ? "Crypto" : item.bank_name || "-",
          account_name: useCrypto ? item.user.full_name : item.bank_account_name || "-",
          wallet_address: useCrypto ? item.crypto_wallet_address || "-" : item.bank_account_number || "-",
          total: useUsd ? item.amount_usd : item.amount_idr,
          currency: item.currency,
          status: item.status,
          created_at: item.created_at
        })
      });
      setDataWithdrawals(temp);
    } else {
      toast.error(message);
    }

    setIsLoading((prev) => ({
      ...prev,
      withdrawal: false
    }));
  }
  const fetchDataRebates = async () => {
    setIsLoading((prev) => ({
      ...prev,
      rebate: true
    }));

    const { error, message, data } = await AdminAPI.getAllRebates({
      limit: 5
    });
    if (!error && data) {
      const temp = data.data.map((item: ResponseRebateAPI) => ({
        id: item.id,
        created_at: item.created_at,
        date: item.date,
        account_number: item.account_number,
        broker_name: item.broker.name,
        total_rebate: item.total_rebate,
        status: item.status
      }));
      setDataRebates(temp);
    } else {
      toast.error(message);
    }

    setIsLoading((prev) => ({
      ...prev,
      rebate: false
    }));
  }
  useEffect(() => {
    fetchDataOverview();
    fetchDataWithdrawals();
    fetchDataRebates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeLoadWithdrawal = (load: boolean) => {
    setIsLoading((prev) => ({
      ...prev,
      withdrawal: load
    }));
  }
  const handleChangeStatusData = (ids: number[], newStatus: SetStatusType) => {
    setDataWithdrawals((prev) => (
      prev.map((item) => (
        ids.includes(item.id) ?
        {...item, status: newStatus} :
        item
      ))
    ));
  }
  return (
    <WrapperDashboardComponent>
      <OverviewAdminHeader 
        withdrawals={dataAdminOverview ? dataAdminOverview.pendingWithdrawals : 0} 
        banks={dataAdminOverview ? dataAdminOverview.pendingBanks : 0}
        rebates={dataAdminOverview ? dataAdminOverview.pendingRebates : 0} 
        brokers={dataAdminOverview ? dataAdminOverview.pendingBrokers : 0} 
        traders={dataAdminOverview ? dataAdminOverview.traders : 0} 
        affiliators={dataAdminOverview ? dataAdminOverview.affiliators : 0} 
        isLoading={isLoading.overview || dataAdminOverview === null}
      />
      <RecentTransactionsAdmin 
        dataWithdrawals={dataWithdrawals}
        onChangeStatusData={handleChangeStatusData}
        isLoading={isLoading.withdrawal}
        onChangeLoad={handleChangeLoadWithdrawal}
      />
      <RecentRebatesAdmin 
        dataRebates={dataRebates}
        isLoading={isLoading.rebate}
      />
    </WrapperDashboardComponent>
  )
}

export default OverviewAdmin;
