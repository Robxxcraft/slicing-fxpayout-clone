import { useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeaderSection from "@/components/HeaderSection";
import CtaSection from "@/components/CtaSection";
import CalculatorSection from "@/components/pages/calculatorPage/CalculatorSection";
import { useTranslation } from "react-i18next";

const CalculatorPage = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = "Kalkulator Rebate: Hitung Estimasi Cashback Trading | FX Payout";
  }, []);

  return (
    <div className="font-inter">
      <Navbar active="kalkulator" />
      <main>
        <HeaderSection 
          icon="/kalkulator-icon.svg" 
          badge={t("calculatorPage.header.tag")} 
          title={t("calculatorPage.header.title")} 
          paragraph={t("calculatorPage.header.paragraph")} />
        <CalculatorSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default CalculatorPage;
