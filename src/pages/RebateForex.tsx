import { useEffect, useRef, useState } from "react";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScheduleSection from "@/components/pages/rebateForexPage/ScheduleSection";
import HowItWorks from "@/components/pages/rebateForexPage/HowItWorks";
import DefinitionSection from "@/components/pages/rebateForexPage/DefinitionSection";
import HowToRebate from "@/components/pages/rebateForexPage/HowToRebate";
import PaymentSection from "@/components/pages/rebateForexPage/PaymentSection";
import AsideSection from "@/components/pages/rebateForexPage/AsideSection";
import { useTranslation } from "react-i18next";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";
import { getLocalizedPath } from "@/helper/pathHelper";

const RebateForex = () => {
  const { t, i18n } = useTranslation(["common", "claimrebatepage"]);
  const [activeSection, setActiveSection] = useState<string>("definition");
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const asideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-50% 0px -50% 0px" });

    Object.values(sectionsRef.current).forEach(section => {
      if (section) observer.observe(section)
    });

    return () => observer.disconnect();
  }, []);

  useLockBodyScroll(openSidebar);

  return (
    <div className="font-inter">
      <title>{t("claimrebatepage:helmet.title")}</title>
      <Navbar active="Klaim Rebate" />
      <div className="pt-20 lg:pt-[150px] 3xl:pt-[200px] flex flex-col lg:flex-row items-stretch gap-6 md:gap-10 xl:gap-14 3xl:gap-20">
        <AsideSection 
          asideBarRef={asideBarRef} 
          setOpenSidebar={setOpenSidebar} 
          openSidebar={openSidebar} 
          activeSection={activeSection} />
          
        <div className="w-full lg:w-[80%]">
          <DefinitionSection sectionsRef={sectionsRef} />
          <HowToRebate sectionsRef={sectionsRef} />
          <HowItWorks sectionsRef={sectionsRef} />
          <PaymentSection sectionsRef={sectionsRef} />
          <ScheduleSection sectionsRef={sectionsRef} />
        </div>
      </div>
      <CtaSection 
        title={t("cta.title")}
        paragraph={t("cta.paragraph")}
        button={t("button.registerNow")}
        urlButton={getLocalizedPath("register", i18n.language)}
      />
      <Footer />
    </div>
  );
};

export default RebateForex;
