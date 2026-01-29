import { useEffect, useState } from "react";
import { throttle } from "lodash";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { languages, type Language } from "../utils/languageSupport";
import LanguageSelector from "./LanguageSelector";
import { listNavigation } from "../utils/listNavigation";
import { FaChevronDown } from "react-icons/fa6";

export type HandleChangeLanguage = (lang: Language) => void;

const Navbar = ({ active }: { active: string }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const [openLanguageSelector, setOpenLanguageSelector] =
    useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages[0]
  );

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChangeLanguage: HandleChangeLanguage = (lang) => {
    setOpenLanguageSelector(false);
    setSelectedLanguage(lang);
  };
  const handleOpenSubMenu = (idx: number) => {
    setOpenSubMenu((prev) => prev === idx ? null : idx);
  }

  return (
    <nav
      className="z-99999999 w-full fixed px-[26px] md:px-11 lg:px-18 xl:px-24 2xl:px-56 max-h-20 lg:max-h-[90px] 2xl:max-h-full flex items-center justify-between bg-[rgba(65,96,255,0.5)] backdrop-blur-[27.5px] transition-all duration-300"
      style={{
        height: scrollY > 10 ? "100px" : "140px",
        backgroundColor:
          active === "home"
            ? scrollY > 5
              ? "rgba(65,96,255,1)"
              : "rgba(65,96,255,0)"
            : "rgba(65,96,255,1)",
      }}>
      <div className="flex gap-2 items-center">
        <img
          src="/fxpayout-white.svg"
          alt="logo fx payout"
          className="mb-2 lg:mb-3 w-4 md:w-5 lg:w-6 2xl:w-8"
        />
        <span className="text-base md:text-xl 2xl:text-3xl font-semibold text-white">
          FXPAYOUT
        </span>
      </div>
      <div className="hidden xl:flex gap-6">
        {listNavigation.map((item, index) => (
          <div
            key={index}
            className={`relative group flex items-center gap-2 px-2 text-light-gray text-base 2xl:text-xl border-white transition-all duration-300 ease-out`}
          >
            <Link to={item.url} className={`${
              active.toLocaleLowerCase() == item.title.toLocaleLowerCase()
                ? "font-bold"
                : "font-normal"
            } relative py-2 group-hover:font-bold transition-all duration-300`}>
              {item.title}
              {active.toLocaleLowerCase() == item.title.toLocaleLowerCase() &&
                <div className="absolute top-full left-1/2 -translate-x-1/2 h-1 w-[50%] bg-white rounded-full"></div>
              }
            </Link>
            {item.sublist !== undefined && 
            <>
              <FaChevronDown className="text-[14px] cursor-pointer group-hover:rotate-180 transition-all duration-200" />
              <div className="absolute py-6 scale-0 group-hover:scale-100 origin-top flex top-full left-0 flex-col bg-white w-60 h-fit shadow-lg rounded-xl transition-all duration-200 delay-200 ease-out">
                {item.sublist?.map((subNav, idx) => (
                  <HashLink 
                    smooth
                    key={idx} 
                    to={subNav.url} className="px-6 py-3 text-black hover:bg-black/10"
                    scroll={(el) => {
                      setTimeout(() => {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 200);
                    }}>
                    {subNav.title}
                  </HashLink>
                ))
                }
              </div>
            </>
            }
            
          </div>
        ))}
      </div>
      <div className="hidden xl:flex gap-2 2xl:gap-4 items-center">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          open={openLanguageSelector}
          setOpen={setOpenLanguageSelector}
          onChangeLanguage={handleChangeLanguage}
        />
        {/* <Button buttonType="link" urlTo="#" variant="outline-light" size="lg" className="py-3! font-medium!">
          Login
        </Button>
        <Button buttonType="link" urlTo="#" variant="light" size="lg" className="py-3! font-medium!">
          Daftar
        </Button> */}
      </div>
      <RxHamburgerMenu
        onClick={() => setOpenMenu(true)}
        className="block xl:hidden text-2xl text-white cursor-pointer"
      />

      {/* MOBILE MENU */}
      <div
        className="fixed top-0 left-0 px-6 md:px-11 lg:px-18 py-5 flex flex-col xl:hidden bg-primary w-full min-h-screen overflow-auto transition-all duration-300"
        style={{
          left: openMenu ? "0" : "-100%",
        }}>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <img
              src="/fxpayout-white.svg"
              alt="logo fx payout"
              className="mb-2 w-4 md:w-5"
            />
            <span className="text-base md:text-2xl font-semibold text-white">
              FXPAYOUT
            </span>
          </div>
          <IoClose onClick={() => {
            setOpenMenu(false); 
            setOpenLanguageSelector(false);
          }} className="text-3xl text-white cursor-pointer" />
        </div>
        <div className="flex flex-col gap-6">
          {listNavigation.map((item, index) => {
            const isSubOpen = openSubMenu === index;
            return (
            <div
              key={index}
              className={`${
                active.toLocaleLowerCase() == item.title.toLocaleLowerCase()
                  ? "font-bold text-white"
                  : "font-normal text-[#E9E9E9]"
              }
               `}>
              <div
                onClick={() => {
                  if (item.sublist !== undefined) {
                    handleOpenSubMenu(index);
                  } else if (active.toLocaleLowerCase() == item.title.toLocaleLowerCase()) {
                    setOpenMenu(false); 
                    setOpenLanguageSelector(false);
                  }
                }} 
                className="relative flex justify-between pb-1 w-full text-base hover:font-bold">
                <Link to={item.url}>{item.title}</Link>
                {item.sublist !== undefined && <FaChevronDown className={`
                  ${isSubOpen ? "rotate-180" : "rotate-0"} text-[14px] transition-all duration-300 ease-out`} />}
                {active.toLocaleLowerCase() == item.title.toLocaleLowerCase() &&
                  <div className="absolute top-full rounded-full h-1 w-[20%] bg-white"></div>
                }
              </div>
              {item.sublist !== undefined && isSubOpen && 
                <>
                  <div className="py-2 flex flex-col h-fit font-normal">
                    {item.sublist?.map((subNav, idx) => (
                      <Link key={idx}
                        to={subNav.url} 
                        onClick={() => {
                          if (active.toLocaleLowerCase() == item.title.toLocaleLowerCase()) {
                          setOpenMenu(false); 
                          setOpenLanguageSelector(false);
                        }}}
                        className="px-4 py-2 text-white hover:bg-black/10">
                        {subNav.title}
                      </Link>
                    ))
                    }
                  </div>
                </>
                }
          </div>
          )})}
        </div>
        {/* <div className="px-5 mt-6 flex items-center justify-center w-full gap-2">
          <Link to="#" className="w-fit text-center">
            <span className="block w-fit px-6 py-3 text-base font-medium bg-primary text-white border border-white rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 ease-out">
              Login
            </span>
          </Link>
          <Link to="#" className="w-fit text-center">
            <span className="block w-fit px-6 py-3 text-base font-medium text-black bg-white border border-white rounded-lg hover:bg-[rgba(255,255,255,0.8)] transition-all duration-300 ease-out">
              Daftar
            </span>
          </Link>
        </div> */}
        <div className="mx-auto mt-4">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            open={openLanguageSelector}
            setOpen={setOpenLanguageSelector}
            onChangeLanguage={handleChangeLanguage}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
