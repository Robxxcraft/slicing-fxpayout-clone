import BalanceContext from "@/context/BalanceContext";
import UserContext from "@/context/UserContext";
import { formattingUsd } from "@/helper/formattingCurrency";
import { NAV_DASHBOARD_CONFIG } from "@/utils/listNavigation";
import { useContext, useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const MobileNavDashboard = ({ onLogout, showMobileNav, setShowMobileNav
}: { 
  onLogout: () => void; 
  showMobileNav: boolean 
  setShowMobileNav: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [authUser] = useContext(UserContext);
  const [balance] = useContext(BalanceContext);
  const [activeNav, setActiveNav] = useState<string>("");
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.split("/").filter(Boolean); 
    if (path[0] && path[0].length === 2) {
      path.shift();
    }
    if (path.length === 3) {
      if (path[2] === "history") {
        setActiveNav("history");
      } else if (path[2] === "import") {
        setActiveNav("import-rebate");
      } else if (path[1] === "rebate") {
        setActiveNav("rebate");
      }
    } else {
      setActiveNav(path[1]);
    }
  }, [pathname]);
  return (
    <div className={`${showMobileNav ? "translate-x-0" : "-translate-x-full"} 
      z-95 block lg:hidden fixed top-0 mt-16 px-5 py-4 w-full h-screen bg-white transition-all duration-300 ease-out overflow-y-auto`}>
      <div className="pb-3 border-b border-disabled">
        <div className="mb-3 flex items-center gap-3">
          <img src={authUser?.profile} alt="foto profil"
            className="size-11 rounded-lg object-cover" />
          <div className="flex flex-col">
            <span className="text-lg font-medium">
              @{authUser?.username}
            </span>
            <span className="text-base">
              {authUser?.fullName}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Balance</p>
          <p>
            {formattingUsd(balance?.balance || 0)} USD
          </p>
        </div>
        {(authUser?.referralCode || authUser?.affiliatorCode) &&
          <div className="flex items-center justify-between">
            <p className="font-semibold">Referral</p>
            <p>{authUser.referralCode || authUser.affiliatorCode}</p>
          </div>
        }
      </div>
      <div className="pt-3">
        {authUser && 
        NAV_DASHBOARD_CONFIG[authUser.role].map((section, idx) => (
          <div
            key={idx}
            onClick={() => setShowMobileNav(false)}
          >
            {section.items.map((navItems, idx) => (
             <Link
               key={idx}
               to={navItems.path} 
               className={`bg-transparent cursor-pointer py-3 flex items-center gap-3
                ${activeNav === navItems.key ? "text-primary" : "text-black/80"}
              `}>
              <p className="text-[22px]">
                <navItems.icon />
              </p>
              <p className="whitespace-nowrap font-medium text-base">
                {navItems.label}
              </p>
             </Link>
           ))}
          </div>
        ))}
        <div 
          onClick={() => {
            setShowMobileNav(false);
            onLogout();
          }}
          className="bg-transparent text-black/90 cursor-pointer py-3 flex items-center gap-3"
        >
          <MdLogout className="text-[22px]" />
          <p className="whitespace-nowrap text-base font-medium">
            Sign Out
          </p>
        </div>
      </div>
    </div>
  )
}

export default MobileNavDashboard;
