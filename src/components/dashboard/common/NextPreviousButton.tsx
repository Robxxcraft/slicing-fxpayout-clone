import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const NextPreviousButton = ({
  onNextPage,
  onPreviousPage,
  disabledNext,
  disabledPrev
}: {
  onNextPage: () => void;
  onPreviousPage: () => void;
  disabledNext: boolean;
  disabledPrev: boolean;
}) => {
  return (
    <div className="flex">
      <button
        onClick={onPreviousPage}
        disabled={disabledPrev}
        aria-disabled={disabledPrev}
        className="size-9 3xl:size-12 text-base 3xl:text-xl rounded-l-md bg-white border border-[#D2CEE1] text-black/60 place-items-center cursor-pointer hover:bg-[#F5F5F5] transition-all duration-300 ease-out disabled:opacity-60 disabled:hover:bg-black/0 disabled:cursor-auto"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={onNextPage}
        disabled={disabledNext}
        aria-disabled={disabledNext}
        className="size-9 3xl:size-12 text-base 3xl:text-xl rounded-r-md bg-white border border-[#D2CEE1] text-black/60 place-items-center cursor-pointer hover:bg-[#F5F5F5] transition-all duration-300 ease-out disabled:opacity-60 disabled:hover:bg-black/0 disabled:cursor-auto"
      >
        <FaChevronRight />
      </button>
    </div>
  )
}

export default NextPreviousButton;
