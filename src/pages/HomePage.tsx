import { useTranslation } from "react-i18next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Benefits from "@/components/pages/homePage/Benefits";
import CtaSection from "@/components/CtaSection";
import BrokerListSection from "@/components/pages/homePage/BrokerListSection";
import HeroHome from "@/components/pages/homePage/HeroHome";
import HowItWorks from "@/components/pages/homePage/HowItWorks";
import Profile from "@/components/pages/homePage/Profile";
import Reviews from "@/components/pages/homePage/Reviews";
import Rewards from "@/components/pages/homePage/Rewards";
import ProblemSection from "@/components/pages/homePage/ProblemSection";
import SecuritySection from "@/components/pages/homePage/SecuritySection";
import RunningText from "@/components/ui/RunningText";
import RiskSection from "@/components/pages/homePage/RiskSection";
import { getLocalizedPath } from "@/helper/pathHelper";
import CtaRegisterBroker from "@/components/broker/CtaRegisterBroker";

const HomePage = () => {
  const { t, i18n } = useTranslation(["common", "homepage"]);
  return (
    <>
      <title>{t("homepage:helmet.title")}</title>
      <meta name="description" content={t("homepage:helmet.description")} />
      <div className="font-inter">
        <Navbar active="home" transparentBgTop />
        <main>
          <HeroHome />
          <ProblemSection />
          <Profile />
          <HowItWorks />
          <Rewards />
          <BrokerListSection />
          <CtaRegisterBroker 
            horizontal
          />
          <SecuritySection />
          <Benefits />
          <Reviews />
          <RunningText variant="primary" />
          <RiskSection />
          <CtaSection 
            title={t("cta_trader.title")}
            paragraph={t("cta_trader.paragraph")}
            button={t("button.registerNow")}
            urlButton={getLocalizedPath("register", i18n.language)}
          />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
