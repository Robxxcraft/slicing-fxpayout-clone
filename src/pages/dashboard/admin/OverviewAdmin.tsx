import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AdminAPI } from "@/api";
import type { SetStatusType } from "@/types/status.type";
import { useAdminOverviewContext } from "@/hooks/useAdminOverviewContext";
import type { DataRebateManagement, ResponseDataRebate } from "./RebatesManagement";

import RecentRebatesAdmin from "@/components/dashboard/admin/overview/RecentRebatesAdmin";
import OverviewAdminHeader from "@/components/dashboard/admin/overview/OverviewAdminHeader";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import RecentTransactionsAdmin from "@/components/dashboard/admin/overview/RecentTransactionsAdmin";
import type { DataWithdrawalManagement, ResponseDataWithdrawal } from "./WithdrawalRequestManagement";


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
  const [dataWithdrawals, setDataWithdrawals] = useState<DataWithdrawalManagement[]>([]); 
  const [dataRebates, setDataRebates] = useState<DataRebateManagement[]>([]);

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
      const temp = data.data.map((item: ResponseDataWithdrawal) => {
        const useUsd = item.currency === "USD";
        return ({
          id: item.id,
          user_id: item.user_id,
          bank_id: item.bank_id,
          method: item.bank !== null ? "bank" : "crypto",
          bank_name: item.bank !== null ? item.bank.name : "Crypto",
          account_name: item.bank !== null ? item.bank.account_name : item.user.full_name,
          wallet_address: item.bank !== null ? item.bank.account_number : item.wallet_address,
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
      const temp = data.data.map((item: ResponseDataRebate) => ({
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
