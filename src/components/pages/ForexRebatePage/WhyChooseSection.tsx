import BadgeSection from "@/components/ui/BadgeSection";
import BoundedIcon from "../brokerDetail/ui/BoundedIcon";
import { useTranslation } from "react-i18next";

const features = [
  {
    icon: "hand-money.svg",
    alt: "Money",
    title: "Apakah Platform menampung dana?",
    paragraph: "Tidak. Platform tidak menampung dana pengguna. Tidak ada sistem deposit melalui platform seperti FXPayout. Semua transaksi tetap langsung dilakukan melalui broker.",
    keyTranslate: "features.0"
  },
  {
    icon: "recycle.svg",
    alt: "Recycle",
    title: "Apakah Meminta Akses Akun Trading?",
    paragraph: "Tidak. Platform tidak meminta email maupun password untuk login ke akun broker. Keamanan akun tetap sepenuhnya di tangan pengguna.",
    keyTranslate: "features.1"
  },
  {
    icon: "no-fees.svg",
    alt: "No Fees",
    title: "Apakah Sistem Rebate Transparan?",
    paragraph: "Ya. Seluruh proses rebate bersifat transparan, tanpa biaya tersembunyi atau potongan tambahan.",
    keyTranslate: "features.2"
  }
]

const WhyChooseSection = () => {
  const { t } = useTranslation(["common", "forexrebatepage"]);
  const key = "forexrebatepage:whychoosesection";

  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-10 md:pt-15 2xl:pt-20">

      <div className="flex flex-col items-center justify-center gap-4">
        <BadgeSection
          icon={
            <img src="/eye-search.svg" alt="Search" 
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

      <div className="mt-6 lg:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {features.map((item, index) => (
            <div 
              key={index}
              className={`p-5 flex flex-col items-center text-center bg-my-red-100 rounded-[20px]
                ${index === 2 ? "col-span-1 md:col-span-2 xl:col-span-1" : "col-span-1"}  
              `}
            >
              <BoundedIcon
                icon={`/${item.icon}`}
                alt={item.alt}
                variant="fourth"
                paddingVariant="small"
                bgCL="bg-my-red-200"
                maskColor="bg-my-red-700"
              />
              <p className="mt-5 text-base md:text-xl font-semibold text-[#122118]">
                {t(`${key}.${item.keyTranslate}.title`)}
              </p>
              <p className="mt-2.5 text-base md:text-xl leading-[160%] text-[#020202]/50">
                {t(`${key}.${item.keyTranslate}.paragraph`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 lg:mt-6 py-4 px-5 bg-[#F4F6FA] rounded-lg shadow-[0_3px_13.1px_0_rgba(0,0,0,0.1)] border-s-10 border-primary">
          <p className="text-base md:text-xl font-medium text-black/70 leading-[192%]">
            {t(`${key}.info`)}
          </p>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseSection;
