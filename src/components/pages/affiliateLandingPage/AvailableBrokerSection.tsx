import { useTranslation } from "react-i18next";

const imageBrokers = ["exness", "ic-markets", "pepperstone", "tickmill", "fp-markets", "xm", "eightcap", "vantage", "axi"];

const AvailableBrokerSection = () => {
  const { t } = useTranslation(["common", "affiliatelandingpage"]);
  const key = "affiliatelandingpage:avilablebrokersection";

  return (
    <section className="relative px-6 md:px-10 lg:px-18 xl:px-24 3xl:px-56 py-10 md:py-15 bg-primary overflow-hidden">
      <img
        src="/circle-ornament.png"
        alt="ornament"
        className="absolute top-0 -start-[5%] ltr:-rotate-55 rtl:rotate-260 w-[600px]"
      />
      <div className="z-999 relative flex flex-col gap-4 md:gap-8 items-center justify-center text-center">
        <h2 className="text-xl md:text-2xl md:text-[32px] font-semibold text-white">
          {t(`${key}.title`)}
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 lg:gap-7 3xl:gap-10">
          {imageBrokers.map((item) => (
            <div
              key={item} 
              className="p-px md:p-1 size-8 md:size-15 lg:size-18 3xl:size-20 flex justify-center items-center border border-white rounded-full"
            >
              <img src={`/broker/${item}.webp`} alt={item} 
                className="size-full object-fill bg-white rounded-full"
              />
            </div>
          ))}
          <div className="size-8 md:size-15 lg:size-18 3xl:size-20 flex flex-col items-center justify-center text-center bg-white rounded-full">
            <p className="text-[8px] md:text-base lg:text-2xl font-semibold text-primary">
              20+
            </p>
            <p className="text-[6px] md:text-[10px] font-medium text-primary">
              {t("text.title_others")}
            </p>
          </div>
        </div>
        <p className="text-base md:text-xl 3xl:text-2xl font-medium text-white/80 leading-[154%] lg:max-w-[790px]">
          {t(`${key}.paragraph`)}
        </p>
      </div>
    </section>
  )
}

export default AvailableBrokerSection;
