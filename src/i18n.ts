import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { namespace, resources } from "./locale";


i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ["localStorage", "cookie", "path", "htmlTag", "navigator"],
      lookupFromPathIndex: 0,
      caches: ["localStorage", "cookie"],
    },
    ns: namespace,
    defaultNS: "common",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
