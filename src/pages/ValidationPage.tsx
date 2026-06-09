import { useState } from "react";
// import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeaderSection from "@/components/HeaderSection";
import ValidationForm from "@/components/pages/validationPage/ValidationForm";
import TermValidation from "@/components/pages/validationPage/TermValidation";
import { useTranslation } from "react-i18next";

const ValidationPage = () => {
  const { t } = useTranslation(["validationpage"]);
  const [showNotify, setShowNotify] = useState<boolean>(true);

  return (
    <div className="font-inter">
      <title>{t("validationpage:helmet.title")}</title>
      
      <Navbar active="layanan" />
      <main>
        <div className="bg-[#F9F9F9] pb-10">
          <HeaderSection 
            icon="/check-white.svg" 
            badge={t("validationpage:header.tag")} 
            title={t("validationpage:header.title")} 
            paragraph={t("validationpage:header.paragraph")} />
          <ValidationForm />
        </div>
        {showNotify && <TermValidation setShowNotify={setShowNotify}/> }
        {/* <CtaSection /> */}
      </main>
      <Footer />
    </div>
  );
};

export default ValidationPage;
