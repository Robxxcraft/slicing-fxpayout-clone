import { DEFAULT_LANGUAGE, SUPPORT_LANGUAGE } from "@/utils/languageSupport";
import type { NavigateFunction } from "react-router-dom";

export const getLocalizedPath = (path: string, currentLng: string) => {
  if (path === "#") return "#";
  // 1. Bersihkan path dari prefix bahasa yang sudah ada (mencegah /id/id/broker)
  const cleanPath = path.replace(/^\/(id|en|jp|fr)\//, '/').replace(/^\/(id|en|jp|fr)$/, '/');
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

  if (currentLng === "en") {
    return normalizedPath;
  }
  return `/${currentLng}${normalizedPath === '/' ? '' : normalizedPath}`;
};

export const navigateChangeLng = (newLng: string, navigate: NavigateFunction, pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);

  if (SUPPORT_LANGUAGE.includes(segments[0])) {
    segments.shift()
  }
  if (newLng === DEFAULT_LANGUAGE) {
    navigate(`/${segments.join("/")}`);
  } else {
    navigate(`/${newLng}/${segments.join("/")}`);
  }
};
