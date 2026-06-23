import BadgeSection from "@/components/ui/BadgeSection";
import { useTranslation } from "react-i18next";

const flows = [
  {
    urlImage: "/trading.svg",
    alt: "Trading",
    title: "1. Trader Melakukan Trading",
    paragraph: "Setiap transaksi yang Anda lakukan akan dikenakan biaya seperti spread atau komisi oleh broker.",
    keyTranslate:  "flows.0"
  },
  {
    urlImage: "/fees.svg",
    alt: "FEE",
    title: "2. Broker Menghasilkan Komisi",
    paragraph: "Dari aktivitas trading tersebut, broker membagikan sebagian komisi melalui sistem Introducing Broker (IB).",
    keyTranslate: "flows.1"
  },
  {
    urlImage: "/hand-money-white.svg",
    alt: "Money",
    title: "3. Rebate Dibagikan",
    paragraph: "Sebagian komisi tersebut dikembalikan kepada Anda sebagai cashback (rebate) secara otomatis.",
    keyTranslate: "flows.2"
  },
];

const WhatRebateForex = () => {
  const { t } = useTranslation(["viprebatepage"]);
  const key = "viprebatepage:whatrebateforex";

  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-10 md:pt-15 xl:pt-[120px]">
      <div className="flex flex-col-reverse xl:flex-row items-center justify-between gap-6 md:gap-10">

        <div className="space-y-4 flex flex-col items-start">
          <BadgeSection
            icon={
              <img src="/hand-money-white.svg" alt="Money"/>
          }>
            {t(`${key}.badge`)}
          </BadgeSection>
          <h1 className="text-left text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%]">
            {t(`${key}.title`)}
          </h1>
          <p className="text-left text-base md:text-xl 2xl:text-2xl font-medium text-black/80 leading-[160%]">
            {t(`${key}.paragraphs.0`)} 
            <br />
            <br />
            {t(`${key}.paragraphs.1`)}
          </p>
        </div>
        
        <div className="w-full lg:max-w-[640px] rounded-[40px] overflow-hidden">
          <img src="/cashback-hero.webp" alt="Cashback" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mt-6 md:mt-10">
        <h2 className="text-xl md:text-2xl font-bold leading-[132%]">
          {t(`${key}.subtitle`)}
        </h2>

        <div className="mt-6 md:mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {flows.map((item, index) => (
            <div key={index} className={`mt-[30px] md:mt-10 relative`}>
              <div className="p-4 absolute -top-[30px] md:-top-10 left-1/2 -translate-x-1/2 flex justify-center items-center size-15 md:size-20 rounded-lg md:rounded-2xl bg-linear-to-t from-dark-primary to-primary">
                <img src={item.urlImage} alt={item.alt} 
                  className="w-full object-contain"
                />
              </div>

              <div className="px-5 pt-10 md:pt-15 pb-6 md:pb-10 rounded-[20px] bg-[#F6F9FF] space-y-2.5 text-center">
                <p className="text-xl font-semibold text-[#122118]">
                  {index + 1}. {t(`${key}.${item.keyTranslate}.title`)}
                </p>
                <p className="text-base text-[#020202]/50">
                  {t(`${key}.${item.keyTranslate}.paragraph`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatRebateForex;
