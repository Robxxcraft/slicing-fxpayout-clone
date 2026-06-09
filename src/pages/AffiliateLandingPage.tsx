import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AvailableBrokerSection from "@/components/pages/affiliateLandingPage/AvailableBrokerSection";
import BenefitAffiliateSection from "@/components/pages/affiliateLandingPage/BenefitAffiliateSection";
import CommissionSection from "@/components/pages/affiliateLandingPage/CommissionSection";
import CommissionSystemSection from "@/components/pages/affiliateLandingPage/CommissionSystemSection";
import FaqAffiliateSection from "@/components/pages/affiliateLandingPage/FaqAffiliateSection";
import HeroSection from "@/components/pages/affiliateLandingPage/HeroSection";
import HowAffiliateWorks from "@/components/pages/affiliateLandingPage/HowAffiliateWorks";
import RevenueSection from "@/components/pages/affiliateLandingPage/RevenueSection";
import WhoCanJoinSection from "@/components/pages/affiliateLandingPage/WhoCanJoinSection";
import SecuritySection from "@/components/pages/homePage/SecuritySection";
import RunningText from "@/components/ui/RunningText";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useTranslation } from "react-i18next";

const AffiliateLandingPage = () => {
  const { t, i18n } = useTranslation(["common", "affiliatelandingpage"]);
  return (
    <div className="font-inter">
      <title>{t("affiliatelandingpage:helmet.title")}</title>
      <Navbar active="layanan" />
      <main>
        <HeroSection />
        <CommissionSection />
        <BenefitAffiliateSection />
        <RevenueSection />
        <AvailableBrokerSection />
        <CommissionSystemSection />
        <WhoCanJoinSection />
        <HowAffiliateWorks />
        <div className="space-y-15 xl:space-y-[120px]">
          <SecuritySection info={t("affiliatelandingpage:securitysection.info")} />
          <RunningText variant="primary" />
        </div>
      </main>
      <FaqAffiliateSection />
      <CtaSection 
        title={t("affiliatelandingpage:ctasection.title")} 
        paragraph={t("affiliatelandingpage:ctasection.paragraph")} 
        button={t("button.registerNow")} 
        urlButton={getLocalizedPath("/register", i18n.language)}
      />
      <Footer />
    </div>
  )
}

export default AffiliateLandingPage;
