import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listNavigationBrokers } from "@/utils/listNavigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { throttle } from "lodash";
import type { BrokerRanking } from "@/utils/dataBroker/typeDetailBroker";
import Button from "@/components/ui/Button";

const NavigationBar = ({name, ranking, profileImage, registerUrl}: 
  {
    name: string; 
    ranking: BrokerRanking; 
    profileImage: string; 
    registerUrl: string; 
  }
) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="z-999 lg:py-8 2xl:py-10 px-5 xl:px-24 2xl:px-56 w-full top-0 fixed lg:static h-full min-h-18 max-h-18 md:max-h-fit flex lg:block items-center bg-white shadow-[0_6px_126.7px_0_rgba(0,0,0,0.1)]">
      {/* ROW 1 */}
      <div className="py-5 lg:py-0 flex flex-col lg:flex-row gap-y-3 justify-between items-center w-full">
        <div className="flex justify-between items-center w-full lg:w-fit">
          <div className="flex gap-3 lg:gap-5 2xl:gap-6">
            <img
              src={`/broker/${profileImage}`}
              alt={`Logo ${name}`}
              className="size-12 lg:size-16 2xl:size-[84px] rounded-lg lg:rounded-xl 2xl:rounded-[20px]"
            />
            <div className="flex flex-col justify-between">
              <p className="text-xl lg:text-[26px] 2xl:text-[36px] font-semibold text-black">{name}</p>
              <p className="text-sm lg:text-lg 2xl:text-2xl font-medium text-black/80">
                Tier {ranking.tier} {ranking.title}
              </p>
            </div>
          </div>
          {!openMenu ? 
            <RxHamburgerMenu
              onClick={() => setOpenMenu(true)}
              className="block lg:hidden text-2xl text-black cursor-pointer"
            />
          : <IoClose onClick={() => setOpenMenu(false)} className="text-3xl cursor-pointer" />
          }
        </div>
        <ButtonCta scrollY={scrollY} registerUrl={registerUrl} />
      </div>

      {/* ROW 2 */}
      {/* DESKTOP NAV */}
      <div className="mt-5 2xl:mt-8 hidden lg:flex gap-8 2xl:gap-10">
        {listNavigationBrokers.map(({ title, url }, idx) => (
          <a
            href={url}
            key={idx}
            className="text-sm 2xl:text-xl text-black hover:font-medium">
            {title}
          </a>
        ))}
      </div>

      {/* MOBILE NAV */}
      {openMenu &&
        <div className="_no-scrollbar pt-4 pb-18 absolute top-18 left-0 bg-white w-full h-[calc(100vh-70px)] md:h-[calc(100vh-260px)] overflow-auto">
          <div className="flex flex-col">
            {listNavigationBrokers.map(({ title, url }, idx) => (
              <a
                key={idx}
                href={url}
                onClick={() => setOpenMenu(false)}
                className="px-5 py-3 text-base text-black border-b border-black/10 hover:font-medium">
                {title}
              </a>
            ))}
          </div>
          <div className="px-5 mt-4 flex items-center justify-center w-full gap-2 flex-wrap">
            <Link to={registerUrl} target="_blank" className="w-fit text-center">
              <span className="block w-fit px-3 py-3 text-sm font-semibold bg-linear-to-t from-dark-primary to-primary text-white border border-black rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 ease-out">
                Daftar Sekarang
              </span>
            </Link>
            <Link to={registerUrl} target="_blank" className="w-fit text-center">
              <span className="block w-fit px-3 py-3 text-sm font-semibold text-black bg-white border border-black rounded-lg hover:bg-[rgba(255,255,255,0.8)] transition-all duration-300 ease-out">
                Kunjungan Website
              </span>
            </Link>
          </div>
        </div>
      }
    </nav>
  );
};

const ButtonCta = ({ scrollY, registerUrl }:{scrollY: number; registerUrl: string}) => {
  return (
    <div className={`
      ${scrollY > 10 ? "lg:flex" : "md:flex"}
       hidden gap-3 2xl:gap-4 w-full lg:w-fit
    `}>
      <Button buttonType="link" urlTo={registerUrl} target="_blank" variant="primary" className="w-full! lg:w-auto text-nowrap">Daftar Sekarang</Button>
      <Button buttonType="link" urlTo={registerUrl} target="_blank" variant="outline" className="w-full! lg:w-auto text-nowrap">Kunjungan Website</Button>
    </div>
  )
}

export default NavigationBar;
