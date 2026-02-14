import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { IoMegaphone } from "react-icons/io5";

const Rewards = () => {
  const { t } = useTranslation();
  return (
    <div className="relative mt-10 lg:mt-18 2xl:mt-28 px-6 xl:px-[120px] 2xl:px-[166px] py-8 2xl:py-10 bg-primary overflow-hidden">
      <img
        src="/circle-ornament.png"
        alt="ornament"
        className="absolute top-0 -left-[5%] -rotate-55 w-[600px]"
      />
      <div className="z-999 relative flex flex-col xl:flex-row gap-x-8 gap-y-6 lg:gap-y-8 items-center justify-between">
        <div className="flex flex-row gap-2 lg:gap-5 2xl:gap-6 w-full xl:w-fit">
          <IoMegaphone className="mb-3 md:mb-0 mt-2 lg:mt-0 text-white text-[26px] lg:text-[48px] text-center w-fit" />
          <div className="w-full">
            <div className="mb-2 lg:mb-3 flex flex-row md:items-center justify-between xl:justify-start gap-x-6">
              <h2 className="text-base md:text-xl lg:text-[26px] 2xl:text-[32px] font-semibold text-white">
                {t("homePage.rewards.title")}
              </h2>
              <div className="h-fit">
                <div className="px-4 md:px-6 lg:px-5 py-1.5 2xl:py-2.5 flex items-center gap-2.5 w-fit border border-[#FF929D] rounded-full">
                  <div className="size-2.5 rounded-full bg-[#FF929D]"></div>
                  <span className="text-[10px] md:text-base text-nowrap font-semibold text-[#FF929D]">
                    {t("homePage.rewards.tag")}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm md:text-base 2xl:text-xl font-semibold text-[rgba(255,255,255,0.8)]">
              {t("homePage.rewards.paragraph")}
            </p>
          </div>
        </div>
        <Button buttonType="link" urlTo="https://wa.me/6282125597634" target="_blank" variant="light" size="xl" className="py-4! 2xl:py-6! font-medium! w-full! xl:w-fit!">
          {t("common.button.registerNow")}
        </Button>
      </div>
    </div>
  );
};

export default Rewards;
