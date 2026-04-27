import { IoClose } from "react-icons/io5";

const FloatingSelection = ({
  selectedNumber,
  onClose,
}: {
  selectedNumber: number;
  onClose: () => void;
}) => {
  return (
    <div className="select-none fixed bottom-8 left-1/2 -translate-x-1/2 lg:translate-x-1/2 flex items-center bg-white rounded-2xl shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
      <div className="pl-4 pr-1 py-1 flex items-center gap-1 border border-[#DDDDDD] rounded-2xl">
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
    </div>
  )
}

export default FloatingSelection;
