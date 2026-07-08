import { useTranslation } from "react-i18next";
import { IoDiamondOutline } from "react-icons/io5";
import { LuCrown, LuRocket } from "react-icons/lu";

const LevelAffiliateSection = () => {
  const { t } = useTranslation(["affiliatelandingpage"]);
  const translateKey = "affiliatelandingpage:levelaffiliatesection";
  const flows = t(`${translateKey}.how_to_work.flows`, {
    returnObjects: true
  }) as string[];

  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 3xl:px-56 py-10 md:py-15 xl:py-[120px] bg-[#F9F9F9]">
      {/* HEADER */}
      <div className="flex flex-col items-center text-center gap-4">
        <h2 className="text-2xl md:text-[32px] 3xl:text-[44px] font-bold leading-[132%]">
          {t(`${translateKey}.title`)}
        </h2>
        <p className="text-base md:text-xl leading-[160%] max-w-5xl">
          {t(`${translateKey}.paragraph`)}
        </p>
      </div>

      {/* CONTENT */}
      <LevelCard />

      <div className="mt-6 md:mt-10 py-5 md:py-6 ps-10 md:ps-12 pe-5 md:pe-6 bg-white border border-[#DDDDDD] rounded-[20px] shadow-[0_5px_30px_0] shadow-[#19213D]/6">
        <h3 className="text-xl md:text-2xl font-semibold text-my-dark-purple leading-[132%]">
          {t(`${translateKey}.how_to_work.title`)}
        </h3>
        <ol className="list-decimal">
          {flows.map((item, index) => (
            <li key={index} className="mt-3 text-base md:text-xl leading-[160%] text-black/80">
              {item}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default LevelAffiliateSection;

function LevelCard() {
  const { t } = useTranslation(["affiliatelandingpage"]);
  const key = "affiliatelandingpage:levelaffiliatesection";

  const tierLevel = [
    {
      icon: <IoDiamondOutline className="text-2xl text-[#3B82F6] transition-transform duration-300 hover:scale-[1.05]" />,
      title: "Mitra Pemula",
      share: 35,
      requirement: "0-49 Trader Aktif",
      description: "Cocok untuk affiliate yang baru mulai membangun komunitas trader mereka.",
      translateKey: `${key}.tiers.0`
    },
    {
      icon: <LuRocket className="text-2xl text-primary transition-transform duration-300 hover:scale-[1.05]" />,
      title: "Mitra Aktif",
      share: 45,
      requirement: "50-99 Trader Aktif",
      description: "Perluas komunitas Anda dan dapatkan komisi berulang yang lebih tinggi.",
      translateKey: `${key}.tiers.1`
    },
    {
      icon: <LuCrown className="text-2xl text-[#F59E0B] transition-transform duration-300 hover:scale-[1.05]" />,
      title: "Mitra Master VIP",
      share: 55,
      requirement: "100+ Trader Aktif",
      description: "Level affiliate tertinggi dengan porsi revenue sharing maksimal dan dukungan prioritas.",
      translateKey: `${key}.tiers.2`
    },
  ];

  return (
    <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tierLevel.map((level, index) => (
        <div key={index} className="p-5 md:p-6 bg-white border border-primary/20 rounded-[20px] shadow-[0_5px_30px_0] shadow-[#19213D]/6">
          {/* HEAD */}
          <div className="flex items-center justify-between gap-3">
            {level.icon}
            <span className="px-3 py-1 text-xs md:text-sm font-semibold text-primary bg-primary/10 rounded-full">
              Level {index + 1}
            </span>
          </div>
          <h3 className="mt-4 text-xl md:text-2xl font-semibold text-my-dark-purple leading-[132%]">
            {t(`${level.translateKey}.title`)}
          </h3>

          {/* CONTENT */}
          <div className="mt-5 p-4 bg-[#F5F8FF] border border-primary/10 rounded-xl">
            <p className="text-sm md:text-base font-medium text-black/60">
              {t(`${key}.shared`)}
            </p>
            <p className="mt-1 text-[32px] md:text-[40px] font-bold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text leading-[110%]">
              {level.share}%
            </p>
          </div>
          <div className="mt-4">
            <p className="text-sm md:text-base font-medium text-black/60">
              {t(`${key}.requirement`)}
            </p>
            <p className="mt-1 text-base md:text-xl font-semibold text-[#122118] leading-[150%]">
              {t(`${level.translateKey}.requirement`)}
            </p>
          </div>
          <p className="mt-4 text-base md:text-lg text-black/70 leading-[160%]">
            {t(`${level.translateKey}.description`)}
          </p>
        </div>
      ))}
    </div>
  )
};
