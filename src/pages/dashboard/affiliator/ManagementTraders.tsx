import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";

const ManagementTraders = () => {
  return (
    <WrapperDashboardComponent>
      <TitleDashboard>
        Traders
      </TitleDashboard>
      <ParagraphDashboard>
        Daftar trader aktif, periksa status akun mereka, dan lihat kontribusi rebate yang dihasilkan dari setiap akun.
      </ParagraphDashboard>
    </WrapperDashboardComponent>
  )
}

export default ManagementTraders;
