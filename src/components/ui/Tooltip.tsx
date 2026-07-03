import type { ReactNode } from "react";

const Tooltip = ({
  icon,
  variant="base",
  handleClick,
  detail,
  disabled,
  fullMobile
}: {
  icon: ReactNode;
  variant?: "primary" | "base";
  handleClick: () => void;
  detail: string;
  disabled?: boolean;
  fullMobile?: boolean;
}) => {
  let btnClass;
  
  if (variant === "base") {
    btnClass = "bg-white border border-[#D2CEE1] text-black/60 hover:bg-[#F5F5F5]";
  } else if (variant === "primary") {
    btnClass = "bg-linear-to-t from-dark-primary to-primary text-white border border-primary";
  }
  return (
    <div className={`relative group inline-block h-9 3xl:h-12 
      ${fullMobile ? "w-full md:w-fit":""}`
    }>
      <button
        disabled={disabled}
        onClick={handleClick}
        className={`${btnClass} 
          ${fullMobile ? "px-2.5 md:px-0 flex md:block items-center justify-center gap-2 w-full h-9 md:w-9 3xl:h-12 3xl:w-12":"size-9 3xl:size-12"}
          text-base 3xl:text-xl rounded-md place-items-center cursor-pointer transition-all duration-300 ease-out disabled:opacity-60 disabled:hover:bg-black/0 disabled:cursor-wait
        `}
      >
        {icon}
        {fullMobile && <span className="inline-block md:hidden">{detail}</span>}
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 mt-2
        opacity-0 group-hover:opacity-100
        pointer-events-none
        transition-all duration-200
        bg-gray-500 text-white text-xs 3xl:text-lg
        px-2 py-1 rounded-md whitespace-nowrap
        z-50">
          {detail}
      </div>
    </div>
  )
}

export default Tooltip;
