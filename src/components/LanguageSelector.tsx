import { type Dispatch } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { languages, type Language } from "../utils/languageSupport";
import type { HandleChangeLanguage } from "./Navbar";
import { IoArrowBackOutline } from "react-icons/io5";

const LanguageSelector = ({
  selectedLanguage,
  open,
  setOpen,
  onChangeLanguage,
}: {
  selectedLanguage: Language;
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  onChangeLanguage: HandleChangeLanguage;
}) => {
  // const [openOption, setOpenOption] = useState<boolean>(false);
  
  return (
    <div className="xl:relative">
      <button
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setOpen(!open)}>
        <img
          src={`/flags/${selectedLanguage.flag}`}
          alt={`flag-${selectedLanguage.label}`}
          className="w-8"
        />
        <span className="text-white text-base 2xl:text-xl">
          {selectedLanguage.code.toLocaleUpperCase()}
        </span>
        <FaChevronDown
          className="text-white"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "0.3s ease",
          }}
        />
      </button>
          
      {/* DESKTOP */}
      <div className={`_no-scrollbar hidden xl:flex max-h-[250px] overflow-auto absolute right-0 bottom-[120%] xl:bottom-auto xl:top-[120%] xl:translate-y-0 py-4 w-60 flex-col border border-[rgba(34,34,34,0.1)] bg-white rounded-lg shadow-[0_4px_41.8px_0_rgba(0,0,0,0.1)] origin-top-right transition-all duration-300 ease-out ${open ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}`}>
        {languages.map((lang, idx) => (
          <button
            key={idx}
            onClick={() => onChangeLanguage(lang)}
            className="py-2 px-4 flex gap-2 items-center cursor-pointer hover:bg-light-gray">
            <img
              src={`/flags/${lang.flag}`}
              alt={`flag-${lang.label}`}
              className="w-8"
            />
            <span className="text-black text-base 2xl:text-xl">
              {lang.label}
            </span>
          </button>
        ))}
      </div>

      {/* MOBILE */}
      {open && 
        <div className="flex flex-col xl:hidden px-6 md:px-11 lg:px-18 absolute top-18 left-0 w-full h-screen bg-primary">
          <div>
            <button 
              onClick={() => setOpen(false)}
              className="py-3 w-full flex gap-1 items-center-safe text-left text-white h-fit border-b border-white/15 cursor-pointer">
              <IoArrowBackOutline />
              Bahasa
            </button>
          </div>
          <div className="mt-6 flex flex-col gap-6">
            {languages.map((lang, idx) => (
              <button
                key={idx}
                onClick={() => onChangeLanguage(lang)}
                className="flex gap-2 items-center cursor-pointer hover:font-bold">
                <span className="text-white text-base 2xl:text-xl">
                  {lang.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default LanguageSelector;
