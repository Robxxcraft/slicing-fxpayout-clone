import BalanceContext from "@/context/BalanceContext";
import UserContext from "@/context/UserContext";
import { formattingUsd } from "@/helper/formattingCurrency";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const NavbarDashboard = ({ showMobileNav, setShowMobileNav }: {
  showMobileNav: boolean;
  setShowMobileNav: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [authUser] = useContext(UserContext);
  const [balance] = useContext(BalanceContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="fixed w-full font-inter px-4 md:px-10 bg-white border-b border-[#D2CEE1] z-99">
      <div className="flex justify-between items-center h-16 2xl:h-[90px]">
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
            <div className="px-3 2xl:px-4 py-1 2xl:py-2 bg-[#F5F5F5] border border-primary border-dashed rounded-sm">
              <p className="text-lg 2xl:text-xl font-medium text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                {authUser.referralCode || authUser.affiliatorCode}
              </p>
            </div>
          }
          <p className="px-3 2xl:px-4 py-1 2xl:py-2 text-sm 2xl:text-base rounded-sm bg-primary text-white">
            {authUser?.role === "admin" ? "Admin" : authUser?.role === "affiliator" ? "Affiliator" : "Trader"}
          </p>
          <div 
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={authUser?.profile} alt="foto profil"
                className="size-11 rounded-full object-cover" />
              {authUser?.role === "admin" ? (
                <span className="text-base 2xl:text-xl font-medium">
                  {authUser?.username}
                </span>
              ): (
                <div className="flex flex-col">
                  <span className="text-base 2xl:text-xl font-medium">
                    {authUser?.username}
                  </span>
                  <span className="text-sm 2xl:text-base">
                    { 
                      `${formattingUsd(balance?.balance || 0)} USD`
                    }
                  </span>
                </div>
              )}
            </div>
            <AnimatePresence>
              {isOpen &&
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 6 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 6 }}
                className="absolute top-full right-0 pt-4 2xl:pt-6">
                <div className="p-5 2xl:p-6 w-[260px] 2xl:w-[320px] bg-white rounded-sm shadow-xl">
                  <div className="pb-3 border-b border-disabled">
                    <div className="mb-3 flex items-center gap-3">
                      <img src={authUser?.profile} alt="foto profil"
                        className="size-11 rounded-lg object-cover" />
                      <div className="flex flex-col">
                        <span className="text-lg 2xl:text-xl font-medium">
                          @{authUser?.username}
                        </span>
                        <span className="text-base 2xl:text-lg">
                          {authUser?.fullName}
                        </span>
                      </div>
                    </div>
                    {authUser?.role !== "admin" && 
                    <>
                      <div className="flex items-center justify-between text-base 2xl:text-lg">
                        <p className="font-semibold">Balance</p>
                        <p>
                          {formattingUsd(balance?.balance || 0)} USD
                        </p>
                      </div>
                      {(authUser?.referralCode || authUser?.affiliatorCode) &&
                        <div className="flex items-center justify-between text-base 2xl:text-lg">
                          <p className="font-semibold">Referral</p>
                          <p>{authUser.referralCode || authUser.affiliatorCode}</p>
                        </div>
                      }
                    </>
                    }
                  </div>
                </div>
              </motion.div>
              }
            </AnimatePresence>
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
