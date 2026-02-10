import React, { useEffect, useRef, useState } from "react";
import LongArrowLine from "@/components/LongArrowLine";

type Workflow = {
  icon: string;
  altIcon: string;
  title: string;
  paragraph: string;
  nameFlow?: string
}

const workflows: Workflow[] = [
  {
    icon: "trader-icon.svg",
    altIcon: "Trader Icon",
    title: "Pedagang / Trader",
    paragraph: " Trader melakukan transaksi trading seperti biasa melalui broker pilihan tanpa perubahan spread, leverage, maupun strategi trading.",
    nameFlow: "Spread / Komisi" 
  },
  {
    icon: "building-bank-icon.svg",
    altIcon: "Bank Icon",
    title: "Broker",
    paragraph: "Broker menerima spread atau komisi dari setiap transaksi, lalu membagikan sebagian komisi tersebut kepada fxpayout sebagai Introducing Broker (IB).",
    nameFlow: "Reward / Hadiah" 
  },
  {
    icon: "fxpayout-blue.svg",
    altIcon: "FxPayout Logo",
    title: "FX Payout",
    paragraph: "fxpayout mengembalikan sebagian komisi yang diterima kepada trader dalam bentuk rebate yang dibayarkan secara berkala dan transparan.",
  },
]

const HowItWorks = ({
  sectionsRef
}: {
  sectionsRef: React.RefObject<Record<string, HTMLElement | null>>
}) => {
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
          Bagaimana Cara Kerjanya?
        </h2>
        <p className="mt-6 text-xl 2xl:text-2xl leading-[169.2%]">
          Rebate forex bekerja secara otomatis di belakang layar. Anda tetap trading seperti biasa di broker, sementara fxpayout mengelola pengembalian sebagian komisi trading Anda dalam bentuk rebate. 
        </p>
        <img 
          src="how-it-works-flow.webp" alt="flow" 
          className="block xl:hidden mt-4 md:mt-6 xl:mt-10"  
        />
        <div className="hidden xl:block">
          <div className="flex mt-10 flex-col items-center">
            <span className="block py-2 px-4 text-sm font-semibold text-white text-center bg-primary rounded-full w-fit">
              Pengiriman Cashback / Rebate <span className="inline-block md:hidden">Dari FXPayout</span>
            </span>
            <span className="hidden md:inline-block">
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
                {workflow.nameFlow !== undefined &&
                  <div 
                    style={{ width: `${(longArrowWidth / 3) - 50}px` }}
                    className="absolute md:left-full md:-translate-x-[38%] translate-y-5 md:-translate-y-2 top-full md:top-5 flex flex-col items-center min-w-60 md:min-w-fit">
                    <span className="block py-2 px-4 text-sm font-semibold text-white text-center bg-primary rounded-full w-fit">
                      {workflow.nameFlow}
                    </span>
                    <img src="line-arrow-icon.svg" alt="Arrow Icon" 
                      className="mt-3 rotate-90 md:rotate-0 -z-1 lg:z-0 h-3"/>
                  </div>
                }
                <h3 className="mt-4 text-xl 2xl:text-2xl font-semibold">
                  {workflow.title}
                </h3>
                <p className="relative mt-4 p-6 bg-my-light-blue rounded-2xl border border-[#425DE8]/20 text-base 2xl:text-xl text-center leading-[142%]">
                  {workflow.paragraph}
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
