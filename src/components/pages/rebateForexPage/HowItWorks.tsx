import React, { useEffect, useRef, useState } from "react";
import LongArrowLine from "@/components/LongArrowLine";
import { useTranslation } from "react-i18next";

type Workflow = {
  icon: string;
  altIcon: string;
  keyTranslate: string;
}

const workflows: Workflow[] = [
  {
    icon: "/trader-icon.svg",
    altIcon: "Trader Icon",
    keyTranslate: "claimrebatepage:howWorks.flows.0"
  },
  {
    icon: "/building-bank-icon.svg",
    altIcon: "Bank Icon",
    keyTranslate: "claimrebatepage:howWorks.flows.1"
  },
  {
    icon: "/fxpayout-blue.svg",
    altIcon: "FxPayout Logo",
    keyTranslate: "claimrebatepage:howWorks.flows.2"
  },
]

const HowItWorks = ({
  sectionsRef
}: {
  sectionsRef: React.RefObject<Record<string, HTMLElement | null>>
}) => {
  const { t } = useTranslation(["claimrebatepage"]);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [longArrowWidth, setLongArrowWidth] = useState<number>(0);

  useEffect(() => {
    if (!gridRef.current) return;

    const observer = new ResizeObserver(entries => {
        const entry = entries[0];
        setLongArrowWidth(entry.contentRect.width - (entry.contentRect.width / 3) + 20);
    });

    observer.observe(gridRef.current);

    return () => observer.disconnect();
    }, []);
    
  return (
    <section
      id="how-it-works"
      ref={el => {sectionsRef.current["how-it-works"] = el}}
      className="pt-8 md:pt-10 xl:pt-20 scroll-mt-[66px] lg:scroll-mt-9 border-t xl:border-0 border-[#E5E5E5]"
    >
      <div className="px-6 md:px-11 xl:px-0 xl:pr-24 2xl:pr-56">
        <h2 className="font-medium text-2xl md:text-[2rem] 2xl:text-[2.5rem]">
          {t("claimrebatepage:howWorks.title")}
        </h2>
        <p className="mt-6 text-xl 2xl:text-2xl leading-[169.2%]">
          {t("claimrebatepage:howWorks.paragraph")}
        </p>
        <img 
          src={`/${t("claimrebatepage:howWorks.imageFlows")}`} alt="flow" 
          className="block xl:hidden mt-4 md:mt-6 xl:mt-10"  
        />
        <div className="hidden xl:block">
          <div className="flex mt-10 flex-col items-center">
            <span className="block py-2 px-4 text-sm font-semibold text-white text-center bg-primary rounded-full w-fit">
              {t("claimrebatepage:howWorks.flows.2.flow")}
            </span>
            <span>
              <LongArrowLine widthLine={longArrowWidth} />
            </span>
          </div>
          <div ref={gridRef} className="mt-6 md:mt-2 relative grid grid-cols-1 md:grid-cols-3 gap-[90px] md:gap-4 lg:gap-10">
            {workflows.map((workflow, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                <div className="py-4 xl:py-6 px-4 xl:px-5 bg-my-light-blue w-fit rounded-lg ">
                  <img src={workflow.icon} alt={workflow.altIcon} 
                    className="size-12 md:size-14 xl:size-16sche 2xl:size-20 object-contain"/>
                </div>
                {idx !== 2 &&
                  <div 
                    style={{ width: `${(longArrowWidth / 3) - 50}px` }}
                    className="absolute md:left-full md:-translate-x-[38%] translate-y-5 md:-translate-y-2 top-full md:top-5 flex flex-col items-center min-w-60 md:min-w-fit">
                    <span className="block py-2 px-4 text-sm font-semibold text-white text-center bg-primary rounded-full w-fit">
                      {t(`${workflow.keyTranslate}.flow`)}
                    </span>
                    <img src="/line-arrow-icon.svg" alt="Arrow Icon" 
                      className="mt-3 rotate-90 md:rotate-0 -z-1 lg:z-0 h-3"/>
                  </div>
                }
                <h3 className="mt-4 text-xl 2xl:text-2xl font-semibold">
                  {t(`${workflow.keyTranslate}.title`)}
                </h3>
                <p className="relative mt-4 p-6 bg-my-light-blue rounded-2xl border border-[#425DE8]/20 text-base 2xl:text-xl text-center leading-[142%]">
                  {t(`${workflow.keyTranslate}.paragraph`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks;
