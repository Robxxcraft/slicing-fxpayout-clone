import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoSidebarCollapse } from "react-icons/go";
import { PiClipboardTextFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { putAccessToken } from "@/utils/api";

type NavSideDashboard = "validation-data" | "profile";
const SUPPORT_NAV_SIDE_DASHBOARD: string[] = ["validation-data", "profile"]; 

const AsideDashboard = () => {
  const [isCollapse, setIsCollapse] = useState<boolean>(true);
  const [activeNav, setActiveNav] = useState<NavSideDashboard>("validation-data");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = pathname.split("/")[2];
    if (SUPPORT_NAV_SIDE_DASHBOARD.includes(path)) {
      setActiveNav(path as NavSideDashboard);
    }
  }, [pathname]);

  const handleLogoutUser = () => {
    putAccessToken("");
    navigate("/");
  }

  return (
    <aside
      style={{ 
        maxWidth: isCollapse ? "256px" : "80px",
        width: isCollapse ? "256px" : "80px",
      }} 
      className="z-99 overflow-hidden fixed md:sticky left-0 top-20 md:mt-20 flex flex-col justify-between bg-white border-t border-r border-[#D2CEE1] transition-all duration-300 ease-out h-[calc(100vh-80px)]"
    >
      <div>
        <div
          onClick={() => setIsCollapse(!isCollapse)} 
          className="px-7 py-3 flex gap-4 items-center text-black/60 border-b border-[#D2CEE1] cursor-pointer hover:bg-black/5 transition-all duration-300 ease-out"
        >
          <GoSidebarCollapse 
            style={{ rotate: isCollapse ? "180deg" : "0deg" }}
            className="text-xl transition-all duration-300 ease-out" />
          {isCollapse &&
            <p className="whitespace-nowrap text-base font-medium">
              Collapse Menu
            </p>
          }
        </div>
        <div className="mt-6 px-4">
          <span
            style={{ 
              borderBottomWidth: isCollapse ? "0px" : "1px",
              marginBottom: isCollapse ? "12px" : "26px"
            }} 
            className="block border-black/40 whitespace-nowrap text-base font-medium text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text"
          >
            {isCollapse &&
              "Content Management"
            }
          </span>
          <Link
            to={"/dashboard/validation-data"} 
            className={`${activeNav === "validation-data" ? "bg-primary text-white" : "bg-transparent text-black/60 cursor-pointer hover:bg-black/5 transition-all"}
              px-3 py-2.5 flex items-center gap-2 rounded-md`}
          >
            <PiClipboardTextFill className="text-xl" />
            {isCollapse &&
              <p className="whitespace-nowrap text-base font-medium">
                  Data Validasi
              </p>
            }
          </Link>
        </div>
        <div className="mt-6 px-4">
          <span
            style={{ 
              borderBottomWidth: isCollapse ? "0px" : "1px",
              marginBottom: isCollapse ? "12px" : "26px"
            }} 
            className="block border-black/40 whitespace-nowrap text-base font-medium text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text"
          >
            {isCollapse &&
              "Settings"
            }
          </span>
          <Link
            to={"/dashboard/profile"} 
            className={`${activeNav === "profile" ? "bg-primary text-white" : "bg-transparent text-black/60 cursor-pointer hover:bg-black/5 transition-all"}
              px-3 py-2.5 flex items-center gap-2 rounded-md duration-300 ease-out`}
          >
            <FaUser className="text-lg" />
            {isCollapse &&
              <p className="whitespace-nowrap text-base font-medium">
                Profil
              </p>
            }
          </Link>
        </div>
      </div>
      <div className="mb-6 px-4">
        <div 
          onClick={handleLogoutUser}
          className="px-3 py-2.5 flex items-center gap-2 rounded-md bg-transparent text-black/60 cursor-pointer hover:bg-black/5 transition-all duration-300 ease-out"
        >
          <MdLogout className="text-xl" />
          {isCollapse &&
            <p className="whitespace-nowrap text-base font-medium">
              Sign Out
            </p>
          }
        </div>
      </div>
    </aside>
  )
}

export default AsideDashboard;
