import { useTranslation } from "react-i18next";

const BigCardAffiliate = () => {
  const { t } = useTranslation("affiliatelandingpage");
  const key = "affiliatelandingpage:component:big_card";
  return (
    <div className="bg-white rounded-md md:rounded-2xl w-fit md:w-full lg:w-60 3xl:w-[320px] h-fit shadow-[6px_22px_55.5px_0_rgba(0,0,0,0.18)]">
      <div className="px-3 md:px-6 lg:px-4 3xl:px-5 pt-3 md:pt-8 lg:pt-4 3xl:pt-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            onContextMenu={() => false}
            src="/avatar-card-affiliate.png" alt="avatar" 
            className="size-6 md:size-7 3xl:size-8 rounded-full"
          />
          <p className="text-[8px] md:text-base lg:text-sm 3xl:text-base font-medium">
            {t(`${key}.username`)}
          </p>
        </div>
        <p className="font-medium text-[8px] md:md:text-base lg:text-sm 3xl:text-base bg-linear-to-t from-dark-primary to-primary text-transparent bg-clip-text">
          +23.45%
        </p>
      </div>
      <div className="my-3 md:my-4 3xl:my-6 px-3 md:px-4 3xl:px-5 space-y-2">
        <p className="text-[6px] md:text-sm text-[#373737]">
          {t(`${key}.commission`)}
        </p>
        <p className="text-sm md:text-xl 3xl:text-2xl font-bold text-[#001219]">
          $2.564.72
        </p>
        <p className="text-[8px] md:text-sm 3xl:text-base leading-[13.2px] md:leading-[25.4px] tracking-[0.47px]">
          {t(`${key}.info`)}
        </p>
      </div>
      <img
        onContextMenu={() => false} 
        src="/chart-graphic.png" 
        alt="Chart" 
        className="w-full object-cover"
      />
    </div>
  )
}

export default BigCardAffiliate;
