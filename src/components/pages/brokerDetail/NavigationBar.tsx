import { useEffect, useRef, useState } from "react";
import { listNavigationBrokers } from "@/utils/listNavigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { throttle } from "lodash";
import type { BrokerRanking, RegionWebsite } from "@/utils/dataBroker/typeDetailBroker";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";

const NavigationBar = ({ name, ranking, profileImage, registerUrl, websiteUrl, openWebsiteModal }: 
  {
    name: string; 
    ranking: BrokerRanking; 
    profileImage: string; 
    registerUrl: RegionWebsite[];
    websiteUrl: RegionWebsite[];
    openWebsiteModal: () => void;
  }
) => {
  const { t } = useTranslation(["common", "brokerdetailpage"]);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnHamburgerRef = useRef<HTMLSpanElement>(null);
  const fullRankingText = `Tier ${ranking.tier} ${ranking.title}`;

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current && btnHamburgerRef.current) {
        const overflowing = textRef.current.offsetWidth > containerRef.current.offsetWidth - btnHamburgerRef.current.offsetWidth - 48;
        setIsOverflowing(overflowing);
      }
    }
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [fullRankingText]);

  return (
    <>
      <nav
        className="z-999 lg:py-8 2xl:py-10 px-5 xl:px-24 2xl:px-56 w-full top-0 fixed lg:static h-full min-h-18 max-h-18 md:max-h-fit flex lg:block items-center bg-white shadow-[0_6px_126.7px_0_rgba(0,0,0,0.1)]">
        {/* ROW 1 */}
        <div className="py-5 lg:py-0 flex flex-col lg:flex-row gap-y-3 justify-between items-center w-full">
          <div className="flex justify-between items-center w-full lg:w-fit gap-x-3">
            <div ref={containerRef} className="flex gap-3 lg:gap-5 2xl:gap-6 w-full overflow-hidden">
              <img
                src={`/broker/${profileImage}`}
                alt={`Logo ${name}`}
                className="size-12 lg:size-16 2xl:size-[84px] rounded-lg lg:rounded-xl 2xl:rounded-[20px]"
              />
              <div className="max-w-full overflow-hidden">
                <p className="text-xl lg:text-[26px] 2xl:text-[36px] font-semibold text-black">{name}</p>
                <div className={`${isOverflowing && "animate-marquee "} whitespace-nowrap inline-block`}>
                  <p ref={textRef} className="inline-block text-sm lg:text-lg 2xl:text-2xl font-medium text-black/80 text-nowrap">
                    {fullRankingText}
                  </p>
                  {isOverflowing && 
                    <p className="ps-1 inline-block text-sm lg:text-lg 2xl:text-2xl font-medium text-black/80">
                      {fullRankingText}
                    </p>
                  }
                </div>
              </div>
            </div>
            {!openMenu ? 
              <span ref={btnHamburgerRef}>
                <RxHamburgerMenu
                  onClick={() => setOpenMenu(true)}
                  className="block lg:hidden text-2xl text-black cursor-pointer"
                />
              </span>
            : <IoClose onClick={() => setOpenMenu(false)} className="text-3xl cursor-pointer" />
            }
          </div>
          <ButtonCta scrollY={scrollY} openModal={openWebsiteModal} registerUrl={registerUrl} websiteUrl={websiteUrl} />
        </div>

        {/* ROW 2 */}
        {/* DESKTOP NAV */}
        <div className="mt-5 2xl:mt-8 hidden lg:flex gap-8 2xl:gap-10">
          {listNavigationBrokers.map(({ title, url, code }) => (
            <a
              href={url}
              key={title}
              className="text-sm 2xl:text-xl text-black hover:font-medium">
              {t(`brokerdetailpage:navbar.${code}`)}
            </a>
          ))}
        </div>

        {/* MOBILE NAV */}
        {openMenu &&
          <div className="_no-scrollbar pt-4 pb-18 absolute top-18 left-0 bg-white w-full h-[calc(100dvh-70px)] md:h-[calc(100dvh-260px)] overflow-auto">
            <div className="flex flex-col">
              {listNavigationBrokers.map(({ title, url, code }) => (
                <a
                  key={title}
                  href={url}
                  onClick={() => setOpenMenu(false)}
                  className="px-5 py-3 text-base text-black border-b border-black/10 hover:font-medium">
                  {t(`brokerdetailpage:navbar.${code}`)}
                </a>
              ))}
            </div>
            <div className="px-5 mt-4 flex items-center justify-center w-full gap-2 flex-wrap">
              {registerUrl.length > 0 && (
                registerUrl.length === 1 ?
                <a href={registerUrl[0].url} target="_blank" className="w-fit text-center">
                  <span className="block w-fit px-3 py-3 text-sm font-semibold bg-linear-to-t from-dark-primary to-primary text-white border border-black rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 ease-out">
                    {t("button.registerNow")}
                  </span>
                </a>
                :
                <div onClick={openWebsiteModal} className="w-fit text-center">
                  <span className="block w-fit px-3 py-3 text-sm font-semibold bg-linear-to-t from-dark-primary to-primary text-white border border-black rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 ease-out">
                    {t("button.registerNow")}
                  </span>
                </div>
              )}
              {websiteUrl.length > 0 && (
                websiteUrl.length === 1 ? 
                <a href={registerUrl[0].url} target="_blank" className="w-fit text-center">
                  <span className="block w-fit px-3 py-3 text-sm font-semibold text-black bg-white border border-black rounded-lg hover:bg-[rgba(255,255,255,0.8)] transition-all duration-300 ease-out">
                    {t("button.visitWebsite")}
                  </span>
                </a>
                :
                <div onClick={openWebsiteModal} className="w-fit text-center">
                  <span className="block w-fit px-3 py-3 text-sm font-semibold text-black bg-white border border-black rounded-lg hover:bg-[rgba(255,255,255,0.8)] transition-all duration-300 ease-out">
                    {t("button.visitWebsite")}
                  </span>
                </div>
              )}
            </div>
          </div>
        }
      </nav>
    </>
  );
};

const ButtonCta = ({ 
  scrollY, 
  openModal,
  registerUrl,
  websiteUrl
}:{
  scrollY: number; 
  openModal: () => void;
  registerUrl: RegionWebsite[];
  websiteUrl: RegionWebsite[]
}) => {
  const { t } = useTranslation(["common"])
  return (
    <div className={`
      ${scrollY > 10 ? "lg:flex" : "md:flex"}
       hidden gap-3 2xl:gap-4 w-full lg:w-fit
    `}>
      <Button 
        buttonType={registerUrl.length === 1 ? "link" : "button"}
        onClick={registerUrl.length === 1 ? () => {} : () => openModal()}
        urlTo={registerUrl.length === 1 ? registerUrl[0].url : undefined}
        target={registerUrl.length === 1 ? "_blank" : undefined} 
        variant="primary" 
        className="w-full! lg:w-auto text-nowrap"
      >
        {t("button.registerNow")}
      </Button>
      <Button 
        buttonType={websiteUrl.length === 1 ? "link" : "button"}
        onClick={websiteUrl.length === 1 ? () => {} : () => openModal()}
        urlTo={websiteUrl.length === 1 ? websiteUrl[0].url : undefined}
        target={websiteUrl.length === 1 ? "_blank" : undefined} 
        variant="outline" 
        className="w-full! lg:w-auto text-nowrap"
      >
        {t("button.visitWebsite")}
      </Button>
    </div>
  )
}

export default NavigationBar;
