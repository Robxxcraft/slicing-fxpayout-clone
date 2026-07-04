import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoSidebarCollapse } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import UserContext from "@/context/UserContext";
import { NAV_DASHBOARD_CONFIG } from "@/utils/listNavigation";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa6";
import { IoCardOutline, IoWalletOutline } from "react-icons/io5";

const AsideDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const { i18n } = useTranslation();
  const [isCollapse, setIsCollapse] = useState<boolean>(true);
  const [authUser] = useContext(UserContext);
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
    <aside
      className={`${isCollapse ? "max-w-60 3xl:max-w-[360px] w-60 3xl:w-[360px]" : "max-w-[72px] w-[72px]"}
        hidden lg:flex z-99 overflow-hidden fixed md:sticky left-0 top-16 3xl:top-[90px] md:mt-16 flex-col justify-between bg-white border-t border-r border-[#D2CEE1] transition-all duration-300 ease-out h-[calc(100dvh-64px)] 3xl:h-[calc(100dvh-90px)]`}
    >
      <div className="scrollbar-thin overflow-y-auto overflow-x-hidden">
        <div
          onClick={() => setIsCollapse(!isCollapse)} 
          className="px-7 py-3 3xl:py-4 flex gap-2 items-center text-black/60 border-b border-[#D2CEE1] cursor-pointer hover:bg-[#F5F5F5] transition-all duration-300 ease-out"
        >
          <GoSidebarCollapse 
            style={{ rotate: isCollapse ? "180deg" : "0deg" }}
            className="shrink-0 text-lg 3xl:text-xl transition-all duration-300 ease-out" />
          {isCollapse &&
            <p className="whitespace-nowrap text-sm 3xl:text-lg font-medium">
              Collapse Menu
            </p>
          }
        </div>
        {authUser &&
          NAV_DASHBOARD_CONFIG[authUser.role].map((section, idx) => (
            <div key={idx} className="mt-4 3xl:mt-5 px-4">
              <span
                style={{ 
                  borderBottomWidth: idx === 0 || isCollapse ? "0px" : "1px",
                  marginBottom: isCollapse ? "12px" : "26px"
                }} 
                className="block border-black/40 whitespace-nowrap text-sm 3xl:text-lg font-medium text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text"
              >
                {isCollapse &&
                  section.title
                }
              </span>
              {section.items.map((navItems, index) => (
                <Link
                  key={index}
                  to={getLocalizedPath(navItems.path, i18n.language)} 
                  className={`${activeNav === navItems.key ? "bg-primary text-white" : "bg-transparent text-black/60 cursor-pointer hover:bg-[#F5F5F5] transition-all"}
                    ${isCollapse ? "justify-start": "justify-center"}
                    mb-1 px-3 py-2 flex items-center gap-2 rounded-md`}
                >
                  <span className={`
                    ${navItems.icon === FaUser ? "text-sm 3xl:text-lg" : 
                      navItems.icon === IoCardOutline || navItems.icon === IoWalletOutline ? "text-xl 3xl:text-2xl" :
                      "text-lg 3xl:text-xl"} 
                    shrink-0`
                  }>
                    <navItems.icon />
                  </span>
                  {isCollapse &&
                    <p className="whitespace-nowrap text-sm 3xl:text-lg font-medium">
                      {navItems.label}
                    </p>
                  }
                </Link>
              ))}
            </div>
          ))
        }
      </div>
      <div className="mb-3 3xl:mb-4 px-4">
        <div 
          onClick={onLogout}
          className="px-3 py-2 3xl:py-4 flex items-center gap-2 rounded-md bg-transparent text-black/60 cursor-pointer hover:bg-[#F5F5F5] transition-all duration-300 ease-out"
        >
          <MdLogout className="shrink-0 text-lg 3xl:text-xl" />
          {isCollapse &&
            <p className="whitespace-nowrap text-sm 3xl:text-lg font-medium">
              Sign Out
            </p>
          }
        </div>
      </div>
    </aside>
  )
}

export default AsideDashboard;
