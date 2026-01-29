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

const RebateForex = () => {
  const [activeSection, setActiveSection] = useState<string>("definition");
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const asideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Apa itu Rebate Forex? Dapatkan Pengembalian Biaya Trading | FX Payout";

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

  useEffect(() => {
    if (openSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openSidebar]);

  return (
    <div className="font-inter">
      <Navbar active="Klaim Rebate" />
      <div className="pt-20 lg:pt-[150px] 2xl:pt-[200px] flex flex-col lg:flex-row items-stretch gap-6 md:gap-10 xl:gap-14 2xl:gap-20">
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
      <CtaSection />
      <Footer />
    </div>
  );
};

export default RebateForex;
