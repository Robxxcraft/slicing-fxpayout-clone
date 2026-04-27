import { Link } from "react-router-dom";
import ParagraphDashboard from "../../common/ParagraphDashboard";
import TitleDashboard from "../../common/TitleDashboard";
import TinyButton from "../../common/TinyButton";
import { IoIosAdd } from "react-icons/io";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useTranslation } from "react-i18next";

const HeaderConnectedBroker = () => {
  const { i18n } = useTranslation();
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-2 2xl:gap-6">
      <div>
        <TitleDashboard>
          Connected Brokers
        </TitleDashboard>
        <ParagraphDashboard maxW="w-fit lg:w-[760px] 2xl:w-full">
          Daftar seluruh broker yang terkoneksi dengan akun Anda dan pantau status koneksi dan perolehan komisi rebate Anda. {" "}
          <Link to={getLocalizedPath("broker", i18n.language)}
            className="text-primary underline"
          >
            Lihat detail setiap broker
          </Link>.
        </ParagraphDashboard>
      </div>
      <div className="shrink-0 w-full md:w-fit">
        <TinyButton 
          buttonType="link" 
          icon={<IoIosAdd className="text-2xl 2xl:text-3xl" />} 
          iconPosition="left"
          urlTo={getLocalizedPath("trader/broker/connect", i18n.language)}
        >
          Tambah Broker
        </TinyButton>
      </div>
    </div>
  )
}

export default HeaderConnectedBroker;
