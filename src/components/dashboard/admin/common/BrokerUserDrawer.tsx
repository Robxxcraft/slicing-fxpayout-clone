import type { StatusType } from '@/types/status.type';
import { TiInfoLarge } from 'react-icons/ti';
import StatusTag from '../../common/StatusTag';

export type DataBrokerDrawer = {
  connection_id: number;
  name: string;
  account_number: string;
  status: StatusType;
  platform: "MT4" | "MT5"
};
type BrokerUserProps = {
  totalUnverified: number;
  brokers: DataBrokerDrawer[];
  isLoading: boolean;
}

const BrokerUserDrawer = ({
  totalUnverified,
  brokers,
  isLoading
}: BrokerUserProps) => {
  return (
    <div>
      {isLoading ? 
        <div className="h-3 w-full bg-gray-300 rounded-full"></div>  
      :
        <p className="text-base 2xl:text-xl font-bold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
          Active account: {brokers.length - totalUnverified}
        </p>
      }
      {!isLoading && (totalUnverified > 0 || brokers.length === 0) &&
        <div className="mt-4 px-4 py-2 2xl:py-3 flex items-center gap-2 bg-[#FEF3C6]">
          <span className="flex shrink-0 items-center justify-center size-5 2xl:size-7 border border-[#BE5409] rounded-full">
            <TiInfoLarge className="text-sm 2xl:text-lg text-[#BE5409]" />
          </span>
          <p className="text-sm 2xl:text-lg text-[#BE5409]">
            {totalUnverified > 0 ? `Terdapat ${totalUnverified} akun yang memerlukan verifikasi.` :
              brokers.length === 0 ? "Pengguna belum menghubungkan akun trader." : ""}
          </p>
        </div>
      }
      <div className="mt-4 space-y-4">
        {isLoading ? 
        Array.from({ length: 8 }).map((_, index) => (
          <div 
            key={index}
            className="p-4 flex items-center justify-between gap-4 w-full animate-pulse"
          >
            <div className="space-y-3 w-full">
              <div className="h-3 w-full bg-gray-300 rounded-full"></div>  
              <div className="h-3 w-[40%] bg-gray-300 rounded-full"></div>  
            </div>
            <div className="h-3 w-[40%] bg-gray-300 rounded-full"></div>  
          </div>
        ))
        :
        brokers.map((broker) => (
          <div className="p-4 flex items-center justify-between gap-4 rounded-xl w-full border border-[#DDDDDD]">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <p className="font-medium text-base 2xl:text-xl max-w-[80%] truncate">
                  {broker.account_number}
                </p>
                <div className="px-3 py-1 rounded-sm border border-primary">
                  <p className="uppercase text-sm 2xl:text-lg text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                    {broker.platform}
                  </p>
                </div>
              </div>
              <p className="text-sm 2xl:text-lg font-bold">
                Broker: {" "}
                <span className="font-medium text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                  {broker.name}
                </span>
              </p>
            </div>
            <StatusTag 
              status={broker.status}
              text={broker.status === "approved" ? "Connected" : broker.status === "pending" ? "Verifying" : "Rejected"}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BrokerUserDrawer;
