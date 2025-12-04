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
    <div className="lg:relative">
      <button
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setOpen(!open)}>
        <img
          src={`flags/${selectedLanguage.flag}`}
          alt={`flag-${selectedLanguage.label}`}
          className="w-8"
        />
        <span className="text-black xl:text-white text-base 2xl:text-xl">
          {selectedLanguage.code.toLocaleUpperCase()}
        </span>
        <FaChevronDown
          className="text-black xl:text-white"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "0.3s ease",
          }}
        />
      </button>
      {open && (
        <>
          // DESKTOP
          <div className="_no-scrollbar hidden max-h-[250px] overflow-auto absolute bottom-[120%] lg:bottom-auto lg:top-[120%] lg:translate-y-0 py-4 w-60 lg:flex flex-col border border-[rgba(34,34,34,0.1)] bg-white rounded-lg shadow-[0_4px_41.8px_0_rgba(0,0,0,0.1)]">
            {languages.map((lang, idx) => (
              <button
                key={idx}
                onClick={() => onChangeLanguage(lang)}
                className="py-2 px-4 flex gap-2 items-center cursor-pointer hover:bg-light-gray">
                <img
                  src={`flags/${lang.flag}`}
                  alt={`flag-${lang.label}`}
                  className="w-8"
                />
                <span className="text-black text-base 2xl:text-xl">
                  {lang.label}
                </span>
              </button>
            ))}
          </div>

          // MOBILE
          <div className="absolute top-20 left-0 w-full h-screen border-t border-black/30 bg-white">
            <div className="px-4 pt-5">
              <button 
                onClick={() => setOpen(false)}
                className="py-3 w-full flex gap-1 items-center-safe text-left h-fit border-b border-black/15">
                <IoArrowBackOutline />
                Kembali
              </button>
            </div>
            <div className="mt-4">
              {languages.map((lang, idx) => (
                <button
                  key={idx}
                  onClick={() => onChangeLanguage(lang)}
                  className="py-2 px-4 flex gap-2 items-center cursor-pointer hover:bg-light-gray">
                  <span className="text-black text-base 2xl:text-xl">
                    {lang.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>

      )}
    </div>
  );
};

export default LanguageSelector;
