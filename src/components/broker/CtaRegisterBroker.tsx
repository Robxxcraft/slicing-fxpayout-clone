import { useTranslation } from "react-i18next";
import { FaHandshakeSimple } from "react-icons/fa6";
import Button from "../ui/Button";

const CtaRegisterBroker = ({
  horizontal
}: {
  horizontal?: boolean;
}) => {
  const { t } = useTranslation(["brokerpage"]);
  const key = "brokerpage:ctaregisterbroker";
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 3xl:px-56 pt-10 md:pt-15 3xl:pt-20">
      <div className={`px-4 md:px-6 3xl:px-10 py-6 3xl:py-10 w-full flex items-center gap-4 3xl:gap-6 bg-primary/5 border border-primary
        ${horizontal ? "flex-col md:flex-row justify-center md:justify-start text-center md:text-start rounded-[40px] md:rounded-3xl" : "flex-col justify-center items-center text-center rounded-[40px]"}  
      `}>

        <div className="flex justify-center items-center size-18 3xl:size-20 bg-primary/10 rounded-full">
          <FaHandshakeSimple size="40" className="text-primary" />
        </div>

        <div className={`
          ${horizontal ? "space-y-2" : "space-y-4 3xl:space-y-6"}
        `}>
          <h1 className="text-2xl 3xl:text-[32px] font-bold leading-[132%] text-primary max-w-[620px] 3xl:max-w-[860px]">
            {t(`${key}.title`)}
          </h1>
          <p className="text-base 3xl:text-xl leading-[160%] max-w-[620px] 3xl:max-w-[860px]">
            {t(`${key}.paragraph`)}
          </p>
        </div>

        <Button 
          buttonType="link" 
          urlTo={"https://forms.gle/qjpmK6fXnjYoXZjZ7"} 
          target="_blank"
          variant="primary" 
          size="xl" 
          className={`font-medium! text-nowrap
            ${horizontal ? "ms-auto! w-full! md:w-fit!" : ""}  
          `}
        >
          {t(`${key}.button`)}
        </Button>
      </div>
    </section>
  )
}

export default CtaRegisterBroker;
