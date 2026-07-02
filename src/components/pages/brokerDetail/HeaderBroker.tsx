import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalf  } from "react-icons/fa6";
import type { OverallScore, BrokerRanking, Specification, RegionWebsite } from "@/utils/dataBroker/typeDetailBroker";
import BoundedIcon from "./ui/BoundedIcon";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";

type DetailBio = {
  title: string;
  detail: string | string[];
  icon: string;
}

type TypeHeader = {
  brokerId: string;
  name: string; 
  ranking: BrokerRanking; 
  badges: string[]; 
  profileImage: string; 
  overallScore: OverallScore; 
  description: string; 
  spesification: Specification;
  openWebsiteModal: () => void;
  registerUrl: RegionWebsite[];
  websiteUrl: RegionWebsite[];
}

const HeaderBroker = ({
  brokerId, name, ranking, badges, 
  profileImage, overallScore, description, 
  spesification, openWebsiteModal,
  registerUrl, websiteUrl
}: TypeHeader ) => {
  const { t } = useTranslation([brokerId, "brokerdetailpage"]);

  const finalSpread = Array.isArray(spesification.spread) ? spesification.spread.map((s) => t(s)) : t(spesification.spread);
  const detailBio: DetailBio[] = [
    {title: "brokerdetailpage:header.detailHeaders.0", detail: spesification.yearFounded, icon: "year-founded.svg"},
    {title: "brokerdetailpage:header.detailHeaders.1", detail: `$${spesification.minDeposit}`, icon: "min-depo.svg"},
    {title: "brokerdetailpage:header.detailHeaders.2", detail: t(spesification.leverage), icon: "leverage.svg"},
    {title: "brokerdetailpage:header.detailHeaders.3", detail: finalSpread, icon: "spread.svg"},
  ]

  return (
    <header className="mt-[92px] md:mt-[180px] lg:mt-[50px] 2xl:mt-[60px] px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56">
      <Link
        to="/broker"
        className="flex gap-2 2xl:gap-3 items-center w-fit text-sm lg:text-base 2xl:text-xl text-my-red hover:gap-4 2xl:hover:gap-5 transition-all duration-300 ease-out">
        <IoArrowBackOutline className="rtl:rotate-180" />
        <span>{t("brokerdetailpage:back")}</span>
      </Link>
      <div className="mt-6 lg:mt-8 2xl:mt-10 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-4 lg:gap-6 2xl:gap-8 items-start w-fit">
          <img src={`/broker/${profileImage}`} alt={`Logo ${name}`} 
            className="size-16 lg:size-28 xl:size-45 2xl:size-60 rounded-[10px] lg:rounded-[20px] object-center object-cover" 
          />
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-[36px] 2xl:text-[48px] font-semibold">
              {name}
            </h1>
            <p className="mt-2 md:mt-0 text-xl xl:text-2xl 2xl:text-[32px] leading-5 md:leading-9 font-medium uppercase text-black/80">
              Tier {ranking.tier} {ranking.title}
            </p>
            <BioBroker badges={badges} openModal={openWebsiteModal} registerUrl={registerUrl} websiteUrl={websiteUrl} />
          </div>
        </div>
        {/* <div className="block md:hidden"><BioBroker /></div> */}
        
        <div className="px-6 lg:px-8 2xl:px-10 py-4 lg:py-6 2xl:py-8 flex flex-col items-center bg-my-light-blue rounded-[20px] min-w-[270px] lg:w-fit">
          <p className="text-base lg:text-2xl 2xl:text-[32px] leading-9 font-semibold">
            {t("brokerdetailpage:overallScore")}
          </p>
          <div className="mt-1 lg:mt-5 2xl:mt-10 flex items-end" dir="ltr">
            <p className="text-[36px] lg:text-[48px] 2xl:text-[64px] lg:leading-16 font-semibold">
              {overallScore.rate}
            </p>
            <p className="text-xl lg:text-[26px] 2xl:text-[36px] leading-11 tracking-[10%] font-semibold">
              /5
            </p>
          </div>
          <div className="lg:mt-5 2xl:mt-4 flex gap-2">
            {Array.from({length: Math.floor(overallScore.rate)}).map((_, idx) => (
              <FaStar key={idx} className="text-2xl text-my-yellow" />
            ))}
            {!Number.isInteger(overallScore.rate) &&
              <FaStarHalf className="text-2xl text-my-yellow rtl:scale-x-[-1]" />
            }
          </div>
          <Link to={overallScore.communityUrl} target="_blank"
            className="mt-4 block text-base font-semibold bg-linear-to-t from-dark-primary to-primary text-transparent bg-clip-text underline! decoration-dark-primary">
            {t("brokerdetailpage:header.viewRating")}
          </Link>
        </div>
      </div>

      <div className="block lg:hidden"><ButtonCta openModal={openWebsiteModal} registerUrl={registerUrl} websiteUrl={websiteUrl} /></div>

      {/* DESCRIPTION */}
      <div className="mt-6 2xl:mt-10">
        <p className="text-base 2xl:text-2xl leading-[180%] text-black/80">
          {t(description)}
        </p>
      </div>

      {/* DETAILBIO */}
      <div className="mt-4 lg:mt-8 2xl:mt-10 md:py-4 lg:py-6 2xl:py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 border-t border-b border-[#828282]/50">
        {detailBio.map((item, idx) => (
          <div key={idx} className={`
            ${idx === 0 && "pt-4 md:pt-0 pb-4 lg:pb-0 border-b lg:border-b-0"}
            ${idx === 1 && "pt-4 md:pt-0 pb-4 lg:pb-0 border-b lg:border-b-0"}
            ${idx === 2 && "pb-4 md:pb-0 pt-4 lg:pt-0 border-b md:border-b-0"}
            ${idx === 3 && "pb-4 md:pb-0 pt-4 lg:pt-0"}
            border-[#828282]/20 md:border-[#828282]/50
          `}>
            <div className={`
              ${idx !== 0 && "lg:border-s"}
              ${idx !== 0 && "lg:ps-5 2xl:ps-10"} 
              ${idx % 2 !== 0 && "md:ps-10 md:border-s"}
              flex gap-4 2xl:gap-6 border-[#828282]/50`
            }>
              <div className="w-fit">
                <BoundedIcon icon={`/brokerDetail/${item.icon}`} alt="Icon" />
              </div>
              <div className="flex flex-col gap-1 lg:gap-2">
                <p className="text-base 2xl:text-2xl text-black/80">
                  {t(item.title)}
                </p>
                <p className="text-xl 2xl:text-[28px] 2xl:leading-8 font-semibold">
                  {Array.isArray(item.detail) ? 
                    item.detail.map((text: string) => (
                      <span key={text}>{text}<br/></span>
                    )):
                    item.detail
                  }
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

const BioBroker = ({
  badges, 
  openModal,
  registerUrl,
  websiteUrl
}: {
  badges: string[]; 
  openModal: () => void;
  registerUrl: RegionWebsite[];
  websiteUrl: RegionWebsite[];
}) => {
  const { t } = useTranslation(["brokerdetailpage"]);
  return (
    <>
      <div className="mt-3 lg:mt-4 2xl:mt-6 flex flex-wrap gap-2 w-fit">
        {badges.map((item, idx) => (
          <div key={idx}
            className="bg-linear-to-t from-dark-primary to-primary border border-transparent bg-clip-border rounded-lg overflow-hidden"
          >
            <div className="px-3 lg:px-5 2xl:px-6 py-2 2xl:py-3 w-full bg-my-light-blue">
              <p className="text-[12px] md:text-sm 2xl:text-base bg-linear-to-t from-dark-primary to-primary text-transparent font-semibold bg-clip-text text-nowrap">
                {t(item)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block"><ButtonCta openModal={openModal} registerUrl={registerUrl} websiteUrl={websiteUrl} /></div>
    </>
  )
}

const ButtonCta = ({
  openModal,
  registerUrl,
  websiteUrl
}: {
  openModal: () => void;
  registerUrl: RegionWebsite[];
  websiteUrl: RegionWebsite[];
}) => {
  const { t } = useTranslation(["common"]);
  return (
    <div className="mt-3 md:mt-4 2xl:mt-6 flex flex-row gap-2 lg:gap-3 2xl:gap-4 flex-wrap md:flex-nowrap">
      <Button 
        buttonType={registerUrl.length === 1 ? "link" : "button"}
        onClick={registerUrl.length === 1 ? () => {} : () => openModal()}
        urlTo={registerUrl.length === 1 ? registerUrl[0].url : undefined}
        target={registerUrl.length === 1 ? "_blank" : undefined}  
        variant="primary" 
        size="md" 
        className="text-nowrap flex-1"
      >
        {t("button.registerNow")}
      </Button>
      <Button 
        buttonType={websiteUrl.length === 1 ? "link" : "button"}
        onClick={websiteUrl.length === 1 ? () => {} : () => openModal()}
        urlTo={websiteUrl.length === 1 ? websiteUrl[0].url : undefined}
        target={websiteUrl.length === 1 ? "_blank" : undefined} 
        variant="outline" 
        size="md" 
        className="text-nowrap flex-1"
      >
        {t("button.visitWebsite")}
      </Button>
    </div>
  )
}

export default HeaderBroker;
