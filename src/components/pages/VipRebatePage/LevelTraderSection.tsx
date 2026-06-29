import BadgeSection from "@/components/ui/BadgeSection";
import MaskSvg from "@/components/ui/MaskSvg";
import { Trans, useTranslation } from "react-i18next";
import { FaCircleCheck } from "react-icons/fa6";

const detailLevel = [
  {
    urlImage: "/user-standard.svg",
    tier: "Standar Rebate",
    paragraph: "Program ini memberikan fleksibilitas bagi trader untuk memulai tanpa komitmen besar.",
    percentage: "75",
    terms: [
      "Tanpa Minimum Deposit",
      "Langsung Aktif Setelah Registrasi",
      "Cocok Untuk Semua Tipe Trader"
    ],
    keyTranslate: "detail_levels.0"
  },
  {
    urlImage: "/stoink.svg",
    tier: "Active Rebate",
    paragraph: "Bagi trader yang aktif, rebate dapat meningkat hingga 85% berdasarkan aktivitas trading.",
    percentage: "85",
    terms: [
      "Aktivitas trading konsisten selama <b>1 bulan</b>",
      "Semakin aktif Anda trading, semakin besar rebate yang didapat.",
    ],
    keyTranslate: "detail_levels.1"
  },
  {
    urlImage: "/crown-icon.svg",
    tier: "VIP Rebate",
    paragraph: "Program VIP dirancang untuk trader dengan komitmen dan aktivitas trading yang lebih tinggi.",
    percentage: "95",
    terms: [
      "Total deposit mulai dari <b>$2000</b>",
      "Menjaga equity akun minimal <b>$1000</b> selama periode 1 bulan",
    ],
    keyTranslate: "detail_levels.2"
  },
];

const LevelTraderSection = () => {
  const { t } = useTranslation(["viprebatepage"]);
  const key = "viprebatepage:leveltradersection";
  return (
    <section className="mt-10 md:mt-15 2xl:mt-20 px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 py-10 md:py-15 xl:py-[120px] bg-[#F9F9F9]">
      <div className="flex flex-col items-center justify-center gap-4">
        <BadgeSection
          icon={
            <img src="/people_money.svg" alt="Reg broker" 
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

      <div className="mt-6 md:mt-10 grid grid-cols-1 xl:grid-cols-3 gap-4">
        {detailLevel.map((item, index) => {
          const rawTerms = t(`${key}.detail_levels.${index}.terms`, 
            { returnObjects: true }) || [];
          
          const arrTerms = Array.isArray(rawTerms)
            ? (rawTerms as string[])
            : [];
          return (
            <div 
              key={index}
              className={`px-6 md:px-10 pb-8 md:pb-10 pt-15 md:pt-10 relative rounded-[20px] border space-y-4 md:space-y-6
                ${index === 2 ? "border-primary shadow-[0_8px_0_0] shadow-primary" : "border-[#939393] shadow-[0_8px_0_0_#939393]"}  
              `}
            >

              <div className="px-4 py-2 absolute end-0 top-5 bg-my-green rounded-s-xl">
                <span className="text-base font-bold text-white">
                  LEVEL {index + 1}
                </span>
                <div className="absolute start-full top-0 w-1.5 h-12 bg-my-green rounded-e-[10px]" />
              </div>

              <div className="flex items-center gap-4">
                <div className="shrink-0 p-1 md:p-2 flex justify-center items-center size-10 md:size-15 bg-linear-to-t from-dark-primary to-primary rounded-lg">
                  <MaskSvg 
                    icon={item.urlImage} 
                    label={item.tier} 
                    color={"bg-white"}       
                    className="w-7 md:w-8 h-7 md:h-8 object-contain"           
                  />
                </div>
                <p className="text-2xl md:text-[32px] xl:text-2xl 2xl:text-[32px] font-semibold leading-[132%]">
                  {t(`${key}.${item.keyTranslate}.tier`)}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-base md:text-xl leading-[180%]">
                  {t(`${key}.${item.keyTranslate}.paragraph`)}
                </p>
                <div>
                  <div className="flex items-end justify-between">
                    <p className="text-primary text-base font-semibold leading-[180%]">
                      {t(`${key}.rebate_until`)}
                    </p>
                    <p className="text-[40px] md:text-[48px] text-primary italic font-bold">
                      {item.percentage}%
                    </p>
                  </div>
                  <div className="relative w-full h-2 bg-black/10 rounded-full">
                    <div style={{ width: `${item.percentage}%` }} className={"h-2 bg-primary rounded-full"}></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {arrTerms.map((term, idx) => {
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <FaCircleCheck className="mt-2 md:mt-2.5 shrink-0 text-primary text-xl" />
                      <p className="text-base md:text-xl leading-[160%]">
                        <Trans
                          components={{ b: <strong /> }}
                        >
                          {term}
                        </Trans>
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 md:mt-10 p-6 bg-[#F4F6FA] rounded-lg shadow-[0_3px_13.1px_0_rgba(0,0,0,0.1)] border-s-10 border-primary space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">
          {t(`${key}.how_to_improve`)}
        </h2>
        <p className="text-base md:text-xl font-medium text-black/70 leading-[192%]">
          {t(`${key}.answer_to_improve`)}
        </p>
      </div>
    </section>
  )
}

export default LevelTraderSection;
