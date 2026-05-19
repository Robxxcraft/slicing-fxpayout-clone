import { FaCheck, FaCopy } from 'react-icons/fa6';
import StatusTag from '../../common/StatusTag';
import { useState } from 'react';
import { copyToClipboard } from '@/helper/copyToClipboard';
import { TiInfoLarge } from 'react-icons/ti';
import type { BankUser } from '@/types/bank.type';
import { showLastFourWalletAddress } from '@/helper/formattingWithdrawal';

type BankUserProps = {
  banks: BankUser[];
  isLoading: boolean;
};

const BankUserDrawer = ({
  banks,
  isLoading,
}: BankUserProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async (text: string) => {
    const isCopySuccess = await copyToClipboard(text);
    if (isCopySuccess) {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }
  
  const totalUnverified = banks.filter((bank) => bank.status === "pending");
  return (
    <div>
      {!isLoading && (banks.length === 0 || totalUnverified.length > 0) && 
        <div className="mb-4 px-4 py-2 2xl:py-3 flex items-center gap-2 bg-[#FEF3C6]">
          <span className="flex shrink-0 items-center justify-center size-5 2xl:size-7 border border-[#BE5409] rounded-full">
            <TiInfoLarge className="text-sm 2xl:text-lg text-[#BE5409]" />
          </span>
          <p className="text-sm 2xl:text-lg text-[#BE5409]">
            {banks.length === 0 ? "Pengguna belum menambahkan data rekening bank." : 
            totalUnverified.length > 0 ? `Terdapat ${totalUnverified.length} rekening bank memerlukan verifikasi.` : ""}
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
              (banks.length > 0 &&
                <p className="text-base 2xl:text-xl font-bold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                  Rekening Bank
                </p>
              )
            }
        </div>
        <div className={`pt-4 space-y-4
            ${isLoading ? "animate-pulse":""}  
          `}>
            {isLoading ? 
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="px-4 py-2 grid grid-cols-2 gap-2.5 w-full"
                >
                  <div className="w-full space-y-2.5 rounded-full">
                    <div className="h-2 w-1/2 bg-gray-300 rounded-full"></div>
                    <div className="h-3 w-1/2 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="w-full space-y-2.5 rounded-full">
                    <div className="h-2 w-[70%] bg-gray-300 rounded-full"></div>
                    <div className="h-3 w-[70%] bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="col-span-2 w-full space-y-2.5 rounded-full">
                    <div className="h-2 w-1/2 bg-gray-300 rounded-full"></div>
                    <div className="h-3 w-1/2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              ))

            :

            banks.map((bank) => (
              <div key={bank.id}
                className="p-4 grid grid-cols-2 gap-y-4 gap-x-2.5 border border-[#DDDDDD] rounded-xl"
              >
                <div className="col-span-1 w-full">
                  <p className="w-full text-nowrap text-sm 2xl:text-lg text-black/60 font-semibold uppercase">
                    STATUS
                  </p>
                </div>
                <div className="col-span-1 flex justify-end w-full">
                  <div className="w-fit">
                    <StatusTag 
                      status={bank.status} 
                      text={bank.status === "approved" ? "Approved" : 
                        bank.status === "rejected" ? "Rejected" : "Verifying"
                      }                  
                    />
                  </div>
                </div>
                <div className="col-span-1 space-y-2.5 w-full">
                  <p className="w-full text-nowrap text-sm 2xl:text-lg text-black/60">
                    Bank
                  </p>
                  <p className="truncate w-full text-base 2xl:text-xl">
                    {bank.bank}
                  </p>
                </div>
                <div className="col-span-1 space-y-2.5 w-full">
                  <p className="w-full text-nowrap text-sm 2xl:text-lg text-black/60">
                    Pemilik Rekening
                  </p>
                  <p className="truncate w-full text-base 2xl:text-xl">
                    {bank.username}
                  </p>
                </div>
                <div className="col-span-2 space-y-2.5 w-full">
                  <p className="w-full text-nowrap text-sm 2xl:text-lg text-black/60">
                    Nomor Rekening
                  </p>
                  <div className="flex items-center gap-3">
                      <p className="truncate w-fit text-base 2xl:text-xl">
                        ••••{showLastFourWalletAddress(bank.accountNumber)}
                      </p>
                      <button
                        onClick={() => handleCopy(bank.accountNumber)} 
                        className="p-2 text-black/60 hover:bg-[#F5F5F5] rounded-lg cursor-pointer transition-all duration-300">
                        {isCopied ? <FaCheck /> : <FaCopy />}
                      </button>
                    </div> 
                </div>
              </div>
            ))}
        </div>
      </>
    </div>
  )
}

export default BankUserDrawer;
