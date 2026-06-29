import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RTL_LANG } from "@/utils/languageSupport";

const SEO = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  const pathWithoutLang = location.pathname.replace(/^\/id(?=\/|$)/, "");

  useEffect(() => {
    const lang = i18n.resolvedLanguage?.split("-")[0] || "en";
    const isRtl = RTL_LANG.includes(lang.split("-")[0]);

    const canonicalUrl =
      `http://fxpayout.com${location.pathname}`;

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);

    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [location.pathname, i18n.resolvedLanguage]);

  return (
    <>
      <link rel="alternate" href={`https://www.fxpayout.com/id${pathWithoutLang}`} hrefLang="id" />
      <link rel="alternate" href={`https://www.fxpayout.com${pathWithoutLang}`} hrefLang="en" />
      <link rel="alternate" href={`https://www.fxpayout.com${pathWithoutLang}`} hrefLang="x-default" />
    </>
  );
};

export default SEO;