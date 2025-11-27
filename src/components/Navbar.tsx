import { useEffect, useState } from "react";
import { throttle } from "lodash";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";

type Language = {
  code: string;
  label: string;
  flag: string;
}

const languages: Language[] = [
  {code: "id", label: "Indonesia", flag: "flag-id.png"},
  {code: "id", label: "Indonesia", flag: "flag-id.png"},
  {code: "id", label: "Indonesia", flag: "flag-id.png"}
]

const Navbar = ({active}: {active: string;}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChangeLanguage = (lang: Language) => {
    setOpen(false);
    setSelectedLanguage(lang);
  }
  
  return (
    <nav 
      className="w-full fixed px-56 flex items-center justify-between bg-[rgba(65,96,255,0.05)] backdrop-blur-[27.5px] transition-all duration-300"
      style={{ height: scrollY > 10 ? "100px" : "140px" }}  
    >
      <div className="flex gap-2 items-center">
        <img src="/logo.svg" alt="logo fx payout"
          className="w-[50px]" />
        <span className="text-3xl font-semibold text-white">
          FXPAYOUT
        </span>
      </div>
      <div className="flex gap-10">
        {listNavigation.map(({title, url}, index) => (
            <span key={index}
              className="py-2 text-light-gray text-xl border-white"
              style={{ 
                  fontWeight: active.toLocaleLowerCase() == title.toLocaleLowerCase() ? 
                    "700" : "normal",
                  borderBottom: active.toLocaleLowerCase() == title.toLocaleLowerCase() ?
                    "4px solid" : "0px solid"
              }}
            >
              <Link to={url}>
                  {title}
              </Link>
            </span>
        ))}
      </div>
      <div className="flex gap-4 items-center">
        <div className="relative">
          <button className="flex gap-2 items-center cursor-pointer" onClick={() => setOpen(!open)}>
            <img src={`flags/${selectedLanguage.flag}`} alt={`flag-${selectedLanguage.label}`} />
            <span className="text-white text-xl">
              {selectedLanguage.code.toLocaleUpperCase()}
            </span>
            <FaChevronDown color="#ffffff" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s ease" }} />
          </button>
          {open && 
            <div className="absolute top-[120%] py-4 w-60 flex flex-col bg-white rounded-lg">
              {languages.map((lang, idx) => (
                <button key={idx} onClick={() => handleChangeLanguage(lang)}
                  className="py-2 px-4 flex gap-2 items-center cursor-pointer hover:bg-light-gray"
                >
                  <img src={`flags/${lang.flag}`} alt={`flag-${lang.label}`}
                    className="w-8" />
                  <span className="text-black text-xl">
                    {lang.label}
                  </span>
                </button>
              ))}
            </div>
          }
        </div>
        <Link to="#">
          <span className="px-10 py-3 text-xl font-medium text-light-gray border border-white rounded-full">
            Login
          </span>
        </Link>
        <Link to="#">
          <span className="px-10 py-3 text-xl font-medium text-black bg-white border border-white rounded-full">
            Daftar
          </span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;

const listNavigation = [
  {
    title: "Home",
    url: "/"
  },
  {
    title: "Broker",
    url: "/broker"
  },
  {
    title: "Kalkulator",
    url: "/kalkulator"
  },
  {
    title: "Klaim Rebate",
    url: "/klaim-rebate"
  },
  {
    title: "Legal",
    url: "/legal"
  },
]
