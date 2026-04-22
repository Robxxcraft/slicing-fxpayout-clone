import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/helper/pathHelper";

export const useRedirectGuest = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  const redirectLogin = () => {
    if (pathname.includes("/login")) return; 
    navigate(getLocalizedPath(`/login?next=${pathname}`, i18n.language));
  };

  return { redirectLogin };
};
