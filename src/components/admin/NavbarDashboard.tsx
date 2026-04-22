import BalanceContext from "@/context/BalanceContext";
import UserContext from "@/context/UserContext";
import { formattingUsd } from "@/helper/formattingCurrency";
import React, { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const NavbarDashboard = ({ showMobileNav, setShowMobileNav }: {
  showMobileNav: boolean;
  setShowMobileNav: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [authUser] = useContext(UserContext);
  const [balance] = useContext(BalanceContext);
  return (
    <nav className="fixed w-full font-inter px-4 md:px-10 bg-white border-b border-[#D2CEE1] z-99">
      <div className="flex justify-between items-center h-16">
        <Link to="/" className="flex gap-2 items-center">
          <img
            src="/fxpayout-blue.svg"
            alt="logo fx payout"
            className="mb-2 w-4 lg:w-5 2xl:w-7"
          />
          <span className="text-base md:text-xl 2xl:text-2xl font-semibold text-primary">
            FXPAYOUT
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-3">
          {(authUser?.referralCode || authUser?.affiliatorCode) &&
            <div className="px-3 py-1 bg-black/5 border border-primary border-dashed rounded-sm">
              <p className="text-lg font-medium text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                {authUser.referralCode || authUser.affiliatorCode}
              </p>
            </div>
          }
          <p className="px-3 py-1 text-sm rounded-sm bg-primary text-white">
            {authUser?.role === "admin" ? "Admin" : authUser?.role === "affiliator" ? "Affiliator" : "Trader"}
          </p>
          <div className="flex items-center gap-2">
            <img src={authUser?.profile} alt="foto profil"
              className="size-11 rounded-full object-cover" />
            {authUser?.role === "admin" ? (
              <span className="text-base font-medium">
                {authUser?.username}
              </span>
            ): (
              <div className="flex flex-col">
                <span className="text-base font-medium">
                  {authUser?.username}
                </span>
                <span className="text-sm">
                  { 
                    `${formattingUsd(balance?.balance || 0)} USD`
                  }
                </span>
              </div>
            )}
          </div>
        </div>
        <div className={`${showMobileNav ? "bg-linear-to-t" : "bg-transparent"}
          flex lg:hidden justify-center items-center size-8 from-dark-primary to-primary rounded-sm cursor-pointer`}>
          <RxHamburgerMenu
            onClick={() => setShowMobileNav(!showMobileNav)}
            className={`${showMobileNav ? "text-white": "text-black"} text-2xl`}
          />
        </div>
      </div>
    </nav>
  )
}

export default NavbarDashboard;
