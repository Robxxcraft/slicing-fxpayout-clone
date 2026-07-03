import BadgeSection from "@/components/ui/BadgeSection";
import BigCardAffiliate from "./common/BigCardAffiliate";
import { useTranslation } from "react-i18next";
import SmallCardAffiliate from "./common/SmallCardAffiliate";

const BenefitAffiliateSection = () => {
  const { t } = useTranslation(["common", "affiliatelandingpage"]);
  const key = "affiliatelandingpage:benefitaffiliatesection";
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-10 md:pt-14 xl:pt-[120px]">
      <div className="flex flex-col-reverse xl:flex-row items-center gap-6 md:gap-10">
        <div className="relative px-3 md:px-6 lg:px-8 pt-4 md:pt-6 lg:pt-8 pb-40 md:pb-70 lg:pb-64 2xl:pb-80 inline-flex shrink-0 gap-3 md:gap-7 w-full lg:w-fit bg-my-light-blue/40 rounded-[10px] md:rounded-[20px] overflow-hidden">
          <div className="w-1/2 lg:w-fit">
            {/* LOGO */}
            <div className="px-5 md:px-10 py-3 md:py-6 bg-white w-fit rounded-md md:rounded-xl shadow-[6px_22px_55.5px_0_rgba(0,0,0,0.18)]">
              <div dir="ltr" className="flex gap-2 items-center">
                <img
                  src="/fxpayout-blue.svg"
                  alt="logo fx payout"
                  className="shrink-0 w-2 md:w-4 lg:w-5"
                />
                <div>
                  <p className="text-[10px] md:text-base lg:text-lg font-bold text-primary">
                    FXPAYOUT
                  </p>
                  <p className="text-[5px] md:text-[10px] font-bold">
                    AFFILIATE
                  </p>
                </div>
              </div>
            </div>
            {/* CARD */}
            <div className="mt-2 md:mt-4">
              <SmallCardAffiliate 
                title={t(`${key}.small_card.title`)} 
                paragraph={"75"} 
                urlImage={"/community.svg"} 
                label={"Community"} 
                colorSVGCL={"bg-[#FFC107]"} 
                colorbgImageCL={"bg-[#FEC53D]/21"} 
                skor={"+23%"} 
                info={t("text.from_weeks_ago")}        
              />
            </div>
          </div>
          {/* BIG CARD */}
          <div className="relative z-9 w-1/2 lg:w-fit">
            <BigCardAffiliate />
          </div>
          {/* PREVIEW CHART */}
          <div className="absolute z-1 bottom-3 md:bottom-6 lg:bottom-8 right-0 start-3 md:start-6 lg:start-8 shadow-[6px_22px_55.5px_0_rgba(0,0,0,0.18)] rounded-s-[20px]">
            <p className="absolute top-2.5 md:top-5 start-3 md:start-6 text-[10px] md:text-lg lg:text-xl font-semibold">
              {t(`${key}.preview_chart.title`)}
            </p>
            <img 
              onContextMenu={() => false}
              loading="lazy"
              src="/preview-chart.webp" 
              alt="Chart" 
              className="w-full object-fill select-none pointer-events-none"
            />
          </div>
        </div>

        <div className="flex flex-col items-center xl:items-start text-center xl:text-start gap-4">
          <BadgeSection
            icon={
              <img src="/fxpayout-white.svg" alt="FXPAYOUT LOGO" 
                className="w-4 md:w-5" />
          }>
            {t(`${key}.badge`)}
          </BadgeSection>
          <h2 className="text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%]">
            {t(`${key}.title`)}
          </h2>
          <p className="text-base md:text-xl leading-[160%] max-w-5xl">
            {t(`${key}.paragraphs.0`)}  
            <br />
            <br />
            {t(`${key}.paragraphs.1`)} 
          </p>
        </div>
      </div>
    </section>
  )
}

export default BenefitAffiliateSection;
