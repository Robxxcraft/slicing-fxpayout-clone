import { HiOutlineRefresh } from "react-icons/hi";
import { LuExternalLink } from "react-icons/lu";
import StatusTag from "../common/StatusTag";
import type { StatusType } from "@/types/status.type";
import { useBrokerUserContext } from "@/hooks/useBrokerUserContext";
import { useState } from "react";

const CardBroker = ({
  name,
  accountNumber,
  status,
}: {
  name: string;
  accountNumber: string;
  status: StatusType;
}) => {
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
          <div className="flex items-center gap-2.5">
            <img src={`/broker/${name.toLowerCase()}.webp`} alt="Icon logo broker" 
              className="size-10 lg:size-12 rounded-full object-cover object-center"    
            />
            <div>
              <p className="text-base font-medium">{name}</p>
              <p className="text-sm text-black/60">{accountNumber}</p>
            </div>
          </div>
          {status === "approved" && <StatusTag status="approved" text="Connected" />}
          {status === "rejected" && <StatusTag status="rejected" text="Rejected" />}
          {status === "pending" && <StatusTag status="pending" text="Verifying" />}
        </div>
        <div className="mt-3 lg:mt-4">
          <p className="text-sm text-black/60">Total Rebate</p>
          <p className="text-[32px] font-semibold">$90.00</p>
        </div>
        <div className="mt-3 lg:mt-4 flex items-center gap-2">
          <div
            onClick={() => syncingBroker()} 
            className="py-2 flex items-center gap-2 justify-center w-full border rounded-lg cursor-pointer hover:bg-black/5 transition-all duration-300">
            <HiOutlineRefresh className={`${isLoading ? "animate-spin" : ""} text-black/60`} />
            <p className="text-xs font-medium text-black/80">{isLoading ? "Syncing..." : "Sync Status"}</p>
          </div>
          <div className="p-2 shrink-0 rounded-lg cursor-pointer hover:bg-black/5 transition-all duration-300">
            <LuExternalLink className="text-lg text-primary" />
          </div>
        </div>
      </div>
      <div className="w-full h-2.5 bg-primary"></div>
    </div>
  )
}

export default CardBroker;
