import BadgeHero from "@/components/ui/BadgeHero";
import Button from "@/components/ui/Button";
import MarqueeSection from "@/components/ui/MarqueeSection";
import RunningText from "@/components/ui/RunningText";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useTranslation } from "react-i18next";
import { FaCircleCheck } from "react-icons/fa6";

const HeroSection = () => {
  const { t, i18n } = useTranslation(["common", "homepage", "viprebatepage"]);
  const key = "viprebatepage:herosection";
  const subtitles = t("homepage:hero.subtitles", {
    returnObjects: true
  }) as string[];
  
  return (
    <header className="relative bg-primary px-5 md:px-10 lg:px-18 xl:px-24 3xl:px-56 py-[120px] lg:py-32 3xl:py-40 flex flex-col lg:flex-row gap-y-10 gap-4 xl:gap-8 items-center justify-between overflow-hidden min-h-screen lg:min-h-fit">
      {/* BACKGROUND ORNAMENT */}
      <div className="absolute -top-[90px] -left-[90px] bg-[#ABF3DB] size-80 rounded-full blur-[120px] opacity-80"></div>
      <div className="hidden md:block absolute -top-[50px] -right-[90px] bg-[#ABF3DB] size-80 rounded-full blur-[120px] opacity-80"></div>
      <div className="hidden md:block absolute -top-10 right-[20%] bg-[#ABF3DB] size-50 rounded-full blur-[120px] opacity-80"></div>
      <div className="hidden md:block absolute -bottom-[50px] -right-[90px] bg-[#ABF3DB] size-60 rounded-full blur-[120px] opacity-80"></div>
      <img 
        onContextMenu={() => false}
        src="/rectangle-hero.png" 
        alt="hero rectange" 
        className="z-1 object-cover w-full h-full absolute -top-[7%] left-1/2 -translate-x-1/2 select-none pointer-events-none"
      />

      <div className="z-999 flex flex-col justify-center items-center gap-6 text-white text-center w-full">
        <div className="flex flex-col justify-center items-center gap-4 md:gap-6 xl:gap-2 w-full max-w-full lg:max-w-5xl">
          <BadgeHero 
            icon={
              <img src="/badgeCirclePercent.svg" alt="badge percent" />
            }
          >
            {t(`${key}.badge`)}
          </BadgeHero>
          <h1 className="font-wix-madefor-display font-bold text-[36px] md:text-[40px] xl:text-[52px] leading-[120%]">
            {t(`${key}.title`)}
          </h1>
          <p className="text-base md:text-xl 3xl:text-2xl font-medium text-light-gray leading-[200%]">
            {t(`${key}.paragraph`)}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 w-full max-w-full lg:max-w-5xl">
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
            urlTo={`${getLocalizedPath("/broker", i18n.language)}`}
            variant="outline-light" 
            size="xl" 
            className="py-4! 3xl:py-6! flex md:block flex-1 md:flex-0 text-base! 3xl:text-xl! font-medium! text-nowrap"
          >
            {t("button.see_list_broker")}
          </Button>
        </div>
      </div>

      {/* RUNNING TEXT */}
      <div className="absolute bottom-0 left-0 overflow-hidden w-full whitespace-nowrap border-t lg:border-t-0 border-white">
        <MarqueeSection speed={60}>
          <RunningText />
        </MarqueeSection>
      </div>
    </header>
  )
}

export default HeroSection;
