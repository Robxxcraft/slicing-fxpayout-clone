import Button from "@/components/ui/Button";
import CardEstimationRebate from "@/components/CardEstimationRebate";
import { Trans, useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/helper/pathHelper";
import { FaCircleCheck } from "react-icons/fa6";
import RunningText from "@/components/ui/RunningText";
import BadgeHero from "@/components/ui/BadgeHero";

const HeroHome = () => {
  const { t, i18n } = useTranslation(["common", "homepage"]);
  const subtitles = t("homepage:hero.subtitles", {
    returnObjects: true
  }) as string[];
  
  return (
    <header className="relative bg-primary px-5 md:px-10 lg:px-18 xl:px-24 3xl:px-56 py-[120px] lg:py-32 3xl:py-40 flex flex-col lg:flex-row gap-y-10 gap-4 xl:gap-8 items-center justify-between">
      {/* BACKGROUND ORNAMENT */}
      <div className="absolute -top-[90px] -start-[90px] bg-[#ABF3DB] size-80 rounded-full blur-[120px] opacity-80"></div>
      <img
        onContextMenu={() => false}
        src="/heroCircle.png"
        alt="hero circle"
        fetchPriority="high"
        className="z-1 absolute bottom-0 end-0 w-[450px] rtl:scale-x-[-1] opacity-70"
      />

      {/* MAIN HERO */}
      <div className="z-999 flex flex-col gap-6 3xl:gap-8 max-w-full lg:max-w-[60%] text-white">
        <BadgeHero
          icon={
            <img src="/badgeCirclePercent.svg" alt="badge percent" />
          }
        >
          {t('homepage:hero.badge')}
        </BadgeHero>
        <h1 className="font-wix-madefor-display font-bold text-[40px] md:text-[48px] leading-[120%]">
          <Trans 
            i18nKey="homepage:hero.title"
            components={{ 
              underline: (
                <span className="underline" />
              )
            }}
          />
        </h1>
        <div className="lg:mb-3 3xl:mb-6 flex flex-wrap items-center gap-x-8 gap-y-4">
          {subtitles.map((subtitle, index) => (
            <div key={index}
              className="flex items-center gap-3"
            >
              <FaCircleCheck className="text-[#00E900] text-base md:text-xl 3xl:text-2xl" />
              <p className="text-base md:text-xl 3xl:text-2xl font-semibold text-light-gray leading-[200%]">
                {subtitle}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-4 flex-wrap md:flex-nowrap">
          <Button 
            buttonType="link" 
            urlTo={`${getLocalizedPath("/register", i18n.language)}`}
            variant="light" 
            size="xl" 
            className="py-4! 3xl:py-6! flex md:block flex-1 md:flex-0 text-base! 3xl:text-xl! font-medium! text-nowrap"
          >
            {t("button.registerNow")}
          </Button>
          <Button 
            buttonType="link"
            urlTo={`${getLocalizedPath("/calculator", i18n.language)}`}
            variant="outline-light" 
            size="xl" 
            className="py-4! 3xl:py-6! flex md:block flex-1 md:flex-0 text-base! 3xl:text-xl! font-medium! text-nowrap"
          >
            {t("button.calculateRebate")}
          </Button>
        </div>
      </div>

      {/* CARD */}
      <CardEstimationRebate />

      {/* RUNNING TEXT */}
      <div className="absolute bottom-0 left-0 overflow-hidden w-full whitespace-nowrap border-t lg:border-t-0 border-white">
        <RunningText />
      </div>
    </header>
  );
};

export default HeroHome;
