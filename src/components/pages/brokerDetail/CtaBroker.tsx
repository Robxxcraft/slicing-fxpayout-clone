import { IoArrowForward } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import type { RegionWebsite } from "@/utils/dataBroker/typeDetailBroker";

const CtaBroker = ({ 
  name, 
  openWebsiteModal,
  websiteUrl
}: { 
  name: string; 
  openWebsiteModal: () => void; 
  websiteUrl: RegionWebsite[];
}) => {
  const { t } = useTranslation(["brokerdetailpage"]);
  return (
    <section className="px-6 md:px-11 lg:px-18 xl:px-24 3xl:px-56 pt-10 lg:pt-18 xl:pt-20">
      <div className="relative py-10 xl:py-14 3xl:py-[72px] px-4 xl:px-10 flex flex-col items-center justify-center bg-primary rounded-3xl text-center overflow-hidden">
        <div className="z-11 w-full flex flex-col items-center">
          <h2 className="text-2xl 3xl:text-[40px] font-bold text-white leading-[134%] max-w-full">
            {t("brokerdetailpage:cta.title", { brokerName: name })}
          </h2>
          <p className="mt-4 text-base 3xl:text-xl text-white leading-[160%] max-w-[620px]">
            {t("brokerdetailpage:cta.paragraph", { brokerName: name })}
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-4 md:gap-3">
            <Button buttonType="link" urlTo='/broker' variant="primary-light" size="xl" icon={<IoArrowForward className="text-xl 3xl:text-2xl rtl:scale-x-[-1]" />} iconPosition="right">
              {t("brokerdetailpage:cta.registerFxpayout")}
            </Button>
            <Button 
              buttonType={websiteUrl.length === 1 ? "link" : "button"}
              onClick={websiteUrl.length === 1 ? () => {} : () => openWebsiteModal()}
              urlTo={websiteUrl.length === 1 ? websiteUrl[0].url : undefined}
              target={websiteUrl.length === 1 ? "_blank" : undefined} 
              variant="outline-light" 
              size="xl" 
              icon={<FaExternalLinkAlt className="text-base 3xl:text-xl rtl:scale-x-[-1]" />} 
              iconPosition="right"
            >
              {t("brokerdetailpage:cta.visitWebsite")}
            </Button>
          </div>
        </div>
        <img
          src="/circle-ornament.png"
          alt="ornament"
          className="absolute z-10 top-0 -start-[10%] ltr:-rotate-55 rtl:rotate-260 w-[600px]"
        />
      </div>
    </section>
  );
};

export default CtaBroker;
