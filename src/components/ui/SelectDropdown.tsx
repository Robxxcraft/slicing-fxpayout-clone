import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react"
import { FaChevronDown } from "react-icons/fa6";

const SelectDropdown = ({
  objectInput,
  selectedInput,
  handleChangeInput,
  wrapperCL,
  inputCL,
  containerCL,
  positionDrop="right",
  positionY="down"
}: {
  selectedInput: string;
  handleChangeInput: (key: string) => void;
  containerCL?: string;
  wrapperCL?: string;
  inputCL?: string;
  positionDrop?: "left" | "center" | "right";
  positionY?: "down" | "up";
  objectInput: {
    key: string,
    value: string
  }[]
}) => {
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

  const handleChange = (key: string) => {
    handleChangeInput(key);
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
    <div ref={dropdownRef} className={`${containerCL} relative select-none w-full md:w-fit`}>
      <div
        tabIndex={0} 
        onClick={handleOpen}
        className={`${wrapperCL}
        px-2 h-9 2xl:h-12 flex items-center justify-between gap-2 w-fit bg-white border border-[#CED4DA] rounded-md focus:outline-primary/60 focus:outline-2 focus:bg-[#F5F5F5] cursor-pointer hover:bg-[#F5F5F5] transition-[background] duration-300`}>
        <p className="text-base 2xl:text-xl text-black/80 text-nowrap">
          {objectInput.find(item => item.key === selectedInput)?.value}
        </p>
        <FaChevronDown 
          className="text-sm text-black/60"
        />
      </div>
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ originY: positionY === "down" ? 0 : 1, willChange: "transform, opacity" }}
          className={`${positionCL} absolute`}>
          <div className={`${inputCL} p-2 w-fit h-full border border-[#DDDDDD] bg-white rounded-lg shadow-lg`}>
            {objectInput.map((item) => (
              <p 
                key={item.key}
                onClick={() => handleChange(item.key)}
                className="p-2 py-2 w-full text-base 2xl:text-xl text-black/80 hover:text-primary font-medium hover:bg-[#F5F5F5] rounded-md cursor-pointer">
                {item.value}
              </p>
            ))}
          </div>
        </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default SelectDropdown;
