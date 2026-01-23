import { useEffect, useRef, useState } from "react";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScheduleSection from "@/components/pages/rebateForexPage/ScheduleSection";
import HowItWorks from "@/components/pages/rebateForexPage/HowItWorks";
import DefinitionSection from "@/components/pages/rebateForexPage/DefinitionSection";
import HowToRebate from "@/components/pages/rebateForexPage/HowToRebate";
import PaymentSection from "@/components/pages/rebateForexPage/PaymentSection";
import { GoSidebarCollapse } from "react-icons/go";

const listSections = [
  { id: "definition", name: "Apa itu Rebate Forex?" },
  { id: "how-to-rebate", name: "Cara Mendapatkan Rebate Forex" },
  { id: "how-it-works", name: "Bagaimana Cara Kerjanya?" },
  { id: "payment", name: "Sistem Pembayaran Rebate" },
  { id: "schedule", name: "Jadwal Rebate" },
];

const RebateForex = () => {
  const [activeSection, setActiveSection] = useState<string>("definition");
  const [activeName, setActiveName] = useState<string>("Apa itu Rebate Forex?");
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const asideBarRef = useRef<HTMLDivElement>(null);
  const activeNameRef = useRef<HTMLDivElement>(null);
  const [activeNameWidth, setActiveNameWidth] = useState<number>(0);

  useEffect(() => {
    document.title = "Trading Lebih Untung Rebate Hingga 90% | FX Payout";

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          const activeName = listSections.find((item) => item.id === entry.target.id);
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
        <aside ref={asideBarRef} className="relative w-full lg:w-[20%] z-9999999">
          <div className="fixed lg:sticky top-20 lg:top-[120px] 2xl:top-[148px] left-0 h-fit w-full">
            <div className="py-3 lg:py-0 px-6 lg:px-0 flex items-center gap-2 w-full border-b lg:border-0 border-[#CECECE] bg-white">
              <div ref={activeNameRef} className="flex items-center gap-2">
                <GoSidebarCollapse 
                  onClick={() => setOpenSidebar(!openSidebar)}
                  className="inline-block lg:hidden text-xl cursor-pointer" />
                <h2 className="font-medium text-base lg:text-2xl 2xl:text-4xl whitespace-nowrap">
                  Daftar Isi
                </h2>
                <span className="inline-block lg:hidden">&gt;</span>
              </div>
              <span
                style={{ width: `${activeNameWidth}px` }}
                className="inline-block lg:hidden text-primary overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {activeName}
              </span>
            </div>
            <div className={`${openSidebar ? "left-0" : "-left-[120%]"} 
              absolute lg:static mt-10 px-6 lg:px-0 pt-4 lg:pt-0 top-[9px] bg-white h-screen lg:h-full w-full flex flex-col gap-4 lg:gap-6 transition-all duration-300 ease-out`}>
              {listSections.map((item, idx) => (
                <a 
                  href={`#${item.id}`} 
                  key={idx} 
                  onClick={() => setOpenSidebar(!openSidebar)}
                  className={`${activeSection == item.id && "text-primary font-medium lg:after:content-[''] lg:after:absolute lg:after:left-0 lg:after:-bottom-0.5 lg:after:h-1 lg:after:w-20 lg:after:bg-primary lg:after:rounded-full"} 
                  relative block pb-0 lg:pb-3 2xl:pb-5 lg:border-b border-[#CECECE] text-lg lg:text-base 2xl:text-xl hover:text-primary transition-all duration-300 ease-out`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </aside>
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
