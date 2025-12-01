import { type Dispatch } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { languages, type Language } from "../utils/languageSupport";
import type { HandleChangeLanguage } from "./Navbar";

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
  return (
    <div className="relative">
      <button
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setOpen(!open)}>
        <img
          src={`flags/${selectedLanguage.flag}`}
          alt={`flag-${selectedLanguage.label}`}
          className="w-10 xl:w-8"
        />
        <span className="text-black xl:text-white text-xl xl:text-base 2xl:text-xl">
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
        <div className="_no-scrollbar max-h-[250px] overflow-auto absolute bottom-[120%] xl:bottom-auto xl:top-[120%] xl:translate-y-0 py-4 w-60 flex flex-col border border-[rgba(34,34,34,0.1)] bg-white rounded-lg shadow-[0_4px_41.8px_0_rgba(0,0,0,0.1)]">
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
              <span className="text-black text-lg xl:text-base 2xl:text-xl">
                {lang.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
