import { copyToClipboard } from "@/helper/copyToClipboard";
import { formattingRp, formattingUsd } from "@/helper/formattingCurrency";
import { formattingFullDate } from "@/helper/formattingDate";
import type { DataWithdrawalManagement } from "@/pages/dashboard/admin/WithdrawalRequestManagement";
import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

const layoutBank = {
  bank: "Bank",
  accountName: "Pemilik Rekening",
  walletAddress: "Nomor Rekening"
};

const DrawerWithdrawalDetail = ({
  dataWithdrawal,
  closeDrawer,
}: { 
  dataWithdrawal: DataWithdrawalManagement;
  closeDrawer: () => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const profileData = [
    { 
      title: "Username",
      content: dataWithdrawal.accountName
    },
    { 
      title: "Nama Lengkap",
      content: dataWithdrawal.accountName
    },
    { 
      title: "Jenis Kelamin",
      content: dataWithdrawal.accountName
    },
    { 
      title: "Nomor Telp",
      content: dataWithdrawal.accountName
    },
    { 
      title: "Alamat Email",
      content: dataWithdrawal.accountName
    },
  ];

  const handleCopy = async () => {
    const text = dataWithdrawal.walletAddress;
    const isCopySuccess = await copyToClipboard(text);
    if (isCopySuccess) {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }

  const handleRejectWithdrawal = () => {
    setIsLoading(true);
    setIsLoading(false);
  }
  const handleApproveWithdrawal = () => {
    setIsLoading(true);
    setIsLoading(false);
  }

  const lengthWalletAddress = dataWithdrawal.walletAddress.length;
  const secureWalletAddress = dataWithdrawal.walletAddress.slice(-5, -1).padStart(lengthWalletAddress, "*"); 
  return (
    <div className="z-100 fixed top-16 2xl:top-[90px] right-0 max-w-[540px] w-full h-[calc(100vh-64px)] 2xl:h-[calc(100vh-90px)] border-t border-l border-[#D2CEE1] bg-white">
      <div className="py-3 h-[calc(100%-64px)] overflow-y-auto overflow-x-hidden">
      <div className="px-5 pb-2 2xl:pb-4 relative pr-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl 2xl:text-2xl font-semibold">
            Detail Withdrawal
          </h2>
          <div
            onClick={closeDrawer} 
            className="p-2 aspect-square hover:bg-[#F5F5F5] rounded-xl transition-all duration-300 cursor-pointer">
            <IoCloseOutline 
              className="text-2xl 2xl:text-3xl" />
          </div>
        </div>
        <p className="mt-1 text-black/60 text-base 2xl:text-xl leading-[160%]">
          ID: #WD-F{dataWithdrawal.id.toString().padEnd(3, "X")} • {" "}
          Dibuat pada {formattingFullDate(dataWithdrawal.createdAt)} 
        </p>
      </div>
      <div className="px-5 pr-5 pt-8 space-y-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="uppercase text-base font-bold 2xl:text-xl bg-linear-to-t from-dark-primary to-primary bg-clip-text text-transparent">
            REQUESTED AMOUNTS
          </p>
          <p className="text-[40px] font-semibold">
            {dataWithdrawal.currency === "USD" ?
              formattingUsd(Number(dataWithdrawal.total)) : formattingRp(Number(dataWithdrawal.total))
            }
          </p>
        </div>
        <div className="py-5 w-full rounded-xl border border-[#777777] bg-white">
          <div className="px-4 pb-4 flex items-center justify-between border-b border-[#EAEAEA]">
            <p className="uppercase text-base font-bold 2xl:text-xl bg-linear-to-t from-dark-primary to-primary bg-clip-text text-transparent">
              PAYMENT METHODS
            </p>
            <p className="text-black/80 font-medium text-base 2xl:text-xl">
              {dataWithdrawal.method === "bank" ? 
                "Bank Transfer" : "Crypto"
              }
            </p>
          </div>
          <div className="px-4 pt-4 grid grid-cols-2 gap-5">
            {dataWithdrawal.method === "bank" ?
              <>
                {Object.entries(layoutBank).map(([key, value]) => {
                if (key === "walletAddress") {
                  return (
                    <div className="space-y-1">
                      <p className="text-sm 2xl:text-lg font-medium text-black/60">{value}</p>
                      <div className="flex items-center gap-3"> 
                        <p className="text-sm 2xl:text-xl font-medium text-black">
                          {secureWalletAddress}
                        </p>
                        <div
                          onClick={handleCopy} 
                          className="p-2 text-black/60 hover:bg-[#F5F5F5] rounded-lg cursor-pointer transition-all duration-300">
                          {isCopied ? <FaCheck /> : <FaCopy />}
                        </div>
                      </div>
                    </div>
                  )
                }
                return (
                  <div className="space-y-2">
                    <p className="text-sm 2xl:text-lg font-medium text-black/60">{value}</p>
                    <p className="text-sm 2xl:text-xl font-medium text-black">
                      {dataWithdrawal[key as "bank" | "accountName" | "walletAddress"]}
                    </p>
                  </div>
                )})}
              </> : 
              <>
                <div className="space-y-2">
                  <p className="text-sm 2xl:text-lg font-medium text-black/60">Pemilik Wallet</p>
                  <p className="text-sm 2xl:text-xl font-medium text-black">{dataWithdrawal.accountName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm 2xl:text-lg font-medium text-black/60">Alamat Wallet</p>
                  <div className="flex items-center gap-3"> 
                    <p className="text-sm 2xl:text-xl font-medium text-black">
                      {secureWalletAddress}
                    </p>
                    <div
                      onClick={handleCopy} 
                      className="p-2 text-black/60 hover:bg-[#F5F5F5] rounded-lg cursor-pointer transition-all duration-300">
                      {isCopied ? <FaCheck /> : <FaCopy />}
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
        <div className="py-5 w-full rounded-xl border border-[#777777] bg-white">
          <div className="px-4 pb-4 flex items-center justify-between border-b border-[#EAEAEA]">
            <p className="uppercase text-base font-bold 2xl:text-xl bg-linear-to-t from-dark-primary to-primary bg-clip-text text-transparent">
              USER information
            </p>
          </div>
          <div className="px-4 pt-4 grid grid-cols-2 gap-5">
            {profileData.map((item) => (
              <div key={item.title} className="space-y-2">
                <p className="text-sm 2xl:text-lg font-medium text-black/60">{item.title}</p>
                {item.title === "Alamat Email" ? 
                  <div className="flex items-center gap-2">
                    <p className="text-sm 2xl:text-xl font-medium text-black">{item.content}</p>
                    <img src="/check.svg" alt="check icon"
                      className="mt-px scale-80 2xl:scale-100"
                    />
                  </div>
                : <p className="text-sm 2xl:text-xl font-medium text-black">{item.content}</p>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      <div className="absolute px-5 py-2 flex gap-2 left-0 bottom-0 w-full bg-white border-t border-[#D2CEE1]">
        <button 
          disabled={isLoading}
          onClick={handleRejectWithdrawal}
          className="py-3 flex items-center justify-center gap-2 w-full rounded-lg border border-my-red text-my-red text-sm hover:shadow-[0_0_1px_1px] shadow-my-red/80 transition-all duration-300 cursor-pointer"
        >
          <span>Reject</span> 
        </button>
        <button 
          disabled={isLoading}
          onClick={handleApproveWithdrawal}
          className="py-3 flex items-center justify-center gap-2 w-full rounded-lg bg-primary text-white text-sm cursor-pointer hover:brightness-90 transition-all duration-300"
        >
          <FaCheck />
          <span>Approve</span> 
        </button>
      </div>
    </div>
  )
}

export default DrawerWithdrawalDetail;
