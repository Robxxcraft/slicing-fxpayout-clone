import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import RecentRebatesAdmin from "@/components/dashboard/admin/overview/RecentRebatesAdmin";
import { useEffect } from "react";
import { AdminAPI } from "@/api";
import RecentTransactionsAdmin from "@/components/dashboard/admin/overview/RecentTransactionsAdmin";
import ChangeStatusSelection from "@/components/dashboard/common/ChangeStatusSelection";
import OverviewAdminHeader from "@/components/dashboard/admin/overview/OverviewAdminHeader";

const OverviewAdmin = () => {
  useEffect(() => {
    const fetchData = async () => {
      await AdminAPI.getAllRebates();
    }
    fetchData();
  }, []);
  return (
    <WrapperDashboardComponent>
      <OverviewAdminHeader />
      <RecentTransactionsAdmin />
      <RecentRebatesAdmin />

      <ChangeStatusSelection />
    </WrapperDashboardComponent>
  )
}

export default OverviewAdmin;
