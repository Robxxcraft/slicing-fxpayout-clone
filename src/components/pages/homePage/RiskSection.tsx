import { useTranslation } from "react-i18next";
import BoundedIcon from "../brokerDetail/ui/BoundedIcon";

const RiskSection = () => {
  const { t } = useTranslation(["homepage"]);
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-10 md:pt-14 xl:pt-[120px]">
      <div className="flex flex-col items-center justify-center text-center">
        <BoundedIcon 
          icon={`/secure.svg`} 
          alt="Icon" 
          variant="fourth"
          roundedVariant="circle"
        />
        <h2 className="my-4 text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%]">
          {t("homepage:riskSection.title")}
        </h2>
        <p className="text-base md:text-xl leading-[160%] max-w-4xl">
          {t("homepage:riskSection.paragraph")}
        </p>

        <div className="mt-6 md:mt-10 px-6 2xl:px-10 py-4 2xl:py-6 flex items-center gap-4 bg-primary/7 border border-primary rounded-2xl">
          <img src="/check-gradient.svg" alt="check icon"
            className="mt-px scale-70 md:scale-80 2xl:scale-90"
          />
          <p className="text-base md:text-xl 2xl:text-2xl font-medium leading-6 -tracking-[-0.24%] text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
            {t("homepage:riskSection.cta")}
          </p>
        </div>
      </div>
    </section>
  )
}

export default RiskSection;
