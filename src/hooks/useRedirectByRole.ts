import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { UserProfile } from "@/types/user.type";
import { getLocalizedPath } from "@/helper/pathHelper";

export const useRedirectByRole = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const redirectUser = (authUser: UserProfile | null, path?: string) => {
    if (!authUser) return;

    const lang = i18n.language;
    const fixPath = path ? path : "overview";
    if (authUser.role === "admin") {
      path = getLocalizedPath("/dashboard", lang);
    } else if (authUser.role === "affiliator") {
      path = getLocalizedPath(`/affiliator/${fixPath}`, lang);
    } else {
      path = getLocalizedPath(`/trader/${fixPath}`, lang);
    }

    navigate(path);
  };

  return { redirectUser };
};
