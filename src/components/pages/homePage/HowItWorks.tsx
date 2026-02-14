import WorkflowCards from "@/components/WorkflowCards";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-4 md:pt-[310px] lg:pt-[270px] xl:pt-56">
      <div className="flex flex-col items-center text-center">
        <div className="px-6 py-2 w-fit flex gap-2 items-center bg-primary rounded-full">
          <img src="/workflow.svg" alt="workflow" 
            className="scale-90 md:scale-100"/>
          <span className="text-base md:text-xl font-semibold text-white">
            {t("homePage.howItWorks.tag")}
          </span>
        </div>
        <h2 className="my-4 text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%]">
          {t("homePage.howItWorks.title")}
        </h2>
        <p className="text-base md:text-xl leading-[160%]">
          {t("homePage.howItWorks.paragraph")}
        </p>
      </div>
      <WorkflowCards />
    </section>
  );
};

export default HowItWorks;
