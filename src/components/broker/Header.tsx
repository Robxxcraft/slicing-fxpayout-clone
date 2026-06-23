import { useTranslation } from "react-i18next";
import BadgeSection from "../ui/BadgeSection";

const Header = () => {
  const { t } = useTranslation(["brokerpage"]);
  return (
    <>
      <section className="px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 pt-[120px] lg:pt-[150px] 2xl:pt-[200px]">
        <div className="flex flex-col items-center justify-center text-center">
          <BadgeSection
            icon={
              <img src="/people_money.svg" alt="Reg broker"
                className="scale-90 md:scale-100" />
          }>
            {t("brokerpage:header.tag")}
          </BadgeSection>
          <h1 className="my-4 text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%]">
            {t("brokerpage:header.title")}
          </h1>
          <p className="text-base md:text-xl leading-[160%] max-w-[786px]">
            {t("brokerpage:header.paragraph")}
          </p>
        </div>
      </section>
    </>
  );
};

export default Header;
