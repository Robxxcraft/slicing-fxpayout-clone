import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import Tooltip from "@/components/ui/Tooltip";
import { LuRefreshCcw } from "react-icons/lu";

const supportEntry = [5, 10, 20, 50];

const HistoryRebate = () => {
  const [totalEntry, setTotalEntry] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <WrapperDashboardComponent>
      <TitleDashboard>
        History Rebate
      </TitleDashboard>
      <ParagraphDashboard>
        Daftar riwayat perolehan rebate Anda. Gunakan filter untuk melihat detail komisi berdasarkan periode waktu serta broker.
      </ParagraphDashboard>
      <div>
        <div className="flex items-center justify-between">
          <div className="mt-4 flex items-center gap-1.5 text-[#212529]">
            <span className="text-base">Tampilkan</span>
            <select 
              name="entry" 
              id="entry" 
              value={totalEntry}
              onChange={(e) => setTotalEntry(Number(e.target.value))}
              className="px-2 py-1 text-base text-[#495057] bg-white border border-[#CED4DA] rounded-md focus:outline-none"
            >
              {supportEntry.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip 
              disabled={isLoading}
              icon={<LuRefreshCcw className={`${isLoading ? "animate-spin" : ""}`} />} 
              handleClick={() => {}} 
              detail={"Reload Data"} />
            <div className="flex">
              <button
                onClick={() => {}}
                disabled={true}
                className="p-2 rounded-l-md bg-white border border-[#D2CEE1] text-black/60 place-items-center cursor-pointer hover:bg-black/5 transition-all duration-300 ease-out disabled:opacity-60 disabled:hover:bg-black/0 disabled:cursor-auto"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => {}}
                disabled={false}
                className="p-2 rounded-r-md bg-white border border-[#D2CEE1] text-black/60 place-items-center cursor-pointer hover:bg-black/5 transition-all duration-300 ease-out disabled:opacity-60 disabled:hover:bg-black/0 disabled:cursor-auto"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center w-full h-fit">
          <div className="text-center">
            <p className="text-base text-black/80">Belum ada riwayat rebate Anda</p>
          </div>
        </div>
        <div className="mt-9">
          <p className="text-base text-black/80">Menampilkan 0 hingga 0 dari 0 entri</p>
        </div>
      </div>
    </WrapperDashboardComponent>
  )
}

export default HistoryRebate;
