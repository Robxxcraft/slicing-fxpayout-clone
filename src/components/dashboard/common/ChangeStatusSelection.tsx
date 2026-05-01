import { statusMapNoPendingAll } from "@/utils/dataDropdownDashboard";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const ChangeStatusSelection = ({
  selectedNumber,
  onClose,
  onChangeStatus
}: {
  selectedNumber: number;
  onClose: () => void;
  onChangeStatus: (key: string) => void;
}) => {
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

  const handleChange = (key: string) => {
    onChangeStatus(key);
    setOpen(false);
  };

  return (
    <div className="select-none fixed bottom-8 left-1/2 -translate-x-1/2 lg:translate-x-0 flex items-center bg-white rounded-2xl shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
      <div className="pl-4 pr-1 py-1 flex items-center gap-1 border border-[#DDDDDD] rounded-l-2xl">
        <p className="text-nowrap text-sm md:text-base font-medium">
          {selectedNumber} selected
        </p>
        <div
          onClick={onClose}  
          className="group p-2 hover:bg-[#F5F5F5] rounded-xl transition-all duration-300 cursor-pointer">
          <IoClose
            className="text-base text-black group-hover:text-primary transition-all duration-300" />
        </div>
      </div>
      <div ref={dropdownRef} className="relative">
        <div 
          tabIndex={0}
          onClick={handleOpen}
          className="px-1 py-1 border border-[#DDDDDD] rounded-r-2xl cursor-pointer">
          <div className="px-3 py-1 rounded-xl hover:bg-[#F5F5F5] flex items-center gap-3 transition-all duration-300">
            <p className="text-nowrap text-sm md:text-base font-medium text-primary">Ubah status</p>
            <FaChevronDown className={`${open ? "rotate-180" : "rotate-0"} text-base md:text-sm text-primary transition-all duration-150`} />
          </div>
        </div>
        <AnimatePresence>
          {open &&
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`absolute bottom-[calc(100%+4px)] left-1/2 -translate-x-1/2 origin-bottom`}>
            <div className={`p-2 h-full border border-[#DDDDDD] bg-white w-[200px] 2xl:w-60 rounded-lg shadow-sm`}>
              {statusMapNoPendingAll.map((item) => (
                <p 
                  onClick={() => handleChange(item.key)}
                  className="p-2 py-2 w-full text-base 2xl:text-xl text-black/80 hover:text-primary font-medium hover:bg-[#F5F5F5] rounded-md  cursor-pointer">
                  {item.value}
                </p>
              ))}
            </div>
          </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ChangeStatusSelection;
