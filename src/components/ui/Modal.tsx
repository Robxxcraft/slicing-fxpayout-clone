import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, isOverlayClose=true, maxWCL, children }:
  {
    isOpen: boolean;
    isOverlayClose?: boolean;
    maxWCL?: string;
    onClose: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    children: React.ReactNode
  }
) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay / Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isOverlayClose ? onClose : undefined}
            className="fixed inset-0 bg-black/60 z-999999999 backdrop-blur-[5px]"
          />

          <div className="px-5 fixed inset-0 z-1000000000 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`${maxWCL ? maxWCL : "max-w-md"}
                bg-white w-full 2xl:max-w-[720px] rounded-3xl p-6 md:p-8 shadow-2xl pointer-events-auto relative overflow-hidden`}
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
