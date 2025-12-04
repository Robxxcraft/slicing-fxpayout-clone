import { useState } from "react";
import { Link } from "react-router-dom";
import { listNavigationBrokers } from "../../../utils/listNavigation";
import Button from "../../ui/Button";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const NavigationBar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <nav
      className="lg:py-8 2xl:py-10 px-5 xl:px-24 2xl:px-56 w-full top-0 fixed lg:static h-full min-h-18 max-h-18 flex lg:block items-center lg:max-h-fit bg-white shadow-[0_3px_40px_0_rgba(0,0,0,0.1)] lg:shadow-[0_3px_60px_0_rgba(0,0,0,0.1)] 2xl:shadow-[0_6px_126.7px_0_rgba(0,0,0,0.1)]">
      {/* ROW 1 */}
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-3 lg:gap-5 2xl:gap-6">
          <img
            src="/broker/exness.png"
            alt="Logo Broker"
            className="size-12 lg:size-16 2xl:size-[84px] rounded-lg lg:rounded-xl 2xl:rounded-[20px]"
          />
          <div className="flex flex-col justify-between">
            <p className="text-xl lg:text-[26px] 2xl:text-[36px] font-semibold text-black">Exness</p>
            <p className="text-sm lg:text-lg 2xl:text-2xl font-medium text-black/80">
              Tier 1 Premium ECN Broker
            </p>
          </div>
        </div>
        <div className="hidden md:flex gap-3 2xl:gap-4">
          <Button variant="primary">Daftar Sekarang</Button>
          <Button variant="outline">Kunjungan Website</Button>
        </div>
        {!openMenu ? 
          <RxHamburgerMenu
            onClick={() => setOpenMenu(true)}
            className="block lg:hidden text-2xl text-black cursor-pointer"
          />
        : <IoClose onClick={() => setOpenMenu(false)} className="text-3xl cursor-pointer" />
        }
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
        <div className="pt-4 pb-18 absolute top-18 left-0 bg-white w-full h-screen overflow-auto">
          <div className="flex flex-col">
            {listNavigationBrokers.map(({ title, url }, idx) => (
              <a
                key={idx}
                href={url}
                onClick={() => setOpenMenu(false)}
                className="px-5 py-2.5 text-base text-black border-b border-black/30 hover:font-medium">
                {title}
              </a>
            ))}
          </div>
          <div className="px-5 mt-4 flex items-center justify-center w-full gap-2 flex-wrap">
            <Link to="#" className="w-fit text-center">
              <span className="block w-fit px-3 py-3 text-sm font-semibold bg-linear-to-t from-dark-primary to-primary text-white border border-black rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 ease-out">
                Daftar Sekarang
              </span>
            </Link>
            <Link to="#" className="w-fit text-center">
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

export default NavigationBar;
