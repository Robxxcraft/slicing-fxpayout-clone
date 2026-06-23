import BadgeSection from "@/components/ui/BadgeSection";
import MaskSvg from "@/components/ui/MaskSvg";
import { useTranslation } from "react-i18next";

const items = [
  {
    urlImage: "/cycle-time.svg",
    label: "Cycle Time",
    title: "Penghasilan Jangka Panjang",
    paragraph: "Selama referral Anda aktif melakukan trading, Anda akan terus mendapatkan bagian komisi. Tidak ada batas waktu kadaluarsa untuk referral Anda.",
    keyTranslate: "revenues.0"
  },
  {
    urlImage: "/recycle-money.svg",
    label: "Money",
    title: "Komisi Berulang Setiap Bulan",
    paragraph: "Setiap transaksi oleh jaringan Anda dikonversi menjadi komisi yang bisa Anda tarik kapan saja. Komisi ini akan berjalan setiap bulan selama a,filiasi Anda tetap aktif.",
    keyTranslate: "revenues.1"
  }
];

const RevenueSection = () => {
  const { t } = useTranslation(["affiliatelandingpage"]);
  const key = "affiliatelandingpage:revenuesection";
  
  return (
    <section className="mt-10 md:mt-14 xl:mt-[120px] px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 py-10 md:py-15 xl:py-[120px] bg-[#F9F9F9]">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <BadgeSection
          icon={
            <img src="/recycle-money.svg" alt="Money" 
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

      <div className="mt-6 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={index} className="p-6 bg-[#E5EEFF] rounded-[20px]">
            <div className="mb-2.5 flex gap-2 md:gap-5 items-center">
              <div className="p-2 shrink-0 flex justify-center items-center bg-[#BED8FF] size-10 md:size-14 rounded-[10px]">
                <MaskSvg 
                  icon={item.urlImage} 
                  label={item.label} 
                  color={"bg-primary"}
                  className="size-10 object-contain"              
                />
              </div>
              <p className="text-base md:text-2xl font-semibold text-[#122118]">
                {t(`${key}.${item.keyTranslate}.title`)}
              </p>
            </div>
            <p className="text-base md:text-xl text-[#020202]/60 leading-[160%]">
              {t(`${key}.${item.keyTranslate}.paragraph`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RevenueSection;
