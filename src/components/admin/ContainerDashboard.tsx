import AsideDashboard from "./AsideDashboard";
import NavbarDashboard from "./NavbarDashboard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useTranslation } from "react-i18next";
import UserContext from "@/context/UserContext";
import { useRedirectGuest } from "@/hooks/useRedirectGuest";
import { useRedirectByRole } from "@/hooks/useRedirectByRole";
import { UserModel } from "@/models/user.model";
import MobileNavDashboard from "../dashboard/common/MobileNavDashboard";
import { putAccessToken } from "@/services/apiClient";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";
import { clearCacheAuthUser } from "@/helper/clearCacheAuthUser";

const ContainerDashboard = () => {
  const { i18n } = useTranslation();
  const [initialization, setInitialization] = useState<boolean>(true);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useContext(UserContext);
  const { redirectLogin } = useRedirectGuest();
  const { redirectUser } = useRedirectByRole(); 
  const { pathname } = useLocation(); 
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);
  
  useLockBodyScroll(showMobileNav);
  
  useEffect(() => {
    if (isLogout) {
      navigate(getLocalizedPath("/", i18n.language));
      return;
    }

    if (!authUser) {
      redirectLogin();
      return;
    }

    const isWrongPath = 
      (authUser.role === "user" && !pathname.includes("/trader")) ||
      (authUser.role === "affiliator" && !pathname.includes("/affiliator")) ||
      (authUser.role === "admin" && !pathname.includes("/dashboard"));
    if (isWrongPath) {
      redirectUser(authUser);
    }

    if (UserModel.isIncompleteProfile(authUser)) {
      navigate(getLocalizedPath("profile-register", i18n.language));
      return;
    }

    setInitialization(false);
  }, [authUser, i18n.language, navigate, pathname, redirectUser, redirectLogin, isLogout]);


  if (initialization) {
    return null;
  }

  const handleLogoutUser = () => {
    setIsLogout(true);
    putAccessToken("");
    clearCacheAuthUser();
    setAuthUser(null);
  }

  return (
    <>
      <NavbarDashboard showMobileNav={showMobileNav} setShowMobileNav={setShowMobileNav} />
      <div className="flex min-h-[calc(100vh)] font-inter">
        {/* Dekstop Aside/Nav */}
        <AsideDashboard onLogout={handleLogoutUser} />
        {/* Mobile Aside/Nav */}
        <MobileNavDashboard onLogout={handleLogoutUser} showMobileNav={showMobileNav} setShowMobileNav={setShowMobileNav} />
        <div className="mt-16 2xl:mt-[90px] relative flex-1 flex flex-col min-h-[calc(100vh-80px)] w-full overflow-x-auto">
          {<Outlet />}
        </div>
      </div>
    </>
  )
}

export default ContainerDashboard;
