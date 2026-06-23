import { showLastFourWalletAddress } from "@/helper/formattingWithdrawal";
import type { WalletUser } from "@/types/wallet.type";
import { BsBank2 } from "react-icons/bs";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";

const CardWalletAccount = ({ 
  wallet,
  onClickCard
} : { 
  wallet: WalletUser;
  onClickCard: () => void;
}) => {
  return (
    <div 
      onClick={onClickCard}
      className={`${wallet.status === "pending" ? "border-[#DDDDDD]" : wallet.status === "rejected" ? "border-[#DF1E1E]" : "border-primary"}
        mb-2 px-3 md:px-5 2xl:px-6 py-2.5 2xl:py-4 gap-3 flex items-center justify-between w-full lg:w-[420px] 2xl:w-[540px] lg:max-w-[420px] 2xl:max-w-[540px] rounded-lg border hover:bg-[#F5F5F5] transition-colors duration-300 cursor-pointer select-none`}
    >
      <div className="flex items-center gap-4 w-full">
        {wallet.method === "bank" ? 
          <>
            <BsBank2 className={`shrink-0 text-2xl 2xl:text-3xl
              ${wallet.status === "approved" ? "text-primary" 
                : wallet.status === "rejected" ?  "text-[#DF1E1E]" : "text-black/60"}
            `} />
        
            <div className="w-full">
              <div className="flex gap-1 w-fit">
                <span className="text-base 2xl:text-xl font-semibold max-w-[200px] text-nowrap truncate">
                  {wallet.data.bank}
                </span>
                <span className="text-base 2xl:text-xl font-semibold max-w-[150px] text-nowrap truncate">
                  •••• {showLastFourWalletAddress(wallet.data.accountNumber)}
                </span>
              </div>
              
              <p className={`max-w-[280px] 2xl:max-w-[350px] text-sm 2xl:text-lg
                ${wallet.status === "pending" ? "text-black/60" 
                  : wallet.status === "rejected" ? "text-[#DF1E1E]"
                  : "text-black"}  
              `}>
                {wallet.status === "pending" ? "Verifikasi akun bank sedang diproses." 
                  : wallet.status === "rejected" ? "Verifikasi akun bank gagal." 
                  : wallet.data.username
                }
              </p>
            </div>
          </>
          :
          <>
            <img src="/bnb-icon.svg" alt="icon bnb" 
              className="size-8"
            />
            <div className="w-full">
              <div className="flex gap-1 w-fit">
                <span className="text-base 2xl:text-xl font-semibold max-w-[300px] text-nowrap truncate">
                  •••• {showLastFourWalletAddress(wallet.data.accountNumber)}
                </span>
              </div>
              
              <p className={`max-w-[280px] 2xl:max-w-[350px] text-sm 2xl:text-lg
                ${wallet.status === "pending" ? "text-black/60" 
                  : wallet.status === "rejected" ? "text-[#DF1E1E]"
                  : "text-black"}  
              `}>
                {wallet.status === "pending" ? "Verifikasi akun crypto sedang diproses." 
                  : wallet.status === "rejected" ? "Verifikasi akun crypto gagal." 
                  : `Token: ${wallet.data.token}; Network: ${wallet.data.network}`
                }
              </p>
            </div>
          </>
        }
      </div>
      <div className="shrink-0">
        {wallet.status === "approved" ?
          <img src="/check.svg" alt="check icon"
            className="mt-px scale-90"
          /> 
        : wallet.status === "rejected" ? 
            <RiErrorWarningFill className="text-2xl text-[#DF1E1E]" />
          : 
            <MdOutlineAccessTimeFilled className="text-2xl text-[#BE5409]" />
        }
      </div>
    </div>
  )
}

export default CardWalletAccount;
