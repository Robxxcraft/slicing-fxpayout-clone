import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import idTranslation from "./locale/id.json";
import enTranslation from "./locale/en.json";

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ["path", "localStorage", "cookie", "htmlTag", "navigator"],
      lookupFromPathIndex: 0,
      caches: ["localStorage", "cookie"]
    },
    resources: {
      id: { translation: idTranslation },
      en: { translation: enTranslation },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;