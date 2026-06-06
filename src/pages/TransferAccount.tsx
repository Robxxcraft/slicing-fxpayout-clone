import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeaderSection from "@/components/HeaderSection";
import TransferForm from "@/components/pages/transferAccount/TransferForm";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/helper/pathHelper";

const TransferAccount = () => {
  const { t, i18n } = useTranslation(["common", "transferpage"]);

  return (
    <div className="font-inter">
      <title>{t("transferpage:helmet.title")}</title>

      <Navbar active="layanan" />
      <main>
        <div className="bg-[#F9F9F9] pb-10">
          <HeaderSection 
            icon="/transfer-ib.svg" 
            badge={t("transferpage:header.tag")} 
            title={t("transferpage:header.title")} 
            paragraph={t("transferpage:header.paragraph")} />
          <TransferForm />
        </div>
        <CtaSection 
          title={t("cta.title")}
          paragraph={t("cta.paragraph")}
          button={t("button.registerNow")}
          urlButton={getLocalizedPath("register", i18n.language)}
        />
      </main>
      <Footer />
    </div>
  );
};

export default TransferAccount;
