import BadgeHero from "@/components/ui/BadgeHero";
import Button from "@/components/ui/Button";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useTranslation } from "react-i18next";
import { FaCircleCheck } from "react-icons/fa6";
import SmallCardAffiliate from "./common/SmallCardAffiliate";
import BigCardAffiliate from "./common/BigCardAffiliate";

const HeroSection = () => {
  const { t, i18n } = useTranslation(["common", "affiliatelandingpage"]);
  const key = "affiliatelandingpage:herosection";
  const features = [
    {
      keyTranslate: `${key}.features.0`,
      skor: "20+", 
    }, 
    {
      keyTranslate: `${key}.features.1`, 
      skor: "10K+", 
    },
    {
      keyTranslate: `${key}.features.2`,
      skor: "$100K+", 
    }
  ];
  
  return (
    <header className="relative bg-primary px-5 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-[120px] lg:pt-32 2xl:pt-40 pb-12 lg:pb-32 2xl:pb-40 flex flex-col lg:flex-row gap-y-10 gap-4 xl:gap-8 items-center justify-between overflow-hidden min-h-screen md:min-h-fit">
      {/* BACKGROUND ORNAMENT */}
      <div className="absolute -top-[60px] -left-[60px] bg-[#ABF3DB] size-80 rounded-full blur-[120px] opacity-80"></div>
      <img 
        onContextMenu={() => false}
        src="/rectangle-hero.png" 
        alt="hero rectange" 
        className="z-1 object-cover w-full h-full absolute top-0 left-1/2 -translate-x-1/2 select-none pointer-events-none"
      />
      <img
        onContextMenu={() => false}
        src="/heroCircle.png"
        alt="hero circle"
        fetchPriority="high"
        className="z-1 absolute scale-x-[-1] bottom-0 left-0 w-[320px] lg:w-[440px] 2xl:w-[480px] opacity-70 select-none pointer-events-none"
      />
      <div className="hidden xl:block absolute left-10 2xl:left-20 top-40">
        <SmallCardAffiliate 
          title={t(`${key}.small_card.title`)} 
          paragraph={"$1.254"} 
          smallParagraph={".30"} 
          urlImage={"/hand-money.svg"} 
          label={"Money"} 
          colorSVGCL={"bg-[#00B69B]"} 
          colorbgImageCL={"bg-[#4AD991]/20"} 
          skor={"+20%"} 
          info={t("text.from_weeks_ago")}        
        />
      </div>
      <div className="hidden xl:block absolute right-10 2xl:right-20 top-1/2 -translate-y-1/2">
        <BigCardAffiliate />
      </div>


      {/* MAIN */}
      <div className="z-999 flex flex-col justify-center items-center gap-6 text-white text-center w-full">
        <div className="flex flex-col justify-center items-center gap-4 md:gap-6 lg:gap-4 xl:gap-6 w-full max-w-full xl:max-w-[720px] 2xl:max-w-[980px]">
          <BadgeHero 
            icon={
              <img src="/share-affiliate.svg" alt="Share Icon" 
                className="scale-80 2xl:scale-100"
              />
            }
          >
            {t(`${key}.badge`)}
          </BadgeHero>
          <h1 className="font-wix-madefor-display font-bold text-[36px] md:text-[40px] xl:text-[48px] 2xl:text-[64px] leading-[120%]">
            {t(`${key}.title`)}
          </h1>
          <p className="text-base md:text-xl 2xl:text-2xl font-medium text-light-gray leading-[200%]">
            {t(`${key}.paragraph`)}
          </p>
          <div className="hidden lg:flex items-center justify-center gap-8">
            {[t(`${key}.benefits.0`), t(`${key}.benefits.1`)].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <FaCircleCheck className="text-white text-base md:text-lg 2xl:text-2xl" />
                <p className="text-base 2xl:text-2xl font-semibold text-white leading-[200%]">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <Button 
            buttonType="link" 
            urlTo={`${getLocalizedPath("/register", i18n.language)}`}
            variant="light" 
            size="xl" 
            className="py-4! 2xl:py-6! flex md:block flex-1 md:flex-0 text-base! 2xl:text-xl! font-medium! text-nowrap"
          >
            {t(`${key}.button`)}
          </Button>
        </div>

        <div className="mt-6 md:mt-10 2xl:mt-20 flex justify-center flex-nowrap gap-y-5">
          {features.map((item, index) => (
            <div 
              key={index}
              className={`
                ${index === 0 ? "mr-2 md:mr-10 2xl:mr-20":""}
                ${index === 1 ? "px-2 md:px-8 2xl:px-15 border-x border-white":""}
                ${index === 2 ? "ml-2 md:ml-10 2xl:ml-20":""}
              `}
            >
              <p className="font-wix-madefor-display font-bold text-[28px] md:text-[40px] xl:text-[48px] 2xl:text-[64px] leading-[120%]">
                {item.skor}
              </p>
              <p className="text-sm md:text-base 2xl:text-2xl font-medium text-light-gray leading-[200%]">
                {t(`${item.keyTranslate}.title`)}
              </p>
            </div>
          ))}
        </div>
      </div>

    </header>
  )
}

export default HeroSection;
