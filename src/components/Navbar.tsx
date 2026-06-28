import { useContext, useEffect, useState } from "react";
import { throttle } from "lodash";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { languages, type Language } from "../utils/languageSupport";
import LanguageSelector from "./LanguageSelector";
import { listNavigation } from "../utils/listNavigation";
import { FaChevronDown } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { getLocalizedPath, navigateChangeLng } from "@/helper/pathHelper";
import Button from "./ui/Button";
import UserContext from "@/context/UserContext";
import { useRedirectByRole } from "@/hooks/useRedirectByRole";

export type HandleChangeLanguage = (lang: Language) => void;

const Navbar = ({ 
  active,
  transparentBgTop, 
}: { 
  active: string;
  transparentBgTop?: boolean
}) => {
  const { t, i18n } = useTranslation(["common"]);
  const [authUser] = useContext(UserContext);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const [openLanguageSelector, setOpenLanguageSelector] =
    useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages.find((lng) => lng.code === i18n.language) ?? languages[0]
  );

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { redirectUser } = useRedirectByRole();

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChangeLanguage: HandleChangeLanguage = (lng) => {
    setOpenLanguageSelector(false);
    i18n.changeLanguage(lng.code);
    setSelectedLanguage(lng);
    navigateChangeLng(lng.code, navigate, pathname)
  };

  const handleOpenSubMenu = (idx: number) => {
    setOpenSubMenu((prev) => prev === idx ? null : idx);
  };

  return (
    <nav
      className="z-999995 w-full fixed px-[26px] md:px-11 lg:px-18 xl:px-24 2xl:px-56 max-h-20 lg:max-h-[90px] 2xl:max-h-full flex items-center justify-between bg-[rgba(65,96,255,0.5)] backdrop-blur-[27.5px] transition-all duration-300"
      style={{
        height: scrollY > 10 ? "100px" : "140px",
        backgroundColor:
          transparentBgTop
            ? scrollY > 5
              ? "rgba(65,96,255,1)"
              : "rgba(65,96,255,0)"
            : "rgba(65,96,255,1)",
      }}>
      <Link to={`${getLocalizedPath("/", i18n.language)}`} className="flex gap-2 items-center">
        <img
          src="/fxpayout-white.svg"
          alt="logo fx payout"
          className="w-4 md:w-5 lg:w-5 2xl:w-5"
        />
        <span className="text-base md:text-lg 2xl:text-lg font-semibold text-white">
          FXPAYOUT
        </span>
      </Link>
      <div className="hidden xl:flex gap-4">
        {listNavigation.map(({ code, title, url, sublist }, index) => (
          <div
            key={index}
            className={`relative group flex items-center gap-2 px-2 text-light-gray text-sm 2xl:text-base border-white transition-all duration-300 ease-out`}
          >
            <Link 
              to={getLocalizedPath(url, i18n.language)} 
              className={`${
              active.toLocaleLowerCase() == title.toLocaleLowerCase()
                ? "font-bold"
                : "font-normal"
            } relative py-2 group-hover:font-bold transition-all duration-300`}>
              {t(`navbar.${code}`)}
              {active.toLocaleLowerCase() == title.toLocaleLowerCase() &&
                <div className="absolute top-full left-1/2 -translate-x-1/2 h-1 w-[50%] bg-white rounded-full"></div>
              }
            </Link>
            {sublist !== undefined && 
            <>
              <FaChevronDown className="text-[14px] cursor-pointer group-hover:rotate-180 transition-all duration-200" />
              <div className="absolute py-4 scale-0 group-hover:scale-100 origin-top flex top-full left-0 flex-col bg-white w-60 h-fit shadow-lg rounded-xl transition-all duration-200 delay-200 ease-out">
                {sublist?.map((subNav, idx) => (
                  <HashLink 
                    smooth
                    key={idx} 
                    to={`${getLocalizedPath(subNav.url, i18n.language)}`}
                    className="px-6 py-3 text-black hover:bg-light-gray"
                    scroll={(el) => {
                      setTimeout(() => {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 200);
                    }}>
                    {t(`navbar.subNav.${subNav.code}`)}
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
        {authUser ? 
          <img 
            onClick={() => redirectUser(authUser)}
            src={`https://ui-avatars.com/api/?name=${authUser.username}&background=fff&color=4160FF&bold=true&font-size=0.4`} 
            alt="foto profil"
            className="size-11 rounded-full object-cover border border-white cursor-pointer" />  
        :
        <>
          <Button 
            buttonType="link" 
            urlTo={getLocalizedPath("login", i18n.language)} 
            variant="outline-light" 
            size="lg" 
            className="px-8! py-3! font-medium! text-sm! 2xl:text-base!"
          >
            {t("text.title_login")}
          </Button>
          <Button 
            buttonType="link" 
            urlTo={getLocalizedPath("register", i18n.language)} 
            variant="light" 
            size="lg" 
            className="px-8! py-3! font-medium! text-sm! 2xl:text-base!"
          >
            {t("text.title_register")}
          </Button>
        </>
        }
      </div>
      <RxHamburgerMenu
        onClick={() => setOpenMenu(true)}
        className="block xl:hidden text-2xl text-white cursor-pointer"
      />

      {/* MOBILE MENU */}
      <div
        className="fixed top-0 left-0 px-6 md:px-11 lg:px-18 py-5 flex flex-col xl:hidden bg-primary w-full h-screen max-h-screen overflow-auto transition-all duration-300"
        style={{
          left: openMenu ? "0" : "-100%",
        }}>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <img
              src="/fxpayout-white.svg"
              alt="logo fx payout"
              className="w-4 md:w-5"
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
          {listNavigation.map(({ code, title, url, sublist }, index) => {
            const isSubOpen = openSubMenu === index;
            return (
            <div
              key={index}
              className={`${
                active.toLocaleLowerCase() == title.toLocaleLowerCase()
                  ? "font-bold text-white"
                  : "font-normal text-[#E9E9E9]"
              }
               `}>
              <div
                onClick={() => {
                  if (sublist !== undefined) {
                    handleOpenSubMenu(index);
                  } else if (active.toLocaleLowerCase() == title.toLocaleLowerCase()) {
                    setOpenMenu(false); 
                    setOpenLanguageSelector(false);
                  }
                }} 
                className="relative flex justify-between pb-1 w-full text-base hover:font-bold">
                <Link to={getLocalizedPath(url, i18n.language)}>{t(`navbar.${code}`)}</Link>
                {sublist !== undefined && <FaChevronDown className={`
                  ${isSubOpen ? "rotate-180" : "rotate-0"} text-[14px] transition-all duration-300 ease-out`} />}
                {active.toLocaleLowerCase() == title.toLocaleLowerCase() &&
                  <div className="absolute top-full rounded-full h-1 w-[20%] bg-white"></div>
                }
              </div>
              {sublist !== undefined && isSubOpen && 
                <>
                  <div className="py-2 flex flex-col h-fit font-normal">
                    {sublist?.map((subNav, idx) => (
                      <HashLink key={idx}
                        to={subNav.url} 
                        scroll={(el) => {
                          setTimeout(() => {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }, 200);
                        }}
                        onClick={() => {
                          if (active.toLocaleLowerCase() == title.toLocaleLowerCase()) {
                            setOpenMenu(false); 
                            setOpenLanguageSelector(false);
                          }
                        }}
                        className="px-4 py-2 text-white hover:bg-light-gray">
                        {t(`navbar.subNav.${subNav.code}`)}
                      </HashLink>
                    ))
                    }
                  </div>
                </>
                }
          </div>
          )})}
        </div>
        <div className="px-5 mt-6 flex items-center justify-center w-full gap-2">
          {authUser ? 
            <img 
              onClick={() => redirectUser(authUser)}
              src={`https://ui-avatars.com/api/?name=${authUser.username}&background=fff&color=4160FF&bold=true&font-size=0.4`} 
              alt="foto profil"
              className="size-11 rounded-full object-cover border border-white cursor-pointer" />  
          :
          <>
            <Link to={getLocalizedPath("login", i18n.language)} className="w-fit text-center">
              <span className="block w-fit px-6 py-3 text-base font-medium bg-primary text-white border border-white rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 ease-out">
                {t("text.title_login")}
              </span>
            </Link>
            <Link to={getLocalizedPath("register", i18n.language)} className="w-fit text-center">
              <span className="block w-fit px-6 py-3 text-base font-medium text-black bg-white border border-white rounded-lg hover:bg-[rgba(255,255,255,0.8)] transition-all duration-300 ease-out">
                {t("text.title_register")}
              </span>
            </Link>
          </>
          }
        </div>
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
