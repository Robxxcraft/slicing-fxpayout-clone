import BadgeSection from "@/components/ui/BadgeSection";
import { useTranslation } from "react-i18next";

const CommissionSystemSection = () => {
  const { t } = useTranslation(["common", "affiliatelandingpage"]);
  const key = "affiliatelandingpage:commissionsystemsection";

  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-10 md:pt-15 xl:pt-[120px]">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <BadgeSection
          icon={
            <img src="/hand-money-white.svg" alt="Money" 
              className="scale-90 md:scale-100" />
        }>
          {t(`${key}.badge`)}
        </BadgeSection>
        <h2 className="text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%] text-center">
          {t(`${key}.title`)}
        </h2>
        <p className="text-base md:text-xl leading-[160%] max-w-5xl text-center">
          {t(`${key}.paragraph`)} 
        </p>
      </div>

      <div className="mt-6 md:mt-10 relative h-full rounded-3xl overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full text-center">
          <p className="text-xl md:text-2xl font-medium text-black leading-[132%]">
            {t(`${key}.example_calculation`)}
          </p>
        </div>
        <div className="flex grow flex-col xl:flex-row items-stretch h-full w-full">

          <div className="flex grow flex-col xl:flex-row items-center pt-[120px] md:pt-[100px] xl:pt-[130px] pb-4 md:pb-15 bg-[#F9F9F9]">

            <div className="pl-0 xl:pl-15 flex flex-col xl:flex-row items-center">
              <div className="relative z-9 flex flex-col items-center justify-center text-center bg-[#F9F9F9]">
                <div className="p-2 size-[106px] rounded-full bg-[#EBECE7]">
                  <div className="p-6 size-full flex items-center justify-center rounded-full bg-linear-to-t from-dark-primary to-primary">
                    <img src="/building.svg" alt="Building" 
                      className="size-full object-fill"
                    />
                  </div>
                </div>
                <p className="mt-2 text-xl font-semibold leading-[132%]">
                  {t(`${key}.commission_broker`)}
                </p>
                <p className="text-3xl md:text-[36px] font-bold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                  $10.00
                </p>
              </div>
              <div className="px-5 relative h-24 xl:h-fit flex items-center justify-center">
                <img src="/long-line-arrow.png" alt="Line Arrow" 
                  className="absolute z-1 top-0 xl:top-1/2 left-0 translate-y-0 xl:-translate-y-1/2 rotate-90 xl:rotate-0"
                />
                <div className="relative z-99 px-4 py-2.5 bg-white rounded-lg">
                  <p className="font-semibold text-sm uppercase leading-[135%] tracking-[9%] text-center">
                    {t(`${key}.transfer_rebate`)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="px-1 md:px-10 relative z-9 w-full">
              <div className="px-3 md:px-6 py-3 md:py-5 w-full rounded-2xl md:rounded-3xl bg-white shadow-[0_4px_21.9px_0_rgba(0,0,0,0.04),-4px_0_0_0_rgba(37,99,235,1)]">
                <p className="text-[10px] md:text-sm font-semibold leading-[132%] tracking-[17%] text-black/60">
                  {t(`${key}.fxpayout_distribute_rebate`)}
                </p>
                <div className="mt-4 md:mt-6 flex gap-2.5 md:gap-4">
                  <div className="p-2.5 md:p-4 w-full rounded-md:rounded-lg bg-[#F2F2F4]">
                    <p className="text-[10px] md:text-sm font-semibold leading-[132%]">
                      {t(`${key}.rebate_trader`)}
                    </p>
                    <p className="my-1.5 md:my-2.5 text-xl md:text-[32px] font-semibold leading-[132%]">
                      $7.00
                    </p>
                    <p className="text-[10px] md:text-sm font-semibold leading-[132%] text-black/50 italic">
                      70% Rebate
                    </p>
                  </div>
                  <div className="p-2.5 md:p-4 w-full rounded-md:rounded-lg bg-[#F2F2F4]">
                    <p className="text-[10px] md:text-sm font-semibold leading-[132%]">
                      {t(`${key}.internal_earn`)}
                    </p>
                    <p className="my-2.5 text-xl md:text-[32px] font-semibold leading-[132%] text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                      $3.00
                    </p>
                    <p className="text-[10px] md:text-sm font-semibold leading-[132%] text-black/50 italic">
                      {t(`${key}.fxpayout_distribute`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 md:pt-6 xl:pt-[130px] pb-10 md:pb-12 xl:pb-15 pr-0 xl:pr-15 flex flex-col xl:flex-row items-center bg-[#E9E9E9] overflow-hidden">
            <div>
              <div className="px-5 relative">
                <img src="/long-line-arrow.png" alt="Line Arrow" 
                  className="absolute z-1 top-0 xl:top-1/2 left-0 -translate-y-8 xl:-translate-y-1/2 rotate-90 xl:rotate-0"
                />
                <div className="relative z-99 px-4 py-2.5 bg-white rounded-lg">
                  <p className="font-semibold text-sm uppercase leading-[135%] tracking-[9%] text-center">
                    {t(`${key}.distribution_commission`)}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs text-black/60 text-center leading-[132%]">
                {t(`${key}.commission_50_percent`)}
              </p>
            </div>
            <div className="mt-11 md:mt-13 xl:mt-0 flex flex-col items-center justify-center text-center">
              <div className="p-2 size-[106px] rounded-full bg-[#EBECE7]">
                <div className="p-6 size-full flex items-center justify-center rounded-full bg-linear-to-t from-dark-primary to-primary">
                  <img src="/group-user.svg" alt="Affiliate" 
                    className="size-full object-fill"
                  />
                </div>
              </div>
              <p className="mt-2 text-xl font-semibold leading-[132%]">
                {t(`${key}.affiliate_commission`)}
              </p>
              <p className="text-3xl md:text-[36px] font-bold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                $1.50
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-10 py-8 md:py-10 lg:py-15 px-6 md:px-10 flex flex-col lg:flex-row items-center gap-6 bg-primary rounded-3xl">
        <div>
          <h3 className="text-2xl md:text-3xl lg:text-[32px] 2xl:text-[40px] font-bold text-white leading-[132%]">
            {t(`${key}.card_simulation.title`)}
          </h3>
          <p className="mt-2 text-base md:text-xl text-white leading-[188%]">
            {t(`${key}.card_simulation.paragraph`)}
          </p>
          <div className="mt-6 space-y-4">
            {[
              t(`${key}.card_simulation.benefits.0`),
              t(`${key}.card_simulation.benefits.1`),
              t(`${key}.card_simulation.benefits.2`),
            ].map((text, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="shrink-0 size-[26px] flex items-center justify-center rounded-full bg-white/20 shadow-[0_2px_6px_rgba(37,99,235,0.1),inset_0_-1px_1px_rgba(0,0,0,0.12),inset_0_1px_1.5px_rgba(255,255,255,0.25)]">
                  <span className="text-base font-semibold text-white">
                    {index + 1}
                  </span>
                </div>
                <p className="text-base md:text-xl font-semibold text-white leading-[135%]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="shrink-0 px-4 md:px-6 py-6 md:py-10 w-full lg:w-[40%] rounded-3xl space-y-6 md:space-y-8 bg-white/20 shadow-[0_2px_6px_0_rgba(37,99,235,0.1),inset_0_-1px_1px_rgba(0,0,0,0.12),inset_0_1px_1.5px_rgba(255,255,255,0.25)]">
          <p className="text-xl font-semibold text-white leading-[135%]">
            {t(`${key}.affiliate_commission`)}
          </p>
          <div>
            <p className="text-[40px] md:text-[64px] lg:text-[56px] 2xl:text-[64px] font-semibold text-white">
              $500
              <span className="text-xl leading-[135%]">
                 / {t("text.title_month")}
              </span>
            </p>
            <div className="relative w-full h-2 bg-black/10 rounded-full">
              <div className="absolute top-0 left-0 h-2 w-[80%] bg-white rounded-full"></div>
            </div>
          </div>
          <p className="text-sm text-white leading-[135%]">
            {t(`${key}.card_simulation.info`)}
          </p>
        </div>
      </div>
    </section>
  )
}

export default CommissionSystemSection;
