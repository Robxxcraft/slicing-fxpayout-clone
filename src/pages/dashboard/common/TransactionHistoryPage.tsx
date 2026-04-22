import TinyButton from "@/components/dashboard/common/TinyButton";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import Tooltip from "@/components/ui/Tooltip";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";

const supportEntry = [5, 10, 20, 50];

const TransactionHistoryPage = () => {
  const { i18n } = useTranslation();
  const [totalEntry, setTotalEntry] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  return (
    <WrapperDashboardComponent>
      <section>
        <div className="flex justify-between items-center md:items-start">
          <TitleDashboard>
            Transaction History
          </TitleDashboard>
          <TinyButton 
            buttonType="link"
            urlTo={getLocalizedPath("withdrawal/request", i18n.language)}
          >
            Tarik dana sekarang!
          </TinyButton>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#212529]">
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
              <div className="relative inline-block">
                <select 
                  name="status" 
                  id="status" 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-2 pr-8 py-1 text-base text-black/80 bg-white border border-[#CED4DA] rounded-md appearance-none focus:outline-primary"
                >
                  {[
                    {key: "all", value: "Semua status"}, 
                    {key: "pending", value: "Pending"},
                    {key: "rejected", value: "Rejected"}, 
                    {key: "approved", value: "Approved"}].map((item) => (
                    <option key={item.key} value={item.value}>{item.value}</option>
                  ))}
                </select>
                <FaChevronDown 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-black/60"
                />
              </div>
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
        </div>
      </section>
    </WrapperDashboardComponent>
  )
}

export default TransactionHistoryPage;
