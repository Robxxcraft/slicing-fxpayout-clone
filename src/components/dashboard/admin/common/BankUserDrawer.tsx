import { FaCheck, FaCopy } from 'react-icons/fa6';
import StatusTag from '../../common/StatusTag';
import { useState } from 'react';
import { copyToClipboard } from '@/helper/copyToClipboard';
import type { StatusType } from '@/types/status.type';
import { TiInfoLarge } from 'react-icons/ti';

type BankUserProps = {
  bank: string;
  account_number: string;
  account_name: string;
  isLoading: boolean;
  status: StatusType;
  onRejectBankUser: () => void;
  onApproveBankUser: () => void;
}

const BankUserDrawer = ({
  bank,
  account_number,
  account_name,
  isLoading,
  status,
  onRejectBankUser,
  onApproveBankUser
}: BankUserProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    const isCopySuccess = await copyToClipboard(account_number);
    if (isCopySuccess) {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }
  
  const layoutBank = [
    { 
      key: "bank", 
      header: "Bank", 
      value: bank
    },
    { 
      key: "account_name",
      header: "Pemilik Rekening", 
      value: account_name
    },
    { 
      key: "account_number", 
      header: "Nomor Rekening",
      value: account_number
    },
  ];

  const lengthWalletAddress = account_number.length;
  const secureWalletAddress = account_number.slice(-5, -1).padStart(lengthWalletAddress, "*"); 
  const registeredBank = account_name || account_number || bank;
  return (
    <div>
      {!isLoading && (!registeredBank || status === "pending") && 
        <div className="mb-4 px-4 py-2 2xl:py-3 flex items-center gap-2 bg-[#FEF3C6]">
          <span className="flex shrink-0 items-center justify-center size-5 2xl:size-7 border border-[#BE5409] rounded-full">
            <TiInfoLarge className="text-sm 2xl:text-lg text-[#BE5409]" />
          </span>
          <p className="text-sm 2xl:text-lg text-[#BE5409]">
            {!registeredBank ? "Pengguna belum menambahkan data rekening bank." : 
            status === "pending" ? "Rekening bank memerlukan verifikasi." : ""}
          </p>
        </div>
      }
      
      <>
        <div className={`pb-4 flex justify-between items-center border-b border-[#EAEAEA]
            ${isLoading ? "animate-pulse":""}  
          `}>
            {isLoading ? 
              <>
                <div className="h-3 w-[30%] bg-gray-300 rounded-full"></div>
                <div className="h-3 w-[30%] bg-gray-300 rounded-full"></div>
              </>
              :
              (registeredBank &&
              <>
                <p className="text-base 2xl:text-xl font-bold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                  Rekening Bank
                </p>
                <StatusTag 
                  status={status} 
                  text={status === "approved" ? "Approved" 
                    : status === "rejected" ? "Rejected" : "Verifying"}        
                />
              </>)
            }
        </div>
        <div className={`pt-4 grid grid-cols-2 gap-y-4 gap-x-2.5
            ${isLoading ? "animate-pulse":""}  
          `}>
            {layoutBank.map((layout) => {
              if (isLoading) {
                return (
                  <div
                    key={layout.key}
                    className="mb-2 space-y-2.5 w-full"
                  >
                    <div className="h-3 w-[40%] bg-gray-300 rounded-full"></div>
                    <div className="h-3 w-full bg-gray-300 rounded-full"></div>
                  </div>
                )
              }
              if (!registeredBank) return null;
              return (
                <div
                  key={layout.key}
                  className={`${layout.key === "account_number" ? "col-span-2": "col-span-1"} space-y-2.5 w-full`}
                >
                  <p className="w-full text-nowrap text-sm 2xl:text-lg text-black/60">
                    {layout.header}
                  </p>
                  {layout.key === "account_number" ? 
                    <div className="flex items-center gap-3">
                      <p className="truncate w-fit text-base 2xl:text-xl">
                        {secureWalletAddress}
                      </p>
                      <div
                        onClick={handleCopy} 
                        className="p-2 text-black/60 hover:bg-[#F5F5F5] rounded-lg cursor-pointer transition-all duration-300">
                        {isCopied ? <FaCheck /> : <FaCopy />}
                      </div>
                    </div> 
                  :
                    <p className="truncate w-full text-base 2xl:text-xl">
                      {layout.value}
                    </p>
                  }
                </div>
              )
            })}
        </div>
      </>

      {(registeredBank && !isLoading) && status === "pending" &&
        <div className="absolute px-5 py-2 2xl:py-3 flex gap-2 left-0 bottom-0 w-full bg-white border-t border-[#D2CEE1]">
          <button 
            disabled={isLoading}
            onClick={onRejectBankUser}
            className="py-3 flex items-center justify-center gap-2 w-full rounded-lg border border-my-red text-my-red text-sm 2xl:text-base hover:shadow-[0_0_1px_1px] shadow-my-red/80 transition-all duration-300 cursor-pointer"
          >
            <span>Reject</span> 
          </button>
          <button 
            disabled={isLoading}
            onClick={onApproveBankUser}
            className="py-3 flex items-center justify-center gap-2 w-full rounded-lg bg-primary text-white text-sm 2xl:text-base cursor-pointer hover:brightness-90 transition-all duration-300"
          >
            <FaCheck />
            <span>Approve</span> 
          </button>
        </div>
      }
    </div>
  )
}

export default BankUserDrawer;
