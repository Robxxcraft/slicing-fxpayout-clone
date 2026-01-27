import { useEffect, useRef, useState } from "react";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScheduleSection from "@/components/pages/rebateForexPage/ScheduleSection";
import HowItWorks from "@/components/pages/rebateForexPage/HowItWorks";
import DefinitionSection from "@/components/pages/rebateForexPage/DefinitionSection";
import HowToRebate from "@/components/pages/rebateForexPage/HowToRebate";
import PaymentSection from "@/components/pages/rebateForexPage/PaymentSection";
import { listSectionsRebateForex } from "@/utils/listNavigation";
import AsideSection from "@/components/pages/rebateForexPage/AsideSection";

const RebateForex = () => {
  const [activeSection, setActiveSection] = useState<string>("definition");
  const [activeName, setActiveName] = useState<string>("Apa itu Rebate Forex?");
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const asideBarRef = useRef<HTMLDivElement>(null);
  const activeNameRef = useRef<HTMLDivElement>(null);
  const [activeNameWidth, setActiveNameWidth] = useState<number>(0);

  useEffect(() => {
    document.title = "Apa itu Rebate Forex? Dapatkan Pengembalian Biaya Trading | FX Payout";

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          const activeName = listSectionsRebateForex.find((item) => item.id === entry.target.id);
          if (activeName !== undefined) setActiveName(activeName.name);
        }
      });
    }, { rootMargin: "-50% 0px -50% 0px" });

    Object.values(sectionsRef.current).forEach(section => {
      if (section) observer.observe(section)
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      if (asideBarRef.current && activeNameRef.current) {
        setActiveNameWidth(asideBarRef.current.offsetWidth - activeNameRef.current.offsetWidth);
      }
    }
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <div className="font-inter">
      <Navbar active="Klaim Rebate" />
      <div className="px-6 md:px-11 xl:px-24 2xl:px-56 pt-[92px] lg:pt-[150px] 2xl:pt-[200px] flex flex-col lg:flex-row items-stretch gap-14 lg:gap-10 xl:gap-14 2xl:gap-20">
        <AsideSection 
          asideBarRef={asideBarRef} 
          activeNameRef={activeNameRef} 
          setOpenSidebar={setOpenSidebar} 
          openSidebar={openSidebar} 
          activeNameWidth={activeNameWidth} 
          activeName={activeName} 
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
