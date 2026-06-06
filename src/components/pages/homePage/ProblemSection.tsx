import { useTranslation } from "react-i18next";
import BoundedIcon from "../brokerDetail/ui/BoundedIcon";
import BadgeSection from "@/components/ui/BadgeSection";

const ProblemSection = () => {
  const { t } = useTranslation(["homepage"]);
  const problems = t("homepage:problemSection.problems", {
    returnObjects: true
  }) as string[];
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-14 xl:pt-[120px]">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <BadgeSection
          icon={
          <img src="/problem-user.svg" alt="Problem User" 
            className="scale-90 md:scale-100"/>
          }
        >
          {t("homepage:problemSection.badge")}
        </BadgeSection>
        <h2 className="my-4 text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%] text-center">
          {t("homepage:problemSection.title")}
        </h2>
        <p className="text-base md:text-xl leading-[160%] max-w-5xl text-center">
          {t("homepage:problemSection.paragraph")}
        </p>
      </div>

      <div className="mt-6 lg:mt-10 flex flex-col items-center justify-center gap-y-10">
        <div className="grid gird-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {problems.map((item, index) => (
            <div 
              key={index}
              className="px-5 2xl:px-8 py-4 2xl:py-6 flex items-start md:items-center justify-between gap-6 bg-[#FAF4F4] rounded-lg shadow-[0_3px_13.1px_0_rgba(0,0,0,0.1)] border-l-10 border-[#FF4141]"
            >
              <p className="text-base md:text-xl 2xl:text-2xl text-[#FF4141] font-medium leading-[160%]">
                {item} 
              </p>
              <div className="w-fit">
                <BoundedIcon icon={`/money-down.svg`} alt="Icon Money" 
                  bgCL="bg-[#FFE3E3]"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="relative w-full border-t border-dashed">
          <p className="px-3 absolute top-1/2 left-1/2 -translate-1/2 text-base md:text-lg 2xl:text-xl font-semibold text-black/50 leading-[160%] bg-white whitespace-nowrap uppercase">
            {t("homepage:problemSection.then")} 
          </p>
        </div>

        <div className="px-5 2xl:px-8 py-4 2xl:py-6 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between w-full bg-[#F4F6FA] rounded-lg shadow-[0_3px_13.1px_0_rgba(0,0,0,0.1)] border-l-10 border-primary">
          <div>
            <p className="text-base md:text-xl 2xl:text-2xl text-primary font-bold leading-[160%]">
              {t("homepage:problemSection.solutions.0")}
            </p>
            <p className="text-base md:text-xl 2xl:text-2xl text-primary font-medium leading-[160%]">
              {t("homepage:problemSection.solutions.1")} 
            </p>
          </div>
          <div className="w-fit">
            <div className="flex gap-2 items-center">
              <img
                src="/fxpayout-blue.svg"
                alt="logo fx payout"
                className="mb-2 lg:mb-3 w-5 lg:w-6 2xl:w-7"
              />
              <span className="text-lg md:text-2xl 2xl:text-3xl font-bold text-primary">
                FXPAYOUT
              </span>
            </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemSection;
