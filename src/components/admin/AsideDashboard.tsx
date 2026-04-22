import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoSidebarCollapse } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import UserContext from "@/context/UserContext";
import { NAV_DASHBOARD_CONFIG } from "@/utils/listNavigation";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useTranslation } from "react-i18next";

const AsideDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const { i18n } = useTranslation();
  const [isCollapse, setIsCollapse] = useState<boolean>(true);
  const [activeNav, setActiveNav] = useState<string>("");
  const { pathname } = useLocation();
  const [authUser] = useContext(UserContext);

  useEffect(() => {
    const path = pathname.split("/").filter(Boolean); 
    if (path[0] && path[0].length === 2) {
      path.shift();
    }
    if (path.length === 3 && path[2] === "history") {
      setActiveNav("history");
    } else {
      setActiveNav(path[1]);
    }
  }, [pathname]);

  return (
    <aside
      style={{ 
        maxWidth: isCollapse ? "240px" : "72px",
        width: isCollapse ? "240px" : "72px",
      }} 
      className="hidden lg:flex z-99 overflow-hidden fixed md:sticky left-0 top-16 md:mt-16 flex-col justify-between bg-white border-t border-r border-[#D2CEE1] transition-all duration-300 ease-out h-[calc(100vh-64px)]"
    >
      <div className="overflow-y-auto overflow-x-hidden">
        <div
          onClick={() => setIsCollapse(!isCollapse)} 
          className="px-7 py-3 flex gap-2 items-center text-black/60 border-b border-[#D2CEE1] cursor-pointer hover:bg-black/5 transition-all duration-300 ease-out"
        >
          <GoSidebarCollapse 
            style={{ rotate: isCollapse ? "180deg" : "0deg" }}
            className="text-base transition-all duration-300 ease-out" />
          {isCollapse &&
            <p className="whitespace-nowrap text-sm font-medium">
              Collapse Menu
            </p>
          }
        </div>
        {authUser &&
          NAV_DASHBOARD_CONFIG[authUser.role].map((section, idx) => (
            <div key={idx} className="mt-4 px-4">
              <span
                style={{ 
                  borderBottomWidth: idx === 0 || isCollapse ? "0px" : "1px",
                  marginBottom: isCollapse ? "12px" : "26px"
                }} 
                className="block border-black/40 whitespace-nowrap text-sm font-medium text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text"
              >
                {isCollapse &&
                  section.title
                }
              </span>
              {section.items.map((navItems, index) => (
                <Link
                  key={index}
                  to={getLocalizedPath(navItems.path, i18n.language)} 
                  className={`${activeNav === navItems.key ? "bg-primary text-white" : "bg-transparent text-black/60 cursor-pointer hover:bg-black/5 transition-all"}
                    mb-1 px-3 py-2 flex items-center gap-2 rounded-md`}
                >
                  <navItems.icon />
                  {isCollapse &&
                    <p className="whitespace-nowrap text-sm font-medium">
                      {navItems.label}
                    </p>
                  }
                </Link>
              ))}
            </div>
          ))
        }
      </div>
      <div className="mb-3 px-4">
        <div 
          onClick={onLogout}
          className="px-3 py-2 flex items-center gap-2 rounded-md bg-transparent text-black/60 cursor-pointer hover:bg-black/5 transition-all duration-300 ease-out"
        >
          <MdLogout className="text-base" />
          {isCollapse &&
            <p className="whitespace-nowrap text-sm font-medium">
              Sign Out
            </p>
          }
        </div>
      </div>
    </aside>
  )
}

export default AsideDashboard;
