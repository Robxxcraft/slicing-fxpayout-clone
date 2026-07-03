import BadgeSection from "@/components/ui/BadgeSection";
import React from "react";
import { useTranslation } from "react-i18next";

const comparisonData = [
  {
    urlImage: "percentage-solid.svg",
    title: "Persentase Cashback",
    description: "Cashback dari komisi broker yang Anda terima",
    fxPayout: {
      icon: false,
      data: "Up to 95%"
    },
    other: "50% - 70%",
    keyTranslate: "data.0"
  },
  {
    urlImage: "connect-world.svg",
    title: "Rebate Bervariasi",
    description: "Nilai rebate tinggi di berbagai instrumen trading",
    fxPayout: {
      icon: true,
      data: "check.svg"
    },
    other: true,
    keyTranslate: "data.1"
  },
  {
    urlImage: "no-money.svg",
    title: "Tanpa Deposit",
    description: "Tidak perlu transfer dana untuk mulai menggunakan layanan",
    fxPayout: {
      icon: true,
      data: "check.svg"
    },
    other: "Umumnya memerlukan deposit",
    keyTranslate: "data.2"
  },
  {
    urlImage: "stop.svg",
    title: "Tidak akses akun",
    description: "Keamanan akun tetap terjaga sepenuhnya di broker",
    fxPayout: {
      icon: true,
      data: "shield.svg"
    },
    other: "Beberapa layanan memiliki akses",
    keyTranslate: "data.3"
  },
  {
    urlImage: "eye-search-primary.svg",
    title: "Transparan",
    description: "Semua proses rebate jelas dan dapat dipantau",
    fxPayout: {
      icon: true,
      data: "check.svg"
    },
    other: "Transparansi terbatas",
    keyTranslate: "data.4"
  },
];

const ComparisonSection = () => {
  const { t } = useTranslation(["forexrebatepage"]);
  const key = "forexrebatepage:comparisonsection";
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 3xl:px-56 pt-10 md:pt-15 3xl:pt-20">
      <div className="flex flex-col items-center justify-center gap-4">
        <BadgeSection
          icon={
            <img src="/law-icon.svg" alt="Law" 
              className="scale-90 md:scale-100" />
        }>
          {t(`${key}.badge`)}
        </BadgeSection>
        <h2 className="text-2xl md:text-[32px] 3xl:text-[44px] font-bold leading-[132%] text-center">
          {t(`${key}.title`)}
        </h2>
        <p className="text-base md:text-xl leading-[160%] max-w-5xl text-center">
          {t(`${key}.paragraph`)}
        </p>
      </div>
      <div className="mt-15 bg-white">
      <div className="grid grid-cols-3 md:grid-cols-[1fr_1fr_1.4fr] border-b border-[#B2B2B2]">
        {/* Header */}
        <div className="p-8"></div>

        <div className="px-8 py-10 flex justify-center bg-my-light-blue border-x-4 border-t-4 border-primary rounded-t-[20px] shadow-[6px_22px_205.8px_0] shadow-primary/22">
          <div dir="ltr" className="flex flex-col md:flex-row gap-2 items-center">
            <img
              src="/fxpayout-blue.svg"
              alt="logo fx payout"
              className="w-3 md:w-6 3xl:w-8"
            />
            <span className="text-xs md:text-xl lg:text-2xl 3xl:text-3xl font-bold text-primary">
              FXPAYOUT
            </span>
          </div>
        </div>

        <div className="ms-2 lg:ms-6 py-10 flex justify-center items-center text-center bg-[#F9F9F9] border-t border-x border-[#EBEBEB] rounded-t-[20px]">
          <h3 className="text-base md:text-xl lg:text-2xl font-bold uppercase leading-[160%]">
            {t(`${key}.other_platforms`)}
          </h3>
        </div>

        {comparisonData.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className={`pe-6 md:pe-10 pb-6 md:pb-10 lg:pb-2.5 flex flex-col md:flex-row items-start gap-4
                ${index === 0 ? "pt-0" : "pt-6 md:pt-10"}
                ${index === comparisonData.length - 1 ? "":"border-b border-b-[#B2B2B2]"}
              `}>
                <div className="p-2 3xl:p-4 shrink-0 size-11 md:size-12 3xl:size-16 flex items-center justify-center rounded-lg bg-my-light-blue">
                  <img src={`/${item.urlImage}`} alt="ICON" 
                    className="size-full object-fill"
                  />
                </div>

                <div>
                  <h4 className="text-base md:text-xl 3xl:text-2xl font-semibold leading-[160%]">
                    {t(`${key}.${item.keyTranslate}.title`)}
                  </h4>
                  <p className="mt-1 text-xs md:text-base text-black/70 leading-[160%]">
                    {t(`${key}.${item.keyTranslate}.description`)}
                  </p>
                </div>
              </div>

              {/* FXPayout */}
              <div className={`flex items-center justify-center border-x-4 border-primary bg-my-light-blue shadow-[6px_22px_205.8px_0] shadow-primary/22
                ${index === comparisonData.length - 1 ? "rounded-b-[20px] border-b-4":"border-b border-b-[#B2B2B2]"}
              `}>
                {item.fxPayout.icon ? (
                  <img src={`/${item.fxPayout.data}`} alt="ICON" 
                    className="w-6 md:w-12 h-6 md:h-12 object-contain"
                  />
                ) : (
                  <div className="px-3 md:px-6 lg:px-8 py-2 md:py-3 bg-linear-to-t from-dark-primary to-primary rounded-[20px]">
                    <p className="text-xs md:text-xl 3xl:text-2xl font-semibold text-white leading-[160%]">
                      {item.fxPayout.data}
                    </p>
                  </div>
                )}
              </div>

              {/* Other */}
              <div className={`ps-2 lg:ps-6
                ${index === comparisonData.length - 1 ? "":"border-b border-b-[#B2B2B2]"}
              `}>
                <div className={`flex items-center justify-center h-full text-center border-x border-[#EBEBEB] bg-[#F9F9F9]
                    ${index === comparisonData.length - 1 ? "border-b rounded-b-[20px]":""}    
                `}>
                  {typeof item.other === "boolean" ? (
                    <img src={`/check.svg`} alt="ICON" 
                      className="w-6 md:w-12 h-6 md:h-12 object-contain"
                    />
                  ) : (
                    <p className="text-sm md:text-xl 3xl:text-2xl font-medium text-black/50 leading-[160%]">
                      {t(`${key}.${item.keyTranslate}.other`)}
                    </p>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
    </section>
  )
}

export default ComparisonSection;
