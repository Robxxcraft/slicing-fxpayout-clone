import FlowTrader from "@/components/FlowTrader";
import BadgeSection from "@/components/ui/BadgeSection";
import { useTranslation } from "react-i18next";

const HowTraderWorks = () => {
  const { t } = useTranslation(["homepage"]);

  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 3xl:px-56 pt-10 md:pt-14 xl:pt-[120px]">
      <div className="flex flex-col items-center text-center">
        <BadgeSection
          icon={
            <img src="/workflow.svg" alt="workflow" 
              className="scale-90 md:scale-100"/>
        }>
          {t("homepage:howItWorks.tag")}
        </BadgeSection>
        <h2 className="my-4 text-2xl md:text-[32px] 3xl:text-[44px] font-bold leading-[132%]">
          {t("homepage:howItWorks.title")}
        </h2>
        <p className="text-base md:text-xl leading-[160%]">
          {t("homepage:howItWorks.paragraph")}
        </p>
      </div>

      <FlowTrader sizeWindow="normal" />
    </section>
  );
};

export default HowTraderWorks;
