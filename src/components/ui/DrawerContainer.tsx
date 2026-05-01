import { AnimatePresence, motion } from "framer-motion";

const DrawerContainer = ({ isOpen, onClose, isOverlayClose=true, maxWCL, children }:   {
  isOpen: boolean;
  isOverlayClose?: boolean;
  maxWCL?: string;
  onClose: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: React.ReactNode
}) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={isOverlayClose ? onClose : undefined} 
          className={`z-90 fixed w-full bg-black/5 backdrop-blur-[5px] h-full top-16 2xl:top-[90px] right-0`}
        >
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
            onClick={(e) => e.stopPropagation()}
            className={`fixed right-0 z-99 w-full
              ${maxWCL ? maxWCL : "max-w-[460px] 2xl:max-w-[540px]"}  
            `}
          >
            {children}
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default DrawerContainer;
