import type { ReactNode } from "react";

const Tooltip = ({
  icon,
  variant="base",
  handleClick,
  detail,
  disabled
}: {
  icon: ReactNode;
  variant?: "primary" | "base";
  handleClick: () => void;
  detail: string;
  disabled?: boolean
}) => {
  let btnClass;
  
  if (variant === "base") {
    btnClass = "bg-white border border-[#D2CEE1] text-black/60 hover:bg-[#F5F5F5]";
  } else if (variant === "primary") {
    btnClass = "bg-linear-to-t from-dark-primary to-primary text-white border border-primary";
  }
  return (
    <div className="relative group inline-block h-9 2xl:h-12">
      <button
        disabled={disabled}
        onClick={handleClick}
        className={`${btnClass} size-9 2xl:size-12 text-base 2xl:text-xl rounded-md place-items-center cursor-pointer transition-all duration-300 ease-out disabled:opacity-60 disabled:hover:bg-black/0 disabled:cursor-wait`}
      >
        {icon}
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 mt-2
        opacity-0 group-hover:opacity-100
        pointer-events-none
        transition-all duration-200
        bg-gray-500 text-white text-xs 2xl:text-lg
        px-2 py-1 rounded-md whitespace-nowrap
        z-50">
          {detail}
      </div>
    </div>
  )
}

export default Tooltip;
