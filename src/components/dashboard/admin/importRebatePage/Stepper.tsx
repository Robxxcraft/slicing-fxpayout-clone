import React from 'react';
import { FaCheck } from 'react-icons/fa6';

const Stepper = ({ step }: { step: number }) => {
  return (
    <div className="mt-6 px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3 bg-white border border-[#DDDDDD] rounded-2xl">
      {["Upload File", "Preview Data", "Review Import"].map((item, index) => {
        const active = step >= index + 1;
        const passed = step > index + 1;
    
        return (
          <React.Fragment key={index}>
            <div className="flex items-center gap-3">
              <div className={`shrink-0 flex items-center justify-center size-10 rounded-full border
                ${active ? "border-primary" : "border-black/60"}  
                ${passed ? "bg-primary":""}
              `}>
                {passed ?
                  <FaCheck className="text-white text-lg" />
                :
                  <span className={`text-base 3xl:text-xl font-medium
                    ${active ? "text-primary": "text-black/60"}
                  `}>
                    {index + 1}
                  </span>
                }
              </div>
              <p className={`${active ? "text-primary": "text-black/60"}
                text-base 3xl:text-xl font-medium whitespace-nowrap
              `}>
                {item}
              </p>
            </div>
            {index !== 2 &&
              <div className="h-px w-full bg-black/60"></div>
            }
          </React.Fragment>
          
        )
      })}
    </div>
  )
}

export default Stepper;
