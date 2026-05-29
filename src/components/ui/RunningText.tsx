import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const RunningText = ({ variant = "transparent" }: {
  variant?: "primary" | "transparent"
}) => {
 const { t } = useTranslation(["homepage"]);
  const runningTexts = t("homepage:hero.runningTexts", {
    returnObjects: true
  }) as string[];
  
  return (
    <div className={`select-none overflow-hidden w-full whitespace-nowrap
      ${variant === "primary" ? "bg-primary":""}
    `}>
      <motion.div
        className="flex items-center flex-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          ease: "linear",
          duration: 20,
          repeat: Infinity,
          repeatType: "loop"
        }}
         >
        {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="flex flex-nowrap items-center">
          {runningTexts.map((text, idx) => (
            <div key={idx} 
              className="px-3 2xl:px-4 py-4 md:py-6 flex items-center gap-3 md:gap-6 2xl:gap-10"
            >
              <img src="/star.svg" alt="Icon Star" 
                className="scale-50 md:scale-70 xl:scale-90 2xl:scale-100"
              />
              <p className={`text-xl md:text-2xl 2xl:text-[32px] font-medium
                ${variant === "transparent" ? "text-white":""}  
                ${variant === "primary" ? "text-white":""}  
              `}>
                {text}
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
