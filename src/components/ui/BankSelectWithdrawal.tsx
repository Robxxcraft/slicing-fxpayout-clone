import { showLastFourWalletAddress } from "@/helper/formattingWithdrawal";
import type { BankUser } from "@/types/bank.type";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react"
import { FaChevronDown } from "react-icons/fa6";

type BankSelectWithdrawalProps = {
  objectsInput: BankUser[];
  selectedMethod: BankUser;
  setSelectedMethod: React.Dispatch<React.SetStateAction<BankUser>>;
  positionDrop?: "left" | "center" | "right";
  positionY?: "down" | "up";
  isLoading: boolean;
};

const BankSelectWithdrawal = ({
  objectsInput,
  selectedMethod,
  setSelectedMethod,
  positionDrop="right",
  positionY="down",
  isLoading
}: BankSelectWithdrawalProps) => {
  let positionCL; 
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseClickOutside = () => {
      if (dropdownRef.current && !dropdownRef.current.contains(event?.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseClickOutside);
    return () => document.removeEventListener("mousedown", handleMouseClickOutside);
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChange = (bank: BankUser) => {
    setSelectedMethod(bank);
    setOpen(false);
  };

  if (positionDrop === "right") {
    positionCL = "right-0";
  } else if (positionDrop === "left") {
    positionCL = "left-0";
  } else if (positionDrop === "center") {
    positionCL = "left-1/2 -translate-x-1/2";
  }

  if (positionY === "down") {
    positionCL += " pt-1 top-full origin-top";
  } else if (positionY === "up") {
    positionCL += " bottom-[calc(100%+6px)] origin-bottom";
  }

  return (
    <div ref={dropdownRef} className={`relative select-none w-full`}>
      <p className="mb-3 text-base 2xl:text-xl font-medium text-[#344054]">
        Metode Penarikan
      </p>
      <div
        tabIndex={0} 
        onClick={() => {
          if (!isLoading) {
            handleOpen();
          }
        }}
        className={` ${isLoading ? "bg-[#F5F5F5] cursor-not-allowed" : "bg-white cursor-pointer"}
        py-4 2xl:py-6 px-4 flex items-center justify-between gap-2 w-full border border-[#CED4DA] rounded-md focus:outline-primary/60 focus:outline-2 focus:bg-[#F5F5F5] hover:bg-[#F5F5F5] transition-[background] duration-300`}>
        <div className="flex gap-4 items-center">
          <img src="/bank-icon.svg" alt="Bank Icon" />
          <p className="text-base 2xl:text-xl text-black/80 text-nowrap">
            {isLoading ? "<Pilih Metode>"
            : selectedMethod.bank.toLowerCase() === "crypto" ?
                "Crypto" :
                `${selectedMethod.bank} •••• ${showLastFourWalletAddress(selectedMethod.accountNumber)}`
            }
          </p>
        </div>
        <FaChevronDown 
          className="text-base text-black/60"
        />
      </div>
      {isLoading && 
        <p className="mt-2 text-sm 2xl:text-lg text-black/60">Sedang memuat data bank...</p>
      }
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ originY: positionY === "down" ? 0 : 1, willChange: "transform, opacity" }}
          className={`${positionCL} absolute z-9999 left-0 right-0`}>
          <div className={`scrollbar-thin primary-scrollbar p-2 w-full h-fit space-y-1 border border-[#DDDDDD] bg-white rounded-lg shadow-lg overflow-y-auto`}>
            {objectsInput.map((item) => {
              if (item.bank.toLowerCase() === "crypto") {
                return (
                  <div 
                    key={item.id}
                    onClick={() => handleChange(item)}
                    className="group px-2 py-1 flex gap-4 w-full hover:bg-[#F5F5F5] rounded-md cursor-pointer">
                    <img src="/bank-icon.svg" alt="Bank Icon" 
                      className="scale-90" />
                    <div>
                      <p className="text-base 2xl:text-xl text-black/80 group-hover:text-primary font-medium">
                        Crypto
                      </p>
                      <p className="text-sm 2xl:text-lg text-black/60 font-medium">
                        Crypto Method
                      </p>
                    </div>
                  </div>
                )
              }
              
              return (
              <div 
                key={item.id}
                onClick={() => handleChange(item)}
                className="group px-2 py-1 flex gap-4 w-full hover:bg-[#F5F5F5] rounded-md cursor-pointer">
                <img src="/bank-icon.svg" alt="Bank Icon" 
                  className="scale-90" />
                <div>
                  <p className="text-base 2xl:text-xl text-black/80 group-hover:text-primary font-medium">
                    {item.bank} •••• {" "}
                    {showLastFourWalletAddress(item.accountNumber)}
                  </p>
                  <p className="text-sm 2xl:text-lg text-black/60 font-medium">
                    Bank Method
                  </p>
                </div>
              </div>
            )})}
          </div>
        </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default BankSelectWithdrawal;
