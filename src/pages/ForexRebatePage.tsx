import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BenefitSection from "@/components/pages/ForexRebatePage/BenefitSection";
import ComparisonSection from "@/components/pages/ForexRebatePage/ComparisonSection";
import FaqSection from "@/components/pages/ForexRebatePage/FaqSection";
import HeroSection from "@/components/pages/ForexRebatePage/HeroSection";
import WhatRebateForex from "@/components/pages/ForexRebatePage/WhatRebateForex";
import WhyChooseSection from "@/components/pages/ForexRebatePage/WhyChooseSection";
import SecuritySection from "@/components/pages/homePage/SecuritySection";
import RunningText from "@/components/ui/RunningText";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useTranslation } from "react-i18next";

const ForexRebatePage = () => {
  const { t, i18n } = useTranslation(["common", "forexrebatepage"]);
  return (
    <>
      <title>{t("forexrebatepage:helmet.title")}</title>
      <meta name="description" content={t("forexrebatepage:helmet.description")} />
      <div className="font-inter">
        <Navbar active="layanan" transparentBgTop />
        <main>
          <HeroSection />
          <WhatRebateForex />
          <BenefitSection />
          <WhyChooseSection />
          <ComparisonSection />
          <div className="space-y-15 xl:space-y-[120px]">
            <SecuritySection />
            <RunningText variant="primary" />
          </div>
          <FaqSection />
          <CtaSection 
            title={t("cta_trader.title")}
            paragraph={t("cta_trader.paragraph")}
            button={t("button.registerNow")}
            urlButton={getLocalizedPath("/register", i18n.language)}
          />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default ForexRebatePage;
