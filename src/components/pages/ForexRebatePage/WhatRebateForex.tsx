import BadgeSection from "@/components/ui/BadgeSection";
import { Trans, useTranslation } from "react-i18next";

const WhatRebateForex = () => {
  const { t } = useTranslation(["forexrebatepage"]);
  const key = "forexrebatepage:whatrebateforex";
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-10 md:pt-15 xl:pt-[120px]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">

        <div className="space-y-4 flex flex-col items-center md:items-start">
          <BadgeSection
            icon={
              <img src="/problem-user.svg" alt="User"/>
          }>
            {t(`${key}.badge`)}
          </BadgeSection>
          <h1 className="text-center lg:text-left text-[30px] md:text-[32px] 2xl:text-[48px] font-bold leading-[140%]">
            {t(`${key}.title`)}
          </h1>
          <p className="text-center lg:text-left text-base md:text-xl 2xl:text-2xl font-medium text-black/80 leading-[200%]">
            {t(`${key}.paragraph`)}
          </p>
        </div>

        <div className="p-4 md:p-10 xl:p-6 2xl:p-10 border border-primary bg-[#F6F9FF] rounded-3xl md:rounded-[40px]">
          <div className="py-3 md:py-6 w-full flex gap-2 justify-center items-center bg-linear-to-t from-dark-primary to-primary rounded-[20px] md:rounded-3xl">
            <img
              src="/fxpayout-white.svg"
              alt="logo fx payout"
              className="mb-2 lg:mb-3 w-5 lg:w-6 2xl:w-8"
            />
            <span className="text-2xl 2xl:text-3xl font-semibold text-white">
              FXPAYOUT
            </span>
          </div>
          <p className="mt-6 text-base md:text-xl 2xl:text-2xl text-center font-medium text-primary leading-[200%]">
            <Trans
              components={{ bi: <span className="font-bold italic" /> }}
            >
              {t(`${key}.content`)}
            </Trans>
          </p>                                            
        </div>
      </div>
    </section>
  )
}

export default WhatRebateForex;
