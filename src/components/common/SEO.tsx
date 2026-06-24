import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SEO = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.resolvedLanguage?.split("-")[0] || "en";

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
  }, [location.pathname, i18n.resolvedLanguage]);

  return (
    <>
      <link rel="alternate" href={`https://www.fxpayout.com/id${location.pathname}`} hrefLang="id" />
      <link rel="alternate" href={`https://www.fxpayout.com${location.pathname}`} hrefLang="en" />
      <link rel="alternate" href={`https://www.fxpayout.com${location.pathname}`} hrefLang="x-default" />
    </>
  );
};

export default SEO;