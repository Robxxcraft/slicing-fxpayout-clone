// TODO: Menyelesaikan masalah running text

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MaskSvg from './MaskSvg';

const detail = [
  { icon: "/no-fees.svg", keyTranslate: "homepage:hero.runningTexts.0" },
  { icon: "/recycle.svg", keyTranslate: "homepage:hero.runningTexts.1" },
  { icon: "/stop.svg", keyTranslate: "homepage:hero.runningTexts.2" },
  { icon: "/secure.svg", keyTranslate: "homepage:hero.runningTexts.3" },
];

const RunningText = ({ variant = "transparent" }: {
  variant?: "primary" | "transparent"
}) => {
  const { i18n, t } = useTranslation(["homepage"]);
  const isRtl = i18n.dir() === "rtl";

  return (
    <div className={`select-none overflow-hidden w-full whitespace-nowrap
      ${variant === "primary" ? "bg-primary":""}
    `}>
      <motion.div
        className="flex items-center flex-nowrap w-max"
        animate={{ x: isRtl ? 
          ["-50%", "0%"] :
          ["0%", "-50%"]
        }}
        transition={{ 
          ease: "linear",
          duration: 20,
          repeat: Infinity,
          repeatType: "loop"
        }}
         >
        {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="flex flex-nowrap items-center">
          {detail.map((item, idx) => (
            <div key={idx} 
              className="px-3 2xl:px-4 my-4 md:my-6 flex items-center gap-3 md:gap-6 2xl:gap-10 border-x border-[#F5F5F5]/50"
            >
              <MaskSvg 
                icon={item.icon} 
                label={"Icon"} 
                color={"bg-white"}
                className="size-9 2xl:size-11"              
              />
              <p className={`text-xl md:text-2xl 2xl:text-[32px] font-medium
                ${variant === "transparent" ? "text-white":""}  
                ${variant === "primary" ? "text-white":""}  
              `}>
                {t(item.keyTranslate)}
              </p>
            </div>
          ))}
        </div>
        ))}
      </motion.div>
    </div>
  )
}

export default RunningText;
