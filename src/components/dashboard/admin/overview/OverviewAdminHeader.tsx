import CardOverview from "@/components/dashboard/common/CardOverview";
import { BsBank2 } from "react-icons/bs";
import { IoCardOutline, IoWalletOutline } from "react-icons/io5";
import { RiStockFill } from "react-icons/ri";
import { Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/helper/pathHelper";

ChartJS.register(ArcElement, Tooltip, Legend);

type OverviewAdminHeaderProps = {
  withdrawals: number;
  banks: number;
  rebates: number;
  brokers: number;
  traders: number;
  affiliators: number;
  isLoading: boolean
};

const OverviewAdminHeader = ({
  withdrawals,
  banks,
  rebates,
  brokers,
  traders,
  affiliators,
  isLoading
}: OverviewAdminHeaderProps) => {
  const { i18n } = useTranslation();
  return (
    <header>
      <h1 className="mb-4 md:mb-6 text-xl md:text-[28px] font-semibold">
        Overview
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-1 lg:col-span-2 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Link to={getLocalizedPath("dashboard/withdrawals", i18n.language)} className="w-full max-w-full md:max-w-1/2 cursor-pointer">
              <CardOverview 
                title={"Pending Withdrawals"} 
                icon={<IoCardOutline />} sizeIcon="sm"
                content={withdrawals.toLocaleString()} detail={"Total pending user requests"} 
                isLoading={isLoading}
                bottomLine 
              />
            </Link>
            <Link to={getLocalizedPath("dashboard/rebates", i18n.language)} className="w-full max-w-full md:max-w-1/2 cursor-pointer">
              <CardOverview 
                title={"Pending Rebates"} 
                icon={<RiStockFill />} sizeIcon="sm"
                content={rebates.toLocaleString()} detail={"Total unverified rebates"} 
                isLoading={isLoading}
                bottomLine 
              />
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Link to={getLocalizedPath("dashboard/brokers", i18n.language)} className="w-full max-w-full md:max-w-1/2 cursor-pointer">
              <CardOverview 
                title={"Pending Broker Connections"} 
                icon={<BsBank2 className="text-base! 3xl:text-lg!" />}
                content={brokers.toLocaleString()} detail={"Total pending trader requests"} 
                isLoading={isLoading}
                bottomLine 
              />
            </Link>
            <Link to={getLocalizedPath("dashboard/wallets", i18n.language)} className="w-full max-w-full md:max-w-1/2 cursor-pointer">
              <CardOverview 
                title={"Pending Bank Verifications"} 
                icon={<IoWalletOutline />} sizeIcon="sm"
                content={banks.toLocaleString()} detail={"Total unverified bank"} 
                isLoading={isLoading}
                bottomLine 
              />
            </Link>
          </div>
        </div>
        <div className="px-5 py-6 bg-white w-full h-full border border-[#DDDDDD] rounded-lg">
          <p className="text-base 3xl:text-2xl font-medium">Total Users</p>
          <div className="mt-2 md:mt-5 w-full flex justify-center">
            <div className="relative w-[80%] md:w-[50%] lg:w-[80%] 3xl:w-[60%] aspect-square">
              <Doughnut 
                key="donat-total-user"
                data={{ 
                  labels: ["Traders", "Affiliators"],
                  datasets: [{
                    data: [traders, affiliators],
                    backgroundColor: ["#6366f1", "#f87171"],
                    borderRadius: 12, 
                    spacing: 4,  
                  }]
                }}
                options={{ 
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: "70%",
                  plugins: {
                    legend: { display: false }
                  }
                }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-1/2">
                <p className="text-2xl md:text-[32px] lg:text-2xl 3xl:text-[2rem] font-semibold">
                  {traders + affiliators}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2 md:mt-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="size-3 3xl:size-4 rounded-full bg-[#f87171]"></div>
                <p className="text-sm 3xl:text-lg font-medium">Affiliators</p>
              </div>
              <span className="text-sm 3xl:text-lg font-medium text-black/70">
                {affiliators}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="size-3 3xl:size-4 rounded-full bg-[#6366f1]"></div>
                <p className="text-sm 3xl:text-lg font-medium">Traders</p>
              </div>
              <span className="text-sm 3xl:text-lg font-medium text-black/70">
                {traders}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default OverviewAdminHeader;
