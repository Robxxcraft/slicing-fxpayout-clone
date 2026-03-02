import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeaderSection from "@/components/HeaderSection";
import CtaSection from "@/components/CtaSection";
import CalculatorSection from "@/components/pages/calculatorPage/CalculatorSection";
import { useTranslation } from "react-i18next";

const CalculatorPage = () => {
  const { t } = useTranslation(["calculatorpage"]);

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
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default CalculatorPage;
