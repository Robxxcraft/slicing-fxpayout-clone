import { useEffect, useState } from "react";
import { throttle } from "lodash";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { languages, type Language } from "../utils/languageSupport";
import LanguageSelector from "./LanguageSelector";
import { listNavigation } from "../utils/listNavigation";

export type HandleChangeLanguage = (lang: Language) => void;

const Navbar = ({ active }: { active: string }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
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

  return (
    <nav
      className="z-99999999 w-full fixed px-5 xl:px-24 2xl:px-56 max-h-[90px] 2xl:max-h-full flex items-center justify-between bg-[rgba(65,96,255,0.5)] backdrop-blur-[27.5px] transition-all duration-300"
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
          src="/logo.svg"
          alt="logo fx payout"
          className="w-8 2xl:w-[50px]"
        />
        <span className="text-xl 2xl:text-3xl font-semibold text-white">
          FXPAYOUT
        </span>
      </div>
      <div className="hidden xl:flex gap-6">
        {listNavigation.map(({ title, url }, index) => (
          <span
            key={index}
            className={`${
              active.toLocaleLowerCase() == title.toLocaleLowerCase()
                ? "font-bold"
                : "font-normal"
            } py-2 px-2 text-light-gray text-base 2xl:text-xl border-white hover:font-bold transition-all duration-300 ease-out`}
            style={{
              borderBottom:
                active.toLocaleLowerCase() == title.toLocaleLowerCase()
                  ? "4px solid"
                  : "0px solid",
            }}>
            <Link to={url}>{title}</Link>
          </span>
        ))}
      </div>
      <div className="hidden xl:flex gap-4 items-center">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          open={openLanguageSelector}
          setOpen={setOpenLanguageSelector}
          onChangeLanguage={handleChangeLanguage}
        />
        <Link to="#">
          <span className="px-6 2xl:px-10 py-3 text-base 2xl:text-xl font-medium text-light-gray border border-white rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 ease-out">
            Login
          </span>
        </Link>
        <Link to="#">
          <span className="px-6 2xl:px-10 py-3 text-base 2xl:text-xl font-medium text-black bg-white border border-white rounded-full hover:bg-[rgba(255,255,255,0.8)] transition-all duration-300 ease-out">
            Daftar
          </span>
        </Link>
      </div>
      <RxHamburgerMenu
        onClick={() => setOpenMenu(true)}
        className="block xl:hidden text-[28px] text-white"
      />

      {/* MOBILE MENU */}

      <div
        className="fixed top-0 left-0 py-10 flex flex-col xl:hidden bg-white w-full min-h-screen overflow-scroll transition-all duration-300"
        style={{
          left: openMenu ? "0" : "-100%",
        }}>
        <div className="px-5 md:px-10 mb-6 flex item-center justify-between">
          <div className="flex gap-2 items-center">
            <img
              src="/logoBlue.svg"
              alt="logo fx payout"
              className="w-[50px]"
            />
            <span className="text-3xl font-semibold text-primary">
              FXPAYOUT
            </span>
          </div>
          <IoClose onClick={() => setOpenMenu(false)} className="text-[40px]" />
        </div>
        {listNavigation.map(({ title, url }, index) => (
          <span
            key={index}
            className={`${
              active.toLocaleLowerCase() == title.toLocaleLowerCase()
                ? "font-bold"
                : "font-normal"
            } py-4 px-5 md:px-10 text-black text-2xl md:text-4xl border-b border-black/30 hover:font-bold transition-all duration-300 ease-out`}>
            <Link to={url}>{title}</Link>
          </span>
        ))}
        <div className="px-10 mt-6">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            open={openLanguageSelector}
            setOpen={setOpenLanguageSelector}
            onChangeLanguage={handleChangeLanguage}
          />
        </div>
        <div className="px-5 md:px-10 mt-4 flex items-center w-full gap-4">
          <Link to="#" className="w-full text-center">
            <span className="block w-full py-3 text-xl font-medium bg-primary text-white border border-white rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 ease-out">
              Login
            </span>
          </Link>
          <Link to="#" className="w-full text-center">
            <span className="block w-full py-3 text-base 2xl:text-xl font-medium text-black bg-white border border-black rounded-full hover:bg-[rgba(255,255,255,0.8)] transition-all duration-300 ease-out">
              Daftar
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
