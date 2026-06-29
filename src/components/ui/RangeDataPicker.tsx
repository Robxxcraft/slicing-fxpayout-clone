import { startOfMonth, subDays } from "date-fns";
import { useState } from "react";
import { DayPicker, getDefaultClassNames, type DateRange } from "react-day-picker";
import Modal from "./Modal";
import { formattingFullDate } from "@/helper/formattingDate";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import Spinner from "./Spinner";
import { isEqual } from "lodash";
import "react-day-picker/style.css";

const presets = [
  { 
    label: "7 Hari Terakhir", 
    getValue: () => ({ from: subDays(new Date(), 7), to: new Date() }) 
  },
  { 
    label: "30 Hari Terakhir", 
    getValue: () => ({ from: subDays(new Date(), 30), to: new Date() }) 
  },
  { 
    label: "Bulan Ini", 
    getValue: () => ({ from: startOfMonth(new Date()), to: new Date() }) 
  },
  { 
    label: "90 Hari Terakhir", 
    getValue: () => ({ from: subDays(new Date(), 90), to: new Date() }) 
  },
];

const RangeDataPicker = ({
  isOpen,
  onClose,
  currentRange,
  applyRange,
  isLoading
}: {
  isOpen: boolean;
  onClose: () => void;
  currentRange: DateRange;
  applyRange: (dateRange: DateRange) => void;
  isLoading: boolean;
}) => {
  const defaultCL = getDefaultClassNames();
  const [range, setRange] = useState<DateRange>(currentRange);

  const handleChangeRangePreset = (getValue: () => DateRange) => {
    setRange(getValue);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWCL="max-w-fit 2xl:max-w-fit">
      <div className="flex justify-center">

        <div className="hidden md:block border-e border-[#DDDDDD] w-[200px]">
          <p className="px-4 py-4 text-nowrap text-sm 2xl:text-base font-medium hover:bg-[#F5F5F5] text-primary border-b border-[#DDDDDD] cursor-pointer">
            Kostum
          </p>
          {presets.map((preset, index) => (
            <p 
              key={index}
              onClick={() => handleChangeRangePreset(preset.getValue)}
              className="px-4 py-4 text-black/80 text-nowrap text-sm 2xl:text-base font-medium hover:bg-[#F5F5F5] hover:text-primary border-b border-[#DDDDDD] cursor-pointer"
            >
              {preset.label}
            </p>
          ))}
        </div>
        <div className="shrink-0">
          <div className="px-4 pb-2 flex justify-end w-full items-center border-b border-[#DDDDDD]">
            <div className="flex">
              <div
                onClick={onClose}
                className={`py-2 px-3 hover:bg-[#F5F5F5] rounded-lg
                  ${isLoading ? "cursor-default" : "cursor-pointer"}
                `}
              >
                <p className="text-black/80 text-base 2xl:text-lg font-medium">
                  Batal
                </p>
              </div>
              <div
                onClick={() => {
                  if (isEqual(range.from, currentRange.from) 
                    && isEqual(range.to, currentRange.to)
                  ) {
                    onClose();
                    return;
                  }
                  if (!isLoading) applyRange(range);
                }}
                className={`py-2 px-3 flex items-center hover:bg-[#F5F5F5] rounded-lg
                  ${isLoading ? "cursor-wait" : "cursor-pointer"}
                `}
              >
                {isLoading && <Spinner h="h-5" />}
                <p className="text-primary text-base 2xl:text-lg font-medium">
                  Terapkan
                </p>
              </div>
            </div>
          </div>
          <div>
           <div className="mx-4 mt-4 px-4 py-2 flex justify-between items-center gap-2 border border-light-gray rounded-lg cursor-default">
              <p>
                {range.from &&
                  formattingFullDate(range.from.toISOString())
                }
              </p>
              <HiOutlineArrowLongRight />
              <p>
                {range.from && (range.to 
                  ? formattingFullDate(range.to.toISOString()) : 
                  formattingFullDate(range.from.toISOString()))}
              </p>
            </div> 
            <DayPicker 
              mode="range"
              captionLayout="dropdown"
              startMonth={new Date(2026, 0)}
              selected={range}
              onSelect={setRange}
              disabled={{ 
                after: new Date()
              }}  
              navLayout="around"
              required
              resetOnSelect 
              classNames={{ 
                root: `${defaultCL.root} px-6! pb-4!`,
                today: `${defaultCL.today} font-semibold! text-primary!`,
                chevron: `${defaultCL.chevron} fill-primary! size-5`,
                month_caption: `${defaultCL.month_caption} font-normal! uppercase text-base!`,
                selected: `${defaultCL.selected} text-sm! font-medium!`,
                range_start: `${defaultCL.range_start} bg-transparent! font-medium!`,
                range_end: `${defaultCL.range_end} bg-transparent! font-medium!`,
                range_middle: `${defaultCL.range_middle} bg-my-light-blue! font-normal!`,
                day_button: `${defaultCL.day_button} size-10!`,
                day: `text-sm! px-[1px]!`
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default RangeDataPicker;
