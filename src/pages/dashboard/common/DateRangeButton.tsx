import { formattingFullDate } from '@/helper/formattingDate';
import type { DateRange } from 'react-day-picker';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';

const DateRangeButton = ({
  openPopup,
  isLoading,
  range,
  buttonCL,
  containerCL,
}: {
  openPopup: () => void;
  isLoading: boolean;
  range: DateRange;
  buttonCL?: string;
  containerCL?: string;
}) => {
  return (
    <div className={`${containerCL} w-fit`}>
      <button 
        onClick={() => {
          if (!isLoading) openPopup();
        }}
        disabled={isLoading}
        className={`${buttonCL} px-2 2xl:px-4 flex flex-1 w-fit h-9 2xl:h-12 items-center gap-2 bg-white border border-[#D2CEE1] text-black/80 hover:bg-[#F5F5F5] rounded-md cursor-pointer transition-all duration-300 ease-out disabled:opacity-60 disabled:hover:bg-black/0 disabled:cursor-wait`}
      >
        <FaRegCalendarAlt className="mr-1 text-lg text-black/60" />
        <p className="whitespace-nowrap">
          {range.from &&
            formattingFullDate(range.from.toISOString())
          }
        </p>
        <HiOutlineArrowLongRight />
        <p className="whitespace-nowrap">
          {range.from && (range.to 
            ? formattingFullDate(range.to.toISOString()) : 
            formattingFullDate(range.from.toISOString()))}
        </p>
      </button>
    </div>
  )
}

export default DateRangeButton;
