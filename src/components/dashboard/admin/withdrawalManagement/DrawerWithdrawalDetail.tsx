import DrawerContainer from "@/components/ui/DrawerContainer";
import { copyToClipboard } from "@/helper/copyToClipboard";
import { formattingRp, formattingUsd } from "@/helper/formattingCurrency";
import { formattingFullDate } from "@/helper/formattingDate";
import type { DataWithdrawalManagement } from "@/pages/dashboard/admin/WithdrawalRequestManagement";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import UserWithdrawalDrawer from "../common/UserWithdrawalDrawer";
import type { UserGender } from "@/types/user.type";
import DetailPaymentDrawer from "../common/DetailPaymentDrawer";
import { AdminAPI } from "@/api";
import { toast } from "react-toastify";

type DataProfile = {
  full_name: string;
  username: string;
  gender: UserGender;
  phone_number: string;
  email: string;
};
type LoadingState = {
  profile: boolean;
  general: boolean;
}

const DrawerWithdrawalDetail = ({
  dataWithdrawal,
  onCloseDrawer,
  isOpen,
  openPopUpStatus
}: { 
  dataWithdrawal: DataWithdrawalManagement;
  onCloseDrawer: () => void;
  isOpen: boolean;
  openPopUpStatus: (key: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState<LoadingState>({
    profile: false,
    general: true,
  });
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [dataProfile, setDataProfile] = useState<DataProfile | null>(null);

  const fetchDataProfile = async () => {
    setIsLoading((prev) => ({
      ...prev,
      profile: true,
      general: true
    }));
    
    try {
      const { error, message, data } = await AdminAPI.getProfileById({
        userId: dataWithdrawal.user_id
      });

      if (!error && data) {
        setDataProfile({
          full_name: data.full_name,
          username: data.username,
          gender: data.gender,
          phone_number: data.phone_number,
          email: data.email
        })
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        profile: false,
        general: false
      }));
    }
  }

  useEffect(() => {
    fetchDataProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = async () => {
    const text = dataWithdrawal.wallet_address;
    const isCopySuccess = await copyToClipboard(text);
    if (isCopySuccess) {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }

  const lengthWalletAddress = dataWithdrawal.wallet_address.length;
  const secureWalletAddress = dataWithdrawal.wallet_address.slice(-5, -1).padStart(lengthWalletAddress, "*"); 
  return (
    <DrawerContainer 
      isOpen={isOpen} 
      onClose={onCloseDrawer}
      maxWCL="max-w-[600px]"
    >
    <div className={`primary-scrollbar border-t border-l border-[#D2CEE1] bg-white overflow-y-auto
      ${!isLoading.general && dataWithdrawal.status === "pending" ? "h-[calc(100vh-64px)] 2xl:h-[calc(100vh-90px)]" : "h-screen"}  
    `}>
      <div className="px-5 pr-5 py-3 h-[calc(100%-64px)] overflow-y-auto overflow-x-hidden">
        {/* HEADER */}
        <div className="pb-2 2xl:pb-4 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-xl 2xl:text-2xl font-semibold">
              Detail Withdrawal
            </h2>
            <div
              onClick={onCloseDrawer} 
              className="p-2 aspect-square hover:bg-[#F5F5F5] rounded-xl transition-all duration-300 cursor-pointer">
              <IoCloseOutline 
                className="text-2xl 2xl:text-3xl" />
            </div>
          </div>
          <p className="mt-1 text-black/60 text-base 2xl:text-xl leading-[160%]">
            ID: #WD-F{dataWithdrawal.id.toString().padStart(3, "X")} • {" "}
            Dibuat pada {formattingFullDate(dataWithdrawal.created_at)} 
          </p>
        </div>
        
        {/* DETAIL */}
        <div className="pt-8 pb-5 space-y-4">
          
          {/* AMOUNT */}
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="uppercase text-base font-bold 2xl:text-xl bg-linear-to-t from-dark-primary to-primary bg-clip-text text-transparent">
              REQUESTED AMOUNTS
            </p>
            <p className="text-[32px] md:text-[36px] font-semibold">
              {dataWithdrawal.currency === "USD" ?
                formattingUsd(Number(dataWithdrawal.total)) : formattingRp(Number(dataWithdrawal.total))
              }
            </p>
          </div>

          {/* DETAIL PAYMENT */}
          <DetailPaymentDrawer 
            method={dataWithdrawal.method} 
            onCopy={handleCopy} 
            isCopied={isCopied} 
            secureWalletAddress={secureWalletAddress} 
            account_name={dataWithdrawal.account_name} 
            bank={dataWithdrawal.bank_name} 
          />

          {/* DETAIL USER */}
          <UserWithdrawalDrawer 
            full_name={dataProfile?.full_name ?? ""} 
            username={dataProfile?.username ?? ""} 
            gender={dataProfile?.gender ?? "male"} 
            phone_number={dataProfile?.phone_number ?? ""} 
            email={dataProfile?.email ?? ""}
            isLoading={isLoading.profile} 
          />
        </div>
      </div>

      {!isLoading.general && dataWithdrawal.status === "pending" &&
        <div className="absolute px-5 py-2 flex gap-2 left-0 bottom-0 w-full bg-white border-t border-[#D2CEE1]">
          <button 
            disabled={isLoading.general || isLoading.profile}
            onClick={() => openPopUpStatus("rejected")}
            className="py-3 flex items-center justify-center gap-2 w-full rounded-lg border border-my-red text-my-red text-sm hover:shadow-[0_0_1px_1px] shadow-my-red/80 transition-all duration-300 cursor-pointer"
          >
            <span>Reject</span> 
          </button>
          <button 
            disabled={isLoading.general || isLoading.profile}
            onClick={() => openPopUpStatus("approved")}
            className="py-3 flex items-center justify-center gap-2 w-full rounded-lg bg-primary text-white text-sm cursor-pointer hover:brightness-90 transition-all duration-300"
          >
            <FaCheck />
            <span>Approve</span> 
          </button>
        </div>
      }
    </div>
    </DrawerContainer>
  )
}

export default DrawerWithdrawalDetail;
