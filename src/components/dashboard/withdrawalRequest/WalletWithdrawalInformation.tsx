import TitleDashboard from "../common/TitleDashboard";
import ParagraphDashboard from "../common/ParagraphDashboard";
import type { WalletUser } from "@/types/wallet.type";
import { TiInfoLarge } from "react-icons/ti";

const WalletWithdrawalInformation = ({
  initLoad,
  messageWarningWallet,
  wallet
}: {
  initLoad: boolean;
  messageWarningWallet: string;
  wallet: WalletUser | null;
}) => {
  return (
    <>
      {(wallet && wallet.method === "crypto") && 
        <div className="mt-7 max-w-[640px]">
          <div className="p-3 flex gap-3 border border-primary border-dashed rounded-[10px]">
            <span className="flex shrink-0 items-center justify-center size-6 3xl:size-[30px] border border-primary rounded-full">
              <TiInfoLarge className="text-base 3xl:text-[20px] text-primary" />
            </span>
            <p className="w-fit text-base md:text-sm font-medium text-[rgba(0,0,0,0.8)] leading-[178%]">
              Withdraw menggunakan metode Crypto USDT (BEP20) akan dikenakan biaya transaksi (network fee) dalam bentuk USDT.
              <br />
              Jumlah USDT yang diterima di wallet tujuan dapat berbeda dari nominal withdraw yang diajukan karena adanya pemotongan biaya transaksi blockchain dan biaya pemrosesan internal.
            </p>
          </div>
        </div>
      }
      {!initLoad && messageWarningWallet ? 
        <div className="mt-4 3xl:mt-6 px-4 py-2 w-full bg-[#FAD4D4] border-b border-[#DF1E1E]">
          <p className="text-base 3xl:text-xl text-black/80">{messageWarningWallet}</p>
        </div> : <></>
      }
      {wallet && 
        <div className="mt-7 3xl:mt-10 max-w-[720px]">
          <div className="flex flex-col gap-2">
            <TitleDashboard>
              {wallet.method === "bank" ? 
                "Informasi Rekening Bank Anda"
                : "Informasi Wallet Crypto Anda"
              }
            </TitleDashboard>
            <ParagraphDashboard maxW="w-fit" colorCL="text-black/80">
              Wallet tujuan penarikan saldo
            </ParagraphDashboard>
          </div>
          <div className="mt-4 3xl:mt-5 flex flex-col gap-3 md:gap-2.5 3xl:gap-4">
            {wallet.method === "bank" ? 
              <>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 md:gap-5 w-full">
                  <p className="shrink-0 font-semibold w-full max-w-[200px] 3xl:max-w-[260px] text-nowrap text-base 3xl:text-xl">
                    Nama Bank:
                  </p>
                  <p className="w-full p-2.5 3xl:p-3 text-base 3xl:text-xl bg-[#F9F9F9] border border-[#D0D5DD] rounded-lg">
                    {wallet.status === "approved" ? wallet.data.bank : ""}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 md:gap-5 w-full">
                  <p className="shrink-0 font-semibold w-full max-w-[200px] 3xl:max-w-[260px] text-nowrap text-base 3xl:text-xl">
                    Nomor Rekening:
                  </p>
                  <p className="w-full p-2.5 3xl:p-3 text-base 3xl:text-xl bg-[#F9F9F9] border border-[#D0D5DD] rounded-lg">
                    {wallet.status === "approved" ? wallet.data.accountNumber : ""}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 md:gap-5 w-full">
                  <p className="shrink-0 font-semibold w-full max-w-[200px] 3xl:max-w-[260px] text-nowrap text-base 3xl:text-xl">
                    Nama Pemilik Rekening:
                  </p>
                  <p className="w-full p-2.5 3xl:p-3 text-base 3xl:text-xl bg-[#F9F9F9] border border-[#D0D5DD] rounded-lg">
                    {wallet.status === "approved" ? wallet.data.username : ""}
                  </p>
                </div>
              </>
            : 
              <>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 md:gap-5 w-full">
                  <p className="shrink-0 font-semibold w-full max-w-[200px] 3xl:max-w-[260px] text-nowrap text-base 3xl:text-xl">
                    Alamat Wallet
                  </p>
                  <p className="w-full p-2.5 3xl:p-3 text-base 3xl:text-xl bg-[#F9F9F9] border border-[#D0D5DD] rounded-lg">
                    {wallet.data.accountNumber}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 md:gap-5 w-full">
                  <p className="shrink-0 font-semibold w-full max-w-[200px] 3xl:max-w-[260px] text-nowrap text-base 3xl:text-xl">
                    Token
                  </p>
                  <p className="w-full p-2.5 3xl:p-3 text-base 3xl:text-xl bg-[#F9F9F9] border border-[#D0D5DD] rounded-lg">
                    {wallet.data.token}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 md:gap-5 w-full">
                  <p className="shrink-0 font-semibold w-full max-w-[200px] 3xl:max-w-[260px] text-nowrap text-base 3xl:text-xl">
                    Network
                  </p>
                  <p className="w-full p-2.5 3xl:p-3 text-base 3xl:text-xl bg-[#F9F9F9] border border-[#D0D5DD] rounded-lg">
                    {wallet.data.network}
                  </p>
                </div>
              </>
            }
          </div>
        </div>
      }
    </>
  )
}

export default WalletWithdrawalInformation;
