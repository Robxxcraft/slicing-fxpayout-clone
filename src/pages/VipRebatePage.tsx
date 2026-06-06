import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FaqSection from "@/components/pages/ForexRebatePage/FaqSection";
import SecuritySection from "@/components/pages/homePage/SecuritySection";
import HeroSection from "@/components/pages/VipRebatePage/HeroSection";
import HowTraderWorks from "@/components/pages/VipRebatePage/HowTraderWorks";
import LevelTraderSection from "@/components/pages/VipRebatePage/LevelTraderSection";
import WarningForexSection from "@/components/pages/VipRebatePage/WarningForexSection";
import WhatRebateForex from "@/components/pages/VipRebatePage/WhatRebateForex";
import RunningText from "@/components/ui/RunningText";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useTranslation } from "react-i18next";

const VipRebatePage = () => {
  const { t, i18n } = useTranslation(["common", "viprebatepage"]);
  return (
    <div className="font-inter">
      <title>{t("viprebatepage:helmet.title")}</title>
      <Navbar active="layanan" />
      <main>
        <HeroSection />
        <WhatRebateForex />
        <LevelTraderSection />
        <HowTraderWorks />
        <div className="space-y-15 xl:space-y-[120px]">
          <SecuritySection />
          <RunningText variant="primary" />
        </div>
        <FaqSection />
        <WarningForexSection />
        <CtaSection 
          title={t("cta_trader.title")}
          paragraph={t("cta_trader.paragraph")}
          button={t("button.registerNow")}
          urlButton={getLocalizedPath("/register", i18n.language)}
        />
      </main>
      <Footer />
    </div>
  )
}

export default VipRebatePage;
