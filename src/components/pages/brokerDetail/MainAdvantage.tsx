import { useTranslation } from "react-i18next";
import HeadingSection from "./ui/HeadingSection";
import SubHeadingSection from "./ui/SubHeadingSection";

const MainAdvantage = ({ 
  brokerId,
  keyAdvantages 
}: { 
  brokerId: string;
  keyAdvantages: string; 
}) => {
  const { t } = useTranslation([brokerId, "brokerdetailpage"]);
  const advantages = t(keyAdvantages, { returnObjects: true });
  return (
    <section id="keunggulan" className="scroll-mt-18 lg:scroll-mt-0 mt-10 lg:mt-12 2xl:mt-16 py-8 md:py-10 2xl:py-14 px-5 md:px-11 lg:px-18 xl:px-24 2xl:px-56 bg-[#F9F9F9]">
      <HeadingSection>{t("brokerdetailpage:advantage.title")}</HeadingSection>
      <SubHeadingSection>{t("brokerdetailpage:advantage.subtitle")}</SubHeadingSection>
      <div className="mt-6 2xl:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2 lg:gap-3 2xl:gap-6">
        {Array.isArray(advantages) && advantages.map((item, idx) => (
          <div key={idx} className="px-4 2xl:px-8 py-4 2xl:py-6 flex items-center gap-3 md:gap-2 2xl:gap-3 bg-my-light-blue rounded-2xl 2xl:rounded-[20px]">
            <img src="/brokerDetail/check-gradient.png" alt="Check Icon" 
              className="size-10"
            />
            <p className="text-base 2xl:text-xl font-semibold bg-linear-to-t from-dark-primary to-primary bg-clip-text text-transparent">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MainAdvantage;
