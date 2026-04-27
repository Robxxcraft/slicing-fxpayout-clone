import { HiOutlineRefresh } from "react-icons/hi";
import { LuExternalLink } from "react-icons/lu";
import StatusTag from "../common/StatusTag";
import type { StatusType } from "@/types/status.type";
import { useBrokerUserContext } from "@/hooks/useBrokerUserContext";
import { useState } from "react";
import { formattingUsd } from "@/helper/formattingCurrency";
import { Link } from "react-router-dom";
import { getLocalizedPath } from "@/helper/pathHelper";
import { formatingUrlBroker } from "@/helper/formattingUrlBroker";
import { useTranslation } from "react-i18next";
import { IoMdTime } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineWarning } from "react-icons/ai";

const CardBroker = ({
  name,
  accountNumber,
  totalRebate,
  status,
}: {
  name: string;
  accountNumber: string;
  totalRebate: number;
  status: StatusType;
}) => {
  const { i18n } = useTranslation();
  const { fetchBrokerUser } = useBrokerUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const syncingBroker = async () => {
    setIsLoading(true);
    await fetchBrokerUser(true);
    setIsLoading(false);
  }
  return (
    <div className="w-full min-h-[220px] rounded-lg overflow-hidden border border-[#DDDDDD]">
      <div className="px-4 lg:px-6 pt-4 lg:pt-6 pb-3 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5 2xl:gap-4">
            <img src={`/broker/${formatingUrlBroker(name)}.webp`} alt="Icon logo broker" 
              className="size-10 lg:size-12 2xl:size-14 rounded-full object-cover object-center"    
            />
            <div>
              <p className="text-base 2xl:text-xl font-medium">{name}</p>
              <p className="text-sm 2xl:text-lg text-black/60">{accountNumber}</p>
            </div>
          </div>
          {status === "approved" && 
            <StatusTag 
              status="approved" 
              text="Connected" 
              icon={<FaCheck className="text-xs" />}
            />}
          {status === "rejected" && 
            <StatusTag 
              status="rejected" 
              text="Rejected" 
              icon={<AiOutlineWarning className="text-sm" />}
            />}
          {status === "pending" && 
            <StatusTag 
              status="pending" 
              text="Verifying"
              icon={<IoMdTime />} 
            />}
        </div>
        <div className="mt-3 lg:mt-4">
          <p className="text-sm 2xl:text-lg text-black/60">Total Rebate</p>
          <p className="text-[32px] 2xl:text-[36px] font-semibold">{formattingUsd(totalRebate)}</p>
        </div>
        <div className="mt-3 lg:mt-4 flex items-center gap-2">
          <div
            onClick={() => syncingBroker()} 
            className="py-2 2xl:py-3 flex items-center gap-2 justify-center w-full border rounded-lg cursor-pointer hover:bg-[#F5F5F5] transition-all duration-300">
            <HiOutlineRefresh className={`${isLoading ? "animate-spin" : ""} text-black/60 text-base 2xl:text-2xl`} />
            <p className="text-xs 2xl:text-base font-medium text-black/80">{isLoading ? "Syncing..." : "Sync Status"}</p>
          </div>
          <Link
            to={getLocalizedPath(`trader/rebate/${formatingUrlBroker(name)}`, i18n.language)} 
            className="p-2 shrink-0 rounded-lg cursor-pointer hover:bg-[#F5F5F5] transition-all duration-300">
            <LuExternalLink className="text-lg 2xl:text-2xl text-primary" />
          </Link>
        </div>
      </div>
      <div className="w-full h-2.5 bg-primary"></div>
    </div>
  )
}

export default CardBroker;
