import type { ReactNode } from "react";

const Tooltip = ({
  icon,
  handleClick,
  detail,
  disabled
}: {
  icon: ReactNode;
  handleClick: () => void;
  detail: string;
  disabled?: boolean
}) => {
  return (
    <div className="relative group inline-block">
      <button
        disabled={disabled}
        onClick={handleClick}
        className="p-2 rounded-md bg-white border border-[#D2CEE1] text-black/60 place-items-center cursor-pointer hover:bg-black/5 transition-all duration-300 ease-out disabled:opacity-60 disabled:hover:bg-black/0 disabled:cursor-wait"
      >
        {icon}
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 mt-2
        opacity-0 group-hover:opacity-100
        pointer-events-none
        transition-all duration-200
        bg-gray-500 text-white text-xs 2xl:text-sm
        px-2 py-1 rounded-md whitespace-nowrap
        z-50">
          {detail}
      </div>
    </div>
  )
}

export default Tooltip;
