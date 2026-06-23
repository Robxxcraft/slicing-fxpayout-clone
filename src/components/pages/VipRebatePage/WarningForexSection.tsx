import { useTranslation } from "react-i18next";
import { IoIosWarning } from "react-icons/io";

const WarningForexSection = () => {
  const { t } = useTranslation(["viprebatepage"]);
  const key = "viprebatepage:warningforexsection";
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-10 md:pt-15 2xl:pt-20">
      <div className="px-4 md:px-10 pt-16 md:pt-10 pb-10 relative w-full flex flex-col items-center justify-center text-center gap-6 bg-[#FFF5F5] border border-my-red-700 rounded-[40px]">

        <div className="px-4 py-2 absolute left-0 top-5 rounded-r-xl bg-my-red-700">
          <span className="text-base font-bold text-white uppercase">
            {t(`${key}.badge`)}
          </span>
          <div className="absolute right-full top-0 w-1.5 h-12 rounded-l-[10px] bg-my-red-700" />
        </div>

        <div className="flex justify-center items-center size-20 bg-my-red-200 rounded-full">
          <IoIosWarning size="40" className="text-[#EE404C]" />
        </div>

        <h1 className="text-xl md:text-2xl lg:text-[32px] font-bold leading-[132%] text-[#EE404C] max-w-[800px]">
          {t(`${key}.title`)}
        </h1>
        <p className="text-base md:text-xl leading-[160%] max-w-[800px]">
          {t(`${key}.paragraph`)}
        </p>

      </div>
    </section>
  )
}

export default WarningForexSection;
