import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";

const PerformanceTradersPage = () => {
  return (
    <WrapperDashboardComponent>
      <TitleDashboard>
        Performance Traders
      </TitleDashboard>
      <ParagraphDashboard>
        Pantau performa jaringan trader Anda dan kelola perolehan komisi dari seluruh akun broker yang terhubung.
      </ParagraphDashboard>
    </WrapperDashboardComponent>
  )
}

export default PerformanceTradersPage;
