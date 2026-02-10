import type { UserProfile } from "@/models/user";
import { Link } from "react-router-dom";

const NavbarDashboard = ({ authUser }: { 
  authUser: UserProfile;
}) => {
  return (
    <nav className="fixed w-full font-inter px-4 md:px-10 bg-white border-b border-[#D2CEE1] z-99">
      <div className="flex justify-between items-center h-20">
        <Link to="/" className="flex gap-2 items-center">
          <img
            src="/fxpayout-blue.svg"
            alt="logo fx payout"
            className="mb-2 lg:mb-3 w-5 lg:w-6 2xl:w-8"
          />
          <span className="text-2xl 2xl:text-3xl font-semibold text-primary">
            FXPAYOUT
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <p className="hidden md:block px-2 py-1 rounded-sm bg-primary text-white">
            {authUser.role === "admin" ? "Admin" : "User"}
          </p>
          <div className="flex items-center gap-2">
            <img src={authUser.profile} alt="foto profil"
              className="size-11 rounded-full object-cover" />
            <span className="text-[18px] font-medium">
              {authUser.username}
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarDashboard;
