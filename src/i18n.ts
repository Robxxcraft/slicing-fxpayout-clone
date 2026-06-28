import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { namespace, resources } from "./locale";


i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lowerCaseLng: true,
    supportedLngs: ["en", "id", "zh", "zh-cn"],
    nonExplicitSupportedLngs: true,
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "path", "cookie"],
      lookupFromPathIndex: 0,
      caches: ["localStorage", "cookie"],
    },
    ns: namespace,
    defaultNS: "common",
    fallbackLng: {
      "zh": ["zh-cn"],
      "zh-Hans": ["zh-cn"],
      "zh-Hans-CN": ["zh-cn"],
      default: ["en"],
    },
    interpolation: { escapeValue: false }
  }, (error) => {
    if (!error) {
      const detectedLng = i18n.language;
      document.documentElement.lang = detectedLng;
    }
  });

i18n.on("languageChanged", (lng: string) => {
  document.documentElement.lang = lng;
});

export default i18n;
