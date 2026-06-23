import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeaderSection from "@/components/HeaderSection";
import CtaSection from "@/components/CtaSection";
import CalculatorSection from "@/components/pages/calculatorPage/CalculatorSection";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/helper/pathHelper";

const CalculatorPage = () => {
  const { t, i18n } = useTranslation(["common", "calculatorpage"]);

  return (
    <div className="font-inter">
      <title>{t("calculatorpage:helmet.title")}</title>
      <Navbar active="kalkulator" />
      <main>
        <HeaderSection 
          icon="/kalkulator-icon.svg" 
          badge={t("calculatorpage:header.tag")} 
          title={t("calculatorpage:header.title")} 
          paragraph={t("calculatorpage:header.paragraph")} />
        <CalculatorSection />
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

export default CalculatorPage;
