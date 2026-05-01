import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  subDays
} from "date-fns";

export default function RangeDatePicker() {
  const [open, setOpen] = useState(false);

  const [range, setRange] = useState<any>({
    from: subDays(new Date(), 30),
    to: new Date()
  });

  const [month, setMonth] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  // detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // close outside
  useEffect(() => {
    const handler = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const formatRange = () => {
    if (!range?.from || !range?.to) return "Pilih tanggal";
    return `${format(range.from, "dd/MM/yyyy")} → ${format(range.to, "dd/MM/yyyy")}`;
  };

  return (
    <div className="relative w-full md:w-fit" ref={ref}>
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="w-full md:w-auto px-4 py-2 border rounded-lg bg-white cursor-pointer flex justify-between items-center"
      >
        <span className="truncate">{formatRange()}</span>
        <span>▾</span>
      </div>

      {open && (
        <div
          className={`
            absolute md:mt-2 bg-white border rounded-xl shadow-xl p-4 z-50
            w-full md:w-[380px]
            left-0 md:left-auto
          `}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold">Filters</span>
            <button
              className="text-blue-500 text-sm"
              onClick={() =>
                setRange({
                  from: new Date(),
                  to: new Date()
                })
              }
            >
              Clear
            </button>
          </div>

          {/* Preset */}
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() =>
                setRange({
                  from: startOfMonth(new Date()),
                  to: new Date() // 🔥 max hari ini
                })
              }
              className="px-2 py-1 text-xs bg-gray-100 rounded"
            >
              Bulan ini
            </button>

            <button
              onClick={() =>
                setRange({
                  from: subDays(new Date(), 30),
                  to: new Date()
                })
              }
              className="px-2 py-1 text-xs bg-gray-100 rounded"
            >
              30 hari
            </button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mb-2">
            <button onClick={() => setMonth(subMonths(month, 1))}>‹</button>
            <span className="font-medium">
              {format(month, "MMMM yyyy")}
            </span>
            <button onClick={() => setMonth(addMonths(month, 1))}>›</button>
          </div>

          {/* Calendar */}
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            month={month}
            onMonthChange={setMonth}
            numberOfMonths={isMobile ? 1 : 2} // 🔥 responsive
            showOutsideDays
            disabled={{
              after: new Date() // 🔥 tidak bisa pilih masa depan
            }}
          />

          {/* Footer */}
          <div className="mt-3 text-sm text-gray-500 text-center">
            {formatRange()}
          </div>
        </div>
      )}
    </div>
  );
}