import BadgeSection from "@/components/ui/BadgeSection";
import Button from "@/components/ui/Button";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useTranslation } from "react-i18next";

const users = [
  {
    urlImage: "/trader.svg",
    label: "Trader",
    title: "Trader",
    description: "Trader aktif yang memiliki relasi atau jaringan sesama trader.",
    translateKey: "users.0"
  },
  {
    urlImage: "/content-creator.svg",
    label: "Content Creator",
    title: "Content Creator",
    description: "Pembuat konten yang membahas trading, forex, atau finansial.",
    translateKey: "users.1"
  },
  {
    urlImage: "/community.svg",
    label: "Community",
    title: "Komunitas Trading",
    description: "Pemilik atau pengelola komunitas trader, baik online maupun offline.",
    translateKey: "users.2"
  },
  {
    urlImage: "/affiliate-connection.svg",
    label: "group connection",
    title: "Affiliate Marketer",
    description: "Individu yang terbiasa mempromosikan produk melalui digital marketing.",
    translateKey: "users.3"
  },
];

const WhoCanJoinSection = () => {
  const { t, i18n } = useTranslation(["common", "affiliatelandingpage"]);
  const key = "affiliatelandingpage:whocanjoinsection";
  
  return (
    <section className="mt-10 md:mt-15 xl:mt-[120px] px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 py-10 md:py-15 xl:py-[120px] bg-[#F9F9F9]">
      <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">

        <div className="flex flex-col items-center lg:items-start">
          <div className="flex flex-col gap-4 items-center lg:items-start text-center lg:text-start">
            <BadgeSection
              icon={
                <img src="/mark-arrow.svg" alt="Mark" 
                  className="scale-90 md:scale-100" />
            }>
              {t(`${key}.badge`)}
            </BadgeSection>
            <h2 className="text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%]">
              {t(`${key}.title`)}
            </h2>
            <p className="text-base md:text-xl leading-[160%] max-w-5xl">
              {t(`${key}.paragraph`)}
            </p>
          </div>
          <Button
            variant="primary-light"
            buttonType="link"
            urlTo={getLocalizedPath("register", i18n.language)}
            size="lg"
            className="mt-4 md:mt-8 py-6! lg:py-[18px]!"
          >
            {t(`button.join_now`)}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((item, index) => (
            <div key={index}
              className="p-5 flex flex-col items-center bg-white border border-primary rounded-[20px] text-center"
            >
              <div className="p-2.5 size-14 flex justify-center items-center rounded-[10px] bg-my-light-blue">
                <img src={item.urlImage} alt={item.label} 
                  className="size-full object-fill"
                />
              </div>
              <p className="mt-5 text-xl font-semibold text-[#122118]">
                {t(`${key}.${item.translateKey}.title`)}
              </p>
              <p className="mt-2.5 text-base leading-[26px] text-black/50">
                {t(`${key}.${item.translateKey}.description`)}
              </p>
            </div>
          ))}
          <div className="col-span-1 md:col-span-2 text-center">
            <p className="text-base text-black/50 leading-[160%]">
              {t(`${key}.info`)}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoCanJoinSection;
